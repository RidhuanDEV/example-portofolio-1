# Portfolio Engineering Platform — v2.0

```
Version   : 2.0.0
Status    : Implementation-Ready
Database  : MongoDB Atlas / Self-hosted
CMS       : Built-in Admin Panel (Next.js App Router)
Stack     : Next.js 14 · TypeScript · MongoDB · Tailwind CSS · Framer Motion
Install   : npx create-next-app@latest (no scaffold from scratch)
```

---

## Daftar Isi

1. [Perubahan dari v1](#1-perubahan-dari-v1)
2. [Instalasi dari Next.js](#2-instalasi-dari-nextjs)
3. [Struktur Direktori](#3-struktur-direktori)
4. [MongoDB Schema & Data Model](#4-mongodb-schema--data-model)
5. [CMS Admin Panel](#5-cms-admin-panel)
6. [Static Content Profesional](#6-static-content-profesional)
7. [Halaman Publik](#7-halaman-publik)
8. [API Routes](#8-api-routes)
9. [Environment Variables](#9-environment-variables)
10. [Deployment](#10-deployment)

---

## 1. Perubahan dari v1

| Aspek | v1 (Execution Plan) | v2 (Dokumen Ini) |
|---|---|---|
| Database | PostgreSQL + SQLAlchemy | **MongoDB + Mongoose** |
| Backend | FastAPI (Python) terpisah | **Next.js API Routes (built-in)** |
| CMS | Tidak ada (manual MDX) | **Admin panel `/admin` built-in** |
| Content | Hardcoded TypeScript | **MongoDB-driven, editable via CMS** |
| Auth CMS | — | **NextAuth.js credentials provider** |
| Image | MinIO (self-hosted) | **Cloudinary / local `/public`** |
| Installation | Monorepo dari awal | **`npx create-next-app` lalu extend** |
| Rich Text | MDX file-based | **TipTap editor di CMS** |

### Keuntungan MongoDB untuk Portfolio

- **Flexible schema** — setiap proyek bisa punya struktur section berbeda tanpa migration
- **Document model cocok untuk case studies** — satu `Project` document menyimpan semua data nested (sections, ADRs, diagrams, tech stack) tanpa JOIN
- **Atlas free tier** — gratis untuk portfolio, 512MB cukup untuk ratusan proyek
- **Mongoose ODM** — TypeScript-friendly dengan typed schema dan validation built-in

---

## 2. Instalasi dari Next.js

### Step 01 — Inisialisasi Proyek

```bash
# Inisialisasi Next.js 14 dengan App Router
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd portfolio
```

Saat prompt muncul, pilih:
- TypeScript → **Yes**
- ESLint → **Yes**
- Tailwind CSS → **Yes**
- `src/` directory → **Yes**
- App Router → **Yes**
- Import alias `@/*` → **Yes**

---

### Step 02 — Install Dependencies

```bash
# Core dependencies
npm install mongoose next-auth @next-auth/mongodb-adapter
npm install framer-motion lucide-react clsx tailwind-merge
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
npm install @tiptap/extension-link @tiptap/extension-placeholder
npm install @tiptap/extension-code-block-lowlight lowlight
npm install react-hook-form zod @hookform/resolvers
npm install slugify bcryptjs date-fns

# Dev dependencies
npm install -D @types/bcryptjs prettier prettier-plugin-tailwindcss
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Optional: image upload ke Cloudinary
npm install cloudinary next-cloudinary
```

---

### Step 03 — Konfigurasi Tailwind

Ganti `tailwind.config.ts`:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          '00': '#0a0a0c',
          '01': '#111115',
        },
        surface: '#1e1e26',
        accent: {
          DEFAULT: '#7c6af7',
          teal:   '#4ecdc4',
          amber:  '#f7c77c',
          red:    '#f76c6c',
          green:  '#56e0a0',
        },
        text: {
          DEFAULT: '#e8e6f0',
          muted:   '#7a7890',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        mono:    ['IBM Plex Mono', 'Fira Code', 'monospace'],
        sans:    ['DM Sans', 'Inter', 'sans-serif'],
      },
      borderColor: {
        DEFAULT:    'rgba(255,255,255,0.07)',
        emphasis:   'rgba(255,255,255,0.13)',
      },
      animation: {
        'fade-up':  'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-slow':'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

### Step 04 — Google Fonts

Edit `src/app/layout.tsx`:

```typescript
import { Fraunces, DM_Sans, IBM_Plex_Mono } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})
```

---

### Step 05 — Setup MongoDB Connection

Buat file `src/lib/mongodb.ts`:

```typescript
// src/lib/mongodb.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Cache connection untuk development (hot reload tidak buat koneksi baru)
declare global {
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
```

---

## 3. Struktur Direktori

```
portfolio/
├── src/
│   ├── app/
│   │   ├── (public)/                  # Route group untuk halaman publik
│   │   │   ├── page.tsx               # Homepage
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx           # Project list
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx       # Project case study detail
│   │   │   ├── system-design/
│   │   │   │   └── page.tsx
│   │   │   ├── writing/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/                     # CMS Admin Panel
│   │   │   ├── layout.tsx             # Admin layout (protected)
│   │   │   ├── page.tsx               # Dashboard
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx           # Project list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx       # Buat proyek baru
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx       # Edit proyek
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx           # Edit profil & skills
│   │   │   ├── site-settings/
│   │   │   │   └── page.tsx           # Navigasi, SEO defaults, dll
│   │   │   └── adrs/
│   │   │       ├── page.tsx
│   │   │       └── [id]/page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts       # NextAuth handler
│   │   │   ├── projects/
│   │   │   │   ├── route.ts           # GET list, POST create
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts       # GET, PUT, DELETE
│   │   │   ├── blog/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── profile/
│   │   │   │   └── route.ts
│   │   │   ├── upload/
│   │   │   │   └── route.ts           # Image upload
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx                 # Root layout
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                        # Primitif reusable
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Toast.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── CommandPalette.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SkillConstellation.tsx
│   │   │   ├── FlagshipProjects.tsx
│   │   │   ├── MetricsBar.tsx
│   │   │   └── TerminalAbout.tsx
│   │   ├── project/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── CaseStudyLayout.tsx
│   │   │   ├── ArchitectureDiagram.tsx
│   │   │   ├── TechStackTable.tsx
│   │   │   ├── ADRCard.tsx
│   │   │   └── TableOfContents.tsx
│   │   ├── blog/
│   │   │   ├── PostCard.tsx
│   │   │   └── RichTextRenderer.tsx
│   │   ├── admin/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── RichTextEditor.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   ├── BlogForm.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   └── ImageUpload.tsx
│   │   └── shared/
│   │       ├── AnimateOnScroll.tsx
│   │       └── ReadingProgress.tsx
│   │
│   ├── lib/
│   │   ├── mongodb.ts                 # Koneksi database
│   │   ├── auth.ts                    # NextAuth config
│   │   ├── cloudinary.ts              # Upload helper
│   │   └── utils.ts                   # Helper functions
│   │
│   ├── models/                        # Mongoose models
│   │   ├── Project.ts
│   │   ├── BlogPost.ts
│   │   ├── Profile.ts
│   │   ├── SiteSettings.ts
│   │   └── ADR.ts
│   │
│   ├── types/                         # TypeScript interfaces
│   │   ├── project.ts
│   │   ├── blog.ts
│   │   └── profile.ts
│   │
│   └── hooks/
│       ├── useProjects.ts
│       └── useCommandPalette.ts
│
├── public/
│   ├── images/
│   └── resume.pdf
│
├── .env.local
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 4. MongoDB Schema & Data Model

### 4.1 Project Model

```typescript
// src/models/Project.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

// ─── Sub-schemas ───────────────────────────────────────────────────────────

const TechItemSchema = new Schema({
  name:       { type: String, required: true },
  category:   { type: String, enum: ['frontend','backend','database','infra','testing','other'], required: true },
  version:    String,
  rationale:  String,
  alternatives: [{ name: String, reasonNotChosen: String }],
}, { _id: false })

const MetricSchema = new Schema({
  label:    { type: String, required: true },  // e.g. "Latency reduction"
  value:    { type: String, required: true },  // e.g. "340ms → 45ms"
  context:  String,                            // e.g. "P99, after Redis caching"
}, { _id: false })

const ADRSchema = new Schema({
  number:       { type: Number, required: true },
  title:        { type: String, required: true },
  status:       { type: String, enum: ['proposed','accepted','deprecated','superseded'], default: 'accepted' },
  context:      { type: String, required: true },
  decision:     { type: String, required: true },
  consequences: String,
  alternatives: [String],
  date:         { type: Date, default: Date.now },
}, { _id: true })

const SectionSchema = new Schema({
  type: {
    type: String,
    enum: [
      'problem',
      'architecture',
      'tech-stack',
      'backend-design',
      'database-design',
      'caching',
      'performance',
      'tradeoffs',
      'failure-modes',
      'observability',
      'results',
      'lessons',
    ],
    required: true,
  },
  title:   { type: String, required: true },
  content: { type: String, required: true }, // HTML dari TipTap editor
  order:   { type: Number, default: 0 },
  diagram: {
    svgData:     String,
    interactive: Boolean,
  },
}, { _id: true })

// ─── Main Project Schema ────────────────────────────────────────────────────

export interface IProject extends Document {
  title:        string
  slug:         string
  tagline:      string
  description:  string
  status:       'draft' | 'published' | 'archived'
  featured:     boolean
  featuredOrder: number
  coverImage:   string
  demoUrl:      string
  repoUrl:      string
  techStack:    typeof TechItemSchema[]
  metrics:      typeof MetricSchema[]
  sections:     typeof SectionSchema[]
  adrs:         typeof ADRSchema[]
  tags:         string[]
  year:         number
  duration:     string     // e.g. "3 months"
  teamSize:     number
  role:         string     // e.g. "Lead Backend Engineer"
  createdAt:    Date
  updatedAt:    Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title:         { type: String, required: true, trim: true },
    slug:          { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline:       { type: String, required: true, maxlength: 160 },
    description:   { type: String, required: true },
    status:        { type: String, enum: ['draft','published','archived'], default: 'draft' },
    featured:      { type: Boolean, default: false },
    featuredOrder: { type: Number, default: 99 },
    coverImage:    String,
    demoUrl:       String,
    repoUrl:       String,
    techStack:     [TechItemSchema],
    metrics:       [MetricSchema],
    sections:      [SectionSchema],
    adrs:          [ADRSchema],
    tags:          [String],
    year:          Number,
    duration:      String,
    teamSize:      { type: Number, default: 1 },
    role:          String,
  },
  {
    timestamps: true,
    // Tambahkan index untuk performa query
  }
)

// ─── Indexes ────────────────────────────────────────────────────────────────
ProjectSchema.index({ slug: 1 })
ProjectSchema.index({ status: 1, featured: -1 })
ProjectSchema.index({ tags: 1 })

export const Project: Model<IProject> =
  mongoose.models.Project ?? mongoose.model<IProject>('Project', ProjectSchema)
```

---

### 4.2 BlogPost Model

```typescript
// src/models/BlogPost.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IBlogPost extends Document {
  title:         string
  slug:          string
  excerpt:       string
  content:       string   // HTML dari TipTap
  coverImage:    string
  tags:          string[]
  status:        'draft' | 'published'
  readTimeMin:   number
  publishedAt:   Date | null
  updatedAt:     Date
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    excerpt:     { type: String, required: true, maxlength: 300 },
    content:     { type: String, required: true },
    coverImage:  String,
    tags:        [String],
    status:      { type: String, enum: ['draft','published'], default: 'draft' },
    readTimeMin: { type: Number, default: 5 },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

BlogPostSchema.index({ slug: 1 })
BlogPostSchema.index({ status: 1, publishedAt: -1 })

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ?? mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)
```

---

### 4.3 Profile Model

```typescript
// src/models/Profile.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

const SkillSchema = new Schema({
  name:     { type: String, required: true },
  category: { type: String, enum: ['language','framework','database','cloud','tool','concept'] },
  level:    { type: Number, min: 1, max: 5 },    // 1=familiar, 5=expert
  yearsExp: Number,
}, { _id: false })

const ExperienceSchema = new Schema({
  company:    { type: String, required: true },
  role:       { type: String, required: true },
  startDate:  { type: String, required: true },  // "2021-06"
  endDate:    String,                              // null = present
  highlights: [String],
  techUsed:   [String],
}, { _id: true })

export interface IProfile extends Document {
  name:         string
  title:        string
  bio:          string
  philosophy:   string
  avatar:       string
  location:     string
  email:        string
  resumeUrl:    string
  socialLinks:  { github?: string; linkedin?: string; twitter?: string; website?: string }
  skills:       typeof SkillSchema[]
  experiences:  typeof ExperienceSchema[]
  currentFocus: string[]
  updatedAt:    Date
}

const ProfileSchema = new Schema<IProfile>(
  {
    name:         { type: String, required: true },
    title:        { type: String, required: true },
    bio:          { type: String, required: true },
    philosophy:   String,
    avatar:       String,
    location:     String,
    email:        String,
    resumeUrl:    String,
    socialLinks:  {
      github:   String,
      linkedin: String,
      twitter:  String,
      website:  String,
    },
    skills:       [SkillSchema],
    experiences:  [ExperienceSchema],
    currentFocus: [String],
  },
  { timestamps: true }
)

export const Profile: Model<IProfile> =
  mongoose.models.Profile ?? mongoose.model<IProfile>('Profile', ProfileSchema)
```

---

### 4.4 SiteSettings Model

```typescript
// src/models/SiteSettings.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

export interface ISiteSettings extends Document {
  siteTitle:       string
  siteDescription: string
  ogImage:         string
  analyticsId:     string
  maintenanceMode: boolean
  heroHeadline:    string
  heroSubheadline: string
  ctaText:         { primary: string; secondary: string }
  featuredMetrics: Array<{ label: string; value: string }>
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteTitle:       { type: String, default: 'Engineering Portfolio' },
    siteDescription: String,
    ogImage:         String,
    analyticsId:     String,
    maintenanceMode: { type: Boolean, default: false },
    heroHeadline:    String,
    heroSubheadline: String,
    ctaText:         { primary: String, secondary: String },
    featuredMetrics: [{ label: String, value: String }],
  },
  { timestamps: true }
)

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ?? mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)
```

---

## 5. CMS Admin Panel

### 5.1 Authentication (NextAuth)

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Untuk portfolio solo: hardcode admin dari env vars
        // Untuk multi-user: query User collection di MongoDB
        const adminEmail    = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD_HASH  // bcrypt hash

        if (credentials.email !== adminEmail) return null

        const isValid = await bcrypt.compare(credentials.password, adminPassword!)
        if (!isValid) return null

        return { id: '1', email: adminEmail, name: 'Admin', role: 'admin' }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    session({ session, token }) {
      if (session.user) (session.user as any).role = token.role
      return session
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}
```

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

---

### 5.2 Admin Layout (Protected)

```typescript
// src/app/admin/layout.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import AdminSidebar from '@/components/admin/Sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-bg-00 text-text">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
```

---

### 5.3 Admin Sidebar Component

```typescript
// src/components/admin/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, FolderOpen, FileText,
  User, Settings, Code2, LogOut, ChevronRight,
} from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Dashboard',     href: '/admin',              icon: LayoutDashboard },
  { label: 'Projects',      href: '/admin/projects',     icon: FolderOpen      },
  { label: 'Blog',          href: '/admin/blog',         icon: FileText        },
  { label: 'ADRs',          href: '/admin/adrs',         icon: Code2           },
  { label: 'Profile',       href: '/admin/profile',      icon: User            },
  { label: 'Site Settings', href: '/admin/site-settings',icon: Settings        },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-bg-01 border-r border-white/7 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-white/7">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Code2 size={16} className="text-white" />
          </div>
          <div>
            <p className="font-mono text-xs text-text-muted uppercase tracking-wider">CMS</p>
            <p className="font-display text-sm text-text">Portfolio Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href ||
                         (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                active
                  ? 'bg-accent/15 text-accent border border-accent/20'
                  : 'text-text-muted hover:text-text hover:bg-white/5'
              )}
            >
              <item.icon size={16} />
              <span className="font-sans">{item.label}</span>
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-white/7">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-accent-red hover:bg-accent-red/10 transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
```

---

### 5.4 Admin Dashboard

```typescript
// src/app/admin/page.tsx
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import { BlogPost } from '@/models/BlogPost'
import Link from 'next/link'
import { Plus, Eye, TrendingUp, FileText, FolderOpen, Code2 } from 'lucide-react'

async function getDashboardStats() {
  await connectDB()
  const [
    totalProjects, publishedProjects,
    totalPosts, publishedPosts,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ status: 'published' }),
    BlogPost.countDocuments(),
    BlogPost.countDocuments({ status: 'published' }),
  ])
  return { totalProjects, publishedProjects, totalPosts, publishedPosts }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const cards = [
    { label: 'Total Projects', value: stats.totalProjects,   sub: `${stats.publishedProjects} published`, icon: FolderOpen, href: '/admin/projects',  color: 'accent' },
    { label: 'Blog Posts',     value: stats.totalPosts,      sub: `${stats.publishedPosts} published`,    icon: FileText,   href: '/admin/blog',       color: 'accent-teal' },
  ]

  const quickActions = [
    { label: 'New Project', href: '/admin/projects/new', icon: Plus },
    { label: 'New Post',    href: '/admin/blog/new',     icon: Plus },
    { label: 'Edit Profile',href: '/admin/profile',      icon: Eye  },
    { label: 'New ADR',     href: '/admin/adrs/new',     icon: Code2 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-light text-text">Dashboard</h1>
        <p className="text-text-muted font-sans mt-1">Manage your portfolio content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-bg-01 border border-white/7 rounded-xl p-6 hover:border-white/13 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-muted text-sm font-sans">{card.label}</p>
                <p className="text-4xl font-display font-light text-text mt-2">{card.value}</p>
                <p className="text-text-muted text-xs font-mono mt-1">{card.sub}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <card.icon size={18} className="text-accent" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-xl font-light text-text mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-2 px-4 py-3 bg-accent/10 border border-accent/20 text-accent rounded-lg text-sm font-sans hover:bg-accent/20 transition-colors"
            >
              <action.icon size={14} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

### 5.5 Project Form (CMS Editor)

```typescript
// src/components/admin/ProjectForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import RichTextEditor from './RichTextEditor'
import { Plus, Trash2, GripVertical, Save, Eye } from 'lucide-react'

const sectionTypes = [
  { value: 'problem',       label: 'Problem Statement' },
  { value: 'architecture',  label: 'System Architecture' },
  { value: 'tech-stack',    label: 'Tech Stack Justification' },
  { value: 'backend-design',label: 'Backend Design' },
  { value: 'database-design',label: 'Database Design' },
  { value: 'caching',       label: 'Caching Strategy' },
  { value: 'performance',   label: 'Performance Analysis' },
  { value: 'tradeoffs',     label: 'Trade-off Discussion' },
  { value: 'failure-modes', label: 'Failure Modes' },
  { value: 'observability', label: 'Observability' },
  { value: 'results',       label: 'Results & Impact' },
  { value: 'lessons',       label: 'Lessons Learned' },
]

const projectSchema = z.object({
  title:     z.string().min(3),
  slug:      z.string().min(3).regex(/^[a-z0-9-]+$/),
  tagline:   z.string().min(10).max(160),
  description: z.string().min(50),
  status:    z.enum(['draft','published','archived']),
  featured:  z.boolean(),
  demoUrl:   z.string().url().optional().or(z.literal('')),
  repoUrl:   z.string().url().optional().or(z.literal('')),
  year:      z.number().int().min(2015).max(2030),
  duration:  z.string(),
  role:      z.string(),
  tags:      z.string(),  // comma-separated, parsed on submit
  sections:  z.array(z.object({
    type:    z.string(),
    title:   z.string(),
    content: z.string(),
    order:   z.number(),
  })),
  metrics: z.array(z.object({
    label:   z.string(),
    value:   z.string(),
    context: z.string().optional(),
  })),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData> & { _id?: string }
  mode: 'create' | 'edit'
}

export default function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'meta'|'sections'|'metrics'|'adrs'>('meta')

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status:   'draft',
      featured: false,
      year:     new Date().getFullYear(),
      sections: [],
      metrics:  [],
      ...initialData,
    },
  })

  const { fields: sectionFields, append: addSection, remove: removeSection } = useFieldArray({ control, name: 'sections' })
  const { fields: metricFields, append: addMetric, remove: removeMetric } = useFieldArray({ control, name: 'metrics' })

  const onSubmit = async (data: ProjectFormData) => {
    setSaving(true)
    try {
      const payload = {
        ...data,
        tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
      }
      const url    = mode === 'create' ? '/api/projects' : `/api/projects/${initialData?._id}`
      const method = mode === 'create' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Save failed')
      router.push('/admin/projects')
      router.refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-light text-text">
          {mode === 'create' ? 'New Project' : 'Edit Project'}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setValue('status', 'draft')}
            className="px-4 py-2 text-sm text-text-muted border border-white/7 rounded-lg hover:bg-white/5"
          >
            Save Draft
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? 'Saving…' : 'Save & Publish'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/7">
        {(['meta','sections','metrics','adrs'] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-sans capitalize border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? 'border-accent text-accent'
                : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Meta Tab */}
      {activeTab === 'meta' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Title</label>
            <input {...register('title')} className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-sans focus:border-accent outline-none" />
            {errors.title && <p className="text-accent-red text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Slug</label>
            <input {...register('slug')} className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-mono text-sm focus:border-accent outline-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Status</label>
            <select {...register('status')} className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-sans focus:border-accent outline-none">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Tagline (max 160 chars)</label>
            <input {...register('tagline')} className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-sans focus:border-accent outline-none" />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Description</label>
            <textarea {...register('description')} rows={4} className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-sans focus:border-accent outline-none resize-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Demo URL</label>
            <input {...register('demoUrl')} placeholder="https://" className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-sans focus:border-accent outline-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Repo URL</label>
            <input {...register('repoUrl')} placeholder="https://github.com/…" className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-sans focus:border-accent outline-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Year</label>
            <input type="number" {...register('year', { valueAsNumber: true })} className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-sans focus:border-accent outline-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Duration</label>
            <input {...register('duration')} placeholder="e.g. 3 months" className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-sans focus:border-accent outline-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Role</label>
            <input {...register('role')} placeholder="e.g. Lead Backend Engineer" className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-sans focus:border-accent outline-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Tags (comma-separated)</label>
            <input {...register('tags')} placeholder="next.js, mongodb, redis" className="w-full bg-bg-01 border border-white/7 rounded-lg px-4 py-2.5 text-text font-sans focus:border-accent outline-none" />
          </div>

          <div className="col-span-2 flex items-center gap-3">
            <input type="checkbox" {...register('featured')} id="featured" className="accent-accent w-4 h-4" />
            <label htmlFor="featured" className="text-sm text-text font-sans">Feature on homepage</label>
          </div>
        </div>
      )}

      {/* Sections Tab */}
      {activeTab === 'sections' && (
        <div className="space-y-4">
          {sectionFields.map((field, index) => (
            <div key={field.id} className="bg-bg-01 border border-white/7 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <GripVertical size={16} className="text-text-muted cursor-grab" />
                <select
                  {...register(`sections.${index}.type`)}
                  className="bg-surface border border-white/7 rounded-lg px-3 py-1.5 text-sm text-text font-sans focus:border-accent outline-none"
                >
                  {sectionTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <input
                  {...register(`sections.${index}.title`)}
                  placeholder="Section title"
                  className="flex-1 bg-surface border border-white/7 rounded-lg px-3 py-1.5 text-sm text-text font-sans focus:border-accent outline-none"
                />
                <button type="button" onClick={() => removeSection(index)} className="p-1.5 text-text-muted hover:text-accent-red rounded">
                  <Trash2 size={14} />
                </button>
              </div>
              <RichTextEditor
                content={field.content}
                onChange={(html) => setValue(`sections.${index}.content`, html)}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => addSection({ type: 'problem', title: '', content: '', order: sectionFields.length })}
            className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-white/20 text-text-muted hover:text-text hover:border-white/40 rounded-xl text-sm w-full justify-center transition-colors"
          >
            <Plus size={14} />
            Add Section
          </button>
        </div>
      )}

      {/* Metrics Tab */}
      {activeTab === 'metrics' && (
        <div className="space-y-3">
          {metricFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 gap-3 bg-bg-01 border border-white/7 rounded-xl p-4">
              <input {...register(`metrics.${index}.label`)} placeholder="Metric label" className="bg-surface border border-white/7 rounded-lg px-3 py-2 text-sm text-text font-sans focus:border-accent outline-none" />
              <input {...register(`metrics.${index}.value`)} placeholder="e.g. 340ms → 45ms" className="bg-surface border border-white/7 rounded-lg px-3 py-2 text-sm text-text font-mono focus:border-accent outline-none" />
              <div className="flex gap-2">
                <input {...register(`metrics.${index}.context`)} placeholder="Context (optional)" className="flex-1 bg-surface border border-white/7 rounded-lg px-3 py-2 text-sm text-text font-sans focus:border-accent outline-none" />
                <button type="button" onClick={() => removeMetric(index)} className="p-2 text-text-muted hover:text-accent-red rounded">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addMetric({ label: '', value: '', context: '' })}
            className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-white/20 text-text-muted hover:text-text rounded-xl text-sm w-full justify-center"
          >
            <Plus size={14} /> Add Metric
          </button>
        </div>
      )}
    </form>
  )
}
```

---

### 5.6 Rich Text Editor (TipTap)

```typescript
// src/components/admin/RichTextEditor.tsx
'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { createLowlight } from 'lowlight'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import yaml from 'highlight.js/lib/languages/yaml'
import {
  Bold, Italic, Code, Link2, Image as ImageIcon,
  List, ListOrdered, Quote, Minus, Heading2, Heading3,
} from 'lucide-react'

const lowlight = createLowlight()
lowlight.register({ typescript, python, bash, yaml })

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: placeholder ?? 'Write section content…' }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[200px] font-sans text-text text-sm leading-relaxed p-4',
      },
    },
  })

  if (!editor) return null

  const toolbarButtons = [
    { icon: Heading2,      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
    { icon: Heading3,      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }) },
    { icon: Bold,          action: () => editor.chain().focus().toggleBold().run(),          active: editor.isActive('bold') },
    { icon: Italic,        action: () => editor.chain().focus().toggleItalic().run(),        active: editor.isActive('italic') },
    { icon: Code,          action: () => editor.chain().focus().toggleCode().run(),          active: editor.isActive('code') },
    { icon: List,          action: () => editor.chain().focus().toggleBulletList().run(),    active: editor.isActive('bulletList') },
    { icon: ListOrdered,   action: () => editor.chain().focus().toggleOrderedList().run(),   active: editor.isActive('orderedList') },
    { icon: Quote,         action: () => editor.chain().focus().toggleBlockquote().run(),    active: editor.isActive('blockquote') },
    { icon: Minus,         action: () => editor.chain().focus().setHorizontalRule().run(),   active: false },
  ]

  return (
    <div className="border border-white/7 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 p-2 border-b border-white/7 bg-surface flex-wrap">
        {toolbarButtons.map((btn, i) => (
          <button
            key={i}
            type="button"
            onClick={btn.action}
            className={`p-1.5 rounded text-sm transition-colors ${
              btn.active
                ? 'bg-accent/20 text-accent'
                : 'text-text-muted hover:text-text hover:bg-white/5'
            }`}
          >
            <btn.icon size={14} />
          </button>
        ))}
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
            editor.isActive('codeBlock')
              ? 'bg-accent/20 text-accent'
              : 'text-text-muted hover:text-text hover:bg-white/5'
          }`}
        >
          {'</>'}
        </button>
      </div>

      {/* Editor Content */}
      <div className="bg-bg-01">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
```

---

## 6. Static Content Profesional

### 6.1 Seed Data — Profile

Jalankan sekali untuk mengisi data awal:

```typescript
// scripts/seed.ts
// Jalankan: npx tsx scripts/seed.ts

import { connectDB } from '../src/lib/mongodb'
import { Profile } from '../src/models/Profile'
import { SiteSettings } from '../src/models/SiteSettings'
import { Project } from '../src/models/Project'
import { BlogPost } from '../src/models/BlogPost'

async function seed() {
  await connectDB()

  // ── Profile ──────────────────────────────────────────────────────────────
  await Profile.deleteMany({})
  await Profile.create({
    name:       'Rizky Aditya Pratama',
    title:      'Senior Software Engineer',
    bio:        'Saya adalah backend-focused engineer dengan 5 tahun pengalaman membangun sistem distribusi, data pipeline, dan platform API yang scalable. Saya percaya bahwa software engineering yang baik dimulai dari pemahaman mendalam tentang problem — bukan dari pemilihan framework.',
    philosophy: 'Sistem terbaik bukan yang paling canggih, tapi yang paling mudah dipahami oleh orang berikutnya yang harus menjaganya.',
    location:   'Jakarta, Indonesia',
    email:      'rizky@example.com',
    resumeUrl:  '/resume.pdf',
    socialLinks: {
      github:   'https://github.com/rizky',
      linkedin: 'https://linkedin.com/in/rizky',
      twitter:  'https://twitter.com/rizky',
    },
    currentFocus: [
      'Distributed systems & event-driven architecture',
      'Database performance optimization',
      'Developer tooling & DX',
    ],
    skills: [
      { name: 'TypeScript',  category: 'language',   level: 5, yearsExp: 4 },
      { name: 'Python',      category: 'language',   level: 4, yearsExp: 5 },
      { name: 'Go',          category: 'language',   level: 3, yearsExp: 1 },
      { name: 'Next.js',     category: 'framework',  level: 5, yearsExp: 3 },
      { name: 'FastAPI',     category: 'framework',  level: 5, yearsExp: 3 },
      { name: 'PostgreSQL',  category: 'database',   level: 4, yearsExp: 4 },
      { name: 'MongoDB',     category: 'database',   level: 4, yearsExp: 3 },
      { name: 'Redis',       category: 'database',   level: 4, yearsExp: 3 },
      { name: 'Docker',      category: 'tool',       level: 4, yearsExp: 4 },
      { name: 'Kubernetes',  category: 'cloud',      level: 3, yearsExp: 2 },
      { name: 'AWS',         category: 'cloud',      level: 3, yearsExp: 3 },
      { name: 'System Design',      category: 'concept', level: 5 },
      { name: 'API Design',         category: 'concept', level: 5 },
      { name: 'Caching Strategy',   category: 'concept', level: 4 },
      { name: 'Event Sourcing',     category: 'concept', level: 3 },
    ],
    experiences: [
      {
        company:   'Tokopedia (GoTo Group)',
        role:      'Senior Software Engineer — Platform Infrastructure',
        startDate: '2022-03',
        endDate:   null,
        highlights: [
          'Designed and implemented distributed rate-limiting service handling 2M+ RPM using Redis Lua scripts, reducing abuse incidents by 94%',
          'Led migration of legacy PHP monolith service (300k LOC) to Go microservices, cutting p99 latency from 850ms to 120ms',
          'Built internal developer portal for service catalog management, used daily by 200+ engineers',
        ],
        techUsed: ['Go', 'Redis', 'Kafka', 'PostgreSQL', 'Kubernetes', 'Prometheus'],
      },
      {
        company:   'Bukalapak',
        role:      'Software Engineer — Search & Discovery',
        startDate: '2020-06',
        endDate:   '2022-02',
        highlights: [
          'Built Elasticsearch-based product search with fuzzy matching and typo correction, improving search conversion by 23%',
          'Implemented multi-layer caching strategy (L1 in-memory + L2 Redis) reducing average search latency from 480ms to 65ms',
          'Designed A/B testing framework for search ranking algorithm experiments, enabling 3 concurrent experiments without code deployment',
        ],
        techUsed: ['Python', 'Elasticsearch', 'Redis', 'FastAPI', 'PostgreSQL', 'Docker'],
      },
      {
        company:   'Freelance & Consulting',
        role:      'Full-Stack Engineer',
        startDate: '2019-01',
        endDate:   '2020-05',
        highlights: [
          'Delivered 8 client projects ranging from e-commerce platforms to data dashboards',
          'Specialized in building API backends with Python/Django and React frontends',
        ],
        techUsed: ['Python', 'Django', 'React', 'PostgreSQL', 'AWS'],
      },
    ],
  })

  // ── Site Settings ─────────────────────────────────────────────────────────
  await SiteSettings.deleteMany({})
  await SiteSettings.create({
    siteTitle:       'Rizky Aditya — Senior Software Engineer',
    siteDescription: 'Engineering portfolio yang menyajikan technical case studies, architecture decisions, dan bukti sistem thinking dari seorang senior backend engineer.',
    heroHeadline:    'I build systems that scale, docs that teach.',
    heroSubheadline: 'Senior Software Engineer specializing in distributed systems, API design, and platform infrastructure. Based in Jakarta.',
    ctaText: {
      primary:   'Read Case Studies',
      secondary: 'Download Resume',
    },
    featuredMetrics: [
      { label: 'Years Experience',    value: '5+'    },
      { label: 'Systems Shipped',     value: '20+'   },
      { label: 'Peak RPS Handled',    value: '2M+'   },
      { label: 'P99 Latency Reduced', value: '87%'   },
    ],
  })

  console.log('✓ Profile and SiteSettings seeded')

  // ── Projects ──────────────────────────────────────────────────────────────
  await Project.deleteMany({})

  await Project.insertMany([
    // PROJECT 1
    {
      title:        'Distributed Rate Limiting Service',
      slug:         'distributed-rate-limiter',
      tagline:      'Redis-based token bucket implementation handling 2M+ RPM with sub-millisecond overhead — rebuilt from scratch after the legacy PHP system caused 3 production incidents.',
      description:  'A high-performance distributed rate limiting service built to replace a naive in-process rate limiter that could not handle horizontal scaling. The new system uses Redis Lua scripts for atomic operations, supports multiple algorithms (token bucket, sliding window, fixed window), and serves as the central rate limiting authority for 40+ internal microservices.',
      status:       'published',
      featured:     true,
      featuredOrder: 1,
      year:         2023,
      duration:     '4 months',
      role:         'Lead Backend Engineer',
      teamSize:     3,
      demoUrl:      '',
      repoUrl:      'https://github.com/rizky/rate-limiter',
      tags:         ['go', 'redis', 'distributed-systems', 'api', 'microservices'],
      metrics: [
        { label: 'Peak Throughput',       value: '2.1M RPM',     context: 'Sustained for 4+ hours during flash sale' },
        { label: 'Rate limit overhead',   value: '< 0.8ms p99',  context: 'Added latency per request' },
        { label: 'Accuracy',              value: '99.97%',       context: 'vs target rate, measured over 30 days' },
        { label: 'Abuse reduction',       value: '94%↓',         context: 'Scraping incidents after deployment' },
        { label: 'Memory per 1M keys',    value: '~45MB',        context: 'Redis memory, sliding window algorithm' },
      ],
      sections: [
        {
          type: 'problem',
          title: 'Problem Statement',
          order: 0,
          content: `
<h3>Business Context</h3>
<p>Tokopedia's API gateway handled ~800k RPM at steady state with 2–4x spikes during flash sale events. The existing rate limiter was an in-process token bucket per API server instance — meaning each of our 12 gateway instances maintained its own counter, effectively multiplying the real rate limit by 12x.</p>
<p>This caused two categories of incident: (1) legitimate high-volume partners hitting limits that didn't exist in theory, and (2) abuse bots being under-throttled by 12x the intended rate.</p>
<h3>Constraints</h3>
<ul>
  <li>Must not add &gt;2ms p99 latency to the critical path</li>
  <li>Must support horizontal scaling without configuration changes</li>
  <li>Must support per-client, per-endpoint, and per-IP policies simultaneously</li>
  <li>Cannot require application code changes — must be transparent middleware</li>
  <li>Must degrade gracefully when Redis is unavailable (fail-open with monitoring)</li>
</ul>`,
        },
        {
          type: 'architecture',
          title: 'System Architecture',
          order: 1,
          content: `
<h3>High-Level Design</h3>
<p>The system is deployed as a sidecar service alongside each API gateway instance. Rate limit checks happen synchronously in the request path via a gRPC call, but the actual Redis operation is a single round-trip atomic Lua script — eliminating the need for distributed locks.</p>
<h3>Algorithm Selection</h3>
<p>After benchmarking three algorithms, we chose <strong>sliding window log</strong> for user-facing endpoints (accuracy critical) and <strong>token bucket</strong> for machine-to-machine endpoints (burst tolerance needed).</p>
<p>The sliding window log was too memory-intensive at scale — each request creates a timestamp entry. We solved this with a <strong>sliding window counter approximation</strong> that uses two fixed windows and interpolates, reducing memory by 94% with at most 0.1% overcounting error.</p>`,
        },
        {
          type: 'tradeoffs',
          title: 'Key Trade-offs',
          order: 2,
          content: `
<h3>Lua Script vs. WATCH/MULTI/EXEC</h3>
<p><strong>Decision:</strong> Atomic Lua script running server-side in Redis.</p>
<p><strong>Alternative considered:</strong> Optimistic locking with WATCH/MULTI/EXEC transaction.</p>
<p><strong>Rationale:</strong> Lua scripts are serialized in Redis's single-threaded execution model — true atomicity without retry loops. WATCH/EXEC requires retry on conflict, which becomes expensive under high contention. Lua adds ~0.1ms per script execution but eliminates all retry overhead.</p>
<h3>Fail-open vs. Fail-closed</h3>
<p><strong>Decision:</strong> Fail-open when Redis is unreachable.</p>
<p><strong>Rationale:</strong> A rate limiting failure should not take down customer-facing traffic. We accept the risk of temporary under-throttling in exchange for availability. The system emits a <code>rate_limiter.degraded</code> metric that triggers a PagerDuty alert within 30 seconds.</p>`,
        },
        {
          type: 'results',
          title: 'Results & Impact',
          order: 3,
          content: `
<h3>Measured Outcomes</h3>
<p>Deployed to production in March 2023. During the first major flash sale post-deployment, the service handled 2.1M RPM peak — 2.6x our previous record — with zero rate-limit accuracy incidents.</p>
<p>The most significant outcome was the <strong>94% reduction in API abuse incidents</strong>. The previous system was effectively not rate-limiting at all for distributed bots; the new system finally gave us real enforcement.</p>
<h3>Lessons Learned</h3>
<p>I underestimated the operational complexity of the key schema design. We initially used <code>rate_limit:{client_id}:{endpoint}</code> but this made it impossible to query "all limits for client X" without a SCAN command. Refactoring to a hash-per-client model mid-deployment was painful — I would design the key schema with observability in mind from day one.</p>`,
        },
      ],
      adrs: [
        {
          number:       1,
          title:        'Use Redis Lua Scripts for Atomic Rate Limit Operations',
          status:       'accepted',
          context:      'Rate limit check-and-increment must be atomic. Without atomicity, concurrent requests from the same client can all read count=N, all increment, and all pass — resulting in 2x or more over the limit.',
          decision:     'Use Redis server-side Lua scripts which execute atomically in Redis\'s single-threaded model.',
          consequences: 'Scripts must be kept short to avoid blocking other Redis operations. Version control for Lua scripts requires care — deploy script changes as new script versions and migrate gradually.',
          alternatives: ['WATCH/MULTI/EXEC optimistic locking — rejected due to retry overhead under contention', 'Single Redis instance as bottleneck — rejected, does not scale'],
        },
        {
          number:       2,
          title:        'Sliding Window Counter Approximation over Exact Sliding Window Log',
          status:       'accepted',
          context:      'Exact sliding window log (storing every request timestamp) requires O(N) memory per client per endpoint, where N is request count in the window. At 1000 RPM per client with 60s window, that\'s 1000 entries per key.',
          decision:     'Use sliding window counter approximation: two adjacent fixed windows + linear interpolation. Error rate ≤ 0.1% in practice.',
          consequences: 'Slight undercounting possible (up to 0.1%) at window boundaries. Acceptable for our SLA.',
          alternatives: ['Exact sliding window log — rejected due to O(N) memory', 'Fixed window counter — rejected due to thundering herd at window reset'],
        },
      ],
    },

    // PROJECT 2
    {
      title:        'Product Search Platform Rebuild',
      slug:         'product-search-platform',
      tagline:      'Elasticsearch + multi-layer caching rebuilt from scratch, cutting search latency from 480ms to 65ms and lifting conversion by 23% in 6 months.',
      description:  'A ground-up rebuild of Bukalapak\'s product search engine, replacing a deteriorating legacy system with a modern Elasticsearch-based platform featuring personalization, typo tolerance, and a flexible A/B testing framework for ranking experiments.',
      status:       'published',
      featured:     true,
      featuredOrder: 2,
      year:         2021,
      duration:     '6 months',
      role:         'Backend Engineer — Search Domain',
      teamSize:     5,
      repoUrl:      '',
      demoUrl:      '',
      tags:         ['python', 'elasticsearch', 'redis', 'fastapi', 'search', 'caching'],
      metrics: [
        { label: 'Search latency p99',  value: '480ms → 65ms', context: 'After multi-layer cache + ES tuning' },
        { label: 'Search conversion',   value: '+23%',         context: 'Items added-to-cart after search, 30-day average' },
        { label: 'Cache hit rate',      value: '78%',          context: 'L1 + L2 combined, popular query set' },
        { label: 'Index freshness',     value: '< 30 seconds', context: 'Product update to searchable' },
        { label: 'Query throughput',    value: '45k QPS',      context: 'Peak, during 9.9 sale event' },
      ],
      sections: [
        {
          type: 'problem',
          title: 'Problem Statement',
          order: 0,
          content: `
<h3>Context</h3>
<p>Bukalapak's search was built on Solr in 2015 and had accumulated years of patches, workarounds, and undocumented features. The system was a black box — no one fully understood how ranking worked, making algorithmic improvements essentially impossible without regression risk.</p>
<p>Key pain points: 480ms average latency, zero typo tolerance, no personalization signals, and a ranking model that hadn't been updated in 2 years.</p>
<h3>Success Criteria</h3>
<ul>
  <li>p99 latency &lt; 200ms (we hit 65ms)</li>
  <li>Typo tolerance for queries with ≤2 character errors</li>
  <li>A/B testable ranking pipeline</li>
  <li>Zero-downtime migration from Solr to Elasticsearch</li>
</ul>`,
        },
        {
          type: 'caching',
          title: 'Caching Strategy',
          order: 1,
          content: `
<h3>Multi-Layer Cache Design</h3>
<p>The dominant cost in search is Elasticsearch query execution. Popular queries (top 5% of queries represent ~60% of traffic) can be cached aggressively.</p>
<p><strong>L1: In-process LRU Cache</strong> — 500MB per service instance, TTL 60 seconds. Handles repeated identical queries within a short window. No network hop. Python's <code>cachetools.LRUCache</code> with thread-safe access.</p>
<p><strong>L2: Redis Cache</strong> — Cross-instance shared cache. TTL 5 minutes for popular queries, 30 seconds for rare queries (determined by query frequency score). Keys are normalized query hashes — stemmed, lowercased, stop words removed — so "Sepatu Lari Nike" and "sepatu lari nike" hit the same key.</p>
<h3>Cache Invalidation</h3>
<p>We use a Kafka consumer that listens to product update events and invalidates affected cache keys. The challenge: a product update could affect thousands of search queries. We solved this by tagging cache entries with the product IDs they contain (stored as a Redis set per product ID pointing to query hashes). An update to product P invalidates all entries in <code>product_queries:{product_id}</code>.</p>`,
        },
      ],
      adrs: [
        {
          number:       1,
          title:        'Elasticsearch over Solr for New Search Engine',
          status:       'accepted',
          context:      'We needed to migrate from a poorly-understood Solr cluster. Both Solr and Elasticsearch were evaluated.',
          decision:     'Elasticsearch 7.x. Key factors: better REST API, richer aggregation framework, native vector search support for future ML features, stronger tooling ecosystem (Kibana vs. Solr Admin).',
          consequences: 'Team needed 2 weeks of Elasticsearch training. Index mapping language is different from Solr schema, requiring rewrite of all index definitions.',
          alternatives: ['Stay on Solr — rejected, technical debt too deep', 'Build on PostgreSQL full-text search — rejected, not suitable for 50M+ product catalog'],
        },
      ],
    },

    // PROJECT 3
    {
      title:        'Internal Developer Portal',
      slug:         'internal-developer-portal',
      tagline:      'Service catalog, runbook hub, and dependency visualizer — adopted by 200+ engineers within 30 days of launch, replacing scattered Confluence pages and Notion docs.',
      description:  'A Next.js-based internal developer portal that aggregates service metadata from GitHub, Datadog, and PagerDuty into a single searchable catalog with automated runbook generation, dependency visualization, and on-call rotation management.',
      status:       'published',
      featured:     true,
      featuredOrder: 3,
      year:         2023,
      duration:     '3 months',
      role:         'Lead Engineer & Product Owner',
      teamSize:     2,
      repoUrl:      '',
      demoUrl:      '',
      tags:         ['next.js', 'typescript', 'mongodb', 'github-api', 'datadog', 'developer-tools'],
      metrics: [
        { label: 'Active users (30d)',        value: '200+ engineers' },
        { label: 'Services catalogued',       value: '340 services' },
        { label: 'Mean time to find runbook', value: '45s → 8s'    },
        { label: 'Onboarding time reduction', value: '~40%',        context: 'New engineer ramp-up, self-reported survey' },
        { label: 'Weekly active searches',    value: '3.2k queries' },
      ],
      sections: [
        {
          type: 'problem',
          title: 'Problem Statement',
          order: 0,
          content: `
<h3>The Documentation Graveyard Problem</h3>
<p>In a 500-engineer organization with 340+ microservices, documentation lives everywhere: Confluence, Notion, GitHub READMEs, private Slack channels, and engineers' heads. When an incident occurs at 2am, the on-call engineer spends 5–10 minutes just <em>finding</em> the relevant runbook — before debugging even begins.</p>
<p>New engineers take 3–4 weeks to understand service boundaries and ownership because there's no authoritative source of truth.</p>
<h3>Our Approach: Pull, Don't Push</h3>
<p>Instead of asking engineers to maintain another documentation system (which they won't), we automatically pulled metadata from existing systems they already use: GitHub for code owners, Datadog for SLIs/SLOs, PagerDuty for on-call schedules, and Kafka schema registry for event contracts.</p>`,
        },
        {
          type: 'architecture',
          title: 'Architecture',
          order: 1,
          content: `
<h3>Data Pipeline</h3>
<p>A background sync job (Node.js, runs every 15 minutes) pulls from GitHub API, Datadog API, and PagerDuty API, normalizes the data, and upserts to MongoDB. The frontend reads from MongoDB via Next.js server components.</p>
<p>We chose MongoDB because service metadata is naturally a document — a service has owners, dependencies, alert rules, and SLOs as nested objects. Schema flexibility was critical because different services expose different metadata.</p>
<h3>Search</h3>
<p>MongoDB Atlas Search (Lucene-based) powers the command-palette-style universal search. Engineers can search by service name, tag, team, technology, or even text in runbook content. Response time is &lt;80ms p99.</p>`,
        },
      ],
      adrs: [],
    },
  ])

  console.log('✓ Projects seeded (3 flagship projects)')

  // ── Blog Posts ────────────────────────────────────────────────────────────
  await BlogPost.deleteMany({})
  await BlogPost.insertMany([
    {
      title:      'Designing Portfolio Systems That Prove Technical Depth',
      slug:       'designing-portfolio-systems-prove-depth',
      excerpt:    'Most developer portfolios answer "what did you build?" but fail to answer "how did you think?". Here\'s the architecture behind building a portfolio that reads like an internal engineering dossier.',
      content:    '<p>When hiring managers review portfolios, they\'re running a mental simulation: <em>can this person solve my team\'s actual problems?</em> Screenshots and GitHub links don\'t run that simulation. Case studies do.</p><p>The key insight is treating each project as a mini Technical Design Document, not a project showcase...</p>',
      tags:       ['engineering', 'career', 'portfolio', 'documentation'],
      status:     'published',
      readTimeMin: 8,
      publishedAt: new Date('2024-01-15'),
    },
    {
      title:      'Cache Strategy Trade-offs in Small Products',
      slug:       'cache-strategy-tradeoffs-small-products',
      excerpt:    'You don\'t need Redis clusters and consistent hashing to build a good caching layer. Here\'s a pragmatic decision framework for teams of 1–5 engineers.',
      content:    '<p>The most common caching mistake I see in small products isn\'t using the wrong algorithm — it\'s using caching at all before profiling. Premature caching adds complexity without solving a real problem...</p>',
      tags:       ['caching', 'redis', 'performance', 'architecture'],
      status:     'published',
      readTimeMin: 12,
      publishedAt: new Date('2024-02-03'),
    },
    {
      title:      'Writing ADRs for Solo Projects',
      slug:       'writing-adrs-for-solo-projects',
      excerpt:    'Architecture Decision Records aren\'t just for teams. Writing ADRs alone forces the discipline of articulating your reasoning — and makes you look like a senior engineer in any code review or portfolio review.',
      content:    '<p>I started writing ADRs for personal projects two years ago, and it completely changed how I make technical decisions. Not because the documents are useful (they are) — but because the act of writing them forces clarity of thinking that I wouldn\'t have otherwise...</p>',
      tags:       ['adr', 'documentation', 'architecture', 'engineering-practices'],
      status:     'published',
      readTimeMin: 6,
      publishedAt: new Date('2024-03-10'),
    },
  ])

  console.log('✓ Blog posts seeded (3 articles)')
  console.log('\n✅ Seed complete.')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
