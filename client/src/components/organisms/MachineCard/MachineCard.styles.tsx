import styled from 'styled-components';

interface StyledRowProps {
    isDanger?: boolean;
}

const Row = styled.p``;

export const StyledRow = styled(Row)<StyledRowProps>`
    color: ${({ isDanger }) => (isDanger ? 'red' : '#495057')};
`;
