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
    const [totalStatus, setTotalStatus] = useState("");
    const [items, setItems] = useState([]);
    const [buttonstyle, setStyle] = useState();
    const [otherOrders, setOrders] = useState();
    const navigate = useNavigate();

    function handleBack() {
        var data = {
            token: cookies.token,
            uuid: "reset"
        }
        axiosInstance.post("/setcustomer", data)
            .then(resetRes => {
                console.log(resetRes.data);
                });
        navigate("/orders");
    }

    function handleCake() {
        var list = items;
        list.push(
            <PaymentCard name="パンケーキ" image="cake.png" count={1} cost={100} key={list.length}/>
        )
        cookies.total += 100;
        setTotalStatus("合計 " + cookies.total + " 円");
    }

    function handleWaffle() {
        var list = items;
        list.push(
            <PaymentCard name="ワッフル" image="waffle.png" count={1} cost={100} key={list.length}/>
        )
        cookies.total += 100;
        setTotalStatus("合計 " + cookies.total + " 円");
    }

    function handleDango() {
        var list = items;
        list.push(
            <PaymentCard name="だんご" image="dango.png" count={1} cost={100} key={list.length}/>
        )
        cookies.total += 100;
        setTotalStatus("合計 " + cookies.total + " 円");
    }

    useEffect(() => {

        if(!cookies.token) {
            setCookie("pastPage", "/payment");
            window.location.href = ("/login");
        }
        var data = {
            token: cookies.token,
            type: "get"
        };
        setCookie("calc", 0);
        setCookie("total", 0);
        function getPayment() {
            axiosInstance.post("/customer", data)
                .then(res => {
                    if(res.data == "reject") {
                        setCookie("pastPage", "/payment");
                        removeCookie("token");
                        window.location.href = ("/login");
                    } else {
                        if(res.data != "failed") {
                            setCookie('uuid', res.data.uuid);
                            setOrders()
                            var data = {
                                token: cookies.token,
                                target: res.data.uuid,
                            }
                            axiosInstance.post("/order", data)
                                .then(orderRes => {
                                    var list = [];
                                    for(const item of orderRes.data.items) {
                                        list.push(
                                            <PaymentCard name={item.name} image={item.image} count={item.count} cost={item.cost} key={list.length}/>
                                        );
                                        setItems(list);
                                    }
                                });
                            axiosInstance.post("/getpayment", data)
                                .then(paymentRes => {
                                    if(paymentRes.data.status == "pending") {
                                        setTotalStatus("合計 " + paymentRes.data.total + " 円");
                                    } else if(paymentRes.data.status == "complete") {
                                        setTotalStatus("お釣り " + paymentRes.data.change + " 円");
                                    }
                                });
                        } else {
                            setOrders(
                                <div className="Add-Items">
                                    <button className="Add-Button" onClick={handleCake}>パンケーキ</button>
                                    <button className="Add-Button" onClick={handleWaffle}>ワッフル</button>
                                    <button className="Add-Button" onClick={handleDango}>だんご</button>
                                </div>
                            );
                        }
                    }
                });
        }
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
                    <p style={{ textAlign : 'center', fontSize : '25px', fontWeight : 'bold'}}>{totalStatus}</p>
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