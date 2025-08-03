
import React from "react";
import "../index.css";


const AegisLoader = () => (
  <div className="w-full flex flex-col items-center justify-center py-4">
    <div className="loader w-full flex flex-col items-center justify-center">
      <div className="loading-bar-background bg-secondary w-full max-w-[400px] h-[56px] flex items-center justify-center">
        <div className="loading-bar">
          <div className="white-bars-container">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="white-bar"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="loading-text text-accent mt-3 text-lg font-semibold flex items-center">
        Loading
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
    </div>
  </div>
);

export default AegisLoader;
