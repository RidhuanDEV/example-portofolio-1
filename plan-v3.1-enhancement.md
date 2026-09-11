# Engineering Plan v3.1: Language Enhancement (i18n) & Premium CMS Admin

This document outlines the architectural plan to enhance **Porto v3** with support for the Indonesian language (alongside English using an i18n strategy) and a premium CMS Admin upgrade that replaces error-prone JSON textareas with typed, interactive UI controls.

---

## 1. Professional Critique of Current Design & Content

### 1.1 Visual & UI/UX Critique
1. **The "Developer Console" Aesthetic is Strong but Lacks Premium Glows**:
   - The design uses a fantastic slate/dark scheme (`#08090b` with teal and emerald highlights) and a futuristic SVG system constellation.
   - **Critique**: The layout is clean but flat. Premium developers' portfolios are characterized by subtle visual elements: ambient background glows (`blur-3xl` radial gradients), noise/grain overlays, and animated borders for flagship items.
   - **Recommendation**: Introduce ambient canvas glows around the system map and flagship headers.

2. **Primitive UI Subsystem is Empty**:
   - `src/components/ui` is currently an empty directory.
   - **Critique**: Form fields in the `/admin` module and pages use ad-hoc classes. Reusable, robust layout tokens are not structured.
   - **Recommendation**: Create beautiful, primitive inputs, selectors, and switch controls under `src/components/ui/` with strict TypeScript types to eliminate CSS redundancy and form handling inconsistency.

3. **Suboptimal CMS Input Controls (JSON Textareas)**:
   - **Critique**: Currently, complex project components like *Metrics*, *Tech Stack*, *Case Study Sections*, and *ADRs* are modified using raw, unvalidated JSON strings in a textarea (`ProjectForm.tsx`). 
   - A single missing double quote or comma will crash the parser, trigger schema exceptions, or prevent save operations. This is a highly frustrating Developer Experience (DX) and is unacceptable for a premium CMS.
   - **Recommendation**: Upgrade the CMS forms to use dynamic interactive list components (with "Add Item", "Remove Item", and "Drag/Order" capabilities) styled with clean modern inputs.

---

### 1.2 Content & Language Critique
1. **The Language Mix-Up (Jarring Code-Switching)**:
   - The landing page tagline uses English: `"I build systems that scale, docs that teach."`
   - The bio in `seed-data.ts` uses Indonesian: `"Saya adalah backend-focused engineer dengan 5 tahun pengalaman..."`
   - The navigational menus, section titles, and case study parameters (duration, role, team) use English: `"flagship evidence"`, `"philosophy"`, `"Writing"`, `"Contact"`.
   - **Critique**: This creates a jarring read. Visitors are forced to read in two languages simultaneously. A portfolio for a senior engineer in Indonesia must cater to local companies (who appreciate clear Indonesian profiles) and global companies (who require technical English case studies).
   - **Recommendation**: Implement a formal, structured Internationalization (i18n) architecture. Both static UI text and database documents must be localized, with an elegant language toggle (EN ⇄ ID) in the Navbar.

2. **Dossier & ADR Tone Clarity**:
   - **Critique**: The case studies read like rigid system diagrams. The explanations can be phrased more pragmatically. In Indonesian, technical terms like "WATCH/MULTI/EXEC optimistic locking" should remain as established industry terms but contain contextually rich Indonesian explanations.

---

## 2. Localization Strategy (i18n): EN ⇄ ID

To maintain clean code and adhere to the strict rules (no `any`/`unknown` types, no git, clean code), we will implement a dual-layer localization approach:

1. **Static UI Translation**: Utilizing a lightweight, type-safe dictionary module matching paths with Next.js App Router context.
2. **Dynamic Content Translation**: Modifying MongoDB schemas to support multi-language documents.

### 2.1 Schema Updates (`src/models/` and `src/types/domain.ts`)

Instead of flat string values, fields that require translation will support an `i18n` object containing `en` and `id` keys.

```typescript
// Updated type pattern in src/types/domain.ts
export interface LocalizedString {
  en: string;
  id: string;
}

// Applying to MongoDB models
const LocalizedStringSchema = new Schema({
  en: { type: String, required: true },
  id: { type: String, required: true },
}, { _id: false });
```

#### Affected Models:
- **`Project`**:
  - `title` ➔ `LocalizedString`
  - `tagline` ➔ `LocalizedString`
  - `description` ➔ `LocalizedString`
  - `role` ➔ `LocalizedString`
  - `metrics.label` ➔ `LocalizedString`
  - `sections.title` and `sections.content` ➔ `LocalizedString`
  - `adrs.title`, `adrs.context`, `adrs.decision`, `adrs.consequences` ➔ `LocalizedString`
- **`BlogPost`**:
  - `title` ➔ `LocalizedString`
  - `excerpt` ➔ `LocalizedString`
  - `content` ➔ `LocalizedString`
- **`Profile`**:
  - `title` ➔ `LocalizedString`
  - `bio` ➔ `LocalizedString`
  - `philosophy` ➔ `LocalizedString`
