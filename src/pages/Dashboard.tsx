import ScannerButton from '../components/ScannerButton'
import DeviceCard from '../components/DeviceCard'
import ServicesList from '../components/ServicesList'
import ConsoleLogs from '../components/ConsoleLogs'

import { useBluetooth } from '../hooks/useBluetooth'

const Dashboard = () => {
    const {
        device,
        connected,
        loading,
        services,
        logs,
        connect,
        disconnect,
    } = useBluetooth()

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-3">
                    Bluetooth Device Inspector
                </h1>

                <p className="text-zinc-400 mb-8">
                    Scan, inspect and interact with nearby Bluetooth devices.
                </p>

                <ScannerButton
                    onClick={connect}
                    loading={loading}
                />

                {device && (
                    <DeviceCard
                        device={device}
                        connected={connected}
                        onDisconnect={disconnect}
                    />
                )}

                {services.length > 0 && (
                    <ServicesList services={services} />
                )}

                <ConsoleLogs logs={logs} />
            </div>
        </div>
    )
}

export default Dashboard