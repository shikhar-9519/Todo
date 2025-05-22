// src/components/AuthLayout.tsx
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuthLayoutProps { children: ReactNode; }

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen h-screen grid grid-cols-1 md:grid-cols-2",
        "bg-white overflow-hidden"
      )}
    >
      <div className="flex flex-col justify-center px-8 py-12">
        {children}
      </div>
      <div className="hidden md:block overflow-hidden">
        <img
          src="/images/auth-background.png"
          alt="Notebook with To-Do"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
