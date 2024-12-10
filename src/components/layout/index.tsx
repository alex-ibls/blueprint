import Footer from './footer';
import { Header } from './header';
import { ReactElement } from 'react';


const Lauout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <>{children}</>
      </main>
      <Footer />
    </>
  );
};

export default Lauout;
