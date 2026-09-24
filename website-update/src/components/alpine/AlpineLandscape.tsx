/* Layered SVG terrain keeps the illustration sharp and independently movable. */
const trees = [
  [35, 798, 1.5], [95, 786, 1.1], [148, 810, 1.8], [215, 837, 1.3],
  [268, 849, 1.7], [330, 864, 1.2], [383, 889, 1.8], [438, 918, 1.4],
  [1240, 866, 1.1], [1280, 837, 1.4], [1332, 798, 1.3], [1380, 755, 1.7],
  [1440, 712, 1.5], [1500, 689, 1.9], [1560, 672, 1.6],
];

const AlpineLandscape = () => (
  <div className="alpine-landscape" aria-hidden="true">
    <svg className="alpine-terrain" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs>
        <linearGradient id="alpine-sky-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="var(--alpine-sky)" /><stop offset="1" stopColor="var(--alpine-distant)" />
        </linearGradient>
        <linearGradient id="alpine-mist-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="var(--alpine-sky)" stopOpacity=".92" /><stop offset=".48" stopColor="var(--alpine-sky)" stopOpacity=".65" /><stop offset=".76" stopColor="var(--alpine-sky)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="alpine-rock-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--alpine-snow)" /><stop offset=".45" stopColor="var(--alpine-rock)" /><stop offset="1" stopColor="var(--alpine-shadow)" />
        </linearGradient>
        <symbol id="alpine-pine" viewBox="0 0 30 65">
          <path d="M14 65V43h3v22zM15 0 5 24h6L1 43h8L0 57h30L21 43h8L19 24h6z" fill="currentColor" />
        </symbol>
        <clipPath id="alpine-ridge-clip"><path d="M-100 810 120 655 250 698 365 591 462 637 570 506 645 566 758 435 830 490 930 352 1005 405 1120 175 1171 335 1235 388 1270 490 1350 523 1440 450 1550 582 1700 636V1200H-100Z" /></clipPath>
      </defs>
      <rect width="1600" height="1100" fill="url(#alpine-sky-gradient)" />
      <g className="alpine-sky-details">
        <circle cx="1320" cy="170" r="53" fill="var(--alpine-sun)" />
        <g className="alpine-stars" fill="var(--alpine-snow)">
          <circle cx="800" cy="100" r="2" /><circle cx="1040" cy="60" r="1.5" /><circle cx="1450" cy="90" r="2" /><circle cx="1240" cy="50" r="1" /><circle cx="920" cy="170" r="1.5" />
        </g>
        <g fill="none" stroke="var(--alpine-rock)" strokeWidth=".8" opacity=".22">
          <path d="M710-50C680 40 860 10 925 90S860 240 945 270 1110 166 1240 280 1470 306 1700 180" />
          <path d="M760-60C730 30 880 20 954 99S902 224 972 242 1119 146 1249 254 1460 278 1700 150" />
          <path d="M810-70C780 20 900 30 983 108S944 208 999 214 1128 126 1258 228 1450 250 1700 120" />
          <path d="M860-80C830 10 920 40 1012 117S986 192 1026 186 1137 106 1267 202 1440 222 1700 90" />
          <path d="M910-90C880 0 940 50 1041 126S1028 176 1053 158 1146 86 1276 176 1430 194 1700 60" />
        </g>
      </g>
      <g className="alpine-layer alpine-far-range">
        <path d="M-100 600 120 466 212 515 338 366 431 437 525 321 618 407 755 282 819 358 965 228 1090 408 1210 289 1311 383 1430 310 1536 400 1690 356V1200H-100Z" fill="var(--alpine-distant)" />
        <path d="m338 366-48 75 52-20 20 20 18-19 51 15-54-36zm187-45-38 61 34-13 25 27 10-22 62 33-49-50zm230-39-63 73 53-20 18 25 15-28 41 26zm210-54-60 87 51-30 29 35 18-19 43 37zm245 61-45 66 43-17 25 17 8-21 40 34z" fill="var(--alpine-snow)" opacity=".7" />
        <g fill="none" stroke="var(--alpine-snow)" strokeWidth="1" opacity=".25"><path d="M30 620q200-160 400-50t370-80 380 30 470-20" /><path d="M30 642q200-160 400-50t370-80 380 30 470-20" /><path d="M30 664q200-160 400-50t370-80 380 30 470-20" /></g>
      </g>
      <g className="alpine-layer alpine-main-range">
        <path d="M-100 810 120 655 250 698 365 591 462 637 570 506 645 566 758 435 830 490 930 352 1005 405 1120 175 1171 335 1235 388 1270 490 1350 523 1440 450 1550 582 1700 636V1200H-100Z" fill="url(#alpine-rock-gradient)" />
        <path d="m1120 175 9 278 83 118-34 124 130 267 260 78 132-404-150-54-110-132-90 73-80-33-35-102-64-53z" fill="var(--alpine-shadow)" />
        <path d="m1120 175-115 230-75-53-100 138-72-55-113 131-75-60-108 131-97-46-115 107-130-43L-100 810l340-37 140-75 118 10 125-48 78-13 133-90 88-42 84-131 45-51z" fill="var(--alpine-rock)" />
        <path d="m1120 175-61 148-40 54 50-26 22 34 18-61 20 129 22-32 35 38-28-84 13-40z" fill="var(--alpine-snow)" />
        <path d="m930 352-51 74 42-18 18 27 20-26 46-4-37-26zm-172 83-41 56 37-18 16 26 15-28 45 19zm-188 71-39 52 34-15 21 26 17-28 42 25zm870-56-44 63 47-16 23 30 15-22 69 77-47-81z" fill="var(--alpine-snow)" opacity=".75" />
        <g clipPath="url(#alpine-ridge-clip)" fill="none" stroke="var(--alpine-snow)" strokeWidth="1.1" opacity=".22">
          <path d="M550 1040C800 950 680 829 873 779S1250 812 1264 664 1144 609 1143 488 1196 449 1320 416 1500 408 1680 482" />
          <path d="M515 1025C765 935 662 808 859 755S1231 788 1244 648 1123 594 1125 475 1172 427 1310 396 1490 385 1680 452" />
          <path d="M480 1010C730 920 644 787 845 731S1212 764 1224 632 1102 579 1107 462 1148 405 1300 376 1480 362 1680 422" />
          <path d="M445 995C695 905 626 766 831 707S1193 740 1204 616 1081 564 1089 449 1124 383 1290 356 1470 339 1680 392" />
          <path d="M410 980C660 890 608 745 817 683S1174 716 1184 600 1060 549 1071 436 1100 361 1280 336 1460 316 1680 362" />
          <path d="M375 965C625 875 590 724 803 659S1155 692 1164 584 1039 534 1053 423 1076 339 1270 316 1450 293 1680 332" />
          <path d="M340 950C590 860 572 703 789 635S1136 668 1144 568 1018 519 1035 410 1052 317 1260 296 1440 270 1680 302" />
        </g>
        <g className="alpine-summit-flag"><path d="M1120 175v-36" stroke="var(--alpine-ink)" strokeWidth="2" /><path d="M1121 139h24l-7 8 7 8h-24z" fill="var(--alpine-accent)" /></g>
      </g>
      <g className="alpine-layer alpine-near-range">
        <path d="M-100 800C45 716 124 721 258 800S492 897 669 836 806 694 1001 735 1187 928 1350 785 1535 675 1700 662V1200H-100Z" fill="var(--alpine-ridge)" />
        <g fill="none" stroke="var(--alpine-snow)" strokeWidth="1" opacity=".15">
          <path d="M-90 854C68 748 146 785 276 848S521 952 710 870 841 753 1001 789 1193 976 1368 829 1541 740 1690 713" />
          <path d="M-90 879C68 773 146 810 276 873S521 977 710 895 841 778 1001 814 1193 1001 1368 854 1541 765 1690 738" />
          <path d="M-90 904C68 798 146 835 276 898S521 1002 710 920 841 803 1001 839 1193 1026 1368 879 1541 790 1690 763" />
        </g>
        <path d="M-100 825C120 776 252 836 437 912S630 930 822 959 1058 930 1235 873 1430 722 1700 666V1200H-100Z" fill="var(--alpine-forest)" />
        <g color="var(--alpine-foreground)">{trees.map(([x, y, size]) => <use key={x} href="#alpine-pine" x={x} y={y - size * 65} width={30 * size} height={65 * size} />)}</g>
        <path d="M-100 1010C140 884 330 1005 512 998S845 1030 1085 967 1410 815 1700 920V1200H-100Z" fill="var(--alpine-foreground)" />
      </g>
      <g className="alpine-route-layer">
        <path className="alpine-route-base" d="M510 1040C490 960 690 940 713 864S633 825 740 760 951 798 997 718 1127 694 1174 612 1070 609 1055 546 1166 493 1140 431 1096 393 1117 330 1120 229 1120 176" fill="none" stroke="var(--alpine-trail)" strokeWidth="2" strokeDasharray="3 9" opacity=".6" />
        <path id="alpine-route-path" className="alpine-route-drawn" pathLength="1" d="M510 1040C490 960 690 940 713 864S633 825 740 760 951 798 997 718 1127 694 1174 612 1070 609 1055 546 1166 493 1140 431 1096 393 1117 330 1120 229 1120 176" fill="none" stroke="var(--alpine-trail)" strokeWidth="3" strokeLinecap="round" />
        <circle id="alpine-route-marker-halo" cx="510" cy="1040" r="15" fill="var(--alpine-trail)" opacity=".2" />
        <circle id="alpine-route-marker" cx="510" cy="1040" r="5" fill="var(--alpine-trail)" stroke="var(--alpine-foreground)" strokeWidth="2" />
      </g>
      <rect className="alpine-hero-mist" width="1600" height="1100" fill="url(#alpine-mist-gradient)" />
    </svg>
    <span className="alpine-landscape-caption">An alpine-inspired journey · illustrative elevations</span>
  </div>
);
export default AlpineLandscape;
