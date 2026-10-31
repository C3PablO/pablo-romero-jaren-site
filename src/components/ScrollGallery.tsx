import {
  KeyboardEvent,
  PointerEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

type IScrollGalleryProps = {
  items: { key: string; node: ReactNode }[];
  itemClassName?: string;
  prevLabel?: string;
  nextLabel?: string;
};

type IMetrics = {
  scrollable: boolean;
  progress: number; // 0..1 scroll position
  atStart: boolean;
  atEnd: boolean;
};

const initialMetrics: IMetrics = {
  scrollable: false,
  progress: 0,
  atStart: true,
  atEnd: true,
};

// Wavy progress geometry (px)
const WAVE_LENGTH = 24;
const AMPLITUDE = 3;
const HEIGHT = 12;
const STROKE = 4;
const GAP = 8; // space between the wave and the remaining track
const MIN_ACTIVE = 24;

const wavePath = (from: number, to: number) => {
  const mid = HEIGHT / 2;
  let d = `M${from} ${mid}`;
  for (let x = from + 1; x < to; x += 1) {
    const y =
      mid - AMPLITUDE * Math.sin(((x - from) / WAVE_LENGTH) * 2 * Math.PI);
    d += ` L${x} ${y.toFixed(2)}`;
  }
  const endY =
    mid - AMPLITUDE * Math.sin(((to - from) / WAVE_LENGTH) * 2 * Math.PI);
  return `${d} L${to} ${endY.toFixed(2)}`;
};

const Chevron = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

/**
 * Horizontal gallery with the native scrollbar hidden and a Material-style
 * wavy progress indicator: the wave fills according to the scroll position;
 * clicking or dragging along it scrolls to the matching point.
 */
const ScrollGallery = ({
  items,
  itemClassName = 'w-72 shrink-0 md:w-96 lg:w-[28rem]',
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: IScrollGalleryProps) => {
  const id = useId();
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const press = useRef<{ x: number; dragging: boolean } | null>(null);
  const [m, setM] = useState<IMetrics>(initialMetrics);
  const [trackW, setTrackW] = useState(0);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 1) {
      setM(initialMetrics);
      return;
    }
    setM({
      scrollable: true,
      progress: Math.min(Math.max(el.scrollLeft / max, 0), 1),
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft >= max - 1,
    });
  }, []);

  useEffect(() => {
    update();
    const el = scroller.current;
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            update();
            if (track.current) setTrackW(track.current.clientWidth);
          })
        : null;
    if (el && observer) observer.observe(el);
    if (track.current && observer) observer.observe(track.current);
    window.addEventListener('resize', update);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [update, items.length, m.scrollable]);

  const step = () => {
    const el = scroller.current;
    if (!el || el.children.length < 2) return el?.clientWidth ?? 0;
    const [a, b] = Array.from(el.children) as HTMLElement[];
    return b.offsetLeft - a.offsetLeft;
  };

  const scrollByStep = (direction: -1 | 1) =>
    scroller.current?.scrollBy({
      left: direction * step(),
      behavior: 'smooth',
    });

  const scrollToTrackX = (clientX: number, smooth: boolean) => {
    const el = scroller.current;
    const t = track.current;
    if (!el || !t) return;
    const rect = t.getBoundingClientRect();
    // The wave is never shorter than MIN_ACTIVE, so the pointer maps to the
    // wave's end: the first MIN_ACTIVE px mean "start", the last px "end".
    const ratio = Math.min(
      Math.max(
        (clientX - rect.left - MIN_ACTIVE) /
          Math.max(rect.width - MIN_ACTIVE, 1),
        0,
      ),
      1,
    );
    el.scrollTo({
      left: ratio * (el.scrollWidth - el.clientWidth),
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  // A press is a click (smooth scroll on release) unless the pointer moves
  // more than a few px, in which case it becomes a drag (instant scrubbing).
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    press.current = { x: e.clientX, dragging: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const p = press.current;
    if (!p) return;
    if (!p.dragging && Math.abs(e.clientX - p.x) > 4) p.dragging = true;
    if (p.dragging) scrollToTrackX(e.clientX, false);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const p = press.current;
    press.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (p && !p.dragging && e.type === 'pointerup') {
      scrollToTrackX(e.clientX, true);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') scrollByStep(-1);
    else if (e.key === 'ArrowRight') scrollByStep(1);
    else if (e.key === 'Home')
      scroller.current?.scrollTo({ left: 0, behavior: 'smooth' });
    else if (e.key === 'End')
      scroller.current?.scrollTo({
        left: scroller.current.scrollWidth,
        behavior: 'smooth',
      });
    else return;
    e.preventDefault();
  };

  const arrow =
    'p-2 text-indigo-900 transition-opacity disabled:opacity-25 disabled:cursor-default cursor-pointer';

  const mid = HEIGHT / 2;
  const activeW = MIN_ACTIVE + m.progress * Math.max(trackW - MIN_ACTIVE, 0);
  const trackStart = activeW + GAP;
  const showTrack = trackW - trackStart > STROKE;

  return (
    <div>
      <div
        ref={scroller}
        id={id}
        onScroll={update}
        // While a card is hovered the others shrink to 95%.
        // Vertical padding (cancelled by negative margins) leaves room for the
        // scaled/tilted hovered card, which the scroll container would clip.
        className="no-scrollbar motion-safe:[@media(hover:hover)]:[&:has(>div:hover)>div:not(:hover)]:scale-95 -mt-12 -mb-6 flex gap-5 overflow-x-auto px-3 pt-12 pb-12 md:px-8"
      >
        {items.map((item) => (
          <div
            key={item.key}
            className={`${itemClassName} relative transition-transform duration-300 ease-out motion-safe:hover:z-20 motion-safe:hover:-rotate-5 motion-safe:hover:scale-105`}
          >
            {item.node}
          </div>
        ))}
      </div>
      {m.scrollable && (
        <div className="flex items-center justify-center gap-4 px-3 md:px-8 pb-4">
          <button
            type="button"
            className={arrow}
            aria-label={prevLabel}
            disabled={m.atStart}
            onClick={() => scrollByStep(-1)}
          >
            <Chevron direction="left" />
          </button>
          <div
            ref={track}
            role="scrollbar"
            aria-orientation="horizontal"
            aria-controls={id}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(m.progress * 100)}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative h-8 w-full max-w-xs cursor-pointer touch-none select-none rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
          >
            {trackW > 0 && (
              <svg
                width={trackW}
                height={HEIGHT}
                viewBox={`0 0 ${trackW} ${HEIGHT}`}
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 overflow-visible"
                aria-hidden="true"
              >
                {showTrack && (
                  <>
                    <line
                      x1={trackStart}
                      y1={mid}
                      x2={trackW - STROKE / 2}
                      y2={mid}
                      stroke="var(--color-indigo-200)"
                      strokeWidth={STROKE}
                      strokeLinecap="round"
                    />
                    <circle
                      cx={trackW - STROKE / 2}
                      cy={mid}
                      r={STROKE / 2 - 0.5}
                      fill="var(--color-indigo-900)"
                    />
                  </>
                )}
                <path
                  d={wavePath(
                    STROKE / 2,
                    Math.max(activeW - STROKE / 2, STROKE / 2 + 1),
                  )}
                  fill="none"
                  stroke="var(--color-indigo-900)"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <button
            type="button"
            className={arrow}
            aria-label={nextLabel}
            disabled={m.atEnd}
            onClick={() => scrollByStep(1)}
          >
            <Chevron direction="right" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollGallery;
