const NS = 'foodie-canteen';

export const store = {
  get<T>(k: string, fb: T): T {
    try {
      const v = localStorage.getItem(`${NS}:${k}`);
      return v ? (JSON.parse(v) as T) : fb;
    } catch {
      return fb;
    }
  },
  set(k: string, v: unknown) {
    try {
      localStorage.setItem(`${NS}:${k}`, JSON.stringify(v));
    } catch {}
  },
};