```

---

## 7. Halaman Publik

### 7.1 Homepage

```typescript
// src/app/(public)/page.tsx
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import { Profile } from '@/models/Profile'
import { SiteSettings } from '@/models/SiteSettings'
import HeroSection from '@/components/home/HeroSection'
import MetricsBar from '@/components/home/MetricsBar'
import FlagshipProjects from '@/components/home/FlagshipProjects'
import TerminalAbout from '@/components/home/TerminalAbout'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  await connectDB()
  const settings = await SiteSettings.findOne().lean()
  return {
    title:       settings?.siteTitle       ?? 'Portfolio',
    description: settings?.siteDescription ?? '',
    openGraph: {
      title:       settings?.siteTitle ?? '',
      description: settings?.siteDescription ?? '',
      type:        'website',
    },
  }
}

export default async function HomePage() {
  await connectDB()

  const [profile, settings, featuredProjects] = await Promise.all([
    Profile.findOne().lean(),
    SiteSettings.findOne().lean(),
    Project.find({ status: 'published', featured: true })
      .sort({ featuredOrder: 1 })
      .limit(3)
      .select('title slug tagline metrics tags year role coverImage')
      .lean(),
  ])

  return (
    <main>
      <HeroSection
        headline={settings?.heroHeadline ?? ''}
        subheadline={settings?.heroSubheadline ?? ''}
        ctaText={settings?.ctaText}
        name={profile?.name ?? ''}
        title={profile?.title ?? ''}
        location={profile?.location ?? ''}
        socialLinks={profile?.socialLinks}
        resumeUrl={profile?.resumeUrl ?? '/resume.pdf'}
      />
      <MetricsBar metrics={settings?.featuredMetrics ?? []} />
      <FlagshipProjects projects={featuredProjects as any} />
      <TerminalAbout
        philosophy={profile?.philosophy ?? ''}
        currentFocus={profile?.currentFocus ?? []}
        skills={profile?.skills ?? []}
      />
    </main>
  )
}
```

---

### 7.2 Project Detail (Case Study)

```typescript
// src/app/(public)/projects/[slug]/page.tsx
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import { notFound } from 'next/navigation'
import CaseStudyLayout from '@/components/project/CaseStudyLayout'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectDB()
  const project = await Project.findOne({ slug: params.slug, status: 'published' }).lean()
  if (!project) return {}
  return {
    title:       `${project.title} — Case Study`,
    description: project.tagline,
    openGraph: {
      title:       project.title,
      description: project.tagline,
      type:        'article',
      tags:        project.tags,
    },
  }
}

