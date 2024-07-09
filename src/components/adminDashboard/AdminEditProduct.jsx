import React from 'react'
import { useState, useEffect } from 'react'

const AdminEditProduct = ({ id }) => {
  const [product, setProduct] = useState('')

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
    const { name, value } = event.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
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

  return (
    <div>
      <div className="flex flex-row items-center justify-start">
        <h3 className="font-satoshi_regular text-2xl font-bold">
          Edit Product
        </h3>
      </div>
      <div className="mt-10 rounded-lg bg-slate-200/50 px-16 py-8">
        <div className="flex w-full flex-row">
          <form className="w-full">
            <div className="flex flex-col gap-5">
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
                  htmlFor="price"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  isDiscounted
                </label>
                <input
                  type="checkbox"
                  id="isDiscounted"
                  name="isDiscounted"
                  value={product.isDiscounted}
                  onChange={handleChange}
                  className="flex w-full justify-start rounded-lg bg-slate-300/50 py-2"
                />
              </div>
              <div className="flex flex-row gap-3">
                <label
                  htmlFor="discountedPrice"
                  className="w-1/5 font-satoshi_regular text-lg"
                >
                  discountedPrice
                </label>
                <input
                  type="number"
                  id="discountedPrice"
                  name="discountedPrice"
                  value={product.discountedPrice}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-300/50 px-3 py-2"
                />
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
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded-lg bg-black px-3 py-2 text-white"
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
