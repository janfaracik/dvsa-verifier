import './camera.css';
import Logo from "../../components/logo/logo.tsx";
import {useRef, useState} from "react";
import QrIcon from "../../components/logo/qr-icon.tsx";

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [isRunning, setIsRunning] = useState(false);

    const stopCamera = () => {
        const stream = streamRef.current;
        if (stream) {
            for (const track of stream.getTracks()) track.stop();
        }
        streamRef.current = null;

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setIsRunning(false);
    };

    const startCamera = async () => {
        try {
            // Prefer back-facing camera on phones/tablets
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { ideal: "environment" },
                    width: { ideal: 1280 },
                    height: { ideal: 1280 },
                },
                audio: false,
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // iOS Safari requires these for autoplaying inline video
                await videoRef.current.play();
            }

            setIsRunning(true);
        } catch (e) {
            stopCamera();
            const message =
                e instanceof Error ? e.message : "Unable to start camera. Please check permissions.";
            alert(message);
        }
    };

    return (
        <div className={'blackApp'}>
            <div className="cameraViewport" aria-label="Camera preview">
                <video
                    ref={videoRef}
                    className="cameraVideo"
                    muted
                    playsInline
                    autoPlay
                />
            </div>

            <div className={"cameraOverlay"}>
                <Logo width={100} />

                <h1 className="cameraTitle">Scan a QR code</h1>
                <div className="cameraSubtitle">Point your device at the QR code and tap Scan.</div>

                {!isRunning && (
                    <button className="cameraButton" onClick={() => void startCamera()}>
                        Start camera
                    </button>
                )}

                <div className="cameraControls">
                    <button className={"cameraButton"}>
                        <QrIcon />
                        Scan
                    </button>
                </div>
            </div>
        </div>
    );
}
