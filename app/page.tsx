"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Clock, FileX, AlertTriangle, Linkedin, Moon, Sun } from "lucide-react";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [count, setCount] = useState(0);
  const [showPlus, setShowPlus] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBoxes, setShowBoxes] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const problemRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // Default to dark mode
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Start counting animation
            let currentCount = 0;
            const targetCount = 800;
            const duration = 2000; // 2 seconds
            const increment = targetCount / (duration / 16); // 60fps

            const timer = setInterval(() => {
              currentCount += increment;
              if (currentCount >= targetCount) {
                setCount(targetCount);
                setShowPlus(true);
                clearInterval(timer);
              } else {
                setCount(Math.floor(currentCount));
              }
            }, 16);
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    if (problemRef.current) {
      observer.observe(problemRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showBoxes) {
            setShowBoxes(true);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (boxesRef.current) {
      observer.observe(boxesRef.current);
    }

    return () => observer.disconnect();
  }, [showBoxes]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showFeatures) {
            setShowFeatures(true);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => observer.disconnect();
  }, [showFeatures]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showTeam) {
            setShowTeam(true);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => observer.disconnect();
  }, [showTeam]);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'top-4' : 'top-0'
        }`} style={{ 
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <div className={`transition-all duration-500 ${
            isScrolled 
              ? 'mx-auto max-w-4xl' 
              : 'w-full'
          }`} style={{ 
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div className={`backdrop-blur-xl transition-all duration-500 ${
              isScrolled 
                ? 'rounded-full bg-gradient-to-br from-white/40 via-white/30 to-[rgba(245,180,0,0.18)] border border-white/30 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] ring-1 ring-white/20' 
                : 'rounded-none bg-gradient-to-br from-white/35 via-white/30 to-[rgba(245,180,0,0.15)] border-b border-white/20 shadow-sm'
            }`} style={{ 
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <div className={`flex items-center justify-between transition-all duration-500 ${
                isScrolled ? 'py-2 px-4' : 'py-3 px-6'
              }`} style={{ 
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <div className={`mx-auto flex w-full items-center justify-between transition-all duration-500 ${
                  isScrolled ? 'max-w-none' : 'max-w-6xl'
                }`} style={{ 
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <div className="flex items-center gap-3">
                    <Link href="/" className="cursor-pointer">
                      <div className="relative transition-all duration-500" style={{
                        width: isScrolled ? '45px' : '60px',
                        height: isScrolled ? '45px' : '60px',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                      }}>
                        <Image 
                          src={theme === "light" ? "/lintel-logo3.png" : "/lintel-logo-dark.png"}
                          alt="Lintel logo" 
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>
                  </div>
                  <nav className={`hidden items-center md:flex transition-all duration-500 ${
                    isScrolled ? 'gap-4' : 'gap-8'
                  }`} style={{ 
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    <Link href="/#problem" className={`text-sm font-medium transition ${theme === "light" ? "text-[hsl(214,35%,26%)] hover:text-[hsl(214,35%,40%)]" : "text-white hover:text-white/80"}`}>
                      Problem
                    </Link>
                    <Link href="/#features" className={`text-sm font-medium transition ${theme === "light" ? "text-[hsl(214,35%,26%)] hover:text-[hsl(214,35%,40%)]" : "text-white hover:text-white/80"}`}>
                      Features
                    </Link>
                    <Link href="/#team" className={`text-sm font-medium transition ${theme === "light" ? "text-[hsl(214,35%,26%)] hover:text-[hsl(214,35%,40%)]" : "text-white hover:text-white/80"}`}>
                      Team
                    </Link>
                  </nav>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleThemeChange(theme === "light" ? "dark" : "light")}
                      className={`rounded-md p-2 transition ${theme === "light" ? "text-[hsl(214,35%,26%)] hover:bg-black/10" : "text-white hover:bg-white/10"}`}
                      aria-label="Toggle theme"
                    >
                      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>
                    <Link
                      href="https://cal.com/ibrahim-mohsin-mbdw6e"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition whitespace-nowrap ${theme === "light" ? "border-white text-[hsl(214,35%,26%)] hover:bg-white/10" : "border-[hsl(214,35%,26%)] text-white hover:bg-[hsl(214,35%,26%)]/10"}`}
                    >
                      {isScrolled ? 'Demo' : 'Book a Demo'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

      <main className="pt-16 md:pt-20">
        <section className="relative min-h-[700px] sm:min-h-[650px] md:min-h-0 md:h-[85vh] overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 h-[200vh] w-[355vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none max-w-none"
              src="https://www.youtube.com/embed/4BzjUq921Y4?autoplay=1&mute=1&loop=1&playlist=4BzjUq921Y4&controls=0&rel=0&modestbranding=1&playsinline=1&fs=0&showinfo=0&iv_load_policy=3&disablekb=1&enablejsapi=1&vq=hd1080"
              title="Lintel hero background"
              allow="autoplay; muted; loop"
            />
          </div>

          <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-16 min-h-[700px] sm:min-h-[650px] md:min-h-0 md:h-full">
            <div className="w-full max-w-6xl animate-[fadeInUp_0.8s_ease-out_forwards]">
              <div className={`relative z-10 flex flex-col gap-6 sm:gap-8 rounded-xl sm:rounded-2xl border p-5 sm:p-6 md:p-7 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.4)] backdrop-blur-xl ring-1 lg:flex-row lg:items-center lg:gap-12 ${
                theme === "light" 
                  ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-[hsl(214,35%,26%)]/90 via-[hsl(214,35%,26%)]/85 to-[rgba(245,180,0,0.3)] ring-[hsl(214,35%,26%)]/30" 
                  : "border-white/30 bg-gradient-to-br from-white/40 via-white/25 to-[rgba(245,180,0,0.18)] ring-white/20"
              }`}>
                <div className="flex-1 space-y-4 sm:space-y-6">
                  <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0 ${
                    theme === "light" ? "bg-white/20 text-white" : "bg-primary/30 text-white"
                  }`}>
                    For construction teams & coordinators
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] opacity-0">
                    Supercharge construction alignment with AI. Meet Lintel.
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] opacity-0">
                    Lintel continuously analyzes drawings, specs, schedules, and field comms—catching contradictions and checking against local regulations and compliance codes. Surface the highest-risk issues with evidence before costly rework hits the field.
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] opacity-0">
                    <Link
                      href="https://cal.com/ibrahim-mohsin-mbdw6e"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-md px-5 py-3 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 text-center ${
                        theme === "light" 
                          ? "bg-[hsl(45,95%,55%)] text-[hsl(214,35%,26%)] shadow-[hsl(45,95%,55%)]/30 hover:bg-[hsl(45,95%,60%)]" 
                          : "bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90"
                      }`}
                    >
                      Book a Demo
                    </Link>
                    <Link
                      href="#features"
                      className={`rounded-md border px-5 py-3 text-sm font-semibold transition text-center ${
                        theme === "light" 
                          ? "border-white/40 text-white hover:border-white hover:bg-white/10" 
                          : "border-primary/30 text-primary hover:border-primary hover:bg-primary/10"
                      }`}
                    >
                      See Features
                    </Link>
                  </div>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto lg:w-[500px] xl:w-[600px] animate-[fadeInUp_0.8s_ease-out_0.5s_forwards] opacity-0">
                  <Image
                    src="/blueprint-clashes.png"
                    alt="Blueprint clashes visualization"
                    width={600}
                    height={600}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" ref={problemRef} className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-12">
              {/* Centered Number */}
              <div className={`text-center ${
                hasAnimated ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' : 'opacity-0'
              }`}>
                <div className="mb-4 flex items-baseline justify-center">
                  <span className={`text-8xl font-bold md:text-9xl ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                    {count}
                  </span>
                  <span 
                    className={`text-8xl font-bold md:text-9xl transition-opacity duration-500 ${
                      showPlus ? 'opacity-100' : 'opacity-0'
                    } ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}
                  >
                    +
                  </span>
                </div>
                <p className={`text-xl font-semibold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white/90"}`}>
                  Average RFIs per Construction Project
                </p>
              </div>

              {/* Three Problem Boxes */}
              <div ref={boxesRef} className="grid w-full gap-6 md:grid-cols-3">
                {/* Problem 1: Costly Delays */}
                <div className={`flex flex-col items-center gap-4 rounded-2xl border p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.3)] backdrop-blur-xl ring-1 text-center transition-all duration-300 ease-out hover:scale-110 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] hover:-translate-y-1 cursor-pointer ${
                  theme === "light"
                    ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-white/80 via-white/70 to-[rgba(245,180,0,0.15)] ring-[hsl(214,35%,26%)]/10 hover:border-[hsl(214,35%,26%)]/40"
                    : "border-white/30 bg-gradient-to-br from-white/40 via-white/25 to-[rgba(245,180,0,0.18)] ring-white/20 hover:border-white/50"
                } ${showBoxes ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' : 'opacity-0'}`}>
                  <div className={`flex-shrink-0 rounded-full p-4 ${theme === "light" ? "bg-[hsl(214,35%,26%)]/10" : "bg-primary/20"}`}>
                    <Clock className={`h-8 w-8 ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`} />
                  </div>
                  <div>
                    <h3 className={`mb-2 text-xl font-bold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                      Costly Delays & Rework
                    </h3>
                    <p className={`text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/80" : "text-white/80"}`}>
                      Issues caught on-site turn into expensive RFIs, causing project delays and budget overruns.
                    </p>
                  </div>
                </div>

                {/* Problem 2: Documentation Conflicts */}
                <div className={`flex flex-col items-center gap-4 rounded-2xl border p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.3)] backdrop-blur-xl ring-1 text-center transition-all duration-300 ease-out hover:scale-110 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] hover:-translate-y-1 cursor-pointer ${
                  theme === "light"
                    ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-white/80 via-white/70 to-[rgba(245,180,0,0.15)] ring-[hsl(214,35%,26%)]/10 hover:border-[hsl(214,35%,26%)]/40"
                    : "border-white/30 bg-gradient-to-br from-white/40 via-white/25 to-[rgba(245,180,0,0.18)] ring-white/20 hover:border-white/50"
                } ${showBoxes ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' : 'opacity-0'}`}>
                  <div className={`flex-shrink-0 rounded-full p-4 ${theme === "light" ? "bg-[hsl(214,35%,26%)]/10" : "bg-primary/20"}`}>
                    <FileX className={`h-8 w-8 ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`} />
                  </div>
                  <div>
                    <h3 className={`mb-2 text-xl font-bold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                      Documentation Conflicts
                    </h3>
                    <p className={`text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/80" : "text-white/80"}`}>
                      Drawings don&apos;t match specs, schedules contradict reality, and compliance gaps slip through.
                    </p>
                  </div>
                </div>

                {/* Problem 3: Manual Review Bottlenecks */}
                <div className={`flex flex-col items-center gap-4 rounded-2xl border p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.3)] backdrop-blur-xl ring-1 text-center transition-all duration-300 ease-out hover:scale-110 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] hover:-translate-y-1 cursor-pointer ${
                  theme === "light"
                    ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-white/80 via-white/70 to-[rgba(245,180,0,0.15)] ring-[hsl(214,35%,26%)]/10 hover:border-[hsl(214,35%,26%)]/40"
                    : "border-white/30 bg-gradient-to-br from-white/40 via-white/25 to-[rgba(245,180,0,0.18)] ring-white/20 hover:border-white/50"
                } ${showBoxes ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' : 'opacity-0'}`}>
                  <div className={`flex-shrink-0 rounded-full p-4 ${theme === "light" ? "bg-[hsl(214,35%,26%)]/10" : "bg-primary/20"}`}>
                    <AlertTriangle className={`h-8 w-8 ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`} />
                  </div>
                  <div>
                    <h3 className={`mb-2 text-xl font-bold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                      Manual Review Bottlenecks
                    </h3>
                    <p className={`text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/80" : "text-white/80"}`}>
                      Teams can&apos;t keep up with the volume and complexity of modern projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className={`relative py-20 px-6 backdrop-blur-xl ${
          theme === "light"
            ? "bg-gradient-to-br from-[hsl(210,15%,94%)] via-[hsl(210,15%,96%)] to-[rgba(245,180,0,0.1)]"
            : "bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-[rgba(245,180,0,0.2)]"
        }`}>
          <div className="mx-auto max-w-6xl">
            <div className={`mb-16 text-center ${
              showFeatures ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' : 'opacity-0'
            }`}>
              <h2 className={`mb-4 text-4xl font-bold md:text-5xl ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                See Lintel in Action
              </h2>
              <p className={`text-lg ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
                Watch how Lintel automates issue detection and streamlines your construction workflow
              </p>
            </div>

            <div className={`grid gap-12 md:grid-cols-2 max-w-5xl mx-auto ${
              showFeatures ? 'animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]' : 'opacity-0'
            }`}>
              {/* Feature 1: Automated Issue Detection */}
              <div className="flex flex-col gap-6 transition-transform duration-300 hover:scale-105">
                <h3 className={`text-center text-2xl font-bold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                  Automated Issue Detection
                </h3>
                <div className={`relative aspect-video w-full overflow-hidden rounded-xl border shadow-lg backdrop-blur-xl ring-1 ${
                  theme === "light"
                    ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-white/80 via-white/70 to-[rgba(245,180,0,0.15)] ring-[hsl(214,35%,26%)]/10"
                    : "border-slate-600/50 bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-[rgba(245,180,0,0.3)] ring-slate-600/30"
                }`}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  >
                    <source src="/demo-video-1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className={`text-center text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
                  AI-powered scanning identifies contradictions across drawings, specs, and schedules in real-time
                </p>
              </div>

              {/* Feature 2: Evidence-Based Insights */}
              <div className="flex flex-col gap-6 transition-transform duration-300 hover:scale-105">
                <h3 className={`text-center text-2xl font-bold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                  Evidence-Based Insights
                </h3>
                <div className={`relative aspect-video w-full overflow-hidden rounded-xl border shadow-lg backdrop-blur-xl ring-1 ${
                  theme === "light"
                    ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-white/80 via-white/70 to-[rgba(245,180,0,0.15)] ring-[hsl(214,35%,26%)]/10"
                    : "border-slate-600/50 bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-[rgba(245,180,0,0.3)] ring-slate-600/30"
                }`}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  >
                    <source src="/demo-video-2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className={`text-center text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
                  Every issue comes with pinpointed evidence from source documents, making verification instant
                </p>
              </div>

              {/* Feature 3: Streamlined RFI Process */}
              <div className="flex flex-col gap-6 transition-transform duration-300 hover:scale-105">
                <h3 className={`text-center text-2xl font-bold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                  Streamlined RFI Process
                </h3>
                <div className={`relative aspect-video w-full overflow-hidden rounded-xl border shadow-lg backdrop-blur-xl ring-1 ${
                  theme === "light"
                    ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-white/80 via-white/70 to-[rgba(245,180,0,0.15)] ring-[hsl(214,35%,26%)]/10"
                    : "border-slate-600/50 bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-[rgba(245,180,0,0.3)] ring-slate-600/30"
                }`}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  >
                    <source src="/demo-video-3.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className={`text-center text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
                  Generate and send RFIs directly from detected issues with all context and evidence attached
                </p>
              </div>

              {/* Feature 4: Compliance Checking */}
              <div className="flex flex-col gap-6 transition-transform duration-300 hover:scale-105">
                <h3 className={`text-center text-2xl font-bold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                  AI-Driven Document Actions
                </h3>
                <div className={`relative aspect-video w-full overflow-hidden rounded-xl border shadow-lg backdrop-blur-xl ring-1 ${
                  theme === "light"
                    ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-white/80 via-white/70 to-[rgba(245,180,0,0.15)] ring-[hsl(214,35%,26%)]/10"
                    : "border-slate-600/50 bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-[rgba(245,180,0,0.3)] ring-slate-600/30"
                }`}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  >
                    <source src="/demo-video-4.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className={`text-center text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
                  Ask Lintel AI relevant questions across your entire construction document set and get instant, accurate answers with citations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" ref={teamRef} className="py-20 px-6 bg-background">
          <div className="mx-auto max-w-6xl">
            <div className={`mb-16 text-center ${
              showTeam ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' : 'opacity-0'
            }`}>
              <h2 className={`mb-4 text-4xl font-bold md:text-5xl ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                Meet Our Team
              </h2>
              <p className={`text-lg ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
                Civil engineering and AI experts working together to transform the industry
              </p>
            </div>

            <div className={`grid gap-8 md:grid-cols-2 max-w-2xl mx-auto ${
              showTeam ? 'animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]' : 'opacity-0'
            }`}>

              {/* Team Member 2 */}
              <div className={`flex flex-col overflow-hidden rounded-2xl border shadow-lg backdrop-blur-xl ring-1 transition-transform duration-300 hover:scale-105 ${
                theme === "light"
                  ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-white/90 via-white/80 to-[rgba(245,180,0,0.12)] ring-[hsl(214,35%,26%)]/10"
                  : "border-slate-600/50 bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-[rgba(245,180,0,0.3)] ring-slate-600/30"
              }`}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/ibrahim-mohsin.jpg"
                    alt="Ibrahim Mohsin"
                    fill
                    className="object-cover scale-125"
                    style={{ objectPosition: 'center 5%' }}
                  />
                  <Link
                    href="https://www.linkedin.com/in/ibrahim-mohsin-16a1b8261/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 rounded-full border border-white/40 bg-white/30 backdrop-blur-md p-2 shadow-lg ring-1 ring-white/20 transition hover:bg-white/40"
                  >
                    <Linkedin className="h-5 w-5 text-[hsl(214,35%,26%)]" />
                  </Link>
                </div>
                <div className="p-6 text-center">
                  <h3 className={`mb-1 text-xl font-bold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                    Ibrahim Mohsin
                  </h3>
                  <p className={`mb-3 text-sm font-semibold ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
                    Co-Founder
                  </p>
                  <p className={`text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/60" : "text-white/60"}`}>
                    AI project specialist having built enterprise systems for governments, non-profits, startups, healthtech, and much more. Experienced developer passionate about building tools that increase productivity.
                  </p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className={`flex flex-col overflow-hidden rounded-2xl border shadow-lg backdrop-blur-xl ring-1 transition-transform duration-300 hover:scale-105 ${
                theme === "light"
                  ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-white/90 via-white/80 to-[rgba(245,180,0,0.12)] ring-[hsl(214,35%,26%)]/10"
                  : "border-slate-600/50 bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-[rgba(245,180,0,0.3)] ring-slate-600/30"
              }`}>
                <div className="relative aspect-square w-full">
                  <Image
                    src="/jathan-pai2.jpeg"
                    alt="Jathan Pai"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 0%' }}
                  />
                  <Link
                    href="https://www.linkedin.com/in/jathan-pai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 rounded-full border border-white/40 bg-white/30 backdrop-blur-md p-2 shadow-lg ring-1 ring-white/20 transition hover:bg-white/40"
                  >
                    <Linkedin className="h-5 w-5 text-[hsl(214,35%,26%)]" />
                  </Link>
                </div>
                <div className="p-6 text-center">
                  <h3 className={`mb-1 text-xl font-bold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>
                    Jathan Pai
                  </h3>
                  <p className={`mb-3 text-sm font-semibold ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
                    Co-Founder
                  </p>
                  <p className={`text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/60" : "text-white/60"}`}>
                    Product leader with expertise in managing quality control and compliance on civil engineering projects. Passionate about policy and procedure optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`border-t backdrop-blur-xl ${
        theme === "light"
          ? "border-[hsl(214,35%,26%)]/20 bg-gradient-to-br from-[hsl(210,15%,94%)] via-[hsl(210,15%,96%)] to-[rgba(245,180,0,0.1)]"
          : "border-white/20 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-[rgba(245,180,0,0.2)]"
      }`}>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Logo and Description */}
            <div className="space-y-4">
              <Link href="/" className="cursor-pointer">
                <div className="relative h-16 w-16">
                  <Image 
                    src={theme === "light" ? "/lintel-logo3.png" : "/lintel-logo-dark.png"}
                    alt="Lintel logo" 
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className={`text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
                AI-powered continuous linting for construction projects.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>Quick Links</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#problem" className={`text-sm transition ${theme === "light" ? "text-[hsl(214,35%,26%)]/70 hover:text-[hsl(214,35%,26%)]" : "text-white/70 hover:text-white"}`}>
                  Problem
                </Link>
                <Link href="#features" className={`text-sm transition ${theme === "light" ? "text-[hsl(214,35%,26%)]/70 hover:text-[hsl(214,35%,26%)]" : "text-white/70 hover:text-white"}`}>
                  Features
                </Link>
                <Link href="#team" className={`text-sm transition ${theme === "light" ? "text-[hsl(214,35%,26%)]/70 hover:text-[hsl(214,35%,26%)]" : "text-white/70 hover:text-white"}`}>
                  Team
                </Link>
              </nav>
            </div>

            {/* Contact/CTA */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold ${theme === "light" ? "text-[hsl(214,35%,26%)]" : "text-white"}`}>Get Started</h3>
              <p className={`text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
                Ready to transform your construction workflow?
              </p>
              <Link
                href="https://cal.com/ibrahim-mohsin-mbdw6e"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block rounded-md px-4 py-2 text-sm font-semibold shadow-lg transition text-center ${
                  theme === "light"
                    ? "bg-[hsl(214,35%,26%)] text-white shadow-[hsl(214,35%,26%)]/20 hover:bg-[hsl(214,35%,30%)]"
                    : "bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90"
                }`}
              >
                Book a Demo
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${
            theme === "light" ? "border-[hsl(214,35%,26%)]/20" : "border-white/20"
          }`}>
            <p className={`text-sm ${theme === "light" ? "text-[hsl(214,35%,26%)]/70" : "text-white/70"}`}>
              © {new Date().getFullYear()} Lintel. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleThemeChange(theme === "light" ? "dark" : "light")}
                className={`rounded-md p-2 transition ${
                  theme === "light" 
                    ? "text-[hsl(214,35%,26%)]/70 hover:text-[hsl(214,35%,26%)] hover:bg-[hsl(214,35%,26%)]/10" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

