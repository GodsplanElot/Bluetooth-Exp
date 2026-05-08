export interface DeviceData {
    id: string
    name: string
    connected: boolean
}


export interface BluetoothCharacteristicData {
    uuid: string
    properties: BluetoothCharacteristicProperties
    value?: string
    characteristic?: BluetoothRemoteGATTCharacteristic
}

export interface BluetoothServiceData {
    uuid: string
    characteristics: BluetoothCharacteristicData[]
}