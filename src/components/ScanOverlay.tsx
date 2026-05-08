import { Bluetooth, X } from 'lucide-react';

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

const ScanOverlay = ({ isVisible, onClose }: Props) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
            <div className="premium-card max-w-md w-full p-8 relative overflow-hidden text-center animate-in fade-in zoom-in duration-300">
                {/* Background decorative element */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl"></div>
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                    <X className="w-5 h-5 text-text-secondary" />
                </button>

                <div className="relative mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center animate-pulse-soft">
                        <Bluetooth className="w-10 h-10 text-brand-primary" />
                    </div>
                    {/* Ripple effects */}
                    <div className="absolute inset-0 border-2 border-brand-primary/20 rounded-full animate-ping [animation-duration:3s]"></div>
                </div>

                <h2 className="text-2xl font-bold mb-2">Scanning for Devices</h2>
                <p className="text-text-secondary mb-6 leading-relaxed">
                    Please select your device from the browser's native Bluetooth picker. 
                    Ensure your device is in pairing mode and nearby.
                </p>

                <div className="flex items-center justify-center gap-2 text-sm font-medium text-brand-primary">
                    <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse"></span>
                    Waiting for selection...
                </div>
            </div>
        </div>
    );
};

export default ScanOverlay;
