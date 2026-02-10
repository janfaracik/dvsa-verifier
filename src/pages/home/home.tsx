import './home.css';
import Logo from "../../components/logo/logo.tsx";
import DvsaLogo from "../../components/logo/dvsa-logo.tsx";
import QrCode from "../../components/logo/qr.tsx";
import {useState} from "react";

export default function Home() {
    const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);

    return <div className={'app'}>
        <Logo width={100} />
        <h1>Wallet</h1>

        <div className={"card"} onClick={() => setIsQrCodeOpen(!isQrCodeOpen)}>
            <div className={"card__snippet"}>
                UK Provisional Driving Licence
            </div>
            <div className={"card__contents"}>
                <h2>BERNI990605MB99</h2>
                <img src="public/person.jpeg" alt={"Matt Berninger"} />
                <Snippet title={"Date of issue"} contents={"9 July 2025"} />
                <Snippet title={"Date of expiry"} contents={"8 July 2035"} />
                <Snippet title={"First name"} contents={"Matt"} />
                <Snippet title={"Last name"} contents={"Berninger"} />
                <Snippet title={"Date of birth"} contents={"5 June 2007"} />
                <Snippet title={"Address"} contents={"22 Lymington Road\nLondon\nNW6 7ER"} />
            </div>
            <div className={"card__contents"}>
                <DvsaLogo />
            </div>
        </div>

        <div className={"qr " + (isQrCodeOpen ? "qr-open" : "")} onClick={() => setIsQrCodeOpen(!isQrCodeOpen)}>
            <QrCode />
        </div>
    </div>
}

function Snippet({ title, contents }: { title: string, contents: string }) {
    return <div className={"snippet"}>
        <div>{title}</div>
        <div>{contents}</div>
    </div>
}
