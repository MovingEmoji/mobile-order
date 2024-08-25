import { useCookies } from "react-cookie";

function CartCard(props) {

    const [cookies, setCookie] = useCookies();

    function handleDelete() {
        var cart = cookies.cartItems;
        var newCart = cart.filter(function(item, index) {
            if(item.id !== props.id) return true;
            return false;
        });
        console.log(newCart);
        setCookie('cartItems', newCart);
    }

    return(
        <div className="Card-Wrapper" key={props.keycount}>
            <div className="CartItem-Wrapper">
                <img src={"./images/" + props.image} alt="item"></img>
                <div className="Grid-Wrapper">
                    <p>{props.name}</p>
                    <p>{props.count + "個"}</p>
                </div>
                <div className="Grid-Wrapper" style={{marginLeft : 'auto'}}>
                    <p>{props.cost + "円"}</p>
                </div>
            </div>
            <button className="DeleteButton-Wrapper" onClick={handleDelete}>削除する</button>
        </div>
    );

}

export default CartCard