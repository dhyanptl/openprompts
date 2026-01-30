"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  href?: string;
  type?: undefined;
}

interface Separator {
  type: "separator";
  title?: undefined;
  icon?: undefined;
  href?: undefined;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition: Transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
}: ExpandableTabsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Find the index of the tab that matches the current route
  const getActiveIndex = () => {
    let tabIndex = 0;
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      if (tab.type === "separator") continue;
      if ((tab as Tab).href === location.pathname) {
        return tabIndex;
      }
      tabIndex++;
    }
    return null;
  };

  const [selected, setSelected] = React.useState<number | null>(getActiveIndex);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef<HTMLDivElement>(null);

  // Update selected when route changes
  React.useEffect(() => {
    setSelected(getActiveIndex());
  }, [location.pathname]);

  useOnClickOutside(outsideClickRef as React.RefObject<HTMLDivElement>, () => {
    setHovered(null);
  });

  // Determine which tab should be visually expanded
  const activeIndex = hovered !== null ? hovered : selected;

  const handleSelect = (index: number, href?: string) => {
    setSelected(index);
    onChange?.(index);
    if (href) {
      navigate(href);
    }
  };

  const SeparatorComponent = () => (
    <div className="mx-1 h-4 w-px bg-border" />
  );

  let tabIndex = -1;

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-1.5 shadow-lg",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <SeparatorComponent key={`separator-${index}`} />;
        }

        tabIndex++;
        const currentTabIndex = tabIndex;
        const tabItem = tab as Tab;
        const Icon = tabItem.icon;
        const isExpanded = activeIndex === currentTabIndex;
        return (
          <motion.button
            key={tabItem.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isExpanded}
            onClick={() => handleSelect(currentTabIndex, tabItem.href)}
            onMouseEnter={() => setHovered(currentTabIndex)}
            onMouseLeave={() => setHovered(null)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              selected === currentTabIndex
                ? cn("bg-muted", activeColor)
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tabItem.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}