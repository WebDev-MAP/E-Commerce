import { MdEdit } from 'react-icons/md'
import { useShopContext } from '../../context/ShopContext'
import { useState } from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

const UserSettings = () => {
  const { userData, setUserData } = useShopContext()
  const { first_name, last_name, email } = userData
  const [editFirstName, setEditFirstName] = useState(false)
  const [editLastName, setEditLastName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const navigate = useNavigate()

  const handleChange = (fieldName, value) => {
    setUserData({
      ...userData,
      [fieldName]: value,
    })
  }

  const updateUserData = async (fieldName, value) => {
    const userID = userData._id

    if (fieldName === 'email') {
    }

    try {
      fetch(`http://localhost:3002/user/${userID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [fieldName]: value }),
      })
    } catch (error) {
      console.error('Error updating user data', error.message)
    }
  }

  const deleteAccount = async () => {
    const userID = userData._id
    try {
      fetch(`http://localhost:3002/user/${userID}`, {
        method: 'DELETE',
      })
      navigate('/')
    } catch (error) {
      console.error('Error deleting user account', error.message)
    }
  }

  const userSettings = [
    {
      label: 'Firstname',
      value: first_name,
      edit: editFirstName,
      setEdit: setEditFirstName,
      field: 'first_name',
    },
    {
      label: 'Lastname',
      value: last_name,
      edit: editLastName,
      setEdit: setEditLastName,
      field: 'last_name',
    },
    {
      label: 'Email',
      value: email,
      edit: editEmail,
      setEdit: setEditEmail,
      field: 'email',
    },
  ]

  return (
    <div className="font-satoshi_regular ">
      <div className="mb-6">
        <p className="text-2xl">Profile Settings</p>
        <p>Adjust the key information of your account.</p>
      </div>

      {userSettings.map((setting, index) => {
        return (
          <div
            key={index}
            className="my-2 rounded-md border border-black px-4 py-2"
          >
            <div className="flex justify-between gap-10">
              <label className="">{setting.label}</label>
              <div className="flex w-1/2 items-center">
                {setting.edit ? (
                  <input
                    autoFocus
                    value={setting.value}
                    type="text"
                    onBlur={(e) => {
                      if (e.target.value <= 0) {
                        setUserData({
                          ...userData,
                        })
                        return alert('Please enter a valid value')
                      } else {
                        setting.setEdit(!setting.edit)
                        setUserData({
                          ...userData,
                          [setting.field]: e.target.value,
                        })
                        updateUserData(setting.field, e.target.value)
                      }
                    }}
                    onChange={(e) =>
                      handleChange(setting.field, e.target.value)
                    }
                    className=" px-2"
                  />
                ) : (
                  <p className=" px-2">{setting.value}</p>
                )}

                <MdEdit
                  onClick={() => setting.setEdit(!setting.edit)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        )
      })}

      <div>
        <p className="text-2xl">Delete your account</p>
        <p>
          This action cannot be undone. Please be certain before proceeding.
        </p>
        <Button danger className="mt-2" onClick={deleteAccount}>
          Delete Account
        </Button>
      </div>
    </div>
  )
}

export default UserSettings
