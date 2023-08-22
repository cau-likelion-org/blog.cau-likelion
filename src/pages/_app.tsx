import Header from '@/components/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { styled } from 'styled-components';
import Head from 'next/head';
import Script from 'next/script';
import '../FirebaseInit';
import { initializeApp } from 'firebase/app';
import { useEffect } from 'react';
import { getFireBaseToken } from '../FirebaseInit';
import axios from 'axios';
const firebaseConfig = {
  apiKey: 'AIzaSyCPZojB-MYCEJ-Q8fFzaAGNxz-ZS0erg1I',
  authDomain: 'blog-cau-likelion.firebaseapp.com',
  projectId: 'blog-cau-likelion',
  storageBucket: 'blog-cau-likelion.appspot.com',
  messagingSenderId: '93033443629',
  appId: '1:93033443629:web:d4ef31afbc2825bc7963a4',
  measurementId: 'G-801E6Y0Z1D',
};

const app = initializeApp(firebaseConfig);

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    fireBaseMessageToken();
  }, []);
  const fireBaseMessageToken = async () => {
    const fcmtoken = await getFireBaseToken();
    const tokens = await axios.get('http://front.cau-likelion.org/fcmtoken');
    if (tokens) {
      const result = tokens.data.find(
        ({ token }: { token: string }) => token === fcmtoken
      );
      if (!result) {
        const response = await axios.post(
          'http://front.cau-likelion.org/fcmtoken',
          {
            token: fcmtoken,
          }
        );
      }
    }
  };
  return (
    <>
      <Head>
        <title>LikeLionCAU Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="CAU-Likelion Blog" />
        <meta
          name="keywords"
          content="IT개발, 웹개발, 중앙대학교, 멋쟁이사자처럼, 동아리, 블로그, 피드"
        />

        <meta
          property="og:description"
          content="멋쟁이 사자들을 위한 블로그 피드"
        />
        <meta property="og:url" content="https://blog.cau-likelion.org/" />
        <meta
          property="og:image"
          content="https://cau-likelion.org/image/logoThumbnail.png"
        />
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZC5CFY95Y5" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-ZC5CFY95Y5');
        `}
      </Script>
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1440px) {
    padding: 100px 100px 100px 100px;
  }

  @media (max-width: 786px) {
    padding: 70px 20px;
  }
  padding: 100px 160px 100px 160px;
`;
