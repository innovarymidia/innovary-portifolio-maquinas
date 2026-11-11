/**
 * Calcula o angulo de rotacao (0 a 360 graus) conforme o scroll vertical da pagina.
 * Completa uma volta completa (360 graus) dentro da faixa de visibilidade do Hero.
 */
export function computeScrollRotationDeg(
  scrollY: number,
  rotationDistancePx = 500
): number {
  if (
    !Number.isFinite(scrollY) ||
    !Number.isFinite(rotationDistancePx) ||
    rotationDistancePx <= 0
  ) {
    return 0;
  }
  const progress = Math.min(1, Math.max(0, scrollY / rotationDistancePx));
  return Math.round(progress * 360 * 100) / 100;
}

