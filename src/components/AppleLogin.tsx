import { Button } from './ui/button';
import { X } from 'lucide-react';
import cartoonAvatar from '../assets/cartoon.jpg';

interface AppleAccount {
  name: string;
  email: string;
  avatar: string;
  initial: string;
}

interface AppleLoginProps {
  accounts: AppleAccount[];
  onSelectAccount: (account: AppleAccount) => void;
  onUseAnotherAccount: () => void;
  onCancel: () => void;
}

// Generate random avatar URL
const mockAccounts: AppleAccount[] = [
  {
    name: 'Yiming Cheng',
    email: 'eaminchan@uchicago.edu',
    avatar: cartoonAvatar,
    initial: 'Y',
  },
];

export function AppleLogin({
  accounts = mockAccounts,
  onSelectAccount,
  onUseAnotherAccount,
  onCancel,
}: AppleLoginProps) {
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Status Bar Placeholder */}
      <div className="h-16 bg-white" />

      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-[#DEB887]">
        <div className="flex items-center justify-between">
          <h1 className="text-[#8B4513]">Sign in with Apple</h1>
          <button onClick={onCancel} className="text-[#A0522D]">
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </div>
            <h2 className="text-[#8B4513] text-2xl mb-2">Choose an account</h2>
          </div>

          <div className="space-y-2">
            {accounts.map((account, index) => (
              <div key={index}>
                <button
                  onClick={() => onSelectAccount(account)}
                  className="w-full flex items-center gap-4 p-4 bg-white rounded-lg border border-[#DEB887] hover:border-[#8B4513] transition-colors cursor-pointer"
                >
                  {account.avatar ? (
                    <img
                      src={account.avatar}
                      alt={account.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-[#FFE8D6] rounded-full flex items-center justify-center">
                      <span className="text-[#8B4513] text-lg">{account.initial}</span>
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <div className="text-[#8B4513] font-medium">{account.name}</div>
                    <div className="text-[#A0522D] text-sm">{account.email}</div>
                  </div>
                </button>
                {index < accounts.length - 1 && (
                  <div className="border-t border-[#DEB887] my-2" />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={onUseAnotherAccount}
            className="w-full flex items-center gap-4 p-4 bg-white rounded-lg border border-[#DEB887] hover:border-[#8B4513] transition-colors"
          >
            <div className="w-12 h-12 bg-[#FFE8D6] rounded-lg flex items-center justify-center">
              <span className="text-2xl">+</span>
            </div>
            <div className="flex-1 text-left">
              <div className="text-[#8B4513]">Use another account</div>
            </div>
          </button>

          <div className="mt-8 p-4 bg-[#FFF8F0] rounded-lg border border-[#DEB887]">
            <p className="text-[#A0522D] text-sm">
              To continue, Apple will share your name and email address with yoursite.com. Before using this app, you can review yoursite.com's privacy policy and terms of service.
            </p>
          </div>
        </div>
      </div>

      {/* Home Indicator Placeholder */}
      <div className="h-8 bg-white" />
    </div>
  );
}

