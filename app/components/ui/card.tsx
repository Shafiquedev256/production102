"use client";

import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

// Extract only valid keys (excluding undefined)
type PaddingSize = NonNullable<CardProps["padding"]>;

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  hover = false,
}) => {
  const paddingClasses: Record<PaddingSize, string> = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-sm border border-gray-100",
        paddingClasses[padding],
        hover && "hover:shadow-lg transition-shadow duration-200",
        className
      )}
    >
      {children}
    </div>
  );
};
