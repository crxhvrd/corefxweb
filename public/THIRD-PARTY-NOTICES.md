# Third-Party Notices — CoreFX

CoreFX uses software written by other people. Each component below stays under its own licence; the CoreFX
licence does not override them. Where a component's licence grants you more than ours does, its terms win for
that component.

Not every component is present in every CoreFX package. The notices are kept together so that one copy travels
with every download.

---

## ReShade

Copyright © 2014 Patrick Mours. All rights reserved.
https://reshade.me — Licence: BSD 3-Clause

Shader header files from the `crosire/reshade-shaders` repository are covered by the same notice.

ReShade's own program file (`d3d12.dll` or `dxgi.dll`, as the package installs it) contains further third-party components,
and carries their licence texts itself: they are on ReShade's About tab. They are: MinHook (Tsuda Kageyu), including the
Hacker Disassembler Engine (Vyacheslav Patkov); Dear ImGui (Omar Cornut); ImGuiColorTextEdit (BalazsJako); stb_image and
stb_image_write (Sean Barrett); DDS loading from SOIL (Jonathan "lonesock" Dummer); fpng (Rich Geldreich); SPIR-V, OpenXR and
the Vulkan headers (The Khronos Group); OpenVR (Valve Corporation); Vulkan Memory Allocator (Advanced Micro Devices); glad
(David Herberth); the libjxl simple lossless encoder (the JPEG XL Project Authors); the Solarized colours (Ethan Schoonover);
and the Fork Awesome font (SIL Open Font License).

> Redistribution and use in source and binary forms, with or without modification, are permitted provided that
> the following conditions are met:
>
> 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the
>    following disclaimer.
> 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
>    following disclaimer in the documentation and/or other materials provided with the distribution.
> 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or
>    promote products derived from this software without specific prior written permission.
>
> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
> WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
> PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY
> DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
> PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
> HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
> NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
> POSSIBILITY OF SUCH DAMAGE.

## RenoDX

Copyright © 2025 Carlos Lopez Jr.
https://github.com/clshortfuse/renodx — Licence: MIT

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
> documentation files (the "Software"), to deal in the Software without restriction, including without
> limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
> Software, and to permit persons to whom the Software is furnished to do so, subject to the following
> conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions
> of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
> TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
> THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
> CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
> DEALINGS IN THE SOFTWARE.

## CodeWalker / OIV Package Installer

Copyright © dexyfex. All rights reserved.

- CodeWalker, by dexyfex: https://github.com/dexyfex/CodeWalker
- The fork the OIV Package Installer is built from, including its source: https://github.com/crxhvrd/CodeWalkerProjects
- OIV Package Installer project page: https://www.gta5-mods.com/tools/oiv-package-installer

**CodeWalker is published without a licence — all rights reserved by its author.** Nothing about it being
publicly readable places it in the public domain, and no right to use, modify or redistribute it arises
automatically.

**The OIV Package Installer is included with dexyfex's approval.** That approval covers CoreFX and this use.
It grants you nothing: the presence of the installer in a CoreFX package does not license you to extract it,
redistribute it, build on it or reuse any part of CodeWalker. For any of that, ask dexyfex.

The OIV Package Installer is free, and its source is public in the fork linked above.

## SharpDX

Copyright © 2010-2019 Alexandre Mutel.
https://github.com/sharpdx/SharpDX — Licence: MIT

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
> documentation files (the "Software"), to deal in the Software without restriction, including without
> limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
> Software, and to permit persons to whom the Software is furnished to do so, subject to the following
> conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions
> of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
> TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
> THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
> CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
> DEALINGS IN THE SOFTWARE.

## NVIDIA Real-Time Denoisers (NRD) and NVIDIA Render Interface (NRI)

NRD: Copyright © 2022 NVIDIA Corporation. All rights reserved.
https://github.com/NVIDIA-RTX/NRD — Licence: NVIDIA RTX SDKs License

NRI: Copyright © 2021 NVIDIA Corporation. All rights reserved.
https://github.com/NVIDIA-RTX/NRI — Licence: MIT

