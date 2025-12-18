interface Employer {
  _id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
}

interface ISubscription {
  _id: string;
  employerId: Employer;
  subscriptionType: string; // e.g. "Platinum"
  durationInMonths: number;
  amount: number;
  discount: number;
  finalAmount: number;
  paymentId: string;
  paymentMethod: string; // e.g. "card"
  buyTime: string; // ISO date string
  expireDate: string; // ISO date string
  status: "success" | "pending" | "failed";
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type { ISubscription };
