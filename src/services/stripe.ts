const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export async function createCheckoutSession(userId: string) {
  if (!STRIPE_KEY || STRIPE_KEY === 'your_stripe_publishable_key_here') {
    throw new Error('Stripe is not configured. Please add your Stripe publishable key to .env');
  }

  alert('To complete Stripe integration:\n\n1. Get your Stripe API keys from https://dashboard.stripe.com/apikeys\n2. Add VITE_STRIPE_PUBLISHABLE_KEY to your .env file\n3. Configure webhook endpoint in Stripe Dashboard\n4. Point webhook to your Edge Function URL\n\nFor now, this is a placeholder for the payment flow.');

  return null;
}

export function isStripeConfigured(): boolean {
  return STRIPE_KEY !== undefined && STRIPE_KEY !== 'your_stripe_publishable_key_here';
}
