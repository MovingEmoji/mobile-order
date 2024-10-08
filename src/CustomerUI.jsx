import { useState, useEffect } from "react";
import { axiosInstance } from "./App";
import { useCookies } from "react-cookie";

function CustomerUI() {

    const [order, setOrder] = useState();
    const [cookies] = useCookies();

    useEffect(() => {
        function getOrder() {
            axiosInstance.post("/customer", {token: cookies.token})
            .then(res => {
                if(res.data != "failed") {
                    axiosInstance.post("/getpayment", { 
                        token: cookies.token,
                        target: res.data.uuid
                    })
                    .then(paymentRes => {
                        console.log(paymentRes.data)
                        if(paymentRes.data.status == "pending") {
                            var orders = [];
                            for(const item of res.data.items) {
                                orders.push(
                                    <div className="Order-Card-Wrapper" key={orders.length}>
                                        <div className="CartItem-Wrapper" style={{ width : '100%'}}>
                                        <img src={"./images/" + item.image} alt="item"></img>
                                        <div className="Grid-Wrapper" style={{ marginLeft : '30px'}}>
                                            <p>{item.name}</p>
                                            <p>{item.count + "個"}</p>
                                        </div>
                                        <div className="Grid-Wrapper" style={{marginLeft : 'auto'}}>
                                            <p>{item.cost + "円"}</p>
                                        </div>
                                        </div>
                                    </div>
                                );
                            }
                            setOrder(
                                <div className="Orders" style={{ marginTop : '80px'}}>
                                    <div className="Order-Contents" style={{ height : '85%'}}>
                                        <div className="Order-List" style={{ width : '100%'}}>
                                            { orders }
                                        </div>
                                    </div>
                                    <p style={{ textAlign : 'center', fontSize : '30px'}}>合計金額: {res.data.total} 円</p>
                                </div>
                            );

                        } else if(paymentRes.data.status == "paypayPending") {
                            window.location.href=paymentRes.data.url
                        } else {
                            setOrder(
                                <div className="Orders" style={{ marginTop : '80px' , display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                                    <div className="Order-Contents" style={{ height : '85%'}}>
                                        <p style={{ fontSize : '30px' , textAlign : 'center', alignContent : 'center' }}>お支払いが完了しました。<br></br>ありがとうございました。</p>
                                    </div>
                                </div>
                            )
                            var data = {
                                token: cookies.token,
                                uuid: "reset"
                            }
                            axiosInstance.post("/setcustomer", data)
                                .then(resetRes => {
                                    console.log(resetRes.data);
                                });
                        }
                    })
                } else {
                    setOrder(
                        <div className="Orders" style={{ marginTop : '80px' , display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                            <div className="Order-Contents" style={{ height : '85%'}}>
                                <p style={{ fontSize : '30px' , textAlign : 'center', alignContent : 'center' }}>いらっしゃいませ<br></br>ご注文をどうぞ</p>
                            </div>
                        </div>
                    );
                }
            });
        }

        const interval = setInterval(() => {
            getOrder();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return(
        <div>
            { order }
        </div>
    );
}
export default CustomerUI;