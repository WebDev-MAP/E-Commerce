import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
/* import { NavLink } from 'react-router-dom'; */
import Login from '../components/Login';
import Register from '../components/Register';


function AuthPage() {
  const [expanded, setExpanded] = useState(false);

  // Funktion zum Ändern des Zustands des Akkordeons
  const handleChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (

    <div className="flex flex-col items-center justify-center bg-white mt-6 relative rounded-lg">
      <div className='border-2 border-gray-400 rounded-lg opacity-100 shadow-xl hover:shadow-2xl transition duration-900 ease-in-out relative z-10 py-3 px-6'>
        <h2 className="mb-6 font-integral_cf text-3xl font-bold text-black animate-pulse">
          Login or Register
        </h2>
      
        <div className="w-full">
          <h3 className="font-integral_cf text-2xl font-bold text-black">Login</h3>
          <p className="text-black font-satoshi_bold mb-2">Already have an account? Login here.</p>
          <Login />
        </div>
        
        
        <Accordion expanded={expanded} onChange={handleChange}>
          <AccordionSummary
            expandIcon={<FaAngleDown />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <h3 className="text-black font-satoshi_bold">No account yet? Register here.</h3>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col space-y-2">
              <p className=" font-integral_cf text-2xl font-bold text-black mb-2">Register</p>
              <Register />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default AuthPage;