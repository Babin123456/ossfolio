"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface NavbarProps {
  onSignIn?: () => void;
  onGetStarted?: () => void;
}

const navLinks = ["Features", "How it works", "Leaderboard"];

// System Theme Design Tokens Mapping
const tokens = {
  canvas: "#ffffff",
  canvasNight: "#1c1c1c",
  canvasNightSoft: "#202020",
  ink: "#171717",
  textMutedLight: "#707070",
  textMutedDark: "#a3a3a3",
  borderLight: "#ededed",
  borderDark: "#2e2e2e",
  primary: "#3ecf8e", // Emerald accent color
  primaryHover: "#24b47e",
};

/** Circular GitHub avatar with a graceful initial-letter fallback. */
function Avatar({ src, name, size, isDark }: { src?: string; name?: string; size: number; isDark: boolean }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name ?? "Profile"}
        width={size}
        height={size}
        style={{ 
          borderRadius: "9999px", 
          border: `1px solid ${isDark ? tokens.borderDark : tokens.borderLight}`, 
          flexShrink: 0 
        }}
      />
    );
  }
  const initial = (name?.charAt(0) ?? "U").toUpperCase();
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        backgroundColor: isDark ? tokens.canvasNightSoft : "#ededed",
        color: isDark ? "#ffffff" : tokens.ink,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: Math.round(size * 0.45),
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initial}
    </span>
  );
}

