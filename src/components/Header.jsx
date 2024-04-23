import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [isLogged, setIsLogged] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate();

  const logout = () => {
    setIsLogged(false);
};



  useEffect(() => {
    if (!isLogged) {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
    }
}, [navigate, isLogged]);

  return (
    <div className='bg-gradient-to-br from-blue-600 to-cyan-300'>
    <div className='mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8'>
    <div className='flex items-center justify-between'>
      <div className='bg-white px-3 py-1 rounded-md'>
      <p className='font-black text-blue-600 uppercase tracking-wider text-3xl'>Budget Calculator</p>
      </div>

      <div className='flex items-center gap-3'>
      <div className="inline-flex items-center justify-center w-12 h-12 text-xl text-white bg-indigo-500 rounded-full cursor-pointer" onClick={() => logout()} >
      <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
</svg>

</div>
      <div className="inline-flex items-center justify-center w-12 h-12 text-xl text-white bg-indigo-500 rounded-full">
      {user?.name ? user?.name.charAt(0) : ''}
</div>
<p className="font-bold text-gray-800 text-lg">{user?.name}</p>
        

      </div>

    </div>
    </div>
    </div>
  )
}

export default Header
