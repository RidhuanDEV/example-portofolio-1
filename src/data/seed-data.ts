import type {
  BlogPostRecord,
  ProfileRecord,
  ProjectRecord,
  SiteSettingsRecord,
} from "@/types/domain";

export const seedProfile: ProfileRecord = {
  name: "Ridhuan Rangga Kusuma",
  title: {
    en: "Full-Stack Software Engineer & QA Specialist",
    id: "Full-Stack Software Engineer & Spesialis QA",
  },
  bio: {
    en: "Full-Stack Software Engineer, Mobile Developer, and Quality Assurance Specialist (B.Sc. in Informatics Engineering, Institut Teknologi Indonesia, GPA 3.92/4.00; Bangkit Academy Mobile Development). Experienced in architecting national-scale GovTech platforms, OAuth 2.0/OIDC identity providers, real-time Go/MQTT IoT systems, offline-first mobile apps, and AI/Computer Vision pipelines backed by automated testing.",
    id: "Full-Stack Software Engineer, Mobile Developer, dan Spesialis Quality Assurance (S1 Teknik Informatika Institut Teknologi Indonesia, IPK 3,92/4,00; MSIB Bangkit Academy Mobile Development). Berpengalaman merancang platform GovTech dan enterprise skala produksi, Identity Provider OAuth 2.0/OIDC mandiri, sistem IoT real-time Go/MQTT, aplikasi mobile offline-first, serta pipeline AI dan Computer Vision dengan pengujian otomatis yang terukur.",
  },
  philosophy: {
    en: "Good software engineering starts with explicit data contracts, measurable failure modes, and automated verification before shipping.",
    id: "Rekayasa perangkat lunak yang baik dimulai dari kontrak data yang jelas, mitigasi mode kegagalan yang terukur, dan verifikasi otomatis sebelum rilis.",
  },
  avatar: "/profilsaya.jpg",
  location: {
    en: "Jakarta, Indonesia",
    id: "Jakarta, Indonesia",
  },
  email: "ridhuanranggakusuma@gmail.com",
  phone: "+62 821-1347-2156",
  resumeUrl: "/resume.pdf",
  socialLinks: {
    github: "https://github.com/RidhuanDEV",
    linkedin: "https://www.linkedin.com/in/ridhuan-rangga-kusuma-146241292/",
  },
  currentFocus: [
    {
      en: "High-concurrency Go/Node.js backends, OIDC security, and resilient state synchronization",
      id: "Backend Go/Node.js berkonkurensi tinggi, keamanan OIDC, dan sinkronisasi state yang tangguh",
    },
    {
      en: "AI developer tooling, Model Context Protocol (MCP) servers, and GPU-accelerated local inference",
      id: "Tooling developer AI, server Model Context Protocol (MCP), dan inferensi lokal berakselerasi GPU",
    },
    {
      en: "Automated quality gates across Playwright E2E, Vitest, Pytest, and empirical visual benchmarks",
      id: "Gerbang kualitas otomatis melalui Playwright E2E, Vitest, Pytest, dan benchmark visual empiris",
    },
  ],
  skills: [
    { name: "TypeScript", category: "language", level: 5, yearsExp: 3 },
    { name: "Go (Golang)", category: "language", level: 4, yearsExp: 2 },
    { name: "Python", category: "language", level: 4, yearsExp: 3 },
    { name: "Kotlin", category: "language", level: 4, yearsExp: 2 },
    { name: "Dart", category: "language", level: 4, yearsExp: 2 },
    { name: "PHP", category: "language", level: 4, yearsExp: 3 },
    { name: "Next.js", category: "framework", level: 5, yearsExp: 3 },
    { name: "React 19", category: "framework", level: 5, yearsExp: 3 },
    { name: "Vue.js", category: "framework", level: 4, yearsExp: 2 },
    { name: "NestJS", category: "framework", level: 4, yearsExp: 2 },
    { name: "Express.js", category: "framework", level: 5, yearsExp: 3 },
    { name: "FastAPI", category: "framework", level: 4, yearsExp: 2 },
    { name: "Flutter", category: "framework", level: 4, yearsExp: 2 },
    { name: "Jetpack Compose", category: "framework", level: 4, yearsExp: 2 },
    { name: "PostgreSQL", category: "database", level: 5, yearsExp: 3 },
    { name: "MySQL", category: "database", level: 5, yearsExp: 3 },
    { name: "MongoDB", category: "database", level: 4, yearsExp: 2 },
    { name: "Redis", category: "database", level: 4, yearsExp: 2 },
    { name: "Docker & Compose", category: "cloud", level: 4, yearsExp: 3 },
    { name: "Playwright & Vitest", category: "tool", level: 5, yearsExp: 2 },
    { name: "MCP & AI Pipelines", category: "concept", level: 5, yearsExp: 2 },
    { name: "OAuth 2.0 / OIDC & RBAC", category: "concept", level: 5, yearsExp: 2 },
  ],
  experiences: [
    {
      company: "PT Eka Abhipraya Semesta",
      role: {
        en: "Fullstack Software Engineer",
        id: "Fullstack Software Engineer",
      },
      startDate: "2025-08",
      endDate: null,
      highlights: [
        {
          en: "Architected National Freight & Consolidated Logistics E-Manifest System (v2), decoupling point-to-point routes into multi-consignment, multi-stop cargo models with Binary(16) UUID primary keys, hazardous goods (B3/HS Code) validation, and fault-tolerant Level-H QR PDF generation.",
          id: "Merancang arsitektur National Freight & Consolidated Logistics E-Manifest System (v2), mendekoupling rute titik tunggal menjadi model kargo multi-konsinyasi dan multi-stop dengan Binary(16) UUID, validasi barang berbahaya (B3/HS Code), serta generator PDF ber-QR Code Level H.",
        },
        {
          en: "Engineered modules across a GovTech Public Relations & Communications Platform spanning 65 functional domains, dual-layer NestJS/Vue RBAC guards, Redis session caching, MinIO storage, and institutional SSO/HR integrations.",
          id: "Mengembangkan modul pada GovTech Public Relations & Communications Platform mencakup 65 domain fungsional, RBAC dua lapis (NestJS & Vue), sesi Redis, penyimpanan objek MinIO, serta integrasi SSO dan kepegawaian instansi.",
        },
        {
          en: "Built frontend architecture for a GovTech Smart Building IoT & Executive Analytics Portal (React 19, TypeScript, TanStack Router/Query, Three.js) delivering 2D/3D IoT floor monitoring, ALPR Smart Parking with role-based plate masking, and a citation-grounded RAG assistant chatbot.",
          id: "Membangun arsitektur frontend GovTech Smart Building IoT & Executive Analytics Portal (React 19, TypeScript, TanStack Router/Query, Three.js) untuk monitoring IoT gedung 2D/3D, analitik Smart Parking ALPR dengan penyamaran plat per peran, dan chatbot asisten RAG berbasis sitasi.",
        },
        {
          en: "Developed an Enterprise Multi-Project Task Orchestration MCP Server (TypeScript) and a GPU-accelerated Local Meeting Transcriber (FastAPI + Faster-Whisper CUDA + Pyannote Diarization + MySQL) with strict per-user isolation.",
          id: "Mengembangkan Enterprise Multi-Project Task Orchestration MCP Server (TypeScript) serta Local Meeting Transcriber berakselerasi GPU CUDA (FastAPI + Faster-Whisper + Pyannote Diarization + MySQL) dengan isolasi data per akun.",
        },
      ],
      techUsed: [
        "TypeScript",
        "Next.js",
        "React 19",
        "Vue.js",
        "NestJS",
        "FastAPI",
        "Prisma ORM",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "MinIO",
        "Docker",
      ],
    },
    {
      company: "PT Eka Abhipraya Semesta",
      role: {
        en: "Software Quality Assurance (SQA) & AI/Computer Vision Intern",
        id: "Magang Software Quality Assurance (SQA) & AI/Computer Vision",
      },
      startDate: "2025-03",
      endDate: "2025-07",
      highlights: [
        {
          en: "Executed end-to-end functional and non-functional testing, systematic bug documentation, and collaborative debugging workflows, earning 95/100 final evaluation scores in Software Quality Assurance and Practical Work.",
          id: "Melaksanakan pengujian fungsional dan non-fungsional secara menyeluruh, dokumentasi bug sistematis, serta alur debugging kolaboratif dengan raihan nilai akhir 95/100 pada Penjaminan Mutu Perangkat Lunak dan Kerja Praktek.",
        },
        {
          en: "Benchmarked and integrated OCR engines (Tesseract, Google Vision AI, Gemini AI) across accuracy, latency, and API cost, alongside subscription-based API quota enforcement.",
          id: "Mengevaluasi dan mengintegrasikan model OCR (Tesseract, Google Vision AI, Gemini AI) dari sisi akurasi, kecepatan, dukungan bahasa, dan biaya API beserta skema pembatasan kuota berbasis langganan.",
        },
        {
          en: "Built and validated Python-based Computer Vision assistive software integrated with the NVDA screen reader to deliver accessible audio feedback for visually impaired users.",
          id: "Merancang dan menguji perangkat lunak asistif berbasis Computer Vision (Python) yang terintegrasi dengan screen reader NVDA untuk memberikan keluaran suara aksesibel bagi pengguna tunanetra.",
        },
      ],
      techUsed: ["Python", "Computer Vision", "OCR", "NVDA Add-on", "QA Testing", "GitLab CI"],
    },
    {
      company: "Higher Education Research & Community Service Center",
      role: {
        en: "Fullstack Software Engineer - Academic Grant & IPR Governance Platform",
        id: "Fullstack Software Engineer - Platform Tata Kelola Riset, Hibah & HKI",
      },
      startDate: "2025-01",
      endDate: "2026-09",
      highlights: [
        {
          en: "Architected an integrated academic grant, peer-review, and IPR governance platform spanning 19 business modules, 61 relational Sequelize/MySQL models, and 138 granular RBAC permissions.",
          id: "Merancang platform terintegrasi untuk manajemen hibah penelitian, pengabdian masyarakat, dan sentra HKI mencakup 19 modul bisnis, 61 model relasional Sequelize/MySQL, serta 138 izin akses RBAC granular.",
        },
        {
          en: "Implemented PDF.js canvas annotations for reviewer feedback, digital official signatures, automated external research index crawling, and automated assignment letter PDF generation.",
          id: "Mengimplementasikan anotasi PDF berbasis kanvas (PDF.js), tanda tangan digital pengusul dan pejabat, web crawler indeks publikasi akademik otomatis, serta generator PDF surat tugas.",
        },
        {
          en: "Verified authorization boundaries and audit trails with Playwright E2E regression suites, WIB timezone audit-log unit tests, and Bruno API collections.",
          id: "Memverifikasi batas otorisasi dan jejak audit menggunakan suite regresi Playwright E2E, unit test Audit Log WIB, dan koleksi API Bruno.",
        },
      ],
      techUsed: [
        "React 18",
        "TypeScript",
        "TanStack Query",
        "Express.js",
        "Sequelize",
        "MySQL",
        "PDF.js",
        "Playwright",
      ],
    },
    {
      company: "Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)",
      role: {
        en: "Mobile Development Cohort (MSIB)",
        id: "Mobile Development Cohort (MSIB)",
      },
      startDate: "2024-02",
      endDate: "2024-07",
      highlights: [
        {
          en: "Completed native Android development track covering Kotlin, Jetpack Compose, Clean Architecture, TensorFlow Lite on-device ML integration, Location/Geofencing APIs, and automated UI/unit testing.",
          id: "Menyelesaikan spesialisasi pengembangan Android native meliputi Kotlin, Jetpack Compose, Clean Architecture, integrasi TensorFlow Lite (on-device ML), Location/Geofencing API, serta pengujian UI dan unit otomatis.",
        },
      ],
      techUsed: ["Kotlin", "Jetpack Compose", "TensorFlow Lite", "Android", "Firebase"],
    },
  ],
  education: [
    {
      institution: "Institut Teknologi Indonesia",
      degree: {
        en: "Bachelor of Informatics Engineering (S.Kom)",
        id: "S1 Teknik Informatika (S.Kom)",
      },
      period: "2022 - 2026",
      gpa: "3.92 / 4.00",
      highlights: [
        {
          en: "Core focus: Cloud Computing, Computer Vision, Natural Language Processing, Software Quality Assurance (95/100), and Distributed Systems.",
          id: "Fokus utama: Komputasi Awan, Pengolahan Citra, Pemrosesan Bahasa Alami, Penjaminan Mutu Perangkat Lunak (95/100), dan Sistem Terdistribusi.",
        },
      ],
    },
    {
      institution: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
      degree: {
        en: "Mobile Development Learning Path (MSIB)",
        id: "Jalur Pembelajaran Mobile Development (MSIB)",
      },
      period: "2024",
      highlights: [
        {
          en: "Native Android engineering with Kotlin, Jetpack Compose, TensorFlow Lite, and end-to-end mobile quality assurance.",
          id: "Rekayasa Android native dengan Kotlin, Jetpack Compose, TensorFlow Lite, dan penjaminan mutu aplikasi mobile.",
        },
      ],
    },
  ],
};

