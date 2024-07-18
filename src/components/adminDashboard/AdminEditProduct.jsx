import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const AdminEditProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    isDiscounted: false,
    discountedPrice: '',
    discountPercentage: '',
    type: '',
    style: '',
    description: '',
    descriptionDetails: '',
    details: '',
  })
  const { id } = useParams()

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3002/products/${id}`)
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error('Error fetching products', error.message)
    }
  }
  useEffect(() => {
    fetchProduct()
  }, [id])

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target
    const isCheckbox = type === 'checkbox'
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: isCheckbox ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`http://localhost:3002/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      const data = await response.json()
      console.log('Product updated', data)
    } catch (error) {
      console.error('Error updating product', error.message)
    }
  }

  console.log(product)

  return (
    <div>
      <div className="flex flex-row items-center justify-start">
        <h3 className="font-satoshi_regular text-2xl font-bold">
          Edit Product
        </h3>
      </div>
      <div className="mt-10 rounded-lg bg-background px-8 py-8 lg:px-16">
        <div className="flex w-full flex-row">
          <form className="w-full">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 lg:flex-row">
                <label
                  htmlFor="title"
                  className="font-satoshi_regular text-lg lg:w-1/5"
                >
                  Title
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
              <div className="flex flex-col gap-3 lg:flex-row">
                <label
                  htmlFor="mainImage"
                  className="font-satoshi_regular text-lg lg:w-1/5"
                >
                  Main Image
                </label>
                <input
                  type="number"
                  id="mainImage"
                  name="mainImage"
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <label
                  htmlFor="price"
                  className="font-satoshi_regular text-lg lg:w-1/5"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={(event) => handleChange(event)}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <label
                  htmlFor="isDiscounted"
                  className="font-satoshi_regular text-lg lg:w-1/5"
                >
                  is Discounted
                </label>
                <div className="flex w-full justify-start rounded-lg px-2">
                  <input
                    type="checkbox"
                    id="isDiscounted"
                    name="isDiscounted"
                    checked={product.isDiscounted}
                    onChange={handleChange}
                    className="scale-150 bg-gray-300/50"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <label
                  htmlFor="discountPercentage"
                  className="font-satoshi_regular text-lg lg:w-1/5"
                >
                  Discount Percentage
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={product.discountPercentage}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <label
                  htmlFor="type"
                  className="font-satoshi_regular text-lg lg:w-1/5"
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
                  <option value="T-shirts">T-shirts</option>
                  <option value="Shorts">Shorts</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Hoodie">Hoodie</option>
                  <option value="Jeans">Jeans</option>
                </select>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <label
                  htmlFor="style"
                  className="font-satoshi_regular text-lg lg:w-1/5"
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
                  <option value="Party">Party</option>
                  <option value="Gym">Gym</option>
                </select>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <label
                  htmlFor="description"
                  className="font-satoshi_regular text-lg lg:w-1/5"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  value={product.description}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <label
                  htmlFor="descriptionDetails"
                  className="font-satoshi_regular text-lg lg:w-1/5"
                >
                  Description Details
                </label>
                <textarea
                  id="descriptionDetails"
                  name="descriptionDetails"
                  rows={4}
                  value={product.descriptionDetails}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                />
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <label
                  htmlFor="details"
                  className="font-satoshi_regular text-lg lg:w-1/5"
                >
                  Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  value={product.details}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-300/50 px-3 py-2"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-6 rounded-lg bg-black px-3 py-2 text-white"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminEditProduct
