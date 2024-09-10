function PaymentButton(props) {
    if(props.text == "ＰＡＹＰＡＹ") {
        return(
            <button className="Payment-Button" style={{ backgroundColor : "#d64343" }}>{ props.text }</button>
        );
    }
    return(
        <button className="Payment-Button">{ props.text }</button>
    );
}
export default PaymentButton;