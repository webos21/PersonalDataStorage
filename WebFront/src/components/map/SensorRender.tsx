import MainCard from '../MainCard';

const SensorRender = (props) => {
    const { sInfo, selectedRow, display } = props;

    return (
        <>
            {sInfo.length > 0 && (
                <MainCard className={`p-1 ${display === 'none' ? 'hidden' : 'block'}`}>
                    {sInfo.map((row, index) => {
                        return <TempGraph key={row.sensorId} row={row} sIndex={index} dataFromParent={selectedRow} />;
                    })}
                </MainCard>
            )}
        </>
    );
};

export default SensorRender;
