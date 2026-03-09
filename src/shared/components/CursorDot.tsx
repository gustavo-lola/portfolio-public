import { useEffect, useRef, useState } from "react";

export default function CursorDot() {
    const dotRef = useRef<HTMLDivElement>(null);
    const targetXRef = useRef(-100);
    const targetYRef = useRef(-100);
    const currentXRef = useRef(-100);
    const currentYRef = useRef(-100);
    const frameRef = useRef<number | null>(null);
    const isVisibleRef = useRef(false);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const mediaQuery = globalThis.matchMedia("(pointer: fine)");

        const syncPointerMode = () => {
            const enabled = mediaQuery.matches;
            setIsEnabled(enabled);

            document.documentElement.classList.toggle("cursor-none-global", enabled);

            if (!enabled) {
                isVisibleRef.current = false;
            }
        };

        const handlePointerMove = (event: PointerEvent) => {
            targetXRef.current = event.clientX;
            targetYRef.current = event.clientY;
            isVisibleRef.current = true;
        };

        const handlePointerEnter = () => {
            isVisibleRef.current = true;
        };

        const handlePointerLeave = () => {
            isVisibleRef.current = false;
        };

        const animate = () => {
            currentXRef.current += (targetXRef.current - currentXRef.current) * 0.2;
            currentYRef.current += (targetYRef.current - currentYRef.current) * 0.2;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${currentXRef.current}px, ${currentYRef.current}px, 0) translate(-50%, -50%) scale(${isVisibleRef.current ? 1 : 0.82})`;
                dotRef.current.style.opacity = isVisibleRef.current ? "1" : "0";
            }

            frameRef.current = globalThis.requestAnimationFrame(animate);
        };

        syncPointerMode();
        mediaQuery.addEventListener("change", syncPointerMode);
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerenter", handlePointerEnter);
        document.addEventListener("pointerleave", handlePointerLeave);
        globalThis.addEventListener("blur", handlePointerLeave);
        frameRef.current = globalThis.requestAnimationFrame(animate);

        return () => {
            mediaQuery.removeEventListener("change", syncPointerMode);
            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerenter", handlePointerEnter);
            document.removeEventListener("pointerleave", handlePointerLeave);
            globalThis.removeEventListener("blur", handlePointerLeave);
            document.documentElement.classList.remove("cursor-none-global");
            if (frameRef.current !== null) {
                globalThis.cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    if (!isEnabled) {
        return null;
    }

    return (
        <div
            ref={dotRef}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 h-4 w-4 rounded-full border border-white bg-black shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_10px_rgba(15,15,15,0.13)]"
            style={{ zIndex: 9999, opacity: 0, willChange: "transform, opacity" }}
        />
    );
}
