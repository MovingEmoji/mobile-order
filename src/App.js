import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header';
import ItemList from './ItemList';
import AddPage from './AddPage';
import FinishPage from './FinishPage';
import Cart from './Cart';
import Ordered from './Ordered';
import Confirm from './Confirm';
import Orders from './Orders';
import Payment from './Payment';
import CustomerUI from './CustomerUI';
import axios from 'axios';
import Login from './Login';
function App() {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
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
        <Route path="*" element={<main><h1>404 Not Found</h1></main>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:30003",
  headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
            }
});
