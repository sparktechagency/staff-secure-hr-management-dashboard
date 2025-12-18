/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { ISubscription } from "../../types";

// Define the type for the props
interface TransactionTableProps {
  data: ISubscription[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: ISubscription) => void; // Function to handle viewing a user
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "id",
      key: "id",
      render: (_: any, __: any, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Name",
      key: "name",
      render: (record: ISubscription) => record.employerId?.name || "-",
    },
    {
      title: "Company Name",
      key: "companyName",
      render: (record: ISubscription) => record.employerId?.companyName || "-",
    },
    {
      title: "Email",
      key: "email",
      render: (record: ISubscription) => record.employerId?.email || "-",
    },
    {
      title: "Telephone Number",
      key: "phone",
      render: (record: ISubscription) => record.employerId?.phone || "-",
    },
    {
      title: "Date",
      key: "buyTime",
      render: (record: ISubscription) =>
        new Date(record.buyTime).toLocaleDateString("en-GB"),
    },
    {
      title: "Plan",
      key: "subscriptionType",
      render: (record: ISubscription) => {
        const colors: Record<string, string> = {
          Bronze: "bg-orange-100 text-orange-800",
          Silver: "bg-gray-100 text-gray-800",
          Gold: "bg-yellow-100 text-yellow-800",
          Platinum: "bg-blue-100 text-blue-800",
          Diamond: "bg-purple-100 text-purple-800",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              colors[record.subscriptionType] || "bg-gray-100 text-gray-800"
            }`}
          >
            {record.subscriptionType}
          </span>
        );
      },
    },
    {
      title: "Total Paid (per month)",
      key: "amount",
      render: (record: ISubscription) => (
        <div className="font-semibold text-gray-900">
          £{record.finalAmount.toLocaleString()}
          <span className="text-xs text-gray-500 block">
            {record.durationInMonths} month(s)
          </span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ISubscription) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
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
      keyValue={"email"}
    />
  );
};

export default TransactionTable;
