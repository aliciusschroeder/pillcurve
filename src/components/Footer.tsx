// src/components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-700 text-gray-100 p-4 border-t border-gray-600">
            {/*<div className="flex flex-col items-center justify-center">
                <label>Copyright 2023 by Alicius Schröder</label>
    </div>*/}
            <div className="flex flex-col items-center justify-center">
                <div>
                    © 2023 Alicius Schröder |&nbsp;
                    <a
                        href="https://github.com/aliciusschroeder/pillcurve"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-100 underline"
                    >
                        Visit GitHub repo
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;