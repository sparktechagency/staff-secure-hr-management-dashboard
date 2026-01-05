/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import JobBoardTable from "../../ui/Tables/JobBoardTable";
import { useGetJobBoardQuery } from "../../redux/features/jobBoard/jobBoardApi";
import { IJob } from "../../types";
import ViewJobModal from "../../ui/Modal/Job/ViewJobModal";
import ViewAppliedCandidateModal from "../../ui/Modal/Job/ViewAppliedCandidateModal";
import ViewAISuggetCandidateModal from "../../ui/Modal/Job/ViewAISuggetCandidateModal";

const AdminAllJobBoard = () => {
  const [page, setPage] = useState(1);
  // const [searchText, setSearchText] = useState("");
  const limit = 10;

  const { data: jobBoardData, isFetching } = useGetJobBoardQuery(
    { limit, page },
    { refetchOnMountOrArgChange: true }
  );

  console.log(jobBoardData);

  const totalData = jobBoardData?.data?.meta?.total || 0;
  const allJobs: IJob[] = jobBoardData?.data?.result;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAllCandidatesModalVisible, setIsAllCandidatesModalVisible] =
    useState(false);
  const [
    isAISuggestCandidatesModalVisible,
    setIsAISuggestCandidatesModalVisible,
  ] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const showViewModal = (data: any) => {
    setIsViewModalVisible(true);
    setCurrentRecord(data);
  };

  const showAllCandidatesModal = (data: any) => {
    setIsAllCandidatesModalVisible(true);
    setCurrentRecord(data);
  };

  const showAISuggestCandidatesModal = (data: any) => {
    setIsAISuggestCandidatesModalVisible(true);
    setCurrentRecord(data);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsAllCandidatesModalVisible(false);
    setIsAISuggestCandidatesModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Current Vancancies
        </p>
        {/* <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div> */}
      </div>

      <JobBoardTable
        data={allJobs}
        loading={isFetching}
        setPage={setPage}
        showViewModal={showViewModal}
        showAllCandidatesModal={showAllCandidatesModal}
        showAISuggestCandidatesModal={showAISuggestCandidatesModal}
        page={page}
        total={totalData}
        limit={limit}
      />
      <ViewAppliedCandidateModal
        isModalVisible={isAllCandidatesModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <ViewAISuggetCandidateModal
        isViewModalVisible={isAISuggestCandidatesModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <ViewJobModal
        currentRecord={currentRecord}
        isModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default AdminAllJobBoard;
