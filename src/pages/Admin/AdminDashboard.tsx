import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import QuickActionRequired from "../../Components/Dashboard/Overview/QuickActionRequired";
import RecentNotification from "../../Components/Dashboard/Overview/RecentNotification";
import UserOverview from "../../Components/Dashboard/Overview/UserOverview";

const AdminDashboard = () => {
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
          <RecentNotification />
          <QuickActionRequired />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
