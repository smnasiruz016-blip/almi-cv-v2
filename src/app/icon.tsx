import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFBF5",
          borderRadius: 6,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#D4A24C"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21s-7.5-4.7-9.6-9.4C1.1 8.4 2.7 5 6 5c1.9 0 3.5 1 4.5 2.5h0.0 0.0C11.5 6 13.1 5 15 5c3.3 0 4.9 3.4 3.6 6.6C19.5 16.3 12 21 12 21z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
