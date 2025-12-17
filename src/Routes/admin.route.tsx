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
import ProfileSettingsPage from "../pages/Common/settings/Profile";
import PrivacyAndPolicy from "../pages/Common/settings/PrivacyAndPolicy";
import AdminAllCvDispathc from "../pages/Admin/AdminAllCvDispathc";
import AdminAllPlacement from "../pages/Admin/AdminAllPlacement";
import AdminAllCandidates from "../pages/Admin/AdminAllCandidates";
import AdminAllJobBoard from "../pages/Admin/AdminAllJobBoard";
import AdminAllEmployer from "../pages/Admin/AdminAllEmployer";
import CookiesPolicy from "../pages/Common/settings/CookiesPolicy";
import ConversationPage from "../pages/Common/ConversationPage";

export const adminPaths = [
  {
    path: "overview",
    element: <AdminDashboard />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    path: "all-employers",
    element: <AdminAllEmployer />,
    key: "all-employers",
    name: "Employers",
    icon: userLogo,
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
    path: "payment-received",
    element: <AdminAllTransaction />,
    key: "payment-received",
    name: "Payment Received",
    icon: userLogo,
  },
  {
    path: "live-chat",
    element: <ConversationPage />,
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
        name: "Terms & Conditions",
        icon: dashboardLogo,
        element: <TermsOfService />,
      },
      {
        key: "cookies-policy",
        path: "documentation/cookies-policy",
        name: "Cookies Policy",
        icon: dashboardLogo,
        element: <CookiesPolicy />,
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
