import { useState, useEffect } from "react";
import axios from "axios";

function CustomerUI() {

    const [order, setOrder] = useState();
    
    const axiosInstance = axios.create({
        baseURL: "http://localhost:30003",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    });

    useEffect(() => {
        function getOrder() {
            axiosInstance.post("/customer", "test")
            .then(res => {
                if(res.data != "failed") {
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
                        <div className="Orders" style={{ marginTop : '60px'}}>
                            <div className="Order-Contents" style={{ height : '85%'}}>
                                <div className="Order-List" style={{ width : '100%'}}>
                                    { orders }
                                </div>
                            </div>
                            <p style={{ textAlign : 'center', fontSize : '30px'}}>合計金額: {res.data.total} 円</p>
                        </div>
                    );
                }
            });
        }

        const interval = setInterval(() => {
            getOrder();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return(
        <div>
            { order }
        </div>
    );
}
export default CustomerUI;