// Pre-generate static paths at build time
export async function generateStaticParams() {
  await connectDB()
  const projects = await Project.find({ status: 'published' }).select('slug').lean()
  return projects.map(p => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: Props) {
  await connectDB()
  const project = await Project.findOne({ slug: params.slug, status: 'published' }).lean()
  if (!project) notFound()

  return <CaseStudyLayout project={project as any} />
}
```

---

## 8. API Routes

### 8.1 Projects API

```typescript
// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import slugify from 'slugify'

// GET /api/projects — public, returns published projects
export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const featured = searchParams.get('featured')
  const tag      = searchParams.get('tag')

  const filter: Record<string, unknown> = { status: 'published' }
  if (featured) filter.featured = true
  if (tag) filter.tags = tag

  const projects = await Project
    .find(filter)
    .sort({ featuredOrder: 1, createdAt: -1 })
    .select('-sections -adrs')   // Exclude heavy fields for list view
    .lean()

  return NextResponse.json({ projects })
}

// POST /api/projects — admin only
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const body = await req.json()

  // Auto-generate slug if not provided
  if (!body.slug && body.title) {
    body.slug = slugify(body.title, { lower: true, strict: true })
  }

  const project = await Project.create(body)
  return NextResponse.json({ project }, { status: 201 })
}
```

```typescript
// src/app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models/Project'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB()
  // Support both id and slug
  const project = await Project.findOne({
    $or: [{ _id: params.id }, { slug: params.id }],
    status: 'published',
  }).lean()

  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ project })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const body = await req.json()
  const project = await Project.findByIdAndUpdate(
    params.id,
    { ...body, updatedAt: new Date() },
    { new: true, runValidators: true }
  )

  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ project })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  await Project.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
