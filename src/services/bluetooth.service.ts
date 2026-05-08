class BluetoothService {
    private device: BluetoothDevice | null = null
    private server: BluetoothRemoteGATTServer | null = null

    async requestDevice() {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [
                    'battery_service',
                    'device_information',
                ],
            })

            this.device = device

            return device
        } catch (error) {
            console.error('Error requesting device:', error)
            throw error
        }
    }

    async connectDevice() {
        if (!this.device) {
            throw new Error('No device selected')
        }

        try {
            this.server = await this.device.gatt?.connect() || null

            return this.server
        } catch (error) {
            console.error('Connection failed:', error)
            throw error
        }
    }

    async disconnectDevice() {
        if (this.device?.gatt?.connected) {
            this.device.gatt.disconnect()
        }
    }

    async getPrimaryServices() {
        if (!this.server) {
            throw new Error('No GATT server connected')
        }

        return await this.server.getPrimaryServices()
    }

    async getCharacteristics(service: BluetoothRemoteGATTService) {
        return await service.getCharacteristics()
    }
}

export default new BluetoothService()