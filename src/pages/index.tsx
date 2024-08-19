import { CSSTransition } from 'react-transition-group';
import { useState } from "react";
import Link from "next/link";
import { type NextPage } from "next";
import Footer from '~/components/Footer';
import styles from './index.module.css';

const Home: NextPage = () => {
  const [showAlert, setShowAlert] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col md:flex-row bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100">
        <div className="text-center py-10 space-y-6 w-full max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-10">
            Welcome to PillCurve
          </h1>
          {showAlert === 1 && (
            <div className="bg-blue-200 text-blue-900 rounded-md px-6 py-4 mb-6 text-sm sm:text-base shadow-lg relative">
              Please note that certain functions of this project may not work as expected outside of the development environment because the API keys required for full functionality are not shipped with the public production version.<br />
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Enter API Key
              </button>
              <button className="absolute top-2 right-2 text-xl" onClick={() => setShowAlert(0)}>&times;</button>
            </div>
          )}
          {showAlert === 2 && (
            <div className="bg-green-200 text-green-900 rounded-md px-6 py-4 mb-6 text-sm sm:text-base shadow-lg relative">
              Locally saved API key will be used<br />
              <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Remove locally stored keys
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CSSTransition in={true} appear={true} timeout={500} classNames={styles.fade}>
              <div className="transition-all transform hover:scale-110 duration-200 ease-in-out">
                <Link href="/dosingform" className="block rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg p-10 text-white hover:text-gray-100 transition-colors duration-200">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-white animate-pulse"></div>
                  <p className="text-xl font-bold mt-4">
                    Halbwertszeitrechner
                  </p>
                </Link>
              </div>
            </CSSTransition>
            <CSSTransition in={true} appear={true} timeout={700} classNames={styles.fade}>
              <div className="transition-all transform hover:scale-110 duration-200 ease-in-out">
                <Link href="#" className="block rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg p-10 text-white hover:text-gray-100 transition-colors duration-200">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-white animate-pulse"></div>
                  <p className="text-xl font-bold mt-4">
                    TBD
                  </p>
                </Link>
              </div>
            </CSSTransition>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;