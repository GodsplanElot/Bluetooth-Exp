import { Search, Loader2 } from 'lucide-react';

interface Props {
    onClick: () => void
    loading: boolean
}

const ScannerButton = ({
    onClick,
    loading,
}: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`
                relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300
                shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30
                active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
                ${loading 
                    ? 'bg-surface-elevated text-text-primary border border-glass-border' 
                    : 'bg-brand-primary text-white hover:bg-brand-secondary'}
            `}
        >
            {loading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                </>
            ) : (
                <>
                    <Search className="w-5 h-5" />
                    <span>Scan Devices</span>
                </>
            )}
            
            {/* Pulsing ring effect when not loading */}
            {!loading && (
                <span className="absolute inset-0 rounded-2xl border-2 border-brand-primary/30 animate-ping [animation-duration:3s]"></span>
            )}
        </button>
    )
}

export default ScannerButton