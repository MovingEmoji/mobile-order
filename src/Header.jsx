import Cart from './svgs/shopping-cart.svg'
import ItemShow from './ItemShow';
import { Link } from 'react-router-dom';
function Header() {
    return(
        <header>
            <h1>BANDO SWEETS</h1>
            <Link to="/cart">
                <div className="Cart-Wrapper">
                    <img src={Cart} alt="cart"></img>
                    <ItemShow/>
                </div>
            </Link>
        </header>
    )
}
export default Header

