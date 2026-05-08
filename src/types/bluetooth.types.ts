export interface DeviceData {
    id: string
    name: string
    connected: boolean
}

export interface BluetoothCharacteristicData {
    uuid: string
    properties: BluetoothCharacteristicProperties
}

export interface BluetoothServiceData {
    uuid: string
    characteristics: BluetoothCharacteristicData[]
}