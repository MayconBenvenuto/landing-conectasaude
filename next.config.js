/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: '/:all*(png|jpg|jpeg|gif|svg|webp)',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
				],
			},
			{
				source: '/:all*(js|css)',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
				],
			},
			{
				source: '/video/:path*',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
				],
			},
		];
	},
};

module.exports = nextConfig;