NRD 4.18.0 denoises CoreFX's ray-traced lighting through NRI 181: in GTA V Enhanced (the Denoiser setting's NRD choice, and
the RT sun shadow with any denoiser) and in GTA V Legacy (all of FXRT). Both are built into `CoreFX.addon64` in object code
form; no NVIDIA file ships on its own.

Three more libraries come in with them, also built into `CoreFX.addon64`, all under the MIT licence quoted below:

- MathLib: Copyright (c) 2021, NVIDIA CORPORATION. All rights reserved. https://github.com/NVIDIA-RTX/MathLib
- ShaderMake: Copyright (c) 2014-2023, NVIDIA CORPORATION. All rights reserved. https://github.com/NVIDIA-RTX/ShaderMake
- D3D12 Memory Allocator: Copyright (c) 2019-2026 Advanced Micro Devices, Inc. All rights reserved.
  https://github.com/GPUOpen-LibrariesAndSDKs/D3D12MemoryAllocator

This software contains source code provided by NVIDIA Corporation.

NRD is used under the NVIDIA RTX SDKs License (the LICENSE.txt in the repository above). NVIDIA keeps all rights in
NRD; using it as part of CoreFX gives you no right to use, copy or distribute it on its own. NRI is used under the
MIT licence:

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
> documentation files (the "Software"), to deal in the Software without restriction, including without
> limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
> Software, and to permit persons to whom the Software is furnished to do so, subject to the following
> conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions
> of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
> TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
> THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
> CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
> DEALINGS IN THE SOFTWARE.

## NVIDIA DLSS and Streamline

DLSS SDK: Copyright © 2018-2023 NVIDIA Corporation & affiliates. All rights reserved.
https://github.com/NVIDIA/DLSS — Licence: NVIDIA RTX SDKs License

Streamline: Copyright © 2022-2023 NVIDIA Corporation. All rights reserved.
https://github.com/NVIDIA-RTX/Streamline — Licence: MIT

The Denoiser setting's Ray Reconstruction choice runs NVIDIA DLSS Ray Reconstruction, through the NGX interface of
the DLSS SDK (310.9.1), in place of the game's own DLSS call (which reaches DLSS through Streamline). Parts of the DLSS
SDK and of Streamline's headers are built into `CoreFX.addon64` in object code form. CoreFX for GTA V Enhanced ships no NVIDIA runtime
files: `nvngx_dlssd.dll` and the game's DLSS files come from NVIDIA and from the game.

In GTA V Legacy, CoreFX's DLSS upscaling and anti-aliasing runs through the same interface, and the Legacy package ships
NVIDIA's `nvngx_dlss.dll` unmodified, in `CoreFX\Libraries\DLSS`.

This software contains source code provided by NVIDIA Corporation.

The DLSS SDK is used under the NVIDIA RTX SDKs License (the LICENSE.txt in the repository above). NVIDIA keeps all
rights in the DLSS SDK; using it as part of CoreFX gives you no right to use, copy or distribute it on its own.
NVIDIA, the NVIDIA logo and DLSS are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and
other countries. Streamline is used under the MIT licence:

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
> documentation files (the "Software"), to deal in the Software without restriction, including without
> limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
> Software, and to permit persons to whom the Software is furnished to do so, subject to the following
> conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions
> of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
> TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
> THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
> CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
> DEALINGS IN THE SOFTWARE.

## AMD FidelityFX SDK — FSR and FSR Ray Regeneration

Copyright © Advanced Micro Devices, Inc.
https://github.com/GPUOpen-LibrariesAndSDKs/FidelityFX-SDK — Licence: MIT

`amd_fidelityfx_loader_dx12.dll` and `amd_fidelityfx_denoiser_dx12.dll` are AMD's signed binaries from FSR SDK 2.3.0,
shipped unmodified. CoreFX loads them for the Denoiser setting's FSR Ray Regeneration choice.
`amd_fidelityfx_dx12.dll` is AMD's signed binary from FidelityFX SDK 1.1.4, shipped unmodified: CoreFX for GTA V Legacy
loads it for FSR.

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
> documentation files (the "Software"), to deal in the Software without restriction, including without
> limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
> Software, and to permit persons to whom the Software is furnished to do so, subject to the following
> conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions
> of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
> TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
> THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
> CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
> DEALINGS IN THE SOFTWARE.

