import React from 'react';
import { Wrapper } from '../../utils/Wrapper.styles';
import DeliveriesList from "../../organisms/DeliveriesList/DeliveriesList";

const Dashboard: React.FC = () => {
    return (
        <Wrapper>
            <h1>Your deliveries:</h1>
            <DeliveriesList />
        </Wrapper>
    );
};

export default Dashboard;
