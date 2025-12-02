// Global type declarations for third-party libraries

interface Window {
  google?: {
    accounts: {
      oauth2: {
        initTokenClient: (config: {
          client_id: string;
          scope: string;
          callback: (response: { access_token: string }) => void;
        }) => {
          requestAccessToken: () => void;
        };
      };
    };
  };
  AppleID?: {
    auth: {
      init: (config: {
        clientId: string;
        scope: string;
        redirectURI: string;
        usePopup: boolean;
      }) => void;
      signIn: (config: {
        requestedScopes: string[];
      }) => Promise<{
        user: {
          email: string;
          name?: {
            firstName?: string;
            lastName?: string;
          };
        };
      }>;
    };
  };
}


