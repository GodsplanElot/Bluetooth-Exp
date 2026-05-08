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
        <div
            className="
        mt-6
        border
        border-zinc-800
        rounded-xl
        p-6
        bg-zinc-900
      "
        >
            <h2 className="text-xl font-bold mb-4">
                Connected Device
            </h2>

            <div className="space-y-2">
                <p>
                    <span className="font-semibold">
                        Name:
                    </span>{' '}
                    {device.name || 'Unknown Device'}
                </p>

                <p>
                    <span className="font-semibold">
                        ID:
                    </span>{' '}
                    {device.id}
                </p>

                <p>
                    <span className="font-semibold">
                        Status:
                    </span>{' '}
                    {connected
                        ? 'Connected'
                        : 'Disconnected'}
                </p>
            </div>

            <button
                onClick={onDisconnect}
                className="
          mt-4
          bg-red-600
          hover:bg-red-700
          transition
          px-4
          py-2
          rounded-lg
        "
            >
                Disconnect
            </button>
        </div>
    )
}

export default DeviceCard