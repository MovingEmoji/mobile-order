import { axiosInstance } from './App';
import jsQR from 'jsqr'
import { useState, useRef, useEffect, createRef } from "react"

function Confirm() {

    const [uuid, setUUID] = useState("未検知です");

    const [order_num, setNum] = useState("");

    const [result, setResult] = useState("");

    const canvasRef = useRef();
    
    const videoRef = useRef();

    function handleClick() {
        if(uuid !== "未検知です") {
            axiosInstance.post("/confirm", uuid)
            .then(res => {
                const num = res.data;
                if(num == 0){
                    setNum("そのIDは見つかりませんでした。");
                } else {
                    setResult("待機番号");
                    setNum(num);
                }
            })
        }
    }
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: 300,
                height: 300,
                facingMode: 'environment'
            }
        })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play();
                        scanQrCode()
                    }
                    
                }
            })
            .catch((err) => console.error('Error accessing media devices:', err));
        
        return () => {
            if(videoRef.current && videoRef.current.srcObject) {
                let tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        }
    }, []); 

    function scanQrCode() {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            var cnt = 0;
            const scan = () => {
                if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
                    canvas.height = videoRef.current.videoHeight;
                    canvas.width = videoRef.current.videoWidth;
                    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    if(imageData) {
                        const code = jsQR(imageData.data, imageData.width, imageData.height);
                        if (code) {
                            setUUID(code.data);
                        } else {
                            if(cnt === 200) {
                                cnt = 0;
                                setUUID("未検知です")
                            }
                            cnt ++;
                        }
                    }
                }
                requestAnimationFrame(scan);
            };
            scan();
        }
    }

    return(
        <main>
            <div className="Card-Wrapper">
                <p>QRコードをスキャンして下さい。</p>
                <video ref={ videoRef } style={{opacity : 0, position: 'absolute', width: 300, height: 300 }} className="Camera" autoPlay muted playsInline />
                <canvas ref={canvasRef} style={{ width: '300px', height: '300px' }} className="Camera"/>
                <p>注文ID</p>
                <p className="Small-Wrapper" style={{ marginBottom : 40 + 'px'}}>{ uuid }</p>
                <p>{ result }</p>
                <p style={{ fontSize : 70 + 'px'}}>{ order_num }</p>
                <div className="Info-Wrapper">
                    <button className="Button-Wrapper" style={{ marginInlineEnd : 5 + 'px', paddingBlock : 10 + 'px', backgroundColor : '#FF5050', width : '100%'}} onClick={handleClick}>確認する</button>
                </div>
                
            </div>
        </main>
    );
}

export default Confirm