import './home.css';
import Logo from "../../components/logo/logo.tsx";
import DvsaLogo from "../../components/logo/dvsa-logo.tsx";
import QrCode from "../../components/logo/qr.tsx";
import {useState} from "react";
import DownArrow from "../../components/logo/down.tsx";
import QrIcon from "../../components/logo/qr-icon.tsx";

export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);

    return <div className={'app'}>
        <Logo width={100} />
        <h1>Wallet</h1>

        <div className={"card"}>
            <span className={"card__snippet"}>
                UK Provisional Driving Licence
            </span>
            <div className={"card__contents"}>
                {!isExpanded && (
                    <>
                        <Snippet title={"Licence number"} contents={"BERNI990605MB99"} />
                        <Snippet title={"Date of expiry"} contents={"8 July 2035"} />
                    </>
                )}
                {isExpanded && (
                    <>
                        <h2>BERNI990605MB99</h2>
                        <img src="public/person.jpeg" alt={"Matt Berninger"} />
                        <Snippet title={"Date of issue"} contents={"9 July 2025"} />
                        <Snippet title={"Date of expiry"} contents={"8 July 2035"} />
                        <Snippet title={"First name"} contents={"Matt"} />
                        <Snippet title={"Last name"} contents={"Berninger"} />
                        <Snippet title={"Date of birth"} contents={"5 June 2007"} />
                        <Snippet title={"Address"} contents={"22 Lymington Road\nLondon\nNW6 7ER"} />
                    </>
                )}
            </div>
            <div className={"card__contents"} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <button className={"wallet-button"} onClick={() => setIsExpanded(!isExpanded)}>
                    <DownArrow style={{ rotate: isExpanded ? "180deg" : "0deg" }} />
                    {isExpanded ? "Hide" : "Show"} details
                </button>
                <button className={"wallet-button"} onClick={() => setIsQrCodeOpen(true)}>
                    <QrIcon />
                    Share
                </button>
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
