export const ease = ((p1x = 0.67, p1y = 0.005, p2x = 0.27, p2y = 1) => {
  const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
  const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
  const X = (t: number) => ((ax * t + bx) * t + cx) * t;
  const dX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  const Y = (t: number) => ((ay * t + by) * t + cy) * t;

  const s = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = X(t) - x, d = dX(t);
      if (Math.abs(dx) < 1e-6) return t;
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    let a = 0, b = 1;
    while (a < b) {
      const m = (a + b) / 2, xm = X(m);
      if (Math.abs(xm - x) < 1e-6) return m;
      if (x > xm) a = m; else b = m;
      if (b - a < 1e-7) return (a + b) / 2;
    }
    return t;
  };

  return (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : Y(s(x)));
})();