import React, { useEffect, useState, useCallback } from "react";
import classNames from "classnames";
import { AiOutlineArrowUp } from "react-icons/ai";

interface ScrollToTopButtonProps {
  scrollRef: React.RefObject<HTMLElement>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollRef }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      setShowBackToTop(scrollTop > 300);
    }
  }, [scrollRef]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, scrollRef]);

  return (
    <button
      onClick={scrollToTop}
      className={classNames(
        "sticky bottom-0 bg-primary-500 text-white rounded-full p-3 shadow-lg transition-transform duration-300 ease-in-out",
        {
          "opacity-100 translate-y-0": showBackToTop,
          "opacity-0 translate-y-8": !showBackToTop,
        },
      )}
      aria-label="Back to Top"
    >
      <AiOutlineArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
