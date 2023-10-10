import styled from 'styled-components';

interface StyledRowProps {
    isWarning?: boolean;
    isCritical?: boolean;
}

const Row = styled.p``;

export const StyledRow = styled(Row)<StyledRowProps>`
    color: ${({ isWarning, isCritical }) => (isCritical ? 'red' : isWarning ? '#dba51e' : '#495057')};
`;
