/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";

// Define the type for the props
interface PlacementTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const PlacementTable: React.FC<PlacementTableProps> = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "_id",
      key: "_id",
      width: 80,
      render: (_: any, __: any, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Candidate Name",
      dataIndex: ["candidateId", "name"],
      key: "candidateId.name",
    },
    {
      title: "Employer",
      dataIndex: ["jobProviderOwnerId", "companyName"],
      key: "jobProviderOwnerId.companyName",
    },
    {
      title: "Position",
      dataIndex: ["jobId", "title"],
      key: "jobId.title",
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

export default PlacementTable;
