import type {
  BlogPostRecord,
  ProfileRecord,
  ProjectRecord,
  SiteSettingsRecord,
} from "@/types/domain";

export const seedProfile: ProfileRecord = {
  name: "Ridhuan Rangga Kusuma",
  title: {
    en: "Senior Software Engineer",
    id: "Senior Software Engineer",
  },
  bio: {
    en: "I am a backend-focused engineer with 5 years of experience building distributed systems, data pipelines, and scalable API platforms. I believe that good software engineering starts with a deep understanding of the problem, not from framework selection.",
    id: "Saya adalah backend-focused engineer dengan 5 tahun pengalaman membangun sistem distribusi, data pipeline, dan platform API yang scalable. Saya percaya bahwa software engineering yang baik dimulai dari pemahaman mendalam tentang problem, bukan dari pemilihan framework.",
  },
  philosophy: {
    en: "The best system is not the most sophisticated, but the easiest to understand for the next engineer who has to maintain it.",
    id: "Sistem terbaik bukan yang paling canggih, tapi yang paling mudah dipahami oleh orang berikutnya yang harus menjaganya.",
  },
  location: {
    en: "Jakarta, Indonesia",
    id: "Jakarta, Indonesia",
  },
  email: "ridhuan@example.com",
  resumeUrl: "/resume.pdf",
  socialLinks: {
    github: "https://github.com/RidhuanDEV",
    linkedin: "https://www.linkedin.com/in/ridhuan-rangga-kusuma-146241292/",
  },
  currentFocus: [
    {
      en: "Distributed systems and event-driven architecture",
      id: "Sistem terdistribusi dan arsitektur berbasis event",
    },
    {
      en: "Database performance optimization",
      id: "Optimasi performa database",
    },
    {
      en: "Developer tooling and DX",
      id: "Tooling developer dan DX",
    },
  ],
  skills: [
    { name: "TypeScript", category: "language", level: 5, yearsExp: 4 },
    { name: "Python", category: "language", level: 4, yearsExp: 5 },
    { name: "Go", category: "language", level: 3, yearsExp: 1 },
    { name: "Next.js", category: "framework", level: 5, yearsExp: 3 },
    { name: "FastAPI", category: "framework", level: 5, yearsExp: 3 },
    { name: "PostgreSQL", category: "database", level: 4, yearsExp: 4 },
    { name: "MongoDB", category: "database", level: 4, yearsExp: 3 },
    { name: "Redis", category: "database", level: 4, yearsExp: 3 },
    { name: "Docker", category: "tool", level: 4, yearsExp: 4 },
    { name: "Kubernetes", category: "cloud", level: 3, yearsExp: 2 },
    { name: "AWS", category: "cloud", level: 3, yearsExp: 3 },
    { name: "System Design", category: "concept", level: 5 },
    { name: "API Design", category: "concept", level: 5 },
    { name: "Caching Strategy", category: "concept", level: 4 },
    { name: "Event Sourcing", category: "concept", level: 3 },
  ],
  experiences: [
    {
      company: "Tokopedia (GoTo Group)",
      role: {
        en: "Senior Software Engineer - Platform Infrastructure",
        id: "Senior Software Engineer - Platform Infrastructure",
      },
      startDate: "2022-03",
      endDate: null,
      highlights: [
        {
          en: "Designed and implemented distributed rate-limiting service handling 2M+ RPM using Redis Lua scripts, reducing abuse incidents by 94%",
          id: "Mendesain dan mengimplementasikan layanan pembatas laju terdistribusi yang menangani 2 juta+ RPM menggunakan skrip Lua Redis, mengurangi insiden penyalahgunaan sebesar 94%",
        },
        {
          en: "Led migration of legacy PHP monolith service to Go microservices, cutting p99 latency from 850ms to 120ms",
          id: "Memimpin migrasi layanan monolit PHP warisan ke Go microservices, memangkas latensi p99 dari 850ms menjadi 120ms",
        },
        {
          en: "Built internal developer portal for service catalog management, used daily by 200+ engineers",
          id: "Membangun portal developer internal untuk manajemen katalog layanan, digunakan setiap hari oleh 200+ engineer",
        },
      ],
      techUsed: ["Go", "Redis", "Kafka", "PostgreSQL", "Kubernetes", "Prometheus"],
    },
    {
      company: "Bukalapak",
      role: {
        en: "Software Engineer - Search and Discovery",
        id: "Software Engineer - Pencarian dan Penemuan",
      },
      startDate: "2020-06",
      endDate: "2022-02",
      highlights: [
        {
          en: "Built Elasticsearch-based product search with fuzzy matching and typo correction, improving search conversion by 23%",
          id: "Membangun pencarian produk berbasis Elasticsearch dengan pencocokan fuzzy dan koreksi salah ketik, meningkatkan konversi pencarian sebesar 23%",
        },
        {
          en: "Implemented multi-layer caching strategy reducing average search latency from 480ms to 65ms",
          id: "Mengimplementasikan strategi caching multi-layer yang mengurangi latensi rata-rata pencarian dari 480ms menjadi 65ms",
        },
        {
          en: "Designed A/B testing framework for search ranking experiments",
          id: "Mendesain framework pengujian A/B untuk eksperimen peringkat pencarian",
        },
      ],
      techUsed: ["Python", "Elasticsearch", "Redis", "FastAPI", "PostgreSQL", "Docker"],
    },
  ],
};

