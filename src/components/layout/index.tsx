import Footer from './footer';
import { Header } from './header';
import { ReactElement } from 'react';


const Lauout = ({ children }: { children: ReactElement }) => {
  return (
    <div className='h-full'>
     {/*  <Header /> */}
      <main className="w-full h-full flex-grow">
        <>{children}</>
      </main>
{/*       <Footer /> */}
    </div>
  );
};

export default Lauout;
