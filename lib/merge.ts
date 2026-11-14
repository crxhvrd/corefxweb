/** Deep-merge a translation over the English source: anything missing stays English. */
export function mergeText<T>(base: T, over: unknown): T {
    if (over === undefined || over === null) return base;
    if (Array.isArray(base)) {
        return (Array.isArray(over) && over.length ? over : base) as T;
    }
    if (typeof base === 'object' && base !== null) {
        const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
        if (typeof over === 'object') {
            for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
                out[k] = k in out ? mergeText(out[k], v) : v;
            }
        }
        return out as T;
    }
    return (typeof over === typeof base && over !== '' ? over : base) as T;
}

/** Fill {name}-style placeholders. */
export function fill(template: string, values: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ''));
}
