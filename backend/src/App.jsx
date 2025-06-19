import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="main w-full h-screen flex justify-center items-center bg-zinc-800">
      <div className="wrap w-[55dvh] h-[55vw] flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
