interface SalaryRange {
  min: number;
  max: number;
}

interface IEmployer {
  _id: string;
  name: string;
  companyName: string;
  email: string;
}

interface IJob {
  _id: string;
  employerId: IEmployer;
  jobReferralCode: string;

  title: string;
  location: string;
  jobType: "Onsite" | "Remote" | "Hybrid";
  workType: "Full-Time" | "Part-Time" | "Contract";

  experience: number;
  workersNeeded: number;

  salaryRange: SalaryRange;

  description: string;
  keyResponsibilities: string[];
  requirements: string[];
  benefits: string[];
  skillsRequired: string[];

  lastApplyDate: string; // ISO date string
  status: "New" | "Active" | "Closed";

  isDeleted: boolean;

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  totalApplicant: number;
}

interface IAppliciantData {
  _id: string;
  candidateId: {
    _id: string;
    name: string;
    email: string;
    cv: string;
  };
  status: "applied" | "forwarded" | "selected" | "rejected";
  appliedAt: string;
}

interface IApplication {
  _id: string;

  candidateId: {
    _id: string;
    name: string;
    email: string;
    designation: string;
    cv: string;
  };

  jobId: {
    _id: string;
    title: string;
  };

  jobProviderOwnerId: {
    _id: string;
    name: string;
    email: string;
    companyName: string;
  };

  status: "applied" | "forwarded" | "selected" | "rejected";
  adminNotes: string;
  appliedAt: string;
  forwardedAt: string | null;
}

export type { IJob, IAppliciantData, IApplication };
