import { Navigate } from "react-router";
import { useAuth } from "@/contexts/useAuth";

export default function PrivateRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{session ? <>{children}</> : <Navigate to="/" />}</>;
}
