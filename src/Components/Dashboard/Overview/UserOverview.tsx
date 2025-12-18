import Area_Chart from "../../Chart/AreaChart";
import YearOption from "../../../utils/YearOption";
import { useState } from "react";
import { ConfigProvider, Select } from "antd";
import { useGetUserOverviewStatsQuery } from "../../../redux/features/overview/overviewApi";

const UserOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const [userType, setUserType] = useState("candidate");

  const { data } = useGetUserOverviewStatsQuery(
    { role: userType, year },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg border border-[#E1E1E1]">
      <div className="flex justify-between text-base-color mt-4">
        <p className="text-2xl text-gradient-color lg:text-3xl font-bold mb-5">
          User Overview
        </p>
        <div className="flex items-center gap-2">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  colorTextQuaternary: "#F9FAFB",
                  fontSize: 16,
                  borderRadius: 10,
                  colorBorder: "#0c3188",
                  colorText: "#FFFFFF",
                  colorIcon: "#F9FAFB",
                  colorBgContainer: "rgba(0,0,0,0)",
                  optionSelectedColor: "#0c3188",
                  optionSelectedBg: "#F9FAFB",

                  colorBgElevated: "#0c3188",
                  selectorBg: "#0c3188",
                  colorTextPlaceholder: "#F9FAFB",
                },
              },
            }}
          >
            <Select
              onChange={(value) => setUserType(value)}
              value={userType}
              placeholder="Select User"
              style={{ width: 150 }}
            >
              <Select.Option value="candidate">Candidate</Select.Option>
              <Select.Option value="employer">Employer</Select.Option>
            </Select>
          </ConfigProvider>
          <div>
            <YearOption currentYear={currentYear} setThisYear={setYear} />
          </div>
        </div>
      </div>
      <div>
        <Area_Chart data={data?.data} />
      </div>
    </div>
  );
};

export default UserOverview;
