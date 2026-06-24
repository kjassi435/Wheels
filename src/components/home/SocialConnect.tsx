"use client";

import { useState, useEffect } from "react";

export function SocialConnect() {
  const [socials, setSocials] = useState({ instagram: "#", youtube: "#", facebook: "#" });

  useEffect(() => {
    fetch("/api/cms/settings")
      .then((r) => r.json())
      .then((data) => {
        setSocials({
          instagram: data.social_instagram || "#",
          youtube: data.social_youtube || "#",
          facebook: data.social_facebook || "#",
        });
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-brand-950 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-gold-400">
            Follow Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-4 leading-tight">
            Connect <span className="gradient-text">With Us</span>
          </h2>
          <p className="text-lg text-brand-300 max-w-2xl mx-auto mt-6">
            Join our community and stay updated with the latest news, releases, and exclusive content
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div
            className="rounded-3xl bg-gradient-to-br from-brand-800/80 to-brand-900/90 border border-brand-700/50 shadow-2xl backdrop-blur-3xl p-10"
            style={{ boxShadow: "0 0 50px rgba(212, 168, 83, 0.15), 0 0 80px rgba(196, 154, 60, 0.1)" }}
          >
            <div className="flex flex-wrap justify-center gap-10">
              {/* Instagram */}
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="social-icon group">
                <div
                  className="social-icon-box"
                  style={{ "--hover-bg": "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)", "--hover-shadow": "0 0 25px rgba(225, 48, 108, 0.6)" } as React.CSSProperties}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <span className="social-icon-label">Instagram</span>
              </a>

              {/* YouTube */}
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="social-icon group">
                <div
                  className="social-icon-box"
                  style={{ "--hover-bg": "#FF0000", "--hover-shadow": "0 0 25px rgba(255, 0, 0, 0.6)" } as React.CSSProperties}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <span className="social-icon-label">YouTube</span>
              </a>

              {/* Facebook */}
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="social-icon group">
                <div
                  className="social-icon-box"
                  style={{ "--hover-bg": "#1877F2", "--hover-shadow": "0 0 25px rgba(24, 119, 242, 0.6)" } as React.CSSProperties}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="social-icon-label">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
