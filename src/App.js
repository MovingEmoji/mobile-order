import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './elements/header/Header';
import axios from 'axios';
import Home from './pages/home/Home';
import RegisterUser from './pages/register/user/RegisterUser';

function App() {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
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
