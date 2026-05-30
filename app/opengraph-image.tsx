import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "MyCalculators Kenyan calculator toolkit"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F7FAF8",
          color: "#0B1020",
          fontFamily: "Inter, Arial, sans-serif",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 20%, rgba(11,90,42,0.14), transparent 32%), radial-gradient(circle at 86% 22%, rgba(11,90,42,0.10), transparent 30%)",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid #E4E7EC",
            borderRadius: 34,
            background: "rgba(255,255,255,0.92)",
            padding: 56,
            boxShadow: "0 24px 70px rgba(6,63,32,0.10)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58,
                height: 58,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
                background: "#0B5A2A",
                color: "#FFFFFF",
                fontSize: 27,
                fontWeight: 900,
              }}
            >
              MC
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 31, fontWeight: 900 }}>MyCalculators</div>
              <div style={{ color: "#0B5A2A", fontSize: 18, fontWeight: 800 }}>Kenya</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                width: "78%",
                fontSize: 70,
                lineHeight: 1.03,
                fontWeight: 900,
                letterSpacing: -1,
              }}
            >
              Smart money decisions for Kenya
            </div>
            <div style={{ width: "70%", color: "#667085", fontSize: 25, lineHeight: 1.45 }}>
              M-Pesa, salary, loans, taxes, utilities, planning and health calculators.
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, color: "#0B5A2A", fontSize: 20, fontWeight: 800 }}>
            <span>Free to use</span>
            <span>Kenya-focused</span>
            <span>Updated rates</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}

