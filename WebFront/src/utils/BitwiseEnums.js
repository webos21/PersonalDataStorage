function makeEnum(id, name, value) {
    return {
        id: id,
        name: name,
        value: value
    };
}

const NetTypeEnum = {
    Bluetooth: makeEnum('Bluetooth', 'BT', 0x01),
    LoRa: makeEnum('LoRa', 'LoRa', 0x02),
    NFC: makeEnum('NFC', 'NFC', 0x04),
    WiFi: makeEnum('WiFi', 'Wi-Fi', 0x08),
    LTE: makeEnum('LTE', 'LTE', 0x10),
    RF: makeEnum('RF', 'RF', 0x20)
};

const DataTypeEnum = {
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

const NetTypes = Object.values(NetTypeEnum);
const DataTypes = Object.values(DataTypeEnum);

function netTypesFromInt(intValue) {
    let ret = [];

    if ((intValue & NetTypeEnum.Bluetooth.value) === NetTypeEnum.Bluetooth.value) {
        ret[ret.length] = NetTypeEnum.Bluetooth;
    }
    if ((intValue & NetTypeEnum.LoRa.value) === NetTypeEnum.LoRa.value) {
        ret[ret.length] = NetTypeEnum.LoRa;
    }
    if ((intValue & NetTypeEnum.NFC.value) === NetTypeEnum.NFC.value) {
        ret[ret.length] = NetTypeEnum.NFC;
    }
    if ((intValue & NetTypeEnum.WiFi.value) === NetTypeEnum.WiFi.value) {
        ret[ret.length] = NetTypeEnum.WiFi;
    }
    if ((intValue & NetTypeEnum.LTE.value) === NetTypeEnum.LTE.value) {
        ret[ret.length] = NetTypeEnum.LTE;
    }
    if ((intValue & NetTypeEnum.RF.value) === NetTypeEnum.RF.value) {
        ret[ret.length] = NetTypeEnum.RF;
    }

    return ret;
}

function hasNetType(intValue, enumObject) {
    return (intValue & enumObject.value) == enumObject.value;
}

function intFromNetObject(formObject) {
    let ret = 0;

    // console.log('intFromNetObject', formObject);
    formObject.forEach((item) => {
        // console.log('intFromNetObject', item);
        ret |= item;
    });

    return ret;
}

function dataTypesFromInt(intValue) {
    let ret = [];

    if ((intValue & DataTypeEnum.Temperature.value) === DataTypeEnum.Temperature.value) {
        ret[ret.length] = DataTypeEnum.Temperature;
    }
    if ((intValue & DataTypeEnum.Humidity.value) === DataTypeEnum.Humidity.value) {
        ret[ret.length] = DataTypeEnum.Humidity;
    }
    if ((intValue & DataTypeEnum.BatteryPercent.value) === DataTypeEnum.BatteryPercent.value) {
        ret[ret.length] = DataTypeEnum.BatteryPercent;
    }
    if ((intValue & DataTypeEnum.BatteryVolt.value) === DataTypeEnum.BatteryVolt.value) {
        ret[ret.length] = DataTypeEnum.BatteryVolt;
    }
    if ((intValue & DataTypeEnum.RSSI.value) === DataTypeEnum.RSSI.value) {
        ret[ret.length] = DataTypeEnum.RSSI;
    }
    if ((intValue & DataTypeEnum.Shock.value) === DataTypeEnum.Shock.value) {
        ret[ret.length] = DataTypeEnum.Shock;
    }
    if ((intValue & DataTypeEnum.Light.value) === DataTypeEnum.Light.value) {
        ret[ret.length] = DataTypeEnum.Light;
    }
    if ((intValue & DataTypeEnum.Pressure.value) === DataTypeEnum.Pressure.value) {
        ret[ret.length] = DataTypeEnum.Pressure;
    }
    if ((intValue & DataTypeEnum.DoorOpen.value) === DataTypeEnum.DoorOpen.value) {
        ret[ret.length] = DataTypeEnum.DoorOpen;
    }
    if ((intValue & DataTypeEnum.GNSS.value) === DataTypeEnum.GNSS.value) {
        ret[ret.length] = DataTypeEnum.GNSS;
    }

    return ret;
}

function hasDataType(intValue, enumObject) {
    return (intValue & enumObject.value) == enumObject.value;
}

function intFromDataObject(formObject) {
    let ret = 0;

    console.log('intFromDataObject', formObject);
    formObject.forEach((item) => {
        console.log('intFromDataObject', item);
        ret |= item;
    });

    return ret;
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
