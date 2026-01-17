import { Navigate } from "react-router";
import { useAuth } from "@/contexts/useAuth";

export default function PrivateRoute({
  children,
}: {
  children: React.JSX.Element;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
}
