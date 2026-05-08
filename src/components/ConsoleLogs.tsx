interface Props {
    logs: string[]
}

const ConsoleLogs = ({ logs }: Props) => {
    return (
        <div
            className="
        mt-6
        border
        border-zinc-800
        rounded-xl
        p-5
        bg-black
      "
        >
            <h2 className="text-xl font-bold mb-4">
                Console Logs
            </h2>

            <div className="space-y-2 max-h-80 overflow-y-auto">
                {logs.map((log, index) => (
                    <div
                        key={index}
                        className="
              text-green-400
              font-mono
              text-sm
            "
                    >
                        {log}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ConsoleLogs