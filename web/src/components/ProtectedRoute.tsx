import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../app/store";
import Navbar from "./Navigation/Navbar";
import Sidebar from "./Navigation/Sidebar";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { access_token, isLoggedIn } = useSelector((state: RootState) => state.auth);
  console.log(access_token, isLoggedIn);

  if (!access_token) {
    return <div>Please log in to access this content.</div>;
  }

  return (
    <div>
        <Navbar />
        <Sidebar />
        {children}
    </div>
  )
}

export default ProtectedRoute