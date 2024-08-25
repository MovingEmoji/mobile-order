
import { useCookies } from "react-cookie";
import CartCard from "./CartCard";

function Cart() {

    const [cookies, setCookie, removeCookie] = useCookies();

    var ItemList = [];
    var count = 0;
    var totalCost = 0;

    function handleHome() {
        window.location.href = "/";
    }

    if (cookies.cartItems !== 'undefined' && cookies.cartItems !== undefined) {
        if (cookies.Chache === true) {
            removeCookie('Chache');
        }
        for(const item of cookies.cartItems) {
            ItemList.push(
                <CartCard keycount={count} image={item.image} name={item.name} count={item.count} cost={item.cost} id={item.id}/>
            );
            count += 1;
            totalCost += item.cost;
        }
        return(
            <main>
                <h2 style={{textAlign : 'center'}}>カート</h2>
                {ItemList}
                <div className="Card-Wrapper" key={count}>
                    <p>注文詳細</p>
                    <p>{"合計金額:   " + totalCost + "円"}</p>
                    <div className="Info-Wrapper">
                        <button className="Button-Wrapper" style={{ marginInlineEnd : 5 + 'px', paddingBlock : 10 + 'px', backgroundColor : '#FF5050'}} onClick={ handleHome }>商品選択に戻る</button>
                        <button className="Button-Wrapper" style={{ marginInlineStart : 5 + 'px', paddingBlock : 10 + 'px' }}>注文する</button>
                    </div>
                </div>
            </main>
        );
    } else {
        window.location.href = "/";
    }
    
}
export default Cart