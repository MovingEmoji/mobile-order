import { useCookies } from "react-cookie";
import { QRCodeCanvas } from "qrcode.react";

function Ordered(props) {

    function handleCick() {
        removeCookie("orderID");
        window.location.href = "/";
    }

    const[cookies, removeCookie] = useCookies();
    if(cookies.orderID !== 'undefined' && cookies.orderID !== undefined) {
        return(
            <main>
                <div className="Card-Wrapper">
                    <p>注文が完了しました。</p>
                    <p className="Small-Wrapper">店頭で係員にこちらのQRコードをお見せください</p>
                    <QRCodeCanvas
                    value={cookies.orderID}
                    size={200}
                    bgColor={"#000000"}
                    fgColor={"#FFFFFF"}
                    level={"L"}
                    includeMargin={false}
                    className="QRcode"
                    />
                    <p>注文ID</p>
                    <p className="Small-Wrapper" style={{ marginBottom : 30 + 'px'}}>{cookies.orderID}</p>
                    <p className="Small-Wrapper">続けて注文する場合は<br></br>画面をスクリーンショットしてください</p>
                    <div className="Info-Wrapper">
                        <button className="Button-Wrapper" style={{ marginInlineEnd : 5 + 'px', paddingBlock : 10 + 'px', backgroundColor : '#FF5050', width : '100%'}} onClick={handleCick}>続けて注文</button>
                    </div>
                    
                </div>
                
            </main>
            
        )
    } else {
        window.location.href = "/";
    }

}

export default Ordered;