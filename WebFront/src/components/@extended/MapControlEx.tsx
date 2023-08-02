import L from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
    position: L.ControlPosition;
    children?: React.ReactNode;
    container?: React.HTMLAttributes<HTMLDivElement>;
    prepend?: boolean;
}

const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right'
};

const MapControlEx = (props: Props): JSX.Element => {
    const [portalRoot, setPortalRoot] = React.useState<any>(document.createElement('div'));
    const positionClass = (props.position && POSITION_CLASSES[props.position]) || POSITION_CLASSES.topright;
    // const portalContainer = document.createElement('div');

    React.useEffect(() => {
        const targetDiv = document.getElementsByClassName(positionClass);
        setPortalRoot(targetDiv[0]);
    }, [positionClass]);

    const className = (props.container?.className?.concat(' ') || '') + 'leaflet-control';
    const container = { ...props.container, className };
    const controlContainer = <div {...container}>{props.children}</div>;

    L.DomEvent.disableClickPropagation(portalRoot);
    L.DomEvent.disableScrollPropagation(portalRoot);

    return ReactDOM.createPortal(controlContainer, portalRoot);
};

export default MapControlEx;
