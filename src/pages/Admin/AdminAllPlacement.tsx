/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PlacementTable from "../../ui/Tables/PlacementTable";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import {
  useGetAllPlacementCandidatesQuery,
  useGetPlacementOverviewQuery,
} from "../../redux/features/jobBoard/jobBoardApi";
import { IApplication } from "../../types";

const AdminAllPlacement = () => {
  const { data: overviewData, isFetching: isOverviewFetching } =
    useGetPlacementOverviewQuery({});

  console.log(overviewData);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  const limit = 12;
  const countData = [
    {
      id: 1,
      name: "Total Placement",
      count: overviewData?.data?.totalPlacement || 0,
    },
    {
      id: 2,
      name: "Placement This Month",
      count: overviewData?.data?.totalPlacementThisMonth || 0,
    },
    {
      id: 3,
      name: "Placement Today",
      count: overviewData?.data?.totalPlacementToday || 0,
    },
  ];

  const { data, isFetching } = useGetAllPlacementCandidatesQuery(
    { page, limit, search: searchText },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const totalData = data?.data?.meta?.total || 0;
  const allJobDispatch: IApplication[] = data?.data?.result || [];

  console.log(allJobDispatch);
  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Placement
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
                {isOverviewFetching ? "..." : item.count}
              </p>
              {/* <div className="bg-[#FAF4FF] p-3 rounded-full">{item.icon}</div> */}
            </div>
          </div>
        ))}
      </div>{" "}
      <PlacementTable
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

export default AdminAllPlacement;
