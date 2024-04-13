// AuthPage.jsx
import Login from '../components/Login';
import Register from '../components/Register';

function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <h2 className="my-8 font-integral_cf text-3xl font-bold text-black">
        Login or Register
      </h2>

      <div className="flex flex-col space-y-8">
        <div className="w-full">
          <h3 className="font-integral_cf text-2xl font-bold text-black">
            Login
          </h3>
          <p className="text-black font-satoshi_bold mb-2">Already have an account? Login here.</p>
          <Login />
        </div>
        <div className="w-full">
          <h3 className="font-integral_cf text-2xl font-bold text-black">
            Register
          </h3>
          <p className="text-black font-satoshi_bold mb-2">
            Don't have an account yet? Register here.
          </p>
          <Register />
        </div>
      </div>
    </div>
  )
}

export default AuthPage;
