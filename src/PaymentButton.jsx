import { useCookies } from "react-cookie";
import { axiosInstance } from "./App";
import Sound from "./sounds/push.mp3";
import useSound from "use-sound";

function PaymentButton(props) {

    const [cookies, setCookie] = useCookies();
    const [play] = useSound(Sound, {playbackRate: 2});

    function handlePayPay() {
        const data = {
            type: "paypay",
            uuid: cookies.uuid,
        }

        axiosInstance.post("/payment", data)
            .then(res => {
                console.log(res.data);
                setCookie("calc", 0);
                play();
            });
    }

    function handleDeposit() {
        const data = {
            type: "cash",
            uuid: cookies.uuid,
            deposit: cookies.calc
        }

        axiosInstance.post("/payment", data)
            .then(res => {
                setCookie("calc", 0);
                play();
            });

    }

    if(props.text == "ＰＡＹＰＡＹ") {
        return(
            <button className="Payment-Button" style={{ backgroundColor : "#d64343" }} onClick={handlePayPay}>{ props.text }</button>
        );
    }
    return(
        <button className="Payment-Button" onClick={handleDeposit}>{ props.text }</button>
    );
}
export default PaymentButton;