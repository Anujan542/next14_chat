import React from "react";
import Header from "./layout-components/header";
import Content from "./layout-components/content";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <Content> {children}</Content>
    </div>
  );
};

export default LayoutProvider;
