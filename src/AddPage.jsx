
import { useCookies } from "react-cookie"
import { useState } from "react";
import Select from "react-select";

function AddPage() {

    const [cookies, setCookie, removeCookie] = useCookies();
    const options = [
        { value: 1, label: "１個" },
        { value: 2, label: "２個" },
        { value: 3, label: "３個" },
    ];
    const [selectedValue, setSelectedValue] = useState(options[0]);

    function handleBack() {
        window.location.href = "/";
        removeCookie('ItemName');
        removeCookie('ItemImage');
        removeCookie('ItemCost');
    }
    
    function handleAdd() {
        var cart = cookies.cartItems;
        if (cart === undefined || cart === "undefined") {
            cart = [];
        }
        const id = cart.length;
        cart.push({
            "id" : id,
            "name" : cookies.ItemName,
            "image" : cookies.ItemImage,
            "count" : selectedValue.value,
            "cost" : cookies.ItemCost * selectedValue.value
        });
        setCookie('cartItems', cart);
        setCookie('ItemCount',  selectedValue.value);
        window.location.href = "/finishadd";
    }
    
    if (cookies.ItemName !== 'undefined' && cookies.ItemImage !== 'undefined' && cookies.ItemName !== undefined && cookies.ItemImage !== undefined) {
        return(
            <main>
                <div className="Card-Wrapper AddItem-Wrapper">
                    <h2>商品を追加する</h2>
                    <div className="Image-Wrapper">
                        <img src={"./images/" + cookies.ItemImage} className="Image-Wrapper" alt="item"></img>
                    </div>
                    <p>{cookies.ItemName}</p>
                    <div className="Flex-Wrapper Select-Wrapper">
                        <p>個数</p>
                        <Select
                            options={options}
                            value={selectedValue}
                            onChange={(newValue) => setSelectedValue(newValue)}
                        />
                    </div>
                    <div className="Info-Wrapper">
                        <button className="Button-Wrapper" style={{ marginInlineEnd : 5 + 'px', paddingBlock : 10 + 'px', backgroundColor : '#FF5050'}} onClick={handleBack}>戻る</button>
                        <button className="Button-Wrapper" style={{ marginInlineStart : 5 + 'px', paddingBlock : 10 + 'px' }} onClick={handleAdd}>追加する</button>
                    </div>
                </div>
            </main>
        );
    } else {
        window.location.href = "/";
    }
}

export default AddPage