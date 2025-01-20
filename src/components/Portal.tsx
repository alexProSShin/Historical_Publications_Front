import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface PortalProps extends PropsWithChildren {
  element?: HTMLElement | null;
}

export const Portal = ({ children, element = document.body }: PortalProps) => {
  return element ? createPortal(children, element) : null;
};
