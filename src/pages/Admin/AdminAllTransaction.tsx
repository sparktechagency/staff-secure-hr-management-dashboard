/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import TransactionTable from "../../ui/Tables/TransactionTable";
import TransactionViewModal from "../../ui/Modal/Transactions/TransactionViewModal";
import { useGetAllPaymentQuery } from "../../redux/features/payment/paymentApi";
import { ISubscription } from "../../types";

const AdminAllTransaction = () => {
  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isFetching } = useGetAllPaymentQuery(
    { page, limit, search: searchText },
    { refetchOnMountOrArgChange: true }
  );

  const totalData: number = data?.data?.meta?.total || 0;
  const allTransactions: ISubscription[] = data?.data?.result;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Earnings
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <TransactionTable
        data={allTransactions}
        loading={isFetching}
        showViewModal={showViewUserModal}
        setPage={setPage}
        page={page}
        total={totalData}
        limit={limit}
      />
      <TransactionViewModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminAllTransaction;
