import React, { PropsWithChildren } from 'react';
import Navbar from '../../organisms/Navbar/Navbar';
import { PageWrapper } from './MainTemplate.styles';

const MainTemplate: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <PageWrapper>
            <Navbar />
            {children}
        </PageWrapper>
    );
};

export default MainTemplate;
