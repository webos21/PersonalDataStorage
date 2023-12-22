import { Card } from '@mui/material';
import TempGraph from './TempGraph';

const SensorRender = (props) => {
    const { sInfo, selectedRow, display } = props;

    return (
        <>
            {sInfo.length > 0 && (
                <Card sx={{ p: 1, display: display }}>
                    {sInfo.map((row, index) => {
                        return <TempGraph key={row.sensorId} row={row} sIndex={index} dataFromParent={selectedRow} />;
                    })}
                </Card>
            )}
        </>
    );
};

export default SensorRender;
