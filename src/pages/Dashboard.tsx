import ScannerButton from '../components/ScannerButton'
import DeviceCard from '../components/DeviceCard'
import { useBluetooth } from '../hooks/useBluetooth'

const Dashboard = () => {
    const {
        device,
        connected,
        loading,
        connect,
        disconnect,
    } = useBluetooth()

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-3">
                    Bluetooth Dashboard
                </h1>

                <p className="text-zinc-400 mb-8">
                    Scan and connect to nearby Bluetooth devices.
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
            </div>
        </div>
    )
}

export default Dashboard