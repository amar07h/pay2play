import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "عنوان افتراضي";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#111827",
          color: "#fff",
          width: "100%",
          height: "100%",
          padding: "60px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 60,
          fontWeight: "bold",
        }}
      >
        <span>{title}</span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
