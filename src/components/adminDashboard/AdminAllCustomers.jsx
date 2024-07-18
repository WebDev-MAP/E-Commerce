import { useEffect, useState } from 'react'
import AdminEditUser from './AdminEditUser'
import { toast, ToastContainer } from 'react-toastify'

const AdminAllCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [query, setQuery] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)

  const notify = (message) => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const filteredCustomers = customers
    .filter((customer) => {
      const searchQuery = query.toLowerCase()
      return (
        customer._id.toLowerCase().includes(searchQuery) ||
        customer.first_name.toLowerCase().includes(searchQuery) ||
        customer.last_name.toLowerCase().includes(searchQuery) ||
        customer.email.toLowerCase().includes(searchQuery) ||
        customer.role.toLowerCase().includes(searchQuery) ||
        new Date(customer.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchQuery) ||
        new Date(customer.updatedAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchQuery)
      )
    })
    .map((customer) => ({
      _id: customer._id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      role: customer.role,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }))

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3002/user/')
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error('Error fetching customers', error.message)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const editUser = (userId) => {
    setSelectedUserId(userId)
  }

  function Customers({ currentCustomers }) {
    return (
      <table className="min-w-full border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              ID
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              First Name
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Last Name
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Email
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Role
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Joined Date
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Last Updated Date
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentCustomers.map((customer) => (
            <tr key={customer._id}>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {customer._id}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {customer.first_name}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {customer.last_name}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {customer.email}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {customer.role}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {new Date(customer.updatedAt).toLocaleDateString()}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <button
                  onClick={() => editUser(customer._id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className="h-full">
      <h2 className="mb-4 text-2xl font-bold">All Customers</h2>
      <div className="mt-8 h-1/2 w-full overflow-y-auto rounded-lg bg-background p-4 md:p-8">
        <div className="my-3">
          <form className=" w-3/4 lg:w-1/3">
            <input
              type="text"
              placeholder="Search User"
              className="w-full rounded-xl border-2 border-slate-500/40 px-4 py-2"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
          </form>
        </div>
        <div className="overflow-x-auto">
          <Customers currentCustomers={query ? filteredCustomers : customers} />
        </div>
      </div>
      <div>
        {selectedUserId && (
          <AdminEditUser
            userId={selectedUserId}
            onUserEdited={() => {
              setSelectedUserId(null)
              fetchCustomers()
            }}
            notify={notify}
          />
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  )
}

export default AdminAllCustomers
