import { ChangeEvent } from 'react';
import { styled } from '@stitches/react';

import { Flex } from './shared';
import CustomInputNumber from './CustomInputNumber';
import { IRoom } from 'models/Room';

export const minAdultGuestPerRoom = 1;
const maxGuestPerRoom = 4; // Room max 4 people
const isDisabled = false;

interface RoomCardProps {
  roomData: IRoom;
  index: number;
  isAllGuestsAllocated: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function RoomCard({ roomData, index, isAllGuestsAllocated, onChange }: RoomCardProps) {
  const peopleAllocated = roomData.adult + roomData.child;
  const remainingAllocation = maxGuestPerRoom - peopleAllocated;
  const isAddButtonDisabled = isAllGuestsAllocated || remainingAllocation === 0;

  const handleQuantityBlur = (index: number, { target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    console.log(`Quantity blurred: Room: ${++index} -  name: ${name} - value: ${value}`);
  };

  return (
    <Container key={index}>
      <p style={{ display: 'inline-flex', margin: '10px 0' }}>{`房間： ${peopleAllocated}人`}</p>
      <Flex style={{ justifyContent: 'space-between', padding: '8px 0' }}>
        <span>大人</span>
        <CustomInputNumber
          min={minAdultGuestPerRoom}
          max={maxGuestPerRoom}
          step={1}
          name="adult"
          value={roomData.adult}
          onChange={event => onChange(event)}
          onBlur={event => handleQuantityBlur(index, event)}
          disabled={isDisabled}
          isAddButtonDisabled={isAddButtonDisabled}
        />
      </Flex>

      <Flex style={{ justifyContent: 'space-between' }}>
        <span>小孩</span>
        <CustomInputNumber
          min={0}
          max={maxGuestPerRoom}
          step={1}
          name="child"
          value={roomData.child}
          onChange={event => onChange(event)}
          onBlur={event => handleQuantityBlur(index, event)}
          disabled={isDisabled}
          isAddButtonDisabled={isAddButtonDisabled}
        />
      </Flex>
    </Container>
  );
}

const Container = styled('div', {
  borderBottom: '1px solid #ccc',
  padding: '10px',
  '&:last-child': {
    borderBottom: 'none',
  },
});