export const seedSettings: SiteSettingsRecord = {
  siteTitle: {
    en: "Ridhuan Rangga Kusuma - Software Engineer",
    id: "Ridhuan Rangga Kusuma - Software Engineer",
  },
  siteDescription: {
    en: "Engineering portfolio showcasing technical case studies, architecture decisions, and system thinking evidence of a senior backend engineer.",
    id: "Engineering portfolio yang menyajikan technical case studies, architecture decisions, dan bukti system thinking dari seorang senior backend engineer.",
  },
  maintenanceMode: false,
  heroHeadline: {
    en: "I build systems that scale, docs that teach.",
    id: "Saya membangun sistem yang berskala, dokumentasi yang mengedukasi.",
  },
  heroSubheadline: {
    en: "Senior Software Engineer specializing in distributed systems, API design, and platform infrastructure. Based in Jakarta.",
    id: "Senior Software Engineer yang berspesialisasi dalam sistem terdistribusi, desain API, dan infrastruktur platform. Berbasis di Jakarta.",
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
        en: "Years Experience",
        id: "Tahun Pengalaman",
      },
      value: "5+",
    },
    {
      label: {
        en: "Systems Shipped",
        id: "Sistem Dideploy",
      },
      value: "20+",
    },
    {
      label: {
        en: "Peak RPS Handled",
        id: "Puncak RPS Ditangani",
      },
      value: "2M+",
    },
    {
      label: {
        en: "P99 Latency Reduced",
        id: "Latensi P99 Dikurangi",
      },
      value: "87%",
    },
  ],
};

