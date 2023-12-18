import { useState, useEffect, useMemo, ChangeEvent } from 'react';

import { Box } from './shared';
import RoomCard from './RoomCard';

import { IRoom } from 'models/Room';

interface RoomAllocationProps {
  guest: number;
  room: number;
  onChange: (result: IRoom[]) => void;
}

export default function RoomAllocation({ guest, room, onChange }: RoomAllocationProps) {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [totalGuests, setTotalGuests] = useState(guest);

  const guestsAllocated = useMemo(() => rooms.reduce((acc, { adult, child }) => acc + adult + child, 0), [rooms]);
  const guestsUnAllocated = totalGuests - guestsAllocated;
  const isAllGuestsAllocated = guestsUnAllocated === 0;

  const handleRoomChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newRooms = [...rooms];
    const {
      target: { name, value },
    } = event;
    newRooms[index][name as keyof IRoom] = +value;
    setRooms(newRooms);
    onChange(newRooms);
  };

  useEffect(() => {
    const initializeRooms = () => {
      const initialRoom = { adult: 1, child: 0 };
      const newRooms = Array.from({ length: room }, () => ({ ...initialRoom }));
      setRooms(newRooms);
      setTotalGuests(guest);
      onChange(newRooms);
    };

    initializeRooms();
  }, [room, guest, onChange]);

  return (
    <div style={{ width: '300px', border: '1px dashed gray', padding: '8px' }}>
      <h3>
        住客人數 {guest} / {room} 房{' '}
      </h3>

      <Box>尚未分配人數： {guestsUnAllocated} 人</Box>

      <div>
        {rooms.map((roomData, index) => (
          <RoomCard
            key={index}
            roomData={roomData}
            index={index}
            onChange={e => handleRoomChange(index, e)}
            isAllGuestsAllocated={isAllGuestsAllocated}
          />
        ))}
      </div>
    </div>
  );
}
