/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import {
  useBlockAndUnblockUserMutation,
  useGetAllEmployersQuery,
} from "../../redux/features/users/usersApi";
import { IEmployer } from "../../types";
import EmployerTable from "../../ui/Tables/EmployerTable";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAllEmployer = () => {
  const [blockAndUnblock] = useBlockAndUnblockUserMutation();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const { data, isFetching } = useGetAllEmployersQuery(
    { page, limit, searchTerm: searchText },
    { refetchOnMountOrArgChange: true }
  );

  const totalData = data?.data?.meta?.total || 0;
  const allEmployers: IEmployer[] = data?.data?.data;

  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const showBlockModal = (data: any) => {
    setIsBlockModalVisible(true);
    setCurrentRecord(data);
  };

  const showUnblockModal = (data: any) => {
    setIsUnblockModalVisible(true);
    setCurrentRecord(data);
  };

  const handleCancel = () => {
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (record: IEmployer) => {
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
  const handleUnblock = async (record: IEmployer) => {
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
          Employers
        </p>
        <div className="h-fit flex gap-2 items-center">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <EmployerTable
        data={allEmployers}
        loading={isFetching}
        setPage={setPage}
        showBlockModal={showBlockModal}
        showUnblockModal={showUnblockModal}
        page={page}
        total={totalData}
        limit={limit}
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
    </div>
  );
};

export default AdminAllEmployer;
