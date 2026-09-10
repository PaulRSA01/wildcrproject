import type { ReactElement } from "react";
import type { SceneKey } from "@/lib/catalog";

/**
 * Layered flat-illustration backdrops, one per tour "scene". Pure inline SVG so
 * the site has zero image dependencies and renders identically offline.
 * viewBox is 800x500; the SVG is set to `slice` so it fills any container.
 */

type Stop = [offset: string, color: string];

function Sky({ id, stops }: { id: string; stops: Stop[] }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        {stops.map(([offset, color]) => (
          <stop key={offset} offset={offset} stopColor={color} />
        ))}
      </linearGradient>
    </defs>
  );
}

function Sun({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  return <circle cx={cx} cy={cy} r={r} fill={color} />;
}

/* Each scene returns the full <svg> inner content given a namespaced id prefix. */
const scenes: Record<SceneKey, (p: string) => ReactElement> = {
  hero: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#bfe3ec"], ["55%", "#e8f0d8"], ["100%", "#f5efe2"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <Sun cx={640} cy={120} r={54} color="#f6d38a" />
      <path d="M0 300 L150 210 L300 300 Z" fill="#5b9d74" opacity="0.55" />
      <path d="M220 320 L420 180 L620 320 Z" fill="#3a7f57" opacity="0.7" />
      <path d="M520 330 L700 220 L800 300 L800 330 Z" fill="#2b6444" opacity="0.75" />
      <rect y="330" width="800" height="170" fill="#245038" />
      <path d="M0 360 Q200 330 400 360 T800 360 V500 H0 Z" fill="#1f402e" />
      <g fill="#183024">
        <path d="M120 500 v-90 q0-24 18-24 t18 24 v90 Z" />
        <path d="M100 430 q40-30 56 0 q-28 10 -56 0" />
        <path d="M660 500 v-70 q0-20 15-20 t15 20 v70 Z" />
        <path d="M645 448 q30-24 44 0 q-22 8 -44 0" />
      </g>
    </>
  ),

  rainforest: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#cfe9e0"], ["100%", "#eef3df"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <Sun cx={150} cy={110} r={44} color="#f4e3a1" />
      <path d="M0 340 L200 230 L400 340 Z" fill="#5b9d74" opacity="0.6" />
      <path d="M300 350 L520 210 L740 350 Z" fill="#3a7f57" opacity="0.75" />
      <rect y="330" width="800" height="170" fill="#245038" />
      <g fill="#1f402e">
        <path d="M90 500 V360 q0-26 20-26 t20 26 V500 Z" />
        <path d="M60 380 q50-40 70 0 q-35 14 -70 0" />
        <path d="M110 340 q46-34 64 4 q-32 10 -64 -4" />
        <path d="M690 500 V380 q0-22 17-22 t17 22 V500 Z" />
        <path d="M662 396 q45-34 62 0 q-31 12 -62 0" />
      </g>
      <g stroke="#183024" strokeWidth="6" strokeLinecap="round">
        <path d="M400 330 q10 40 -6 80" fill="none" />
        <path d="M470 330 q-6 46 8 90" fill="none" />
      </g>
    </>
  ),

  canals: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#c7e6ec"], ["100%", "#eaf1de"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <Sun cx={620} cy={120} r={40} color="#f6dc9a" />
      <path d="M0 320 L260 220 L520 320 Z" fill="#3a7f57" opacity="0.7" />
      <path d="M380 330 L620 230 L800 320 V330 Z" fill="#2b6444" opacity="0.8" />
      <rect y="300" width="800" height="80" fill="#245038" />
      <rect y="360" width="800" height="140" fill="#4a86a6" />
      <path d="M0 380 Q200 360 400 380 T800 380 V500 H0 Z" fill="#3f7791" opacity="0.7" />
      <g fill="#183024">
        <path d="M60 360 V300 q0-20 15-20 t15 20 v60 Z" />
        <path d="M35 316 q40-30 56 0 q-28 10 -56 0" />
        <path d="M740 360 V310 q0-16 12-16 t12 16 v50 Z" />
      </g>
      <g fill="#1f402e" opacity="0.9">
        <ellipse cx="300" cy="430" rx="120" ry="10" />
        <path d="M240 430 q60-26 120 0 q-60 14 -120 0" />
      </g>
    </>
  ),

  reef: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#bfe6ef"], ["45%", "#7fc3d6"], ["100%", "#2f7f9e"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <g opacity="0.25" stroke="#ffffff" strokeWidth="10" strokeLinecap="round">
        <path d="M120 60 l40 90" />
        <path d="M320 30 l30 120" />
        <path d="M560 70 l50 80" />
      </g>
      <path d="M0 380 Q200 340 400 380 T800 380 V500 H0 Z" fill="#1f6076" />
      <g fill="#e07a2f">
        <path d="M140 460 q-10-50 12-70 q6 40 26 44 q-4 30 -38 26" />
        <path d="M180 470 q10-40 34-44 q-6 30 8 46 Z" />
      </g>
      <g fill="#c2611e">
        <path d="M600 468 q-8-46 14-64 q4 34 22 40 q-4 28 -36 24" />
      </g>
      <g fill="#f5efe2" opacity="0.9">
        <circle cx="420" cy="250" r="10" />
        <path d="M430 250 l26 -10 v20 Z" />
        <circle cx="470" cy="320" r="7" />
        <path d="M477 320 l20 -8 v16 Z" />
      </g>
    </>
  ),

  cacao: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#d8ead2"], ["100%", "#f1ecd6"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <Sun cx={160} cy={110} r={40} color="#f3e2a0" />
      <path d="M0 330 L240 220 L480 330 Z" fill="#3a7f57" opacity="0.7" />
      <rect y="320" width="800" height="180" fill="#2b6444" />
      <path d="M0 360 Q200 335 400 360 T800 360 V500 H0 Z" fill="#245038" />
      <g fill="#5b3a1e">
        <path d="M250 500 V330 q0-14 10-14 t10 14 V500 Z" />
        <path d="M540 500 V340 q0-12 9-12 t9 12 V500 Z" />
      </g>
      <g fill="#8a4b22">
        <ellipse cx="235" cy="360" rx="16" ry="30" transform="rotate(-18 235 360)" />
        <ellipse cx="286" cy="392" rx="16" ry="30" transform="rotate(14 286 392)" />
        <ellipse cx="524" cy="372" rx="14" ry="26" transform="rotate(-16 524 372)" />
        <ellipse cx="566" cy="400" rx="14" ry="26" transform="rotate(12 566 400)" />
      </g>
      <g fill="#1f402e">
        <path d="M235 340 q40-30 70 4 q-40 12 -70 -4" />
        <path d="M520 350 q34-26 60 4 q-34 10 -60 -4" />
      </g>
    </>
  ),

  wildlife: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#cfe8de"], ["100%", "#eef2dd"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <path d="M0 340 L220 240 L440 340 Z" fill="#3a7f57" opacity="0.65" />
      <path d="M340 350 L600 230 L800 340 V350 Z" fill="#2b6444" opacity="0.8" />
      <rect y="330" width="800" height="170" fill="#245038" />
      <path d="M0 366 Q200 342 400 366 T800 366 V500 H0 Z" fill="#1f402e" />
      {/* macaw */}
      <g>
        <path d="M360 300 q-16 60 8 120 q26 -6 30 -40 q-6 -50 -22 -80 Z" fill="#e07a2f" />
        <path d="M372 320 q26 20 22 70 q-20 6 -30 -10 q0 -40 8 -60Z" fill="#3a7f57" />
        <circle cx="356" cy="292" r="12" fill="#c2611e" />
        <path d="M346 292 q-14 4 -16 14 q10 6 18 -2Z" fill="#16241d" />
      </g>
      <g stroke="#16241d" strokeWidth="7" strokeLinecap="round">
        <path d="M300 300 h180" />
      </g>
    </>
  ),

  pacific: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#ffe6c2"], ["45%", "#f4c78d"], ["100%", "#e79a63"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <Sun cx={400} cy={210} r={70} color="#ffd79a" />
      <path d="M0 320 L220 240 L440 320 Z" fill="#2b6444" opacity="0.55" />
      <path d="M320 330 L560 250 L800 320 V330 Z" fill="#245038" opacity="0.7" />
      <rect y="330" width="800" height="170" fill="#2f7f9e" />
      <g stroke="#e8f4f7" strokeWidth="4" opacity="0.6" fill="none">
        <path d="M0 380 q100 -14 200 0 t200 0 200 0 200 0" />
        <path d="M0 420 q100 -14 200 0 t200 0 200 0 200 0" />
      </g>
      <g fill="#16241d">
        <path d="M120 500 v-70 q0-16 12-16 t12 16 v70 Z" />
        <path d="M96 452 q40-34 60 0 q-30 12 -60 0" />
        <path d="M112 424 q30-30 48 4 q-30 8 -48 -4" />
      </g>
    </>
  ),

  crocodile: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#cfe3e6"], ["100%", "#e9efdc"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <path d="M0 300 L240 210 L480 300 Z" fill="#3a7f57" opacity="0.6" />
      <rect y="290" width="800" height="60" fill="#245038" />
      <rect y="340" width="800" height="160" fill="#5c7d5a" />
      <path d="M0 360 Q200 342 400 360 T800 360 V500 H0 Z" fill="#4c6b4b" opacity="0.8" />
      {/* croc silhouette on the water */}
      <g fill="#1f402e">
        <path d="M180 420 q120-16 240 0 q30 4 60 -6 q-16 22 -60 22 q-140 12 -240 -16Z" />
        <path d="M410 414 l40 -10 l6 12 l-30 6Z" />
        <circle cx="250" cy="410" r="6" />
      </g>
      <g stroke="#16241d" strokeWidth="4" fill="none" opacity="0.7">
        <path d="M180 430 q120 14 260 0" />
      </g>
    </>
  ),

  atv: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#dfeccf"], ["100%", "#f1ead2"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <Sun cx={640} cy={110} r={40} color="#f2df9c" />
      <path d="M0 320 L220 220 L440 320 Z" fill="#3a7f57" opacity="0.6" />
      <path d="M320 330 L580 220 L800 330 V340 Z" fill="#2b6444" opacity="0.75" />
      <rect y="330" width="800" height="170" fill="#8a6a3e" />
      <path d="M0 360 Q220 336 440 360 T800 356 V500 H0 Z" fill="#6f5330" />
      <path d="M0 430 Q200 400 400 430 T800 430" stroke="#5a4327" strokeWidth="16" fill="none" />
      {/* quad */}
      <g fill="#16241d">
        <circle cx="320" cy="426" r="26" />
        <circle cx="430" cy="426" r="26" />
        <rect x="312" y="384" width="130" height="26" rx="8" />
        <path d="M320 384 l24 -22 h40 l16 22Z" fill="#e07a2f" />
      </g>
    </>
  ),

  city: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#dfeaef"], ["100%", "#f2ecdd"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <path d="M0 330 L200 250 L400 330 Z" fill="#3a7f57" opacity="0.4" />
      <g fill="#c8b48c">
        <rect x="80" y="250" width="90" height="250" />
        <rect x="200" y="200" width="120" height="300" />
        <rect x="350" y="270" width="80" height="230" />
        <rect x="470" y="180" width="140" height="320" />
        <rect x="650" y="240" width="90" height="260" />
      </g>
      <g fill="#8a7a55">
        <rect x="200" y="160" width="120" height="44" />
        <path d="M200 160 l60 -34 l60 34 Z" />
        <rect x="470" y="150" width="140" height="34" />
      </g>
      <g fill="#f5efe2" opacity="0.85">
        <rect x="100" y="270" width="14" height="20" />
        <rect x="132" y="270" width="14" height="20" />
        <rect x="228" y="230" width="16" height="22" />
        <rect x="264" y="230" width="16" height="22" />
        <rect x="300" y="230" width="16" height="22" />
        <rect x="502" y="210" width="18" height="24" />
        <rect x="540" y="210" width="18" height="24" />
        <rect x="578" y="210" width="18" height="24" />
      </g>
      <rect y="470" width="800" height="30" fill="#6f6249" />
    </>
  ),

  coffee: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#e7ddca"], ["100%", "#f3ead6"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <g fill="#3a7f57" opacity="0.5">
        <path d="M0 300 L200 220 L400 300 Z" />
        <path d="M300 310 L520 210 L740 310 Z" />
      </g>
      {/* cup */}
      <g>
        <path d="M300 250 h190 v70 a95 60 0 0 1 -190 0 Z" fill="#f5efe2" />
        <path d="M300 250 h190 v18 a95 30 0 0 1 -190 0 Z" fill="#6f4322" />
        <path d="M490 262 a44 44 0 0 1 0 70" stroke="#f5efe2" strokeWidth="16" fill="none" />
        <ellipse cx="395" cy="340" rx="120" ry="26" fill="#2b6444" opacity="0.15" />
      </g>
      <g stroke="#8a7a55" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M360 220 q-10 -26 6 -46" />
        <path d="M400 214 q-8 -24 6 -44" />
        <path d="M440 220 q-10 -26 6 -46" />
      </g>
    </>
  ),

  theatre: (p) => (
    <>
      <Sky id={`${p}-sky`} stops={[["0%", "#e6ddcc"], ["100%", "#f3ecd9"]]} />
      <rect width="800" height="500" fill={`url(#${p}-sky)`} />
      <g fill="#cdbb95">
        <rect x="220" y="150" width="360" height="300" />
        <path d="M210 150 h380 l-30 -46 h-320 Z" />
      </g>
      <g fill="#b6a074">
        <rect x="250" y="200" width="24" height="250" />
        <rect x="320" y="200" width="24" height="250" />
        <rect x="390" y="200" width="24" height="250" />
        <rect x="460" y="200" width="24" height="250" />
        <rect x="530" y="200" width="24" height="250" />
      </g>
      <g fill="#8a7a55">
        <circle cx="300" cy="120" r="10" />
        <circle cx="400" cy="112" r="10" />
        <circle cx="500" cy="120" r="10" />
      </g>
      <rect x="360" y="330" width="80" height="120" fill="#6f4322" />
      <rect y="450" width="800" height="50" fill="#6f6249" />
    </>
  ),
};

export function TourArt({
  scene,
  className = "",
}: {
  scene: SceneKey;
  className?: string;
}) {
  const render = scenes[scene] ?? scenes.rainforest;
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden
      className={className}
    >
      {render(scene)}
    </svg>
  );
}
