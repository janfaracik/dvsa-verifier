import './verify.css';
import Logo from "../../components/logo/logo.tsx";
import QrIcon from "../../components/logo/qr-icon.tsx";
import {Link} from "../../providers/routing-provider.tsx";
import Start from "../../components/logo/start.tsx";

export default function Verify() {
    return <div className={'blueApp'}>
        <Logo width={100} />
        <div style={{ position: "absolute", inset: "1rem", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "center", gap: "1rem" }}>
            <h1 style={{ margin: 0, fontSize: "1.75rem", textWrap: "pretty" }}>Check a digital driving licence with a QR code</h1>
            <div style={{ lineHeight: "1.5" }}>Tap Scan to start. Point your device at the QR code on the licence. The service will confirm it’s genuine and valid. Personal information is kept secure and used only to verify the licence.</div>
            <Link to={"camera"}>
                <QrIcon />
                Scan
                <Start style={{ position: "absolute", right: "0.75rem", width: "0.625rem" }} />
            </Link>
        </div>
    </div>
}
