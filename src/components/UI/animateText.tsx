'use client';
import { FC, ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

const AnimateText: FC<{
  children: string | ReactNode;
  classes: string;
}> = ({ children, classes }) => {
    const divRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        const splitter = new SplitText(divRef.current, {type: "words"});

        gsap.from(splitter.words, {
            opacity: 0,
            yPercent: 100,
            ease: "power2.inOut",
            stagger: {
                amount: .7
            }
        })
    })

    return (
        <div ref={divRef} className={classes}>{children}</div>
    )
};

export default AnimateText;