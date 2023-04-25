import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Wrapper } from './Navbar.styles';

const Navbar: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        { label: 'Transports', icon: 'pi pi-fw pi-calendar' },
        { label: 'Drivers', icon: 'pi pi-fw pi-id-card' },
        { label: 'Machine Park', icon: 'pi pi-fw pi-truck' },
        { label: 'Reports', icon: 'pi pi-fw pi-file' },
    ];

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
            <Button icon="pi pi-cog" rounded severity="info" aria-label="Settings" />
        </Wrapper>
    );
};

export default Navbar;
