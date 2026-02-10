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
                        <Snippet title={"Licence number"} contents={"BERNI990605MB99"} monospace />
                        <Snippet title={"Date of expiry"} contents={"8 July 2035"} />
                    </>
                )}
                {isExpanded && (
                    <>
                        <h2 style={{ fontFamily: "ui-monospace" }}>BERNI990605MB99</h2>
                        <img src="/dvsa-verifier/person.jpeg" alt={"Matt Berninger"} />
                        <Snippet title={"Date of issue"} contents={"9 July 2025"} />
                        <Snippet title={"Date of expiry"} contents={"8 July 2035"} />
                        <Snippet title={"First name"} contents={"Matt"} />
                        <Snippet title={"Last name"} contents={"Berninger"} />
                        <Snippet title={"Date of birth"} contents={"5 June 2007"} />
                        <Snippet title={"Address"} contents={"22 Lymington Road\nLondon\nNW6 7ER"} />
                    </>
                )}
            </div>
            <div className={"card__contents buttons"}>
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

function Snippet({ title, contents, monospace }: { title: string, contents: string, monospace?: boolean }) {
    return <div className={"snippet"}>
        <div>{title}</div>
        <div style={{ fontFamily: monospace ? "ui-monospace" : "" }}>{contents}</div>
    </div>
}
