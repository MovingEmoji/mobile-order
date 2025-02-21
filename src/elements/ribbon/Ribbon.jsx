import './ribbon.css';

function Ribbon(props) {
    return(
        <div className="RibbonWrapper">
            <div className="Ribbon">
                <h3>{ props.text }</h3>
            </div>
        </div>
    );
}
export default Ribbon;