```

---

### 8.2 Upload API (Cloudinary)

```typescript
// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 413 })

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 415 })
  }

  const bytes  = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

  const result = await cloudinary.uploader.upload(base64, {
    folder: 'portfolio',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })

  return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
}
```

---

## 9. Environment Variables

### `.env.example`

```bash
# ─── Database ────────────────────────────────────────────────────────────────
# MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true
# Self-hosted:   mongodb://localhost:27017/portfolio
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/portfolio

# ─── Authentication ──────────────────────────────────────────────────────────
# Generate: openssl rand -base64 32
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Admin credentials (bcrypt hash — generate with scripts/hash-password.ts)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=$2b$12$YOUR_BCRYPT_HASH_HERE

# ─── Image Upload (Cloudinary) ───────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# ─── App Settings ────────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
NODE_ENV=development
```

### Generate Admin Password Hash

```typescript
// scripts/hash-password.ts
// Run: npx tsx scripts/hash-password.ts
import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password) {
  console.error('Usage: npx tsx scripts/hash-password.ts YOUR_PASSWORD')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 12)
console.log('Add to .env.local:')
console.log(`ADMIN_PASSWORD_HASH=${hash}`)
```

---

## 10. Deployment

### 10.1 Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod

# 3. Set environment variables via Vercel dashboard
# Settings → Environment Variables → tambahkan semua dari .env.example
```

