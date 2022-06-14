import { useEffect, useState } from 'react';
import './style.scss';

function QRCode() {
    const [temp, setTemp] = useState("");
    const [word, setWord] = useState("HNID211.RACK-3.U46.core.2 HNID202.0000000011  HNID211.RACK-4.U34.core.2");
    const [size, setSize] = useState(400);
    const [bgColor, setBgColor] = useState("ffffff");
    const [qrCode, setQrCode] = useState("");

    // Changing the URL only when the user
    // changes the input
    useEffect(() => {
        setQrCode
    (`http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`);
    }, [word, size, bgColor]);

    // Updating the input word when user
    // click on the generate button
    function handleClick() {
        setWord(temp);
    }

    return (
        <div className="App">
            <h1>Task 7 create QR code</h1>
            <div className="input-box">
                <div className="gen">
                <input type="text" onChange={
                    (e) => {setTemp(e.target.value)}}
                    placeholder="Enter text to encode" />
                <button className="button"
                    onClick={handleClick}>
                    Generate
                </button>
                </div>
                <div className="extra">
                <h5>Background Color:</h5>
                <input type="color" onChange={(e) =>
                { setBgColor(e.target.value.substring(1)) }} />
                <h5>Dimension:</h5>
                <input type="range" min="50" max="600"
                value={size} onChange={(e) =>
                {setSize(e.target.value)}} />
                </div>
            </div>
            <div className="output-box">
                <img src={qrCode} alt="" />
                <a href={qrCode} download="QRCode">
                <button type="button">Download</button>
                </a>
            </div>
        </div>
    );
}

export default QRCode;
