import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './elements/header/Header';
import axios from 'axios';
import Home from './pages/home/Home';

function App() {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/addcart" element={<AddPage />} />
        <Route path="/finishadd" element={<FinishPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ordered" element={<Ordered />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/orders" element={<Orders />} />
        <Route path='/payment' element={< Payment />} />
        <Route path='/customer' element={< CustomerUI />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orderinfo' element={<OrderInfo />} />
        <Route path="*" element={<main><h1>404 Not Found</h1></main>} />
      </Routes> */}
    </BrowserRouter>
  )
}
export default App;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
            }
});