export const seedSettings: SiteSettingsRecord = {
  siteTitle: {
    en: "Ridhuan Rangga Kusuma - Full-Stack Software Engineer & QA Specialist",
    id: "Ridhuan Rangga Kusuma - Full-Stack Software Engineer & Spesialis QA",
  },
  siteDescription: {
    en: "Engineering portfolio showcasing production case studies, architecture decision records, empirical benchmarks, and verifiable QA across GovTech, IoT, OIDC security, and AI tooling.",
    id: "Portofolio rekayasa perangkat lunak yang menyajikan studi kasus produksi, keputusan arsitektur (ADR), benchmark empiris, dan QA terverifikasi pada sistem GovTech, IoT, keamanan OIDC, serta tooling AI.",
  },
  maintenanceMode: false,
  heroHeadline: {
    en: "I engineer resilient systems, verifiable QA, and developer tools.",
    id: "Saya merancang sistem yang tangguh, QA terverifikasi, dan tooling developer.",
  },
  heroSubheadline: {
    en: "Full-Stack Software Engineer & QA Specialist based in Jakarta. Building national-scale enterprise platforms, OAuth 2.0/OIDC providers, real-time Go/MQTT systems, and AI developer tooling.",
    id: "Full-Stack Software Engineer & Spesialis QA berbasis di Jakarta. Membangun platform enterprise dan GovTech, Identity Provider OAuth 2.0/OIDC, sistem real-time Go/MQTT, dan tooling AI.",
  },
  ctaText: {
    primary: {
      en: "Read Case Studies",
      id: "Baca Studi Kasus",
    },
    secondary: {
      en: "Download Resume",
      id: "Unduh Resume",
    },
  },
  featuredMetrics: [
    {
      label: {
        en: "GitHub Repositories",
        id: "Repositori GitHub",
      },
      value: "77",
    },
    {
      label: {
        en: "Production RBAC Permissions",
        id: "Izin RBAC Produksi",
      },
      value: "138",
    },
    {
      label: {
        en: "Median Vector Accuracy (E7)",
        id: "Akurasi Vektorisasi (E7)",
      },
      value: "99.81%",
    },
    {
      label: {
        en: "AI Skills & Custom MCPs",
        id: "Skill AI & Server MCP",
      },
      value: "52 + 3",
    },
  ],
};

