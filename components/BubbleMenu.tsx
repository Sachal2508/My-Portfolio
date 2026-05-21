"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";

import styles from "./BubbleMenu.module.css";

export type BubbleMenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
  accent?: string;
};

const DEFAULT_ITEMS: BubbleMenuItem[] = [
  { label: "home",     href: "#home",     ariaLabel: "Home",     accent: "#f5f5f5" },
  { label: "about",    href: "#about",    ariaLabel: "About",    accent: "#0be7ff" },
  { label: "skills",   href: "#skills",   ariaLabel: "Skills",   accent: "#f5f5f5" },
  { label: "projects", href: "#projects", ariaLabel: "Projects", accent: "#f5f5f5" },
  { label: "contact",  href: "#contact",  ariaLabel: "Contact",  accent: "#ff3a5c" },
];

type BubbleMenuProps = {
  logo: ReactNode;
  items?: BubbleMenuItem[];
  rightAccessory?: ReactNode;
  fixedActions?: boolean;
  className?: string;
  style?: CSSProperties;
  onMenuClick?: (open: boolean) => void;
  onItemClick?: (item: BubbleMenuItem) => void;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

export default function BubbleMenu({
  logo,
  items,
  rightAccessory,
  fixedActions = false,
  className,
  style,
  onMenuClick,
  onItemClick,
  menuAriaLabel = "Toggle menu",
  menuBg = "rgba(15, 15, 15, 0.72)",
  menuContentColor = "#f5f5f5",
  useFixedPosition = false,
  animationEase = "power3.out",
  animationDuration = 0.6,
  staggerDelay = 0.07,
}: BubbleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const backdropRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  const rootClassName = [
    styles.root,
    useFixedPosition ? styles.fixed : styles.absolute,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const actionsClassName = [
    styles.actions,
    fixedActions ? styles.actionsFixed : "",
  ]
    .filter(Boolean)
    .join(" ");

  const closeMenu = () => { setIsOpen(false); onMenuClick?.(false); };
  const openMenu  = () => { setIsMounted(true); setIsOpen(true); onMenuClick?.(true); };
  const toggleMenu = () => (isOpen ? closeMenu() : openMenu());

  useEffect(() => {
    const backdrop = backdropRef.current;
    const itemsToAnimate = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const labelsToAnimate = labelRefs.current.filter(Boolean) as HTMLSpanElement[];

    if (!backdrop || !itemsToAnimate.length) return;

    gsap.killTweensOf([backdrop, ...itemsToAnimate, ...labelsToAnimate]);

    if (isOpen) {
      gsap.set(backdrop, { pointerEvents: "auto", autoAlpha: 1 });
      gsap.set(itemsToAnimate, { autoAlpha: 0, y: 40, skewY: 6 });
      gsap.set(labelsToAnimate, { autoAlpha: 0 });

      const tl = gsap.timeline();
      tl.to(backdrop, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });

      itemsToAnimate.forEach((item, index) => {
        const label = labelsToAnimate[index];
        const delay = index * staggerDelay;

        tl.to(item,  { autoAlpha: 1, y: 0, skewY: 0, duration: animationDuration, ease: animationEase }, delay);
        if (label) {
          tl.to(label, { autoAlpha: 1, duration: animationDuration * 0.8, ease: "power2.out" }, delay + 0.05);
        }
      });
    } else if (isMounted) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(backdrop, { autoAlpha: 0, pointerEvents: "none" });
          setIsMounted(false);
        },
      });

      tl.to(itemsToAnimate, {
        autoAlpha: 0, y: 20, skewY: -3,
        duration: 0.25, ease: "power2.in", stagger: 0.03,
      });
      tl.to(backdrop, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.05);
    }
  }, [animationDuration, animationEase, isMounted, isOpen, staggerDelay]);

  const handleItemClick = (item: BubbleMenuItem) => {
    onItemClick?.(item);
    closeMenu();

    if (item.href.startsWith("#")) {
      window.setTimeout(() => {
        const target = document.querySelector(item.href);
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 220);
    }
  };

  return (
    <>
      <nav className={rootClassName} style={style} aria-label="Main navigation">
        <div className={styles.shell}>
          <div className={styles.brandBubble} style={{ background: menuBg, color: menuContentColor }}>
            {logo}
          </div>

          <div className={actionsClassName}>
            {rightAccessory}

            <button
              type="button"
              className={`${styles.bubble} ${styles.toggleBubble} ${isOpen ? styles.open : ""}`}
              onClick={toggleMenu}
              aria-label={menuAriaLabel}
              aria-pressed={isOpen}
              style={{ background: menuBg, color: menuContentColor }}
            >
              <span className={styles.menuLine} style={{ background: menuContentColor }} />
              <span className={`${styles.menuLine} ${styles.shortLine}`} style={{ background: menuContentColor }} />
            </button>
          </div>
        </div>
      </nav>

      {isMounted && (
        <div
          className={`${styles.overlay} ${useFixedPosition ? styles.fixed : styles.absolute}`}
          aria-hidden={!isOpen}
        >
          <button
            ref={backdropRef}
            type="button"
            className={styles.backdrop}
            aria-label="Close menu overlay"
            onClick={closeMenu}
          />

          <div className={styles.panel}>
            <ul className={styles.list} role="menu" aria-label="Menu links">
              {menuItems.map((item, index) => (
                <li key={item.href} className={styles.listItem} role="none">
                  <a
                    role="menuitem"
                    href={item.href}
                    aria-label={item.ariaLabel || item.label}
                    className={styles.pill}
                    onClick={(e) => { e.preventDefault(); handleItemClick(item); }}
                    style={{ ["--accent" as string]: item.accent ?? "#f5f5f5" } as CSSProperties}
                    ref={(el) => { itemRefs.current[index] = el; }}
                  >
                    <span
                      className={styles.pillLabel}
                      ref={(el) => { labelRefs.current[index] = el; }}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}