import { useState, useCallback, useEffect } from 'react'
import bluetoothService from '../services/bluetooth.service'
import type {
    BluetoothServiceData,
    BluetoothCharacteristicData,
} from '../types/bluetooth.types'

export const useBluetooth = () => {
    const [device, setDevice] = useState<BluetoothDevice | null>(null)
    const [connected, setConnected] = useState(false)
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState<BluetoothServiceData[]>([])
    const [logs, setLogs] = useState<string[]>([])
    const [isSupported, setIsSupported] = useState(true)

    const addLog = useCallback((message: string) => {
        const timestamp = new Date().toLocaleTimeString()
        setLogs(prev => [`[${timestamp}] ${message}`, ...prev])
    }, [])

    // Check for browser support on mount
    useEffect(() => {
        if (!navigator.bluetooth) {
            setIsSupported(false)
            addLog('Web Bluetooth is not supported in this browser.')
        }
    }, [addLog])

    const discoverServices = useCallback(async () => {
        try {
            const discoveredServices = await bluetoothService.getServices()
            const formattedServices: BluetoothServiceData[] = []

            for (const service of discoveredServices) {
                const characteristics = await bluetoothService.getCharacteristics(service)
                const formattedCharacteristics: BluetoothCharacteristicData[] = []

                for (const char of characteristics) {
                    let value = 'N/A'
                    if (char.properties.read) {
                        value = await bluetoothService.readCharacteristic(char)
                    }

                    formattedCharacteristics.push({
                        uuid: char.uuid,
                        properties: char.properties,
                        value,
                        characteristic: char
                    })
                }

                formattedServices.push({
                    uuid: service.uuid,
                    characteristics: formattedCharacteristics
                })
            }

            setServices(formattedServices)
            addLog(`Discovered ${formattedServices.length} services`)
        } catch (error) {
            console.error('Service discovery failed:', error)
            addLog('Failed to discover services')
        }
    }, [addLog])

    // Handle automatic disconnection cleanup
    useEffect(() => {
        bluetoothService.setDisconnectCallback(() => {
            setConnected(false)
            setDevice(null)
            setServices([])
            addLog('Device disconnected (Hardware)')
        })
    }, [addLog])

    const connect = useCallback(async () => {
        if (!navigator.bluetooth) {
            addLog('Cannot scan: Web Bluetooth not supported')
            return
        }

        try {
            setLoading(true)
            addLog('Opening device picker...')

            const selectedDevice = await bluetoothService.requestDevice()
            setDevice(selectedDevice)
            addLog(`Selected: ${selectedDevice.name || 'Unknown Device'}`)

            addLog('Connecting to GATT server...')
            await bluetoothService.connectDevice()
            setConnected(true)
            addLog('Connected successfully')

            await discoverServices()
        } catch (error) {
            console.error(error)
            addLog('Connection cancelled or failed')
        } finally {
            setLoading(false)
        }
    }, [addLog, discoverServices])

    const disconnect = useCallback(() => {
        bluetoothService.disconnectDevice()
        setConnected(false)
        setDevice(null)
        setServices([])
        addLog('Disconnected by user')
    }, [addLog])

    const writeToCharacteristic = useCallback(async (
        characteristic: BluetoothRemoteGATTCharacteristic,
        data: string
    ) => {
        const success = await bluetoothService.writeCharacteristic(characteristic, data)
        if (success) {
            addLog(`Sent data: "${data}"`)
        } else {
            addLog(`Failed to send data`)
        }
    }, [addLog])

    return {
        device,
        connected,
        loading,
        services,
        logs,
        isSupported,
        connect,
        disconnect,
        writeToCharacteristic,
        addLog
    }
}