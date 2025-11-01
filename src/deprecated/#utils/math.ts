interface Calculus {
  riemannIntegral(f: Function, a: number, b: number, n: number): number,
  trapezoidalRule(f: Function, a: number, b: number, n: number): number,
};

export default {
  riemannIntegral(f: Function, a: number, b: number, n: number): number {
    let sum = 0;
    const h = (b - a) / n;
    for (let i = 0; i < n; i++) {
      const x = a + i * h;
      sum += f(x) * h;
    };
    return sum;
  },

  trapezoidalRule(f: Function, a: number, b: number, n: number): number {
    const h = (b - a) / n;
    let sum = 0.5 * (f(a) + f(b));
    for (let i = 0; i < n; i++) {
      sum += f(a + i * h);
    };
    return sum * h;
  },
} as Calculus;