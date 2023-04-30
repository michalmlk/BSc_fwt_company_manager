import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export const StyledWrapper = styled.div`
    grid-area: c;
    padding: 2rem 5rem;
    width: 100%;
    min-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h1:first-child {
        font-size: 32px;
    }
`;

interface WrapperProps {
    title?: string;
}

export const Wrapper: React.FC<WrapperProps & PropsWithChildren> = ({ title, children }) => {
    return (
        <StyledWrapper>
            <h1>{title}</h1>
            {children}
        </StyledWrapper>
    );
};
