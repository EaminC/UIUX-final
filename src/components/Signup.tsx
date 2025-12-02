import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logoImage from 'figma:asset/25e052c30c60417278690aee9375257caca59348.png';

interface SignupProps {
  onSignup: (data: SignupData) => void;
  onSwitchToLogin: () => void;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  birthday: Date | null;
  birthTime: string;
}

export function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    onSignup({ username, email, password, birthday, birthTime });
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

      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-[#8B4513] text-2xl mb-2">About you:</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-[#8B4513]">
                Enter your new username:
              </Label>
              <Input
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 border-[#DEB887] focus:border-[#8B4513]"
              />
            </div>

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
                Enter your new password:
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 border-[#DEB887] focus:border-[#8B4513]"
              />
            </div>

            <div>
              <Label htmlFor="birthday" className="text-[#8B4513]">
                Enter your birthday:
              </Label>
              <Input
                id="birthday"
                type="date"
                max={new Date().toISOString().split('T')[0]}
                value={birthday ? birthday.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const dateValue = e.target.value;
                  setBirthday(dateValue ? new Date(dateValue) : null);
                }}
                className="mt-1 border-[#DEB887] focus:border-[#8B4513]"
              />
            </div>

            <div>
              <Label htmlFor="birthTime" className="text-[#8B4513]">
                Enter the time you were born:
              </Label>
              <Input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
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
              Enter
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={onSwitchToLogin}
              className="text-[#8B4513] hover:text-[#A0522D]"
            >
              Log in here if you have an account
            </button>
          </div>
        </div>
      </div>

      {/* Home Indicator Placeholder */}
      <div className="h-8 bg-white" />
    </div>
  );
}


