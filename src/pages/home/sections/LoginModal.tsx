'use client';
import { useState } from 'react';
import Button from '../../../components/base/Button';
import { useAuth } from '../../../hooks/useAuth';

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
}

export default function LoginModal({ show, onClose }: LoginModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const { login, register, isLoading } = useAuth();

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    if (isRegister) register(email, password);
    else login(email, password);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <i className="ri-close-line text-2xl"></i>
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isRegister ? 'Sign Up' : 'Login'}
          </Button>
        </form>

        <p className="mt-4 text-sm text-center">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-lavender-600 font-semibold"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}
