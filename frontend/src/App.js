import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from "./components/Footer"
import AllRoutes from './routes/AllRoutes';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function App() {

  // get page url
  const { pathname } = useLocation();

  // scroll page to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>

      {/* START: Box container */}
      <Box bg="secondry.100" h="fit-content" minH={"100vh"} w="100%" >

        {/* navbar */}
        <Navbar />

        {/* allroutes */}
        <Box minH={"90vh"} w="100%" fontFamily="sans-serif" >
          <AllRoutes />
        </Box>

        {/* footer */}
        <Footer />

      </Box>
      {/* END: Box container */}

    </>
  );
}

export default App;
