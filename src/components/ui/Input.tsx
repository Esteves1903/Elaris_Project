import { forwardRef, InputHTMLAttributes } from "react";

const variants = {
  default:
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.06)]",
  contact:
    "w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)]",
} as const;

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant?: keyof typeof variants;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ variant = "default", className, ...props }, ref) => (
    <input
      ref={ref}
      className={className ? `${variants[variant]} ${className}` : variants[variant]}
      {...props}
    />
  )
);
Input.displayName = "Input";
