// src/pages/index.tsx

import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Footer from "~/components/Footer";
import styles from "./index.module.css";

const Home: NextPage = () => {
  /* Please Note: showAlert is currently without function and the conditions
     below are intentionally unreachable. This might come handy should we decide to implement
     functions requiring external API's based on a bring-your-own-key model */
  const [showAlert, setShowAlert] = useState(0);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 md:flex-row">
        <div className="mx-auto w-full max-w-2xl space-y-6 py-10 text-center">
          <h1 className="mb-10 text-5xl font-bold text-white">
            Welcome to PillCurve
          </h1>
          {showAlert === 1 && (
            <div className="relative mb-6 rounded-md bg-blue-200 px-6 py-4 text-sm text-blue-900 shadow-lg sm:text-base">
              Please note that certain functions of this project may not work as
              expected outside of the development environment because the API
              keys required for full functionality are not shipped with the
              public production version.
              <br />
              <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-blue-700">
                Enter API Key
              </button>
              <button
                className="absolute right-2 top-2 text-xl"
                onClick={() => setShowAlert(0)}
              >
                &times;
              </button>
            </div>
          )}
          {showAlert === 2 && (
            <div className="relative mb-6 rounded-md bg-green-200 px-6 py-4 text-sm text-green-900 shadow-lg sm:text-base">
              Locally saved API key will be used
              <br />
              <button className="mt-4 rounded bg-red-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-red-700">
                Remove locally stored keys
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <CSSTransition
              in={true}
              appear={true}
              timeout={500}
              classNames={styles.fade}
            >
              <div className="transform transition-all duration-200 ease-in-out hover:scale-110">
                <Link
                  href="/dosingform"
                  className="block rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-10 text-white shadow-lg transition-colors duration-200 hover:text-gray-100"
                >
                  <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full border-4 border-white"></div>
                  <p className="mt-4 text-xl font-bold">Halbwertszeitrechner</p>
                </Link>
              </div>
            </CSSTransition>
            <CSSTransition
              in={true}
              appear={true}
              timeout={700}
              classNames={styles.fade}
            >
              <div className="transform transition-all duration-200 ease-in-out hover:scale-110">
                <Link
                  href="#"
                  className="block rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-10 text-white shadow-lg transition-colors duration-200 hover:text-gray-100"
                >
                  <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full border-4 border-white"></div>
                  <p className="mt-4 text-xl font-bold">TBD</p>
                </Link>
              </div>
            </CSSTransition>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
