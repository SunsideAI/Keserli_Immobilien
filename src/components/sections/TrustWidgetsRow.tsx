"use client";

import {
  TrustpilotReviewCollector,
  TrustlocalLandscape,
  TrustlocalPortrait,
} from "@/components/ui/TrustWidgets";

export default function TrustWidgetsRow() {
  return (
    <div className="mb-12">
      {/* Desktop: side-by-side */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
        <TrustpilotReviewCollector />
        <TrustlocalLandscape />
      </div>
      {/* Mobile: stacked, portrait layout for Trustlocal */}
      <div className="md:hidden flex flex-col items-center gap-6">
        <div className="w-full max-w-sm">
          <TrustpilotReviewCollector />
        </div>
        <TrustlocalPortrait />
      </div>
    </div>
  );
}
