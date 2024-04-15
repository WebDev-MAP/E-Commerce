import Breadcrumbs from '../components/Breadcrumbs'
import PaginatedItems from '../components/PaginatedItems'
import SideBar from '../components/SideBar'
import Newsletter from '../components/Newsletter'

function PageCategory() {
  return (
    <div className="mx-[16px] lg:mx-[100px]">
      <div className="my-5">
        <Breadcrumbs />
      </div>
      {/* Sidebar */}
      <div className="flex ">
        <SideBar />
        <PaginatedItems itemsPerPage={6} />
        <div className="block"></div>
      </div>
      <div className="mt-20">
        <Newsletter />
      </div>
    </div>
  )
}
export default PageCategory
