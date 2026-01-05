interface IEmployer {
  _id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | string; // added flexibility for other statuses
  packageType: string | null;
  renewalDate: string | null; // could also be Date if you plan to parse it
  cvUsage: string; // "0/0" as string
  hasUnreadMessage: boolean;
}

interface ICandidate {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  role: string;
  companyName: string;
  phone: string;
  candidateProfileId: {
    _id: string;
    location: string;
    area: string;
    postalCode: string;
    county: string;
    designation: string;
    dateOfBirth: string; // ISO string
    yearsOfExperience: number;
    qualifications: string[];
    skills: string[];
    availability: string;
    bio: string;
    cv: string;
    documentAndCertifications: string[];
  };
  status: string;
  isDeleted: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export type { IEmployer, ICandidate };
