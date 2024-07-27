"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  type = "button",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="relative w-full rounded-lg border-2 border-[#2C2C2C] bg-[#2C2C2C] py-3 font-semibold text-md text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {children}
    </button>
  );
};

export default Button;
