const upstream = 'https://bento.me';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const upstreamUrl = new URL(upstream);

		// Allow CORS
		if (request.method === 'OPTIONS') {
			const response = new Response(null, {
				status: 200,
			});
			response.headers.set('Access-Control-Allow-Headers', 'authorization,content-type');
			response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
			response.headers.set('Access-Control-Allow-Origin', '*');
			return response;
		}

		// Homepage
		if (url.pathname === '/') {
			const bentoUsername = env.BENTO_USERNAME;

			if (!bentoUsername) {
				return new Response('Set your Bento Username first.', { status: 500 });
			}

			return fetch(`${upstream}/${bentoUsername}`) as unknown as Promise<Response>;
		}

		// for static assets
		const override_headers = new Headers(request.headers);
		override_headers.set('Host', upstreamUrl.hostname);
		override_headers.set('Refer', url.origin);

		const upstreamPath = new URL(url.pathname, upstreamUrl.origin);
		return fetch(upstreamPath, {
			method: request.method,
			headers: override_headers,
			body: request.body,
		}) as unknown as Promise<Response>;
	},
} satisfies ExportedHandler<Env>;
