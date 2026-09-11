This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Database Configuration & Seeding

This project requires MongoDB to store and manage dynamic content.

### 1. Configure environment variables
Copy `.env.example` to `.env` or `.env.local` and define your `MONGODB_URI`:
```bash
cp .env.example .env
```
Inside `.env`, set:
```env
MONGODB_URI=your-mongodb-connection-string
```

### 2. Seeding the Database
To reset the database and seed it with the fully localized (Indonesian and English) profile, settings, projects, and blog posts, run:
```bash
npm run seed
```
This script will:
- Clear existing records for profiles, settings, projects, and blog posts.
- Insert the new, rich bilingual records from `src/data/seed-data.ts`.


---

## Admin Portal Setup & Authentication

The portfolio includes a secure, private administration panel under `/admin` powered by NextAuth v5 (Auth.js) and Credentials provider.

### 1. Configure Authentication Variables (`.env`)
To log in successfully, ensure your `.env` contains the following exact configuration:

```env
# 1. NextAuth Core
AUTH_SECRET=your-random-32-char-secret-key
AUTH_TRUST_HOST=true

# 2. NextAuth Endpoints (CRITICAL: Must end with /api/auth)
AUTH_URL=http://localhost:3000/api/auth
NEXTAUTH_URL=http://localhost:3000/api/auth
NEXTAUTH_SECRET=your-random-32-char-secret-key

# 3. Admin Credentials
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD_HASH=your-bcrypt-password-hash
```

> [!IMPORTANT]
> **Why sign-in redirects fail:**
> NextAuth v5 requires the auth path prefix (`/api/auth`) inside the `AUTH_URL` env variable. If `AUTH_URL` is set to `http://localhost:3000` without `/api/auth`, the sign-in page will throw a 404/500 error or redirect loop because NextAuth assumes the endpoints are mapped at `/` instead of `/api/auth`.

> [!CAUTION]
> **Iframe & IDE Preview Panel Limitations (Clickjacking Protection):**
> NextAuth v5 implements strict security defaults, including sending the `X-Frame-Options: DENY` header on all authentication routes.
> 
> If you try to view the `/admin` dashboard or `/api/auth/signin` inside an **IDE web preview frame** (e.g., Cursor preview, VS Code preview, Project IDX pane), the browser will block the frame from loading the page. This leads to a blank screen or a Chrome error page (`chrome-error://chromewebdata/`) and console logs warning of an `"Unsafe attempt to load URL..."`.
> 
> **Solution:** Do not test the `/admin` sign-in process inside the IDE preview panel. Instead, open a new, native browser tab at `http://localhost:3000/admin` to log in. Once logged in, your session cookie will be set, and you can view the dashboard.

### 2. How to Generate Your Admin Password Hash
Passwords must be securely hashed using bcrypt. We have included a hashing helper script in the repository:
1. Run the hashing helper:
   ```bash
   npm run hash-pass -- yourpassword123
   ```
2. Copy the generated `ADMIN_PASSWORD_HASH=...` output string.
3. Paste it directly into your `.env` file.

### 3. Signing In
1. Start your local development server (`npm run dev`).
2. Navigate to `http://localhost:3000/admin`.
3. The application will detect your unauthenticated session and automatically redirect you to the built-in login portal:
   `http://localhost:3000/api/auth/signin?callbackUrl=/admin`
4. Enter the `ADMIN_EMAIL` and the plain text password (not the bcrypt hash) you configured in step 2.
5. Click **Sign in with Admin credentials**. Upon successful verification, you will be redirected to the secure CMS dashboard under `/admin`.

---

## Personalization & Content Customization

Follow this guide to fully customize the portfolio with your real achievements, dynamic content, and personal photo.

### 1. Setting Up Your Personal Photo (Avatar)
You have two robust options to configure your personal avatar image:

#### Option A: Local Static Asset (Recommended for Simplicity)
1. Drop your personal photo in the `public/` directory (e.g., save it as `public/avatar.jpg`).
2. Reference it as a relative URL (`/avatar.jpg`) directly in the **Profile Form** image field via the Admin Dashboard, or update the `avatar` field inside `src/data/seed-data.ts`:
   ```typescript
   avatar: "/avatar.jpg"
   ```

#### Option B: Cloudinary Integration (For Dynamic Admin Uploads)
The CMS forms have a premium visual image uploader built-in. To enable it, register a free account on [Cloudinary](https://cloudinary.com/) and add your API credentials to your `.env` file:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Once added, the image dropzone inputs in `/admin` will upload images securely to Cloudinary and populate the avatar/cover image fields automatically!

---

### 2. Populating Your Real Content
To transition from dummy/mock data to a premium, high-converting professional portfolio, follow this step-by-step approach:

#### Method A: Developer-First Seeding (Keep Content in Git)
Highly recommended if you want to keep your initial setup tracked in version control:
1. Open the file `src/data/seed-data.ts` in your code editor.
2. Edit `seedProfile`, `seedSettings`, `seedProjects`, and `seedBlogPosts` with your own titles, descriptions, metrics, and case studies.
3. Run the database seed command to overwrite the MongoDB collection:
   ```bash
   npm run seed
   ```

#### Method B: Interactive CMS Admin Panel (Zero-Code Management)
For immediate, on-the-fly updates without modifying any source files:
1. Access the ultra-premium administration panel at `http://localhost:3000/admin`.
2. Navigate through the custom operations dashboard:
   - **Profile Tab**: Customize your bilingual details, bio, values, skills, and chronological experience highlights.
   - **Site Settings Tab**: Fine-tune your landing page headlines, secondary Call-To-Action labels, home metrics, and toggle Maintenance Mode.
   - **Projects Tab**: Create or edit case studies using strictly-typed interactive subforms (Metrics, Tech Stack lists, collapsible sections, and ADRs) — **completely eliminating manual JSON writing**.
   - **Blog Tab**: Write technical logs, design trade-offs, and technical articles using tabbed side-by-side translation panels.

---

### 3. What Content You Need to Gather
A premium engineering portfolio succeeds on **empirical evidence and rigorous reasoning**. Gather the following content pieces to populate your website:

* **Bilingual Taglines**: Draft clear, 1-sentence summaries of what you build in both English and Indonesian (e.g., *"I build highly concurrent distributed systems"* ⇄ *"Saya membangun sistem terdistribusi dengan konkurensi tinggi"*).
* **Hard Quantitative Metrics (Receipts)**: Collect empirical throughput numbers (e.g., peak requests per minute, database search latency reductions, cost-savings, build time optimizations).
* **Architectural Decision Records (ADRs)**: Identify major architectural choices in your projects, listing **Context**, **Decision**, **Consequences**, and **Alternatives** considered (e.g., *Choosing Redis Cache vs. Memory Cache*).
* **Bilingual Technical Blog Posts**: Formulate technical posts highlighting real-world trade-offs, deep post-mortems, or system design principles.

