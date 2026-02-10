import {Route, Router} from "./providers/routing-provider.tsx";
import SplashScreen from "./pages/splash/splash.tsx";
import Home from "./pages/home/home.tsx";
import Verify from "./pages/verify/verify.tsx";

export default function App() {
    return (
        <Router>
            <Route path="">
                <SplashScreen />
            </Route>

            <Route path="home">
                <Home />
            </Route>

            <Route path="verify">
                <Verify />
            </Route>
        </Router>
    );
}
