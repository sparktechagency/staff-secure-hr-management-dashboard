/* eslint-disable @typescript-eslint/no-explicit-any */
import { PiBriefcaseLight } from "react-icons/pi";

const QuickActionRequired = () => {
  const notificationData = [
    {
      id: "1",
      message: {
        text: "Site Electrician",
        compnay: "BuildTech Construction Ltd",
        time: "5 minutes ago",
      },
      createdAt: new Date(),
    },
    {
      id: "2",
      message: {
        text: "Site Electrician",
        compnay: "BuildTech Construction Ltd",
        time: "5 minutes ago",
      },
      createdAt: new Date(),
    },
    {
      id: "3",
      message: {
        text: "Site Electrician",
        compnay: "BuildTech Construction Ltd",
        time: "5 minutes ago",
      },
      createdAt: new Date(),
    },
    {
      id: "4",
      message: {
        text: "Site Electrician",
        compnay: "BuildTech Construction Ltd",
        time: "5 minutes ago",
      },
      createdAt: new Date(),
    },
    {
      id: "5",
      message: {
        text: "Site Electrician",
        compnay: "BuildTech Construction Ltd",
        time: "5 minutes ago",
      },
      createdAt: new Date(),
    },
  ];
  return (
    <div
      className="w-full max-h-[300px] xl:max-h-[600px] overflow-y-auto rounded-xl relative  border border-[#E1E1E1]"
      style={{ boxShadow: "0px 0px 5px 1px #0000000D" }}
    >
      <div className=" sticky top-0  px-5 pt-5 bg-white z-10 ">
        <h1 className="text-xl lg:text-2xl font-bold">Latest Requirements</h1>
        <p className="text-sm lg:text-base text-[#5D5D5D]">
          Newly submitted job postings
        </p>
      </div>

      <div className="flex flex-col gap-5 p-5 bg-primary-color">
        {notificationData?.map((activity: any, i: number) => (
          <div key={i} className="space-y-2 p-3 rounded-xl bg-[#EFEFEF]">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-secondary-color rounded-full">
                <PiBriefcaseLight className="text-2xl text-primary-color" />
              </div>
              <div>
                <p className="text-secondary-color text-xs sm:text-sm lg:text-base font-semibold">
                  {activity?.message?.text}
                </p>
                <p className="text-sm">{activity?.message?.compnay}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionRequired;
