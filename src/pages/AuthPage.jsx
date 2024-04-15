import Login from '../components/Login';
import Register from '../components/Register';

function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-white mt-6 relative rounded-lg">
      <div className='border-2 border-gray-400 rounded-lg opacity-100 shadow-xl hover:shadow-2xl transition duration-900 ease-in-out relative z-10 py-3 px-6'>

        <h2 className="mb-6 font-integral_cf text-3xl font-bold text-black animate-pulse">
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
    </div>
  );
}

export default AuthPage;