- **`SiteSettings`**:
  - `siteTitle` ➔ `LocalizedString`
  - `siteDescription` ➔ `LocalizedString`
  - `heroHeadline` ➔ `LocalizedString`
  - `heroSubheadline` ➔ `LocalizedString`
  - `ctaText.primary` and `ctaText.secondary` ➔ `LocalizedString`

### 2.2 Directory Architecture for Localization

We will establish a type-safe locale store:
- `src/lib/i18n.ts`: Local context helper for managing the active language session (saved in cookies or cookie-based state so both Server Components and Client Components can read it seamlessly).
- `src/data/locales/en.json` & `src/data/locales/id.json`: Dynamic dictionaries for all hardcoded website strings (e.g. Navbar labels, Footer copyrights, Form labels, Admin operations).

```typescript
// Example: src/lib/i18n.ts
export type Locale = "en" | "id";

export function getTranslation(dict: Record<Locale, string>, locale: Locale): string {
  return dict[locale] ?? dict.en;
}
```

---

## 3. Premium CMS Admin Interface Upgrades

To make the CMS administrative interface look like a state-of-the-art developer operations dashboard, we will refactor `ProjectForm.tsx`, `BlogForm.tsx`, and add interactive widgets.

### 3.1 Removing JSON Textareas
We will design dedicated sub-form controls for each complex nested structure.

```
+-------------------------------------------------------------+
| PROJECT METRICS                                             |
+-------------------------------------------------------------+
| Value: [ 2.1M RPM   ] Label (EN): [ Peak Throughput       ] |
|                       Label (ID): [ Throughput Puncak     ] |
| Context (EN): [ Sustained during sale ] [ Remove ]          |
| Context (ID): [ Stabil saat promo     ]                     |
+-------------------------------------------------------------+
| [ + Add New Metric ]                                        |
+-------------------------------------------------------------+
```

1. **Metrics Sub-form**: List of objects with `value`, localized `label`, and optional localized `context`. Contains dynamic row addition/deletion buttons.
2. **Tech Stack Sub-form**: List of items selecting predefined categories, versions, rationale, and alternative options. No JSON input required!
3. **Sections Sub-form**: A collapsible list of custom case study sections. Integrate TipTap rich text editors for *both* Indonesian and English side-by-side or tabbed panels.
4. **ADRs Sub-form**: Elegant list of Architectural Decision Records with number, localized title, status selector, and detailed context/decision text fields.

### 3.2 Premium Admin UI Aesthetics
- **Modern Data Table**: Enhance `/admin/projects` and `/admin/blog` with interactive tables featuring search, status badges (`Draft` in grey/yellow, `Published` in green, `Archived` in orange), and clear publish/unpublish action buttons.
- **Side-by-Side Language Tabs**: In forms, integrate neat tabs `[ English ] [ Bahasa Indonesia ]` allowing the developer to translate the content in real-time.
- **Visual Analytics Mockup / Graph**: A minor charting utility showing mock traffic stats or activity metrics in a sleek grid.

---

## 4. Implementation Roadmap

### Phase 1: Localized Framework & Types Setup
1. Define strict `LocalizedString` and `LocalizedItem` types in `src/types/domain.ts`. Ensure **zero** `any` types.
2. Create static locale dictionaries in `src/data/locales/en.json` and `src/data/locales/id.json`.
3. Set up the `LocaleProvider` context or route helper to control the switch in `src/components/layout/Navbar.tsx`.

### Phase 2: Schema Migration & Seed Refresh
1. Modify Mongoose schemas under `src/models/` to support localized sub-schemas.
2. Update `src/data/seed-data.ts` to supply initial dual-language data (translating case studies and headlines into Indonesian).
3. Provide a script or endpoint to re-seed the MongoDB database.

### Phase 3: Interactive Admin Components Refactoring
1. Build `src/components/ui/Input.tsx`, `src/components/ui/Tabs.tsx`, `src/components/ui/Repeater.tsx` (generic typed multi-row builder).
2. Refactor `ProjectForm.tsx` to replace all JSON textareas with the new repeater controls. Ensure high-performance Zod schema validation using localized fields.
3. Apply identical improvements to `BlogForm.tsx` and `ProfileForm.tsx`.

### Phase 4: Public View Adaptation
1. Update `src/app/page.tsx` and `src/components/` (like `ProjectCard.tsx`, `CaseStudyLayout.tsx`) to pull content based on the active language setting.
2. Ensure metadata and title generation are perfectly localized for SEO optimization.

---

## 5. Verification Plan

### 5.1 Manual Verification
1. **Language Toggling**:
   - Access the homepage `http://localhost:3000`. Toggle the EN/ID button in the navbar.
   - Verify that all static UI copy (menus, section headers, footer) changes instantly.
   - Verify that dynamic DB copy (bio, project tags, project details) displays in the chosen language.
2. **CMS Data Integrity**:
   - Log into `/admin`.
   - Open `/admin/projects/new`. Fill out the localized forms using the interactive fields.
   - Save the record. Verify that it saves to MongoDB without any schema errors.
   - Edit the newly created project, ensure all data is correctly loaded back into the interactive fields.

### 5.2 Automated Types Verification
1. Run `npm run typecheck` to ensure no TypeScript compilation errors occur.
2. Run `npm run lint` to enforce clean lint compliance.
