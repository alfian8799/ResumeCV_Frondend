import { Outlet } from "react-router"

const MainLayout = () => {
  return (
   <>
    <h1 className="">Header</h1>
    <Outlet />
    <h1 className="">Footer</h1>
   </>
  )
}

export default MainLayout
