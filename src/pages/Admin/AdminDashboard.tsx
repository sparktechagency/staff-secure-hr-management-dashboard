import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import QuickActionRequired from "../../Components/Dashboard/Overview/QuickActionRequired";
import RecentNotification from "../../Components/Dashboard/Overview/RecentNotification";
import UserOverview from "../../Components/Dashboard/Overview/UserOverview";
import { useGetNotificationAndJobQuery } from "../../redux/features/overview/overviewApi";
import { IJobPlacement, INotification } from "../../types";

const AdminDashboard = () => {
  const { data, isFetching } = useGetNotificationAndJobQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const jobData: IJobPlacement[] = data?.data?.jobs || [];
  const notificationData: INotification[] = data?.data?.notifications || [];

  return (
    <div>
      <>
        <div className="my-5">
          <OverviewCard />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          <UserOverview />
          <IncomeOverview />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
          <RecentNotification
            notificationData={notificationData}
            isFetching={isFetching}
          />
          <QuickActionRequired jobData={jobData} isFetching={isFetching} />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
