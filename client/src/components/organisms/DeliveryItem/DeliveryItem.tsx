import React from 'react';
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { Delivery, DeliveryStatus } from '../../../Model';
import { StyledHeader, StyledDeliveryDetailsItem, DeliveryDetails, StyledTimeline } from './DeliveryItemStyles';
import { DateUtil } from '../../../utils';

const DeliveryItem: React.FC = ({ delivery }: { delivery: Delivery }) => {
    const template: React.FC<PanelHeaderTemplateOptions> = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className}`;
        const titleClassName = `${options.titleClassName} ml-2 text-primary`;

        //TODO consider which value should be displayed
        // const status = delivery.history.findLast((item) => item.date === undefined) || DeliveryStatus.FINALIZED;
        const currentStatus =
            delivery.history[delivery.history.indexOf(delivery.history.findLast((item) => item.date === undefined)) - 1]
                ?.status || DeliveryStatus.FINALIZED;

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
                <span>Status: {currentStatus}</span>
            </StyledHeader>
        );
    };

    return (
        <Panel headerTemplate={template} toggleable>
            <DeliveryDetails>
                <StyledTimeline
                    value={delivery.history}
                    opposite={(item) => item.status}
                    content={(item) => (
                        <small className="text-color-secondary">
                            {item.date ? DateUtil(item.date) : <i className="pi pi-spin pi-spinner" />}
                        </small>
                    )}
                />
                <StyledDeliveryDetailsItem delivery={delivery} />
            </DeliveryDetails>
        </Panel>
    );
};
export default DeliveryItem;
