import './verify.css';
import Logo from "../../components/logo/logo.tsx";
import Start from "../../components/logo/start.tsx";
import {useState} from "react";
import Camera from "../camera/camera.tsx";

export default function Verify() {
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    return <div>
        <div className={'blueApp ' + (isCameraOpen ? 'openCamera' : '')}>
            <Logo width={100} />
            <div style={{ position: "absolute", inset: "1rem", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "center", gap: "1rem" }}>
                <h1 style={{ margin: 0, fontSize: "1.75rem", textWrap: "pretty" }}>Check a digital driving licence with a QR code</h1>
                <div style={{ lineHeight: "1.5" }}>Point your device at the QR code on the licence. The service will confirm it’s genuine and valid. Personal information is kept secure and used only to verify the licence.</div>
                <button onClick={() => setIsCameraOpen(!isCameraOpen)}>
                    Start
                    <Start style={{ position: "absolute", right: "0.75rem", width: "0.625rem" }} />
                </button>
            </div>
        </div>

        <Camera open={isCameraOpen} />
    </div>
}
