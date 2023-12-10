import React, { useEffect, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Wrapper } from './Navbar.styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { LoginService } from '../../../services/LoginService';

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
}

const Navbar: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const { setToken, token } = useAuth();
    const userService = new LoginService();
    const [userData, setUserData] = useState<UserData | null>(null);

    const items = [
        { label: 'Transports', icon: 'pi pi-fw pi-calendar', command: () => navigateToPath('/home') },
        { label: 'Drivers', icon: 'pi pi-fw pi-id-card', command: () => navigateToPath('/employees') },
        { label: 'Machine Park', icon: 'pi pi-fw pi-truck', command: () => navigateToPath('/trucks') },
    ];

    const navigateToPath = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        const getData = async () => {
            const { data } = await userService.getData();
            if (data && token) {
                setUserData(data.userData);
            }
        };
        getData();
    }, [token]);

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
            <div className="flex align-items-center gap-3">
                {userData && (
                    <p style={{ color: '#000' }}>
                        Hello {userData.firstName} {userData.lastName}
                    </p>
                )}
                <Button
                    icon="pi pi-sign-out"
                    severity="info"
                    aria-label="Logout"
                    tooltip="Logout"
                    onClick={() => setToken('')}
                />
            </div>
        </Wrapper>
    );
};

export default Navbar;
