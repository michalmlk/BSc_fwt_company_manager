import React from 'react';
import DeliveriesList from "../../organisms/DeliveriesList/DeliveriesList";

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-column w-12 p-6">
            <h1>Your deliveries:</h1>
            <DeliveriesList />
        </div>
    );
};

export default Dashboard;
