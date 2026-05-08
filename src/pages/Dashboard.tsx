import { useState } from 'react'
import ScannerButton from '../components/ScannerButton'
import DeviceCard from '../components/DeviceCard'
import ServicesList from '../components/ServicesList'
import ConsoleLogs from '../components/ConsoleLogs'
import ThemeToggle from '../components/ThemeToggle'
import ScanOverlay from '../components/ScanOverlay'
import { useBluetooth } from '../hooks/useBluetooth'
import { Bluetooth, Info, ShieldAlert } from 'lucide-react'

const Dashboard = () => {
    const {
        device,
        connected,
        loading,
        services,
        logs,
        isSupported,
        writeToCharacteristic,
        connect,
        disconnect,
    } = useBluetooth()

    const [showOverlay, setShowOverlay] = useState(false)

    const handleConnect = async () => {
        setShowOverlay(true)
        await connect()
        setShowOverlay(false)
    }

    return (
        <div className="min-h-screen transition-colors duration-300 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-40 glass border-b border-glass-border">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
                            <Bluetooth className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">BlueInspect</span>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 pt-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                            Bluetooth <span className="text-brand-primary">Explorer</span>
                        </h1>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            A professional-grade tool to scan, debug, and interact with Web Bluetooth peripherals in real-time.
                        </p>
                    </div>
                    
                    <ScannerButton
                        onClick={handleConnect}
                        loading={loading}
                    />
                </div>

                {!isSupported && (
                    <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4">
                        <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-red-500">Browser Not Supported</h3>
                            <p className="text-sm text-red-500/80">
                                Your browser doesn't support the Web Bluetooth API. Please use a modern version of Chrome, Edge, or Opera on a secure (HTTPS) origin.
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Device & Services */}
                    <div className="lg:col-span-8 space-y-8">
                        {device ? (
                            <>
                                <DeviceCard
                                    device={device}
                                    connected={connected}
                                    onDisconnect={disconnect}
                                />
                                {services.length > 0 && (
                                    <ServicesList
                                        services={services}
                                        onWrite={writeToCharacteristic}
                                    />
                                )}
                            </>
                        ) : (
                            <div className="premium-card p-12 text-center flex flex-col items-center justify-center border-dashed border-2">
                                <div className="w-16 h-16 bg-surface-base rounded-full flex items-center justify-center mb-4 text-text-secondary">
                                    <Info className="w-8 h-8 opacity-20" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No Device Connected</h3>
                                <p className="text-text-secondary max-w-xs">
                                    Start a scan to discover and connect to nearby Bluetooth Low Energy devices.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Logs */}
                    <div className="lg:col-span-4">
                        <ConsoleLogs logs={logs} />
                    </div>
                </div>
            </main>

            <ScanOverlay isVisible={showOverlay} onClose={() => setShowOverlay(false)} />
        </div>
    )
}

export default Dashboard