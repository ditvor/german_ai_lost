import '../styles/globals.css';
import type { AppProps } from 'next/app';

/**
 * Custom App component that wraps all pages
 * This is where we import global CSS and can add global layouts or providers
 */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}