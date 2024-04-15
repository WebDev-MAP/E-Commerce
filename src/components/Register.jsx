import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../data/api'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [street, setStreet] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [city, setCity] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [bankData, setBankData] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    // Überprüfen, ob alle Felder ausgefüllt sind
    if (
      !name ||
      !email ||
      !password ||
      !street ||
      !zipCode ||
      !city ||
      !phoneNumber ||
      !bankData
    ) {
      setError('Please fill in all fields.')
      return
    }
    const success = await registerUser(
      name,
      email,
      password,
      street,
      zipCode,
      city,
      phoneNumber,
      bankData
    )
    if (success) {
      navigate('/')
    } else {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col">
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Password"
      />
      <input
        type="text"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Street"
      />
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Zip Code"
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="City"
      />
     {/*  <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Phone Number"
      />
      <input
        type="text"
        value={bankData}
        onChange={(e) => setBankData(e.target.value)}
        className="mb-2 rounded-md border border-gray-500 px-16 py-2 text-center font-satoshi_regular placeholder-black placeholder-opacity-70
      focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="IBAN"
      /> */}
      <button
        type="submit"
        className="rounded-md bg-black px-4 py-2 font-integral_cf text-white shadow-lg hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Register
      </button>
    </form>
  )
}

export default Register
