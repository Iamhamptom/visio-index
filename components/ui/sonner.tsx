"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "#12121A",
          "--normal-text": "#E8E8ED",
          "--normal-border": "rgba(255, 255, 255, 0.06)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
