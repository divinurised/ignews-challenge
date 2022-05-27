import Prismic from '@prismicio/client';

export const getPrismicClient = (request?: unknown) => {
	const prismic = Prismic.client(process.env.PRISMIC_ENDPOINT as string, {
		req: request,
		accessToken: process.env.PRISMIC_ACCESS_TOKEN,
	});
	return prismic;
};
