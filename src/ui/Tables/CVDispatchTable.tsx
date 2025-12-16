/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tag } from "antd";
import { IApplication } from "../../types";
import { formatDate } from "../../utils/dateFormet";

// Define the type for the props
interface CVDispatchTableProps {
  data: IApplication[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const CVDispatchTable: React.FC<CVDispatchTableProps> = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 80,
      render: (_: IApplication, __: IApplication, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Candidate",
      dataIndex: "candidateId",
      key: "candidateId",
      render: (candidateId: any) => (
        <div>
          <p>{candidateId.name}</p>
          <p className="text-sm text-gray-500">{candidateId.email}</p>
        </div>
      ),
    },
    {
      title: "Employer",
      dataIndex: "jobProviderOwnerId",
      key: "jobProviderOwnerId",
      render: (jobProviderOwnerId: any) => (
        <div>
          <p>{jobProviderOwnerId.companyName}</p>
          <p className="text-sm text-gray-500">{jobProviderOwnerId.name}</p>
        </div>
      ),
    },
    {
      title: "Job Title",
      dataIndex: ["jobId", "title"],
      key: "jobId",
    },
    {
      title: "Sent At",
      dataIndex: "forwardedAt",
      key: "forwardedAt",
      render: (date: string) => <span>{formatDate(date)}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "green";
        if (status === "forwarded") color = "orange";
        if (status === "selected") color = "green";
        if (status === "rejected") color = "red";

        return (
          <Tag color={color} className="font-medium">
            {status === "forwarded"
              ? "Forwarded"
              : status === "selected"
              ? "Selected"
              : status === "rejected" && "Rejected"}
          </Tag>
        );
      },
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

export default CVDispatchTable;
