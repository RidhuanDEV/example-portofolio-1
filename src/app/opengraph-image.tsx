import { ImageResponse } from "next/og";

export const alt = "Ridhuan Rangga Kusuma - Full-Stack Software Engineer & QA Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090b",
          color: "#ffffff",
          padding: "64px",
          border: "1px solid rgba(255,255,255,0.12)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#99f6e4",
            }}
          >
            FULL-STACK ENGINEER &amp; QA SPECIALIST / JAKARTA
          </span>
          <span style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1.1 }}>
            Ridhuan Rangga Kusuma
          </span>
          <span style={{ fontSize: "28px", color: "#cbd5e1", maxWidth: "900px", lineHeight: 1.4 }}>
            Resilient GovTech &amp; Enterprise systems, OAuth 2.0/OIDC architecture, Go/MQTT IoT, and verifiable QA.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "48px",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: "28px",
            fontSize: "22px",
            color: "#e4e4e7",
          }}
        >
          <span>77 GitHub Repos</span>
          <span>138 Production RBAC Perms</span>
          <span>99.81% Vector Accuracy</span>
          <span>52 AI Skills + 3 MCPs</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
