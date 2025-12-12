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
      title: "Position",
      dataIndex: "position",
      key: "position",
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
