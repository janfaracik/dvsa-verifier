import './home.css';
import Logo from "../../components/logo/logo.tsx";
import DvsaLogo from "../../components/logo/dvsa-logo.tsx";
import QrCode from "../../components/logo/qr.tsx";
import {useEffect, useState} from "react";
import DownArrow from "../../components/logo/down.tsx";
import QrIcon from "../../components/logo/qr-icon.tsx";
import {SystemPrompt} from "../../components/system-prompt/system-prompt.tsx";
import ShareIcon from "../../components/logo/share.tsx";
import CheckIcon from "../../components/logo/check.tsx";

export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

    useEffect(() => {
        if (!isQrCodeOpen) return;

        const timeoutId = window.setTimeout(() => {
            setIsDialogOpen(true);
        }, 3000);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [isQrCodeOpen]);

    function showSuccessDialog() {
        setIsDialogOpen(false);
        setTimeout(() => {
            setIsSuccessDialogOpen(true);
        }, 400);
    }

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

        <SystemPrompt isOpen={isDialogOpen} icon={<ShareIcon />} title={"Share details with GOV.UK Verifier?"} description={"This will share the following information:"}>
            <ul>
                <li>Licence number</li>
                <li>First and last name</li>
                <li>Date of birth</li>
            </ul>
            <button className={"primary"} onClick={showSuccessDialog}>Share details</button>
            <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
        </SystemPrompt>

        <SystemPrompt isOpen={isSuccessDialogOpen} icon={<CheckIcon />} title={"Your information has been shared successfully"} description={"You can close this screen and return to the staff member."}>
            <button className={"primary"} onClick={() => {
                setIsSuccessDialogOpen(false);
                setIsQrCodeOpen(false);
            }}>Close</button>
        </SystemPrompt>

        <div className={"qr " + (isQrCodeOpen ? "qr-open" : "")} onClick={() => setIsQrCodeOpen(!isQrCodeOpen)}>
            <QrCode />
        </div>
    </div>
}

export function Snippet({ title, contents, monospace }: { title: string, contents: string, monospace?: boolean }) {
    return <div className={"snippet"}>
        <div>{title}</div>
        <div style={{ fontFamily: monospace ? "ui-monospace" : "" }}>{contents}</div>
    </div>
}
