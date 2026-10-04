import { Navigate, useLocation } from "react-router-dom";
import LoadingState from "@/components/LoadingState";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAdminAuth();
  const location = useLocation();
  if (loading) return <LoadingState label="Checking administrator access…" />;
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return <>{children}</>;
};
export default AdminGuard;
