'use client';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { FC, ReactNode, Ref, useRef } from "react";

const Modal: FC<{
  children: ReactNode;
  classes: string
}> = ({ children, classes }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(modalRef.current, {
      opacity: 0,
      xPercent: 100,
      duration: 1
    })
  })

  return <div ref={modalRef} className={`z-1000 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl ${classes}`}>
    {children}
  </div>;
};

export default Modal;