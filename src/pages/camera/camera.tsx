import './camera.css';
import Logo from "../../components/logo/logo.tsx";
import {useEffect, useRef, useState} from "react";
import QrIcon from "../../components/logo/qr-icon.tsx";
import {SystemPrompt} from "../../components/system-prompt/system-prompt.tsx";
import User from "../../components/logo/user.tsx";
import PersonDetails from "../person-details/person-details.tsx";

interface CameraProps {
  open: boolean,
}

export default function Camera({open}: CameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [personDetailsOpen, setPersonDetailsOpen] = useState(false);

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

  useEffect(() => {
    if (!isResponseOpen) return;

    setTimeout(() => {
      setPersonDetailsOpen(true);
    }, 6000)
  }, [isResponseOpen]);

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
      <div className="cameraViewport" aria-label="PersonDetails preview">
        <video
          ref={videoRef}
          className="cameraVideo"
          muted
          playsInline
          autoPlay
        />
      </div>

      <SystemPrompt isOpen={isResponseOpen} icon={<User />} title={"Waiting for approval"} description={"The individual needs to approve on their device to continue."} />

      <div className={'cameraFrame'} />

      <div className={"cameraOverlay"}>
        <Logo width={100}/>

        <h1 className="cameraTitle">Scan a QR code</h1>
        <div className="cameraSubtitle">Point your device at the QR code and tap Scan.</div>

        <div className="cameraControls">
          <button className={"cameraButton"} onClick={() => setIsResponseOpen(true)}>
            <QrIcon/>
            Scan
          </button>
        </div>
      </div>

      <PersonDetails open={personDetailsOpen} />
    </div>
  );
}
