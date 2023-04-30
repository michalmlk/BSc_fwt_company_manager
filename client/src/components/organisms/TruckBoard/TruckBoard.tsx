import React from "react";

interface TruckBoardProps {

}

const TruckBoard: React.FC<TruckBoardProps> = () => {
    return (
        <>
            <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
        </>
    )
}