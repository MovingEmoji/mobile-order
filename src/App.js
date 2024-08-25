import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header';
import ItemList from './ItemList';
import AddPage from './AddPage';
import FinishPage from './FinishPage';
import Cart from './Cart';
function App() {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/addcart" element={<AddPage />} />
        <Route path="/finishadd" element={<FinishPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<main><h1>404 Not Found</h1></main>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
