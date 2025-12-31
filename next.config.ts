import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Enable static exports for simpler hosting if needed
	// output: 'export',

	// Image optimization settings
	images: {
		unoptimized: true, // Since we're using base64 data URLs
	},
};

export default nextConfig;
