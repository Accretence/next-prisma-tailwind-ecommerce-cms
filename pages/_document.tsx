import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link href="/manifest.json" rel="manifest" />
				<link href="/favicon.ico" rel="shortcut icon" />
				<link href="/ios.png" rel="apple-touch-icon" />
				<meta content="#0C0C0C" name="theme-color" />
				<meta content="#0C0C0C" name="msapplication-TileColor" />
			</Head>
			<body className="min-h-screen font-sans antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
