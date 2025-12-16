/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import ReuseButton from "../Button/ReuseButton";
import { IAppliciantData } from "../../types";

// Define the type for the props
interface AppliedCandidatesTableProps {
  data: IAppliciantData[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage: (page: number) => void; // Function to handle pagination
  openViewCVModal: (data: any) => void;
  sendDirectCVModal: (data: any) => void;
  page: number;
  total: number;
  limit: number;
}

const AppliedCandidatesTable: React.FC<AppliedCandidatesTableProps> = ({
  data,
  loading,
  setPage,
  openViewCVModal,
  sendDirectCVModal,
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
      render: (_: IAppliciantData, __: IAppliciantData, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Candidate Name",
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
      title: "CV’s",
      dataIndex: "candidateId",
      key: "candidateId",
      render: (candidateId: any) => (
        <ReuseButton
          variant="outline"
          className="mt-3 !w-fit !py-1.5 !px-2"
          onClick={() => openViewCVModal(candidateId)}
        >
          View CV
        </ReuseButton>
      ),
    },
    {
      title: "Send CV",
      dataIndex: ["_id"],
      key: "cv",
      render: (_: any, record: any) =>
        record?.status === "applied" ? (
          <ReuseButton
            variant="secondary"
            className="mt-3 !w-fit"
            onClick={() => sendDirectCVModal(record)}
          >
            Send CV
          </ReuseButton>
        ) : (
          <p className="text-success">Already Sent</p>
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

export default AppliedCandidatesTable;
