// src/pages/page.tsx

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Head from 'next/head';
import Footer from '~/components/Footer';

import DosingForm from '../components/DosingForm';
import presets from '../config/presets';
import { encodeState } from '../utils/urlStateUtils';

const DosingFormPage: React.FC = () => {
    const router = useRouter();
  
    useEffect(() => {
      if (!router.isReady) return;
  
      // If there's no state in the URL, redirect to the default state
      if (!router.query.state) {
        alert('No state found in URL, redirecting to default state');
        const defaultState = encodeState({
          selectedPreset: presets[0]!.id,
          tMax: presets[0]!.tMax,
          halfLife: presets[0]!.halfLife,
          startingTime: 1,
          doses: [100],
          times: [0],
        });
        router.replace(`?state=${defaultState}`, undefined, { shallow: true });
      }
    }, [router.isReady]);
  
    if (!router.isReady) return null;
  
    return (
        <>
            <Head>
                <title>PillCurve</title>
                <meta name="description" content="Handy tool to calculate remaining pill effects" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 flex flex-col md:flex-row bg-gray-900 text-gray-100">
                    <DosingForm />
                </main>
                <Footer />
            </div>
        </>
    );
  };
  

export default DosingFormPage;