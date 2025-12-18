import { RiShoppingBag2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";
import { useGetStatsQuery } from "../../../redux/features/overview/overviewApi";

interface IOverviewData {
  totalEmployers: number;
  totalCandidates: number;
  totalEarnings: number;
  totalCvsDispatch: number;
  totalPlacement: number;
}

const OverviewCards = () => {
  const { data, isFetching } = useGetStatsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const overviewData: IOverviewData = data?.data || {};

  const countData = [
    {
      id: 1,
      background: "#ffffff",
      name: "Total Employers",
      icon: <HiUsers className="size-5 text-secondary-color" />,
      count: overviewData.totalEmployers || 0,
    },
    {
      id: 2,
      background: "#ffffff",
      name: "Total Candidates",
      icon: <HiUsers className="size-5 text-secondary-color" />,
      count: overviewData.totalCandidates || 0,
    },
    {
      id: 3,
      background: "#ffffff",
      name: "Earnings",
      icon: <HiUsers className="size-6 text-secondary-color" />,
      count: `£${overviewData.totalEarnings || 0}`,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Total CV Placed",
      icon: <RiShoppingBag2Fill className="size-6 text-secondary-color" />,
      count: overviewData.totalCvsDispatch || 0,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Total Placement",
      icon: <MdAttachMoney className="size-6 text-secondary-color" />,
      count: overviewData.totalPlacement || 0,
    },
  ];
  return (
    <div className="flex flex-row flex-wrap gap-1 lg:gap-3 mb-5 ">
      {/* Company  */}
      {countData.map((item) => (
        <div
          key={item.id}
          className={`flex rounded-2xl w-full my-2 lg:my-0 flex-1 border border-[#E1E1E1] p-6`}
          style={{
            backgroundColor: item.background,
          }}
        >
          <div className="!w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm sm:text-base lg:text-lg  font-semibold mb-1  tracking-tight w-full text-nowrap">
                {item.name}
              </p>
              <p>{item?.icon}</p>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl  font-bold capitalize tracking-wider">
              {isFetching ? "..." : item.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
