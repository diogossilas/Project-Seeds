import { TimeSeriesPoint, MetricType } from '../types';

export interface ChartDimensions {
  width: number;
  height: number;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface ComputedPoint {
  x: number;
  y: number;
  val: number;
  phase: string;
}

/**
 * Calculates graph plot boundaries based on outer container and padding.
 */
export function getGraphInnerDimensions(dim: ChartDimensions) {
  return {
    graphWidth: dim.width - dim.padding.left - dim.padding.right,
    graphHeight: dim.height - dim.padding.top - dim.padding.bottom,
  };
}

/**
 * Maps time-series data points to SVG coordinate space with safe division protection.
 */
export function computeTimeSeriesPoints(
  data: TimeSeriesPoint[],
  activeMetric: MetricType,
  dim: ChartDimensions
): ComputedPoint[] {
  const { graphWidth, graphHeight } = getGraphInnerDimensions(dim);
  const total = data.length;
  const divisor = total > 1 ? total - 1 : 1;

  return data.map((d, i) => {
    const x = dim.padding.left + (i / divisor) * graphWidth;
    let val = d.cooperationRate;
    if (activeMetric === 'radiation') val = d.radiationLevel;
    if (activeMetric === 'biomass') val = d.bioRegeneration;
    const safeVal = Math.max(0, Math.min(100, val || 0));
    const y = dim.padding.top + graphHeight - (safeVal / 100) * graphHeight;
    return { x, y, val: safeVal, phase: d.phase };
  });
}

/**
 * Safe mathematical normalization to prevent NaN or division by zero in radial or gauge plots.
 */
export function normalizeSafeRange(val: number, minVal: number, maxVal: number): number {
  const range = maxVal > minVal ? maxVal - minVal : 1;
  const clamped = Math.max(minVal, Math.min(maxVal, val || 0));
  return (clamped - minVal) / range;
}

/**
 * Builds SVG path string for a series of 2D coordinates.
 */
export function buildLinePathString(points: ComputedPoint[]): string {
  if (points.length === 0) return '';
  return points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');
}

/**
 * Builds SVG closed polygon path string for area fill under the curve.
 */
export function buildAreaPathString(points: ComputedPoint[], dim: ChartDimensions): string {
  if (points.length === 0) return '';
  const { graphHeight } = getGraphInnerDimensions(dim);
  const baselineY = dim.padding.top + graphHeight;
  const linePath = buildLinePathString(points);
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];

  return `${linePath} L ${lastPoint.x},${baselineY} L ${firstPoint.x},${baselineY} Z`;
}

/**
 * Normalizes 0-100 value to -45 to +45 3D WebGL box coordinates.
 */
export function normalize3DCoord(val: number, range: number = 90, offset: number = 45): number {
  return (val / 100) * range - offset;
}

export const mapPercentTo3DCoordinate = normalize3DCoord;

/**
 * Formats a numeric percentage or delta string.
 */
export function formatPercentage(val: number): string {
  return `${Math.round(val)}%`;
}
