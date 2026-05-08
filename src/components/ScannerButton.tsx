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
            className="
        bg-blue-600
        hover:bg-blue-700
        transition
        px-6
        py-3
        rounded-xl
        font-semibold
      "
        >
            {loading
                ? 'Scanning...'
                : 'Scan Bluetooth Devices'}
        </button>
    )
}

export default ScannerButton