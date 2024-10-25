import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./App";

function ItemCard(props) {

    const [cookies, setCookie] = useCookies();

    const navigate = useNavigate();

    const [available, setAvailable] = useState();
    const [btext, setBtext] = useState();

    useEffect(() => {
        axiosInstance.post("/available", props.id)
            .then(res => {
                setAvailable(res.data);
                if(parseInt(res.data) > 0) {
                    setBtext("追加する");
                } else {
                    setBtext("SOLD OUT");
                }
            });
    }, []);

    function handleClick() {
        if(parseInt(available) > 0) {
            setCookie('ItemName', props.title);
            setCookie('ItemImage', props.image);
            setCookie('ItemCost', props.cost);
            navigate("/addcart");
        }
    }
    var text = props.text.replace("<br/>","\n");
    return(
        <div className="Card-Wrapper">
            <p>残り: { available } 個</p>
            <div className="Image-Wrapper">
                <img src={"./images/" + props.image} alt="item"></img>
            </div>
            <p>{props.title}</p>
            <p className="Small-Wrapper">{text}</p>
            <div className="Info-Wrapper">
                <p className="Big-Wrapper">{props.cost + "円"}</p>
                <button className="Button-Wrapper" onClick={handleClick}>{ btext }</button>
            </div>
        </div>
    );
}
export default ItemCard