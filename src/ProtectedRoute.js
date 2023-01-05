import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [searchPass, setSearchPass] = useSearchParams()
  const pwd = searchPass.get('password')

  if(pwd !== 'secret'){
    return <Navigate to="/unauthorized" replace />
  }

  return children; // TODO: replace this
};

export default ProtectedRoute;
