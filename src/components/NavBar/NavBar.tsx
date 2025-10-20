"use client"
import styles from './NavBar.module.css';

export default function NavBar() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  
  return(
    <nav className={styles.NavBar}>
      {[
        { label: "About", id: "about" },
        { label: "Tech", id: "tech" },
        { label: "Projects", id: "projects" },
        { label: "Contact", id: "contact" },
      ].map((link) => (
        <button key={link.id} onClick={() => scrollTo(link.id)} className={styles.link}>
          {link.label}
        </button>
      ))}
    </nav>
  );
}
