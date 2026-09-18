import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { brand, siteDescription, siteTitle } from "@/lib/site";

export const alt = `${siteTitle} — ${siteDescription}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";
export const dynamic = "force-static";

export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/favicon/web-app-manifest-512x512.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0d0d0d",
          color: "#f2f2ec",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 18,
            height: "100%",
            background: "#bff549",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "64px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logoSrc}
              width={88}
              height={88}
              alt=""
              style={{ borderRadius: 12 }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 28,
              }}
            >
              <div
                style={{
                  color: "#bff549",
                  fontSize: 28,
                  letterSpacing: 10,
                  fontWeight: 700,
                }}
              >
                {brand.name.toUpperCase()}
              </div>
              <div
                style={{
                  color: "#999b93",
                  fontSize: 22,
                  marginTop: 6,
                }}
              >
                {brand.city}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: -1,
              }}
            >
              {brand.owner}
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 30,
                color: "#c5c7be",
                lineHeight: 1.4,
                maxWidth: 860,
              }}
            >
              {brand.tagline}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            <div style={{ color: "#999b93" }}>{brand.badge}</div>
            <div style={{ color: "#bff549" }}>gorx.com.br</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
