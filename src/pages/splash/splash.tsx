import './splash.css';
import Logo from "../../components/logo/logo.tsx";
import {useEffect} from "react";
import {useRouter} from "../../providers/routing-provider.tsx";

export default function SplashScreen() {
    const { navigate } = useRouter();

    useEffect(() => {
        setTimeout(() => {
            navigate("/home");
        }, 3000);
    })

    return <div className={'splash'}>
        <Logo />
    </div>
}
