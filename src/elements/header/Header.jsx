import Button from '../button/Button';
import './header.css';

function Header() {
    return(
        <header>
            <h1>たのめるくん</h1>
            <div className="Buttons">
                <Button text="ログイン" pattern="B"></Button>
                <Button text="新規登録" pattern="C"></Button>
            </div>
        </header>
    )
}
export default Header

