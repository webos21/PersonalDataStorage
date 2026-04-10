const LocationAndDate = ({ data, city }) => {
    return (
        <div className="w-full">
            <div className="m-0 text-[2rem] font-semibold">{city}</div>
            <h6 className="text-base">{data}</h6>
        </div>
    );
};

export default LocationAndDate;
