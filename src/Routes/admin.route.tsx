//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";
import userLogo from "/images/dashboard-logo/user.svg";
import messageLogo from "/images/dashboard-logo/message.svg";
import documentationLogo from "/images/dashboard-logo/documentation.svg";
import settingsLogo from "/images/dashboard-logo/settings.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminAllTransaction from "../pages/Admin/AdminAllTransaction";
import TermsOfService from "../pages/Common/settings/TermsOfService";
import GDPR from "../pages/Common/settings/GDPR";
import HowOrderingWorks from "../pages/Common/settings/HowOrderingWorks";
import HowItWorks from "../pages/Common/settings/HowItWorks";
import FrameworkAgreement from "../pages/Common/settings/FrameworkAgreement";
import ProfileSettingsPage from "../pages/Common/settings/Profile";
import PrivacyAndPolicy from "../pages/Common/settings/PrivacyAndPolicy";
import WebsiteFunctionality from "../pages/Common/settings/WebsiteFunctionality";
import SearchAlgorithm from "../pages/Common/settings/SearchAlgorithm";
import MessagePage from "../pages/Admin/MessagePage";
import AdminAllCvDispathc from "../pages/Admin/AdminAllCvDispathc";
import AdminAllPlacement from "../pages/Admin/AdminAllPlacement";
import AdminAllCandidates from "../pages/Admin/AdminAllCandidates";
import AdminAllJobBoard from "../pages/Admin/AdminAllJobBoard";

export const adminPaths = [
  {
    path: "overview",
    element: <AdminDashboard />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    path: "all-candidates",
    element: <AdminAllCandidates />,
    key: "all-candidates",
    name: "Candidates",
    icon: userLogo,
  },
  {
    path: "job-board",
    element: <AdminAllJobBoard />,
    key: "job-board",
    name: "Job Board",
    icon: userLogo,
  },
  {
    path: "payment-received",
    element: <AdminAllTransaction />,
    key: "payment-received",
    name: "Payment Received",
    icon: userLogo,
  },
  {
    path: "cv-dispatch",
    element: <AdminAllCvDispathc />,
    key: "cv-dispatch",
    name: "CV Dispatch",
    icon: userLogo,
  },

  {
    path: "placement",
    element: <AdminAllPlacement />,
    key: "placement",
    name: "Placement",
    icon: userLogo,
  },
  {
    path: "live-chat",
    element: <MessagePage />,
    key: "live-chat",
    name: "Live Chat",
    icon: messageLogo,
  },
  {
    key: "documentation",
    name: "Documentation",
    icon: documentationLogo,
    children: [
      {
        key: "privacy-policy",
        path: "documentation/privacy-policy",
        name: "Privacy Policy",
        icon: dashboardLogo,
        element: <PrivacyAndPolicy />,
      },
      {
        key: "terms-of-service",
        path: "documentation/terms-of-service",
        name: "Terms of Service",
        icon: dashboardLogo,
        element: <TermsOfService />,
      },
      {
        key: "gdpr",
        path: "documentation/gdpr",
        name: "GDPR",
        icon: dashboardLogo,
        element: <GDPR />,
      },
      {
        key: "how-ordering-works",
        path: "documentation/how-ordering-works",
        name: "How Ordering Works",
        icon: dashboardLogo,
        element: <HowOrderingWorks />,
      },
      {
        key: "how-it-works",
        path: "documentation/how-it-works",
        name: "How It Works",
        icon: dashboardLogo,
        element: <HowItWorks />,
      },
      {
        key: "framework-agreement",
        path: "documentation/framework-agreement",
        name: "Framework Agreement",
        icon: dashboardLogo,
        element: <FrameworkAgreement />,
      },
      {
        key: "search-algorithm",
        path: "documentation/search-algorithm",
        name: "Search Algorithm",
        icon: dashboardLogo,
        element: <SearchAlgorithm />,
      },
      {
        key: "website-functionality-and-compatibility",
        path: "documentation/website-functionality-and-compatibility",
        name: " Website Functionality",
        icon: dashboardLogo,
        element: <WebsiteFunctionality />,
      },
    ],
  },
  {
    path: "profile",
    element: <ProfileSettingsPage />,
    key: "profile",
    name: "Profile",
    icon: settingsLogo,
  },
];
