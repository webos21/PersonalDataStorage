export interface BitwiseEnum {
    id: string;
    name: string;
    value: number;
}

function makeEnum(id: string, name: string, value: number): BitwiseEnum {
    return {
        id: id,
        name: name,
        value: value
    };
}

export const NetTypeEnum: Record<string, BitwiseEnum> = {
    Bluetooth: makeEnum('Bluetooth', 'BT', 0x01),
    LoRa: makeEnum('LoRa', 'LoRa', 0x02),
    NFC: makeEnum('NFC', 'NFC', 0x04),
    WiFi: makeEnum('WiFi', 'Wi-Fi', 0x08),
    LTE: makeEnum('LTE', 'LTE', 0x10),
    RF: makeEnum('RF', 'RF', 0x20)
};

export const DataTypeEnum: Record<string, BitwiseEnum> = {
    Temperature: makeEnum('Temperature', '온도', 0x01),
    Humidity: makeEnum('Humidity', '습도', 0x02),
    BatteryPercent: makeEnum('BatteryPercent', '배터리잔량', 0x04),
    BatteryVolt: makeEnum('BatteryVolt', '배터리전압', 0x08),
    RSSI: makeEnum('RSSI', '신호세기', 0x10),
    Shock: makeEnum('Shock', '충격', 0x20),
    Light: makeEnum('Light', '조도', 0x40),
    Pressure: makeEnum('Pressure', '압력', 0x80),
    DoorOpen: makeEnum('DoorOpen', '문열림', 0x100),
    GNSS: makeEnum('GNSS', '위치', 0x1000)
};

export const NetTypes: BitwiseEnum[] = Object.values(NetTypeEnum);
export const DataTypes: BitwiseEnum[] = Object.values(DataTypeEnum);

export function netTypesFromInt(intValue: number): BitwiseEnum[] {
    return NetTypes.filter((item) => (intValue & item.value) === item.value);
}

export function hasNetType(intValue: number, enumObject: BitwiseEnum): boolean {
    return (intValue & enumObject.value) === enumObject.value;
}

export function intFromNetObject(formObject: number[]): number {
    return formObject.reduce((acc, item) => acc | item, 0);
}

export function dataTypesFromInt(intValue: number): BitwiseEnum[] {
    return DataTypes.filter((item) => (intValue & item.value) === item.value);
}

export function hasDataType(intValue: number, enumObject: BitwiseEnum): boolean {
    return (intValue & enumObject.value) === enumObject.value;
}

export function intFromDataObject(formObject: number[]): number {
    return formObject.reduce((acc, item) => acc | item, 0);
}

const BitwiseEnums = {
    NetTypeEnum,
    DataTypeEnum,
    NetTypes,
    DataTypes,
    netTypesFromInt,
    dataTypesFromInt,
    intFromNetObject,
    intFromDataObject,
    hasNetType,
    hasDataType
};

export default BitwiseEnums;
