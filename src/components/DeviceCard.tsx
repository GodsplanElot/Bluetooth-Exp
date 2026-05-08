import { Smartphone, ZapOff } from 'lucide-react';

interface Props {
    device: BluetoothDevice
    connected: boolean
    onDisconnect: () => void
}

const DeviceCard = ({
    device,
    connected,
    onDisconnect,
}: Props) => {
    return (
        <div className="premium-card p-6 overflow-hidden relative">
            {/* Decorative gradient */}
            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 -mr-16 -mt-16 rounded-full transition-colors duration-500 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>

            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${connected ? 'bg-green-500/10 text-green-500' : 'bg-zinc-500/10 text-text-secondary'}`}>
                        <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Connected Device</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                            <span className="text-sm font-medium text-text-secondary">
                                {connected ? 'Active Connection' : 'Disconnected'}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onDisconnect}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold text-sm border border-red-500/20"
                >
                    {connected ? (
                        <>
                            <ZapOff className="w-4 h-4" />
                            Disconnect
                        </>
                    ) : (
                        'Forget'
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-base/50 border border-glass-border">
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-bold mb-1">Device Name</p>
                    <p className="font-mono text-sm truncate">{device.name || 'Unknown Device'}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-base/50 border border-glass-border">
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-bold mb-1">Hardware ID</p>
                    <p className="font-mono text-sm truncate">{device.id}</p>
                </div>
            </div>
        </div>
    )
}

export default DeviceCard