import './balloon.css';

function Balloon(props) {
    return(
        <div className="BalloonWrapper">
            <div className="Balloon">
                <p>{ props.text }</p>
            </div>
        </div>
    );
}

export default Balloon;