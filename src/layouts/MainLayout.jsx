import Header from "../components/Header"
import DashboardView from "../pages/DashboardView"

const MainLayout = () => {
  return (
   <>
    <Header />
    <DashboardView />
    <h1 className="bg-black w-full text-white">Footer</h1>
   </>
  )
}

export default MainLayout