export const seedProjects: ProjectRecord[] = [
  {
    title: {
      en: "Distributed Rate Limiting Service",
      id: "Layanan Pembatasan Laju Terdistribusi",
    },
    slug: "distributed-rate-limiter",
    tagline: {
      en: "Redis-based token bucket implementation handling 2M+ RPM with sub-millisecond overhead, rebuilt after the legacy PHP system caused production incidents.",
      id: "Implementasi token bucket berbasis Redis yang menangani 2 juta+ RPM dengan overhead sub-milidetik, dibangun kembali setelah sistem PHP lama menyebabkan insiden produksi.",
    },
    description: {
      en: "A high-performance distributed rate limiting service built to replace a naive in-process limiter that could not handle horizontal scaling.",
      id: "Layanan pembatasan laju terdistribusi berkinerja tinggi yang dibangun untuk menggantikan limiter dalam-proses sederhana yang tidak dapat menangani penskalaan horizontal.",
    },
    status: "published",
    featured: true,
    featuredOrder: 1,
    year: 2023,
    duration: {
      en: "4 months",
      id: "4 bulan",
    },
    role: {
      en: "Lead Backend Engineer",
      id: "Lead Backend Engineer",
    },
    teamSize: 3,
    repoUrl: "https://github.com/rizky/rate-limiter",
    tags: ["go", "redis", "distributed-systems", "api", "microservices"],
    techStack: [
      {
        name: "Go",
        category: "backend",
        version: "1.20",
        rationale: {
          en: "Low allocation overhead and strong concurrency primitives.",
          id: "Overhead alokasi rendah dan primitif konkurensi yang kuat.",
        },
        alternatives: [],
      },
      {
        name: "Redis",
        category: "database",
        rationale: {
          en: "Atomic Lua execution kept the request path to a single network hop.",
          id: "Eksekusi Lua atomik menjaga jalur permintaan ke satu hop jaringan.",
        },
        alternatives: [
          {
            name: "PostgreSQL",
            reasonNotChosen: {
              en: "Lock contention under burst load.",
              id: "Persaingan kunci di bawah beban lonjakan.",
            },
          },
        ],
      },
      {
        name: "Prometheus",
        category: "infra",
        rationale: {
          en: "Operational metrics for degradation and per-policy behavior.",
          id: "Metrik operasional untuk degradasi dan perilaku per-kebijakan.",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: {
          en: "Peak Throughput",
          id: "Throughput Puncak",
        },
        value: "2.1M RPM",
        context: {
          en: "Sustained during flash sale",
          id: "Stabil selama promo kilat",
        },
      },
      {
        label: {
          en: "Rate limit overhead",
          id: "Overhead batas laju",
        },
        value: "<0.8ms p99",
        context: {
          en: "Added latency per request",
          id: "Tambahan latensi per permintaan",
        },
      },
      {
        label: {
          en: "Accuracy",
          id: "Akurasi",
        },
        value: "99.97%",
        context: {
          en: "Measured over 30 days",
          id: "Diukur selama 30 hari",
        },
      },
      {
        label: {
          en: "Abuse reduction",
          id: "Pengurangan penyalahgunaan",
        },
        value: "94% down",
        context: {
          en: "Scraping incidents after deployment",
          id: "Insiden scraping setelah deployment",
        },
      },
    ],
    sections: [
      {
        type: "problem",
        title: {
          en: "Problem Statement",
          id: "Pernyataan Masalah",
        },
        order: 0,
        content: {
          en: "<h3>Business Context</h3><p>Tokopedia's API gateway handled around 800k RPM at steady state with larger spikes during flash sale events. The old limiter kept counters per instance, effectively multiplying real limits by the number of gateway replicas.</p><h3>Constraints</h3><ul><li>Do not add more than 2ms p99 latency.</li><li>Support per-client, per-endpoint, and per-IP policies.</li><li>Degrade gracefully when Redis is unavailable.</li></ul>",
          id: "<h3>Konteks Bisnis</h3><p>API gateway Tokopedia menangani sekitar 800 ribu RPM pada kondisi stabil dengan lonjakan yang lebih besar selama acara flash sale. Limiter lama menyimpan penghitung per instance, yang secara efektif melipatgandakan batas nyata dengan jumlah replika gateway.</p><h3>Batasan</h3><ul><li>Jangan menambahkan latensi p99 lebih dari 2ms.</li><li>Dukung kebijakan per-klien, per-endpoint, dan per-IP.</li><li>Degradasi secara anggun saat Redis tidak tersedia.</li></ul>",
        },
      },
      {
        type: "architecture",
        title: {
          en: "System Architecture",
          id: "Arsitektur Sistem",
        },
        order: 1,
        content: {
          en: "<h3>High-Level Design</h3><p>The rate limiter runs as a sidecar beside each API gateway. Checks are synchronous gRPC calls, while Redis performs a single atomic Lua operation for the counter update.</p>",
          id: "<h3>Desain Tingkat Tinggi</h3><p>Pembatas laju berjalan sebagai sidecar di samping setiap API gateway. Pemeriksaan adalah panggilan gRPC sinkron, sementara Redis melakukan operasi Lua atomik tunggal untuk pembaruan penghitung.</p>",
        },
        diagram: { interactive: true },
      },
      {
        type: "tradeoffs",
        title: {
          en: "Key Trade-offs",
          id: "Kompromi Utama",
        },
        order: 2,
        content: {
          en: "<h3>Lua Script vs WATCH/MULTI/EXEC</h3><p><strong>Decision:</strong> use server-side Lua scripts. Lua avoids retry loops under contention while keeping the operation atomic.</p><h3>Fail-open vs Fail-closed</h3><p><strong>Decision:</strong> fail-open with alerts. A rate-limiter failure should not take down customer traffic.</p>",
          id: "<h3>Skrip Lua vs WATCH/MULTI/EXEC</h3><p><strong>Keputusan:</strong> gunakan skrip Lua sisi server. Lua menghindari perulangan percobaan kembali di bawah persaingan sambil menjaga operasi tetap atomik.</p><h3>Fail-open vs Fail-closed</h3><p><strong>Keputusan:</strong> fail-open dengan alarm. Kegagalan pembatas laju tidak boleh menghentikan lalu lintas pelanggan.</p>",
        },
      },
      {
        type: "results",
        title: {
          en: "Results and Impact",
          id: "Hasil dan Dampak",
        },
        order: 3,
        content: {
          en: "<p>The service handled 2.1M RPM during the first major sale after deployment with zero rate-limit accuracy incidents and a 94% reduction in abuse incidents.</p>",
          id: "<p>Layanan ini menangani 2,1 juta RPM selama penjualan besar pertama setelah penerapan dengan nol insiden akurasi batas laju dan pengurangan insiden penyalahgunaan sebesar 94%.</p>",
        },
      },
    ],
    adrs: [
      {
        number: 1,
        title: {
          en: "Use Redis Lua Scripts for Atomic Rate Limit Operations",
          id: "Gunakan Skrip Lua Redis untuk Operasi Batas Laju Atomik",
        },
        status: "accepted",
        context: {
          en: "Rate limit check-and-increment must be atomic under concurrent requests from the same client.",
          id: "Pemeriksaan dan peningkatan batas laju harus atomik di bawah permintaan bersamaan dari klien yang sama.",
        },
        decision: {
          en: "Use Redis server-side Lua scripts, which execute atomically inside Redis.",
          id: "Gunakan skrip Lua sisi server Redis, yang dieksekusi secara atomik di dalam Redis.",
        },
        consequences: {
          en: "Scripts must stay short and versioned because long-running Lua blocks other Redis operations.",
          id: "Skrip harus tetap pendek dan versi karena Lua yang berjalan lama memblokir operasi Redis lainnya.",
        },
        alternatives: [
          {
            en: "WATCH/MULTI/EXEC optimistic locking",
            id: "Optimistic locking WATCH/MULTI/EXEC",
          },
          {
            en: "Single bottleneck rate-limit service",
            id: "Layanan batas laju bottleneck tunggal",
          },
        ],
      },
    ],
  },
  {
    title: {
      en: "Product Search Platform Rebuild",
      id: "Membangun Kembali Platform Pencarian Produk",
    },
    slug: "product-search-platform",
    tagline: {
      en: "Elasticsearch and multi-layer caching rebuild, cutting search latency from 480ms to 65ms and lifting conversion by 23%.",
      id: "Membangun kembali Elasticsearch dan caching multi-layer, memangkas latensi pencarian dari 480ms menjadi 65ms dan meningkatkan konversi sebesar 23%.",
    },
    description: {
      en: "A ground-up rebuild of a product search engine with personalization, typo tolerance, and ranking experiments.",
      id: "Membangun kembali dari awal mesin pencari produk dengan personalisasi, toleransi salah ketik, dan eksperimen pemeringkatan.",
    },
    status: "published",
    featured: true,
    featuredOrder: 2,
    year: 2021,
    duration: {
      en: "6 months",
      id: "6 bulan",
    },
    role: {
      en: "Backend Engineer - Search Domain",
      id: "Backend Engineer - Domain Pencarian",
    },
    teamSize: 5,
    tags: ["python", "elasticsearch", "redis", "fastapi", "search", "caching"],
    techStack: [
      {
        name: "Elasticsearch",
        category: "database",
        rationale: {
          en: "Full-text ranking, typo tolerance, and operational search tooling.",
          id: "Peringkat teks lengkap, toleransi salah ketik, dan tooling pencarian operasional.",
        },
        alternatives: [],
      },
      {
        name: "Redis",
        category: "database",
        rationale: {
          en: "L2 cache for popular query result sets.",
          id: "Cache L2 untuk kumpulan hasil kueri populer.",
        },
        alternatives: [],
      },
      {
        name: "FastAPI",
        category: "backend",
        rationale: {
          en: "Typed API boundaries and fast iteration for ranking experiments.",
          id: "Batasan API yang diketik dan iterasi cepat untuk eksperimen pemeringkatan.",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: {
          en: "Search latency p99",
          id: "Latensi pencarian p99",
        },
        value: "480ms to 65ms",
        context: {
          en: "After cache and ES tuning",
          id: "Setelah optimasi cache dan ES",
        },
      },
      {
        label: {
          en: "Search conversion",
          id: "Konversi pencarian",
        },
        value: "+23%",
        context: {
          en: "Items added-to-cart after search",
          id: "Barang dimasukkan ke keranjang setelah dicari",
        },
      },
      {
        label: {
          en: "Cache hit rate",
          id: "Rasio cache hit",
        },
        value: "78%",
        context: {
          en: "L1 and L2 combined",
          id: "Gabungan L1 dan L2",
        },
      },
      {
        label: {
          en: "Index freshness",
          id: "Kesegaran indeks",
        },
        value: "<30 sec",
        context: {
          en: "Product update to searchable",
          id: "Pembaruan produk hingga dapat dicari",
        },
      },
    ],
    sections: [
      {
        type: "problem",
        title: {
          en: "Search Was Becoming a Revenue Bottleneck",
          id: "Pencarian Sempat Menjadi Hambatan Pendapatan",
        },
        order: 0,
        content: {
          en: "<p>The legacy search stack degraded as catalog size grew. Popular queries were slow, typo handling was inconsistent, and ranking experiments required risky deploys.</p>",
          id: "<p>Stack pencarian lama menurun kualitasnya seiring bertambahnya ukuran katalog. Kueri populer terasa lambat, penanganan salah ketik tidak konsisten, dan eksperimen pemeringkatan memerlukan deployment yang berisiko.</p>",
        },
      },
      {
        type: "caching",
        title: {
          en: "Multi-layer Cache Strategy",
          id: "Strategi Cache Multi-layer",
        },
        order: 1,
        content: {
          en: "<p>The platform used a small in-process cache for hot normalized queries and Redis for popular result sets, with explicit invalidation when product updates changed searchable fields.</p>",
          id: "<p>Platform ini menggunakan cache dalam-proses kecil untuk kueri ternormalisasi yang populer dan Redis untuk kumpulan hasil populer, dengan invalidasi eksplisit saat pembaruan produk mengubah bidang yang dapat dicari.</p>",
        },
      },
      {
        type: "results",
        title: {
          en: "Measured Outcomes",
          id: "Hasil yang Terukur",
        },
        order: 2,
        content: {
          en: "<p>P99 latency dropped from 480ms to 65ms. Search conversion increased by 23% after ranking and typo tolerance improvements shipped.</p>",
          id: "<p>Latensi P99 turun dari 480ms menjadi 65ms. Konversi pencarian meningkat sebesar 23% setelah perbaikan peringkat dan toleransi salah ketik diluncurkan.</p>",
        },
      },
    ],
    adrs: [],
  },
  {
    title: {
      en: "Internal Developer Portal",
      id: "Portal Developer Internal",
    },
    slug: "internal-developer-portal",
    tagline: {
      en: "Service catalog and runbook portal used daily by 200+ engineers to reduce ownership ambiguity and incident response time.",
      id: "Katalog layanan dan portal runbook yang digunakan setiap hari oleh 200+ engineer untuk mengurangi ambiguitas kepemilikan dan waktu respons insiden.",
    },
    description: {
      en: "A platform engineering portal for service ownership, dependency maps, runbooks, and architecture decision records.",
      id: "Sebuah portal platform engineering untuk kepemilikan layanan, peta dependensi, runbook, dan catatan keputusan arsitektur (ADR).",
    },
    status: "published",
    featured: true,
    featuredOrder: 3,
    year: 2024,
    duration: {
      en: "5 months",
      id: "5 bulan",
    },
    role: {
      en: "Platform Engineer",
      id: "Platform Engineer",
    },
    teamSize: 4,
    tags: ["next.js", "mongodb", "platform-engineering", "observability"],
    techStack: [
      {
        name: "Next.js",
        category: "frontend",
        rationale: {
          en: "Server-rendered catalog pages with fast internal search.",
          id: "Halaman katalog yang dirender di server dengan pencarian internal yang cepat.",
        },
        alternatives: [],
      },
      {
        name: "MongoDB",
        category: "database",
        rationale: {
          en: "Flexible service metadata with nested owners and dependencies.",
          id: "Metadata layanan yang fleksibel dengan pemilik bersarang dan dependensi.",
        },
        alternatives: [
          {
            name: "PostgreSQL",
            reasonNotChosen: {
              en: "Too rigid for heterogeneous service metadata.",
              id: "Terlalu kaku untuk metadata layanan heterogen.",
            },
          },
        ],
      },
      {
        name: "Atlas Search",
        category: "database",
        rationale: {
          en: "Command-palette style search across services, tags, and runbooks.",
          id: "Pencarian bergaya command-palette di seluruh layanan, tag, dan runbook.",
        },
        alternatives: [],
      },
    ],
    metrics: [
      {
        label: {
          en: "Daily users",
          id: "Pengguna harian",
        },
        value: "200+",
        context: {
          en: "Engineering organization",
          id: "Organisasi engineering",
        },
      },
      {
        label: {
          en: "Ownership lookup",
          id: "Pencarian kepemilikan",
        },
        value: "10 min to 20 sec",
        context: {
          en: "Median incident lookup",
          id: "Median waktu lookup saat insiden",
        },
      },
      {
        label: {
          en: "Services cataloged",
          id: "Layanan dikatalogkan",
        },
        value: "140+",
        context: {
          en: "Production services",
          id: "Layanan produksi",
        },
      },
      {
        label: {
          en: "Runbook coverage",
          id: "Cakupan runbook",
        },
        value: "81%",
        context: {
          en: "Tier 1 and 2 services",
          id: "Layanan Tier 1 dan Tier 2",
        },
      },
    ],
    sections: [
      {
        type: "problem",
        title: {
          en: "Ownership Was Hidden in Chat History",
          id: "Kepemilikan Sempat Tersembunyi di Riwayat Obrolan",
        },
        order: 0,
        content: {
          en: "<p>Engineers often discovered service ownership by asking in chat during incidents. The portal turned ownership, dependencies, and runbooks into searchable operational metadata.</p>",
          id: "<p>Engineer sering kali mencari tahu kepemilikan layanan dengan bertanya di obrolan saat insiden terjadi. Portal ini mengubah kepemilikan, dependensi, dan runbook menjadi metadata operasional yang dapat dicari.</p>",
        },
      },
      {
        type: "database-design",
        title: {
          en: "Document Model",
          id: "Model Dokumen",
        },
        order: 1,
        content: {
          en: "<p>Each service document owns nested owners, alert routes, dependencies, and runbooks. MongoDB matched the shape of the operational object and avoided migration churn for optional metadata.</p>",
          id: "<p>Setiap dokumen layanan memiliki pemilik bersarang, rute peringatan, dependensi, dan runbook. MongoDB cocok dengan bentuk objek operasional dan menghindari churn migrasi untuk metadata opsional.</p>",
        },
      },
      {
        type: "observability",
        title: {
          en: "Operational Readiness",
          id: "Kesiapan Operasional",
        },
        order: 2,
        content: {
          en: "<p>The portal highlighted services missing owners, SLOs, alert routes, or runbooks so platform quality could be improved incrementally.</p>",
          id: "<p>Portal ini menyoroti layanan yang tidak memiliki pemilik, SLO, rute peringatan, atau runbook sehingga kualitas platform dapat ditingkatkan secara bertahap.</p>",
        },
      },
    ],
    adrs: [],
  },
];

export const seedBlogPosts: BlogPostRecord[] = [
  {
    title: {
      en: "Designing Portfolio Systems That Prove Technical Depth",
      id: "Mendesain Sistem Portofolio yang Membuktikan Kedalaman Teknis",
    },
    slug: "designing-portfolio-systems-prove-depth",
    excerpt: {
      en: "Most developer portfolios answer what did you build, but fail to answer how did you think.",
      id: "Kebanyakan portofolio developer menjawab apa yang Anda bangun, tetapi gagal menjawab bagaimana cara Anda berpikir.",
    },
    content: {
      en: "<p>Case studies let a reviewer simulate how you handle ambiguous engineering problems. The best portfolio reads like an internal engineering dossier, not a gallery of screenshots.</p>",
      id: "<p>Studi kasus memungkinkan reviewer mensimulasikan cara Anda menangani masalah rekayasa yang ambigu. Portofolio terbaik dibaca seperti berkas teknik internal, bukan galeri tangkapan layar.</p>",
    },
    tags: ["engineering", "career", "portfolio", "documentation"],
    status: "published",
    readTimeMin: 8,
    publishedAt: new Date("2024-01-15"),
  },
  {
    title: {
      en: "Cache Strategy Trade-offs in Small Products",
      id: "Kompromi Strategi Cache pada Produk Skala Kecil",
    },
    slug: "cache-strategy-tradeoffs-small-products",
    excerpt: {
      en: "A pragmatic decision framework for teams that need caching without accidental architecture weight.",
      id: "Kerangka keputusan pragmatis untuk tim yang membutuhkan caching tanpa menambah beban arsitektur yang tidak perlu.",
    },
    content: {
      en: "<p>The most common caching mistake in small products is using caching before profiling. The right cache is shaped by a measured bottleneck.</p>",
      id: "<p>Kesalahan caching yang paling umum pada produk kecil adalah menggunakan caching sebelum melakukan profiling. Cache yang tepat dibentuk oleh bottleneck yang terukur.</p>",
    },
    tags: ["caching", "redis", "performance", "architecture"],
    status: "published",
    readTimeMin: 12,
    publishedAt: new Date("2024-02-03"),
  },
  {
    title: {
      en: "Writing ADRs for Solo Projects",
      id: "Menulis ADR untuk Proyek Solo",
    },
    slug: "writing-adrs-for-solo-projects",
    excerpt: {
      en: "Architecture Decision Records are useful even when the only reviewer is your future self.",
      id: "Architecture Decision Records (ADR) sangat berguna bahkan ketika satu-satunya reviewer adalah diri Anda sendiri di masa depan.",
    },
    content: {
      en: "<p>Writing ADRs alone forces clear trade-off thinking and turns portfolio projects into evidence of senior engineering judgment.</p>",
      id: "<p>Menulis ADR secara mandiri memaksa pemikiran trade-off yang jelas dan mengubah proyek portofolio menjadi bukti penilaian engineering senior.</p>",
    },
    tags: ["adr", "documentation", "architecture"],
    status: "published",
    readTimeMin: 6,
    publishedAt: new Date("2024-03-10"),
  },
];
