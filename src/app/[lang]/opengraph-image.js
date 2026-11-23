import { ImageResponse } from "next/og";

export const alt = "Bécaye FALL — Full Stack Developer & Tech Entrepreneur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0F",
          color: "#F5F5F7",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, letterSpacing: 4, fontWeight: 700 }}>
          BÉCAYE<span style={{ color: "#62FF4A" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          <span>I build</span>
          <span style={{ color: "#62FF4A" }}>digital products,</span>
          <span>not just websites.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#92929E" }}>
          <span>Bécaye FALL — Full Stack Developer &amp; Tech Entrepreneur</span>
          <span>Dakar, SN</span>
        </div>
      </div>
    ),
    size,
  );
}
