/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseButton from "../Button/ReuseButton";

// Define the type for the props
interface JobBoardTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showDeleteModal: (record: any) => void;
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const JobBoardTable: React.FC<JobBoardTableProps> = ({
  data,
  loading,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "ID",
      key: "id",
      width: 80,
      render: (_: any, __: any, index: number) => (
        <span className="font-medium text-gray-700">
          {(page - 1) * limit + index + 1}
        </span>
      ),
      fixed: "left",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "Employer",
      dataIndex: "employer",
      key: "employer",
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (loc: string) => (
        <span className="text-gray-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {loc}
        </span>
      ),
    },
    {
      title: "Salary Range",
      dataIndex: "salaryRange",
      key: "salaryRange",
      align: "center" as const,
      render: (salary: { min: number; max: number }) => (
        <span className="">
          {salary.min} - {salary.max}
        </span>
      ),
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      align: "center" as const,
    },
    {
      title: "Work Type",
      dataIndex: "workType",
      key: "workType",
      align: "center" as const,
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
      key: "jobType",
      align: "center" as const,
    },
    {
      title: "Workers Needed",
      dataIndex: "workersNeeded",
      key: "workersNeeded",
      align: "center" as const,
    },
    {
      title: "Candidate Apply",
      dataIndex: "candidateApply",
      key: "candidateApply",
      align: "center" as const,
    },
    {
      title: "Candidate Apply",
      dataIndex: "candidateApply",
      key: "candidateApply",
      align: "center" as const,
    },
    {
      title: "Description",
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
      title: "Job Post Date",
      dataIndex: "createAt",
      key: "createAt",
      align: "center" as const,
    },
    {
      title: "Last Apply Date",
      dataIndex: "lastApplyDate",
      key: "lastApplyDate",
      align: "center" as const,
    },
    {
      title: "Job Referral Code",
      dataIndex: "jobReferralCode",
      key: "jobReferralCode",
      align: "center" as const,
    },
    {
      title: "CV",
      key: "cv",
      align: "center" as const,
      render: (_: any, record: any) => (
        <button
          onClick={() => window.open(record.cvUrl, "_blank")}
          className="px-4 py-2 bg-secondary-color text-white text-sm font-medium rounded hover:bg-secondary-color transition"
        >
          View
        </button>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Delete">
            <GoEye
              className="text-secondary-color cursor-pointer"
              onClick={() => showDeleteModal(record)}
            />
          </Tooltip>
          <Tooltip title="Send CV">
            <ReuseButton variant="secondary" className="!w-fit">
              Send CVs
            </ReuseButton>
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
