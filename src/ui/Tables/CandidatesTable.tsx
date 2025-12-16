/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tooltip } from "antd";
import { MdBlock } from "react-icons/md";
import ReuseButton from "../Button/ReuseButton";
import { IoMdEye } from "react-icons/io";
import { CgUnblock } from "react-icons/cg";

// Define the type for the props
interface CandidatesTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void;
  showBlockModal: (record: any) => void;
  showUnblockModal: (record: any) => void;
  showViewCVModal: (record: any) => void;
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const CandidatesTable: React.FC<CandidatesTableProps> = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showUnblockModal,
  showViewCVModal,
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
      render: (_: any, candidateId: any) => (
        <div>
          <p>{candidateId.name}</p>
          <p className="text-sm text-gray-500">{candidateId.email}</p>
        </div>
      ),
    },
    {
      title: "Telephone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => <span>{phone || "N/A"}</span>,
    },
    {
      title: "Role",
      dataIndex: ["candidateProfileId", "designation"],
      key: "role",
      render: (role: string) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {role || "N/A"}
        </span>
      ),
    },
    {
      title: "Location",
      dataIndex: ["candidateProfileId", "location"],
      key: "candidateProfileId.location",
      render: (loc: string) => (
        <span className="text-gray-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {loc || "N/A"}
        </span>
      ),
    },
    {
      title: "Experience",
      dataIndex: ["candidateProfileId", "yearsOfExperience"],
      key: "candidateProfileId.yearsOfExperience",
      align: "center" as const,
      render: (exp: number) => <span>{exp || "N/A"}</span>,
    },
    {
      title: "Availably",
      dataIndex: ["candidateProfileId", "availability"],
      key: "candidateProfileId.availability",
      align: "center" as const,
      render: (avail: string) => (
        <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
          {avail || "N/A"}
        </span>
      ),
    },
    {
      title: "CV",
      key: "cv",
      align: "center" as const,
      render: (_: any, record: any) => (
        <ReuseButton
          variant="secondary"
          onClick={() => showViewCVModal(record?.candidateProfileId)}
          className="!w-fit !py-2 !px-4"
        >
          View
        </ReuseButton>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="View">
            <IoMdEye
              className="text-secondary-color cursor-pointer  text-xl"
              onClick={() => showViewModal(record)}
            />
          </Tooltip>
          {record.status === "active" ? (
            <Tooltip title="Block">
              <MdBlock
                className="text-red-500 cursor-pointer text-xl"
                onClick={() => showBlockModal(record)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Unblock">
              <CgUnblock
                className="text-secondary-color cursor-pointer text-xl"
                onClick={() => showUnblockModal(record)}
              />
            </Tooltip>
          )}
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
