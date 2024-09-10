import { useCookies } from "react-cookie";

function CalcButton(props) {

    const [cookies, setCookie] = useCookies();

    function handleClick() {
        const result = String(cookies.calc) + props.number;
        setCookie("calc", parseInt(result));
    }

    function handleClear() {
        setCookie("calc", 0);
    }

    if(props.number == "C") {
        return(
            <button className="Calc-Wrapper" style={{ backgroundColor : '#d64343'}} onClick={handleClear}>{ props.number }</button>
        );
    }
    return(
        <button className="Calc-Wrapper" onClick={handleClick}>{ props.number }</button>
    );
}

export default CalcButton;