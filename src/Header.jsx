import Cart from './svgs/shopping-cart.svg'
import ItemShow from './ItemShow';
function Header() {
    return(
        <header>
            <h1>BANDO SWEETS</h1>
            <a href='/cart'>
                <div className="Cart-Wrapper">
                    <img src={Cart} alt="cart"></img>
                    <ItemShow/>
                </div>
            </a>
        </header>
    )
}
export default Header

