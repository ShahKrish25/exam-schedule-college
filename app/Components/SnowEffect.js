"use client"; // if you're using Next.js app directory
import React, { useEffect } from "react";
import $ from "jquery";
import "/public/let-it-snow.css" // Adjust the path based on where your CSS is
if (typeof window !== "undefined") {
    window.$ = $;
    window.jQuery = $;
  }
  

const SnowEffect = () => {
  useEffect(() => {
    // Dynamically load the plugin script
    const script = document.createElement("script");
    script.src = "/let-it-snow.min.js"; // Path from public folder
    script.onload = () => {
      // Once script is loaded, initialize plugin
      $.letItSnow(".snow-container", {
        stickyFlakes: "lis-flake--js",
        makeFlakes: true,
        sticky: true,
      });
    };
    document.body.appendChild(script);

    return () => {
      // Optional: Clean-up if needed
    };
  }, []);

  return <div className="snow-container w-full h-full fixed top-0 left-0 pointer-events-none z-50" />;
};

export default SnowEffect;
