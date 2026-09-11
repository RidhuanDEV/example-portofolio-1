import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { getSiteSettings } from "@/lib/data";
import { serializeRecord } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export default async function AdminSiteSettingsPage() {
  const rawSettings = await getSiteSettings();
  const settings = serializeRecord(rawSettings);

  return (
    <div className="grid gap-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">settings</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Site settings contract</h1>
      </div>
      <SiteSettingsForm initialData={settings} />
    </div>
  );
}
