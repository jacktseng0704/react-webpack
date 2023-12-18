import { useState, useCallback } from 'react';
import { IRoom } from 'models/Room';
import RoomAllocation from 'components/RoomAllocation';
import { globalStyles } from 'styles/global';

export default function App() {
  const [allocationResult, setAllocationResult] = useState<IRoom[]>([]);
  console.log('🚀 ~ file: App.tsx:8 ~ App ~ allocationResult:', allocationResult);

  const handleRoomChange = useCallback((result: IRoom[]) => {
    setAllocationResult(result);
  }, []);

  globalStyles();

  return (
    <div style={{ height: '100vh', width: '100%', display: 'grid', placeItems: 'center' }}>
      <RoomAllocation guest={10} room={3} onChange={handleRoomChange} />

      {/* <div>
        <h2>Allocation Result:</h2>
        <pre>{JSON.stringify(allocationResult, null, 2)}</pre>
      </div> */}
    </div>
  );
}
