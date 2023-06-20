import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from "./components/Footer"
import AllRoutes from './routes/AllRoutes';

function App() {
  return (

    <>

<Box bg="#f4f5f7" h="fit-content" minH={"100vh"} w="100%" fontFamily="sans-serif" >

{/* navbar */}
<Navbar />

{/* allroutes */}

<Box minH={"90vh"} w="100%" fontFamily="sans-serif" >
<AllRoutes />
</Box>



{/* footer */}
<Footer />

</Box>

    </>

  );
}

export default App;
