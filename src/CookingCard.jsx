import { axiosInstance } from "./App";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

function CookingCard(props) {

    const [toggle, setToggle] = useState({ display : 'none'});
    const [rotate, setRotate] = useState({ transform: "translate(-50%, -50%) rotate(0deg)"});
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();

    function handlePending() {
        async function loading() {
            const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
            var deg = 0;
            for(let i = 0; i < 100; i++) {
                setRotate({ transform: "translate(-50%, -50%) rotate(" + deg + "deg)"});
                deg += 10;
                await sleep(10);
            }
        }
        setToggle({ display : 'block'});
        loading();
        var data = {
            token: cookies.token,
            uuid : props.uuid,
            status : "pending"
        }
        axiosInstance.post("/update", data)
            .then(res => {
                console.log(res.data);
            });
    }

    function handleComplete() {
        async function loading() {
            const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
            var deg = 0;
            for(let i = 0; i < 100; i++) {
                setRotate({ transform: "translate(-50%, -50%) rotate(" + deg + "deg)"});
                deg += 10;
                await sleep(10);
            }
        }
        setToggle({ display : 'block'});
        loading();
        var data = {
            token: cookies.token,
            uuid : props.uuid,
            status : "complete"
        }
        var load = 0;
        axiosInstance.post("/update", data)
            .then(res => {
                console.log(res.data);
            });
    }

    return(
        <div className="Order-Card-Wrapper">
            <div className="Loading-Wrapper" style={ toggle }>
                <div className="Loading"></div>
                <div className="Circle"></div>
                <div className="Circle-Wrapper" style={ rotate }></div>
            </div>
            <div className="Order-Card-Info">
                <p>オーダー番号: { props.id }</p>
                <p style={{ fontSize : 15 + 'px' }}>{ props.uuid }</p>
                <div className="Order-Item-Info">
                    <p>パ:{ props.cake }</p>
                    <p>ワ:{ props.waffle }</p>
                    <p>ダ:{ props.dango }</p>
                    <p style={{ color : '#000000'}}>合計: { props.total }円</p>
                </div>
            </div>
            <div className="Order-Card-Buttons">
                <button className="Order-Button" style={{ backgroundColor : '#FF5050' }} onClick={handlePending}>戻す</button>
                <button className="Order-Button" onClick={handleComplete}>完成</button>
            </div>
        </div>
    );
}

export default CookingCard;