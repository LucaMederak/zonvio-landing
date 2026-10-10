"use client";

import React, { ComponentProps, ReactNode, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type IPortalProps = {
  className: ComponentProps<"div">["className"];
  portalContainerClassName?: ComponentProps<"div">["className"];
  children?: ReactNode;
  onClose?: () => void;
};

const Portal = ({
  children,
  onClose,
  className,
  portalContainerClassName,
}: IPortalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node) && onClose) {
        // document.body.style.overflowY = "auto";
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return ReactDom.createPortal(
    <>
      <motion.div
        className={twMerge(
          `fixed inset-0 z-50 h-screen w-full overflow-y-auto bg-slate-950/50 backdrop-blur-sm ${portalContainerClassName}`
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div ref={modalRef} className={className}>
          {children}
        </div>
      </motion.div>
    </>,
    document.getElementById("modal-portal") as HTMLElement
  );
};

export default Portal;
