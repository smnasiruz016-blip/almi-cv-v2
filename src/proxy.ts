import { NextResponse } from "next/server";

// COST FIX (Oct 2026): the old programmatic pages are removed (owner ruling,
// 17 Oct: deleted, no redirects). Their URL families answer 410 Gone here,
// before any render, ISR write or database call.
//   /cv-guide/{country}, /cv-guide/{country}/{role}, /cv-guide/{dest}/from-{origin}
//   /jobs/{country}
// The /cv-guide index itself is not matched (":path+" needs one segment).
export function proxy() {
  return new NextResponse("410 Gone — this page has been removed.", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
      "x-robots-tag": "noindex",
    },
  });
}

export const config = {
  matcher: ["/cv-guide/:path+", "/jobs/:path+"],
};
