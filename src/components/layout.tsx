import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full ">
      <div>{children}</div>
    </div>
  );
}

export default Layout;
