import styled from 'styled-components';
import { Card } from 'primereact/card';

export const StyledCard = styled(Card)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 1280px;
`;

export const StyledBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;