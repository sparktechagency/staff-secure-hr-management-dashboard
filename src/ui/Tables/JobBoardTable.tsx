import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseButton from "../Button/ReuseButton";
import { IJob } from "../../types";
import { formatDate } from "../../utils/dateFormet";

// Define the type for the props
interface JobBoardTableProps {
  data: IJob[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IJob) => void;
  showAllCandidatesModal: (record: IJob) => void;
  showAISuggestCandidatesModal: (record: IJob) => void;
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const JobBoardTable: React.FC<JobBoardTableProps> = ({
  data,
  loading,
  showViewModal,
  showAllCandidatesModal,
  showAISuggestCandidatesModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      fixed: "left",
    },
    {
      title: "Candidate Required For",
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "Employer Information",
      dataIndex: "employerId",
      key: "employerId",
      render: (emp: { name: string; companyName: string }) => (
        <div>
          <p>{emp.companyName}</p>
          <p className="text-gray-500 text-base">{emp.name}</p>
        </div>
      ),
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (loc: string, record: IJob) => (
        <span className="text-gray-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {loc} - {record?.area} - {record?.postalCode}
        </span>
      ),
    },
    {
      title: "County",
      dataIndex: "county",
      key: "county",
    },
    {
      title: "Salary Range",
      dataIndex: "salaryRange",
      key: "salaryRange",
      align: "center" as const,
      render: (_: IJob, record: IJob) => (
        <span className="">
          £{record?.salaryRange?.min} - £{record?.salaryRange?.max} / {record?.paymentType !== "Monthly" ? "Hour" : "Month"}
        </span>
      ),
    },
    {
      title: "Years of Experience",
      dataIndex: "experience",
      key: "experience",
      align: "center" as const,
      render: (exp: number) => <span>{exp} Yrs</span>,
    },
    {
      title: "Hour Required per week",
      dataIndex: "hourlyRequired",
      key: "hourlyRequired",
      align: "center" as const,
    },
    {
      title: "Employment type",
      dataIndex: "workType",
      key: "workType",
      render: (_: IJob, record: IJob) => (
        <span className="">{record.workType === "Full-Time" ? "Full Time" : record.workType === "Part-Time" ? "Part Time" : record.workType + " - " + record.lengthOfWork}</span>
      ),
      align: "center" as const,
    },
    {
      title: "Work arrangement",
      dataIndex: "jobType",
      key: "jobType",
      align: "center" as const,
    },
    {
      title: "Candidate Apply",
      dataIndex: "totalApplicant",
      key: "totalApplicant",
      align: "center" as const,
    },
    {
      title: "View Candidates",
      dataIndex: "candidateApply",
      key: "candidateApply",
      align: "center" as const,
      render: (_: IJob, record: IJob) => (
        <Tooltip title="Send CV">
          <ReuseButton
            onClick={() => showAllCandidatesModal(record)}
            variant="outline"
            className="!w-fit !py-1 !px-1"
          >
            View
          </ReuseButton>
        </Tooltip>
      ),
    },
    {
      title: "Project Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="text-ellipsis overflow-hidden whitespace-nowrap">
            {text?.length > 20 ? text.slice(0, 20) + "..." : text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      align: "center" as const,
      render: (date: Date) => <span>{formatDate(date)}</span>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      align: "center" as const,
    },
    {
      title: "Finish Time",
      dataIndex: "finishTime",
      key: "finishTime",
      align: "center" as const,
    },
    {
      title: "Post Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center" as const,
      render: (date: Date) => <span>{formatDate(date)}</span>,
    },
    {
      title: "Closing Date of Project",
      dataIndex: "lastApplyDate",
      key: "lastApplyDate",
      align: "center" as const,
      render: (date: Date) => <span>{formatDate(date)}</span>,
    },
    {
      title: "Referral Code",
      dataIndex: "jobReferralCode",
      key: "jobReferralCode",
      align: "center" as const,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (status: string) => (
        <span
          className={`${status === "New" ? "text-secondary-color" : "text-success"
            }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Send CV",
      key: "cv",
      align: "center" as const,
      render: (_: IJob, record: IJob) => (
        <Tooltip title="Send CV">
          <ReuseButton
            onClick={() => {
              showAISuggestCandidatesModal(record);
            }}
            variant="secondary"
            className="!w-fit !py-1 !px-1"
          >
            Send CVs
          </ReuseButton>
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: IJob, record: IJob) => (
        <Space size="middle">
          <Tooltip title="View">
            <GoEye
              className="text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"id"}
    />
  );
};

export default JobBoardTable;
