import { useCookies } from "react-cookie";

function ItemShow() {

    const[cookies] = useCookies();

    if (cookies.cartItems !== "undefined" && cookies.cartItems !== undefined && cookies.cartItems.length !== 0) {
        return (
            <p>{cookies.cartItems.length}</p>
        );
    }
}
export default ItemShow