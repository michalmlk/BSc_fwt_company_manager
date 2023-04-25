import styled from 'styled-components';

export const Wrapper = styled.div`
    grid-area: n;
    display: flex;
    width: 100%;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .settings {
        width: 40px;
        height: 40px;
    }

    .p-tabmenu {
        align-self: flex-end;
    }
`;