export const seedProjects: ProjectRecord[] = [
  {
    title: {
      en: "Enterprise Academic Grant, Peer-Review & IPR Governance Platform",
      id: "Platform Tata Kelola Riset, Hibah Akademik & Sentra HKI",
    },
    slug: "academic-grant-governance-platform",
    category: "govtech",
    tagline: {
      en: "Unified research & community service platform spanning 19 modules, 61 relational models, and 138 granular RBAC permissions, replacing fragmented manual grant workflows with audited digital operations.",
      id: "Platform terintegrasi untuk manajemen hibah riset, pengabdian, dan HKI dengan 19 modul bisnis, 61 model relasional, dan 138 izin RBAC granular menggantikan alur dokumen manual.",
    },
    description: {
      en: "End-to-end institutional research management system covering proposal submission, departmental approval, PDF canvas reviewer annotation, digital official signatures, internal monitoring (Monev), automated assignment letters, and IPR management.",
      id: "Sistem informasi manajemen riset dan pengabdian perguruan tinggi yang mencakup pengajuan proposal, persetujuan prodi, anotasi PDF reviewer, tanda tangan digital pejabat, Monev internal, penerbitan surat tugas otomatis, dan sentra HKI.",
    },
    status: "published",
    featured: true,
    featuredOrder: 1,
    year: 2026,
    duration: {
      en: "20 months",
      id: "20 bulan",
    },
    role: {
      en: "Lead Fullstack Engineer",
      id: "Lead Fullstack Engineer",
    },
    teamSize: 4,
    tags: ["react", "typescript", "express", "mysql", "rbac", "playwright"],
    techStack: [
      {
        name: "React 18 & TypeScript",
        category: "frontend",
        version: "18.2",
        rationale: {
          en: "Strict mode with TanStack Query v5 and Zod v4 prevented schema drift across 19 complex domain forms.",
          id: "Strict mode dengan TanStack Query v5 dan Zod v4 mencegah ketidaksesuaian kontrak skema pada 19 modul formulir.",
        },
        alternatives: [],
      },
      {
        name: "Express & Sequelize",
        category: "backend",
        version: "4 / 5 ESM",
        rationale: {
          en: "Production stability on Express v4 CJS with an incremental TypeScript ESM Express v5 migration path sharing one MySQL contract.",
          id: "Stabilitas produksi di Express v4 CJS disertai jalur migrasi bertahap ke Express v5 ESM TypeScript di atas kontrak MySQL yang sama.",
        },
        alternatives: [],
      },
      {
        name: "MySQL",
        category: "database",
        rationale: {
          en: "61 strictly normalized relational tables supporting multi-stage approvals, audit logs, and signature references.",
          id: "61 tabel relasional ternormalisasi untuk mendukung alur persetujuan berjenjang, audit log, dan tanda tangan digital.",
        },
        alternatives: [],
      },
      {
        name: "Playwright & Bruno",
        category: "testing",
        rationale: {
          en: "Automated cross-role authorization E2E verification and repeatable API contract regression checks.",
          id: "Verifikasi E2E otomatis batas otorisasi lintas peran dan pengujian regresi kontrak API yang konsisten.",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: { en: "Business Modules", id: "Modul Bisnis" },
        value: "19",
        context: { en: "Cross-service grant & IPR domains", id: "Domain hibah, review, & HKI lintas layanan" },
      },
      {
        label: { en: "Database Models", id: "Model Database" },
        value: "61",
        context: { en: "Relational Sequelize/MySQL models", id: "Model relasional Sequelize/MySQL" },
      },
      {
        label: { en: "RBAC Permissions", id: "Izin Akses RBAC" },
        value: "138",
        context: { en: "Symmetrical UI & API enforcement", id: "Penegakan simetris di UI & API" },
      },
      {
        label: { en: "Verification", id: "Verifikasi" },
        value: "E2E + Unit",
        context: { en: "Playwright, WIB Audit Log & Bruno", id: "Playwright, Unit Test Audit WIB & Bruno" },
      },
    ],
    sections: [
      {
        type: "problem",
        title: { en: "Fragmented Academic Governance", id: "Tata Kelola Hibah yang Terfragmentasi" },
        order: 0,
        content: {
          en: "<h3>Context</h3><p>Grant proposals, departmental approvals, external reviewer feedback, progress monitoring, and IPR filings were previously handled across disconnected spreadsheets and static documents, creating version confusion and manual assignment letter bottlenecks.</p><h3>Constraints</h3><ul><li>Enforce strict multi-role boundaries across proposers, department heads, reviewers, and super-admins.</li><li>Preserve auditable WIB timestamps and signature integrity for official PDF exports.</li></ul>",
          id: "<h3>Konteks</h3><p>Pengajuan proposal penelitian, persetujuan prodi, telaah reviewer, pemantauan kemajuan (Monev), hingga pengajuan HKI sebelumnya dikelola secara terpisah di spreadsheet dan dokumen manual.</p><h3>Batasan</h3><ul><li>Menegakkan batas otorisasi ketat antara pengusul, kaprodi, reviewer, dan super-admin.</li><li>Menjaga integritas tanda tangan digital serta jejak waktu audit WIB pada ekspor PDF resmi.</li></ul>",
        },
      },
      {
        type: "architecture",
        title: { en: "Symmetric RBAC & Dual-Backend Architecture", id: "Arsitektur RBAC Simetris & Migrasi Bertahap" },
        order: 1,
        content: {
          en: "<p>A React 18 SPA enforces visual guards via <code>&lt;Can&gt;</code> and <code>useRBAC()</code> mapped 1:1 to 138 backend middleware permissions, backed by HTTP-only JWT cookies, CSRF protection, Helmet v8, and a dedicated external research index web crawler.</p>",
          id: "<p>SPA React 18 menegakkan kontrol visual melalui <code>&lt;Can&gt;</code> dan <code>useRBAC()</code> yang dipetakan 1:1 terhadap 138 izin middleware backend, diamankan dengan cookie JWT HTTP-only, proteksi CSRF, Helmet v8, serta layanan web crawler indeks publikasi akademik.</p>",
        },
        diagram: {
          interactive: true,
          nodes: [
            { id: "ui", label: "React 18 SPA", tone: "teal" },
            { id: "rbac", label: "138-Perm RBAC", tone: "amber" },
            { id: "api", label: "Express API", tone: "green" },
            { id: "db", label: "MySQL (61 Models)", tone: "blue" },
          ],
        },
      },
      {
        type: "tradeoffs",
        title: { en: "Key Trade-offs", id: "Kompromi Arsitektur Utama" },
        order: 2,
        content: {
          en: "<h3>Incremental ESM Migration vs Big-Bang Rewrite</h3><p>Keeping active production traffic on Express v4 CJS while developing a modular TypeScript Express v5 target against the identical MySQL schema avoided downtime across active academic grant cycles.</p>",
          id: "<h3>Migrasi Bertahap vs Rewrite Total</h3><p>Mempertahankan trafik produksi di Express v4 CJS sembari menyiapkan backend modular TypeScript Express v5 di atas skema MySQL yang sama mencegah gangguan operasional selama periode pengajuan hibah.</p>",
        },
      },
      {
        type: "results",
        title: { en: "Measured Outcomes", id: "Hasil Terukur" },
        order: 3,
        content: {
          en: "<p>Delivered 19 production modules, canvas-based PDF.js reviewer annotations, automated assignment letter generation, and automated Playwright E2E plus unit test suites verifying audit logging and role boundaries.</p>",
          id: "<p>Menghadirkan 19 modul produksi, anotasi PDF.js berbasis kanvas untuk reviewer, pembuatan surat tugas PDF otomatis, serta rangkaian uji regresi Playwright E2E dan unit test audit log.</p>",
        },
      },
    ],
    adrs: [
      {
        number: 1,
        title: {
          en: "Enforce 138 Granular Permission Constants Across UI and Middleware",
          id: "Penegakan 138 Konstanta Izin Granular di UI dan Middleware",
        },
        status: "accepted",
        context: {
          en: "Role-name checks quickly break when institutions introduce hybrid roles (e.g., a lecturer who is also a reviewer and coordinator).",
          id: "Pengecekan berbasis nama peran rapuh ketika pengguna memegang peran ganda (misalnya dosen sekaligus reviewer dan koordinator).",
        },
        decision: {
          en: "Model authorization around 138 atomic permission keys checked server-side in middleware and mirrored by declarative UI guards.",
          id: "Mendesain otorisasi berbasis 138 kunci izin atomik yang divalidasi di middleware server dan dicerminkan pada guard UI deklaratif.",
        },
        consequences: {
          en: "Requires disciplined permission seeding and negative E2E tests whenever new endpoints ship.",
          id: "Memerlukan disiplin seeding izin baru dan pengujian negatif E2E setiap kali endpoint baru ditambahkan.",
        },
        alternatives: [
          {
            en: "Hardcoded role-string checks inside controllers",
            id: "Pengecekan string nama peran secara langsung di controller",
          },
        ],
      },
    ],
  },
  {
    title: {
      en: "National Freight & Consolidated Logistics E-Manifest System (v2)",
      id: "Sistem E-Manifest Logistik Angkutan Barang & Konsolidasi Kargo (v2)",
    },
    slug: "logistics-emanifest-v2-platform",
    category: "govtech",
    tagline: {
      en: "Redesigning freight e-manifest architecture from rigid A-to-B shipments to consolidated multi-sender, multi-receiver cargo with sequential multi-stop routing and Level-H QR PDF verification.",
      id: "Merancang ulang arsitektur e-manifest angkutan barang dari pengiriman titik tunggal menjadi konsolidasi multi-pengirim, multi-penerima, rute multi-stop berurutan, serta PDF ber-QR Code Level H.",
    },
    description: {
      en: "Next-generation electronic freight manifest platform supporting multi-consignment shipments, hazardous material (B3 & HS Code) tracking, gross vehicle weight (JBI) compliance checks, Binary(16) UUID indexing, and custom-logo QR PDF generation.",
      id: "Platform Surat Muatan Barang (SMB) elektronik generasi ke-2 yang mendukung konsolidasi banyak resi pengiriman dalam satu perjalanan armada, deteksi muatan B3 & HS Code, validasi JBI anti-ODOL, serta generator PDF resmi ber-QR Code.",
    },
    status: "published",
    featured: true,
    featuredOrder: 2,
    year: 2026,
    duration: { en: "6 months", id: "6 bulan" },
    role: { en: "Fullstack Architect & Engineer", id: "Fullstack Architect & Engineer" },
    teamSize: 4,
    tags: ["nextjs", "typescript", "prisma", "mysql", "postgresql", "logistics"],
    techStack: [
      {
        name: "Next.js & React",
        category: "frontend",
        rationale: {
          en: "Interactive multi-stop route builders, live QR preview with Error Correction Level H, and auto-incremented SMB numbering.",
          id: "Form dinamis rute multi-stop, live preview QR Code Level H, dan penomoran dokumen SMB otomatis.",
        },
        alternatives: [],
      },
      {
        name: "Prisma ORM (Binary 16 UUID)",
        category: "database",
        rationale: {
          en: "Compact 16-byte binary UUID primary keys keep relational joins fast while preventing enumerable manifest document IDs.",
          id: "Primary key Binary(16) UUID menjaga efisiensi indeks B-tree sekaligus mencegah tebakan ID dokumen publik.",
        },
        alternatives: [
          {
            name: "Auto-increment integer IDs",
            reasonNotChosen: {
              en: "Exposes sequential business volume and invites IDOR enumeration on public QR verification routes.",
              id: "Membocorkan volume transaksi sekuensial dan rentan terhadap enumerasi IDOR pada rute verifikasi QR.",
            },
          },
        ],
      },
      {
        name: "TypeScript & Node.js",
        category: "backend",
        rationale: {
          en: "Strict payload contracts validating nested consignments, packing lists, drivers, and vehicle KIR validity.",
          id: "Kontrak validasi ketat untuk konsinyasi bersarang, packing list, data pengemudi, dan masa berlaku KIR armada.",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: { en: "Cargo Hierarchy", id: "Hierarki Muatan" },
        value: "3-Level",
        context: { en: "Manifest -> Consignments -> Packing Lists", id: "Manifest -> Pengiriman -> Packing List" },
      },
      {
        label: { en: "Key Storage", id: "Kunci Relasional" },
        value: "Binary(16)",
        context: { en: "Compact UUID indexing across tables", id: "Indeks UUID 16-byte yang efisien" },
      },
      {
        label: { en: "QR Resilience", id: "Ketahanan QR" },
        value: "Level H",
        context: { en: "30% error recovery with logo overlay", id: "Pemulihan 30% dengan overlay logo" },
      },
      {
        label: { en: "Route Model", id: "Model Rute" },
        value: "Multi-Stop",
        context: { en: "Ordered pickups, drop-offs & weighbridges", id: "Pickup, drop-off & jembatan timbang berurutan" },
      },
    ],
    sections: [
      {
        type: "problem",
        title: { en: "Why Single-Origin Manifests Broke Real Logistics", id: "Keterbatasan Model A-ke-B pada Logistik Nyata" },
        order: 0,
        content: {
          en: "<p>The legacy V1 schema coupled every manifest directly to one sender, one receiver, and one static origin-destination route. Real freight consolidation carries cargo from multiple shippers to multiple consignees with intermediate weighbridge checkpoints.</p>",
          id: "<p>Skema V1 mengikat satu manifest langsung ke satu pengirim, satu penerima, dan satu rute statis. Operasional angkutan barang nyata membawa konsolidasi kargo lintas pengirim/penerima melalui beberapa titik pemberhentian dan jembatan timbang.</p>",
        },
      },
      {
        type: "architecture",
        title: { en: "Decoupled Consignment & Route-Stop Topology", id: "Topologi Konsinyasi & Rute Multi-Stop Terdekupel" },
        order: 1,
        content: {
          en: "<p>V2 separates vehicle/transporter headers (<code>manifest</code>) from independent waybills (<code>manifest_pengiriman</code>), item-level dangerous goods packing lists (<code>manifest_packing_list</code>), and ordered route stops (<code>manifest_rute_stop</code>) linked optionally to consignments.</p>",
          id: "<p>V2 memisahkan header armada/transporter (<code>manifest</code>) dari resi pengiriman independen (<code>manifest_pengiriman</code>), daftar barang dan indikator B3 (<code>manifest_packing_list</code>), serta urutan titik rute (<code>manifest_rute_stop</code>).</p>",
        },
        diagram: {
          interactive: true,
          nodes: [
            { id: "manifest", label: "Manifest Header", tone: "teal" },
            { id: "consign", label: "Multi-Consignment", tone: "amber" },
            { id: "stops", label: "Multi-Stop Route", tone: "green" },
            { id: "qrpdf", label: "Level-H QR & PDF", tone: "blue" },
          ],
        },
      },
      {
        type: "results",
        title: { en: "Operational Impact", id: "Dampak Operasional" },
        order: 2,
        content: {
          en: "<p>Enabled consolidated cargo manifests, automated <code>SMB-XXXX/S/[RomanMonth]/[Year]</code> numbering, cumulative weight checks against vehicle JBI limits, and high-fault-tolerance QR PDFs scannable at field checkpoints.</p>",
          id: "<p>Memungkinkan penerbitan manifest kargo terkonsolidasi, penomoran otomatis <code>SMB-XXXX/S/[BulanRomawi]/[Tahun]</code>, penghitungan total berat muatan terhadap JBI, dan verifikasi QR Code lapangan yang tahan kerusakan visual.</p>",
        },
      },
    ],
    adrs: [
      {
        number: 1,
        title: {
          en: "Decouple Packing Lists and Route Stops from Manifest Root",
          id: "Dekoupling Packing List dan Route Stop dari Root Manifest",
        },
        status: "accepted",
        context: {
          en: "Binding items directly to the manifest root prevented partial loading/unloading across stops.",
          id: "Mengikat item langsung ke root manifest menghalangi pencatatan muat/bongkar parsial antar titik rute.",
        },
        decision: {
          en: "Introduce manifest_pengiriman as the intermediate aggregate owning packing lists and referencing sender/receiver parties.",
          id: "Menambahkan agregat perantara manifest_pengiriman yang memiliki packing list serta referensi pengirim dan penerima.",
        },
        consequences: {
          en: "Requires recursive total weight aggregation on the server whenever any consignment is edited.",
          id: "Membutuhkan agregasi ulang total berat muatan di server setiap kali konsinyasi diperbarui.",
        },
        alternatives: [
          {
            en: "Store multiple consignments inside JSON columns on the manifest table",
            id: "Menyimpan banyak konsinyasi di dalam kolom JSON pada tabel manifest",
          },
        ],
      },
    ],
  },
  {
    title: {
      en: "PNG to SVG Vectorize: Offline Raster-to-Vector Engine",
      id: "PNG to SVG Vectorize: Engine Vektorisasi Raster-ke-SVG Offline",
    },
    slug: "png-to-svg-vectorize-engine",
    category: "ai-devtools",
    tagline: {
      en: "Offline Python raster-to-SVG vectorizer openly benchmarked on 45 Wikimedia images, introducing CIEDE2000 visible-defect area scoring to catch color-merging flaws missed by average similarity.",
      id: "Engine vektorisasi raster-ke-SVG offline berbasis Python yang dibenchmark secara terbuka pada 45 gambar Wikimedia, memperkenalkan metrik CIEDE2000 visible-defect area untuk mendeteksi cacat warna.",
    },
    description: {
      en: "Desktop and CLI image vectorization engine converting cartoons, logos, icons, and pixel art into clean editable SVGs in seconds, backed by automated Headless Chrome rendering benchmarks and cross-OS GitHub Actions releases.",
      id: "Aplikasi desktop dan CLI pengonversi gambar kartun, logo, ikon, dan pixel art menjadi SVG bersih yang dapat diedit secara offline, dilengkapi benchmark rendering Headless Chrome otomatis dan rilis CI/CD lintas OS.",
    },
    status: "published",
    featured: true,
    featuredOrder: 3,
    year: 2026,
    duration: { en: "Ongoing", id: "Berkelanjutan" },
    role: { en: "Creator & Algorithm Engineer", id: "Kreator & Algorithm Engineer" },
    teamSize: 1,
    repoUrl: "https://github.com/RidhuanDEV/png-to-svg-vectorize",
    demoUrl: "https://ridhuandev.github.io/png-to-svg-vectorize/",
    tags: ["python", "computer-vision", "svg", "benchmarking", "ci-cd"],
    techStack: [
      {
        name: "Python 3.11+",
        category: "backend",
        version: "3.11",
        rationale: {
          en: "Rich numerical and image processing pipeline with deterministic packaging across Windows, macOS, and Linux.",
          id: "Pipeline pengolahan citra dan numerik yang matang serta dapat dipaketkan ke Windows, macOS, dan Linux.",
        },
        alternatives: [],
      },
      {
        name: "Headless Chrome + CIEDE2000 Suite",
        category: "testing",
        rationale: {
          en: "Renders actual output SVGs in Chromium and compares pixel-level perceptual color differences (CIEDE2000 > 5) plus SSIM.",
          id: "Merender SVG hasil di Chromium lalu mengukur perbedaan warna perseptual per piksel (CIEDE2000 > 5) dan SSIM.",
        },
        alternatives: [],
      },
      {
        name: "GitHub Actions CI",
        category: "infra",
        rationale: {
          en: "Automated multi-platform test and release packaging.",
          id: "Pengujian otomatis dan pembuatan installer lintas sistem operasi.",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: { en: "Median Similarity (E7)", id: "Kemiripan Median (E7)" },
        value: "99.81%",
        context: { en: "24 flat-art Wikimedia images", id: "24 gambar flat-art Wikimedia" },
      },
      {
        label: { en: "Visible-Defect Area", id: "Area Cacat Terlihat" },
        value: "0.05%",
        context: { en: "CIEDE2000 > 5 median across E7", id: "Median CIEDE2000 > 5 di set E7" },
      },
      {
        label: { en: "Median SSIM", id: "Median SSIM" },
        value: "0.993",
        context: { en: "Structural similarity (1 = exact)", id: "Kemiripan struktural (1 = identik)" },
      },
      {
        label: { en: "Median SVG Size", id: "Ukuran SVG Median" },
        value: "38 KB",
        context: { en: "Editable clean vector paths", id: "Path vektor bersih & ringan" },
      },
    ],
    sections: [
      {
        type: "problem",
        title: { en: "Why High Mean Similarity Still Shipped Broken Icons", id: "Mengapa Skor Kemiripan Tinggi Tetap Menghasilkan Ikon Rusak" },
        order: 0,
        content: {
          en: "<p>Release 1.6.0 scored 97.99% mean similarity on a shop icon while 18% of its visible area was wrong (dark red merged into red, dark blue merged into blue). Global averages mask localized palette collapse.</p>",
          id: "<p>Versi 1.6.0 mencatat skor kemiripan rata-rata 97,99% pada ikon toko padahal 18% area gambar salah warna (merah tua bergabung dengan merah, biru tua bergabung dengan biru). Rata-rata global menyembunyikan kerusakan palet lokal.</p>",
        },
      },
      {
        type: "architecture",
        title: { en: "Style-Adaptive Quantization & Empirical Verification", id: "Kuantisasi Adaptif & Verifikasi Empiris" },
        order: 1,
        content: {
          en: "<p>Images route through style-specific preprocessing (Cartoon, Logo, Flat Illustration, Poster) followed by perceptual color separation, curve fitting, and automated Chrome SVG rasterization checks across 45 reproducible CC0 images (Sets E7 & E8).</p>",
          id: "<p>Gambar diproses sesuai mode gaya (Cartoon, Logo, Flat Illustration, Poster) lalu melewati pemisahan warna perseptual, curve fitting, dan verifikasi rasterisasi SVG otomatis via Chrome pada 45 gambar CC0 (Set E7 & E8).</p>",
        },
        diagram: {
          interactive: true,
          nodes: [
            { id: "raster", label: "Raster Input", tone: "teal" },
            { id: "quant", label: "CIELAB Quantizer", tone: "amber" },
            { id: "svg", label: "Vector Path Fit", tone: "green" },
            { id: "bench", label: "Chrome CIEDE2000", tone: "blue" },
          ],
        },
      },
      {
        type: "results",
        title: { en: "Measured Benchmark Evidence", id: "Bukti Benchmark Terukur" },
        order: 2,
        content: {
          en: "<p>Achieved 99.81% median similarity, 0.05% median visible-defect area, and 0.993 median SSIM on E7 flat art (24 images), and 99.40% similarity with 0.34% defect area on E8 raster inputs (16 images), with full per-image tables published openly.</p>",
          id: "<p>Mencapai kemiripan median 99,81%, area cacat terlihat 0,05%, dan SSIM 0,993 pada Set E7 (24 gambar), serta 99,40% kemiripan dengan 0,34% area cacat pada input raster E8 (16 gambar).</p>",
        },
      },
    ],
    adrs: [
      {
        number: 1,
        title: {
          en: "Gate Every Tracing Algorithm Change on CIEDE2000 Defect Area",
          id: "Menggunakan Area Cacat CIEDE2000 sebagai Gate Perubahan Algoritma",
        },
        status: "accepted",
        context: {
          en: "Mean color error alone failed to flag small high-contrast color merges that ruin logos.",
          id: "Rata-rata galat warna gagal mendeteksi penggabungan warna kontras tinggi berskala kecil yang merusak logo.",
        },
        decision: {
          en: "Track percentage of pixels exceeding CIEDE2000 > 5 (excluding 1-2px anti-aliasing edges) alongside SSIM and file size.",
          id: "Mengukur persentase piksel dengan selisih CIEDE2000 > 5 (di luar tepi anti-aliasing 1-2px) bersama SSIM dan ukuran file.",
        },
        consequences: {
          en: "Requires running Headless Chrome rasterization during benchmark sweeps, adding ~1-15s per test image.",
          id: "Memerlukan rasterisasi Headless Chrome saat menjalankan suite benchmark penuh.",
        },
        alternatives: [
          {
            en: "Evaluate solely with PSNR or mean RGB distance",
            id: "Evaluasi hanya dengan PSNR atau jarak rata-rata RGB",
          },
        ],
      },
    ],
  },
  {
    title: {
      en: "GovTech Public Relations (65 Domains), Smart Building IoT & RAG Portal",
      id: "Portal GovTech Kehumasan (65 Domain), Smart Building IoT & Asisten RAG",
    },
    slug: "govtech-public-relations-iot-portal",
    category: "govtech",
    tagline: {
      en: "Two national public-sector platforms: a 65-domain public communications system (Vue + NestJS + MinIO + AI clustering) and a Smart Building IoT, ALPR Parking & RAG portal (React 19 + Three.js).",
      id: "Dua platform sektor publik berskala nasional: sistem kehumasan 65 domain (Vue + NestJS + MinIO + AI clustering) dan portal Smart Building IoT, Parkir ALPR, serta Chatbot RAG (React 19 + Three.js).",
    },
    description: {
      en: "Production enterprise engineering uniting dispersed public communications data across regional offices and delivering executive visibility over building IoT energy telemetry, gate license-plate analytics, and citation-backed regulatory RAG Q&A.",
      id: "Rekayasa sistem sektor publik yang menyatukan operasional kehumasan lintas balai regional sekaligus menghadirkan visibilitas real-time atas perangkat IoT gedung pintar, analitik parkir ALPR, dan asisten regulasi RAG.",
    },
    status: "published",
    featured: false,
    featuredOrder: 4,
    year: 2026,
    duration: { en: "10 months", id: "10 bulan" },
    role: { en: "Fullstack Software Engineer", id: "Fullstack Software Engineer" },
    teamSize: 5,
    tags: ["react", "vue", "nestjs", "threejs", "rag", "iot", "redis", "minio"],
    techStack: [
      {
        name: "NestJS & Prisma ORM",
        category: "backend",
        rationale: {
          en: "Structured 65 functional domains with modular guards, Redis session store (6h TTL), and MinIO object storage.",
          id: "Mengelola 65 domain fungsional dengan guard modular, penyimpanan sesi Redis (TTL 6 jam), dan MinIO object storage.",
        },
        alternatives: [],
      },
      {
        name: "React 19 + TanStack Router/Query",
        category: "frontend",
        version: "19.3",
        rationale: {
          en: "Type-safe routing, real-time 2D/3D Three.js building visualization, ALPR plate masking by RBAC, and streaming RAG citations.",
          id: "Routing bertipe ketat, visualisasi gedung 2D/3D Three.js, penyamaran plat ALPR berbasis RBAC, dan streaming sitasi RAG.",
        },
        alternatives: [],
      },
      {
        name: "Vue.js & Vite",
        category: "frontend",
        rationale: {
          en: "Multi-role operational dashboard synchronized with backend RBAC and institutional SSO.",
          id: "Dasbor operasional multi-peran yang tersinkron dengan RBAC backend dan SSO instansi.",
        },
        alternatives: [],
      },
      {
        name: "Vitest & Testing Library",
        category: "testing",
        rationale: {
          en: "Component and role-guard verification across viewer, operator, and admin views.",
          id: "Pengujian komponen dan penjagaan otorisasi lintas peran viewer, operator, dan admin.",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: { en: "Functional Domains", id: "Domain Fungsional" },
        value: "65",
        context: { en: "Public relations & media monitoring", id: "Kehumasan & pemantauan media" },
      },
      {
        label: { en: "External Integrations", id: "Integrasi Eksternal" },
        value: "4 Systems",
        context: { en: "Institutional SSO, HR, Alerts, AI", id: "SSO Instansi, Kepegawaian, Notifikasi, AI" },
      },
      {
        label: { en: "Executive Modules", id: "Modul Portal" },
        value: "IoT + ALPR + RAG",
        context: { en: "3D Smart Building, Parking & Chatbot", id: "Gedung 3D, Parkir Vision & Chatbot" },
      },
      {
        label: { en: "Session Security", id: "Keamanan Sesi" },
        value: "Dual-Layer",
        context: { en: "Redis 6h TTL + RBAC plate masking", id: "Redis TTL 6j + masking plat berbasis peran" },
      },
    ],
    sections: [
      {
        type: "problem",
        title: { en: "Consolidating Fragmented Public-Sector Telemetry & Operations", id: "Konsolidasi Operasional & Telemetri Sektor Publik" },
        order: 0,
        content: {
          en: "<p>Regional public relations units tracked press releases and media reports in isolated spreadsheets, while facility leadership lacked unified real-time visibility across building power meters, gate ALPR parking feeds, and internal regulatory documents.</p>",
          id: "<p>Unit kehumasan tingkat pusat dan balai sebelumnya mencatat siaran pers dan pemantauan media di spreadsheet terpisah, sementara pimpinan membutuhkan satu portal untuk memantau listrik IoT gedung, parkir ALPR gerbang, dan pencarian regulasi internal.</p>",
        },
      },
      {
        type: "architecture",
        title: { en: "Separated Client-Server & Executive Portal Architecture", id: "Arsitektur Client-Server & Portal Eksekutif" },
        order: 1,
        content: {
          en: "<p>The communications suite pairs a NestJS API, MySQL, Redis session store, MinIO attachments, and automated AI social-topic clustering with institutional SSO and HR systems. The executive portal combines Three.js 3D IoT floor plans, role-masked ALPR tables, and streaming markdown RAG answers with numbered citations.</p>",
          id: "<p>Sistem kehumasan memadukan NestJS API, MySQL, Redis, MinIO, dan layanan AI pengelompok topik media harian bersama integrasi SSO dan kepegawaian. Portal eksekutif memadukan denah gedung 3D Three.js, analitik parkir ALPR dengan masking plat untuk peran viewer, dan chatbot RAG bersitasi.</p>",
        },
        diagram: {
          interactive: true,
          nodes: [
            { id: "sso", label: "Institutional SSO", tone: "amber" },
            { id: "portal", label: "React 19 / Vue UI", tone: "teal" },
            { id: "api", label: "NestJS & AI Engine", tone: "green" },
            { id: "store", label: "MySQL / Redis / MinIO", tone: "blue" },
          ],
        },
      },
      {
        type: "results",
        title: { en: "Deliverables & Reliability", id: "Hasil & Keandalan" },
        order: 2,
        content: {
          en: "<p>Standardized 65 domain modules under consistent API contracts and audit logs, shipped privacy-aware license plate masking for non-privileged viewers, and enforced Vitest + strict ESLint quality gates.</p>",
          id: "<p>Menstandarkan 65 domain fungsional di bawah kontrak API dan audit log yang seragam, menerapkan penyamaran privasi plat nomor berbasis peran, serta menegakkan gerbang kualitas Vitest dan ESLint strict.</p>",
        },
      },
    ],
    adrs: [],
  },
  {
    title: {
      en: "Turion SSO: Self-Hosted OAuth 2.0 / OIDC Identity Provider & SDK",
      id: "Turion SSO: Identity Provider OAuth 2.0 / OIDC Mandiri & SDK NPM",
    },
    slug: "turion-sso-identity-provider",
    category: "security-auth",
    tagline: {
      en: "RFC-compliant OAuth 2.0 and OpenID Connect Identity Provider enforcing PKCE S256, single-use authorization codes with replay auto-revocation, TOTP MFA, and a Node.js SDK.",
      id: "Identity Provider OAuth 2.0 dan OpenID Connect (OIDC) berstandar RFC dengan kewajiban PKCE S256, authorization code sekali pakai berproteksi replay, TOTP MFA, dan SDK Node.js.",
    },
    description: {
      en: "Centralized authentication server and Admin Console replacing third-party auth lock-in across an entire product ecosystem, accompanied by the framework-agnostic ridhuan-sso verification SDK.",
      id: "Server autentikasi terpusat dan Admin Console untuk menggantikan ketergantungan vendor pihak ketiga, lengkap dengan paket SDK ridhuan-sso untuk verifikasi JWKS dan token di sisi client service.",
    },
    status: "published",
    featured: false,
    featuredOrder: 5,
    year: 2026,
    duration: { en: "4 months", id: "4 bulan" },
    role: { en: "Security & Backend Architect", id: "Arsitek Keamanan & Backend" },
    teamSize: 1,
    tags: ["oauth2", "oidc", "security", "typescript", "postgresql", "redis"],
    techStack: [
      {
        name: "Node.js & Express (TypeScript)",
        category: "backend",
        rationale: {
          en: "Strict typed OIDC endpoints implementing RFC 6749, PKCE S256, RFC 7009 revocation, and RFC 7662 introspection.",
          id: "Endpoint OIDC bertipe ketat mengikuti RFC 6749, PKCE S256, RFC 7009 revocation, dan RFC 7662 introspection.",
        },
        alternatives: [],
      },
      {
        name: "PostgreSQL & Prisma ORM",
        category: "database",
        rationale: {
          en: "Transactional audit trail for 100% of authentication events, registered clients, backup codes, and refresh grants.",
          id: "Jejak audit transaksional untuk 100% event autentikasi, klien terdaftar, backup code, dan refresh grant.",
        },
        alternatives: [],
      },
      {
        name: "Redis",
        category: "database",
        rationale: {
          en: "Fast TTL expiry (5 minutes) and atomic single-use enforcement for authorization codes.",
          id: "Masa berlaku TTL cepat (5 menit) dan penegakan atomik sekali pakai untuk authorization code.",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: { en: "PKCE Enforcement", id: "Penegakan PKCE" },
        value: "S256 Mandatory",
        context: { en: "Rejects plain or missing challenges", id: "Menolak challenge plain atau kosong" },
      },
      {
        label: { en: "Code Replay Defense", id: "Proteksi Replay Code" },
        value: "Auto-Revoke",
        context: { en: "Revokes full grant on 2nd exchange", id: "Mencabut seluruh grant jika dipakai ulang" },
      },
      {
        label: { en: "Token Verification", id: "Verifikasi Token" },
        value: "JWKS Offline",
        context: { en: "SPs validate JWT without IdP bottleneck", id: "SP memvalidasi JWT tanpa membebani IdP" },
      },
      {
        label: { en: "Auth Hardening", id: "Keamanan Auth" },
        value: "TOTP MFA",
        context: { en: "Bcrypt cost 12 + backup codes", id: "Bcrypt cost 12 + kode cadangan" },
      },
    ],
    sections: [
      {
        type: "problem",
        title: { en: "Eliminating Duplicate Auth Silos & Third-Party Lock-In", id: "Menghilangkan Duplikasi Auth & Ketergantungan Vendor" },
        order: 0,
        content: {
          en: "<p>Maintaining separate user databases and login flows per product creates security policy drift and user friction, while hosted identity vendors introduce per-MAU pricing unpredictability and external custody over session logs.</p>",
          id: "<p>Membangun sistem login terpisah di tiap aplikasi memicu inkonsistensi kebijakan keamanan, sementara vendor eksternal menciptakan biaya per pengguna aktif dan ketergantungan penyimpanan data sesi.</p>",
        },
      },
      {
        type: "architecture",
        title: { en: "OIDC Authorization Code Flow with PKCE & JWKS", id: "Alur OIDC Authorization Code dengan PKCE & JWKS" },
        order: 1,
        content: {
          en: "<p>Exposes standard discovery (<code>/.well-known/openid-configuration</code>), enforces confidential client auth plus PKCE S256, verifies <code>id_token</code> signatures via JWKS through the <code>ridhuan-sso</code> SDK, and records every security event in PostgreSQL.</p>",
          id: "<p>Menyediakan discovery endpoint (<code>/.well-known/openid-configuration</code>), mewajibkan PKCE S256 untuk confidential client, memverifikasi signature <code>id_token</code> via JWKS lewat SDK <code>ridhuan-sso</code>, dan mencatat setiap event keamanan di PostgreSQL.</p>",
        },
        diagram: {
          interactive: true,
          nodes: [
            { id: "client", label: "Service Provider", tone: "teal" },
            { id: "authz", label: "OIDC /authorize", tone: "amber" },
            { id: "token", label: "PKCE Token + JWKS", tone: "green" },
            { id: "pg", label: "Postgres + Redis", tone: "blue" },
          ],
        },
      },
      {
        type: "results",
        title: { en: "Security Guarantees Delivered", id: "Jaminan Keamanan yang Dihasilkan" },
        order: 2,
        content: {
          en: "<p>Delivered unified login across heterogeneous tech stacks, exact-match redirect URI enforcement, replay-attack grant revocation, and complete developer onboarding documentation.</p>",
          id: "<p>Menghadirkan login tunggal lintas tech stack, validasi redirect URI exact-match tanpa wildcard, pencabutan grant otomatis saat replay code terdeteksi, serta panduan integrasi developer yang lengkap.</p>",
        },
      },
    ],
    adrs: [
      {
        number: 1,
        title: {
          en: "Revoke All Issued Tokens on Authorization Code Replay",
          id: "Mencabut Seluruh Token Saat Terdeteksi Replay Authorization Code",
        },
        status: "accepted",
        context: {
          en: "If an intercepted authorization code is replayed within its 5-minute TTL, merely returning 400 leaves already-issued tokens active.",
          id: "Jika authorization code yang dicuri ditukarkan ulang dalam masa aktif 5 menit, sekadar menolak request kedua membiarkan token yang terbit tetap aktif.",
        },
        decision: {
          en: "Follow RFC 6749 section 4.1.2 guidance: mark consumed codes in Redis and revoke all descendant access and refresh tokens if a second exchange attempt occurs.",
          id: "Mengikuti panduan RFC 6749: menandai code yang sudah dipakai di Redis dan mencabut seluruh access/refresh token turunannya bila ditukar ulang.",
        },
        consequences: {
          en: "Requires atomic check-and-mark operations in Redis so legitimate concurrent retries cannot race silently.",
          id: "Memerlukan operasi check-and-mark atomik di Redis agar tidak terjadi race condition.",
        },
        alternatives: [
          {
            en: "Simply delete the code and return generic invalid_grant",
            id: "Sekadar menghapus code dan mengembalikan error invalid_grant biasa",
          },
        ],
      },
    ],
  },
  {
    title: {
      en: "Shadow Monarch & Sys2QA: 52-Skill AI Engineering & Autonomous QA Suite",
      id: "Shadow Monarch & Sys2QA: Orkestrator 52-Skill AI & Platform QA Otonom",
    },
    slug: "shadow-monarch-sys2qa-ai-platform",
    category: "ai-devtools",
    tagline: {
      en: "52-skill multi-agent SDLC engineering suite with 3 custom MCP servers and progressive context routing, paired with Sys2QA for reconstructing legacy systems into verifiable QA evidence.",
      id: "Ekosistem 52 skill rekayasa SDLC lintas agen AI dengan 3 server MCP kustom dan routing konteks progresif, dipadukan dengan Sys2QA untuk merekonstruksi sistem legacy menjadi bukti uji QA.",
    },
    description: {
      en: "Open-source developer productivity and AI reliability tooling covering token-efficient context routing (Mana Conservation), deterministic static/Docker quality gates, OpenAPI/DB/Session-Handoff MCP servers, and evidence-backed legacy system analysis.",
      id: "Tooling open-source untuk produktivitas dan reliabilitas AI coding agent meliputi routing konteks hemat token, gerbang kualitas statis dan deteksi leak Docker, 3 server MCP kustom, serta platform analisis sistem ke QA berbasis bukti.",
    },
    status: "published",
    featured: false,
    featuredOrder: 6,
    year: 2026,
    duration: { en: "6 months", id: "6 bulan" },
    role: { en: "AI Systems & Tooling Architect", id: "Arsitek Sistem & Tooling AI" },
    teamSize: 1,
    repoUrl: "https://github.com/RidhuanDEV/claude-skills",
    tags: ["ai-agents", "mcp", "python", "typescript", "qa-automation", "static-analysis"],
    techStack: [
      {
        name: "Model Context Protocol (MCP) SDK",
        category: "backend",
        rationale: {
          en: "Three purpose-built MCP servers (shadow-api, shadow-db, shadow-handoff) binding agents to real schemas and HTTP endpoints.",
          id: "Tiga server MCP kustom (shadow-api, shadow-db, shadow-handoff) yang menambatkan agen AI ke skema DB dan HTTP nyata.",
        },
        alternatives: [],
      },
      {
        name: "Python & TypeScript",
        category: "backend",
        rationale: {
          en: "Deterministic skill router (skill_router.py), static gate (shadow_gate.py), 7-point file verifier, and SQLite-backed Sys2QA contracts.",
          id: "Router skill deterministik, gerbang kualitas statis (shadow_gate.py), verifikator keamanan file 7-titik, dan kontrak Sys2QA berbasis SQLite.",
        },
        alternatives: [],
      },
      {
        name: "Playwright Observation Service",
        category: "testing",
        rationale: {
          en: "Correlates static source-reconstructed workflows (SAA) against observed browser runtime behavior (QAA).",
          id: "Mengkorelasikan alur kerja hasil rekonstruksi kode sumber (SAA) dengan perilaku runtime browser nyata (QAA).",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: { en: "Specialist Skills", id: "Skill Spesialis" },
        value: "52 + 55",
        context: { en: "52 SDLC skills & 55 reference modules", id: "52 skill SDLC & 55 modul referensi" },
      },
      {
        label: { en: "Custom MCP Servers", id: "Server MCP Kustom" },
        value: "3 Servers",
        context: { en: "API sync, DB/ERD & Session Handoff", id: "Sinkronisasi API, DB/ERD & Handoff Sesi" },
      },
      {
        label: { en: "Sys2QA Modes", id: "Mode Sys2QA" },
        value: "4 Modes",
        context: { en: "Repo, URL, Hybrid & Doc Package", id: "Repositori, URL, Hybrid & Paket Dokumen" },
      },
      {
        label: { en: "Context Strategy", id: "Strategi Konteks" },
        value: "3-Layer FK",
        context: { en: "On-demand progressive skill routing", id: "Pemuatan modul progresif sesuai kebutuhan" },
      },
    ],
    sections: [
      {
        type: "problem",
        title: { en: "Context Bloat & Unverified Agent Claims", id: "Pembengkakan Konteks & Klaim Agen Tanpa Bukti" },
        order: 0,
        content: {
          en: "<p>Loading massive static system prompts wastes context budget and degrades model adherence, while legacy codebases lack accurate specifications for automated QA generation.</p>",
          id: "<p>Memuat seluruh instruksi ke dalam konteks sekaligus memboroskan token dan menurunkan kepatuhan model, sementara sistem legacy sering tidak memiliki spesifikasi akurat untuk membuat rencana uji QA.</p>",
        },
      },
      {
        type: "architecture",
        title: { en: "Progressive Foreign-Key Routing & SAA-to-QAA Contract", id: "Routing Foreign-Key Progresif & Kontrak SAA-ke-QAA" },
        order: 1,
        content: {
          en: "<p>Shadow Monarch uses a deterministic router to load only 1 to 4 task-relevant modules alongside live MCP tools. Sys2QA enforces a single versioned JSON schema separating source-verified facts (SAA) from runtime browser observations (QAA) before generating scenarios.</p>",
          id: "<p>Shadow Monarch memakai router deterministik untuk memuat hanya 1 sampai 4 modul relevan bersama tool MCP nyata. Sys2QA memisahkan fakta terverifikasi kode (SAA) dari observasi runtime browser (QAA) melalui kontrak JSON terversi tunggal.</p>",
        },
        diagram: {
          interactive: true,
          nodes: [
            { id: "router", label: "3-Layer Router", tone: "teal" },
            { id: "mcp", label: "3 MCP Servers", tone: "amber" },
            { id: "sys2qa", label: "SAA -> QAA Spec", tone: "green" },
            { id: "gate", label: "Quality Gate", tone: "blue" },
          ],
        },
      },
      {
        type: "results",
        title: { en: "Engineering Outcomes", id: "Hasil Rekayasa" },
        order: 2,
        content: {
          en: "<p>Published cross-agent installers for Antigravity, Claude Code, and Codex, automated OpenAPI 3.1 + Postman v2.1 sync via <code>shadow-api</code>, and open-sourced the unified Sys2QA PRD and baseline architecture.</p>",
          id: "<p>Merilis installer lintas agen untuk Antigravity, Claude Code, dan Codex, sinkronisasi otomatis OpenAPI 3.1 + Postman v2.1 melalui <code>shadow-api</code>, serta menerbitkan arsitektur baseline open-source Sys2QA.</p>",
        },
      },
    ],
    adrs: [],
  },
  {
    title: {
      en: "Smart Building IoT Control & Telemetry (96 Zigbee Endpoints)",
      id: "Sistem Kontrol & Telemetri Gedung Pintar IoT (96 Perangkat Zigbee)",
    },
    slug: "smart-building-iot-zigbee-telemetry",
    category: "iot-realtime",
    tagline: {
      en: "96-endpoint smart building platform (Go + MQTT + Zigbee2MQTT + MongoDB + React 19) featuring runtime-switchable Full-Duplex WebSocket and 40ms coalesced SSE with monotonic version guards.",
      id: "Platform gedung pintar 96 perangkat (Go + MQTT + Zigbee2MQTT + MongoDB + React 19) dengan transport real-time WebSocket dan SSE 40ms coalescing serta guard versi monotonik anti-race condition.",
    },
    description: {
      en: "Containerized IoT telemetry and energy cost monitoring suite across 4 floors x 8 rooms x 3 device classes (AC, lighting, smart magnetic door locks) with interactive SVG floor plans and bulk floor controls.",
      id: "Sistem monitoring dan kendali gedung pintar dalam Docker Compose untuk 4 lantai x 8 ruangan x 3 kategori perangkat (AC, lampu, kunci pintu magnetik) lengkap dengan denah SVG interaktif dan kalkulasi biaya kWh real-time.",
    },
    status: "published",
    featured: false,
    featuredOrder: 7,
    year: 2026,
    duration: { en: "2 months", id: "2 bulan" },
    role: { en: "Fullstack & IoT Engineer", id: "Fullstack & IoT Engineer" },
    teamSize: 1,
    repoUrl: "https://github.com/RidhuanDEV/latihan-IOT",
    tags: ["go", "mqtt", "zigbee2mqtt", "react", "websocket", "sse", "mongodb", "docker"],
    techStack: [
      {
        name: "Go (Gin + Paho MQTT)",
        category: "backend",
        rationale: {
          en: "High-concurrency goroutine workers coalescing 96-device telemetry updates every 40ms with zero blocking.",
          id: "Worker goroutine berkonkurensi tinggi yang melakukan coalescing update 96 perangkat setiap 40ms tanpa blocking.",
        },
        alternatives: [],
      },
      {
        name: "React 19 + TanStack Query v5",
        category: "frontend",
        rationale: {
          en: "Direct cache synchronization guarded by monotonic uint64 versions alongside interactive architectural SVG floor maps.",
          id: "Sinkronisasi cache langsung berbasis versi uint64 monotonik beserta visualisasi denah lantai SVG interaktif.",
        },
        alternatives: [],
      },
      {
        name: "Mosquitto + Zigbee2MQTT + MongoDB 8",
        category: "infra",
        rationale: {
          en: "Realistic wildcard topic hierarchy (zigbee2mqtt/+/+/+) with compound floor/room/category MongoDB indexing.",
          id: "Hierarki topik wildcard realistis (zigbee2mqtt/+/+/+) dengan compound index MongoDB {floor, room, category}.",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: { en: "IoT Endpoints", id: "Perangkat IoT" },
        value: "96 Nodes",
        context: { en: "4 floors x 8 rooms x 3 types", id: "4 lantai x 8 ruang x 3 perangkat" },
      },
      {
        label: { en: "SSE Coalescing", id: "Coalescing SSE" },
        value: "40ms",
        context: { en: "Batches bulk MQTT bursts cleanly", id: "Menggabungkan lonjakan burst MQTT" },
      },
      {
        label: { en: "Transport Modes", id: "Mode Transport" },
        value: "WS + SSE",
        context: { en: "Switchable via env configuration", id: "Dapat diganti dinamis via konfigurasi" },
      },
      {
        label: { en: "State Consistency", id: "Konsistensi State" },
        value: "uint64 Version",
        context: { en: "Prevents out-of-order cache overwrite", id: "Mencegah overwrite cache usang" },
      },
    ],
    sections: [
      {
        type: "problem",
        title: { en: "Solving Race Conditions & Cache Flicker During Bulk Commands", id: "Mengatasi Race Condition & Anomali Cache Saat Aksi Masal" },
        order: 0,
        content: {
          en: "<p>When an operator toggles all 24 devices on a floor at once while RF Zigbee responses arrive with ~400ms latency, naive UI state flickers back to stale values and floods React re-renders.</p>",
          id: "<p>Saat operator mematikan 24 perangkat di satu lantai sekaligus sementara respons RF Zigbee memiliki latensi ~400ms, UI naif sering berkedip kembali ke status lama dan membanjiri re-render.</p>",
        },
      },
      {
        type: "architecture",
        title: { en: "Desired vs Reported State + Coalesced Stream", id: "Pemisahan Desired vs Reported State + Stream Ter-coalesce" },
        order: 1,
        content: {
          en: "<p>Commands increment a monotonic <code>uint64</code> version and track <code>desiredState</code> vs <code>reportedState</code> with <code>commandSeq</code> inside the non-blocking Zigbee simulator. The Go broadcaster supports both full-duplex WebSocket (<code>requestId</code> ACK) and 40ms-coalesced SSE.</p>",
          id: "<p>Setiap perintah menaikkan versi monotonik <code>uint64</code> serta memisahkan <code>desiredState</code> dari <code>reportedState</code> dengan <code>commandSeq</code>. Broadcaster Go mendukung WebSocket dua arah (<code>requestId</code> ACK) maupun SSE ber-coalescing 40ms.</p>",
        },
        diagram: {
          interactive: true,
          nodes: [
            { id: "svg", label: "React SVG Map", tone: "teal" },
            { id: "go", label: "Go WS/SSE Hub", tone: "amber" },
            { id: "mqtt", label: "MQTT + Zigbee", tone: "green" },
            { id: "mongo", label: "MongoDB 8.0", tone: "blue" },
          ],
        },
      },
      {
        type: "results",
        title: { en: "Verification & Operability", id: "Verifikasi & Operasional" },
        order: 2,
        content: {
          en: "<p>Packaged the full 6-service topology (Frontend, Go Backend, MongoDB, Mosquitto, Zigbee2MQTT, Simulator) under a single <code>docker compose up</code> with live wattage, kWh, and IDR electricity cost breakdowns.</p>",
          id: "<p>Mengemas 6 layanan penuh (Frontend, Backend Go, MongoDB, Mosquitto, Zigbee2MQTT, Simulator) dalam satu perintah <code>docker compose up</code> lengkap dengan kalkulasi daya (W), kWh, dan estimasi tarif listrik.</p>",
        },
      },
    ],
    adrs: [],
  },
  {
    title: {
      en: "Local GPU Meeting Transcriber & Script Studio Video Suite",
      id: "Local GPU Meeting Transcriber & Script Studio Video Suite",
    },
    slug: "gpu-transcriber-and-script-studio",
    category: "ai-devtools",
    tagline: {
      en: "Two privacy-first media engineering systems: CUDA-accelerated Faster-Whisper + Pyannote meeting diarization in Docker, and a Rust/Tauri 2 script-driven video & AI dubbing desktop app.",
      id: "Dua sistem pemrosesan media berorientasi privasi: transkripsi & diarisasi rapat GPU CUDA (Faster-Whisper + Pyannote) dan aplikasi desktop video editor & dubbing berbasis naskah dengan Rust/Tauri 2.",
    },
    description: {
      en: "Local-first audio/video processing tools eliminating third-party cloud media leakage while delivering two-pass loudness normalization, ASS/SRT burned-in overlays, speaker diarization, and schema-validated meeting minutes.",
      id: "Perangkat pengolahan audio/video lokal yang menjaga kerahasiaan rekaman rapat dan mempercepat produksi video tutorial melalui normalisasi audio two-pass, subtitle ASS/SRT otomatis, diarisasi pembicara, dan paket sintesis notulen.",
    },
    status: "published",
    featured: false,
    featuredOrder: 8,
    year: 2026,
    duration: { en: "5 months", id: "5 bulan" },
    role: { en: "Systems & Desktop Engineer", id: "Systems & Desktop Engineer" },
    teamSize: 1,
    repoUrl: "https://github.com/RidhuanDEV/video-editor-dubbing",
    tags: ["rust", "tauri", "python", "fastapi", "cuda", "ffmpeg", "react"],
    techStack: [
      {
        name: "Rust & Tauri 2",
        category: "frontend",
        rationale: {
          en: "Low-footprint native desktop runtime with Zod-validated IPC and bundled LGPL FFmpeg sidecar.",
          id: "Runtime desktop native ringan dengan batas IPC tervalidasi Zod dan sidecar FFmpeg LGPL.",
        },
        alternatives: [],
      },
      {
        name: "FastAPI + Faster-Whisper (CUDA)",
        category: "backend",
        rationale: {
          en: "Separates lightweight CPU web API from GPU-accelerated CUDA transcription & Pyannote speaker diarization worker.",
          id: "Memisahkan API CPU ringan dari worker GPU CUDA untuk transkripsi Faster-Whisper dan diarisasi Pyannote.",
        },
        alternatives: [],
      },
      {
        name: "MySQL + Alembic + Docker GPU",
        category: "database",
        rationale: {
          en: "Account-isolated job queues, revision history for meeting minutes, and loopback-locked local profiles or Caddy HTTPS.",
          id: "Antrean job terisolasi per pengguna, riwayat revisi notulen, dan profil jaringan loopback atau HTTPS Caddy.",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: { en: "Export Pipeline", id: "Pipeline Ekspor" },
        value: "AV1 + H.264",
        context: { en: "1080p/4K presets + 2-pass loudness", id: "Preset 1080p/4K + normalisasi 2-pass" },
      },
      {
        label: { en: "IPC Validation", id: "Validasi IPC" },
        value: "100% Zod",
        context: { en: "Every Tauri invoke boundary typed", id: "Seluruh batas invoke Tauri divalidasi" },
      },
      {
        label: { en: "AI Handoff Split", id: "Pembagian Handoff" },
        value: "40k chars",
        context: { en: "Chunked transcript synthesis packages", id: "Paket sintesis transkrip tervalidasi" },
      },
      {
        label: { en: "Media Privacy", id: "Privasi Media" },
        value: "100% Local",
        context: { en: "On-device GPU & local Docker volumes", id: "GPU lokal & volume Docker privat" },
      },
    ],
    sections: [
      {
        type: "problem",
        title: { en: "Privacy Leakage & Manual Video Tutorial Bottlenecks", id: "Risiko Kebocoran Rekaman & Produksi Video Manual" },
        order: 0,
        content: {
          en: "<p>Internal engineering meetings cannot safely be uploaded to public SaaS transcribers, while recording product tutorial videos requires tedious manual alignment between scripts, TTS voiceovers, zoom spotlights, and subtitles.</p>",
          id: "<p>Rekaman rapat teknis internal tidak aman diunggah ke layanan transkripsi publik, sedangkan pembuatan video tutorial memerlukan penyelarasan manual antara naskah, suara dubbing, sorotan layar, dan subtitle.</p>",
        },
      },
      {
        type: "architecture",
        title: { en: "CPU/GPU Worker Split & Tauri IPC Bridge", id: "Pemisahan Worker CPU/GPU & Jembatan IPC Tauri" },
        order: 1,
        content: {
          en: "<p>The transcriber splits FastAPI CPU routes from a dedicated CUDA Docker worker sharing local volumes and MySQL job state, outputting chunked AI synthesis bundles. Script Studio pairs a React 19 + Radix UI studio with a Rust Tauri 2 backend orchestrating FFmpeg presets and subtitle burn-in.</p>",
          id: "<p>Transcriber memisahkan rute API CPU FastAPI dari worker CUDA Docker pada volume lokal dan antrean MySQL, menghasilkan paket sintesis AI terstruktur. Script Studio memadukan antarmuka React 19 + Radix UI dengan backend Rust Tauri 2 yang mengorkestrasi sidecar FFmpeg.</p>",
        },
        diagram: {
          interactive: true,
          nodes: [
            { id: "ui", label: "React 19 Studio", tone: "teal" },
            { id: "ipc", label: "Rust / FastAPI", tone: "amber" },
            { id: "gpu", label: "CUDA / FFmpeg", tone: "green" },
            { id: "out", label: "Minutes / AV1 Video", tone: "blue" },
          ],
        },
      },
      {
        type: "results",
        title: { en: "Delivered Capabilities", id: "Kapabilitas yang Dihasilkan" },
        order: 2,
        content: {
          en: "<p>Shipped Phase 5 feature-complete Script Studio exports (YouTube 4K, Shorts, WhatsApp, SRT/ASS overlays, Edge-TTS/Azure Speech) and production-ready Local Meeting Transcriber with schema-validated minutes revision tracking.</p>",
          id: "<p>Menyelesaikan Script Studio hingga fase ekspor penuh (YouTube 4K, Shorts, WhatsApp, overlay SRT/ASS, Edge-TTS/Azure Speech) serta Local Meeting Transcriber dengan pelacakan revisi notulen tervalidasi skema JSON.</p>",
        },
      },
    ],
    adrs: [],
  },
];

export const seedBlogPosts: BlogPostRecord[] = [
  {
    title: {
      en: "Why Mean Similarity Lies: Measuring SVG Vectorization with CIEDE2000 Defect Area",
      id: "Mengapa Rata-Rata Kemiripan Menipu: Mengukur Vektorisasi SVG dengan CIEDE2000",
    },
    slug: "ciede2000-visible-defect-area-svg-benchmark",
    excerpt: {
      en: "How a 97.99% similarity score hid 18% broken icon colors, and why open Headless Chrome perceptual benchmarks changed our release gate.",
      id: "Bagaimana skor kemiripan 97,99% menyembunyikan 18% warna ikon yang rusak, serta cara merancang benchmark perseptual terbuka menggunakan Headless Chrome.",
    },
    content: {
      en: "<h3>The Illusion of Global Averages</h3><p>While building PNG to SVG Vectorize, version 1.6.0 reported a 97.99% similarity score on a shop icon. Yet looking at the SVG revealed 18% of the icon had collapsed: dark red merged into bright red, and dark blue merged into blue.</p><h3>Designing an Honest Benchmark</h3><p>Instead of tuning solely for mean RGB accuracy, I built an automated pipeline that renders every generated SVG inside Headless Chrome and computes pixel-wise perceptual deltas using <strong>CIEDE2000 &gt; 5</strong> (excluding 1-2px edge anti-aliasing), paired with SSIM and file size across 45 public-domain Wikimedia Commons images.</p><h3>Outcome</h3><p>Making visible defects impossible to hide pushed the E7 flat-art benchmark to <strong>99.81% median similarity</strong> and <strong>0.05% median visible-defect area</strong> (0.993 SSIM).</p>",
      id: "<h3>Ilusi Skor Rata-Rata Global</h3><p>Saat mengembangkan PNG to SVG Vectorize, versi 1.6.0 mencatat skor kemiripan 97,99% pada sebuah ikon toko, padahal 18% area visualnya rusak karena merah tua bergabung dengan merah terang dan biru tua bergabung dengan biru.</p><h3>Merancang Benchmark yang Jujur</h3><p>Alih-alih mengejar rata-rata RGB, saya membangun pipeline uji otomatis yang merender setiap SVG keluaran menggunakan Headless Chrome lalu menghitung selisih warna perseptual per piksel melalui metrik <strong>CIEDE2000 &gt; 5</strong> (di luar tepi anti-aliasing 1-2px) bersama SSIM pada 45 gambar domain publik Wikimedia Commons.</p><h3>Hasil</h3><p>Pengukuran berbasis cacat terlihat ini mendorong set gambar E7 mencapai <strong>99,81% kemiripan median</strong> dengan <strong>0,05% area cacat terlihat</strong> (SSIM 0,993).</p>",
    },
    tags: ["python", "computer-vision", "benchmarking", "svg"],
    status: "published",
    readTimeMin: 8,
    publishedAt: new Date("2026-10-18"),
  },
  {
    title: {
      en: "Architecting Dual-Transport IoT Telemetry (WebSocket vs 40ms Coalesced SSE) in Go",
      id: "Arsitektur Telemetri IoT Dual-Transport (WebSocket vs SSE 40ms) dengan Go",
    },
    slug: "dual-transport-iot-telemetry-go-websocket-sse",
    excerpt: {
      en: "Preventing race conditions and TanStack Query cache flicker across 96 Zigbee endpoints using desired/reported state separation and monotonic uint64 versions.",
      id: "Mencegah race condition dan flicker cache TanStack Query pada 96 perangkat Zigbee dengan pemisahan desired/reported state serta versi monotonik uint64.",
    },
    content: {
      en: "<h3>The Bulk Toggle Trap</h3><p>In a 96-device smart building simulator (4 floors x 8 rooms x 3 Zigbee devices), physical RF updates take roughly 400ms to round-trip through MQTT Mosquitto and Zigbee2MQTT. When a user clicks 'Turn Off Floor 2', 24 devices emit telemetry concurrently.</p><h3>Monotonic Version Guards & Coalescing</h3><p>Our Go backend separates <code>desiredState</code> from <code>reportedState</code>, assigns a monotonically increasing <code>uint64</code> version per mutation, and coalesces SSE broadcasts in a 40ms window. On the React 19 client, TanStack Query rejects any incoming frame whose version is older than the local snapshot.</p>",
      id: "<h3>Jebakan Aksi Masal (Bulk Toggle)</h3><p>Pada sistem gedung pintar 96 endpoint Zigbee (4 lantai x 8 ruangan x 3 perangkat), pembaruan RF membutuhkan sekitar 400ms untuk pulang-pergi melalui MQTT Mosquitto dan Zigbee2MQTT. Ketika pengguna mematikan seluruh lantai, puluhan event status datang bersamaan.</p><h3>Guard Versi Monotonik & Coalescing 40ms</h3><p>Backend Go memisahkan <code>desiredState</code> dari <code>reportedState</code>, memberi nomor versi monotonik <code>uint64</code> pada setiap mutasi, serta menggabungkan broadcast SSE setiap 40ms. Di sisi React 19, cache TanStack Query menolak snapshot yang versinya lebih lama daripada state lokal.</p>",
    },
    tags: ["go", "iot", "mqtt", "websocket", "sse", "react"],
    status: "published",
    readTimeMin: 10,
    publishedAt: new Date("2026-10-08"),
  },
  {
    title: {
      en: "Evolving Logistics Schemas: Multi-Consignment, Multi-Stop Manifests with Binary(16) UUIDs",
      id: "Evolusi Skema Logistik: Manifest Multi-Konsinyasi & Multi-Stop dengan Binary(16) UUID",
    },
    slug: "evolving-logistics-data-models-emanifest-v2",
    excerpt: {
      en: "Lessons from migrating a rigid single-origin freight schema into a decoupled 3-level cargo and route-stop hierarchy.",
      id: "Pelajaran arsitektur saat memigrasi skema pengiriman titik tunggal menjadi hierarki konsolidasi kargo 3 lapis dan rute multi-stop.",
    },
    content: {
      en: "<h3>Why Point-to-Point Breaks Consolidation</h3><p>A real cargo truck rarely carries goods for just one shipper and one receiver. Tying <code>sender_id</code> and <code>receiver_id</code> directly onto the manifest table made multi-drop routes impossible without duplicating vehicle headers.</p><h3>Aggregate Boundaries & Binary(16)</h3><p>Introducing an intermediate consignment table (<code>manifest_pengiriman</code>) alongside ordered <code>manifest_rute_stop</code> checkpoints unlocked hazardous goods flags, HS codes, and partial loading/unloading while Binary(16) UUID keys kept SQL B-tree indexes compact.</p>",
      id: "<h3>Mengapa Skema A-ke-B Gagal pada Konsolidasi</h3><p>Satu truk logistik jarang membawa muatan untuk satu pengirim dan satu penerima saja. Mengikat kolom pengirim dan penerima langsung pada tabel induk manifest membuat rute multi-drop mustahil dimodelkan tanpa menduplikasi data kendaraan.</p><h3>Batas Agregat & Binary(16) UUID</h3><p>Memisahkan tabel konsinyasi (<code>manifest_pengiriman</code>) serta urutan titik rute (<code>manifest_rute_stop</code>) memungkinkan pelacakan barang B3, HS Code, dan bongkar-muat parsial dengan indeks relasional Binary(16) UUID yang tetap ringkas.</p>",
    },
    tags: ["database", "prisma", "architecture", "logistics"],
    status: "published",
    readTimeMin: 9,
    publishedAt: new Date("2026-09-22"),
  },
  {
    title: {
      en: "Mana Conservation: 3-Layer Context Routing and Quality Gates for AI Agents",
      id: "Konservasi Mana: Routing Konteks 3-Lapis dan Quality Gate untuk Agen AI",
    },
    slug: "mana-conservation-progressive-routing-ai-agents",
    excerpt: {
      en: "Why dumping 50 engineering docs into an LLM prompt hurts precision, and how foreign-key skill routing plus MCP servers fix contract drift.",
      id: "Mengapa memuat seluruh dokumen aturan ke prompt LLM menurunkan presisi, serta bagaimana routing skill progresif dan server MCP mencegah contract drift.",
    },
    content: {
      en: "<h3>Context Budget Is Finite</h3><p>Every token pasted into the root prompt gets re-billed across every reasoning step and dilutes attention over critical constraints. Treating engineering playbooks as a 3-layer foreign-key index keeps baseline overhead minimal while loading exact language and domain specs only when triggered.</p><h3>Binding Agents to Real Contracts</h3><p>By pairing progressive skill routing with custom MCP servers (<code>shadow-api</code> for OpenAPI 3.1/Postman testing, <code>shadow-db</code> for schema introspection, and <code>shadow-handoff</code> for cross-session memory), AI assistants verify against live evidence rather than guessing.</p>",
      id: "<h3>Anggaran Konteks Terbatas</h3><p>Setiap token yang dimuat sejak awal terus dihitung ulang pada setiap langkah penalaran dan memecah fokus model. Menyusun panduan rekayasa sebagai indeks foreign-key 3 lapis menjaga overhead awal tetap kecil sembari memuat spesifikasi bahasa dan domain tepat saat dibutuhkan.</p><h3>Menambatkan Agen ke Kontrak Nyata</h3><p>Memadukan routing progresif dengan server MCP kustom (<code>shadow-api</code> untuk OpenAPI/Postman, <code>shadow-db</code> untuk inspeksi skema, dan <code>shadow-handoff</code> untuk memori lintas sesi) memastikan agen AI memverifikasi kontrak nyata, bukan menebak.</p>",
    },
    tags: ["ai-agents", "mcp", "architecture", "developer-tools"],
    status: "published",
    readTimeMin: 7,
    publishedAt: new Date("2026-11-11"),
  },
];
