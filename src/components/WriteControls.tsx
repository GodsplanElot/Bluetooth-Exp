import { useState } from 'react'
import { Send, Terminal as TerminalIcon } from 'lucide-react'

interface Props {
    characteristic: BluetoothRemoteGATTCharacteristic
    onSend: (characteristic: BluetoothRemoteGATTCharacteristic, data: string) => void
}

const WriteControls = ({ characteristic, onSend }: Props) => {
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (!input.trim()) return;
        onSend(characteristic, input);
        setInput('');
    };

    return (
        <div className="mt-2 space-y-2">
            <div className="flex gap-2 p-1.5 rounded-xl bg-surface-elevated border border-glass-border shadow-sm focus-within:border-brand-primary/50 transition-colors">
                <div className="flex items-center pl-2 text-text-secondary">
                    <TerminalIcon className="w-3.5 h-3.5 opacity-50" />
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Command or data..."
                    className="flex-1 bg-transparent border-none outline-none text-sm font-mono placeholder:text-text-secondary/30 placeholder:font-sans py-1 text-text-primary"
                />

                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-bold hover:bg-brand-secondary active:scale-95 disabled:opacity-30 disabled:grayscale transition-all"
                >
                    <Send className="w-3 h-3" />
                    Send
                </button>
            </div>
        </div>
    )
}

export default WriteControls