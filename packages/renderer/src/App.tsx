import { useState, useCallback, useEffect } from 'react';
import DyteClient from '@dytesdk/web-core/inlined';
import { DyteMeeting } from '@dyte-in/react-ui-kit';
import { provideDyteDesignSystem } from '@dyte-in/ui-kit';

const App = () => {
  const [roomName, setRoomName] = useState<string | null>('rpwont-hgsesv');
  const [env, setEnv] = useState<string>('staging');
  const [defaults, setDefaults] = useState<{
    audio: boolean;
    video: boolean;
    showSetupScreen: boolean;
  }>({
    audio: false,
    video: false,
    showSetupScreen: true,
  });
  const [activeMeeting, setActiveMeeting] = useState(false);

  const handleJoin = async () => {
    if (!roomName || roomName.trim().length === 0) return;

    const res = await fetch(`https://api.${env}.dyte.in/auth/anonymous`);
    if (!res.ok) {
      return;
    }
    const authToken = (await res.json()).authToken;

    window.meeting = await DyteClient.init({
      roomName,
      apiBase: `https://api.${env}.dyte.in/`,
      authToken,
      defaults,
    });
    setActiveMeeting(true);
  };

  handleJoin();

  useEffect(() => {
    provideDyteDesignSystem(document.body, {
      colors: {
        brand: {
          300: '#00FFE1',
          400: '#00FFFF',
          500: '#00E1D4',
          600: '#007B74',
          700: '#00655F',
        },
        background: {
          1000: '#FFFFFF',
          900: '#E6E6E6',
          800: '#DADADD',
          700: '#CDCDD0',
          600: '#C0C0C1',
        },
        text: '#071428',
        'video-bg': '#E5E7EB',
      },
    });
  }, []);

  if (!activeMeeting) {
    if (!!handleJoin) {
      return (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading...
        </div>
      );
    }
    return (
      <div className="home" style={{ display: 'none' }}>
        <h2>Enter your meeting ID to join</h2>
        <div className="meeting-form">
          <input
            type="text"
            value={roomName as string}
            onChange={(e) => setRoomName(e.currentTarget.value)}
          />
          <select name="env" value={env} onChange={(e) => setEnv(e.target.value)}>
            <option value="staging">Staging</option>
            <option value="cluster">Prod</option>
          </select>
          {/* <button type="submit" onClick={() => handleJoin()}>
            Join meeting
          </button> */}
        </div>
      </div>
    );
  }

  /**
   * If everything goes well, show dyte meeting component
   */

  return <DyteMeeting meeting={window.meeting} />;
};

export default App;
