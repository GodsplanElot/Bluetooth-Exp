import { useState } from 'react'
import bluetoothService from '../services/bluetooth.service'
import {
    BluetoothServiceData,
} from '../types/bluetooth.types'

export const useBluetooth = () => {
    const [device, setDevice] =
        useState<BluetoothDevice | null>(null)

    const [connected, setConnected] =
        useState(false)

    const [loading, setLoading] =
        useState(false)

    const [services, setServices] =
        useState<BluetoothServiceData[]>([])

    const [logs, setLogs] = useState<string[]>([])

    const addLog = (message: string) => {
        const timestamp =
            new Date().toLocaleTimeString()

        setLogs(prev => [
            `[${timestamp}] ${message}`,
            ...prev,
        ])
    }

    const discoverServices = async () => {
        const discoveredServices =
            await bluetoothService.getServices()

        const formattedServices:
            BluetoothServiceData[] = []

        for (const service of discoveredServices) {
            const characteristics =
                await bluetoothService.getCharacteristics(
                    service
                )

            formattedServices.push({
                uuid: service.uuid,
                characteristics: characteristics.map(
                    char => ({
                        uuid: char.uuid,
                        properties: char.properties,
                    })
                ),
            })
        }

        setServices(formattedServices)

        addLog(
            `Discovered ${formattedServices.length} services`
        )
    }

    const connect = async () => {
        try {
            setLoading(true)

            addLog('Scanning for Bluetooth devices')

            const selectedDevice =
                await bluetoothService.requestDevice()

            setDevice(selectedDevice)

            addLog(
                `Selected device: ${selectedDevice.name ||
                'Unknown Device'
                }`
            )

            await bluetoothService.connectDevice()

            setConnected(true)

            addLog('Device connected successfully')

            await discoverServices()
        } catch (error) {
            console.error(error)

            addLog('Connection failed')
        } finally {
            setLoading(false)
        }
    }

    const disconnect = () => {
        bluetoothService.disconnectDevice()

        setConnected(false)

        addLog('Device disconnected')
    }

    return {
        device,
        connected,
        loading,
        services,
        logs,
        connect,
        disconnect,
    }
}