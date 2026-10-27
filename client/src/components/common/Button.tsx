import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#050505] disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  };

  const variantClasses = {
    primary:
      'bg-zinc-950 hover:bg-zinc-800 text-white font-semibold border border-zinc-950 shadow-sm focus:ring-zinc-900 dark:bg-white dark:hover:bg-zinc-200 dark:text-black dark:border-white dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] dark:focus:ring-white',
    secondary:
      'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 focus:ring-zinc-400 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-100 dark:border-white/10 dark:hover:border-white/20',
    outline:
      'bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 hover:border-zinc-500 focus:ring-zinc-900 dark:bg-transparent dark:hover:bg-white/10 dark:text-white dark:border-white/25 dark:hover:border-white/60 dark:focus:ring-white',
    ghost:
      'bg-transparent hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 focus:ring-zinc-400 dark:hover:bg-zinc-800/80 dark:text-zinc-400 dark:hover:text-white',
    danger:
      'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 focus:ring-red-400 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400 dark:border-red-500/30'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};
