import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "AlmiCV — Honest career toolkit. $10 once. Forever.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const publicDir = path.join(process.cwd(), "public");
  const [regular, bold, logoBuffer] = await Promise.all([
    readFile(path.join(publicDir, "fonts", "fraunces-regular.ttf")),
    readFile(path.join(publicDir, "fonts", "fraunces-bold.ttf")),
    readFile(path.join(publicDir, "almiworld-logo.png")),
  ]);

  const logoSrc = `data:image/png;base64,${Buffer.from(logoBuffer).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFBF5",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: "rgba(255, 122, 107, 0.18)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 320,
            height: 320,
            borderRadius: 9999,
            background: "rgba(168, 213, 186, 0.20)",
            filter: "blur(60px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: "Fraunces",
              fontWeight: 700,
              fontSize: 180,
              color: "#2D1B3D",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            AlmiCV
          </div>
          <div
            style={{
              fontFamily: "Fraunces",
              fontWeight: 400,
              fontSize: 36,
              color: "#6B5B7A",
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            Honest career toolkit. $10 once. Forever.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <img
            src={logoSrc}
            alt=""
            style={{ height: 56, width: "auto", opacity: 0.9 }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: regular, style: "normal", weight: 400 },
        { name: "Fraunces", data: bold, style: "normal", weight: 700 },
      ],
    }
  );
}
