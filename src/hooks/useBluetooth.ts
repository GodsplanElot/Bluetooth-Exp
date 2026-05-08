import { useState } from 'react'
import bluetoothService from '../services/bluetooth.service'

export const useBluetooth = () => {
    const [device, setDevice] = useState<BluetoothDevice | null>(null)
    const [connected, setConnected] = useState(false)
    const [loading, setLoading] = useState(false)

    const connect = async () => {
        try {
            setLoading(true)

            const selectedDevice =
                await bluetoothService.requestDevice()

            setDevice(selectedDevice)

            await bluetoothService.connectDevice()

            setConnected(true)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const disconnect = async () => {
        await bluetoothService.disconnectDevice()

        setConnected(false)
    }

    return {
        device,
        connected,
        loading,
        connect,
        disconnect,
    }
}