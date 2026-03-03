import SystemOrgAdminView from "./SystemOrgAdminView";
import OrgAdminDashboard from "./OrgAdminDashboard";
import { useAuth } from "../../store/AuthContext";
const DashboardMain = () => {
  const { isSystemAdmin, isOrgAdmin, isEmployee } = useAuth();

  if (isSystemAdmin) return <SystemOrgAdminView />;

  if (isOrgAdmin) return <OrgAdminDashboard />;


  return <div>Unauthorized Access</div>;
};

export default DashboardMain;