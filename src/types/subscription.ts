export type Subscription = {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly' | 'weekly';
  nextPayment: Date;
  color: string;
  category: string;
  trialEnds?: Date;
  description?: string;
};