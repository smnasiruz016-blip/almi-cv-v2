import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ClassicSerif } from "@/components/templates/ClassicSerif";
import { mayaRodriguez } from "@/lib/sample-cv-data";

export default function ClassicSerifPreviewPage() {
  return (
    <div className="min-h-screen bg-cream-soft py-10">
      <div className="mx-auto mb-8 flex max-w-[800px] items-center justify-between px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-plum-soft transition hover:text-coral"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>
            <span className="text-plum-faint">Templates</span>
            <span className="mx-2 text-plum-faint">/</span>
            <span className="font-medium text-plum">Classic Serif</span>
          </span>
        </Link>
        <Link
          href="/templates/classic-serif/use"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white shadow-warm-card transition hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
        >
          Use this template
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="px-6">
        <ClassicSerif data={mayaRodriguez} />
      </div>
    </div>
  );
}
