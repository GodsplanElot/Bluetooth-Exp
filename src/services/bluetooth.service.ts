class BluetoothService {
    private device: BluetoothDevice | null = null
    private server: BluetoothRemoteGATTServer | null = null
    private disconnectCallback: (() => void) | null = null

    // Reuse encoder/decoder for performance
    private static encoder = new TextEncoder()
    private static decoder = new TextDecoder()

    private handleDisconnection = () => {
        if (this.disconnectCallback) {
            this.disconnectCallback()
        }
        this.device = null
        this.server = null
    }

    setDisconnectCallback(callback: () => void) {
        this.disconnectCallback = callback
    }

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
            // Remove existing listener if any
            this.device.removeEventListener('gattserverdisconnected', this.handleDisconnection)
            this.device.addEventListener('gattserverdisconnected', this.handleDisconnection)

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
        // The event listener will handle the rest
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

            try {
                return BluetoothService.decoder.decode(value)
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
            // Guard check for writability
            if (!characteristic.properties.write && !characteristic.properties.writeWithoutResponse) {
                console.error('Characteristic is not writable')
                return false
            }

            const encodedData =
                BluetoothService.encoder.encode(data)

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