import { useNavigate } from 'react-router';
import Button from '../button/Button';
import './header.css';

function Header() {

    const navigate = useNavigate();

    function handleLogin() {
        
    }

    function handleRegister() {
        navigate("/register");
    }

    function handleHome() {
        navigate("/");
    }

    return(
        <header>
            <h1 onClick={handleHome}>たのめるくん</h1>
            <div className="Buttons">
                <Button text="ログイン" pattern="B" handle={handleLogin}></Button>
                <Button text="新規登録" pattern="C" handle={handleRegister}></Button>
            </div>
        </header>
    )
}
export default Header

