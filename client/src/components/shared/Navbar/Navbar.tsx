import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Wrapper } from './Navbar.styles';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const items = [
        { label: 'Transports', icon: 'pi pi-fw pi-calendar', command: () => navigateToPath('/home') },
        { label: 'Drivers', icon: 'pi pi-fw pi-id-card', command: () => navigateToPath('/employees') },
        { label: 'Machine Park', icon: 'pi pi-fw pi-truck', command: () => navigateToPath('/trucks') },
    ];

    const navigateToPath = (path: string) => {
        navigate(path);
    };

    return (
        <Wrapper>
            <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
                style={{
                    gridArea: 'n',
                }}
            />
            <Button
                icon="pi pi-cog"
                severity="info"
                aria-label="Settings"
                onClick={() => navigateToPath('/settings')}
            />
        </Wrapper>
    );
};

export default Navbar;
