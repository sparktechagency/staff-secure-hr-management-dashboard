import { useState } from "react";
import CVDispatchTable from "../../ui/Tables/CVDispatchTable";
import {
  useGetAllDispatchedCVsQuery,
  useGetDispatchOverviewQuery,
} from "../../redux/features/jobBoard/jobBoardApi";
import { IApplication } from "../../types";

const AdminAllCvDispathc = () => {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data: overviewData, isFetching: isOverviewFetching } =
    useGetDispatchOverviewQuery({});

  const countData = [
    {
      id: 1,
      name: "Total CVs Dispatched",
      count: overviewData?.data?.totalForwarded || 0,
    },
    {
      id: 2,
      name: "Sent This Month",
      count: overviewData?.data?.totalThisMonth || 0,
    },
    {
      id: 3,
      name: "Sent Today",
      count: overviewData?.data?.totalToday || 0,
    },
  ];

  const { data, isFetching } = useGetAllDispatchedCVsQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const totalData = data?.data?.meta?.total || 0;
  const allJobDispatch: IApplication[] = data?.data?.result;
  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          CV Dispatch
        </p>
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
                {isOverviewFetching ? "..." : item.count}
              </p>
              {/* <div className="bg-[#FAF4FF] p-3 rounded-full">{item.icon}</div> */}
            </div>
          </div>
        ))}
      </div>
      <CVDispatchTable
        data={allJobDispatch}
        loading={isFetching}
        setPage={setPage}
        page={page}
        total={totalData}
        limit={limit}
      />
    </div>
  );
};

export default AdminAllCvDispathc;
