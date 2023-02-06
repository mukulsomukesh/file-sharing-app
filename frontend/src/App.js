import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (

    <>

<Box
bg="#f4f5f7"
  w='100vw'
  h='100vh'
  minH="fit-content">

{/* navbar */}
<Navbar />

{/* allroutes */}
<AllRoutes />

</Box>
    </>

  );
}

export default App;
