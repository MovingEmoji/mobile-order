function PaymentCard(props) {
    return(
        <div className="Order-Card-Wrapper">
            <div className="CartItem-Wrapper" style={{ width : '100%'}}>
                <img src={"./images/" + props.image} alt="item"></img>
                <div className="Grid-Wrapper" style={{ marginLeft : '30px'}}>
                    <p>{props.name}</p>
                    <p>{props.count + "個"}</p>
                </div>
                <div className="Grid-Wrapper" style={{marginLeft : 'auto'}}>
                    <p>{props.cost + "円"}</p>
                </div>
            </div>
        </div>
    );
}
export default PaymentCard;