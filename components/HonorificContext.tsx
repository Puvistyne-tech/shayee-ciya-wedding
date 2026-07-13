"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { HONORIFIC_GLOSSARY_ID, type HonorificKey } from "@/lib/honorifics";

type HonorificContextValue = {
    open: HonorificKey | null;
    revealHonorific: (key: HonorificKey) => void;
    toggleHonorific: (key: HonorificKey) => void;
};

const HonorificContext = createContext<HonorificContextValue | null>(null);

function scrollToGlossary() {
    document.getElementById(HONORIFIC_GLOSSARY_ID)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
    });
}

export function HonorificProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState<HonorificKey | null>(null);

    const revealHonorific = useCallback((key: HonorificKey) => {
        setOpen(key);
        scrollToGlossary();
    }, []);

    const toggleHonorific = useCallback((key: HonorificKey) => {
        setOpen((current) => (current === key ? null : key));
    }, []);

    const value = useMemo(
        () => ({ open, revealHonorific, toggleHonorific }),
        [open, revealHonorific, toggleHonorific],
    );

    return (
        <HonorificContext.Provider value={value}>
            {children}
        </HonorificContext.Provider>
    );
}

export function useHonorifics() {
    const context = useContext(HonorificContext);
    if (!context) {
        throw new Error("useHonorifics must be used within HonorificProvider");
    }
    return context;
}
