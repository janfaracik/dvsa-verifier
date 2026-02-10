import './camera.css';
import Logo from "../../components/logo/logo.tsx";
import {useEffect, useRef, useState} from "react";

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [error, setError] = useState<string | null>(null);
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
        setError(null);

        try {
            // Prefer back-facing camera on phones/tablets
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { ideal: "environment" },
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
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
            setError(message);
        }
    };

    useEffect(() => {
        // Start automatically when this page mounts
        void startCamera();

        // Clean up when leaving the page
        return () => stopCamera();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={'blueApp'}>
            <Logo width={100} />

            <h1 className="cameraTitle">Scan a QR code</h1>
            <div className="cameraSubtitle">
                Point your device at the QR code. We’ll use the back camera if available.
            </div>

            <div className="cameraShell">
                <div className="cameraViewport" aria-label="Camera preview">
                    <video
                        ref={videoRef}
                        className="cameraVideo"
                        muted
                        playsInline
                        autoPlay
                    />
                    <div className="cameraOverlay" />
                </div>

                <div className="cameraControls">
                    {!isRunning ? (
                        <button className="cameraButton" onClick={() => void startCamera()}>
                            Start camera
                        </button>
                    ) : (
                        <button className="cameraButton cameraButtonSecondary" onClick={stopCamera}>
                            Stop camera
                        </button>
                    )}

                    {error && (
                        <div className="cameraError" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
