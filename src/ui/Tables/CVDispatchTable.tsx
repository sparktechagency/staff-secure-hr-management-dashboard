/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tag } from "antd";

// Define the type for the props
interface CVDispatchTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
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
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (_: any, __: any, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Candidate Name",
      dataIndex: "candidateName",
      key: "candidateName",
    },
    {
      title: "Employer",
      dataIndex: "employer",
      key: "employer",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Sent At",
      dataIndex: "sentAt",
      key: "sentAt",
      render: (date: string) =>
        new Date(date).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "green";
        if (status === "Pending") color = "orange";
        if (status === "Viewed") color = "green";

        return (
          <Tag color={color} className="font-medium">
            {status}
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
