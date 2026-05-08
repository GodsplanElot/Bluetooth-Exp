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

            return value
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export default new BluetoothService()