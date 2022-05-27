import { SessionProvider as AuthenticationProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthenticationProvider session={pageProps.session}>
			<Header />
			<Component {...pageProps} />
		</AuthenticationProvider>
	);
}

export default MyApp;
