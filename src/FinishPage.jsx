import { useCookies } from "react-cookie";

function FinishPage() {

    const [cookies, setCookie, removeCookie] = useCookies();

    function handleCart() {
        setCookie('Chache', true);
        removeCookie('ItemName');
        removeCookie('ItemImage');
        removeCookie('ItemCount');
        removeCookie('ItemCost');
        window.location.href = "/cart";
    }

    function handleHome() {
        removeCookie('ItemName');
        removeCookie('ItemImage');
        removeCookie('ItemCount');
        removeCookie('ItemCost');
    }

    if(cookies.ItemCount !== 'undefined' && cookies.ItemCount !== undefined) {
        return(
            <main>
                <div className="Card-Wrapper Finish-Wrapper">
                    <h2>商品を追加しました。</h2>
                    <div className="Flex-Wrapper ItemInfo-Wrapper">
                        <img src={"./images/" + cookies.ItemImage} alt="item"></img>
                        <div className="Grid-Wrapper">
                            <p>{cookies.ItemName}</p>
                            <p>{cookies.ItemCount + "個"}</p>
                        </div>
                    </div>
                    <div className="Info-Wrapper">
                        <button className="Button-Wrapper" style={{ marginInlineEnd : 5 + 'px', paddingBlock : 10 + 'px', backgroundColor : '#FF5050'}} onClick={handleHome}>買い物を続ける</button>
                        <button className="Button-Wrapper" style={{ marginInlineStart : 5 + 'px', paddingBlock : 10 + 'px', backgroundColor : '#6ED46E'}} onClick={handleCart}>カートへ行く</button>
                    </div>
                </div>
            </main>
        );
    } else {
        if (cookies.Chache !== true) {
            window.location.href = "/";
        }
    }
}

export default FinishPage