// Small national flags as inline SVG. Flag emoji show as two letters on Windows, so we
// draw the few we need. Simplified for 18×12 px; the country name is the accessible label.

export type Country = 'UA' | 'US' | 'FR' | 'FI' | 'ID';

const W = 18;
const H = 12;

function Shapes({ code }: { code: Country }) {
    switch (code) {
        case 'UA':
            return (
                <>
                    <rect width={W} height={H / 2} fill="#0057b7" />
                    <rect y={H / 2} width={W} height={H / 2} fill="#ffd700" />
                </>
            );
        case 'FR':
            return (
                <>
                    <rect width={6} height={H} fill="#002395" />
                    <rect x={6} width={6} height={H} fill="#ffffff" />
                    <rect x={12} width={6} height={H} fill="#ed2939" />
                </>
            );
        case 'FI':
            return (
                <>
                    <rect width={W} height={H} fill="#ffffff" />
                    <rect x={5} width={3} height={H} fill="#002f6c" />
                    <rect y={4.5} width={W} height={3} fill="#002f6c" />
                </>
            );
        case 'ID':
            return (
                <>
                    <rect width={W} height={H / 2} fill="#ce1126" />
                    <rect y={H / 2} width={W} height={H / 2} fill="#ffffff" />
                </>
            );
        case 'US': {
            const stripe = H / 13;
            return (
                <>
                    <rect width={W} height={H} fill="#ffffff" />
                    {Array.from({ length: 7 }, (_, i) => (
                        <rect key={i} y={i * 2 * stripe} width={W} height={stripe} fill="#b22234" />
                    ))}
                    <rect width={7.6} height={stripe * 7} fill="#3c3b6e" />
                    {[1.3, 3.1, 4.9].map((y) =>
                        [1.3, 3.15, 5, 6.85].map((x) => <circle key={`${x}-${y}`} cx={x - 0.5} cy={y} r={0.38} fill="#ffffff" />)
                    )}
                </>
            );
        }
    }
}

export default function Flag({ code, label }: { code: Country; label: string }) {
    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            role="img"
            aria-label={label}
            className="inline-block shrink-0 rounded-[2px] ring-1 ring-white/15"
        >
            <title>{label}</title>
            <Shapes code={code} />
        </svg>
    );
}