MongoDB Atlas free tier (M0) cukup untuk portfolio. Whitelist Vercel's IP ranges atau enable "Allow Access from Anywhere" untuk development.

---

### 10.2 VPS dengan Docker

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - ADMIN_EMAIL=${ADMIN_EMAIL}
      - ADMIN_PASSWORD_HASH=${ADMIN_PASSWORD_HASH}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certbot/conf:/etc/letsencrypt:ro
    depends_on:
      - web
    restart: unless-stopped
```

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',   // Required untuk Docker deployment
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
```

---

### 10.3 Scripts yang Perlu Ditambah ke `package.json`

```json
{
  "scripts": {
    "dev":        "next dev",
    "build":      "next build",
    "start":      "next start",
    "lint":       "next lint",
    "seed":       "npx tsx scripts/seed.ts",
    "hash-pass":  "npx tsx scripts/hash-password.ts",
    "typecheck":  "tsc --noEmit"
  }
}
```

---

### 10.4 Urutan Setup Pertama Kali

```bash
# 1. Clone / inisialisasi proyek
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd portfolio

# 2. Install semua dependencies
npm install mongoose next-auth @next-auth/mongodb-adapter framer-motion lucide-react clsx tailwind-merge @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-code-block-lowlight lowlight react-hook-form zod @hookform/resolvers slugify bcryptjs date-fns

npm install -D @types/bcryptjs prettier prettier-plugin-tailwindcss

# 3. Copy seluruh kode dari dokumen ini ke struktur direktori yang tepat

# 4. Buat .env.local dari .env.example dan isi value-nya

# 5. Generate password hash untuk admin
npx tsx scripts/hash-password.ts "your-secure-password"
# Salin output ke ADMIN_PASSWORD_HASH di .env.local

# 6. Seed database dengan data profesional
npx tsx scripts/seed.ts

# 7. Jalankan development server
npm run dev
# Buka http://localhost:3000         → Portfolio publik
# Buka http://localhost:3000/admin   → CMS (login dengan ADMIN_EMAIL + password)
```

---

## Ringkasan CMS Capabilities

| Fitur | Path | Keterangan |
|---|---|---|
| Dashboard stats | `/admin` | Jumlah proyek, artikel, status ringkas |
| Kelola proyek | `/admin/projects` | CRUD, drag-reorder sections, rich text editor |
| Buat case study baru | `/admin/projects/new` | Form lengkap dengan semua section types |
| Kelola blog | `/admin/blog` | CRUD artikel dengan TipTap editor |
| Edit profil | `/admin/profile` | Update bio, skills, experience, social links |
| Kelola ADR | `/admin/adrs` | Tambah/edit Architecture Decision Records |
| Site settings | `/admin/site-settings` | Hero text, SEO defaults, featured metrics |
| Upload gambar | (via form) | Cloudinary upload terintegrasi di semua form |

---

*Portfolio v2.0 — MongoDB-integrated, CMS-powered, deployable in one session.*

```
// portfolio.v2 — Engineered with intentionality.
// Database: MongoDB  · CMS: Built-in  · Auth: NextAuth
// Install from: npx create-next-app@latest
```
