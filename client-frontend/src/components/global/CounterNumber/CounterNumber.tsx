import { Box, Text } from "@chakra-ui/react";
import styled, { keyframes } from "styled-components";

export default function Counter({ counterNumber }: { counterNumber: number }) {
  const CounterWrapper = styled(Box)`
    --num: 1;
  `;

  const counterAnimation = keyframes`
  from {
    --num: 1;
  }
  to {
    --num: ${counterNumber};
  }
`;
  const CounterNumber = styled(Text)`
    @property --num {
      syntax: "<integer>";
      initial-value: ${counterNumber};
      inherits: false;
    }

    animation: ${counterAnimation} 3s ease-in-out;
    counter-reset: num var(--num);
    &::after {
      content: counter(num);
    }
  `;

  return (
    <CounterWrapper>
      <CounterNumber />
    </CounterWrapper>
  );
}
