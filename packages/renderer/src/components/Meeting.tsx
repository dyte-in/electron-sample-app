import { useEffect, useRef, useState } from 'react';
import DyteClient from '@dytesdk/web-core/inlined';
import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { MeetingAction } from '@/App';

type CommonProps = {
  setAction: React.Dispatch<React.SetStateAction<MeetingAction>>;
};

type Props = {
  authToken: string;
  roomName: string;
} & CommonProps;

export default function Meeting({ authToken, roomName, setAction }: Props) {
  const runOnce = useRef(false);
  const [meeting, setMeeting] = useState<DyteClient>();

  useEffect(() => {
    (async () => {
      if (!runOnce.current) {
        const m = await DyteClient.init({
          roomName,
          authToken,
          defaults: { audio: false, video: false },
        });
        setMeeting(m);

        m.self.on('roomLeft', () => {
          setAction({ type: 'create' });
        });
      }
    })();
  }, []);

  return <DyteMeeting meeting={meeting} showSetupScreen />;
}