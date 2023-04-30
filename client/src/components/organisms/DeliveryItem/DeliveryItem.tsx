import React from 'react';
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { Delivery } from '../../../Model';
import styled from 'styled-components';
import { DateUtil } from '../../../utils';

const StyledHeader = styled.div`
    display: grid;
    grid-template-areas: 'b id desc status';
    grid-template-columns: 50px 50px repeat(3, 1fr) 200px;
`;

const DeliveryItem: React.FC = ({ delivery }: { delivery: Delivery }) => {
    const template: React.FC<PanelHeaderTemplateOptions> = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className}`;
        const titleClassName = `${options.titleClassName} ml-2 text-primary`;
        const style = { fontSize: '1.2rem', fontWeight: 'normal' };

        return (
            <StyledHeader className={className} style={{ borderRadius: !options.collapsed ? '8px 8px 0 0' : '8px' }}>
                <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                    <span className={toggleIcon} />
                    <Ripple />
                </button>
                <span className={titleClassName} style={{ ...style, fontWeight: 'bold' }}>
                    {delivery.id}
                </span>
                <span className={titleClassName} style={style}>
                    Product: {delivery.product}
                </span>

                <span className={titleClassName} style={{ ...style, fontWeight: 'bold' }}>
                    Destination: {delivery.destination}
                </span>
                <span className={titleClassName} style={style}>
                    Deadline: {DateUtil(delivery.deadline)}
                </span>
                <span className={titleClassName} style={style}>
                    Status: {delivery.status}
                </span>
            </StyledHeader>
        );
    };

    return (
        <Panel headerTemplate={template} toggleable>
            <h1>{delivery.product}</h1>
        </Panel>
    );
};
export default DeliveryItem;