export function Navbar({ onSignIn, onGetStarted }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Synced Theme State Management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // Resolve the current session on mount and keep it in sync with auth changes.
  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) setUser(data.session?.user ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Close the profile dropdown when clicking outside of it.
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const username = user?.user_metadata?.user_name as string | undefined;
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const profileHref = username ? `/${username}` : "/";

  async function handleLogout() {
    setMenuOpen(false);
    setMobileOpen(false);
    await supabase.auth.signOut();
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        width: "100%",
        backgroundColor: isDarkMode ? tokens.canvasNight : tokens.canvas,
        borderBottom: `1px solid ${isDarkMode ? tokens.borderDark : tokens.borderLight}`,
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Inner container */}
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          height: "56px",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <Image
            src="/logo.png"
            alt=""
            width={28}
            height={28}
            priority
            style={{ borderRadius: "6px", flexShrink: 0 }}
          />
          <span style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: "15px", fontWeight: 600, color: isDarkMode ? "#ffffff" : tokens.ink, letterSpacing: "-0.3px" }}>OSS</span>
            <span style={{ fontSize: "15px", fontWeight: 600, color: tokens.primary, letterSpacing: "-0.3px" }}>folio</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }} className="hide-on-mobile">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              style={{ 
                fontSize: "14px", 
                fontWeight: 500, 
                color: isDarkMode ? tokens.textMutedDark : tokens.textMutedLight, 
                textDecoration: "none" 
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = isDarkMode ? "#ffffff" : tokens.ink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = isDarkMode ? tokens.textMutedDark : tokens.textMutedLight)}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop Theme Toggle + Action Layout Space */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }} className="hide-on-mobile">
          
          {/* Integrated Token-Compliant Theme Switch Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isDarkMode ? tokens.textMutedDark : tokens.textMutedLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px",
              borderRadius: "6px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = isDarkMode ? "#ffffff" : tokens.ink)}
            onMouseLeave={(e) => (e.currentTarget.style.color = isDarkMode ? tokens.textMutedDark : tokens.textMutedLight)}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Desktop User Logic View Configuration */}
          {user ? (
            <div
              ref={menuRef}
              style={{ position: "relative", display: "flex", alignItems: "center" }}
            >
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: isDarkMode ? tokens.canvasNightSoft : tokens.canvas,
                  border: `1px solid ${isDarkMode ? tokens.borderDark : "#c7c7c7"}`,
                  borderRadius: "9999px",
                  padding: "4px 12px 4px 4px",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? tokens.borderDark : "#fafafa")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? tokens.canvasNightSoft : tokens.canvas)}
              >
                <Avatar src={avatarUrl} name={username} size={28} isDark={isDarkMode} />
                <span style={{ fontSize: "14px", fontWeight: 500, color: isDarkMode ? "#ffffff" : tokens.ink }}>
                  {username ?? "Account"}
                </span>
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    minWidth: "180px",
                    backgroundColor: isDarkMode ? tokens.canvasNightSoft : tokens.canvas,
                    border: `1px solid ${isDarkMode ? tokens.borderDark : tokens.borderLight}`,
                    borderRadius: "8px",
                    boxShadow: isDarkMode ? "0 4px 24px rgba(0, 0, 0, 0.4)" : "0 4px 16px rgba(0, 0, 0, 0.08)",
                    padding: "6px",
                    zIndex: 50,
                  }}
                >
                  <Link
                    href={profileHref}
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "8px 10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: isDarkMode ? "#ffffff" : tokens.ink,
                      textDecoration: "none",
                      borderRadius: "6px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? tokens.borderDark : "#fafafa")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    My Portfolio
                  </Link>
                  <div
                    role="separator"
                    style={{
                      height: "1px",
                      backgroundColor: isDarkMode ? tokens.borderDark : tokens.borderLight,
                      margin: "4px 10px",
                    }}
                  />
                  <button
                    role="menuitem"
                    onClick={handleLogout}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: isDarkMode ? "#ffffff" : tokens.ink,
                      background: "none",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? tokens.borderDark : "#fafafa")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => onSignIn?.()}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isDarkMode ? "#ffffff" : tokens.ink,
                  background: isDarkMode ? "transparent" : tokens.canvas,
                  border: `1px solid ${isDarkMode ? tokens.borderDark : "#c7c7c7"}`,
                  cursor: "pointer",
                  padding: "7px 16px",
                  borderRadius: "6px",
                  letterSpacing: "0",
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? tokens.canvasNightSoft : "#fafafa";
                  e.currentTarget.style.borderColor = isDarkMode ? "#444444" : "#b2b2b2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? "transparent" : tokens.canvas;
                  e.currentTarget.style.borderColor = isDarkMode ? tokens.borderDark : "#c7c7c7";
                }}
              >
                Sign in
              </button>
              <button
                onClick={() => onGetStarted?.()}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  backgroundColor: tokens.primary,
                  color: tokens.ink, // Enforces the emerald rule constraint (dark typography on green)
                  padding: "7px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0",
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = tokens.primaryHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = tokens.primary)}
              >
                Get started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger + Theme Row Shell container */}
        <div style={{ display: "none", alignItems: "center", gap: "8px" }} className="show-on-mobile">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isDarkMode ? "#ffffff" : tokens.ink,
              padding: "4px",
              marginRight: "4px"
            }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isDarkMode ? "#ffffff" : tokens.ink,
              padding: "4px",
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel overlay layout */}
      {mobileOpen && (
        <div
          style={{
            borderTop: `1px solid ${isDarkMode ? tokens.borderDark : tokens.borderLight}`,
            backgroundColor: isDarkMode ? tokens.canvasNight : tokens.canvas,
            display: "none",
          }}
          className="show-on-mobile"
        >
          <div style={{ padding: "12px 20px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isDarkMode ? tokens.textMutedDark : tokens.textMutedLight,
                  textDecoration: "none",
                  display: "block",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div style={{ 
              marginTop: "12px", 
              paddingTop: "12px", 
              borderTop: `1px solid ${isDarkMode ? tokens.borderDark : tokens.borderLight}`, 
              display: "flex", 
              flexDirection: "column", 
              gap: "8px" 
            }}>
              {user ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 0 8px" }}>
                    <Avatar src={avatarUrl} name={username} size={32} isDark={isDarkMode} />
                    <span style={{ fontSize: "14px", fontWeight: 600, color: isDarkMode ? "#ffffff" : tokens.ink }}>
                      {username ?? "Account"}
                    </span>
                  </div>
                  <Link
                    href={profileHref}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      width: "100%",
                      padding: "9px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: isDarkMode ? "#ffffff" : tokens.ink,
                      backgroundColor: isDarkMode ? tokens.canvasNightSoft : tokens.canvas,
                      border: `1px solid ${isDarkMode ? tokens.borderDark : "#c7c7c7"}`,
                      borderRadius: "6px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    My Portfolio
                  </Link>
                  <div
                    role="separator"
                    style={{
                      height: "1px",
                      backgroundColor: isDarkMode ? tokens.borderDark : tokens.borderLight,
                      margin: "8px 0",
                    }}
                  />
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "9px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: isDarkMode ? "#ffffff" : tokens.ink,
                      backgroundColor: isDarkMode ? tokens.canvasNightSoft : tokens.canvas,
                      border: `1px solid ${isDarkMode ? tokens.borderDark : "#c7c7c7"}`,
                      borderRadius: "6px",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setMobileOpen(false); if (onSignIn) onSignIn(); }}
                    style={{
                      width: "100%",
                      padding: "9px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: isDarkMode ? "#ffffff" : tokens.ink,
                      backgroundColor: isDarkMode ? tokens.canvasNightSoft : tokens.canvas,
                      border: `1px solid ${isDarkMode ? tokens.borderDark : "#c7c7c7"}`,
                      borderRadius: "6px",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); if (onGetStarted) onGetStarted(); }}
                    style={{
                      width: "100%",
                      padding: "9px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      backgroundColor: tokens.primary,
                      color: tokens.ink, // Enforces the emerald rule constraint
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Get started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Responsive layout conditional blocks style layout */}
      <style>{`
        @media (min-width: 768px) {
          .hide-on-mobile { display: flex !important; }
          .show-on-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hide-on-mobile { display: none !important; }
          .show-on-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}