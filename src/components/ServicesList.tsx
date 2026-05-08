import type {
    BluetoothServiceData,
} from '../types/bluetooth.types'
import WriteControls from './WriteControls'
import { Layers, Activity, Database, Copy } from 'lucide-react'

interface Props {
    services: BluetoothServiceData[]

    onWrite: (
        characteristic:
            BluetoothRemoteGATTCharacteristic,
        data: string
    ) => void
}

const ServicesList = ({
    services,
    onWrite,
}: Props) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 px-2">
                <Layers className="w-5 h-5 text-brand-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Services & Characteristics</h2>
            </div>

            <div className="space-y-4">
                {services.map((service) => (
                    <div
                        key={service.uuid}
                        className="premium-card p-0 overflow-hidden"
                    >
                        {/* Service Header */}
                        <div className="p-5 border-b border-glass-border bg-surface-base/30 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary">
                                    <Database className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Service</p>
                                    <p className="font-mono text-sm break-all">{service.uuid}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => copyToClipboard(service.uuid)}
                                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary transition-colors"
                                title="Copy UUID"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Characteristics List */}
                        <div className="p-5 space-y-4">
                            {service.characteristics.map((char) => (
                                <div
                                    key={char.uuid}
                                    className="p-4 rounded-xl bg-surface-base/50 border border-glass-border hover:border-brand-primary/30 transition-colors duration-300"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-brand-primary" />
                                            <span className="text-sm font-bold">Characteristic</span>
                                        </div>
                                        <button 
                                            onClick={() => copyToClipboard(char.uuid)}
                                            className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary transition-colors"
                                        >
                                            <Copy className="w-3 h-3" />
                                        </button>
                                    </div>
                                    
                                    <p className="font-mono text-xs mb-4 break-all text-text-secondary">{char.uuid}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {Object.entries(char.properties).map(([key, value]) => (
                                            value && (
                                                <span
                                                    key={key}
                                                    className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                                                >
                                                    {key}
                                                </span>
                                            )
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="p-3 rounded-lg bg-surface-elevated border border-glass-border shadow-inner">
                                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Value (Decoded)</p>
                                            <p className="font-mono text-sm break-all text-green-500 font-medium">
                                                {char.value || 'N/A'}
                                            </p>
                                        </div>

                                        {char.properties.write && char.characteristic && (
                                            <WriteControls
                                                characteristic={char.characteristic}
                                                onSend={onWrite}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ServicesList