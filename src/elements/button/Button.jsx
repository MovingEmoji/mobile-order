import './button.css';

function Button(props) {
    var color;
    switch(props.pattern) {
        case "A":
            color = "#cecece";
            break;
        case "B":
            color = "#00b1ed";
            break;
        case "C":
            color = "#a1cb43";
            break;
    }
    return(
        <button className="Button" style={{
            backgroundColor : color
        }}>{ props.text }</button>
    );
}
export default Button;