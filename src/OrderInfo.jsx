import { useEffect, useState } from "react";
import { axiosInstance } from "./App";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

function OrderInfo() {

    const [cookies, setCookie, removeCookie] = useCookies();
    const [orderID, setID] = useState();
    const [cake, setCake] = useState();
    const [waffle, setWaffle] = useState();
    const [dango, setDango] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(!cookies.token) {
            setCookie("pastPage", "/orderinfo");
            window.location.href = ("/login");
        } else {
            if(cookies.inquiryID !== undefined && cookies.inquiryID !== "undefined") {
                var data = {
                    token: cookies.token,
                    target: cookies.inquiryID
                }
                axiosInstance.post("/order", data)
                    .then(res => {
                        setID(res.data.number);
                        var cake = 0, waffle = 0, dango = 0;
                        for(const item of res.data.items) {
                            switch(item.number) {
                                case 1:
                                    cake += item.count;
                                    break;
                                case 2:
                                    waffle += item.count;
                                    break;
                                case 3:
                                    dango += item.count;
                                    break;
                                default:
                                    break;
                            }
                        }
                        setCake(cake);
                        setWaffle(waffle);
                        setDango(dango);
                    });
            } else {
                window.location.href = ("/");
            }
        }
    }, []);
    return(
        <div className="Orders">
            <div className="Order-Contents" style={{ display : 'block'}}>
                <p className="OrderNumber-Wrapper">オーダー番号: {orderID}</p>
                <p className="OrderContent-Wrapper">パンケーキ: {cake} 個</p>
                <p className="OrderContent-Wrapper">ワッフル: {waffle} 個</p>
                <p className="OrderContent-Wrapper">だんご: {dango} 個</p>
            </div>
            <div className="Back-Wrapper">
                <button className="Back-Button" onClick={() => {navigate("/orders")}}>戻る</button>
            </div>
        </div>
    );
}
export default OrderInfo;