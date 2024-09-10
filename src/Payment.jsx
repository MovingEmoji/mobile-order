import { useCookies } from "react-cookie";
import CalcButton from "./CalcButton";
import PaymentButton from "./PaymentButton";
import { useEffect } from "react";

function Payment() {

    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        setCookie("calc", 0);
    }, []);

    return(
        <div className="Orders">
            <div className="Order-Contents" style={{ height : '100%' }}>
                <div className="Order-Info">
                    <div className="Order-List" style={{ height : '85%', width : '100%'}}>

                    </div>
                    <p style={{ textAlign : 'center', fontSize : '25px', fontWeight : 'bold'}}>合計 : 0000 円</p>
                </div>
                <div className="Add-Order">
                    <div className="Add-Items">
                        <button className="Add-Button">パンケーキ</button>
                        <button className="Add-Button">ワッフル</button>
                        <button className="Add-Button">だんご</button>
                    </div>
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
                </div>
            </div>
        </div>
    ) 
}

export default Payment;