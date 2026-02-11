import './camera.css';
import Logo from "../../components/logo/logo.tsx";
import {type Dispatch, type SetStateAction, useEffect, useRef} from "react";
import QrIcon from "../../components/logo/qr-icon.tsx";

interface CameraProps {
  open: boolean,
  setIsCameraOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Camera({open, setIsCameraOpen}: CameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    const stream = streamRef.current;
    if (stream) {
      for (const track of stream.getTracks()) track.stop();
    }
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    try {
      // Prefer back-facing camera on phones/tablets
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {ideal: "environment"},
          width: {ideal: 2000},
          height: {ideal: 2000},
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // iOS Safari requires these for autoplaying inline video
        await videoRef.current.play();
      }
    } catch (e) {
      stopCamera();
      const message =
        e instanceof Error ? e.message : "Unable to start camera. Please check permissions.";
      alert(message);
    }
  };

  // Start/stop when `open` changes
  useEffect(() => {
    if (open) {
      void startCamera();
    } else {
      stopCamera();
    }

    // Cleanup on unmount too
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);


  return (
    <div className={'blackApp ' + (open ? 'openCamera' : '')}>
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
        <Logo width={100}/>

        <h1 className="cameraTitle">Scan a QR code</h1>
        <div className="cameraSubtitle">Point your device at the QR code and tap Scan.</div>

        <div className="cameraControls">
          <button className={"cameraButton"} onClick={() => setIsCameraOpen(false)}>
            <QrIcon/>
            Scan
          </button>
        </div>
      </div>
    </div>
  );
}
