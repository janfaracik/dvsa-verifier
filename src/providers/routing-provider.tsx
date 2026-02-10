import React, {
    createContext, type ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

/* ------------------ Types ------------------ */

type RouterContextValue = {
    path: string;
    navigate: (to: string) => void;
};

type RouteProps = {
    path: string;
    children: ReactNode;
};

type RouterProps = {
    children: ReactNode;
};

/* ------------------ Context ------------------ */

const RouterContext = createContext<RouterContextValue | null>(null);

/* ------------------ Provider ------------------ */

export function Router({ children }: RouterProps) {
    const [path, setPath] = useState(() => window.location.pathname);

    useEffect(() => {
        const onPopState = () => {
            setPath(window.location.pathname);
        };

        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    const navigate = (to: string) => {
        if (to !== window.location.pathname) {
            window.history.pushState({}, "", to);
            setPath(to);
        }
    };

    return (
        <RouterContext.Provider value={{ path, navigate }}>
            {children}
        </RouterContext.Provider>
    );
}

/* ------------------ Route ------------------ */

export function Route({ path, children }: RouteProps) {
    const router = useRouter();
    return router.path === path ? <>{children}</> : null;
}

/* ------------------ Link ------------------ */

type LinkProps = {
    to: string;
    children: ReactNode;
};

export function Link({ to, children }: LinkProps) {
    const { navigate } = useRouter();

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(to);
    };

    return (
        <a href={to} onClick={onClick}>
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
