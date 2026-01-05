"use client";
import { Modal } from "antd";
import { IAppliciantData, IJob } from "../../../types";
import AppliedCandidatesTable from "../../Tables/AppliedCandidatesTable";
import { useState } from "react";
import ReuseSearchInput from "../../Form/ReuseSearchInput";
import { useGetAllApplicantsQuery } from "../../../redux/features/jobBoard/jobBoardApi";
import SpinLoader from "../../SpinLoader";
import ViewCVModal from "./ViewCVmodal";
import SendDirectCVModal from "./SendDirectCVModal";

const ViewAppliedCandidateModal = ({
  isModalVisible,
  handleCancel,
  currentRecord,
}: {
  isModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IJob | null;
}) => {
  const [isViewCVModalVisible, setIsViewCVModalVisible] = useState(false);
  const [isSendDirectCVModalVisible, setIsSendDirectCVModalVisible] =
    useState(false);
  const [currentApplicant, setCurrentApplicant] =
    useState<IAppliciantData | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const { data, isFetching } = useGetAllApplicantsQuery(
    { id: currentRecord?._id, limit, page, search: searchText },
    { refetchOnMountOrArgChange: true, skip: !currentRecord || !isModalVisible }
  );

  console.log(data);

  const totalData: number = data?.data?.meta?.total || 0;
  const allApplicants: IAppliciantData[] = data?.data?.result;

  const showViewCVModal = (data: IAppliciantData, doc: string) => {
    setIsViewCVModalVisible(true);
    setUrl(doc);
    setCurrentApplicant(data);
  };

  const showSendDirectCVModal = (data: IAppliciantData) => {
    setIsSendDirectCVModalVisible(true);
    setCurrentApplicant(data);
  };

  const handleModalCancel = () => {
    setIsViewCVModalVisible(false);
    setIsSendDirectCVModalVisible(false);
    setUrl(null);
    setCurrentApplicant(null);
  };

  return (
    <Modal
      open={isModalVisible}
      onCancel={() => {
        handleCancel();
      }}
      footer={null}
      centered
      className="lg:!w-[900px]"
    >
      <div className="mt-5">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl  font-bold">
            Candidates Applied for {currentRecord?.title}
          </h2>
          <p className="text-gray-500 lg:text-lg mt-1">
            {currentRecord?.employerId?.companyName}
          </p>

          <div className="h-fit mt-5">
            <ReuseSearchInput
              placeholder="Search ..."
              setSearch={setSearchText}
              setPage={setPage}
            />
          </div>
        </div>

        {isFetching ? (
          <SpinLoader />
        ) : (
          <div className="mt-10">
            <AppliedCandidatesTable
              data={allApplicants}
              loading={false}
              limit={12}
              page={1}
              setPage={setPage}
              openViewCVModal={showViewCVModal}
              sendDirectCVModal={showSendDirectCVModal}
              total={totalData}
            />
          </div>
        )}
      </div>
      <ViewCVModal
        isViewCVModalVisible={isViewCVModalVisible}
        handleCancel={handleModalCancel}
        currentRecord={currentApplicant}
        url={url || ""}
      />
      <SendDirectCVModal
        isSendDirectCVModalVisible={isSendDirectCVModalVisible}
        handleCancel={handleModalCancel}
        currentRecord={currentApplicant}
      />
    </Modal>
  );
};

export default ViewAppliedCandidateModal;
