import { useState } from 'react';
import Button from '../../../elements/button/Button';
import './registeruser.css';
import { axiosInstance } from '../../../App';

function RegisterUser() {


    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [checked, setChecked] = useState(false);

    function handleRegister() {
        setMessage("");
        if(name !== "" && email !== "" && password !== "" && password2 !== "") {
            if(email.includes("@")) {
                if(password === password2) {
                    if(checked === true) {
                        var data = {
                            name : name,
                            email : email,
                            password : password
                        };
                        axiosInstance.post("/registeruser", data)
                            .then(res => {
                                var resdata = res.data;
                                if(resdata != "reject") {
                                    console.log(resdata);
                                } else {
                                    setMessage("このメールアドレスはすでに登録されています");
                                }
                            });
                    } else {
                        setMessage("利用規約に同意してください");
                    }
                } else {
                    setMessage("確認とパスワードが一致していません");
                }
            } else {
                setMessage("正しいメールアドレスを入力してください");
            }
        } else {
            setMessage("すべての項目を入力してください");
        }
    }

    return(
        <main>
            <div className="FormWrapper">
                <h3>ユーザー登録</h3>
                <p className="Warning">{ message }</p>
                <div className="TextBoxWrapper">
                    <p>お名前</p>
                    <div className="BackGroundWrapper">
                        <input type="text" className="TextBox" value={name} onChange={e => {setName(e.target.value)}}></input>
                    </div>
                </div>
                <div className="TextBoxWrapper">
                    <p>メールアドレス</p>
                    <div className="BackGroundWrapper">
                        <input type="text" className="TextBox" value={email} onChange={e => {setEmail(e.target.value)}}></input>
                    </div>
                </div>
                <div className="TextBoxWrapper">
                    <p>パスワード</p>
                    <div className="BackGroundWrapper">
                        <input type="password" className="TextBox" value={password} onChange={e => {setPassword(e.target.value)}}></input>
                    </div>
                </div>
                <div className="TextBoxWrapper">
                    <p>パスワード(確認)</p>
                    <div className="BackGroundWrapper">
                        <input type="password" className="TextBox" value={password2} onChange={e => {setPassword2(e.target.value)}}></input>
                    </div>
                </div>
                <div className="CheckBoxWrapper">
                    <input type="checkbox" className="CheckBox" checked={checked} onChange={e => {setChecked(e.target.checked)}}></input>
                    <p>利用規約に同意します</p>
                </div>
                <div className="ButtonWrapper">
                    <Button text="新規登録" pattern="B" handle={handleRegister}></Button>
                </div>
            </div>
        </main>
    );
}
export default RegisterUser;