/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import TransactionTable from "../../ui/Tables/TransactionTable";
import TransactionViewModal from "../../ui/Modal/Transactions/TransactionViewModal";

const AdminAllTransaction = () => {
  const data: any = [
    {
      id: 1223,
      name: "Lucas Jhonson",
      email: "lucas01@gmail.com",
      phone: "020 7946 0000",
      date: "2025-10-31",
      plan: "Bronze",
      amount: 97,
      duration: "3 months",
    },
    {
      id: 1224,
      name: "Lucas Jhonson",
      email: "lucas01@gmail.com",
      phone: "020 7946 0000",
      date: "2025-10-31",
      plan: "Platinum",
      amount: 2394,
      duration: "3 months",
    },
    {
      id: 1225,
      name: "Lucas Jhonson",
      email: "lucas01@gmail.com",
      phone: "020 7946 0000",
      date: "2025-10-31",
      plan: "Diamond",
      amount: 1199,
      duration: "1 month",
    },
    {
      id: 1226,
      name: "Lucas Jhonson",
      email: "lucas01@gmail.com",
      phone: "020 7946 0000",
      date: "2025-10-31",
      plan: "Bronze",
      amount: 199,
      duration: "1 month",
    },
    {
      id: 1227,
      name: "Lucas Jhonson",
      email: "lucas01@gmail.com",
      phone: "020 7946 0000",
      date: "2025-10-31",
      plan: "Bronze",
      amount: 199,
      duration: "1 month",
    },
    {
      id: 1228,
      name: "Lucas Jhonson",
      email: "lucas01@gmail.com",
      phone: "020 7946 0000",
      date: "2025-10-31",
      plan: "Bronze",
      amount: 199,
      duration: "1 month",
    },
    {
      id: 1229,
      name: "Lucas Jhonson",
      email: "lucas01@gmail.com",
      phone: "020 7946 0000",
      date: "2025-10-31",
      plan: "Bronze",
      amount: 199,
      duration: "1 month",
    },
    {
      id: 1230,
      name: "Lucas Jhonson",
      email: "lucas01@gmail.com",
      phone: "020 7946 0000",
      date: "2025-10-31",
      plan: "Bronze",
      amount: 199,
      duration: "1 month",
    },
    {
      id: 1231,
      name: "Lucas Jhonson",
      email: "lucas01@gmail.com",
      phone: "020 7946 0000",
      date: "2025-10-31",
      plan: "Bronze",
      amount: 199,
      duration: "1 month",
    },
    {
      id: 1232,
      name: "Lucas Jhonson",
      email: "lucas01@gmail.com",
      phone: "020 7946 0000",
      date: "2025-10-31",
      plan: "Bronze",
      amount: 199,
      duration: "1 month",
    },
  ];
  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
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
        data={data}
        loading={false}
        showViewModal={showViewUserModal}
        setPage={setPage}
        page={page}
        total={data?.length}
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
