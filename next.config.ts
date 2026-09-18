import type { NextConfig } from "next";

const config: NextConfig = {
  // Gli asset sono già AVIF/WebP ottimizzati (tools/optimize-assets.py):
  // next/image li ri-comprimerebbe senza guadagno. Si servono statici da /media.
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default config;
