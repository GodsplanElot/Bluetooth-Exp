class BluetoothService {
    private device: BluetoothDevice | null = null
    private server: BluetoothRemoteGATTServer | null = null

    async requestDevice() {
        try {
            const device =
                await navigator.bluetooth.requestDevice({
                    acceptAllDevices: true,
                    optionalServices: [
                        'battery_service',
                        'device_information',
                    ],
                })

            this.device = device

            return device
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async connectDevice() {
        if (!this.device) {
            throw new Error('No device selected')
        }

        this.server =
            await this.device.gatt?.connect() || null

        return this.server
    }

    disconnectDevice() {
        if (this.device?.gatt?.connected) {
            this.device.gatt.disconnect()
        }
    }

    async getServices() {
        if (!this.server) {
            throw new Error('No connected server')
        }

        return await this.server.getPrimaryServices()
    }

    async getCharacteristics(
        service: BluetoothRemoteGATTService
    ) {
        return await service.getCharacteristics()
    }

    async readCharacteristic(
        characteristic: BluetoothRemoteGATTCharacteristic
    ) {
        try {
            const value =
                await characteristic.readValue()

            const decoder = new TextDecoder()

            try {
                return decoder.decode(value)
            } catch {
                return Array.from(
                    new Uint8Array(value.buffer)
                ).join(', ')
            }
        } catch (error) {
            console.error(error)

            return 'Unable to read'
        }
    }

    async writeCharacteristic(
        characteristic: BluetoothRemoteGATTCharacteristic,
        data: string
    ) {
        try {
            const encoder = new TextEncoder()

            const encodedData =
                encoder.encode(data)

            await characteristic.writeValue(
                encodedData
            )

            return true
        } catch (error) {
            console.error(error)

            return false
        }
    }
}

export default new BluetoothService()