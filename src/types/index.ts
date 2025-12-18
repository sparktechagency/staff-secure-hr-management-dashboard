export * from "./auth.type";
export * from "./user.type";
export * from "./conversation.type";
export * from "./job.type";
export * from "./payment.type";

export interface INotification {
  type: string; // e.g., "other"
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  isRead: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface IJobPlacement {
  _id: string;
  employerId: {
    _id: string;
    name: string;
    email: string;
    companyName: string;
  };
  title: string;
  status: string; // e.g., "Cvs Sent", "Interview Scheduled", etc.
  createdAt: string; // ISO date string
}
