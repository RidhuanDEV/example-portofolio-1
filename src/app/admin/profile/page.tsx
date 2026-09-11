import { ProfileForm } from "@/components/admin/ProfileForm";
import { getProfile } from "@/lib/data";
import { serializeRecord } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const rawProfile = await getProfile();
  const profile = serializeRecord(rawProfile);

  return (
    <div className="grid gap-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">profile</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Edit profile contract</h1>
      </div>
      <ProfileForm initialData={profile} />
    </div>
  );
}
