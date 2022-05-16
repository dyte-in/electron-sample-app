import { useState, useCallback, useEffect } from 'react';
import DyteClient from "@dyte-in/client-core";
import { DyteMeeting } from "@dyte-in/react-ui-kit";
import { DyteElectronStore } from "@dyte-in/electron-store";
import Login from "./Login";

const App = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [roomName, setRoomName] = useState<string | null>(null);
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

  const handleJoin = useCallback(async () => {
    if (!roomName || roomName.trim().length === 0) return;
    if (!authToken || authToken.trim().length === 0) return;

    window.meeting = await DyteClient.init({
      roomName,
      apiBase: 'https://api.staging.dyte.in/',
      authToken,
      defaults,
    });
    setActiveMeeting(true);
  }, [roomName, authToken, defaults]);

  useEffect(() => {
    async function fetchMyAPI() {
      if (!authToken) {
        setAuthToken(await DyteElectronStore.get('authToken'));
      }
    }
    fetchMyAPI();
  }, [authToken]);

  if (!authToken) {
    return <Login onLogin={(token: string) => setAuthToken(token)} />;
  }

  if (!activeMeeting) {
    return (
      <div className="home">
        <h2>Enter your meeting ID to join</h2>
        <div className="meeting-form">
          <input
            type="text"
            onChange={(e) => setRoomName(e.currentTarget.value)}
          />
          <button type="submit" onClick={() => handleJoin()}>
            Join meeting
          </button>
        </div>
      </div>
    );
  }

  /**
   * If everything goes well, show dyte meeting component
   */

  return <DyteMeeting meeting={window.meeting} />;
}

export default App
