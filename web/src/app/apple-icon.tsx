import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0c",
          position: "relative",
        }}
      >
        <div style={{ flex: 1, background: "#ce1126" }} />
        <div style={{ flex: 1, background: "#ffffff" }} />
        <div style={{ flex: 1, background: "#008751" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 100,
            fontWeight: 900,
            color: "#0a0a0c",
            letterSpacing: -4,
          }}
        >
          B
        </div>
      </div>
    ),
    { ...size },
  );
}