---

## Microsoft DirectX 12 Agility SDK

Copyright © Microsoft Corporation. All rights reserved.
https://www.nuget.org/packages/Microsoft.Direct3D.D3D12 — Licence: Microsoft Software License Terms, Microsoft DirectX

`D3D12Core.dll` (`CoreFX\Libraries\FSR\D3D12`) is Microsoft's binary from Agility SDK 1.614.1, shipped unmodified. CoreFX
for GTA V Legacy loads it for FSR. Microsoft's licence terms govern it: they are not replaced or changed by CoreFX's licence.

---

## Dear ImGui

Copyright (c) 2014-2025 Omar Cornut
https://github.com/ocornut/imgui — Licence: MIT

Used by CloudBuilder. The permission notice is the MIT text quoted under AMD FidelityFX SDK above. Dear ImGui includes
stb_truetype, stb_rect_pack and stb_textedit (Sean Barrett: public domain or MIT) and the ProggyClean font (Tristan Grimmer:
MIT).

---

## JSON for Modern C++

Copyright (c) 2013-2026 Niels Lohmann
https://github.com/nlohmann/json — Licence: MIT

Used by CoreFX and CloudBuilder. The permission notice is the MIT text quoted under AMD FidelityFX SDK above.

---

## Microsoft Detours

Copyright (c) Microsoft Corporation. All rights reserved.
https://github.com/microsoft/Detours — Licence: MIT

Built into `CoreFX.addon64`, where it hooks the game's calls. The permission notice is the MIT text quoted under AMD FidelityFX
SDK above.

---

## darktable Uniform Color Space

Copyright 2022 Aurélien Pierre / darktable project
https://eng.aurelienpierre.com/2022/02/color-saturation-control-for-the-21th-century/ — Licence: MIT, with addenda

Part of the RenoDX shader library that CoreFX's shaders are built with. Its author's addenda ask that any reuse name the author,
the project and the source, as above, and that any implementation of this colour space be called "darktable Uniform Color Space"
or "darktable UCS" in the software's user interface. The permission notice is the MIT text quoted under AMD FidelityFX SDK above.

---

## frozen and gtl

frozen: Copyright 2016 QuarksLab. https://github.com/serge-sans-paille/frozen — Licence: Apache License 2.0

gtl: Copyright (c) 2019-2022, Gregory Popovitch. Portions Copyright 2018 The Abseil Authors.
https://github.com/greg7mdp/gtl — Licence: Apache License 2.0

Constant lookup tables and hash maps, built into `CoreFX.addon64`, unmodified:

>                                  Apache License
>                            Version 2.0, January 2004
>                         http://www.apache.org/licenses/
>
>    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
>
>    1. Definitions.
>
>       "License" shall mean the terms and conditions for use, reproduction,
>       and distribution as defined by Sections 1 through 9 of this document.
>
>       "Licensor" shall mean the copyright owner or entity authorized by
>       the copyright owner that is granting the License.
>
>       "Legal Entity" shall mean the union of the acting entity and all
>       other entities that control, are controlled by, or are under common
>       control with that entity. For the purposes of this definition,
>       "control" means (i) the power, direct or indirect, to cause the
>       direction or management of such entity, whether by contract or
>       otherwise, or (ii) ownership of fifty percent (50%) or more of the
>       outstanding shares, or (iii) beneficial ownership of such entity.
>
>       "You" (or "Your") shall mean an individual or Legal Entity
>       exercising permissions granted by this License.
>
>       "Source" form shall mean the preferred form for making modifications,
>       including but not limited to software source code, documentation
>       source, and configuration files.
>
>       "Object" form shall mean any form resulting from mechanical
>       transformation or translation of a Source form, including but
>       not limited to compiled object code, generated documentation,
>       and conversions to other media types.
>
>       "Work" shall mean the work of authorship, whether in Source or
>       Object form, made available under the License, as indicated by a
>       copyright notice that is included in or attached to the work
>       (an example is provided in the Appendix below).
>
>       "Derivative Works" shall mean any work, whether in Source or Object
>       form, that is based on (or derived from) the Work and for which the
>       editorial revisions, annotations, elaborations, or other modifications
>       represent, as a whole, an original work of authorship. For the purposes
>       of this License, Derivative Works shall not include works that remain
>       separable from, or merely link (or bind by name) to the interfaces of,
>       the Work and Derivative Works thereof.
>
>       "Contribution" shall mean any work of authorship, including
>       the original version of the Work and any modifications or additions
>       to that Work or Derivative Works thereof, that is intentionally
>       submitted to Licensor for inclusion in the Work by the copyright owner
>       or by an individual or Legal Entity authorized to submit on behalf of
>       the copyright owner. For the purposes of this definition, "submitted"
>       means any form of electronic, verbal, or written communication sent
>       to the Licensor or its representatives, including but not limited to
>       communication on electronic mailing lists, source code control systems,
>       and issue tracking systems that are managed by, or on behalf of, the
>       Licensor for the purpose of discussing and improving the Work, but
>       excluding communication that is conspicuously marked or otherwise
>       designated in writing by the copyright owner as "Not a Contribution."
>
>       "Contributor" shall mean Licensor and any individual or Legal Entity
>       on behalf of whom a Contribution has been received by Licensor and
>       subsequently incorporated within the Work.
>
>    2. Grant of Copyright License. Subject to the terms and conditions of
>       this License, each Contributor hereby grants to You a perpetual,
>       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
>       copyright license to reproduce, prepare Derivative Works of,
>       publicly display, publicly perform, sublicense, and distribute the
>       Work and such Derivative Works in Source or Object form.
>
>    3. Grant of Patent License. Subject to the terms and conditions of
>       this License, each Contributor hereby grants to You a perpetual,
>       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
>       (except as stated in this section) patent license to make, have made,
>       use, offer to sell, sell, import, and otherwise transfer the Work,
>       where such license applies only to those patent claims licensable
>       by such Contributor that are necessarily infringed by their
>       Contribution(s) alone or by combination of their Contribution(s)
>       with the Work to which such Contribution(s) was submitted. If You
>       institute patent litigation against any entity (including a
>       cross-claim or counterclaim in a lawsuit) alleging that the Work
>       or a Contribution incorporated within the Work constitutes direct
>       or contributory patent infringement, then any patent licenses
>       granted to You under this License for that Work shall terminate
>       as of the date such litigation is filed.
>
>    4. Redistribution. You may reproduce and distribute copies of the
>       Work or Derivative Works thereof in any medium, with or without
>       modifications, and in Source or Object form, provided that You
>       meet the following conditions:
>
>       (a) You must give any other recipients of the Work or
>           Derivative Works a copy of this License; and
>
>       (b) You must cause any modified files to carry prominent notices
>           stating that You changed the files; and
>
>       (c) You must retain, in the Source form of any Derivative Works
>           that You distribute, all copyright, patent, trademark, and
>           attribution notices from the Source form of the Work,
>           excluding those notices that do not pertain to any part of
>           the Derivative Works; and
>
>       (d) If the Work includes a "NOTICE" text file as part of its
>           distribution, then any Derivative Works that You distribute must
>           include a readable copy of the attribution notices contained
>           within such NOTICE file, excluding those notices that do not
>           pertain to any part of the Derivative Works, in at least one
>           of the following places: within a NOTICE text file distributed
>           as part of the Derivative Works; within the Source form or
>           documentation, if provided along with the Derivative Works; or,
>           within a display generated by the Derivative Works, if and
>           wherever such third-party notices normally appear. The contents
>           of the NOTICE file are for informational purposes only and
>           do not modify the License. You may add Your own attribution
>           notices within Derivative Works that You distribute, alongside
>           or as an addendum to the NOTICE text from the Work, provided
>           that such additional attribution notices cannot be construed
>           as modifying the License.
>
>       You may add Your own copyright statement to Your modifications and
>       may provide additional or different license terms and conditions
>       for use, reproduction, or distribution of Your modifications, or
>       for any such Derivative Works as a whole, provided Your use,
>       reproduction, and distribution of the Work otherwise complies with
>       the conditions stated in this License.
>
>    5. Submission of Contributions. Unless You explicitly state otherwise,
>       any Contribution intentionally submitted for inclusion in the Work
>       by You to the Licensor shall be under the terms and conditions of
>       this License, without any additional terms or conditions.
>       Notwithstanding the above, nothing herein shall supersede or modify
>       the terms of any separate license agreement you may have executed
>       with Licensor regarding such Contributions.
>
>    6. Trademarks. This License does not grant permission to use the trade
>       names, trademarks, service marks, or product names of the Licensor,
>       except as required for reasonable and customary use in describing the
>       origin of the Work and reproducing the content of the NOTICE file.
>
>    7. Disclaimer of Warranty. Unless required by applicable law or
>       agreed to in writing, Licensor provides the Work (and each
>       Contributor provides its Contributions) on an "AS IS" BASIS,
>       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
>       implied, including, without limitation, any warranties or conditions
>       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
>       PARTICULAR PURPOSE. You are solely responsible for determining the
>       appropriateness of using or redistributing the Work and assume any
>       risks associated with Your exercise of permissions under this License.
>
>    8. Limitation of Liability. In no event and under no legal theory,
>       whether in tort (including negligence), contract, or otherwise,
>       unless required by applicable law (such as deliberate and grossly
>       negligent acts) or agreed to in writing, shall any Contributor be
>       liable to You for damages, including any direct, indirect, special,
>       incidental, or consequential damages of any character arising as a
>       result of this License or out of the use or inability to use the
>       Work (including but not limited to damages for loss of goodwill,
>       work stoppage, computer failure or malfunction, or any and all
>       other commercial damages or losses), even if such Contributor
>       has been advised of the possibility of such damages.
>
>    9. Accepting Warranty or Additional Liability. While redistributing
>       the Work or Derivative Works thereof, You may choose to offer,
>       and charge a fee for, acceptance of support, warranty, indemnity,
>       or other liability obligations and/or rights consistent with this
>       License. However, in accepting such obligations, You may act only
>       on Your own behalf and on Your sole responsibility, not on behalf
>       of any other Contributor, and only if You agree to indemnify,
>       defend, and hold each Contributor harmless for any liability
>       incurred by, or claims asserted against, such Contributor by reason
>       of your accepting any such warranty or additional liability.
>
>    END OF TERMS AND CONDITIONS
>
>    APPENDIX: How to apply the Apache License to your work.
>
>       To apply the Apache License to your work, attach the following
>       boilerplate notice, with the fields enclosed by brackets "[]"
>       replaced with your own identifying information. (Don't include
>       the brackets!)  The text should be enclosed in the appropriate
>       comment syntax for the file format. We also recommend that a
>       file or class name and description of purpose be included on the
>       same "printed page" as the copyright notice for easier
>       identification within third-party archives.
>
>    Copyright 2017 Quarkslab
>
>    Licensed under the Apache License, Version 2.0 (the "License");
>    you may not use this file except in compliance with the License.
>    You may obtain a copy of the License at
>
>        http://www.apache.org/licenses/LICENSE-2.0
>
>    Unless required by applicable law or agreed to in writing, software
>    distributed under the License is distributed on an "AS IS" BASIS,
>    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
>    See the License for the specific language governing permissions and
>    limitations under the License.

---

## CoreFX shaders

The shaders in CoreFX are its own work. This includes our encrypted ReShade shaders, which ship in a packed
format — they are CoreFX shaders, not third-party shaders under another name.

Where a CoreFX shader implements a rendering technique described in a published paper, talk or article, it is
an implementation of that technique, not a copy of anyone's code. Techniques are described publicly to be
used; copyright covers the code that expresses them, and that code here is ours. No third-party shader code is
redistributed in CoreFX, so no notice is owed for any of it.

---

*Questions about anything in this file: crxhvrd@proton.me*
