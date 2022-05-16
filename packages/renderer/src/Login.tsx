import { useCallback } from 'react';
import { DyteElectronStore } from '@dyte-in/electron-store';

interface Props {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: Props) {
  const doLogin = useCallback(async () => {
    const res = await fetch(`https://api.staging.dyte.in/auth/anonymous`);
    if (!res.ok) {
      return;
    }

    const token = await res.json();
    DyteElectronStore.set('authToken', token.authToken);
    onLogin(token.authToken);
  }, [onLogin]);

  return (
    <div className="login">
      <button type="button" onClick={() => doLogin()}>
        Login
      </button>
    </div>
  );
}
