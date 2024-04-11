import Breadcrumbs from '../components/Breadcrumbs'
import PaginatedItems from '../components/PaginatedItems'
import SideBar from '../components/SideBar'

function PageCategory() {
  return (
    <div className="mx-[16px] lg:mx-[100px]">
      <div className="my-5">
        <Breadcrumbs />
      </div>
      {/* Sidebar */}
      <div className="flex">
        <SideBar />
        <PaginatedItems itemsPerPage={6} />
      </div>
    </div>
  )
}
export default PageCategory
