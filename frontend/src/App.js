import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (

    <>

<Box bg="#f4f5f7" h="fit-content" minH={"100vh"} w="100%" fontFamily="sans-serif" >

{/* navbar */}
<Navbar />

{/* allroutes */}
<AllRoutes />

</Box>
    </>

  );
}

export default App;
