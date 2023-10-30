import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const DeliveriesListWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
`;

const DeliveriesList: React.FC = () => {
    useEffect(() => {
        const data = fetch('http://localhost:3001/delivery/getDeliveriesData')
            .then((d) => d.json())
            .then((data) => console.log(data));
    });
    return (
        <DeliveriesListWrapper>
            <h1>Hello</h1>
        </DeliveriesListWrapper>
    );
};

export default DeliveriesList;
