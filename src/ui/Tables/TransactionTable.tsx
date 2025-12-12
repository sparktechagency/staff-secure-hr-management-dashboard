/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { ITransaction } from "../../types";

// Define the type for the props
interface TransactionTableProps {
  data: ITransaction[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: ITransaction) => void; // Function to handle viewing a user
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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telephone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (plan: string) => {
        const colors: any = {
          Bronze: "bg-orange-100 text-orange-800",
          Silver: "bg-gray-100 text-gray-800",
          Gold: "bg-yellow-100 text-yellow-800",
          Platinum: "bg-blue-100 text-blue-800",
          Diamond: "bg-purple-100 text-purple-800",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              colors[plan] || "bg-gray-100"
            }`}
          >
            {plan}
          </span>
        );
      },
    },
    {
      title: "Total Paid (per month)",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number, record: any) => (
        <div className="font-semibold text-gray-900">
          £{amount.toLocaleString()}
          <span className="text-xs text-gray-500 block">{record.duration}</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ITransaction) => (
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
