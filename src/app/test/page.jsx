"use client";
import { useEffect } from "react";
import styles from "./page.module.css";

const Page = () => {
  useEffect(() => {
    const svg = document.querySelector("svg.curve");
    const path = document.querySelector("svg.curve path");
    const pathLength = path.getTotalLength();

    // Initially set the strokeDasharray and strokeDashoffset
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const handleScroll = () => {
      // Get the scroll position of the page
      const scrollValue = window.scrollY;

      // Get the height of the document
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Calculate scroll percentage
      let scrollPercent = scrollValue / documentHeight;

      // If we are in the last 25% of the path, reduce the scroll speed
      if (scrollPercent > 0.75) {
        const slowdownFactor = (scrollPercent - 0.75) * 2; // Increases as you approach 100%
        scrollPercent = 0.75 + slowdownFactor / 2; // Adjust to slow down
      }

      // Calculate the current position of the stroke
      const currentPoint = scrollPercent * pathLength * 1.1;

      // Update the strokeDashoffset to animate the path, apply slow down factor
      path.style.strokeDashoffset = pathLength - currentPoint;
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.svgContainer}>
        <svg
          width="100%"
          height="6000"
          className="curve"
          viewBox="0 0 713 5178"
          fill="none"
        >
          <path
            d="M602.5 0V414C602.5 447.137 575.637 474 542.5 474H62.5C29.3629 474 2.5 500.863 2.5 534V947C2.5 980.137 29.3629 1007 62.5 1007H542.5C575.637 1007 602.5 1033.86 602.5 1067V1374L499 1477.5L602.5 1581L706 1477.5H602.5V2343L499 2446.5L602.5 2550L706 2446.5H602.5V3201.5L499 3305L602.5 3408.5L706 3305H602.5C602.5 3305 602.5 3762.41 602.5 4055.5L499 4159L602.5 4262.5L706 4159H602.5V4967M602.5 4967L499 5070.5L602.5 5174L706 5070.5L602.5 4967Z"
            stroke="black"
            strokeWidth="5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Page;
