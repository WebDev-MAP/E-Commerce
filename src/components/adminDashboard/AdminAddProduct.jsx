import React, { useState } from 'react'
import { FaPercent, FaSpinner } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'

const AdminAddProduct = ({ id }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3002'

  const initialProductState = {
    title: '',
    mainImage: '',
    price: 0,
    isDiscounted: false,
    discountPercentage: 0,
    type: 'Jeans',
    style: 'Casual',
    description: '',
    descriptionDetails: '',
    details: '',
    sizes: [],
    colors: [],
  }

  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(initialProductState)

  const validateForm = () => {
    const newErrors = {}
    if (!product.title) newErrors.title = 'Title is required'
    if (!product.mainImage) newErrors.mainImage = 'Main Image is required'
    if (!product.price || product.price <= 0)
      newErrors.price = 'Price is required'
    if (!product.type) newErrors.type = 'Type is required'
    if (!product.style) newErrors.style = 'Style is required'
    if (!product.description) newErrors.description = 'Description is required'
    if (!product.sizes.length) newErrors.sizes = 'Sizes are required'
    if (!product.colors.length) newErrors.colors = 'Colors are required'
    return newErrors
  }

  const createProduct = async (url, data) => {
    try {
      const response = await fetch(`${url}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()
      return responseData
    } catch (error) {
      console.error('Error creating product', error.message)
    }
  }

  const handleImageChange = (imageFile) => {
    if (
      imageFile &&
      (imageFile.type === 'image/jpeg' ||
        imageFile.type === 'image/png' ||
        imageFile.type === 'image/jpg')
    ) {
      const readFile = new FileReader()
      readFile.readAsDataURL(imageFile)
      readFile.onloadend = () => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          mainImage: readFile.result,
        }))
        setErrors((prevErrors) => ({ ...prevErrors, mainImage: '' }))
      }
    } else {
      setProduct((prevProduct) => ({ ...prevProduct, mainImage: '' }))
      setErrors((prevErrors) => ({
        ...prevErrors,
        mainImage: 'Invalid file type',
      }))
    }
  }

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target
    const newValue = type === 'checkbox' ? checked : value

    if (name === 'mainImage') {
      handleImageChange(files[0])
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: newValue,
      }))
    }
  }

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: checked
        ? [...prevProduct[name], value]
        : prevProduct[name].filter((item) => item !== value),
    }))
    console.log(name, value, checked)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    const response = await createProduct(baseUrl, product)

    setLoading(false)
    setMessage(response.message)

    toast.success(response.message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    setTimeout(() => {
      setMessage(null)
    }, 5000)

    setProduct(initialProductState)
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto">
      <div className="flex flex-row items-center justify-start">
        <h3 className="font-satoshi_regular text-2xl font-bold">Add Product</h3>
      </div>
      {message && (
        <p className="mt-3 text-xs font-bold text-green-500">{message}</p>
      )}
      <div className="mt-10 rounded-lg bg-background px-16 py-8">
        <div className="flex w-full flex-row">
          <form className="w-full">
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="title"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Title
                  {errors.title && (
                    <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                  )}
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                />
              </div>
              <div>
                <div className="flex flex-row gap-3">
                  <label
                    htmlFor="mainImage"
                    className="w-1/5 font-satoshi_regular text-lg"
                  >
                    Main Image
                    {errors.mainImage && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.mainImage}
                      </p>
                    )}
                  </label>
                  <div className="w-full">
                    <input
                      type="file"
                      id="mainImage"
                      name="mainImage"
                      onChange={handleChange}
                      className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                    />
                    {product.mainImage && (
                      <img
                        src={product.mainImage}
                        alt="Uploaded Preview"
                        className="mt-3 w-36 max-w-xs"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="price"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Price
                  {errors.price && (
                    <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                  )}
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                />
              </div>
              <div className="flex flex-row items-center gap-3">
                <label
                  htmlFor="isDiscounted"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Is Discounted
                </label>
                <input
                  type="checkbox"
                  id="isDiscounted"
                  name="isDiscounted"
                  checked={product.isDiscounted}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="discountPercentage"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Discount Percentage
                </label>
                <div className="relative flex w-full items-center">
                  <FaPercent className="absolute ml-4 h-5 w-3 text-black text-opacity-40" />
                  <input
                    type="number"
                    id="discountPercentage"
                    name="discountPercentage"
                    value={product.discountPercentage}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-gray-300/50 px-3 py-2 pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="type"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={product.type}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                >
                  {['Shirts', 'Jeans', 'T-shirts', 'Shorts']
                    .sort()
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="style"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Style
                </label>
                <select
                  id="style"
                  name="style"
                  value={product.style}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                >
                  <option value="Casual">Casual</option>
                  <option value="Formal">Formal</option>
                  <option value="Sporty">Gym</option>
                  <option value="Party">Party</option>
                </select>
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="description"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Description
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.description}
                    </p>
                  )}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                ></textarea>
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="descriptionDetails"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Description Details
                </label>
                <textarea
                  id="descriptionDetails"
                  name="descriptionDetails"
                  value={product.descriptionDetails}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                ></textarea>
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="details"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={product.details}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                ></textarea>
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="sizes"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Sizes
                  {errors.sizes && (
                    <p className="mt-1 text-xs text-red-500">{errors.sizes}</p>
                  )}
                </label>
                <div className="flex w-full flex-wrap gap-3">
                  {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                    <div key={size} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`size-${size}`}
                        name="sizes"
                        value={size}
                        checked={product.sizes.includes(size)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className="font-satoshi_regular text-lg"
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="colors"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Colors
                  {errors.colors && (
                    <p className="mt-1 text-xs text-red-500">{errors.colors}</p>
                  )}
                </label>
                <div className="flex w-full flex-wrap gap-3">
                  {[
                    'black',
                    'silver',
                    'gray',
                    'white',
                    'maroon',
                    'red',
                    'purple',
                    'fuchsia',
                    'green',
                    'lime',
                  ].map((color) => (
                    <div key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`color-${color}`}
                        name="colors"
                        value={color}
                        checked={product.colors.includes(color)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`color-${color}`}
                        className="font-satoshi_regular text-lg"
                      >
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {loading ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="mt-5 rounded-lg bg-black px-3 py-2 text-white"
                  disabled
                >
                  Adding Product...
                </button>
                <FaSpinner className="animate-spin" />
              </div>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="mt-5 rounded-lg bg-black px-3 py-2 text-white"
              >
                Add Product
              </button>
            )}
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminAddProduct
