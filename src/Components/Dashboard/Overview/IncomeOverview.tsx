import { useState } from "react";
import Bar_Chart from "../../Chart/BarChart";
import YearOption from "../../../utils/YearOption";
import { useGetEarningStatsQuery } from "../../../redux/features/overview/overviewApi";

const IncomeOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data } = useGetEarningStatsQuery(
    { year },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg flex flex-col border border-[#E1E1E1]">
      <div className="flex justify-between text-base-color mt-4">
        <p className="text-2xl lg:text-3xl text-secondary-color font-bold mb-5">
          Income
        </p>
        <div>
          <YearOption currentYear={currentYear} setThisYear={setYear} />
        </div>
      </div>
      <hr />
      <div>
        <Bar_Chart data={data?.data} />
      </div>
    </div>
  );
};

export default IncomeOverview;
