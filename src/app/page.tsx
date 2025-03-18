"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search, Moon, Sun } from "lucide-react";
import FilterDropdown from "@/components/FilterDropdown";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={darkMode ? styles.darkContainer : styles.lightContainer}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>🌿 HERBAL GARDEN</div>

        {isMobile ? (
          <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        ) : (
          <ul style={styles.navLinks}>
            {["/", "/forest", "/pond", "/quiz",].map((path, index) => (
              <Link
                key={index}
                href={path}
                style={{
                  ...styles.navItem,
                  color: pathname === path ? "#388E3C" : darkMode ? "#ffffff" : "#222", // Active color + dark mode handling
                }}
              >
                {path === "/" ? "Home" : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
              </Link>
            ))}
          </ul>
        )}

        <div style={styles.navRight}>
          {/* <div style={styles.searchContainer}>
            <input type="text" placeholder="Search..." style={styles.searchInput} />
            <Search size={18} style={styles.searchIcon} />
          </div> */}
          <FilterDropdown />
          <button onClick={() => setDarkMode(!darkMode)} style={styles.darkModeButton}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Only when hamburger is clicked) */}
      {menuOpen && isMobile && (
        <ul style={styles.mobileMenu}>
          {["/", "/forest", "/pond", "/explore", "/contact"].map((path, index) => (
            <Link
              key={index}
              href={path}
              style={{
                ...styles.mobileMenuItem,
                color: pathname === path ? "#388E3C" : darkMode ? "#ffffff" : "#222",
              }}
            >
              {path === "/" ? "Home" : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
            </Link>
          ))}
        </ul>
      )}

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>
            Explore the wonders of <span style={styles.ayurvedaText}> Ayurveda </span> with our Virtual Herbal Garden
          </h1>
          <p style={styles.heroSubtitle}>
            A digital gateway to nature's healing secrets – explore, learn, and experience the magic of medicinal plants in an interactive 3D environment.
          </p>
          <Link href="/garden" style={styles.exploreButton}>
            Explore →
          </Link>
        </div>

        <div style={styles.heroImage}>
          <img src="/images/herbal_plants.png" alt="Herbal Plant" style={styles.plantImage} />
        </div>
      </section>
    </div>
  );
}

/* Inline Styles */
const styles: { [key: string]: React.CSSProperties } = {
  lightContainer: {
    backgroundColor: "#ffffff",
    color: "#222",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease-in-out",
  },
  darkContainer: {
    backgroundColor: "#121212",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease-in-out",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "600",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
    fontSize: "16px",
  },
  navItem: {
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight:"revert-layer"
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  searchContainer: {
    position: "relative",
  },
  searchInput: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    width: "150px",
  },
  searchIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#777",
  },
  darkModeButton: {
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#777",
  },
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "40px",
    marginTop: "40px",
    flexWrap: "wrap",
  },
  heroText: {
    maxWidth: "50%",
    minWidth: "300px",
  },
  heroTitle: {
    fontSize: "50px",
    fontWeight: "600",
    lineHeight: "1.2",
  },
  heroSubtitle: {
    marginTop: "10px",
    color: "#555",
    fontFamily: "cursive",
  },
  ayurvedaText: {
    color: "#388E3C",
    fontFamily: "cursive",
  },
  exploreButton: {
    marginTop: "20px",
    display: "inline-block",
    backgroundColor: "#388E3C",
    color: "white",
    padding: "12px 24px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center",
  },
  heroImage: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    minWidth: "400px",
  },
  plantImage: {
    width: "450px",
    borderRadius: "10px",
  },
  hamburger: {
    display: "block",
    cursor: "pointer",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    position: "absolute",
    top: "60px",
    left: "0",
    width: "100%",
    zIndex: 100,
  },
  mobileMenuItem: {
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    textDecoration: "none",
  },
};

