"use client";

import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";
import type { Metric, TechItem, TechCategory, TechAlternative, CaseStudySection, SectionType, ADR, AdrStatus, LocalizedString } from "@/types/domain";
import { techCategories, sectionTypes, adrStatuses } from "@/types/domain";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

function isTechCategory(val: string): val is TechCategory {
  return techCategories.some((cat) => cat === val);
}

function isSectionType(val: string): val is SectionType {
  return sectionTypes.some((type) => type === val);
}

function isAdrStatus(val: string): val is AdrStatus {
  return adrStatuses.some((status) => status === val);
}

interface MetricsEditorProps {
  value: Metric[];
  onChange: (val: Metric[]) => void;
}

export function MetricsEditor({ value, onChange }: MetricsEditorProps) {
  const addMetric = () => {
    onChange([...value, { label: { en: "", id: "" }, value: "", context: { en: "", id: "" } }]);
  };

  const removeMetric = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateMetric = (index: number, updated: Partial<Metric>) => {
    onChange(
      value.map((m, i) => {
        if (i === index) {
          const nextMetric = { ...m, ...updated };
          if (updated.label) {
            nextMetric.label = { ...m.label, ...updated.label };
          }
          if (updated.context) {
            nextMetric.context = {
              en: updated.context.en !== undefined ? updated.context.en : (m.context?.en ?? ""),
              id: updated.context.id !== undefined ? updated.context.id : (m.context?.id ?? ""),
            };
          }
          return nextMetric;
        }
        return m;
      })
    );
  };

  const moveMetric = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= value.length) return;
    const next = [...value];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    onChange(next);
  };

  return (
    <div className="grid gap-4 border border-zinc-800 p-4 bg-zinc-950/20">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-teal-200">Project Metrics</h3>
        <button
          type="button"
          onClick={addMetric}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-teal-200/30 text-teal-200 bg-teal-400/5 hover:border-teal-200 transition cursor-pointer"
        >
          <Plus size={14} /> Add Metric
        </button>
      </div>

      {value.length === 0 ? (
        <p className="text-zinc-500 text-xs italic">No metrics defined yet.</p>
      ) : (
        <div className="grid gap-3">
          {value.map((metric, index) => (
            <div key={index} className="grid gap-3 border border-zinc-800/80 p-3 bg-zinc-900/10">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400 font-mono">Metric #{index + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveMetric(index, "up")}
                    className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={index === value.length - 1}
                    onClick={() => moveMetric(index, "down")}
                    className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeMetric(index)}
                    className="p-1 text-red-400 hover:text-red-300 ml-1 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Value (e.g. 2.1M RPM)
                  <input
                    value={metric.value}
                    onChange={(e) => updateMetric(index, { value: e.target.value })}
                    className="admin-input py-1 text-xs"
                    placeholder="2.1M RPM"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Label (English)
                  <input
                    value={metric.label.en}
                    onChange={(e) => updateMetric(index, { label: { ...metric.label, en: e.target.value } })}
                    className="admin-input py-1 text-xs"
                    placeholder="Peak throughput"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Label (Indonesian)
                  <input
                    value={metric.label.id}
                    onChange={(e) => updateMetric(index, { label: { ...metric.label, id: e.target.value } })}
                    className="admin-input py-1 text-xs"
                    placeholder="Throughput Puncak"
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Context (English) - Optional
                  <input
                    value={metric.context?.en ?? ""}
                    onChange={(e) => updateMetric(index, { context: { en: e.target.value, id: metric.context?.id ?? "" } })}
                    className="admin-input py-1 text-xs"
                    placeholder="sustained over 48 hours"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Context (Indonesian) - Optional
                  <input
                    value={metric.context?.id ?? ""}
                    onChange={(e) => updateMetric(index, { context: { en: metric.context?.en ?? "", id: e.target.value } })}
                    className="admin-input py-1 text-xs"
                    placeholder="stabil selama 48 jam"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface TechStackEditorProps {
  value: TechItem[];
  onChange: (val: TechItem[]) => void;
}

export function TechStackEditor({ value, onChange }: TechStackEditorProps) {
  const addTechItem = () => {
    onChange([
      ...value,
      {
        name: "",
        category: "backend",
        version: "",
        rationale: { en: "", id: "" },
        alternatives: [],
      },
    ]);
  };

  const removeTechItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateTechItem = (index: number, updated: Partial<TechItem>) => {
    onChange(
      value.map((t, i) => {
        if (i === index) {
          const item = { ...t, ...updated };
          if (updated.rationale) {
            item.rationale = {
              en: updated.rationale.en !== undefined ? updated.rationale.en : (t.rationale?.en ?? ""),
              id: updated.rationale.id !== undefined ? updated.rationale.id : (t.rationale?.id ?? ""),
            };
          }
          return item;
        }
        return t;
      })
    );
  };

  const moveTechItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= value.length) return;
    const next = [...value];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    onChange(next);
  };

  const addAlternative = (techIndex: number) => {
    const item = value[techIndex];
    const alternatives = [...(item.alternatives ?? []), { name: "", reasonNotChosen: { en: "", id: "" } }];
    updateTechItem(techIndex, { alternatives });
  };

  const removeAlternative = (techIndex: number, altIndex: number) => {
    const item = value[techIndex];
    const alternatives = item.alternatives.filter((_, i) => i !== altIndex);
    updateTechItem(techIndex, { alternatives });
  };

  const updateAlternative = (techIndex: number, altIndex: number, updated: Partial<TechAlternative>) => {
    const item = value[techIndex];
    const alternatives = item.alternatives.map((alt, i) => {
      if (i === altIndex) {
        const nextAlt = { ...alt, ...updated };
        if (updated.reasonNotChosen) {
          nextAlt.reasonNotChosen = {
            en: updated.reasonNotChosen.en !== undefined ? updated.reasonNotChosen.en : alt.reasonNotChosen.en,
            id: updated.reasonNotChosen.id !== undefined ? updated.reasonNotChosen.id : alt.reasonNotChosen.id,
          };
        }
        return nextAlt;
      }
      return alt;
    });
    updateTechItem(techIndex, { alternatives });
  };

  return (
    <div className="grid gap-4 border border-zinc-800 p-4 bg-zinc-950/20">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-teal-200">Tech Stack</h3>
        <button
          type="button"
          onClick={addTechItem}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-teal-200/30 text-teal-200 bg-teal-400/5 hover:border-teal-200 transition cursor-pointer"
        >
          <Plus size={14} /> Add Tech Item
        </button>
      </div>

      {value.length === 0 ? (
        <p className="text-zinc-500 text-xs italic">No tech items defined yet.</p>
      ) : (
        <div className="grid gap-4">
          {value.map((tech, techIndex) => (
            <div key={techIndex} className="grid gap-3 border border-zinc-800/80 p-3 bg-zinc-900/10">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400 font-mono">Tech Item #{techIndex + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={techIndex === 0}
                    onClick={() => moveTechItem(techIndex, "up")}
                    className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={techIndex === value.length - 1}
                    onClick={() => moveTechItem(techIndex, "down")}
                    className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTechItem(techIndex)}
                    className="p-1 text-red-400 hover:text-red-300 ml-1 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Name
                  <input
                    value={tech.name}
                    onChange={(e) => updateTechItem(techIndex, { name: e.target.value })}
                    className="admin-input py-1 text-xs"
                    placeholder="Redis"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Category
                  <select
                    value={tech.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (isTechCategory(val)) {
                        updateTechItem(techIndex, { category: val });
                      }
                    }}
                    className="admin-input py-1 text-xs"
                  >
                    {techCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Version (Optional)
                  <input
                    value={tech.version ?? ""}
                    onChange={(e) => updateTechItem(techIndex, { version: e.target.value })}
                    className="admin-input py-1 text-xs"
                    placeholder="7.2"
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Rationale (English) - Optional
                  <textarea
                    value={tech.rationale?.en ?? ""}
                    onChange={(e) =>
                      updateTechItem(techIndex, {
                        rationale: { en: e.target.value, id: tech.rationale?.id ?? "" },
                      })
                    }
                    className="admin-input py-1 text-xs"
                    rows={2}
                    placeholder="Used for optimistic locking session states"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Rationale (Indonesian) - Optional
                  <textarea
                    value={tech.rationale?.id ?? ""}
                    onChange={(e) =>
                      updateTechItem(techIndex, {
                        rationale: { en: tech.rationale?.en ?? "", id: e.target.value },
                      })
                    }
                    className="admin-input py-1 text-xs"
                    rows={2}
                    placeholder="Digunakan untuk optimistic locking pada status sesi"
                  />
                </label>
              </div>

              {/* Alternatives List */}
              <div className="border border-zinc-800/60 p-2.5 mt-2 bg-zinc-950/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-semibold text-teal-200/80 tracking-wider uppercase">
                    Alternatives Not Chosen
                  </span>
                  <button
                    type="button"
                    onClick={() => addAlternative(techIndex)}
                    className="flex items-center gap-0.5 text-[10px] px-2 py-1 border border-teal-200/20 text-teal-200 hover:border-teal-200/50 bg-teal-400/5 transition cursor-pointer"
                  >
                    <Plus size={10} /> Add Alternative
                  </button>
                </div>

                {(!tech.alternatives || tech.alternatives.length === 0) ? (
                  <p className="text-zinc-600 text-[10px] italic">No alternatives defined.</p>
                ) : (
                  <div className="grid gap-2">
                    {tech.alternatives.map((alt, altIndex) => (
                      <div key={altIndex} className="grid gap-2 border border-zinc-800/40 p-2 bg-zinc-900/5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-zinc-500 font-mono">Alt #{altIndex + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeAlternative(techIndex, altIndex)}
                            className="text-red-400 hover:text-red-300 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        <div className="grid gap-2">
                          <label className="grid gap-1 text-[10px] text-zinc-300">
                            Alternative Name
                            <input
                              value={alt.name}
                              onChange={(e) => updateAlternative(techIndex, altIndex, { name: e.target.value })}
                              className="admin-input py-0.5 text-[11px]"
                              placeholder="Memcached"
                            />
                          </label>
                          <div className="grid gap-2 md:grid-cols-2">
                            <label className="grid gap-1 text-[10px] text-zinc-300">
                              Reason Not Chosen (English)
                              <input
                                value={alt.reasonNotChosen.en}
                                onChange={(e) =>
                                  updateAlternative(techIndex, altIndex, {
                                    reasonNotChosen: { ...alt.reasonNotChosen, en: e.target.value },
                                  })
                                }
                                className="admin-input py-0.5 text-[11px]"
                                placeholder="Lacks support for complex locking operations"
                              />
                            </label>
                            <label className="grid gap-1 text-[10px] text-zinc-300">
                              Reason Not Chosen (Indonesian)
                              <input
                                value={alt.reasonNotChosen.id}
                                onChange={(e) =>
                                  updateAlternative(techIndex, altIndex, {
                                    reasonNotChosen: { ...alt.reasonNotChosen, id: e.target.value },
                                  })
                                }
                                className="admin-input py-0.5 text-[11px]"
                                placeholder="Kurang mendukung operasi penguncian kompleks"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface SectionsEditorProps {
  value: CaseStudySection[];
  onChange: (val: CaseStudySection[]) => void;
}

export function SectionsEditor({ value, onChange }: SectionsEditorProps) {
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(0);

  const addSection = () => {
    const nextOrder = value.length > 0 ? Math.max(...value.map((s) => s.order)) + 1 : 0;
    const newSection: CaseStudySection = {
      type: "problem",
      title: { en: "", id: "" },
      content: { en: "<p></p>", id: "<p></p>" },
      order: nextOrder,
      diagram: { svgData: "", interactive: false },
    };
    onChange([...value, newSection]);
    setOpenSectionIndex(value.length);
  };

  const removeSection = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    if (openSectionIndex === index) {
      setOpenSectionIndex(null);
    } else if (openSectionIndex !== null && openSectionIndex > index) {
      setOpenSectionIndex(openSectionIndex - 1);
    }
  };

  const updateSection = (index: number, updated: Partial<CaseStudySection>) => {
    onChange(
      value.map((s, i) => {
        if (i === index) {
          const item = { ...s, ...updated };
          if (updated.title) {
            item.title = {
              en: updated.title.en !== undefined ? updated.title.en : s.title.en,
              id: updated.title.id !== undefined ? updated.title.id : s.title.id,
            };
          }
          if (updated.content) {
            item.content = {
              en: updated.content.en !== undefined ? updated.content.en : s.content.en,
              id: updated.content.id !== undefined ? updated.content.id : s.content.id,
            };
          }
          if (updated.diagram) {
            item.diagram = {
              svgData: s.diagram?.svgData ?? "",
              interactive: s.diagram?.interactive ?? false,
              ...updated.diagram,
            };
          }
          return item;
        }
        return s;
      })
    );
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= value.length) return;
    const next = [...value];

    const currentOrder = next[index].order;
    next[index].order = next[targetIndex].order;
    next[targetIndex].order = currentOrder;

    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;

    onChange(next);
    setOpenSectionIndex(targetIndex);
  };

  return (
    <div className="grid gap-4 border border-zinc-800 p-4 bg-zinc-950/20">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-teal-200">Case Study Sections</h3>
        <button
          type="button"
          onClick={addSection}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-teal-200/30 text-teal-200 bg-teal-400/5 hover:border-teal-200 transition cursor-pointer"
        >
          <Plus size={14} /> Add Section
        </button>
      </div>

      {value.length === 0 ? (
        <p className="text-zinc-500 text-xs italic">No sections defined yet.</p>
      ) : (
        <div className="grid gap-3">
          {value.map((section, index) => {
            const isOpen = openSectionIndex === index;
            return (
              <div key={index} className="border border-zinc-800 bg-zinc-900/10">
                {/* Header Banner */}
                <div
                  className="flex justify-between items-center px-3 py-2 bg-zinc-900/40 border-b border-zinc-800/60 cursor-pointer select-none"
                  onClick={() => setOpenSectionIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-teal-200 font-mono">Section #{index + 1}</span>
                    <span className="text-xs font-semibold text-white">
                      {section.title.en || "(Untitled)"}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">[{section.type}]</span>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveSection(index, "up")}
                      className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      disabled={index === value.length - 1}
                      onClick={() => moveSection(index, "down")}
                      className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="p-1 text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenSectionIndex(isOpen ? null : index)}
                      className="p-1 text-zinc-400 hover:text-zinc-200 cursor-pointer"
                    >
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="p-3 grid gap-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Section Type
                        <select
                          value={section.type}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (isSectionType(val)) {
                              updateSection(index, { type: val });
                            }
                          }}
                          className="admin-input py-1 text-xs"
                        >
                          {sectionTypes.map((t) => (
                            <option key={t} value={t}>
                              {t.replace("-", " ").toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Ordering Index
                        <input
                          type="number"
                          value={section.order}
                          onChange={(e) => updateSection(index, { order: Number(e.target.value) })}
                          className="admin-input py-1 text-xs"
                        />
                      </label>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Title (English)
                        <input
                          value={section.title.en}
                          onChange={(e) => updateSection(index, { title: { ...section.title, en: e.target.value } })}
                          className="admin-input py-1 text-xs"
                          placeholder="e.g. Architectural Overview"
                        />
                      </label>
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Title (Indonesian)
                        <input
                          value={section.title.id}
                          onChange={(e) => updateSection(index, { title: { ...section.title, id: e.target.value } })}
                          className="admin-input py-1 text-xs"
                          placeholder="e.g. Tinjauan Arsitektur"
                        />
                      </label>
                    </div>

                    <div className="grid gap-3">
                      <div className="grid gap-1 text-xs text-zinc-300">
                        Content (English)
                        <RichTextEditor
                          value={section.content.en}
                          onChange={(val) => updateSection(index, { content: { ...section.content, en: val } })}
                          placeholder="Explain this section's core technical challenge in English..."
                        />
                      </div>
                      <div className="grid gap-1 text-xs text-zinc-300 mt-2">
                        Content (Indonesian)
                        <RichTextEditor
                          value={section.content.id}
                          onChange={(val) => updateSection(index, { content: { ...section.content, id: val } })}
                          placeholder="Jelaskan tantangan teknis inti bagian ini dalam Bahasa Indonesia..."
                        />
                      </div>
                    </div>

                    <div className="border border-zinc-800/60 p-2.5 bg-zinc-950/30">
                      <span className="text-[11px] font-semibold text-teal-200/80 tracking-wider uppercase block mb-2">
                        Architecture Diagram (Optional)
                      </span>
                      <div className="grid gap-3">
                        <label className="grid gap-1.5 text-xs text-zinc-300">
                          SVG Source Code (Raw HTML/XML string)
                          <textarea
                            value={section.diagram?.svgData ?? ""}
                            onChange={(e) => updateSection(index, { diagram: { ...section.diagram, svgData: e.target.value } })}
                            className="admin-input font-mono text-xs py-1"
                            rows={3}
                            placeholder="<svg ...>...</svg>"
                          />
                        </label>
                        <label className="flex items-center gap-2 text-xs text-zinc-300">
                          <input
                            type="checkbox"
                            checked={section.diagram?.interactive ?? false}
                            onChange={(e) => updateSection(index, { diagram: { ...section.diagram, interactive: e.target.checked } })}
                            className="h-3.5 w-3.5 accent-teal-200"
                          />
                          Make Diagram Interactive (Zoom & Pan enabled)
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface AdrsEditorProps {
  value: ADR[];
  onChange: (val: ADR[]) => void;
}

export function AdrsEditor({ value, onChange }: AdrsEditorProps) {
  const [openAdrIndex, setOpenAdrIndex] = useState<number | null>(0);

  const addAdr = () => {
    const nextNumber = value.length > 0 ? Math.max(...value.map((a) => a.number)) + 1 : 1;
    const newAdr: ADR = {
      number: nextNumber,
      title: { en: "", id: "" },
      status: "proposed",
      context: { en: "", id: "" },
      decision: { en: "", id: "" },
      consequences: { en: "", id: "" },
      alternatives: [],
      date: new Date().toISOString().split("T")[0],
    };
    onChange([...value, newAdr]);
    setOpenAdrIndex(value.length);
  };

  const removeAdr = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    if (openAdrIndex === index) {
      setOpenAdrIndex(null);
    } else if (openAdrIndex !== null && openAdrIndex > index) {
      setOpenAdrIndex(openAdrIndex - 1);
    }
  };

  const updateAdr = (index: number, updated: Partial<ADR>) => {
    onChange(
      value.map((a, i) => {
        if (i === index) {
          const item = { ...a, ...updated };
          if (updated.title) {
            item.title = {
              en: updated.title.en !== undefined ? updated.title.en : a.title.en,
              id: updated.title.id !== undefined ? updated.title.id : a.title.id,
            };
          }
          if (updated.context) {
            item.context = {
              en: updated.context.en !== undefined ? updated.context.en : a.context.en,
              id: updated.context.id !== undefined ? updated.context.id : a.context.id,
            };
          }
          if (updated.decision) {
            item.decision = {
              en: updated.decision.en !== undefined ? updated.decision.en : a.decision.en,
              id: updated.decision.id !== undefined ? updated.decision.id : a.decision.id,
            };
          }
          if (updated.consequences) {
            item.consequences = {
              en: updated.consequences.en !== undefined ? updated.consequences.en : (a.consequences?.en ?? ""),
              id: updated.consequences.id !== undefined ? updated.consequences.id : (a.consequences?.id ?? ""),
            };
          }
          return item;
        }
        return a;
      })
    );
  };

  const moveAdr = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= value.length) return;
    const next = [...value];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    onChange(next);
    setOpenAdrIndex(targetIndex);
  };

  const addAlternative = (adrIndex: number) => {
    const adr = value[adrIndex];
    const alternatives = [...(adr.alternatives ?? []), { en: "", id: "" } satisfies LocalizedString];
    updateAdr(adrIndex, { alternatives });
  };

  const removeAlternative = (adrIndex: number, altIndex: number) => {
    const adr = value[adrIndex];
    const alternatives = adr.alternatives.filter((_, i) => i !== altIndex);
    updateAdr(adrIndex, { alternatives });
  };

  const updateAlternative = (adrIndex: number, altIndex: number, updated: Partial<LocalizedString>) => {
    const adr = value[adrIndex];
    const alternatives = adr.alternatives.map((alt, i) => {
      if (i === altIndex) {
        return {
          en: alt.en,
          id: alt.id,
          ...updated,
        };
      }
      return alt;
    });
    updateAdr(adrIndex, { alternatives });
  };

  return (
    <div className="grid gap-4 border border-zinc-800 p-4 bg-zinc-950/20">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-teal-200">
          Architectural Decision Records (ADRs)
        </h3>
        <button
          type="button"
          onClick={addAdr}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-teal-200/30 text-teal-200 bg-teal-400/5 hover:border-teal-200 transition cursor-pointer"
        >
          <Plus size={14} /> Add ADR
        </button>
      </div>

      {value.length === 0 ? (
        <p className="text-zinc-500 text-xs italic">No ADRs defined yet.</p>
      ) : (
        <div className="grid gap-3">
          {value.map((adr, index) => {
            const isOpen = openAdrIndex === index;
            return (
              <div key={index} className="border border-zinc-800 bg-zinc-900/10">
                {/* Header Banner */}
                <div
                  className="flex justify-between items-center px-3 py-2 bg-zinc-900/40 border-b border-zinc-800/60 cursor-pointer select-none"
                  onClick={() => setOpenAdrIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-teal-200 font-mono">ADR #{adr.number}</span>
                    <span className="text-xs font-semibold text-white">
                      {adr.title.en || "(Untitled)"}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">[{adr.status.toUpperCase()}]</span>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveAdr(index, "up")}
                      className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      disabled={index === value.length - 1}
                      onClick={() => moveAdr(index, "down")}
                      className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAdr(index)}
                      className="p-1 text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenAdrIndex(isOpen ? null : index)}
                      className="p-1 text-zinc-400 hover:text-zinc-200 cursor-pointer"
                    >
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="p-3 grid gap-3">
                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        ADR Number
                        <input
                          type="number"
                          value={adr.number}
                          onChange={(e) => updateAdr(index, { number: Number(e.target.value) })}
                          className="admin-input py-1 text-xs"
                        />
                      </label>
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Status
                        <select
                          value={adr.status}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (isAdrStatus(val)) {
                              updateAdr(index, { status: val });
                            }
                          }}
                          className="admin-input py-1 text-xs"
                        >
                          {adrStatuses.map((s) => (
                            <option key={s} value={s}>
                              {s.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Date (Optional)
                        <input
                          type="text"
                          value={adr.date ? String(adr.date).split("T")[0] : ""}
                          onChange={(e) => updateAdr(index, { date: e.target.value })}
                          className="admin-input py-1 text-xs font-mono"
                          placeholder="YYYY-MM-DD"
                        />
                      </label>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        ADR Title (English)
                        <input
                          value={adr.title.en}
                          onChange={(e) => updateAdr(index, { title: { ...adr.title, en: e.target.value } })}
                          className="admin-input py-1 text-xs"
                          placeholder="e.g. Choose Redis over Memcached for Locking"
                        />
                      </label>
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        ADR Title (Indonesian)
                        <input
                          value={adr.title.id}
                          onChange={(e) => updateAdr(index, { title: { ...adr.title, id: e.target.value } })}
                          className="admin-input py-1 text-xs"
                          placeholder="e.g. Pilih Redis dibanding Memcached untuk Locking"
                        />
                      </label>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Context (English)
                        <textarea
                          value={adr.context.en}
                          onChange={(e) => updateAdr(index, { context: { ...adr.context, en: e.target.value } })}
                          className="admin-input py-1 text-xs"
                          rows={3}
                          placeholder="State the technical context in English..."
                        />
                      </label>
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Context (Indonesian)
                        <textarea
                          value={adr.context.id}
                          onChange={(e) => updateAdr(index, { context: { ...adr.context, id: e.target.value } })}
                          className="admin-input py-1 text-xs"
                          rows={3}
                          placeholder="Jelaskan konteks teknis dalam Bahasa Indonesia..."
                        />
                      </label>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Decision (English)
                        <textarea
                          value={adr.decision.en}
                          onChange={(e) => updateAdr(index, { decision: { ...adr.decision, en: e.target.value } })}
                          className="admin-input py-1 text-xs"
                          rows={3}
                          placeholder="State the decision made in English..."
                        />
                      </label>
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Decision (Indonesian)
                        <textarea
                          value={adr.decision.id}
                          onChange={(e) => updateAdr(index, { decision: { ...adr.decision, id: e.target.value } })}
                          className="admin-input py-1 text-xs"
                          rows={3}
                          placeholder="Jelaskan keputusan yang diambil dalam Bahasa Indonesia..."
                        />
                      </label>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Consequences (English) - Optional
                        <textarea
                          value={adr.consequences?.en ?? ""}
                          onChange={(e) => updateAdr(index, { consequences: { en: e.target.value, id: adr.consequences?.id ?? "" } })}
                          className="admin-input py-1 text-xs"
                          rows={3}
                          placeholder="State the consequences in English..."
                        />
                      </label>
                      <label className="grid gap-1.5 text-xs text-zinc-300">
                        Consequences (Indonesian) - Optional
                        <textarea
                          value={adr.consequences?.id ?? ""}
                          onChange={(e) => updateAdr(index, { consequences: { en: adr.consequences?.en ?? "", id: e.target.value } })}
                          className="admin-input py-1 text-xs"
                          rows={3}
                          placeholder="Jelaskan konsekuensi dalam Bahasa Indonesia..."
                        />
                      </label>
                    </div>

                    {/* ADR Alternatives list */}
                    <div className="border border-zinc-800/60 p-2.5 bg-zinc-950/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-semibold text-teal-200/80 tracking-wider uppercase">
                          Alternatives Considered
                        </span>
                        <button
                          type="button"
                          onClick={() => addAlternative(index)}
                          className="flex items-center gap-0.5 text-[10px] px-2 py-1 border border-teal-200/20 text-teal-200 hover:border-teal-200/50 bg-teal-400/5 transition cursor-pointer"
                        >
                          <Plus size={10} /> Add Alternative
                        </button>
                      </div>

                      {(!adr.alternatives || adr.alternatives.length === 0) ? (
                        <p className="text-zinc-600 text-[10px] italic">No alternatives listed.</p>
                      ) : (
                        <div className="grid gap-2">
                          {adr.alternatives.map((alt, altIndex) => (
                            <div key={altIndex} className="grid gap-2 border border-zinc-800/40 p-2 bg-zinc-900/5">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] text-zinc-500 font-mono">Alternative #{altIndex + 1}</span>
                                <button
                                  type="button"
                                  onClick={() => removeAlternative(index, altIndex)}
                                  className="text-red-400 hover:text-red-300 cursor-pointer"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>

                              <div className="grid gap-2 md:grid-cols-2">
                                <label className="grid gap-1 text-[10px] text-zinc-300">
                                  Alternative (English)
                                  <input
                                    value={alt.en}
                                    onChange={(e) => updateAlternative(index, altIndex, { en: e.target.value })}
                                    className="admin-input py-0.5 text-[11px]"
                                    placeholder="Alternative technical approach in English..."
                                  />
                                </label>
                                <label className="grid gap-1 text-[10px] text-zinc-300">
                                  Alternative (Indonesian)
                                  <input
                                    value={alt.id}
                                    onChange={(e) => updateAlternative(index, altIndex, { id: e.target.value })}
                                    className="admin-input py-0.5 text-[11px]"
                                    placeholder="Pendekatan teknis alternatif dalam Bahasa Indonesia..."
                                  />
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
