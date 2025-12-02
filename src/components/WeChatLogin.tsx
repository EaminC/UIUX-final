import { Button } from './ui/button';
import { X } from 'lucide-react';
import cartoonAvatar from '../assets/cartoon.jpg';

interface WeChatAccount {
  name: string;
  email: string;
  avatar: string;
  initial: string;
}

interface WeChatLoginProps {
  accounts: WeChatAccount[];
  onSelectAccount: (account: WeChatAccount) => void;
  onUseAnotherAccount: () => void;
  onCancel: () => void;
}

// Generate random avatar URL
const mockAccounts: WeChatAccount[] = [
  {
    name: 'Yiming Cheng',
    email: 'eaminchan@uchicago.edu',
    avatar: cartoonAvatar,
    initial: 'Y',
  },
];

export function WeChatLogin({
  accounts = mockAccounts,
  onSelectAccount,
  onUseAnotherAccount,
  onCancel,
}: WeChatLoginProps) {
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Status Bar Placeholder */}
      <div className="h-16 bg-white" />

      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-[#DEB887]">
        <div className="flex items-center justify-between">
          <h1 className="text-[#8B4513]">Sign in with WeChat</h1>
          <button onClick={onCancel} className="text-[#A0522D]">
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#28C445] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 7.17 7.17 0 0 0 2.837.588c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.168-1.98 6.456-1.89-.576-3.583-4.196-6.348-8.996-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.179c0-.651.52-1.18 1.162-1.18zm6.673 3.31c-3.744 0-6.788 2.598-6.788 5.792 0 3.194 3.044 5.791 6.788 5.791 1.256 0 2.432-.31 3.457-.87a.722.722 0 0 1 .598-.08l1.72.99a.28.28 0 0 0 .143.047c.136 0 .252-.11.252-.246 0-.062-.024-.123-.043-.18l-.36-1.36a.515.515 0 0 1-.002-.326c.01-.026.017-.053.023-.08 1.1-2.11.3-4.603-1.64-6.28-1.94-1.678-4.768-2.288-7.348-2.288zm-3.336 3.8c.5 0 .906.412.906.92a.914.914 0 0 1-.906.919.914.914 0 0 1-.906-.92c0-.507.406-.919.906-.919zm4.95 0c.5 0 .906.412.906.92a.914.914 0 0 1-.906.918.914.914 0 0 1-.906-.919c0-.507.406-.919.906-.919z" />
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
              To continue, WeChat will share your name and email address with yoursite.com. Before using this app, you can review yoursite.com's privacy policy and terms of service.
            </p>
          </div>
        </div>
      </div>

      {/* Home Indicator Placeholder */}
      <div className="h-8 bg-white" />
    </div>
  );
}

