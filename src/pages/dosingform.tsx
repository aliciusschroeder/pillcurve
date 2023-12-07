// src/pages/page.tsx

import React from 'react';
import Head from 'next/head';
import DosingForm from '../components/DosingForm';
import Footer from '~/components/Footer';

const Home: React.FC = () => {
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

export default Home;