import { GoBellFill } from "react-icons/go";
import { formatDateTime } from "../../../utils/dateFormet";
import { INotification } from "../../../types";
import SpinLoader from "../../../ui/SpinLoader";

const RecentNotification = ({
  notificationData,
  isFetching,
}: {
  notificationData: INotification[];
  isFetching: boolean;
}) => {
  return (
    <div
      className="w-full max-h-[300px] xl:max-h-[600px] overflow-y-auto rounded-xl relative  border border-[#E1E1E1]"
      style={{ boxShadow: "0px 0px 5px 1px #0000000D" }}
    >
      <div className=" sticky top-0  px-5 pt-5 bg-white z-10 ">
        {" "}
        <h1 className="text-xl lg:text-2xl font-bold">Recent Activity</h1>
        {/* <p className="text-sm lg:text-base text-[#5D5D5D]">
          Newly submitted job postings
        </p> */}
      </div>

      <div className="flex flex-col gap-5 p-5 bg-primary-color">
        {isFetching ? (
          <SpinLoader />
        ) : (
          notificationData?.map((activity: INotification, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <div className=" p-1 bg-secondary-color rounded-full w-fit">
                <GoBellFill className="text-lg cursor-pointer text-primary-color" />
              </div>
              <div>
                <p className="text-[#242424] text-base font-medium">
                  {activity?.message}
                </p>

                <p className="text-sm text-[#8A8D8E] mt-1">
                  {formatDateTime(activity?.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentNotification;
