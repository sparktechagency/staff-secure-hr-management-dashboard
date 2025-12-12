/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";

// Define the type for the props
interface CandidatesTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showDeleteModal: (record: any) => void;
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const CandidatesTable: React.FC<CandidatesTableProps> = ({
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
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="font-semibold text-gray-900">{text}</span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {role}
        </span>
      ),
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
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      align: "center" as const,
    },
    {
      title: "Availably",
      dataIndex: "availability",
      key: "availability",
      align: "center" as const,
      render: (avail: string) => (
        <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
          {avail}
        </span>
      ),
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills: string[]) => (
        <div className="flex flex-col gap-1">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      ),
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
            <MdDelete
              className="text-red-500 cursor-pointer"
              onClick={() => showDeleteModal(record)}
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

export default CandidatesTable;
