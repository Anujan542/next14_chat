"use client";
// import { ConfigProvider } from "antd";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#31304D",
            borderRadius: 2,
          },
          components: {
            Button: {
              controlHeight: 42,
              boxShadow: "none",
              colorPrimaryBgHover: "#31304D",
              colorPrimaryHover: "#31304D",
              controlOutline: "none",
              colorBorder: "#31304D",
            },
          },
        }}
      >
        {children}
      </ConfigProvider> */}
      {children}
    </div>
  );
};

export default ThemeProvider;
