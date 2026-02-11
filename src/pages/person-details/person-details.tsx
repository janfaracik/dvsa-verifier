import './person-details.css';
import {Snippet} from "../home/home.tsx";
import Logo from "../../components/logo/logo.tsx";
import {Link} from "../../providers/routing-provider.tsx";

interface CameraProps {
  open: boolean,
}

export default function PersonDetails({open}: CameraProps) {
  return (
    <div className={'personDetails ' + (open ? 'personDetails--open' : '')}>
      <Logo width={100} />
      <h1 style={{ color: "white", margin: 0 }}>Scan complete</h1>
        <img src="/dvsa-verifier/person.jpeg" alt={"Matt Berninger"} />
        <div className={"snippet"}>
          <div>Licence number</div>
          <h2 style={{ fontFamily: "ui-monospace", margin: 0 }}>BERNI990605MB99</h2>
        </div>
        <Snippet title={"Date of issue"} contents={"9 July 2025"} />
        <Snippet title={"Date of expiry"} contents={"8 July 2035"} />
        <Snippet title={"First name"} contents={"Matt"} />
        <Snippet title={"Last name"} contents={"Berninger"} />
        <Snippet title={"Date of birth"} contents={"5 June 2007"} />
        <Link to={"/#verify"}>Close</Link>
    </div>
  );
}
