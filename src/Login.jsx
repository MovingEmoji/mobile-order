import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { axiosInstance } from "./App";
import { useNavigate } from "react-router";

function Login() {
    
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const [message, setMessage] = useState();
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    
    function handleClick() {
        var data = {
            username: username,
            password: password
        }
        axiosInstance.post("/login", data)
            .then(res => {
                if(res.data != "failed") {
                    var page = cookies.pastPage;
                    setCookie("token", res.data);
                    setMessage("認証に成功しました。");
                    removeCookie("pastPage");
                    navigate(page);
                } else {
                    setMessage("usernameまたはpasswordが違います。")
                }
            })
    }

    useEffect(() => {
        if(cookies.token) {
            window.location.href = ("/");
        }
    }, []);

    return(
        <main>
            <div className="Card-Wrapper">
                <p>Login</p>
                <p>{ message }</p>
                <input type="text" onChange={(event) => setUser(event.target.value)} className="TextBox-Wrapper" placeholder="username" value={username}></input>
                <input type="password" onChange={(event) => setPass(event.target.value)} className="TextBox-Wrapper" placeholder="password"></input>
                <button className="Login-Wrapper" onClick={handleClick}>LOGIN</button>
            </div>
        </main>
    );
}
export default Login;