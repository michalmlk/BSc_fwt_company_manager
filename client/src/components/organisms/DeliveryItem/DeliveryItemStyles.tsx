import styled from "styled-components";
import DeliveryDetailsItem from "../../molecules/DeliveryDetailsItem";
import {Timeline} from "primereact/timeline";

export const StyledHeader = styled.div`
    display: grid;
    grid-template-areas: 'b id desc status';
    grid-template-columns: 50px 50px repeat(3, 1fr) 200px;
`;

export const StyledDeliveryDetailsItem = styled(DeliveryDetailsItem)``;
export const StyledTimeline = styled(Timeline)``;

export const DeliveryDetails = styled.div`
    display: grid;
    width: 100%;
    min-height: 200px;
    padding: 0 50px;
    grid-template-rows: 50px 1fr;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        'title options details'
        'timeline options details';

    h2 {
        grid-area: title;
    }

    ${StyledDeliveryDetailsItem} {
        grid-area: details;
    }

    ${StyledTimeline} {
        grid-area: timeline;
    }
`;