import type {
    BluetoothServiceData,
} from '../types/bluetooth.types'
import WriteControls from './WriteControls'

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
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
                Services & Characteristics
            </h2>

            <div className="space-y-4">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="
              border
              border-zinc-800
              rounded-xl
              p-5
              bg-zinc-900
            "
                    >
                        <h3 className="font-semibold text-blue-400 break-all">
                            Service UUID:
                        </h3>

                        <p className="mb-4 break-all">
                            {service.uuid}
                        </p>

                        <div className="space-y-3">
                            {service.characteristics.map(
                                (char, idx) => (
                                    <div
                                        key={idx}
                                        className="
                      bg-zinc-800
                      p-3
                      rounded-lg
                    "
                                    >
                                        <p className="break-all">
                                            <span className="font-semibold">
                                                Characteristic:
                                            </span>{' '}
                                            {char.uuid}
                                        </p>

                                        <p className="mt-2 text-sm text-green-400 break-all">
                                            <span className="font-semibold">
                                                Value:
                                            </span>{' '}
                                            {char.value || 'N/A'}
                                        </p>

                                        <p className="text-sm text-zinc-400 mt-2">
                                            Properties:
                                        </p>

                                        <div className="flex gap-2 flex-wrap mt-2">
                                            {Object.entries(
                                                char.properties
                                            ).map(
                                                ([key, value]) =>
                                                    value && (
                                                        <span
                                                            key={key}
                                                            className="
                                bg-blue-600
                                px-2
                                py-1
                                rounded-md
                                text-xs
                              "
                                                        >
                                                            {key}
                                                        </span>
                                                    )

                                            )}
                                            {char.properties.write &&
                                                char.characteristic && (
                                                    <WriteControls
                                                        characteristic={
                                                            char.characteristic
                                                        }
                                                        onSend={onWrite}
                                                    />
                                                )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ServicesList