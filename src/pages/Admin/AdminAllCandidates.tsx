/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import CandidatesTable from "../../ui/Tables/CandidatesTable";
import {
  useBlockAndUnblockUserMutation,
  useGetAllCandidatesQuery,
} from "../../redux/features/users/usersApi";
import { ICandidate } from "../../types";
import ViewCVModal from "../../ui/Modal/Job/ViewCVmodal";
import UserModal from "../../ui/Modal/User/UserModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import { Typography } from "antd";

const AdminAllCandidates = () => {
  const [isViewCVModalVisible, setIsViewCVModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchDesignationText, setSearchDesignationText] = useState("");
  const [searchLocationText, setSearchLocationText] = useState("");

  console.log({ searchDesignationText, searchLocationText });

  const limit = 12;

  const [blockAndUnblock] = useBlockAndUnblockUserMutation();

  const { data, isFetching } = useGetAllCandidatesQuery(
    {
      page,
      limit,
      searchTerm: searchText,
      designation: searchDesignationText,
      location: searchLocationText,
    },
    { refetchOnMountOrArgChange: true }
  );

  const totalData = data?.data?.meta?.total || 0;
  const allCandidates: ICandidate[] = data?.data?.result;

  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [url, setUrl] = useState(null);

  const showViewModal = (data: any) => {
    setIsViewModalVisible(true);
    setCurrentRecord(data);
  };

  const showViewCVModal = (data: ICandidate, doc: any) => {
    setIsViewCVModalVisible(true);
    setUrl(doc);
    setCurrentRecord(data);
  };

  const showBlockModal = (data: any) => {
    setIsBlockModalVisible(true);
    setCurrentRecord(data);
  };

  const showUnblockModal = (data: any) => {
    setIsUnblockModalVisible(true);
    setCurrentRecord(data);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsViewCVModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
    setUrl(null);
  };

  const handleBlock = async (record: ICandidate) => {
    const res = await tryCatchWrapper(
      blockAndUnblock,
      {
        params: record?._id,
        body: {
          status: "blocked",
        },
      },
      "Blocking..."
    );
    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (record: ICandidate) => {
    const res = await tryCatchWrapper(
      blockAndUnblock,
      {
        params: record?._id,
        body: {
          status: "active",
        },
      },
      "Unblocking..."
    );
    if (res?.statusCode === 200) {
      handleCancel();
    }
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex flex-col gap-10 mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Candidates
        </p>
        <div className="h-fit flex gap-2 items-center">
          <div>
            <Typography.Title
              level={5}
              className="text-base sm:text-lg lg:text-xl font-bold text-base-color"
            >
              Name
            </Typography.Title>
            <ReuseSearchInput
              placeholder="Search Name..."
              setSearch={setSearchText}
              setPage={setPage}
            />
          </div>
          <div>
            <Typography.Title
              level={5}
              className="text-base sm:text-lg lg:text-xl font-bold text-base-color"
            >
              Occupation
            </Typography.Title>
            <ReuseSearchInput
              placeholder="Search Occupation..."
              setSearch={setSearchDesignationText}
              setPage={setPage}
            />
          </div>
          <div>
            <Typography.Title
              level={5}
              className="text-base sm:text-lg lg:text-xl font-bold text-base-color"
            >
              Location
            </Typography.Title>
            <ReuseSearchInput
              placeholder="Search Location..."
              setSearch={setSearchLocationText}
              setPage={setPage}
            />
          </div>
        </div>
      </div>

      <CandidatesTable
        data={allCandidates}
        loading={isFetching}
        setPage={setPage}
        showViewModal={showViewModal}
        showBlockModal={showBlockModal}
        showUnblockModal={showUnblockModal}
        showViewCVModal={showViewCVModal}
        page={page}
        total={totalData}
        limit={limit}
      />
      <UserModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
        description="Are You Sure You want to Block ?"
      />

      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description="Are You Sure You want to Unblock ?"
      />
      <ViewCVModal
        isViewCVModalVisible={isViewCVModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        url={url || ""}
      />
    </div>
  );
};

export default AdminAllCandidates;
