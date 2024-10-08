import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function ItemCard(props) {

    const [cookies, setCookie] = useCookies();

    const navigate = useNavigate();

    function handleClick() {
        setCookie('ItemName', props.title);
        setCookie('ItemImage', props.image);
        setCookie('ItemCost', props.cost);
        navigate("/addcart");
    }
    var text = props.text.replace("<br/>","\n");
    return(
        <div className="Card-Wrapper">
            <div className="Image-Wrapper">
                <img src={"./images/" + props.image} alt="item"></img>
            </div>
            <p>{props.title}</p>
            <p className="Small-Wrapper">{text}</p>
            <div className="Info-Wrapper">
                <p className="Big-Wrapper">{props.cost + "円"}</p>
                <button className="Button-Wrapper" onClick={handleClick}>追加する</button>
            </div>
        </div>
    );
}
export default ItemCard