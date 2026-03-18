// === Chapter 9: The Mandelbrot Set ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    // --- Color palette for Mandelbrot rendering ---
    function mandelbrotColor(iter, maxIter) {
        if (iter >= maxIter) return [0, 0, 0]; // black for interior
        // Smooth coloring using normalized iteration count
        var t = iter / maxIter;
        // Three-phase palette: deep blue -> cyan -> gold -> magenta -> deep blue
        var r, g, b;
        if (t < 0.16) {
            var s = t / 0.16;
            r = Math.floor(9 * (1 - s) * s * s * s * 255);
            g = Math.floor(15 * (1 - s) * (1 - s) * s * s * 255);
            b = Math.floor(8.5 * (1 - s) * (1 - s) * (1 - s) * s * 255 + 50 * s);
        } else if (t < 0.42) {
            var s = (t - 0.16) / 0.26;
            r = Math.floor(20 + 100 * s);
            g = Math.floor(50 + 180 * s);
            b = Math.floor(180 + 75 * s);
        } else if (t < 0.6425) {
            var s = (t - 0.42) / 0.2225;
            r = Math.floor(120 + 135 * s);
            g = Math.floor(230 - 40 * s);
            b = Math.floor(255 - 155 * s);
        } else if (t < 0.8575) {
            var s = (t - 0.6425) / 0.215;
            r = Math.floor(255 - 55 * s);
            g = Math.floor(190 - 120 * s);
            b = Math.floor(100 + 80 * s);
        } else {
            var s = (t - 0.8575) / 0.1425;
            r = Math.floor(200 - 180 * s);
            g = Math.floor(70 - 60 * s);
            b = Math.floor(180 - 160 * s);
        }
        return [
            Math.max(0, Math.min(255, r)),
            Math.max(0, Math.min(255, g)),
            Math.max(0, Math.min(255, b))
        ];
    }

    // Smooth HSL palette (alternative, used for Julia)
    function hslPalette(iter, maxIter) {
        if (iter >= maxIter) return [0, 0, 0];
        var hue = (iter / maxIter * 360 + 220) % 360;
        var sat = 85;
        var lit = 10 + 45 * (iter / maxIter);
        // Convert HSL to RGB
        var c = (1 - Math.abs(2 * lit / 100 - 1)) * sat / 100;
        var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
        var m = lit / 100 - c / 2;
        var rp, gp, bp;
        if (hue < 60) { rp = c; gp = x; bp = 0; }
        else if (hue < 120) { rp = x; gp = c; bp = 0; }
        else if (hue < 180) { rp = 0; gp = c; bp = x; }
        else if (hue < 240) { rp = 0; gp = x; bp = c; }
        else if (hue < 300) { rp = x; gp = 0; bp = c; }
        else { rp = c; gp = 0; bp = x; }
        return [
            Math.floor((rp + m) * 255),
            Math.floor((gp + m) * 255),
            Math.floor((bp + m) * 255)
        ];
    }

    function renderMandelbrot(canvas, centerX, centerY, zoom, maxIter) {
        var dpr = window.devicePixelRatio || 1;
        var w = canvas.width;   // already dpr-scaled
        var h = canvas.height;
        var ctx = canvas.getContext('2d');
        var imgData = ctx.getImageData(0, 0, w, h);
        var data = imgData.data;
        var displayW = w / dpr;
        var displayH = h / dpr;

        for (var py = 0; py < h; py++) {
            for (var px = 0; px < w; px++) {
                var x0 = centerX + (px / dpr - displayW / 2) / zoom;
                var y0 = centerY - (py / dpr - displayH / 2) / zoom;
                var x = 0, y = 0;
                var iter = 0;
                while (x * x + y * y <= 4 && iter < maxIter) {
                    var xTemp = x * x - y * y + x0;
                    y = 2 * x * y + y0;
                    x = xTemp;
                    iter++;
                }
                // Smooth coloring
                var smoothIter = iter;
                if (iter < maxIter) {
                    var log2 = Math.log(2);
                    var logZn = Math.log(x * x + y * y) / 2;
                    smoothIter = iter + 1 - Math.log(logZn / log2) / log2;
                }
                var rgb = mandelbrotColor(smoothIter, maxIter);
                var idx = (py * w + px) * 4;
                data[idx] = rgb[0];
                data[idx + 1] = rgb[1];
                data[idx + 2] = rgb[2];
                data[idx + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);
    }

    function renderJulia(canvas, cReal, cImag, zoom, maxIter) {
        var dpr = window.devicePixelRatio || 1;
        var w = canvas.width;
        var h = canvas.height;
        var ctx = canvas.getContext('2d');
        var imgData = ctx.getImageData(0, 0, w, h);
        var data = imgData.data;
        var displayW = w / dpr;
        var displayH = h / dpr;

        for (var py = 0; py < h; py++) {
            for (var px = 0; px < w; px++) {
                var x = (px / dpr - displayW / 2) / zoom;
                var y = -(py / dpr - displayH / 2) / zoom;
                var iter = 0;
                while (x * x + y * y <= 4 && iter < maxIter) {
                    var xTemp = x * x - y * y + cReal;
                    y = 2 * x * y + cImag;
                    x = xTemp;
                    iter++;
                }
                var smoothIter = iter;
                if (iter < maxIter) {
                    var log2 = Math.log(2);
                    var logZn = Math.log(x * x + y * y) / 2;
                    smoothIter = iter + 1 - Math.log(logZn / log2) / log2;
                }
                var rgb = hslPalette(smoothIter, maxIter);
                var idx = (py * w + px) * 4;
                data[idx] = rgb[0];
                data[idx + 1] = rgb[1];
                data[idx + 2] = rgb[2];
                data[idx + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);
    }

    window.CHAPTERS.push({
        id: 'ch09',
        number: 9,
        title: 'The Mandelbrot Set',
        subtitle: 'Infinite complexity from the simplest formula',
        sections: [
            // ===== Section 1: The simplest formula with the most complex output =====
            {
                id: 'simplest-formula',
                title: 'The Simplest Formula, the Most Complex Output',
                content: '\
<h2>The Simplest Formula, the Most Complex Output</h2>\
<p>Imagine someone told you that one of the most stunningly complex images ever created by mathematics comes from a formula you could write on the back of a napkin. You would probably be skeptical. After all, simple rules produce simple results, right?</p>\
<p>Wrong. Spectacularly, beautifully wrong.</p>\
<p>In 1980, a mathematician named <strong>Benoit Mandelbrot</strong> sat in front of a computer at IBM\'s research center and typed in a formula so short it barely fills a line:</p>\
<div class="env-block definition">\
<div class="env-title">The Mandelbrot Iteration</div>\
\\[ z_{n+1} = z_n^2 + c \\]\
<p>Start with \\(z_0 = 0\\). Pick a number \\(c\\). Square \\(z\\), add \\(c\\), and repeat. That is it.</p>\
</div>\
<p>What appeared on his screen was unlike anything anyone had seen before: a squat, warty shape, vaguely resembling a beetle, covered in spiraling tendrils and surrounded by an infinite sea of swirling detail. When he zoomed in on the boundary, he found more copies of the original shape, smaller and twisted, nested inside decorations that seemed to go on forever. No matter how far he zoomed, new detail kept appearing, never repeating exactly, yet always echoing the whole.</p>\
<p>The Mandelbrot set is widely regarded as <strong>the most complex object in mathematics</strong>. Yet it is generated by the simplest possible feedback loop: take a number, square it, add a constant, feed the result back in. The tension between that trivial rule and the infinite richness of its output is what makes this object so profound.</p>\
\
<div class="env-block intuition">\
<div class="env-title">Intuition: feedback amplifies</div>\
<p>Think of a microphone pointed at a speaker. The original sound is simple, but the feedback loop (sound enters mic, gets amplified, comes out speaker, re-enters mic) creates howling complexity. The Mandelbrot formula works the same way: squaring and adding is the mathematical equivalent of that feedback loop.</p>\
</div>\
\
<p>Before Mandelbrot, most mathematicians would have dismissed this iteration as too simple to be interesting. But the computer revealed what pencil-and-paper could never show: that simplicity, iterated, becomes infinity. This is the founding insight of fractal geometry, and it changed how we think about complexity in nature, art, and science.</p>\
\
<p>What makes this story even more remarkable is that the underlying mathematics was partly known decades earlier. In the 1910s and 1920s, French mathematicians Pierre Fatou and Gaston Julia studied iterations of complex functions and proved deep theorems about their behavior. But without computers, they could only imagine what these sets looked like. Julia, who lost his nose in World War I and wore a leather strap across his face for the rest of his life, wrote an extraordinary memoir about iterated functions in 1918. Yet the visual beauty of his work remained invisible for sixty years, until Mandelbrot\'s computer made it concrete.</p>\
\
<p>In this chapter, we will build up to the Mandelbrot set step by step. We will learn what "escape" means, why some numbers stay bounded forever while others fly off to infinity, and how coloring the speed of escape produces those psychedelic images you have seen online. Along the way, we will meet the Mandelbrot set\'s cousins, the Julia sets, and discover a breathtaking connection between them.</p>\
\
<div class="viz-placeholder" data-viz="mandelbrot-first-look"></div>\
<p>The image above is the Mandelbrot set, rendered pixel by pixel. Black pixels are <em>inside</em> the set. Colored pixels are <em>outside</em>, and the color tells you how quickly they escape to infinity. Click anywhere to zoom in and explore the infinite boundary.</p>',

                visualizations: [
                    {
                        id: 'mandelbrot-first-look',
                        title: 'The Mandelbrot Set: Click to Zoom',
                        description: 'Click anywhere to zoom in (2x). Right-click or shift-click to zoom out. The black region is the Mandelbrot set itself.',
                        setup: function (body, controls) {
                            var dpr = window.devicePixelRatio || 1;
                            var dispW = Math.min(body.clientWidth || 560, 700);
                            var dispH = Math.round(dispW * 0.7);
                            var canvas = document.createElement('canvas');
                            canvas.width = dispW * dpr;
                            canvas.height = dispH * dpr;
                            canvas.style.width = dispW + 'px';
                            canvas.style.height = dispH + 'px';
                            canvas.style.cursor = 'crosshair';
                            canvas.style.borderRadius = '6px';
                            body.appendChild(canvas);

                            var state = { cx: -0.5, cy: 0, zoom: dispW / 3.5, maxIter: 200 };

                            function draw() {
                                renderMandelbrot(canvas, state.cx, state.cy, state.zoom, state.maxIter);
                            }
                            draw();

                            var info = document.createElement('div');
                            info.style.cssText = 'font-size:0.75rem;color:#8b949e;margin-top:6px;';
                            info.textContent = 'Center: (' + state.cx.toFixed(4) + ', ' + state.cy.toFixed(4) + ') | Zoom: ' + state.zoom.toFixed(0) + 'x';
                            body.appendChild(info);

                            canvas.addEventListener('click', function (e) {
                                var rect = canvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                var factor = e.shiftKey ? 0.5 : 2;
                                state.cx += (mx - dispW / 2) / state.zoom;
                                state.cy -= (my - dispH / 2) / state.zoom;
                                state.zoom *= factor;
                                state.maxIter = Math.min(1000, Math.floor(200 + 80 * Math.log2(state.zoom / (dispW / 3.5))));
                                draw();
                                info.textContent = 'Center: (' + state.cx.toFixed(6) + ', ' + state.cy.toFixed(6) + ') | Zoom: ' + state.zoom.toFixed(0) + 'x';
                            });

                            canvas.addEventListener('contextmenu', function (e) {
                                e.preventDefault();
                                var rect = canvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                state.cx += (mx - dispW / 2) / state.zoom;
                                state.cy -= (my - dispH / 2) / state.zoom;
                                state.zoom *= 0.5;
                                state.maxIter = Math.max(200, Math.floor(200 + 80 * Math.log2(state.zoom / (dispW / 3.5))));
                                draw();
                                info.textContent = 'Center: (' + state.cx.toFixed(6) + ', ' + state.cy.toFixed(6) + ') | Zoom: ' + state.zoom.toFixed(0) + 'x';
                            });

                            VizEngine.createButton(controls, 'Reset View', function () {
                                state.cx = -0.5; state.cy = 0; state.zoom = dispW / 3.5; state.maxIter = 200;
                                draw();
                                info.textContent = 'Center: (' + state.cx.toFixed(4) + ', ' + state.cy.toFixed(4) + ') | Zoom: ' + state.zoom.toFixed(0) + 'x';
                            });

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Take \\(c = 1\\) and start with \\(z_0 = 0\\). Compute the first five values of the sequence \\(z_0, z_1, z_2, z_3, z_4\\). Does it seem to escape to infinity?',
                        hint: 'Remember: \\(z_{n+1} = z_n^2 + c\\). So \\(z_1 = 0^2 + 1 = 1\\), \\(z_2 = 1^2 + 1 = 2\\), and so on.',
                        solution: '\\(z_0 = 0,\\; z_1 = 1,\\; z_2 = 2,\\; z_3 = 5,\\; z_4 = 26\\). The numbers are growing explosively, so \\(c=1\\) is <strong>not</strong> in the Mandelbrot set. It escapes.'
                    },
                    {
                        question: 'Now try \\(c = -1\\). Compute the first six values. Does this sequence escape?',
                        hint: '\\(z_1 = 0^2 + (-1) = -1\\). Then \\(z_2 = (-1)^2 + (-1) = 0\\). Do you see a pattern?',
                        solution: '\\(z_0=0,\\; z_1=-1,\\; z_2=0,\\; z_3=-1,\\; z_4=0,\\; z_5=-1\\). The sequence bounces between 0 and \\(-1\\) forever. It never escapes, so \\(c=-1\\) <strong>is</strong> in the Mandelbrot set.'
                    },
                    {
                        question: 'Why do you think the Mandelbrot set was not discovered until 1980, even though the formula is so simple?',
                        hint: 'Think about how many pixels are in the image and how many iterations each pixel requires.',
                        solution: 'For a 500 &times; 400 image with 200 iterations per pixel, you need 40 million multiplications. Before fast computers, this was impractical. The mathematics was known (Fatou and Julia, 1918), but seeing the set required computational power that only became available in the late 1970s.'
                    }
                ]
            },

            // ===== Section 2: Iterating z^2 + c =====
            {
                id: 'iterating-z2c',
                title: 'Iterating z&sup2; + c',
                content: '\
<h2>Iterating \\(z^2 + c\\)</h2>\
<p>To understand the Mandelbrot set, we need to get comfortable with the idea of <strong>iteration</strong>: taking the output of a process and feeding it back as the input, over and over again.</p>\
\
<div class="env-block example">\
<div class="env-title">Example: a savings account</div>\
<p>Suppose you have $100 in a bank that pays 5% interest each year. Each year, your balance becomes 1.05 times the previous balance: \\(b_{n+1} = 1.05 \\cdot b_n\\). After many years, your money grows without bound. This is an iteration that <strong>escapes</strong> to infinity.</p>\
</div>\
\
<p>The Mandelbrot iteration works the same way, but with a twist: the numbers involved are <strong>complex numbers</strong>. A complex number \\(c = a + bi\\) lives on a 2D plane rather than on a 1D number line. The real part \\(a\\) goes along the horizontal axis, and the imaginary part \\(b\\) goes along the vertical axis. Squaring a complex number does something beautiful: it <em>squares the distance from the origin</em> and <em>doubles the angle</em>.</p>\
\
<div class="env-block definition">\
<div class="env-title">Complex Number Squaring</div>\
<p>If \\(z = r e^{i\\theta}\\) (a point at distance \\(r\\) from the origin, at angle \\(\\theta\\)), then:</p>\
\\[ z^2 = r^2 e^{i \\cdot 2\\theta} \\]\
<p>The distance squares, and the angle doubles. Then we add \\(c\\), which shifts the result.</p>\
</div>\
\
<p>So the Mandelbrot iteration has a rhythm: <strong>stretch and twist, then shift</strong>. Stretch and twist, then shift. Over and over. Whether the point spirals outward to infinity or stays trapped in a bounded region depends on the delicate balance between the stretching (from squaring) and the shifting (from adding \\(c\\)).</p>\
\
<p>Here is the key question that defines the Mandelbrot set:</p>\
\
<div class="env-block theorem">\
<div class="env-title">The Mandelbrot Set</div>\
<p>The Mandelbrot set \\(\\mathcal{M}\\) is the set of all complex numbers \\(c\\) for which the iteration \\(z_{n+1} = z_n^2 + c\\), starting from \\(z_0 = 0\\), <strong>does not escape to infinity</strong>.</p>\
</div>\
\
<p>"Escape" has a precise meaning: if \\(|z_n| &gt; 2\\) at any step, the sequence is guaranteed to escape to infinity. This is because once \\(|z|\\) exceeds 2, squaring makes it grow faster than adding \\(c\\) can pull it back. The number 2 is the <strong>escape radius</strong>.</p>\
\
<p>So the algorithm is beautifully simple: for each point \\(c\\) in the complex plane, iterate \\(z \\to z^2 + c\\) starting from zero. If \\(|z|\\) stays below 2 after many iterations (say, 200), color the pixel black (it is probably in the set). If \\(|z|\\) exceeds 2 at step \\(n\\), color the pixel based on \\(n\\), the <strong>escape time</strong>. Points that escape quickly get one color; points that take many iterations to escape get another. This escape-time coloring is what produces those stunning rainbow images.</p>\
\
<div class="viz-placeholder" data-viz="orbit-tracer"></div>\
\
<p>The visualization above lets you pick a value of \\(c\\) and watch the orbit of \\(z_n\\) unfold in real time. Try clicking inside the big black region (the set) and see how the orbit stays bounded. Then click just outside it and watch the orbit spiral away. The boundary, where orbits "almost" escape, is where all the visual magic happens.</p>\
\
<div class="env-block remark">\
<div class="env-title">Why start at zero?</div>\
<p>The choice \\(z_0 = 0\\) is not arbitrary. Zero is the critical point of \\(f(z) = z^2 + c\\) (the point where the derivative vanishes). Deep results in complex dynamics show that the behavior of the critical orbit determines the entire dynamics of \\(f\\). If the critical orbit stays bounded, the Julia set of \\(f\\) is connected. If it escapes, the Julia set shatters into disconnected dust. This is why the Mandelbrot set is sometimes called the "index" of Julia sets.</p>\
</div>',

                visualizations: [
                    {
                        id: 'orbit-tracer',
                        title: 'Orbit Tracer: Watch \\(z_n\\) Evolve',
                        description: 'Click on the complex plane to choose c. The blue dots show the orbit z_0, z_1, z_2, ... The red circle is the escape boundary |z| = 2.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 100, originX: undefined, originY: undefined });
                            viz.originX = viz.width * 0.55;
                            viz.originY = viz.height * 0.5;

                            var cReal = -0.7, cImag = 0.27;
                            var maxIter = 80;
                            var orbitPoints = [];

                            function computeOrbit(cr, ci) {
                                var pts = [{ x: 0, y: 0 }];
                                var zx = 0, zy = 0;
                                for (var i = 0; i < maxIter; i++) {
                                    var nx = zx * zx - zy * zy + cr;
                                    var ny = 2 * zx * zy + ci;
                                    zx = nx; zy = ny;
                                    pts.push({ x: zx, y: zy });
                                    if (zx * zx + zy * zy > 100) break;
                                }
                                return pts;
                            }

                            function draw() {
                                viz.clear();
                                viz.drawGrid(0.5);
                                viz.drawAxes();
                                // Escape circle
                                viz.drawCircle(0, 0, 2, null, viz.colors.red + '55', 1);
                                // Compute orbit
                                orbitPoints = computeOrbit(cReal, cImag);
                                // Draw orbit lines
                                var ctx = viz.ctx;
                                for (var i = 0; i < orbitPoints.length - 1; i++) {
                                    var alpha = Math.max(0.15, 1 - i / orbitPoints.length);
                                    viz.drawSegment(orbitPoints[i].x, orbitPoints[i].y, orbitPoints[i + 1].x, orbitPoints[i + 1].y, 'rgba(88,166,255,' + alpha + ')', 1.5);
                                }
                                // Draw orbit points
                                for (var i = 0; i < orbitPoints.length; i++) {
                                    var sz = i === 0 ? 6 : 4;
                                    var col = i === 0 ? viz.colors.green : viz.colors.blue;
                                    viz.drawPoint(orbitPoints[i].x, orbitPoints[i].y, col, '', sz);
                                }
                                // Draw c marker
                                viz.drawPoint(cReal, cImag, viz.colors.orange, 'c', 7);
                                // Info text
                                var escaped = orbitPoints.length <= maxIter;
                                var label = 'c = ' + cReal.toFixed(3) + ' + ' + cImag.toFixed(3) + 'i';
                                if (orbitPoints.length > maxIter) label += '  (bounded)';
                                else label += '  (escapes at step ' + (orbitPoints.length - 1) + ')';
                                viz.screenText(label, 10, 18, viz.colors.white, 13, 'left', 'top');
                            }

                            draw();

                            viz.canvas.addEventListener('click', function (e) {
                                var rect = viz.canvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                var pt = viz.toMath(mx, my);
                                cReal = pt[0];
                                cImag = pt[1];
                                draw();
                            });

                            VizEngine.createButton(controls, 'c = -0.7+0.27i', function () {
                                cReal = -0.7; cImag = 0.27; draw();
                            });
                            VizEngine.createButton(controls, 'c = 0.25', function () {
                                cReal = 0.25; cImag = 0; draw();
                            });
                            VizEngine.createButton(controls, 'c = -1.25', function () {
                                cReal = -1.25; cImag = 0; draw();
                            });

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Try \\(c = i\\) (that is, \\(c = 0 + 1i\\)). Starting from \\(z_0 = 0\\), compute \\(z_1, z_2, z_3, z_4\\). Does the orbit stay bounded?',
                        hint: 'Remember \\(i^2 = -1\\). So \\(z_1 = 0^2 + i = i\\), \\(z_2 = i^2 + i = -1 + i\\), ...',
                        solution: '\\(z_0 = 0\\), \\(z_1 = i\\), \\(z_2 = -1+i\\), \\(z_3 = -i\\), \\(z_4 = -1+i\\). The orbit cycles between \\(-1+i\\) and \\(-i\\), so it stays bounded. The point \\(c = i\\) is in the Mandelbrot set.'
                    },
                    {
                        question: 'Explain intuitively why \\(|z| &gt; 2\\) guarantees escape. Think about what happens when you square a number whose absolute value exceeds 2 and add a number whose absolute value is at most 2.',
                        hint: 'When \\(|z| &gt; 2\\), we have \\(|z|^2 &gt; 2|z|\\). Since \\(c\\) is in the Mandelbrot set only if the orbit starting from 0 does not escape, all Mandelbrot points satisfy \\(|c| \\leq 2\\).',
                        solution: 'When \\(|z| &gt; 2\\), squaring gives \\(|z^2| = |z|^2 &gt; 2|z|\\). After subtracting the maximum possible pull-back from adding \\(c\\) (which satisfies \\(|c| \\leq 2\\)), we get \\(|z^2+c| \\geq |z|^2 - |c| &gt; 2|z| - 2 &gt; |z|\\). So once \\(|z|\\) exceeds 2, it keeps growing and the orbit escapes.'
                    }
                ]
            },

            // ===== Section 3: The Mandelbrot set revealed =====
            {
                id: 'mandelbrot-revealed',
                title: 'The Mandelbrot Set Revealed',
                content: '\
<h2>The Mandelbrot Set Revealed</h2>\
<p>Let us now stand back and look at what the Mandelbrot set actually looks like, and understand the geography of this astonishing object.</p>\
\
<p>The main body of the Mandelbrot set consists of a large <strong>cardioid</strong> (a heart-shaped region) and a prominent circular <strong>bulb</strong> attached to its left. The cardioid corresponds to values of \\(c\\) where the iteration has a single <em>attracting fixed point</em>: the orbit settles down to one number and stays there. The big bulb to the left corresponds to a <em>period-2 cycle</em>: the orbit bounces between two values forever.</p>\
\
<p>Look more carefully and you will see smaller bulbs budding off the main cardioid. Each bulb corresponds to an orbit with a specific period. The largest secondary bulb (at the top) is period 3, the next is period 4, then 5, and so on. There is a bulb for <em>every</em> period, arranged in a precise order governed by something called the <strong>Farey sequence</strong> from number theory. Mathematics has an uncanny way of connecting seemingly unrelated topics.</p>\
\
<div class="env-block intuition">\
<div class="env-title">Intuition: the Mandelbrot set as a catalog</div>\
<p>Think of the Mandelbrot set as a <strong>catalog of dynamical behaviors</strong>. Each point in the set represents a value of \\(c\\) that produces a specific kind of orbit. The cardioid is the "chapter" on fixed points. Each bulb is a "chapter" on periodic orbits of various periods. The filaments connecting them are the "transitions" between different behaviors. The boundary is where all these behaviors jostle against each other, which is why it is so complex.</p>\
</div>\
\
<p>The boundary of the Mandelbrot set is where the real action is. Points just outside the boundary are the ones that take the longest to escape, and they produce the most colorful and intricate patterns. Mathematician Adrien Douady and John Hubbard proved in 1982 that the Mandelbrot set is <strong>connected</strong>: it is one single piece, no matter how thin the filaments between bulbs appear. This was a shock, because on a computer screen those filaments look impossibly thin, as if they could not possibly hold the set together.</p>\
\
<p>Even more astonishingly, it is still an <strong>open problem</strong> whether the Mandelbrot set is <em>locally connected</em> (a technical condition that, if true, would give us a complete topological description of the set). This is one of the great unsolved problems in complex dynamics, and it shows how a simple formula can lead to questions that stump the best mathematicians alive.</p>\
\
<div class="viz-placeholder" data-viz="mandelbrot-anatomy"></div>\
\
<p>The visualization above renders the Mandelbrot set with higher resolution. Hover over different regions to see labels for the cardioid, period-2 bulb, and other features. The antenna-like filament stretching to the left at \\(c = -2\\) is the "tip" of the set, where the dynamics become chaotic.</p>\
\
<div class="env-block remark">\
<div class="env-title">The area of the Mandelbrot set</div>\
<p>Nobody knows the exact area of the Mandelbrot set. Numerical estimates put it at roughly 1.5065 square units, but computing this precisely is extremely difficult because the boundary is infinitely complex. Efforts to compute the area more accurately continue to this day, with the latest results using billions of terms in a series expansion.</p>\
</div>\
\
<p>Here is something that will deepen your sense of wonder: every tiny bulb you see along the boundary is a <strong>miniature copy</strong> of the full Mandelbrot set. These "mini-Mandelbrots" appear at every scale, connected by intricate spiral filaments. Each one has its own cardioid, its own period-2 bulb, its own collection of smaller bulbs, and its own boundary full of miniature copies. This self-similarity is not exact (the decorations around each copy differ), but the fundamental shape repeats, making the Mandelbrot set a kind of fractal.</p>',

                visualizations: [
                    {
                        id: 'mandelbrot-anatomy',
                        title: 'Anatomy of the Mandelbrot Set',
                        description: 'A higher-iteration rendering. Click to zoom in on any region.',
                        setup: function (body, controls) {
                            var dpr = window.devicePixelRatio || 1;
                            var dispW = Math.min(body.clientWidth || 560, 700);
                            var dispH = Math.round(dispW * 0.7);
                            var canvas = document.createElement('canvas');
                            canvas.width = dispW * dpr;
                            canvas.height = dispH * dpr;
                            canvas.style.width = dispW + 'px';
                            canvas.style.height = dispH + 'px';
                            canvas.style.cursor = 'crosshair';
                            canvas.style.borderRadius = '6px';
                            body.appendChild(canvas);

                            var state = { cx: -0.5, cy: 0, zoom: dispW / 3.2, maxIter: 300 };

                            function draw() {
                                renderMandelbrot(canvas, state.cx, state.cy, state.zoom, state.maxIter);
                                // Draw labels
                                var ctx = canvas.getContext('2d');
                                ctx.save();
                                ctx.scale(dpr, dpr);
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillStyle = 'rgba(255,255,255,0.8)';
                                ctx.textAlign = 'center';
                                // Label cardioid
                                var sx1 = dispW / 2 + (-0.25 - state.cx) * state.zoom;
                                var sy1 = dispH / 2 - (0 - state.cy) * state.zoom;
                                if (sx1 > 0 && sx1 < dispW && sy1 > 0 && sy1 < dispH) {
                                    ctx.fillText('Main Cardioid', sx1, sy1);
                                }
                                // Label period-2 bulb
                                var sx2 = dispW / 2 + (-1 - state.cx) * state.zoom;
                                var sy2 = dispH / 2 - (0 - state.cy) * state.zoom;
                                if (sx2 > 0 && sx2 < dispW && sy2 > 0 && sy2 < dispH) {
                                    ctx.fillText('Period-2 Bulb', sx2, sy2);
                                }
                                ctx.restore();
                            }

                            draw();

                            canvas.addEventListener('click', function (e) {
                                var rect = canvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                state.cx += (mx - dispW / 2) / state.zoom;
                                state.cy -= (my - dispH / 2) / state.zoom;
                                state.zoom *= 2;
                                state.maxIter = Math.min(1200, Math.floor(300 + 100 * Math.log2(state.zoom / (dispW / 3.2))));
                                draw();
                            });

                            canvas.addEventListener('contextmenu', function (e) {
                                e.preventDefault();
                                state.zoom *= 0.5;
                                state.maxIter = Math.max(300, Math.floor(300 + 100 * Math.log2(state.zoom / (dispW / 3.2))));
                                draw();
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                state.cx = -0.5; state.cy = 0; state.zoom = dispW / 3.2; state.maxIter = 300;
                                draw();
                            });

                            VizEngine.createButton(controls, 'Seahorse Valley', function () {
                                state.cx = -0.747; state.cy = 0.1; state.zoom = dispW * 8; state.maxIter = 500;
                                draw();
                            });

                            VizEngine.createButton(controls, 'Elephant Valley', function () {
                                state.cx = 0.275; state.cy = 0.006; state.zoom = dispW * 10; state.maxIter = 500;
                                draw();
                            });

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'The main cardioid of the Mandelbrot set can be described by the equation \\(c = \\frac{e^{i\\theta}}{2} - \\frac{e^{2i\\theta}}{4}\\) for \\(\\theta \\in [0, 2\\pi)\\). Verify that when \\(\\theta = 0\\), you get \\(c = 1/4\\), which is the rightmost point of the cardioid.',
                        hint: 'Substitute \\(\\theta = 0\\) so that \\(e^{i \\cdot 0} = 1\\).',
                        solution: 'When \\(\\theta = 0\\): \\(c = \\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4}\\). This is indeed the rightmost cusp of the main cardioid, where the Mandelbrot set just barely touches the real axis at \\(c = 0.25\\).'
                    },
                    {
                        question: 'The Mandelbrot set is known to be connected. What does "connected" mean here, and why was this result surprising?',
                        hint: 'Look at the thin filaments between the bulbs. On a computer screen, they look like they might break.',
                        solution: 'A set is connected if it cannot be split into two non-empty, disjoint open subsets; informally, it is "one piece." This was surprising because the filaments connecting the bulbs are so thin that they appear to vanish at any finite resolution. The proof by Douady and Hubbard showed that these filaments, no matter how thin, are always present.'
                    },
                    {
                        question: 'Use the visualization to zoom into "Seahorse Valley" (near \\(c \\approx -0.747 + 0.1i\\)). Describe what you see. Can you spot a mini-Mandelbrot?',
                        hint: 'Look for a small black shape that resembles the full Mandelbrot set, surrounded by spiral decorations.',
                        solution: 'In Seahorse Valley, you see spiraling tendrils that look like seahorse tails, decorated with intricate filaments. Zooming deeper, small copies of the entire Mandelbrot set appear, each with their own cardioid and bulbs, surrounded by spiral motifs unique to this region.'
                    }
                ]
            },

            // ===== Section 4: Zooming into infinity =====
            {
                id: 'zooming-infinity',
                title: 'Zooming into Infinity',
                content: '\
<h2>Zooming into Infinity</h2>\
<p>One of the most mind-bending properties of the Mandelbrot set is that its boundary has <strong>infinite detail at every scale</strong>. You can zoom in forever and never see the same pattern twice, yet you will always encounter echoes of the whole.</p>\
\
<p>To appreciate this, consider what zooming means mathematically. When you zoom in by a factor of 10, you are looking at a region 10 times smaller. When you zoom in by a factor of a million, you are examining a region the size of one millionth of the original. Computer scientists have computed zooms of \\(10^{200}\\) and beyond, which is like magnifying a region smaller than a proton relative to the observable universe, and the boundary is <em>still</em> producing new, intricate detail.</p>\
\
<div class="env-block intuition">\
<div class="env-title">Intuition: why is there always more detail?</div>\
<p>The boundary of the Mandelbrot set is where orbits transition from bounded to escaping. At this boundary, infinitely many dynamical behaviors coexist: fixed points, period-2 cycles, period-3 cycles, period-1000000 cycles, and genuinely chaotic orbits. Each of these leaves its "fingerprint" on the boundary, and since there are infinitely many possible behaviors, the boundary must encode all of them, producing detail at every scale.</p>\
</div>\
\
<p>Some of the most famous regions to explore have been given evocative names by the fractal community:</p>\
<ul>\
<li><strong>Seahorse Valley</strong> (near \\(c \\approx -0.75 + 0.1i\\)): spiraling tendrils that look like seahorse tails</li>\
<li><strong>Elephant Valley</strong> (near \\(c \\approx 0.28 + 0.01i\\)): trunk-like shapes curling outward</li>\
<li><strong>The Antenna</strong> (the real axis between \\(-2\\) and \\(-1.4\\)): filaments branching like TV antenna</li>\
<li><strong>Mini-Mandelbrots</strong>: tiny copies of the full set, each with unique surrounding decorations</li>\
</ul>\
\
<p>The mathematical reason mini-Mandelbrots appear is deep. By a theorem of Lei Tan (1990), at every point where a mini-Mandelbrot sits, the Mandelbrot set and the corresponding Julia set have the <em>same local geometry</em> at microscopic scales. The mini-Mandelbrots are not just visual curiosities; they encode genuine mathematical structure about the dynamics of \\(z^2 + c\\).</p>\
\
<div class="viz-placeholder" data-viz="mandelbrot-zoom-presets"></div>\
\
<p>The boundary of the Mandelbrot set is a <strong>fractal curve</strong>. Its Hausdorff dimension is exactly 2, which was proved by Mitsuhiro Shishikura in 1991. This means the boundary is so crinkly that it is, in a dimensional sense, as complex as a filled-in surface, even though it has zero area. The boundary is a curve so tangled that it "almost" fills the plane.</p>\
\
<div class="env-block theorem">\
<div class="env-title">Shishikura\'s Theorem (1991)</div>\
<p>The Hausdorff dimension of the boundary of the Mandelbrot set is 2.</p>\
</div>\
\
<p>This result places the Mandelbrot boundary at the extreme end of fractal complexity. For comparison, the Koch snowflake has dimension about 1.26, and the Sierpinski triangle has dimension about 1.58. A dimension of 2 for a curve is the highest possible.</p>\
\
<p>Every time you zoom into the Mandelbrot set, you are exploring a mathematical landscape that has been shaped by the simplest of rules. The infinite richness is not put in by hand; it is <em>emergent</em>, arising inevitably from the interaction of squaring and adding. This is perhaps the deepest lesson of the Mandelbrot set: that complexity does not require complicated rules. It requires only simple rules applied with feedback.</p>',

                visualizations: [
                    {
                        id: 'mandelbrot-zoom-presets',
                        title: 'Famous Zoom Locations',
                        description: 'Click the buttons to jump to famous locations. Click the image to zoom further. Right-click or shift-click to zoom out.',
                        setup: function (body, controls) {
                            var dpr = window.devicePixelRatio || 1;
                            var dispW = Math.min(body.clientWidth || 560, 700);
                            var dispH = Math.round(dispW * 0.7);
                            var canvas = document.createElement('canvas');
                            canvas.width = dispW * dpr;
                            canvas.height = dispH * dpr;
                            canvas.style.width = dispW + 'px';
                            canvas.style.height = dispH + 'px';
                            canvas.style.cursor = 'crosshair';
                            canvas.style.borderRadius = '6px';
                            body.appendChild(canvas);

                            var state = { cx: -0.5, cy: 0, zoom: dispW / 3.5, maxIter: 300 };

                            function draw() {
                                renderMandelbrot(canvas, state.cx, state.cy, state.zoom, state.maxIter);
                            }
                            draw();

                            var info = document.createElement('div');
                            info.style.cssText = 'font-size:0.75rem;color:#8b949e;margin-top:6px;';
                            info.textContent = 'Click to zoom 2x. Right-click to zoom out.';
                            body.appendChild(info);

                            canvas.addEventListener('click', function (e) {
                                var rect = canvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                var factor = e.shiftKey ? 0.5 : 2;
                                state.cx += (mx - dispW / 2) / state.zoom;
                                state.cy -= (my - dispH / 2) / state.zoom;
                                state.zoom *= factor;
                                state.maxIter = Math.min(1500, Math.floor(300 + 100 * Math.log2(state.zoom / (dispW / 3.5))));
                                draw();
                                info.textContent = 'Zoom: ' + (state.zoom / (dispW / 3.5)).toFixed(1) + 'x | Iterations: ' + state.maxIter;
                            });

                            canvas.addEventListener('contextmenu', function (e) {
                                e.preventDefault();
                                state.zoom *= 0.5;
                                state.maxIter = Math.max(300, Math.floor(300 + 100 * Math.log2(state.zoom / (dispW / 3.5))));
                                draw();
                                info.textContent = 'Zoom: ' + (state.zoom / (dispW / 3.5)).toFixed(1) + 'x | Iterations: ' + state.maxIter;
                            });

                            var presets = [
                                { name: 'Full Set', cx: -0.5, cy: 0, z: 1, iter: 300 },
                                { name: 'Seahorse Valley', cx: -0.7463, cy: 0.1102, z: 40, iter: 500 },
                                { name: 'Elephant Valley', cx: 0.2783, cy: 0.0084, z: 50, iter: 500 },
                                { name: 'Mini-Mandelbrot', cx: -1.768, cy: 0.001, z: 80, iter: 600 },
                                { name: 'Spiral', cx: -0.0452, cy: 0.9868, z: 60, iter: 600 }
                            ];
                            presets.forEach(function (p) {
                                VizEngine.createButton(controls, p.name, function () {
                                    state.cx = p.cx; state.cy = p.cy;
                                    state.zoom = dispW / 3.5 * p.z;
                                    state.maxIter = p.iter;
                                    draw();
                                    info.textContent = p.name + ' | Zoom: ' + p.z + 'x | Iterations: ' + p.iter;
                                });
                            });

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'What does it mean for the boundary of the Mandelbrot set to have Hausdorff dimension 2? How does this compare to an ordinary smooth curve?',
                        hint: 'A smooth curve (like a circle) has Hausdorff dimension 1. A filled-in square has dimension 2.',
                        solution: 'A smooth curve has Hausdorff dimension 1, meaning it is truly one-dimensional. The Mandelbrot boundary has dimension 2, which means it is so infinitely crinkled and space-filling that, from a measure-theoretic perspective, it is as "thick" as a 2D surface, even though it has zero area. It is the most complex possible curve.'
                    },
                    {
                        question: 'When you zoom into a mini-Mandelbrot, the decorations around it look different from those around the full set. Why might this be?',
                        hint: 'Think about the dynamical context. The mini-Mandelbrot sits at a point where a specific period-n cycle is becoming stable.',
                        solution: 'Each mini-Mandelbrot sits at a point associated with a specific periodic cycle. The decorations reflect the dynamics of that cycle: its period, its combinatorial type, and how nearby orbits behave. The core Mandelbrot shape is universal (it encodes the same bifurcation structure), but the surrounding patterns are modulated by the local dynamics, creating unique decorations at each copy.'
                    }
                ]
            },

            // ===== Section 5: Julia sets — Mandelbrot's cousins =====
            {
                id: 'julia-sets',
                title: "Julia Sets — Mandelbrot's Cousins",
                content: '\
<h2>Julia Sets: Mandelbrot\'s Cousins</h2>\
<p>We have been studying the Mandelbrot set by asking: "For which values of \\(c\\) does the iteration \\(z^2 + c\\) stay bounded?" But there is another, equally natural question: "For a <em>fixed</em> value of \\(c\\), which starting points \\(z_0\\) stay bounded?"</p>\
\
<p>The answer to this second question is a <strong>Julia set</strong>, named after Gaston Julia who first studied these sets in 1918.</p>\
\
<div class="env-block definition">\
<div class="env-title">The Filled Julia Set</div>\
<p>For a fixed complex number \\(c\\), the <strong>filled Julia set</strong> \\(K_c\\) is the set of all starting points \\(z_0\\) for which the iteration \\(z_{n+1} = z_n^2 + c\\) stays bounded. The <strong>Julia set</strong> \\(J_c\\) is the boundary of \\(K_c\\).</p>\
</div>\
\
<p>So the Mandelbrot set catalogs values of \\(c\\), while each Julia set shows the "fate map" of starting points for one particular \\(c\\). There is one Mandelbrot set, but infinitely many Julia sets, one for each complex number \\(c\\).</p>\
\
<p>Here is the stunning connection between the two:</p>\
\
<div class="env-block theorem">\
<div class="env-title">The Mandelbrot-Julia Correspondence</div>\
<p>If \\(c\\) is <strong>inside</strong> the Mandelbrot set, the corresponding Julia set \\(J_c\\) is <strong>connected</strong> (one piece). If \\(c\\) is <strong>outside</strong> the Mandelbrot set, the Julia set \\(J_c\\) is <strong>totally disconnected</strong> (a "dust" of infinitely many scattered points, called a Cantor set).</p>\
</div>\
\
<p>This is one of the most beautiful theorems in fractal mathematics. The Mandelbrot set is literally a <em>map</em> of which Julia sets are connected. Pick a point inside the black region, and the corresponding Julia set is a beautiful, connected fractal. Pick a point outside, and the Julia set crumbles into dust. The further \\(c\\) is from the boundary of the Mandelbrot set, the faster the Julia set falls apart.</p>\
\
<p>The most visually stunning Julia sets come from values of \\(c\\) near the <em>boundary</em> of the Mandelbrot set. Here, the Julia set is connected but barely so, with thin filaments and spiraling tentacles that mirror the local geometry of the Mandelbrot boundary. This is the content of Lei Tan\'s theorem: at microscopic scales, the Mandelbrot set near \\(c\\) and the Julia set \\(J_c\\) look identical.</p>\
\
<div class="viz-placeholder" data-viz="julia-explorer"></div>\
\
<p>Some famous Julia sets to try:</p>\
<ul>\
<li><strong>\\(c = -0.7269 + 0.1889i\\)</strong>: called the "Douady rabbit," a connected set that looks like a rabbit with two ears</li>\
<li><strong>\\(c = -0.8 + 0.156i\\)</strong>: a swirling, dendrite-like pattern</li>\
<li><strong>\\(c = 0.285 + 0.01i\\)</strong>: near Elephant Valley, with trunk-like spirals</li>\
<li><strong>\\(c = -1.476\\)</strong>: near the tip of the antenna, a dendrite (tree-like structure)</li>\
<li><strong>\\(c = 0.36 + 0.1i\\)</strong>: outside the set, so the Julia set is a Cantor dust (looks like scattered dots)</li>\
</ul>\
\
<div class="env-block remark">\
<div class="env-title">Julia, the mathematician</div>\
<p>Gaston Julia published his masterwork on iteration at the age of 25, while recovering from the war wound that destroyed his nose. His 199-page memoir won the Grand Prix of the French Academy of Sciences in 1918 but was then largely forgotten for sixty years. It was Mandelbrot who rediscovered Julia\'s work and, with the help of computers, revealed the visual beauty that Julia could only imagine. Today, Julia sets are among the most recognizable images in all of mathematics.</p>\
</div>\
\
<p>The interplay between the Mandelbrot set and Julia sets illustrates a theme that runs through all of mathematics: local and global perspectives illuminate each other. The Mandelbrot set gives us the global view (which values of \\(c\\) produce interesting dynamics?), while Julia sets give us the local view (what does the dynamics of a specific \\(c\\) look like?). Together, they form a complete picture of the iteration \\(z^2 + c\\), and that picture is one of the most beautiful in all of human knowledge.</p>',

                visualizations: [
                    {
                        id: 'julia-explorer',
                        title: 'Julia Set Explorer: Drag on the Mandelbrot Set',
                        description: 'The left panel shows the Mandelbrot set. Click or drag on it to select c. The right panel shows the corresponding Julia set in real time.',
                        setup: function (body, controls) {
                            var dpr = window.devicePixelRatio || 1;
                            var totalW = Math.min(body.clientWidth || 560, 700);
                            var gap = 8;
                            var panelW = Math.floor((totalW - gap) / 2);
                            var panelH = Math.round(panelW * 0.9);

                            var wrapper = document.createElement('div');
                            wrapper.style.cssText = 'display:flex;gap:' + gap + 'px;justify-content:center;';
                            body.appendChild(wrapper);

                            // Left: Mandelbrot
                            var leftDiv = document.createElement('div');
                            var mCanvas = document.createElement('canvas');
                            mCanvas.width = panelW * dpr;
                            mCanvas.height = panelH * dpr;
                            mCanvas.style.width = panelW + 'px';
                            mCanvas.style.height = panelH + 'px';
                            mCanvas.style.cursor = 'crosshair';
                            mCanvas.style.borderRadius = '6px';
                            leftDiv.appendChild(mCanvas);
                            var leftLabel = document.createElement('div');
                            leftLabel.style.cssText = 'font-size:0.7rem;color:#8b949e;text-align:center;margin-top:4px;';
                            leftLabel.textContent = 'Mandelbrot Set (click to pick c)';
                            leftDiv.appendChild(leftLabel);
                            wrapper.appendChild(leftDiv);

                            // Right: Julia
                            var rightDiv = document.createElement('div');
                            var jCanvas = document.createElement('canvas');
                            jCanvas.width = panelW * dpr;
                            jCanvas.height = panelH * dpr;
                            jCanvas.style.width = panelW + 'px';
                            jCanvas.style.height = panelH + 'px';
                            jCanvas.style.borderRadius = '6px';
                            rightDiv.appendChild(jCanvas);
                            var rightLabel = document.createElement('div');
                            rightLabel.style.cssText = 'font-size:0.7rem;color:#8b949e;text-align:center;margin-top:4px;';
                            rightLabel.textContent = 'Julia Set for c';
                            rightDiv.appendChild(rightLabel);
                            wrapper.appendChild(rightDiv);

                            var cR = -0.7269, cI = 0.1889;
                            var mZoom = panelW / 3.2;

                            function drawMandelbrot() {
                                renderMandelbrot(mCanvas, -0.5, 0, mZoom, 200);
                                // Draw crosshair at selected c
                                var ctx = mCanvas.getContext('2d');
                                ctx.save();
                                ctx.scale(dpr, dpr);
                                var sx = panelW / 2 + (cR - (-0.5)) * mZoom;
                                var sy = panelH / 2 - cI * mZoom;
                                ctx.strokeStyle = '#fff';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(sx - 10, sy); ctx.lineTo(sx + 10, sy); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(sx, sy - 10); ctx.lineTo(sx, sy + 10); ctx.stroke();
                                ctx.restore();
                            }

                            function drawJulia() {
                                renderJulia(jCanvas, cR, cI, panelW / 3.2, 200);
                                rightLabel.textContent = 'Julia Set for c = ' + cR.toFixed(4) + ' + ' + cI.toFixed(4) + 'i';
                            }

                            drawMandelbrot();
                            drawJulia();

                            function pickC(e) {
                                var rect = mCanvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                cR = -0.5 + (mx - panelW / 2) / mZoom;
                                cI = -(my - panelH / 2) / mZoom;
                                drawMandelbrot();
                                drawJulia();
                            }

                            mCanvas.addEventListener('click', pickC);
                            var dragging = false;
                            mCanvas.addEventListener('mousedown', function () { dragging = true; });
                            mCanvas.addEventListener('mousemove', function (e) { if (dragging) pickC(e); });
                            mCanvas.addEventListener('mouseup', function () { dragging = false; });
                            mCanvas.addEventListener('mouseleave', function () { dragging = false; });

                            // Presets
                            var presets = [
                                { name: 'Douady Rabbit', r: -0.7269, i: 0.1889 },
                                { name: 'Dendrite', r: -1.476, i: 0 },
                                { name: 'Spiral', r: -0.8, i: 0.156 },
                                { name: 'Cantor Dust', r: 0.36, i: 0.1 },
                                { name: 'Siegel Disk', r: -0.391, i: -0.587 }
                            ];
                            presets.forEach(function (p) {
                                VizEngine.createButton(controls, p.name, function () {
                                    cR = p.r; cI = p.i;
                                    drawMandelbrot();
                                    drawJulia();
                                });
                            });

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Explain in your own words the difference between the Mandelbrot set and a Julia set. What question does each one answer?',
                        hint: 'The Mandelbrot set varies \\(c\\) and fixes \\(z_0 = 0\\). A Julia set fixes \\(c\\) and varies \\(z_0\\).',
                        solution: 'The Mandelbrot set answers: "For which values of \\(c\\) does the orbit starting from \\(z_0 = 0\\) stay bounded?" Each point in the Mandelbrot set represents a different formula \\(z^2 + c\\). A Julia set answers: "For one specific formula \\(z^2 + c\\), which starting points \\(z_0\\) produce bounded orbits?" The Mandelbrot set is a catalog of all Julia sets; the Julia set is a portrait of one specific dynamical system.'
                    },
                    {
                        question: 'Use the Julia explorer to compare the Julia set for \\(c = 0\\) (which is deep inside the Mandelbrot set) with \\(c = 0.36 + 0.1i\\) (which is outside). Describe the visual difference.',
                        hint: 'For \\(c = 0\\), the iteration is just \\(z \\to z^2\\). Which starting points stay bounded under repeated squaring?',
                        solution: 'For \\(c = 0\\), the Julia set is a perfect circle of radius 1 (the unit disk): all points with \\(|z_0| \\leq 1\\) stay bounded, and all points outside escape. For \\(c = 0.36 + 0.1i\\), the Julia set is totally disconnected (Cantor dust) because \\(c\\) is outside the Mandelbrot set. Instead of a solid shape, you see a cloud of scattered points.'
                    },
                    {
                        question: 'The Douady rabbit Julia set (\\(c \\approx -0.7269 + 0.1889i\\)) has three-fold rotational symmetry. Can you guess why? (Hint: this value of \\(c\\) is in the period-3 bulb of the Mandelbrot set.)',
                        hint: 'In the period-3 bulb, the orbit cycles through three points. The Julia set inherits this three-fold structure.',
                        solution: 'At \\(c \\approx -0.7269 + 0.1889i\\), the iteration has an attracting period-3 cycle. The three points of this cycle act as "centers of attraction," and the Julia set arranges itself symmetrically around these three points, creating the three-fold symmetry that gives the set its rabbit-like appearance (a body with two ears).'
                    }
                ]
            }
        ]
    });
})();
