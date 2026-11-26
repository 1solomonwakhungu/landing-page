import { ImageResponse } from "next/og";

export const alt =
  "Solomon Wakhungu | Cloud Platforms, Upstream Open Source & AI Infrastructure (harlo.dev)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          display: "flex",
          padding: 48,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#f4f2ee",
            borderRadius: 36,
            padding: "56px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg
              width={36}
              height={36}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M46 15.5 H24 A8.25 8.25 0 0 0 24 32 H25"
                stroke="#202124"
                strokeWidth="10.5"
                strokeLinecap="round"
              />
              <path
                d="M18 48.5 H40 A8.25 8.25 0 0 0 40 32 H39"
                stroke="#1967d2"
                strokeWidth="10.5"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#202124",
                letterSpacing: "-0.02em",
              }}
            >
              harlo.dev
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 600,
                color: "#202124",
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                maxWidth: 920,
              }}
            >
              Solomon Wakhungu
            </div>
            <div
              style={{
                fontSize: 30,
                color: "#3c4043",
                lineHeight: 1.4,
                maxWidth: 860,
              }}
            >
              Senior Software Engineer at Credera (ex-Amazon, Aviatrix).
              Terraform &amp; Helm contributor. Creator of kFLEET, gronify,
              Tonal &amp; action-hub.
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              "tonal.harlo.dev",
              "kfleet.harlo.dev",
              "gronify.harlo.dev",
              "typst.harlo.dev",
              "vllm.harlo.dev",
            ].map((host) => (
              <div
                key={host}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e8eaed",
                  borderRadius: 9999,
                  padding: "10px 20px",
                  fontSize: 18,
                  color: "#174ea6",
                  fontWeight: 500,
                }}
              >
                {host}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
