// Fine moving grain over the page background. It sits behind the content
// (the sections paint above it), so screenshots and videos are never touched.
const NOISE =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function FilmGrain() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="film-grain absolute -inset-[120px] opacity-[0.07]" style={{ backgroundImage: NOISE }} />
            {/* a soft vignette: the page is a touch lighter toward its middle */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.025),transparent_70%)]" />
        </div>
    );
}
