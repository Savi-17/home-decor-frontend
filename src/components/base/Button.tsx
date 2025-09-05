interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center';
  
  const variants = {
    primary: 'bg-lavender-600 text-white hover:bg-lavender-700 disabled:bg-gray-300',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:bg-gray-100',
    outline: 'border-2 border-lavender-600 text-lavender-600 hover:bg-lavender-50 disabled:border-gray-300 disabled:text-gray-300',
    ghost: 'text-gray-600 hover:bg-gray-100 disabled:text-gray-300'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}