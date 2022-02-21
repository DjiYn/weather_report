import React from 'react';
import { useParams } from 'react-router-dom';
import LocationInfo from "./LocationInfo";

const LocationHook = (comp) => {
    const { locationId } = useParams();

    return (
        <LocationInfo text={locationId}></LocationInfo>
    )
}


export default LocationHook;