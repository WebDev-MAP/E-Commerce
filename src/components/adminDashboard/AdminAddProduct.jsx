import React from 'react'
import { useState, useEffect } from 'react'
import { FaPercent } from 'react-icons/fa'

const AdminAddProduct = ({ id }) => {
  const initialState = {
    title: '',
    mainImage: '',
    price: 0,
    isDiscounted: false,
    discountPercentage: 0,
    type: '',
    style: '',
    description: '',
    descriptionDetails: '',
    details: '',
    sizes: [],
    colors: [],
  }

  const [product, setProduct] = useState(initialState)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }))
    console.log(name, newValue)
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
    console.log({ product })
    try {
      const response = await fetch(`http://localhost:3002/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      const data = await response.json()
      console.log('Product added', data)
    } catch (error) {
      console.error('Error adding product', error.message)
    }
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-start">
        <h3 className="font-satoshi_regular text-2xl font-bold">Add Product</h3>
      </div>
      <div className="mt-10 rounded-lg bg-slate-200/50 px-16 py-8">
        <div className="flex w-full flex-row">
          <form className="w-full">
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="title"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-300/50 px-3 py-2"
                />
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="mainImage"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Main Image URL
                </label>
                <input
                  type="text"
                  id="mainImage"
                  name="mainImage"
                  value={product.mainImage}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-300/50 px-3 py-2"
                />
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="price"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-300/50 px-3 py-2"
                />
              </div>
              <div className="flex flex-row gap-3">
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
                  className="flex w-full justify-start rounded-lg bg-slate-300/50 py-2"
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
                    className="w-full rounded-lg bg-slate-300/50 px-3 py-2 pl-10"
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
                  className="w-full rounded-lg bg-slate-300/50 px-3 py-2"
                >
                  {[
                    'Dresses',
                    'Jackets',
                    'Jeans',
                    'Pants',
                    'Shirts',
                    'Shoes',
                    'Skirts',
                    'Sweaters',
                    'T-shirts',
                  ]
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
                  className="w-full rounded-lg bg-slate-300/50 px-3 py-2"
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
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-300/50 px-3 py-2"
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
                  className="w-full rounded-lg bg-slate-300/50 px-3 py-2"
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
                  className="w-full rounded-lg bg-slate-300/50 px-3 py-2"
                ></textarea>
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="sizes"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  Sizes
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
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-5 rounded-lg bg-black px-3 py-2 text-white"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminAddProduct
