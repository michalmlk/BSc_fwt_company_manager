import styled from 'styled-components';

export const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 150px repeat(2, 1fr);
    grid-template-rows: 60px 1fr;
    width: 100%;
    height: 100vh;
    grid-template-areas:
        'n n n'
        's c c';
`;
