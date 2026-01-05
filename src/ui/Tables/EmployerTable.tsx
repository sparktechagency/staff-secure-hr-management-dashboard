/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tag, Tooltip } from "antd";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { formatDate } from "../../utils/dateFormet";

// Define the type for the props
interface EmployerTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showBlockModal: (record: any) => void;
  showUnblockModal: (record: any) => void;
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const packageColorMap: Record<string, string> = {
  Platinum: "purple",
  Gold: "gold",
  Silver: "blue",
};

const EmployerTable: React.FC<EmployerTableProps> = ({
  data,
  loading,
  showBlockModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "ID",
      key: "_id",
      width: 80,
      render: (_: any, __: any, index: number) => (
        <span className="font-medium text-gray-700">
          {(page - 1) * limit + index + 1}
        </span>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
      render: (text: string, record: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 ">{text}</span>
          <span className="text-sm text-gray-500">{record.email}</span>
        </div>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_: any, record: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{record.name}</span>
          <span className="text-sm text-gray-500">{record.phone}</span>
        </div>
      ),
    },
    {
      title: "Package",
      dataIndex: "packageType",
      key: "packageType",
      align: "center",
      render: (pkg: string | null) =>
        pkg ? (
          <Tag color={packageColorMap[pkg] || "default"}>{pkg}</Tag>
        ) : (
          <Tag color="default">—</Tag>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "CVs Used",
      dataIndex: "cvUsage",
      key: "cvUsage",
      align: "center",
      render: (usage: string) => (
        <span className="font-medium text-gray-700">{usage}</span>
      ),
    },
    {
      title: "Renewal Date",
      dataIndex: "renewalDate",
      key: "renewalDate",
      render: (date: string | null) =>
        date ? (
          <span className="text-gray-700">{formatDate(date)}</span>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        ),
    },
    {
      title: "Messages",
      key: "messages",
      align: "center",
      render: (_: any, record: any) =>
        record.hasUnreadMessage ? (
          <span className="w-3 h-3 bg-error rounded-full inline-block" />
        ) : (
          <span className="w-3 h-3 bg-success rounded-full inline-block" />
        ),
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space size="middle">
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

export default EmployerTable;
