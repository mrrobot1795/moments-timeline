import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--font-dm-sans',
});

export const metadata: Metadata = {
	title: 'Moments | Our Interactive Image Timeline',
	description: 'Create beautiful visual timelines with our images',
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={dmSans.variable}>
			<body className="font-sans antialiased">{children}</body>
		</html>
	);
}
