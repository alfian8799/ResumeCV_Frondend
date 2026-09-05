import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header"
import { useAuthStore } from "../stores/authStore"

const MainLayout = () => {
  const { isAuthentication, user } = useAuthStore();
  return isAuthentication && user ? (
   <>
    <Header />
    <Outlet />
   </>
  ):(
    <Navigate to={"/login"} replace/>
  );
};

export default MainLayout
