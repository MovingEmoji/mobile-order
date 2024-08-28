import axios from "axios";
import { useEffect, useState } from "react";
import PendingCard from "./PendingCard";

function Orders() {

    const [pendingList, setPendingList] = useState();

    const axiosInstance = axios.create({
        baseURL: "http://localhost:30003",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    });

    useEffect(() => {
        function getPending() {
            axiosInstance.get("/pendings")
                .then(res => {
                    var list = [];
                    for(const order of res.data) {
                        list.push(<PendingCard id={order.id} uuid={order.uuid} key={order.id}/>);
                    }
                    setPendingList(list);
                });
        }
        const interval = setInterval(() => {
            getPending();
          }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {

    })

    return(
        <div className="Orders">
            <h2>注文管理表</h2>
            <div className="Order-Contents">
                <div className="Order-List" key={0}>
                    <h2>準備中</h2>
                    { pendingList }
                </div>
                <div className="Order-List" key={1}>
                </div>
            </div>
        </div>
    );
}

export default Orders;