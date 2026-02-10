import React, {
    createContext, type ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

/* ------------------ Types ------------------ */

type RouterContextValue = {
    /** Simple hash route: "", "home", "validate", ... */
    route: string;
    navigate: (to: string) => void;
};

type RouteProps = {
    /** Simple hash route: "", "home", "validate", ... */
    path: string;
    children: ReactNode;
};

type RouterProps = {
    children: ReactNode;
};

/* ------------------ Context ------------------ */

const RouterContext = createContext<RouterContextValue | null>(null);

/* ------------------ Helpers ------------------ */

function normalizeRoute(to: string) {
    // Accept: "", "home", "#home", "#/home", "/home"
    const trimmed = (to ?? "").trim();

    if (!trimmed || trimmed === "#" || trimmed === "#/" || trimmed === "/") return "";

    let s = trimmed;
    if (s.startsWith("#")) s = s.slice(1);
    if (s.startsWith("/")) s = s.slice(1);

    // Ignore query/hash fragments after the route token
    s = s.split("?")[0].split("#")[0];

    // Only the first segment is used (simple routes)
    const first = s.split("/")[0];

    return first || "";
}

function getHashRoute() {
    // window.location.hash includes the leading '#'
    return normalizeRoute(window.location.hash);
}

/* ------------------ Provider ------------------ */

export function Router({ children }: RouterProps) {
    const [route, setRoute] = useState(() => getHashRoute());

    useEffect(() => {
        const onHashChange = () => setRoute(getHashRoute());

        window.addEventListener("hashchange", onHashChange);
        onHashChange();

        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    const navigate = (to: string) => {
        const next = normalizeRoute(to);
        const current = getHashRoute();

        if (next === current) return;

        // Always uses hash. Root is just "#" (or empty hash, but this is explicit).
        window.location.hash = next ? `#${next}` : "#";
    };

    return (
        <RouterContext.Provider value={{ route, navigate }}>
            {children}
        </RouterContext.Provider>
    );
}

/* ------------------ Route ------------------ */

export function Route({ path, children }: RouteProps) {
    const router = useRouter();
    const expected = normalizeRoute(path);
    return router.route === expected ? <>{children}</> : null;
}

/* ------------------ Link ------------------ */

type LinkProps = {
    to: string;
    children: ReactNode;
};

export function Link({ to, children }: LinkProps) {
    const { navigate } = useRouter();
    const normalized = normalizeRoute(to);
    const href = normalized ? `#${normalized}` : "#";

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(to);
    };

    return (
        <a href={href} onClick={onClick}>
            {children}
        </a>
    );
}

/* ------------------ Hook ------------------ */

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter() {
    const ctx = useContext(RouterContext);
    if (!ctx) {
        throw new Error("useRouter must be used inside <Router>");
    }
    return ctx;
}
