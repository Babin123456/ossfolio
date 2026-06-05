import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffffff",
          color: "#171717",
        }}
      >
        <img
  src="https://ossfolio.qzz.io/logo.png"
  width={180}
  height={180}
/>

        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            marginTop: 24,
          }}
        >
          OSSfolio
        </div>

        <div
          style={{
            fontSize: 32,
            color: "#707070",
            marginTop: 12,
          }}
        >
          Your open-source identity, beyond GitHub
        </div>
      </div>
    ),
    size
  );
}