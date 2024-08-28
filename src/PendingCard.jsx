function PendingCard(props) {
    return(
        <div className="Order-Card-Wrapper">
            <div className="Order-Card-Info">
                <p>オーダー番号: { props.id }</p>
                <p style={{ fontSize : 15 + 'px' }}>{ props.uuid }</p>
            </div>
            <div className="Order-Card-Buttons">
                <button className="Order-Button" style={{ backgroundColor : '#2870db' }}>詳細</button>
                <button className="Order-Button">完成</button>
            </div>
        </div>
    );
}

export default PendingCard;