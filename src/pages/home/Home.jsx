import Balloon from '../../elements/balloon/Balloon';
import Ribbon from '../../elements/ribbon/Ribbon';
import './home.css';

function Home() {
    return(
        <main>
            <img src="images/logo.png" className="Image" alt="logo" style={{marginBlock : "20px"}}></img>
            <h1>ノーコードでモバイルオーダーを導入！</h1>
            <Ribbon text="導入ケース"></Ribbon>
            <h2>学園祭でモバイルオーダーを導入したい！</h2>
            <img src="images/woman1.png" className="Image" alt="woman1"></img>
            <Balloon text="でも既存のサービスはコストもかかるしオーバースペック..."></Balloon>
            <img src="images/woman2.png" className="Image" alt="woman2"></img>
        </main>
    );
}

export default Home;