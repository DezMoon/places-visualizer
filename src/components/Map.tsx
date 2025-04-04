// Map.tsx
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import MapGL from 'react-map-gl';
import { Place } from '../types/types';

const MAP_STYLE = 'mapbox://styles/mapbox/light-v10';

export const MapComponent = ({ data }: { data: Place[] }) => {
    const initialViewState = {
        longitude: -98.5795,
        latitude: 39.8283,
        zoom: 3,
        pitch: 0,
        bearing: 0,
    };

    const layers = [
        new ScatterplotLayer({
            id: 'scatterplot-layer',
            data: data
                .filter(place => place.longitude !== undefined && place.latitude !== undefined)
                .map(place => ({
                    position: [place.longitude, place.latitude],
                    properties: place,
                })),
            getPosition: d => d.position,
            getFillColor: [229, 57, 53, 200],
            getRadius: 100,
            pickable: true,
        }),
    ];

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DeckGL
                initialViewState={initialViewState}
                controller={true}
                layers={layers}
            >
                <MapGL
                    mapStyle={MAP_STYLE}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    style={{ width: '100%', height: '100%' }}
                    getCursor={({ isDragging }) => (isDragging ? 'grabbing' : 'grab')}
                />
            </DeckGL>
        </div>
    );
};