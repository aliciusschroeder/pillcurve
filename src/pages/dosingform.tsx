// ./src/pages/dosingform.tsx

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Footer from '~/components/Footer';
import DosingForm from '../components/DosingForm';
import presets from '../config/presets';
import { encodeState } from '../utils/urlStateUtils';

const DosingFormPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (!router.query.state) {
      if (presets.length === 0) {
        console.error('No presets available');
        return;
      }

      try {
        const defaultState = encodeState({
          selectedPreset: presets[0]?.id ?? 'custom',
          tMax: presets[0]?.tMax ?? 42,
          halfLife: presets[0]?.halfLife ?? 42,
          startingTime: 1,
          doses: [100],
          times: [0],
        });
        router.replace(`?state=${defaultState}`, undefined, { shallow: true });
      } catch (error) {
        console.error('Failed to encode state:', error);
      }
    }
  }, [router.isReady, router.query.state]);

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

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
