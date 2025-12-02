import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logoImage from 'figma:asset/25e052c30c60417278690aee9375257caca59348.png';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  onWeChatLogin: () => void;
}

export function Login({
  onLogin,
  onSwitchToSignup,
  onGoogleLogin,
  onAppleLogin,
  onWeChatLogin,
}: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Status Bar Placeholder */}
      <div className="h-16 bg-white" />

      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-[#DEB887]">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="Logo" className="w-20 h-20 rounded-lg" />
          <div>
            <h1 className="text-[#8B4513] text-lg">Master Programme of Cooking Science</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-[#8B4513] text-2xl mb-2">Welcome Back!</h2>
            <p className="text-[#A0522D]">Log in to continue your culinary journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#8B4513]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 border-[#DEB887] focus:border-[#8B4513]"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#8B4513]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 border-[#DEB887] focus:border-[#8B4513]"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
            >
              Log In
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={onSwitchToSignup}
              className="text-[#8B4513] hover:text-[#A0522D]"
            >
              Have no account? Sign in!
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DEB887]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#FFF8F0] text-[#A0522D]">or log in with</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={onGoogleLogin}
              className="w-12 h-12 rounded-full bg-white border border-[#DEB887] flex items-center justify-center hover:border-[#8B4513] transition-colors"
              title="Sign in with Google"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
            <button
              onClick={onAppleLogin}
              className="w-12 h-12 rounded-full bg-white border border-[#DEB887] flex items-center justify-center hover:border-[#8B4513] transition-colors"
              title="Sign in with Apple"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#000000">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </button>
            <button
              onClick={onWeChatLogin}
              className="w-12 h-12 rounded-full bg-white border border-[#DEB887] flex items-center justify-center hover:border-[#8B4513] transition-colors"
              title="Sign in with WeChat"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#28C445">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 7.17 7.17 0 0 0 2.837.588c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.168-1.98 6.456-1.89-.576-3.583-4.196-6.348-8.996-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.179c0-.651.52-1.18 1.162-1.18zm6.673 3.31c-3.744 0-6.788 2.598-6.788 5.792 0 3.194 3.044 5.791 6.788 5.791 1.256 0 2.432-.31 3.457-.87a.722.722 0 0 1 .598-.08l1.72.99a.28.28 0 0 0 .143.047c.136 0 .252-.11.252-.246 0-.062-.024-.123-.043-.18l-.36-1.36a.515.515 0 0 1-.002-.326c.01-.026.017-.053.023-.08 1.1-2.11.3-4.603-1.64-6.28-1.94-1.678-4.768-2.288-7.348-2.288zm-3.336 3.8c.5 0 .906.412.906.92a.914.914 0 0 1-.906.919.914.914 0 0 1-.906-.92c0-.507.406-.919.906-.919zm4.95 0c.5 0 .906.412.906.92a.914.914 0 0 1-.906.918.914.914 0 0 1-.906-.919c0-.507.406-.919.906-.919z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Home Indicator Placeholder */}
      <div className="h-8 bg-white" />
    </div>
  );
}


