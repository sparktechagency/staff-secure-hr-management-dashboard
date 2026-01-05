interface SalaryRange {
  min: number;
  max: number;
}

type workTypeType = "Full-Time" | "Part-Time" | "Temporary";
type JobStatus = "New" | "CVs Sent" | "Closed";

type JobType = "Onsite" | "Remote" | "Hybrid";

interface IEmployer {
  _id: string;
  name: string;
  companyName: string;
  email: string;
}

interface IJob {
  _id: string; // PK
  employerId: IEmployer; // FK

  title: string;
  location: string;
  county: string;
  area: string;
  postalCode: string;
  jobType: JobType; // Adjusted based on your data
  workType: workTypeType; // Adjusted based on your data
  lengthOfWork: string; // Changed to string to reflect the example ('6 Month')
  paymentType: "Hourly" | "Monthly" | "Weekly"; // Added 'Weekly' based on your data
  salaryRange: SalaryRange; // { min: number, max: number }
  overtimePayRate?: number; // Optional field based on your data
  annualPay: number;
  hourlyRequired: number;
  startDate: Date;
  startTime: string;
  finishTime: string;
  daysOfWork: string[]; // Array of weekdays
  experience: number; // Number of years
  description: string;
  candidateDuties: string[]; // List of duties
  documentationCertificates: string[]; // List of documents or certificates
  benefits: string[]; // List of benefits
  additionalInformation?: string; // Optional additional info field

  lastApplyDate: Date;
  status: JobStatus; // Adjusted status types based on the example
  isDeleted: boolean;
  jobReferralCode: string; // Unique identifier for the job

  createdAt: string;
  updatedAt: string;
  __v: number;
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

interface ITopApplication {
  _id: string;

  candidateId: {
    _id: string;
    name: string;
    email: string;
    designation: string;
    yearsOfExperience: number;
    bio: string;
    cv: string;
    location: string;
    area: string;
    postalCode: string;
    county: string;
    availability: string;
    skills: string[];
  };

  jobId: {
    _id: string;
    title: string;
    experience: number;
    description: string;
    skillsRequired: string[];
  };

  jobProviderOwnerId: {
    _id: string;
    name: string;
    email: string;
    companyName: string;
  };
  matchedSkills: string[];
  status: "applied" | "shortlisted" | "rejected" | "hired";
  aiScore: number;
  aiReason: string;
  aiMatchLevel: string;
  adminNotes: string;
  appliedAt: string; // ISO date
}

export type { IJob, IAppliciantData, IApplication, ITopApplication };
