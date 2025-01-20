import "./Button.css";
import { MouseEventHandler, PropsWithChildren } from "react";

interface IButtonProps extends PropsWithChildren {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "primary";
}

export const Button = ({ children, disabled, onClick }: IButtonProps) => {
  return (
    <button disabled={disabled} onClick={onClick} className="button-primary">
      {children}
    </button>
  );
};
