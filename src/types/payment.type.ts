interface EmployerId {
  _id: string;
  name: string;
  email: string;
  companyName: string;
  phone: string;
  stipeCustomerId: string;
}

interface ISubscription {
  _id: string;
  employerId: EmployerId;
  subscriptionType: string;
  durationInMonths: number;
  amount: number;
  discount: number;
  finalAmount: number;
  paymentId: string;
  paymentMethod: string;
  buyTime: string;
  expireDate: string;
  status: string;
  isDeleted: boolean;
  isRenewal: boolean;
  stripeInvoiceId: string;
  stripeHostedInvoiceUrl: string;
  createdAt: string;
  updatedAt: string;
  subscriptionId: string;
}

export type { ISubscription };
