import { ReelStoryboard } from './types.js';

// Timing estimates are editable independently of the spoken script.
export function retimeStoryboard(reel: ReelStoryboard, seconds: number): Partial<ReelStoryboard> {
  const count = reel.shots.length;
  if (!count || !Number.isInteger(seconds) || seconds < count || seconds > 120) throw new Error('Invalid reel duration');
  const ranges = reel.shots.map(s => [...s.timestamp.matchAll(/(\d+):(\d{2})/g)].map(m => Number(m[1]) * 60 + Number(m[2])));
  const valid = ranges.every((r, i) => r.length === 2 && r[1] > r[0] && (i === 0 ? r[0] === 0 : r[0] === ranges[i - 1][1]));
  const total = valid ? ranges[count-1][1] : count;
  const format = (n: number) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
  let start = 0;
  const shots = reel.shots.map((shot, i) => {
    const ideal = Math.round((valid ? ranges[i][1] : i+1) * seconds / total);
    const end = i === count-1 ? seconds : Math.max(start + 1, Math.min(seconds - (count-1-i), ideal));
    const timestamp = `${format(start)} – ${format(end)}`;
    start = end;
    return { ...shot, timestamp };
  });
  return { duration: `${seconds} sec`, shots, updatedAt: new Date().toISOString() };
}
