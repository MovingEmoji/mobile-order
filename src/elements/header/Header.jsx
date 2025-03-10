import { useNavigate } from 'react-router';
import Button from '../button/Button';
import './header.css';
import { useCookies } from 'react-cookie';
import { axiosInstance } from '../../App';
import { useEffect, useState } from 'react';

function Header() {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(["userdata"]);
    const [buttons, setButtons] = useState();

    function handleLogin() {
        
    }

    function handleHome() {
        navigate("/");
    }

    useEffect(() => {

        var data = {
            token : cookies.token
        }

        function handleRegister() {
            navigate("/register");
        }

        function handleLogout() {
            removeCookie("token");
            window.location.href = ("/");
        }
        if(cookies.token !== undefined) {
            axiosInstance.post("/userdata", data)
                .then(res => {
                    var resdata = res.data;
                    if(resdata !== "reject") {
                        setButtons(
                            <div className="Buttons">
                                <h2>{ resdata.name } さん</h2>
                                <Button text="ログアウト" pattern="D" handle={handleLogout}></Button>
                            </div>
                        );
                    } else {
                        setButtons(
                            <div className="Buttons">
                                <Button text="ログイン" pattern="B" handle={handleLogin}></Button>
                                <Button text="新規登録" pattern="C" handle={handleRegister}></Button>
                            </div>
                        );
                    }
                })
        } else {
            setButtons(
                <div className="Buttons">
                    <Button text="ログイン" pattern="B" handle={handleLogin}></Button>
                    <Button text="新規登録" pattern="C" handle={handleRegister}></Button>
                </div>
            );
        }
        
    }, [cookies, navigate, removeCookie]);

    return(
        <header>
            <h1 onClick={handleHome}>たのめるくん</h1>
            { buttons }
        </header>
    )
}
export default Header

