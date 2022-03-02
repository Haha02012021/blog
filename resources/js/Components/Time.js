export default function Time({ time, className }) {
    return (
        <time className={`italic opacity-50 ${className}`}>
            { time }
        </time>
    )
}