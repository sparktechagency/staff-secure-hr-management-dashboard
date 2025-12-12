/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CVDispatchTable from "../../ui/Tables/CVDispatchTable";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";

const AdminAllCvDispathc = () => {
  const data: any = [
    {
      id: 1223,
      candidateName: "David Wilson",
      employer: "BuildTech Construction Ltd",
      jobTitle: "Site Electrician",
      sentAt: "2025-10-03 10:30",
      status: "Viewed",
      hasDocument: true,
    },
    {
      id: 1224,
      candidateName: "David Wilson",
      employer: "BuildTech Construction Ltd",
      jobTitle: "Site Electrician",
      sentAt: "2025-10-03 10:30",
      status: "Pending",
      hasDocument: false,
    },
    {
      id: 1225,
      candidateName: "David Wilson",
      employer: "BuildTech Construction Ltd",
      jobTitle: "Site Electrician",
      sentAt: "2025-10-03 10:30",
      status: "Viewed",
      hasDocument: false,
    },
    {
      id: 1226,
      candidateName: "David Wilson",
      employer: "BuildTech Construction Ltd",
      jobTitle: "Site Electrician",
      sentAt: "2025-10-03 10:30",
      status: "Pending",
      hasDocument: false,
    },
    {
      id: 1227,
      candidateName: "David Wilson",
      employer: "BuildTech Construction Ltd",
      jobTitle: "Site Electrician",
      sentAt: "2025-10-03 10:30",
      status: "Viewed",
      hasDocument: false,
    },
    {
      id: 1228,
      candidateName: "David Wilson",
      employer: "BuildTech Construction Ltd",
      jobTitle: "Site Electrician",
      sentAt: "2025-10-03 10:30",
      status: "Viewed",
      hasDocument: false,
    },
    {
      id: 1229,
      candidateName: "David Wilson",
      employer: "BuildTech Construction Ltd",
      jobTitle: "Site Electrician",
      sentAt: "2025-10-03 10:30",
      status: "Viewed",
      hasDocument: true,
    },
    {
      id: 1230,
      candidateName: "David Wilson",
      employer: "BuildTech Construction Ltd",
      jobTitle: "Site Electrician",
      sentAt: "2025-10-03 10:30",
      status: "Viewed",
      hasDocument: false,
    },
    {
      id: 1231,
      candidateName: "David Wilson",
      employer: "BuildTech Construction Ltd",
      jobTitle: "Site Electrician",
      sentAt: "2025-10-03 10:30",
      status: "Viewed",
      hasDocument: false,
    },
    {
      id: 1232,
      candidateName: "David Wilson",
      employer: "BuildTech Construction Ltd",
      jobTitle: "Site Electrician",
      sentAt: "2025-10-03 10:30",
      status: "Viewed",
      hasDocument: false,
    },
  ];
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  const limit = 12;
  const countData = [
    {
      id: 1,
      name: "Total CVs Dispatched",
      count: 0,
    },
    {
      id: 2,
      name: "Sent This Month",
      count: 0,
    },
    {
      id: 3,
      name: "Sent Today",
      count: 0,
    },
  ];
  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          CV Dispatch
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-1 lg:gap-5 mb-5  !w-fit">
        {countData.map((item) => (
          <div
            key={item.id}
            className={`flex rounded-2xl my-2 lg:my-0 flex-1 border border-[#E1E1E1] p-6 !w-fit`}
          >
            <div className="!w-fit">
              <div className="flex items-center justify-between gap-5 w-full">
                <p className="text-base sm:text-lg lg:text-xl  font-medium mb-1  tracking-tight w-full text-nowrap text-secondary-color">
                  {item.name}
                </p>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl  font-bold capitalize tracking-wider text-secondary-color">
                {item.count}
              </p>
              {/* <div className="bg-[#FAF4FF] p-3 rounded-full">{item.icon}</div> */}
            </div>
          </div>
        ))}
      </div>
      <CVDispatchTable
        data={data}
        loading={false}
        setPage={setPage}
        page={page}
        total={0}
        limit={limit}
      />
    </div>
  );
};

export default AdminAllCvDispathc;
