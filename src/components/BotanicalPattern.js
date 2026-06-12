/**
 * BotanicalPattern
 * A reusable decorative SVG overlay with Mughal-inspired floral motifs.
 *
 * Props:
 *   opacity   – overall opacity of the pattern layer (default 0.13)
 *   color     – fill color of the pattern (default "currentColor")
 *   id        – unique id suffix to prevent pattern conflicts on same page
 */
export default function BotanicalPattern({ opacity = 0.13, color = "currentColor", id = "a" }) {
  const patternId = `bp-tile-${id}`;

  // 8 small flower positions within the tile
  const smallFlowers = [
    [225, 60], [75, 60], [225, 190], [75, 190],
    [150, 20], [150, 230], [20, 125], [280, 125],
  ];

  // Decorative dots
  const dots = [
    [75,125],[225,125],[150,62],[150,188],
    [37,62],[263,62],[37,188],[263,188],
  ];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
        overflow: "hidden",
      }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 500"
    >
      <defs>
        <pattern id={patternId} x="0" y="0" width="300" height="250" patternUnits="userSpaceOnUse">

          {/* ── Central large bloom ── */}
          <g transform="translate(150,125)" fill={color}>
            <ellipse cx="0" cy="-48" rx="9" ry="28" opacity="0.9"/>
            <ellipse cx="0" cy="-48" rx="9" ry="28" transform="rotate(45)"  opacity="0.9"/>
            <ellipse cx="0" cy="-48" rx="9" ry="28" transform="rotate(90)"  opacity="0.9"/>
            <ellipse cx="0" cy="-48" rx="9" ry="28" transform="rotate(135)" opacity="0.9"/>
            <ellipse cx="0" cy="-48" rx="9" ry="28" transform="rotate(180)" opacity="0.9"/>
            <ellipse cx="0" cy="-48" rx="9" ry="28" transform="rotate(225)" opacity="0.9"/>
            <ellipse cx="0" cy="-48" rx="9" ry="28" transform="rotate(270)" opacity="0.9"/>
            <ellipse cx="0" cy="-48" rx="9" ry="28" transform="rotate(315)" opacity="0.9"/>
            <ellipse cx="0" cy="-28" rx="6" ry="18" transform="rotate(22.5)"  opacity="0.7"/>
            <ellipse cx="0" cy="-28" rx="6" ry="18" transform="rotate(67.5)"  opacity="0.7"/>
            <ellipse cx="0" cy="-28" rx="6" ry="18" transform="rotate(112.5)" opacity="0.7"/>
            <ellipse cx="0" cy="-28" rx="6" ry="18" transform="rotate(157.5)" opacity="0.7"/>
            <ellipse cx="0" cy="-28" rx="6" ry="18" transform="rotate(202.5)" opacity="0.7"/>
            <ellipse cx="0" cy="-28" rx="6" ry="18" transform="rotate(247.5)" opacity="0.7"/>
            <ellipse cx="0" cy="-28" rx="6" ry="18" transform="rotate(292.5)" opacity="0.7"/>
            <ellipse cx="0" cy="-28" rx="6" ry="18" transform="rotate(337.5)" opacity="0.7"/>
            <circle cx="0" cy="0" r="10" opacity="0.9"/>
            <circle cx="0" cy="0" r="5"  opacity="0.5"/>
          </g>

          {/* ── Corner quarter-blooms ── */}
          <g transform="translate(0,0)" fill={color} opacity="0.7">
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(45)"  />
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(90)"  />
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(135)" />
            <circle  cx="0" cy="0"  r="7"/>
          </g>
          <g transform="translate(300,0)" fill={color} opacity="0.7">
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(225)" />
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(270)" />
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(315)" />
            <circle  cx="0" cy="0"  r="7"/>
          </g>
          <g transform="translate(0,250)" fill={color} opacity="0.7">
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(315)" />
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(0)"   />
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(45)"  />
            <circle  cx="0" cy="0"  r="7"/>
          </g>
          <g transform="translate(300,250)" fill={color} opacity="0.7">
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(135)" />
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(180)" />
            <ellipse cx="0" cy="-36" rx="7" ry="22" transform="rotate(225)" />
            <circle  cx="0" cy="0"  r="7"/>
          </g>

          {/* ── Vine stems ── */}
          <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" transform="translate(150,125)">
            <path d="M0,-15 Q20,-50 55,-70 Q70,-80 80,-70"/>
            <path d="M0,-15 Q-20,-50 -55,-70 Q-70,-80 -80,-70"/>
            <path d="M0,15 Q20,50 55,70 Q70,80 80,70"/>
            <path d="M0,15 Q-20,50 -55,70 Q-70,80 -80,70"/>
            <path d="M15,0 Q50,20 70,55 Q80,70 70,80"/>
            <path d="M-15,0 Q-50,20 -70,55 Q-80,70 -70,80"/>
            <path d="M15,0 Q50,-20 70,-55 Q80,-70 70,-80"/>
            <path d="M-15,0 Q-50,-20 -70,-55 Q-80,-70 -70,-80"/>
          </g>

          {/* ── Leaf clusters ── */}
          <g fill={color} opacity="0.65">
            <ellipse cx="215" cy="75"  rx="5" ry="12" transform="rotate(-40,215,75)"/>
            <ellipse cx="220" cy="65"  rx="4" ry="9"  transform="rotate(-55,220,65)"/>
            <ellipse cx="85"  cy="75"  rx="5" ry="12" transform="rotate(40,85,75)"/>
            <ellipse cx="80"  cy="65"  rx="4" ry="9"  transform="rotate(55,80,65)"/>
            <ellipse cx="215" cy="175" rx="5" ry="12" transform="rotate(40,215,175)"/>
            <ellipse cx="220" cy="185" rx="4" ry="9"  transform="rotate(55,220,185)"/>
            <ellipse cx="85"  cy="175" rx="5" ry="12" transform="rotate(-40,85,175)"/>
            <ellipse cx="80"  cy="185" rx="4" ry="9"  transform="rotate(-55,80,185)"/>
          </g>

          {/* ── Small 4-petal accent flowers ── */}
          <g fill={color} opacity="0.8">
            {smallFlowers.map(([cx, cy], i) => (
              <g key={i} transform={`translate(${cx},${cy})`}>
                <ellipse cx="0" cy="-9" rx="3.5" ry="7"/>
                <ellipse cx="0" cy="-9" rx="3.5" ry="7" transform="rotate(90)"/>
                <ellipse cx="0" cy="-9" rx="3.5" ry="7" transform="rotate(180)"/>
                <ellipse cx="0" cy="-9" rx="3.5" ry="7" transform="rotate(270)"/>
                <circle cx="0" cy="0" r="3.5"/>
              </g>
            ))}
          </g>

          {/* ── Diamond lattice dots ── */}
          <g fill={color} opacity="0.3">
            {dots.map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.5"/>
            ))}
          </g>

          {/* ── Paisley / teardrop accents ── */}
          <g fill={color} opacity="0.45">
            <path d="M112,55 Q118,40 130,45 Q125,58 112,55 Z"/>
            <path d="M188,55 Q182,40 170,45 Q175,58 188,55 Z"/>
            <path d="M112,195 Q118,210 130,205 Q125,192 112,195 Z"/>
            <path d="M188,195 Q182,210 170,205 Q175,192 188,195 Z"/>
          </g>

        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patternId})`}/>
    </svg>
  );
}
