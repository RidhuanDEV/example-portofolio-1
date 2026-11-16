import { getContactMessages } from "@/lib/data";
import { toDateLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="grid gap-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">inbox</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Contact messages</h1>
      </div>

      {messages.length === 0 ? (
        <div className="border border-white/10 p-6 text-sm text-zinc-400">
          No contact messages recorded yet. Messages submitted via the public /contact form are stored here when MongoDB is connected.
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg, idx) => (
            <div key={String(msg._id ?? idx)} className="border border-white/10 bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <p className="text-base font-semibold text-white">{msg.name}</p>
                  <a href={`mailto:${msg.email}`} className="font-mono text-xs text-teal-200 hover:underline">
                    {msg.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    {msg.status}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    {toDateLabel(msg.createdAt)}
                  </span>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-zinc-300">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
