"use client";

import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";

interface LandingHeaderProps {
  theme: "light" | "dark";
  onThemeChange: (newTheme: "light" | "dark") => void;
  isScrolled: boolean;
}

export function LandingHeader({ theme, onThemeChange, isScrolled }: LandingHeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={theme === "dark" ? "/lintel-logo3.png" : "/lintel-logo-dark.png"}
            alt="Lintel"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Features
          </Link>
          <Link
            href="#problem"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Problem
          </Link>
          <Link
            href="#team"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Team
          </Link>
          <button
            onClick={() => onThemeChange(theme === "light" ? "dark" : "light")}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
