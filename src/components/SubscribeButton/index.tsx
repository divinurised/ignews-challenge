import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../config/api';
import { getStripeJs } from '../../config/stripe-client';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
	priceId: string;
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
	const session: any = useSession();
	const router = useRouter();
	console.log(session);

	const handleSubscribe = async () => {
		if (!session) {
			signIn('github');
			return;
		}

		if (session.data.activeSubscription) {
			router.push('/posts');
			return;
		}

		try {
			const response = await api.post('/subscribe');
			const { sessionId } = response.data;
			const stripe = await getStripeJs();
			await stripe?.redirectToCheckout({
				sessionId,
			});
		} catch (error: any) {
			alert(error.message);
		}
	};

	return (
		<button
			type="button"
			className={styles.subscribeButton}
			onClick={handleSubscribe}
		>
			Subscribe now
		</button>
	);
};
