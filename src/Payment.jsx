import { useCookies } from "react-cookie";
import CalcButton from "./CalcButton";
import PaymentButton from "./PaymentButton";
import { useEffect, useState } from "react";
import { axiosInstance } from "./App";
import PaymentCard from "./PaymentCard";
import { useNavigate } from "react-router";

function Payment() {

    const [cookies, setCookie, removeCookie] = useCookies();
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState();
    const [buttonstyle, setStyle] = useState();
    const [otherOrders, setOrders] = useState();
    const navigate = useNavigate();

    function handleBack() {
        axiosInstance.post("/setcustomer", "reset")
            .then(resetRes => {
                console.log(resetRes.data);
                });
        removeCookie("uuid");
        removeCookie("paymentUUID");
        navigate("/orders");
    }

    useEffect(() => {

        function getPayment() {
            if(cookies.paymentUUID) {
                axiosInstance.post("/getpayment", {
                    target: cookies.paymentUUID
                })
                    .then(res => {
                        console.log(res.data);
                        if(res.data.status == "complete") {
                            setTotal("お釣り " + res.data.change + " 円");
                            setStyle({display : 'block'});
                        } else if(res.data.status == "paypayPending") {
                            setTotal("QRコードを読み込んでもらってください")
                            setStyle({display : 'none'});
                            
                        }
                    });
            }
        }

        setCookie("calc", 0);
        axiosInstance.post("/customer", "get")
        .then(res => {
            if(res.data != "failed") {
                var uuid = res.data.uuid;
                axiosInstance.post("/order", {
                    target : uuid,
                })
                    .then(res => {
                        setTotal("合計 " + res.data.total + " 円");
                        setCookie("uuid", res.data.uuid);
                        var ItemList = [];
                        for(const item of res.data.items) {
                            ItemList.push(
                                <PaymentCard name={item.name} image={item.image} count={item.count} cost={item.cost} key={ItemList.length}/>
                            );
                            setItems(ItemList);
                        }
                    });
            } else {
                setOrders(
                    <div className="Add-Items">
                        <button className="Add-Button">パンケーキ</button>
                        <button className="Add-Button">ワッフル</button>
                        <button className="Add-Button">だんご</button>
                    </div>
                );
            }
        })
        
        const interval = setInterval(() => {
            getPayment();
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    

    return(
        <div className="Orders">
            <div className="Order-Contents" style={{ height : '100%' }}>
                <div className="Order-Info">
                    <div className="Order-List" style={{ height : '85%', width : '100%'}}>
                        {items}
                    </div>
                    <p style={{ textAlign : 'center', fontSize : '25px', fontWeight : 'bold'}}>{total}</p>
                </div>
                <div className="Add-Order">
                    {otherOrders}
                    <div className="Payment-Box">
                        <div className="Calc">
                            <div className="Calc-Viewer">
                                <p>{ cookies.calc }</p>
                            </div>
                            <div className="Calc-Row">
                                <CalcButton number={7} />
                                <CalcButton number={8} />
                                <CalcButton number={9} />
                            </div>
                            <div className="Calc-Row">
                                <CalcButton number={4} />
                                <CalcButton number={5} />
                                <CalcButton number={6} />
                            </div>
                            <div className="Calc-Row">
                                <CalcButton number={1} />
                                <CalcButton number={2} />
                                <CalcButton number={3} />
                            </div>
                            <div className="Calc-Row">
                                <CalcButton number={0} />
                                <CalcButton number="00" />
                                <CalcButton number="C" />
                            </div>
                        </div>
                        <div className="Payment-Mode">
                            <PaymentButton text="ＰＡＹＰＡＹ" />
                            <PaymentButton text="現金 / 預かり" />
                        </div>
                    </div>
                    <div className="Back-Wrapper">
                        <button className="Back-Orders" onClick={handleBack} style={buttonstyle}>管理表にもどる</button>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Payment;