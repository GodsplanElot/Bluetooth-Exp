import { Terminal } from 'lucide-react';

interface Props {
    logs: string[]
}

const ConsoleLogs = ({ logs }: Props) => {
    return (
        <div className="premium-card overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 border-b border-glass-border flex items-center justify-between bg-surface-base/30">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-brand-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Activity Log</h2>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-brand-primary/20">
                {logs.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-text-secondary opacity-30 italic">
                        <p>No activity yet...</p>
                    </div>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} className="flex gap-3 animate-in slide-in-from-left-2 duration-300">
                            <span className="text-brand-primary opacity-50 shrink-0 select-none">›</span>
                            <span className="break-all">{log}</span>
                        </div>
                    ))
                )}
            </div>
            
            <div className="p-2 border-t border-glass-border bg-surface-base/10 text-[10px] text-text-secondary text-center font-medium">
                Showing last {logs.length} events
            </div>
        </div>
    )
}

export default ConsoleLogs