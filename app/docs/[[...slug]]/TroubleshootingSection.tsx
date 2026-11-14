'use client';

import InstallationStep from './InstallationStep';

const DISCORD = 'https://discord.gg/jK4SRmBqYt';

function Notice({ children }: { children: React.ReactNode }) {
    return (
        <strong className="text-white">&quot;{children}&quot;</strong>
    );
}

export default function TroubleshootingSection() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">Troubleshooting</h1>
                <p className="text-white/60 mb-3">
                    Find what you see below. When something goes wrong, CoreFX usually says so
                    itself: an orange notice on screen, or a line in its menu. The quotes on
                    this page are those messages word for word, so you can match them.
                </p>
                <p className="text-white/60">
                    Still stuck? Ask on our{' '}
                    <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Discord</a>{' '}
                    and bring what <strong>Getting help</strong> at the bottom lists.
                </p>
            </div>

            <div>
                <InstallationStep title="Check these first" defaultOpen>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>
                            <strong>Shader Quality</strong> and <strong>Post FX</strong> are at
                            their highest in the game&apos;s graphics settings (on Legacy, Shader
                            Quality High or Very High, and Stereo 3D off). At lower settings the game
                            uses shaders CoreFX does not replace.
                        </li>
                        <li>
                            Only CoreFX&apos;s ReShade is installed. Remove any other ReShade or
                            ENBSeries files: <code>d3d11.dll</code>, <code>d3d12.dll</code>,{' '}
                            <code>dxgi.dll</code>, <code>dxgi.asi</code>,{' '}
                            <code>ReShade.asi</code> that did not come with CoreFX.
                        </li>
                        <li>
                            Your CoreFX is the one made for your game version. A game update can
                            change the game&apos;s shaders, and then CoreFX needs its own update.
                        </li>
                        <li>No other graphics mod, weather mod or upscaler mod is installed next to CoreFX.</li>
                        <li>Your graphics driver is up to date.</li>
                    </ol>
                </InstallationStep>

                <InstallationStep title="Page Up does nothing / no ReShade overlay">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            When the game starts, ReShade shows a short banner at the top of the
                            screen. No banner means ReShade did not load: check that its file sits
                            beside <code>GTA5.exe</code> (on FiveM, in the <code>plugins</code>{' '}
                            folder as <code>dxgi.dll</code>).
                        </li>
                        <li>
                            <strong>Legacy Singleplayer:</strong> rename <code>d3d12.dll</code> in
                            the game folder to <code>dxgi.dll</code> and start the game again.
                        </li>
                        <li>
                            Another tool may be using Page Up. The ReShade overlay&apos;s own
                            settings let you change the key.
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="The game looks like vanilla, or wrong">
                    <ul className="list-disc pl-5 space-y-3">
                        <li>
                            <Notice>CoreFX: shaders not running</Notice> — normal in the main menu
                            and on loading screens. If it stays while you play, check the graphics
                            settings in <strong>Check these first</strong>, then restart the
                            game. If those are right, a game update has most likely changed the
                            game&apos;s shaders: update CoreFX.
                        </li>
                        <li>
                            <Notice>CoreFX: its weather files are not loaded</Notice> — the
                            weathers in the game are not CoreFX&apos;s, so the sky, clouds, light
                            and colours look wrong. In singleplayer, install CoreFX again after
                            any other mod that changes the weather files. In FiveM the weathers
                            come from the server: a server without CoreFX&apos;s resource, or with
                            another weather resource, shows this.
                        </li>
                        <li>
                            <Notice>CoreFX: this weather is not CoreFX&apos;s</Notice> — CoreFX&apos;s
                            weathers are loaded, but another mod or FiveM resource replaces some
                            of them, and this is one. It may look wrong until the weather changes.
                        </li>
                        <li>
                            <Notice>CoreFX: can&apos;t read the game&apos;s camera</Notice>{' '}
                            (Legacy) — another mod changes how the game renders, most often
                            another upscaler. TAA, DLSS, FSR, XeSS, FXRT, the clouds, smoke and
                            motion blur stay off until you remove it and restart.
                        </li>
                        <li>
                            Very dark nights in some weathers: the same graphics settings fix it,
                            and in-game brightness around 40-50 % is where CoreFX is tuned.
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="The picture is blurry or soft">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Legacy:</strong> turn off the game&apos;s MSAA, TXAA and FXAA
                            and let CoreFX&apos;s Anti-Aliasing do the job. MSAA on top of TAA,
                            DLSS, FSR or XeSS makes the whole picture blurry on some PCs; CoreFX
                            shows a short notice when it sees the two together.
                        </li>
                        <li>
                            Raise the <strong>Sharpness</strong> under Anti-Aliasing, or try another
                            DLSS <strong>Preset</strong>.
                        </li>
                        <li>
                            If the game&apos;s Frame Scaling is below 1.000, the image is
                            upscaled. Texture sharpness for a new Frame Scaling only applies after
                            a restart.
                        </li>
                        <li>
                            Don&apos;t like motion blur? Image &gt; Motion Blur in the menu (on
                            Enhanced, Motion Blur Strength to 0 or the game&apos;s own setting).
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="Low frame rate, or it drops and stays down">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            Every setting in the menu shows its cost: Free, Low, Medium, High,
                            Extreme, or Saves for the ones that make the game faster. Start with the
                            High and Extreme ones: Ray Tracing (FXRT, FXPT), Volumetric Clouds and
                            Volumetric Smoke.
                        </li>
                        <li>
                            Turn on <strong>Performance Mode</strong> in the Ray Tracing tab and{' '}
                            <strong>Cloud Performance Mode</strong> in World &gt; Sky.
                        </li>
                        <li>
                            <strong>Options &gt; Video Memory</strong> shows how much video memory
                            the game is using. If it says the game is over its budget, the frame
                            rate suffers until memory is freed: lower texture settings or turn
                            features off.
                        </li>
                        <li>
                            <strong>Legacy:</strong> keep <strong>Fit Texture Budget to VRAM</strong>{' '}
                            on (the default). It stops the game&apos;s textures and CoreFX
                            together from overflowing the card, which is what makes the frame rate
                            fall and never recover. On a 4 GB card it means FiveM&apos;s Extended
                            Texture Budget slider has no effect.
                        </li>
                        <li>
                            <strong>Low Latency</strong> costs frames in this game: about a sixth
                            fewer for about a third less lag. Leave it off if frame rate matters
                            more.
                        </li>
                        <li>
                            On Legacy, DLSS, FSR or XeSS with Frame Scaling below 1.000 renders
                            smaller and usually raises the frame rate. Frame generation is best
                            from about 60 fps up.
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="DLSS, FSR or XeSS doesn't start (Legacy)">
                    <p>
                        The <strong>Running now</strong> line under Anti-Aliasing says what
                        actually drew the last frame. If the method you picked cannot run, it says
                        why and TAA takes over.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>DLSS</strong> needs an NVIDIA RTX card and a recent driver.</li>
                        <li>
                            <strong>FSR</strong> needs Windows 11 and a card that runs Direct3D 12.
                        </li>
                        <li>
                            <strong>XeSS</strong> needs the same, plus the{' '}
                            <a href="https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Microsoft Visual C++ Redistributable</a>{' '}
                            14.40 or newer (x64).
                        </li>
                        <li>
                            Keep the <code>CoreFX\Libraries</code> folder the package installs:
                            the DLSS, FSR and XeSS files live there.
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="Frame generation doesn't start (Legacy)">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            Set the game&apos;s <strong>Screen Type</strong> to{' '}
                            <strong>Windowed Borderless</strong>. Exclusive fullscreen does not
                            work with it.
                        </li>
                        <li>
                            <strong>NVIDIA DLSS</strong> frame generation needs an RTX 40 series
                            card or newer and a recent driver. AMD FSR and Intel XeSS run on any
                            recent card.
                        </li>
                        <li>
                            <strong>Intel XeSS</strong> frame generation does not run while
                            RivaTuner Statistics Server (RTSS, also part of MSI Afterburner) is
                            running: its overlay crashes the game over it. Close RTSS, or use
                            AMD FSR frame generation, which works with it.
                        </li>
                        <li>
                            It pauses while the menu is open, and it needs the ReShade that comes
                            with CoreFX (see the next item).
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="&quot;CoreFX: this is not CoreFX's ReShade&quot;">
                    <p>
                        CoreFX is running inside a ReShade it does not come with, usually one
                        installed by hand or by another mod. Parts of CoreFX need its own build:
                        its ReShade effects do not load, and on Legacy frame generation does not
                        run. Install CoreFX again, or put back the ReShade files it installs, and
                        remove the other ReShade.
                    </p>
                </InstallationStep>

                <InstallationStep title="FXRT, FXPT or a denoiser doesn't start">
                    <ul className="list-disc pl-5 space-y-3">
                        <li>
                            <Notice>CoreFX: FXRT could not start</Notice> (Legacy) — the notice
                            says why. FXRT needs hardware ray tracing (NVIDIA RTX, or Radeon RX
                            6000 and newer) and an up-to-date driver. Until then the game&apos;s
                            own lighting is used; set Ray Tracing to Vanilla to remove the notice.
                        </li>
                        <li>
                            <strong>FXPT</strong> (Enhanced) needs ray tracing turned on in the
                            game&apos;s graphics settings.
                        </li>
                        <li>
                            <strong>Ray Reconstruction</strong> needs an RTX card and DLSS
                            selected in the game&apos;s graphics settings.{' '}
                            <strong>FSR Ray Regeneration</strong> needs a Radeon RX 9000 card on
                            Windows 11. If either cannot start, NRD denoises instead until the
                            game restarts, and the menu says so.
                        </li>
                        <li>
                            <Notice>CoreFX: ray tracing is partly running on the game&apos;s own shaders</Notice>{' '}
                            (Enhanced) — FXPT is on, but your graphics card or in-game ray tracing
                            setting uses some shaders CoreFX has no version of yet. Those parts
                            run as the game&apos;s own. Set Ray Tracing to Vanilla to remove it.
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="HDR doesn't turn on, or the picture freezes">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            Turn on Windows &quot;Use HDR&quot; for the display the game is on, set{' '}
                            <strong>HDR Mode</strong> to <strong>On</strong> in the HDR tab, and{' '}
                            <strong>restart the game</strong>. The tab says whether HDR is active
                            this session.
                        </li>
                        <li>
                            <strong>Enhanced:</strong> in-game HDR must be off and DLSS on.
                        </li>
                        <li>
                            <Notice>CoreFX: DLSS Frame Generation conflicts with HDR</Notice>{' '}
                            (Enhanced) — with both on, the picture stops updating. Install
                            RenoDX&apos;s{' '}
                            <a href="https://github.com/clshortfuse/renodx/releases/download/snapshot/renodx-dlssfix.addon64" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">DLSS fix addon</a>{' '}
                            beside the game executable, or turn one of the two off.
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="FiveM">
                    <ul className="list-disc pl-5 space-y-3">
                        <li>
                            <Notice>CoreFX: the Singleplayer edition does not run in FiveM</Notice>{' '}
                            — the Legacy Singleplayer add-on is in your FiveM <code>plugins</code>{' '}
                            folder. It stays off there. Install the Legacy FiveM package instead.
                        </li>
                        <li>
                            <strong>&quot;ReShade Blocked&quot;</strong> — press{' '}
                            <strong>F8</strong> in FiveM&apos;s main menu and find the line
                            starting with{' '}
                            <code>script:reshade Blocked load of ReShade version 5 or higher</code>,
                            with an ID after it. Open <code>CitizenFX.ini</code> in your FiveM
                            Application Data folder and add, with your ID in place of{' '}
                            <code>ID:XXXXXX</code>:
                            <pre className="bg-white/5 border border-white/10 p-3 rounded mt-2 text-xs select-all whitespace-pre-wrap">
                                {`[Addons]
ReShade5=ID:XXXXXX acknowledged that ReShade 5.x has a bug that will lead to game crashes`}
                            </pre>
                        </li>
                        <li>
                            Servers with <strong>Pure Mode</strong> enforced do not allow CoreFX.
                        </li>
                        <li>
                            Old CoreFX builds put shaders in{' '}
                            <code>FiveM.app\citizen\common\shaders\win32_40_final</code>. Remove
                            them before you install this one.
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="The game crashes">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            Take out everything else first: other ReShade or ENB files, other
                            graphics or upscaler mods, ASI mods that may not be updated for your
                            game version (ScriptHookV and trainers break after game updates).
                            Then add them back one at a time.
                        </li>
                        <li>
                            Legacy with Intel XeSS frame generation: close RTSS / MSI Afterburner&apos;s
                            overlay (see <strong>Frame generation doesn&apos;t start</strong>).
                        </li>
                        <li>
                            Turn the High and Extreme features off to see whether one of them is
                            the cause, then bring them back.
                        </li>
                        <li>
                            On FiveM, keep the crash report FiveM offers to save, and send it to
                            us with the logs below.
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="Settings: reset, empty menu, damaged files">
                    <ul className="list-disc pl-5 space-y-3">
                        <li>
                            <strong>Reset all</strong> under the menu&apos;s tabs puts every
                            setting back to its default. Your settings are saved in{' '}
                            <code>CoreFX\Presets\CoreFX.ini</code>; deleting that file does the
                            same.
                        </li>
                        <li>
                            <Notice>CoreFX: settings not loaded - no UI settings</Notice> or{' '}
                            <Notice>CoreFX: the add-on&apos;s shader pack is missing or damaged.</Notice>{' '}
                            — <code>CoreFX.addon64</code> is damaged or incomplete. Install CoreFX
                            again from the package you downloaded from us.
                        </li>
                        <li>
                            <strong>Hide on-screen warnings</strong> (Options) silences the
                            notices, but it is worth fixing what they point at first.
                        </li>
                    </ul>
                </InstallationStep>

                <InstallationStep title="Getting help">
                    <p>
                        Ask on our{' '}
                        <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Discord</a>{' '}
                        and include:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            Which game (Legacy or Enhanced), which package (Singleplayer or
                            FiveM) and the CoreFX version.
                        </li>
                        <li>Your graphics card, and Windows 10 or 11.</li>
                        <li>
                            <code>ReShade.log</code> from the session that went wrong: beside{' '}
                            <code>GTA5.exe</code> in singleplayer, in the FiveM{' '}
                            <code>plugins</code> folder for FiveM. It is rewritten at every start,
                            so copy it before you launch the game again.
                        </li>
                        <li>
                            A screenshot of any orange notice, and of the menu line that mentions
                            the problem.
                        </li>
                        <li>What you already tried from this page.</li>
                    </ul>
                </InstallationStep>
            </div>
        </div>
    );
}
