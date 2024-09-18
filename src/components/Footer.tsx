// src/components/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-600 bg-gray-700 p-4 text-gray-100">
      <div className="flex flex-col items-center justify-center">
        <div>
          © 2023-2024 Alicius Schröder |&nbsp;
          <a
            href="https://github.com/aliciusschroeder/pillcurve"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-100"
          >
            Visit GitHub repo
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
