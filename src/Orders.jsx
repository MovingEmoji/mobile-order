import axios from "axios";
import { useEffect, useState } from "react";
import PendingCard from "./PendingCard";
import CompleteCard from "./CompleteCard";
import { axiosInstance } from "./App";
import { useCookies } from "react-cookie";

function Orders() {

    const [pendingList, setPendingList] = useState();
    const [completeList, setCompleteList] = useState();
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        if(!cookies.token) {
            setCookie("pastPage", "/orders");
            window.location.href = ("/login");
        }
        var data = {
            target: "all",
            token: cookies.token
        }
        function getOrders() {
            axiosInstance.post("/order", data)
                .then(res => {
                    if(res.data != "failed") {
                        var plist = [], clist = [];
                        for(const order of res.data) {
                            var cake = 0, waffle = 0, dango = 0;
                            for(const item of order.items) {
                                switch(item.number) {
                                    case 1:
                                        cake ++;
                                        break;
                                    case 2:
                                        waffle ++;
                                        break;
                                    case 3:
                                        dango ++;
                                        break;
                                    default:
                                        break;
                                }
                            }
                            if(order.status == "pending") {   
                                plist.push(
                                    <PendingCard id={order.number} uuid={order.uuid} cake={cake} waffle={waffle} dango={dango} total={order.total} key={order.number}/>
                                );
                            }else if(order.status == "complete") {
                                clist.push(
                                    <CompleteCard id={order.number} uuid={order.uuid} cake={cake} waffle={waffle} dango={dango} total={order.total} key={order.number}/>
                                );
                            }
                            setPendingList(plist);
                            setCompleteList(clist);
                        }
                    } else {
                        setCookie("pastPage", "/orders");
                        removeCookie("token");
                        window.location.href = ("/login");
                    }
                });
        }
        const interval = setInterval(() => {
            getOrders();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return(
        <div>
            <div className="Orders">
                <h2>注文管理表</h2>
                <div className="Order-Contents">
                    <div className="Order-List" key={0}>
                        <h2>準備中</h2>
                        { pendingList }
                    </div>
                    <div className="Order-List" key={1}>
                        <h2>完成(未会計)</h2>
                        { completeList }
                    </div>
                </div>
            </div>
            <div className="Orders" style={{marginTop: '50px', marginBottom: '30px'}}>
                <h2>決済管理表</h2>
                <div className="Order-Contents">
                    <div className="Order-List" key={0}>
                        <h2>準備中</h2>
                        { pendingList }
                    </div>
                    <div className="Order-List" key={1}>
                        <h2>完成(未会計)</h2>
                        { completeList }
                    </div>
                </div>
            </div>
        </div>
        

    );
}

export default Orders;