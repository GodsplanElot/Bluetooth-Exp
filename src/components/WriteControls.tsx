import { useState } from 'react'

interface Props {
    characteristic:
    BluetoothRemoteGATTCharacteristic

    onSend: (
        characteristic:
            BluetoothRemoteGATTCharacteristic,
        data: string
    ) => void
}

const WriteControls = ({
    characteristic,
    onSend,
}: Props) => {
    const [input, setInput] =
        useState('')

    return (
        <div className="mt-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) =>
                        setInput(e.target.value)
                    }
                    placeholder="Send data..."
                    className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-lg
            px-3
            py-2
            text-sm
            w-full
          "
                />

                <button
                    onClick={() =>
                        onSend(characteristic, input)
                    }
                    className="
            bg-blue-600
            hover:bg-blue-700
            px-4
            rounded-lg
            text-sm
          "
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default WriteControls