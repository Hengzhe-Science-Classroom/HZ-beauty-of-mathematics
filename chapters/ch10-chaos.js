// === Chapter 10: Chaos & the Butterfly Effect ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch10',
        number: 10,
        title: 'Chaos & the Butterfly Effect',
        subtitle: 'When simple rules create unpredictable futures',
        sections: [
            // ===== Section 1: Deterministic but unpredictable =====
            {
                id: 'deterministic-unpredictable',
                title: 'Deterministic but Unpredictable',
                content: '\
<h2>Deterministic but Unpredictable</h2>\
<p>On a winter morning in 1961, a meteorologist named <strong>Edward Lorenz</strong> was running a weather simulation on his Royal McBee computer at MIT. The computer churned through equations modeling the atmosphere: temperature, pressure, wind speed, all interconnected by precise mathematical rules. Every output was completely determined by the initial conditions. There was no randomness in the model at all.</p>\
\
<p>Lorenz wanted to re-examine a particular run, but instead of starting from the very beginning, he took a shortcut. He restarted the simulation from the middle, typing in numbers from an earlier printout. The printout showed values to three decimal places (like 0.506), but the computer\'s internal memory stored six decimal places (like 0.506127). Lorenz figured the difference, about one part in a thousand, was too small to matter.</p>\
\
<p>He was spectacularly wrong.</p>\
\
<p>The new run matched the original for a while, then began to diverge. Within a simulated month, the two weather patterns were completely unrelated. One showed sunshine in Kansas; the other showed thunderstorms. A difference of 0.000127 in the initial data had produced a <em>completely different weather future</em>.</p>\
\
<div class="env-block definition">\
<div class="env-title">Chaos</div>\
<p>A <strong>chaotic system</strong> is one that is fully deterministic (no randomness) yet extremely sensitive to initial conditions. Tiny differences in starting values grow exponentially over time, making long-term prediction effectively impossible even though the underlying rules are perfectly known.</p>\
</div>\
\
<p>This idea shattered a centuries-old dream. Since Newton, scientists had believed that if you knew the laws of physics and the current state of the universe precisely enough, you could predict the future with arbitrary accuracy. Chaos theory says: even with perfect laws, if your knowledge of the present has the slightest imprecision, your predictions eventually become worthless. Not because the universe is random, but because it amplifies ignorance.</p>\
\
<p>Lorenz summarized his finding with a vivid image: <em>a butterfly flapping its wings in Brazil could set off a tornado in Texas</em>. This became known as the <strong>butterfly effect</strong>, and it launched an entirely new branch of mathematics.</p>\
\
<div class="env-block intuition">\
<div class="env-title">Intuition: shuffling a deck of cards</div>\
<p>Imagine shuffling a deck of cards with a perfect riffle shuffle. Each shuffle is a precise, deterministic operation. Yet after seven or eight perfect shuffles, the deck looks completely random. The shuffling rule is simple and exact, but it mixes the cards so thoroughly that predicting the final order from any slight uncertainty in the initial order is hopeless. Chaos works the same way: deterministic rules that mix and stretch until all predictability is lost.</p>\
</div>\
\
<p>What makes chaos so philosophically deep is the tension it creates between knowledge and prediction. In a chaotic system, the rules are known with perfect precision, the current state can be measured (though never with infinite precision), yet the future remains unknowable beyond a certain horizon. Weather, for example, becomes inherently unpredictable beyond about 10 to 14 days, no matter how many sensors you deploy or how powerful your computers become. This is not a technological limitation; it is a mathematical one.</p>\
\
<div class="viz-placeholder" data-viz="lorenz-sensitivity"></div>\
\
<p>The visualization above shows two trajectories of the Lorenz system starting from almost identical initial conditions. Watch how they track each other closely at first, then suddenly diverge into completely different paths. This is the butterfly effect in action.</p>\
\
<div class="env-block remark">\
<div class="env-title">Chaos is not randomness</div>\
<p>It is crucial to distinguish chaos from randomness. In a random process, outcomes are fundamentally unpredictable because they have no underlying rule. In chaos, there <em>is</em> a rule, and it is perfectly deterministic. The unpredictability comes not from the absence of rules but from the extreme sensitivity to initial conditions. If you could know the initial state with infinite precision (which you never can), you could predict the chaotic system perfectly. Randomness has no such hidden order.</p>\
</div>',

                visualizations: [
                    {
                        id: 'lorenz-sensitivity',
                        title: 'The Butterfly Effect: Two Nearly Identical Starts',
                        description: 'Two trajectories of the Lorenz system, differing by only 0.0001 in the initial x-value. Watch them diverge.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: undefined, height: undefined, scale: 8 });
                            viz.originX = viz.width / 2;
                            viz.originY = viz.height * 0.55;

                            // Lorenz system parameters
                            var sigma = 10, rho = 28, beta = 8 / 3;
                            var dt = 0.005;

                            // Two trajectories with tiny difference
                            var x1 = 1, y1 = 1, z1 = 1;
                            var x2 = 1.0001, y2 = 1, z2 = 1;
                            var trail1 = [], trail2 = [];
                            var maxTrail = 3000;
                            var step = 0;

                            function lorenzStep(x, y, z) {
                                var dx = sigma * (y - x);
                                var dy = x * (rho - z) - y;
                                var dz = x * y - beta * z;
                                return [x + dx * dt, y + dy * dt, z + dz * dt];
                            }

                            // Project 3D to 2D (x-z plane, slightly rotated)
                            function project(x, y, z) {
                                return [x * 0.9 + y * 0.15, z - 25];
                            }

                            function drawFrame() {
                                // Advance simulation
                                for (var i = 0; i < 4; i++) {
                                    var n1 = lorenzStep(x1, y1, z1);
                                    x1 = n1[0]; y1 = n1[1]; z1 = n1[2];
                                    var n2 = lorenzStep(x2, y2, z2);
                                    x2 = n2[0]; y2 = n2[1]; z2 = n2[2];
                                    var p1 = project(x1, y1, z1);
                                    var p2 = project(x2, y2, z2);
                                    trail1.push(p1);
                                    trail2.push(p2);
                                    if (trail1.length > maxTrail) trail1.shift();
                                    if (trail2.length > maxTrail) trail2.shift();
                                    step++;
                                }

                                viz.clear();
                                var ctx = viz.ctx;

                                // Draw trail 1 (blue)
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var i = 0; i < trail1.length; i++) {
                                    var s = viz.toScreen(trail1[i][0], trail1[i][1]);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.globalAlpha = 0.7;
                                ctx.stroke();

                                // Draw trail 2 (orange)
                                ctx.beginPath();
                                for (var i = 0; i < trail2.length; i++) {
                                    var s = viz.toScreen(trail2[i][0], trail2[i][1]);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.stroke();
                                ctx.globalAlpha = 1;

                                // Draw current positions
                                var cur1 = viz.toScreen(trail1[trail1.length - 1][0], trail1[trail1.length - 1][1]);
                                var cur2 = viz.toScreen(trail2[trail2.length - 1][0], trail2[trail2.length - 1][1]);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(cur1[0], cur1[1], 5, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(cur2[0], cur2[1], 5, 0, Math.PI * 2); ctx.fill();

                                // Info
                                var dist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
                                viz.screenText('Separation: ' + dist.toFixed(4), 10, 18, viz.colors.white, 12, 'left', 'top');
                                viz.screenText('Blue: x\u2080 = 1.0000    Orange: x\u2080 = 1.0001', 10, 36, viz.colors.text, 11, 'left', 'top');
                                viz.screenText('Step: ' + step, viz.width - 10, 18, viz.colors.text, 11, 'right', 'top');
                            }

                            viz.animate(drawFrame);

                            VizEngine.createButton(controls, 'Restart', function () {
                                x1 = 1; y1 = 1; z1 = 1;
                                x2 = 1.0001; y2 = 1; z2 = 1;
                                trail1 = []; trail2 = [];
                                step = 0;
                            });

                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Lorenz\'s printout rounded 0.506127 to 0.506. What is the relative error of this rounding? Express it as a fraction and as a percentage.',
                        hint: 'Relative error = |true - approximate| / |true|.',
                        solution: 'Relative error = |0.506127 - 0.506| / 0.506127 = 0.000127 / 0.506127 &approx; 0.000251, or about 0.025%. This tiny error, about one part in four thousand, was enough to destroy all predictive power within a simulated month.'
                    },
                    {
                        question: 'If the separation between two chaotic trajectories doubles every day, and today\'s measurement error is 1 meter, how long until the error exceeds 1000 km?',
                        hint: 'You need to solve \\(2^n &gt; 10^6\\), since 1000 km = 1,000,000 m.',
                        solution: 'We need \\(2^n &gt; 10^6\\). Taking logarithms: \\(n &gt; \\log_2(10^6) = 6 \\log_2(10) \\approx 6 \\times 3.322 \\approx 19.9\\). So after about 20 days, the error exceeds 1000 km. This matches the real-world weather prediction limit of about 2 weeks.'
                    },
                    {
                        question: 'Explain why chaos does not mean "anything can happen." Even in a chaotic system, there are constraints on what is possible.',
                        hint: 'Think about conservation laws (energy, for instance) and the concept of an "attractor."',
                        solution: 'Chaotic trajectories are confined to a specific region of state space called a <strong>strange attractor</strong>. The system cannot visit states outside this attractor. For example, the Lorenz system always stays on its butterfly-shaped attractor; it never spirals off to infinity. Conservation laws and other constraints limit the possible states. Chaos means that <em>within</em> the attractor, trajectories are unpredictable, but the attractor itself is a fixed, structured object.'
                    }
                ]
            },

            // ===== Section 2: The logistic map =====
            {
                id: 'logistic-map',
                title: 'The Logistic Map',
                content: '\
<h2>The Logistic Map</h2>\
<p>To understand chaos, we do not need complicated weather models. We can see it in one of the simplest possible equations:</p>\
\
<div class="env-block definition">\
<div class="env-title">The Logistic Map</div>\
\\[ x_{n+1} = r \\cdot x_n (1 - x_n) \\]\
<p>where \\(x_n\\) is a number between 0 and 1, and \\(r\\) is a parameter between 0 and 4.</p>\
</div>\
\
<p>This equation was originally introduced to model population growth. Think of \\(x_n\\) as the population of a species as a fraction of the maximum the environment can support. The term \\(r \\cdot x_n\\) represents growth (more individuals means more reproduction), while the term \\((1 - x_n)\\) represents competition (when the population is near capacity, resources run out). Together, they create a feedback loop: growth is limited by its own success.</p>\
\
<p>The behavior of this equation depends entirely on the parameter \\(r\\), and the progression from simplicity to chaos as \\(r\\) increases is one of the most beautiful stories in all of mathematics.</p>\
\
<p><strong>For small \\(r\\) (0 &lt; r &lt; 1)</strong>: the population dies out. No matter where you start, \\(x_n \\to 0\\).</p>\
\
<p><strong>For \\(1 &lt; r &lt; 3\\)</strong>: the population settles to a stable equilibrium. After some initial bouncing, \\(x_n\\) converges to a single fixed value \\(x^* = 1 - 1/r\\). This is the "boring" regime: predictable, stable, no surprises.</p>\
\
<p><strong>At \\(r = 3\\)</strong>: the equilibrium becomes unstable. The population starts oscillating between two values, like a pendulum swinging back and forth. This is called a <strong>period-2 cycle</strong>.</p>\
\
<p><strong>At \\(r \\approx 3.449\\)</strong>: the period-2 cycle itself becomes unstable and splits into a period-4 cycle (four values, visited in sequence).</p>\
\
<p><strong>At \\(r \\approx 3.544\\)</strong>: period 4 becomes period 8. Then period 16, 32, 64... Each doubling happens faster and faster, in a geometric progression.</p>\
\
<p><strong>At \\(r \\approx 3.5699...\\)</strong>: the doublings accumulate at a specific value called the <strong>Feigenbaum point</strong>, and beyond it, the system becomes <strong>chaotic</strong>. The orbit never repeats; it bounces around the interval in an apparently random fashion, even though the rule is completely deterministic.</p>\
\
<div class="env-block theorem">\
<div class="env-title">Feigenbaum\'s Discovery (1978)</div>\
<p>The ratio of successive period-doubling intervals converges to a universal constant:</p>\
\\[ \\delta = \\lim_{n \\to \\infty} \\frac{r_n - r_{n-1}}{r_{n+1} - r_n} = 4.6692... \\]\
<p>This number, called the <strong>Feigenbaum constant</strong>, is the same for <em>any</em> equation that undergoes period-doubling, not just the logistic map. It is as universal to chaos as \\(\\pi\\) is to circles.</p>\
</div>\
\
<div class="viz-placeholder" data-viz="logistic-cobweb"></div>\
\
<p>The cobweb diagram above lets you see how the iteration works geometrically. The red curve is the parabola \\(y = rx(1-x)\\), and the diagonal line is \\(y = x\\). Starting from \\(x_0\\), you go up to the curve (applying the function), then across to the diagonal (feeding the output back as input), and repeat. For low \\(r\\), the cobweb spirals into a fixed point. For higher \\(r\\), it oscillates or bounces chaotically.</p>\
\
<div class="viz-placeholder" data-viz="bifurcation-diagram"></div>\
\
<p>The bifurcation diagram is one of the most famous images in mathematics. As \\(r\\) increases from left to right, the long-term behavior of \\(x_n\\) unfolds: a single line (fixed point) splits into two (period 2), then four, eight, sixteen, and finally dissolves into a chaotic cloud. But look closely at the chaotic region: there are <strong>windows of order</strong> where periodic orbits reappear, most notably the period-3 window near \\(r \\approx 3.83\\).</p>\
\
<div class="env-block intuition">\
<div class="env-title">Intuition: the period-3 window</div>\
<p>In 1975, the mathematicians Li and Yorke proved a remarkable theorem titled "Period Three Implies Chaos." If a one-dimensional map has a period-3 cycle, it must also have cycles of every other period, and it must exhibit chaos. The period-3 window in the logistic map is a gateway to the most complex dynamics possible.</p>\
</div>',

                visualizations: [
                    {
                        id: 'logistic-cobweb',
                        title: 'Cobweb Diagram for the Logistic Map',
                        description: 'Adjust r and watch the orbit evolve. The red curve is f(x) = rx(1-x), the gray line is y=x.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: undefined });
                            // Custom coordinate system: x in [0,1], y in [0,1]
                            var margin = 50;
                            var plotW = viz.width - 2 * margin;
                            var plotH = viz.height - 2 * margin;

                            var rVal = 2.8;
                            var x0 = 0.1;
                            var maxSteps = 60;

                            function toPlot(x, y) {
                                return [margin + x * plotW, viz.height - margin - y * plotH];
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;

                                // Axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(margin, viz.height - margin); ctx.lineTo(margin + plotW, viz.height - margin); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(margin, viz.height - margin); ctx.lineTo(margin, viz.height - margin - plotH); ctx.stroke();

                                // Labels
                                ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                for (var i = 0; i <= 10; i++) {
                                    var v = i / 10;
                                    var p = toPlot(v, 0);
                                    if (i % 2 === 0) ctx.fillText(v.toFixed(1), p[0], p[1] + 14);
                                }
                                ctx.textAlign = 'right';
                                for (var i = 0; i <= 10; i++) {
                                    var v = i / 10;
                                    var p = toPlot(0, v);
                                    if (i % 2 === 0) ctx.fillText(v.toFixed(1), p[0] - 6, p[1] + 4);
                                }

                                // y = x line
                                ctx.strokeStyle = viz.colors.text + '66'; ctx.lineWidth = 1;
                                var p0 = toPlot(0, 0), p1 = toPlot(1, 1);
                                ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke();

                                // Parabola y = rx(1-x)
                                ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i <= 200; i++) {
                                    var x = i / 200;
                                    var y = rVal * x * (1 - x);
                                    var p = toPlot(x, Math.min(y, 1.05));
                                    if (i === 0) ctx.moveTo(p[0], p[1]);
                                    else ctx.lineTo(p[0], p[1]);
                                }
                                ctx.stroke();

                                // Cobweb
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1.2;
                                ctx.beginPath();
                                var x = x0;
                                var sp = toPlot(x, 0);
                                ctx.moveTo(sp[0], sp[1]);
                                for (var i = 0; i < maxSteps; i++) {
                                    var y = rVal * x * (1 - x);
                                    if (y < -1 || y > 2) break;
                                    var pUp = toPlot(x, Math.min(Math.max(y, 0), 1));
                                    ctx.lineTo(pUp[0], pUp[1]);
                                    var pAcross = toPlot(Math.min(Math.max(y, 0), 1), Math.min(Math.max(y, 0), 1));
                                    ctx.lineTo(pAcross[0], pAcross[1]);
                                    x = y;
                                }
                                ctx.stroke();

                                // Start point
                                var s0 = toPlot(x0, 0);
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(s0[0], s0[1], 5, 0, Math.PI * 2); ctx.fill();

                                viz.screenText('r = ' + rVal.toFixed(3), viz.width - 10, 18, viz.colors.white, 14, 'right', 'top');
                            }

                            draw();

                            VizEngine.createSlider(controls, 'r', 0.5, 4.0, rVal, 0.01, function (v) { rVal = v; draw(); });
                            VizEngine.createSlider(controls, 'x\u2080', 0.01, 0.99, x0, 0.01, function (v) { x0 = v; draw(); });

                            return { stopAnimation: function () {} };
                        }
                    },
                    {
                        id: 'bifurcation-diagram',
                        title: 'The Bifurcation Diagram',
                        description: 'Each vertical slice shows the long-term values of x for that r. Use the sliders to zoom into specific regions.',
                        setup: function (body, controls) {
                            var dpr = window.devicePixelRatio || 1;
                            var dispW = Math.min(body.clientWidth || 560, 700);
                            var dispH = Math.round(dispW * 0.6);
                            var canvas = document.createElement('canvas');
                            canvas.width = dispW * dpr;
                            canvas.height = dispH * dpr;
                            canvas.style.width = dispW + 'px';
                            canvas.style.height = dispH + 'px';
                            canvas.style.borderRadius = '6px';
                            body.appendChild(canvas);

                            var rMin = 2.5, rMax = 4.0;

                            function drawBifurcation() {
                                var ctx = canvas.getContext('2d');
                                var w = canvas.width, h = canvas.height;
                                ctx.fillStyle = '#0c0c20';
                                ctx.fillRect(0, 0, w, h);

                                var warmup = 300, plot = 200;
                                var cols = Math.min(w, dispW * 2);

                                for (var col = 0; col < cols; col++) {
                                    var r = rMin + (rMax - rMin) * col / cols;
                                    var x = 0.5;
                                    for (var i = 0; i < warmup; i++) {
                                        x = r * x * (1 - x);
                                    }
                                    for (var i = 0; i < plot; i++) {
                                        x = r * x * (1 - x);
                                        if (x >= 0 && x <= 1) {
                                            var px = Math.floor(col * w / cols);
                                            var py = Math.floor((1 - x) * h);
                                            var idx = (py * w + px) * 4;
                                            var imgData = ctx.getImageData(px, py, 1, 1);
                                            var d = imgData.data;
                                            // Accumulative blending
                                            d[0] = Math.min(255, d[0] + 20);
                                            d[1] = Math.min(255, d[1] + 40);
                                            d[2] = Math.min(255, d[2] + 60);
                                            d[3] = 255;
                                            ctx.putImageData(imgData, px, py);
                                        }
                                    }
                                }

                                // Draw axis labels
                                ctx.save();
                                ctx.scale(dpr, dpr);
                                ctx.fillStyle = '#8b949e'; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                for (var r = Math.ceil(rMin * 10) / 10; r <= rMax; r += 0.2) {
                                    var px = (r - rMin) / (rMax - rMin) * dispW;
                                    ctx.fillText(r.toFixed(1), px, dispH - 4);
                                }
                                ctx.textAlign = 'left';
                                ctx.fillText('x', 4, 14);
                                ctx.fillText('r', dispW - 14, dispH - 4);
                                ctx.restore();
                            }

                            drawBifurcation();

                            VizEngine.createSlider(controls, 'r min', 0, 3.8, rMin, 0.01, function (v) {
                                rMin = v; if (rMin >= rMax - 0.05) rMin = rMax - 0.05;
                                drawBifurcation();
                            });
                            VizEngine.createSlider(controls, 'r max', 2.5, 4.0, rMax, 0.01, function (v) {
                                rMax = v; if (rMax <= rMin + 0.05) rMax = rMin + 0.05;
                                drawBifurcation();
                            });

                            VizEngine.createButton(controls, 'Full View', function () {
                                rMin = 2.5; rMax = 4.0; drawBifurcation();
                            });
                            VizEngine.createButton(controls, 'Period-3 Window', function () {
                                rMin = 3.82; rMax = 3.86; drawBifurcation();
                            });

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'For \\(r = 2\\), find the fixed point \\(x^* = 1 - 1/r\\). Then verify that if you start with \\(x_0 = 0.2\\), the first few iterations approach this fixed point.',
                        hint: '\\(x^* = 1 - 1/2 = 0.5\\). Compute \\(x_1 = 2(0.2)(0.8)\\), then \\(x_2\\), \\(x_3\\), ...',
                        solution: '\\(x^* = 0.5\\). Starting from \\(x_0 = 0.2\\): \\(x_1 = 2(0.2)(0.8) = 0.32\\), \\(x_2 = 2(0.32)(0.68) = 0.4352\\), \\(x_3 = 0.4916\\), \\(x_4 = 0.4999\\), \\(x_5 = 0.5000\\). The orbit converges rapidly to the fixed point 0.5.'
                    },
                    {
                        question: 'The Feigenbaum constant \\(\\delta \\approx 4.6692\\) governs the rate of period doubling. If the period-2 bifurcation occurs at \\(r_1 = 3\\) and the period-4 bifurcation at \\(r_2 \\approx 3.449\\), estimate where the period-8 bifurcation \\(r_3\\) occurs.',
                        hint: 'Use \\(\\delta \\approx (r_2 - r_1)/(r_3 - r_2)\\), so \\(r_3 \\approx r_2 + (r_2 - r_1)/\\delta\\).',
                        solution: '\\(r_3 \\approx 3.449 + (3.449 - 3.0)/4.6692 = 3.449 + 0.449/4.669 \\approx 3.449 + 0.096 = 3.545\\). The actual value is about 3.5441, which is close. The estimate improves as you go deeper into the period-doubling cascade.'
                    },
                    {
                        question: 'Use the bifurcation diagram to zoom into the period-3 window (near \\(r \\approx 3.83\\)). What do you see inside it? Does it look familiar?',
                        hint: 'The period-3 window should have its own internal structure.',
                        solution: 'Inside the period-3 window, you see the same structure as the full bifurcation diagram: a stable period-3 orbit that undergoes its own period-doubling cascade (period 6, 12, 24...) leading to its own chaotic region. This is self-similarity: the entire bifurcation diagram is replicated inside every periodic window, at every scale. It is a fractal in parameter space.'
                    }
                ]
            },

            // ===== Section 3: The butterfly effect =====
            {
                id: 'butterfly-effect',
                title: 'The Butterfly Effect',
                content: '\
<h2>The Butterfly Effect</h2>\
<p>The phrase "butterfly effect" has become one of the most widely known scientific metaphors. But its meaning is more precise, and more profound, than the pop-culture version suggests.</p>\
\
<p>In technical language, the butterfly effect is <strong>sensitive dependence on initial conditions</strong>. Two states that start arbitrarily close together will eventually diverge to be as far apart as the system allows. The rate of divergence is measured by the <strong>Lyapunov exponent</strong>.</p>\
\
<div class="env-block definition">\
<div class="env-title">Lyapunov Exponent</div>\
<p>For a one-dimensional map \\(x_{n+1} = f(x_n)\\), the Lyapunov exponent \\(\\lambda\\) measures the average rate of separation of nearby orbits:</p>\
\\[ \\lambda = \\lim_{N \\to \\infty} \\frac{1}{N} \\sum_{n=0}^{N-1} \\ln |f\'(x_n)| \\]\
<p>If \\(\\lambda &gt; 0\\), the system is chaotic: nearby orbits diverge exponentially. If \\(\\lambda &lt; 0\\), nearby orbits converge. If \\(\\lambda = 0\\), we are at a bifurcation boundary.</p>\
</div>\
\
<p>The Lyapunov exponent gives us a way to <em>quantify</em> chaos. For the logistic map at \\(r = 4\\), the Lyapunov exponent is \\(\\lambda = \\ln 2 \\approx 0.693\\). This means nearby orbits separate by a factor of \\(e^{0.693} = 2\\) per iteration on average. After 10 iterations, a difference of \\(10^{-6}\\) becomes \\(10^{-6} \\times 2^{10} \\approx 10^{-3}\\). After 20 iterations, it becomes \\(10^{-6} \\times 2^{20} \\approx 1\\), completely filling the available range. Predictability is destroyed in just 20 steps.</p>\
\
<div class="viz-placeholder" data-viz="logistic-sensitivity"></div>\
\
<p>Edward Lorenz himself was careful about the butterfly metaphor. In a 1972 talk titled "Does the Flap of a Butterfly\'s Wings in Brazil Set Off a Tornado in Texas?", he did not actually claim that butterflies cause tornadoes. His point was subtler: in a chaotic atmosphere, there is no way to separate "significant" perturbations from "insignificant" ones. Every perturbation, no matter how small, eventually matters. The butterfly\'s wing flap does not <em>cause</em> the tornado in any meaningful sense; rather, it makes the particular tornado that occurs different from the one that would have occurred without the flap.</p>\
\
<p>This has deep implications for prediction:</p>\
<ul>\
<li><strong>Weather</strong>: reliable forecasts beyond ~14 days are fundamentally impossible</li>\
<li><strong>Ecology</strong>: population models become unreliable over many generations</li>\
<li><strong>Economics</strong>: stock markets (which have some chaotic properties) resist long-term prediction</li>\
<li><strong>The solar system</strong>: Pluto\'s orbit is chaotic with a Lyapunov time of ~20 million years; we cannot predict its position 100 million years from now</li>\
</ul>\
\
<div class="env-block remark">\
<div class="env-title">Short-term prediction is still possible</div>\
<p>Chaos limits <em>long-term</em> prediction, not all prediction. In the short term, a chaotic system is perfectly predictable because nearby orbits have not had time to diverge significantly. This is why weather forecasts for tomorrow are quite good, even though forecasts for next month are hopeless. The Lyapunov exponent tells you the timescale on which prediction breaks down.</p>\
</div>\
\
<p>The butterfly effect also raises a philosophical question: if the universe is deterministic but chaotic, does "free will" reside in the sensitivity to initial conditions? Small, immeasurable internal states might lead to vastly different decisions. This is not a mathematical question, but the mathematics of chaos gives it a precise framework that philosophers lacked before Lorenz\'s discovery.</p>',

                visualizations: [
                    {
                        id: 'logistic-sensitivity',
                        title: 'Sensitivity in the Logistic Map',
                        description: 'Two orbits start with x and x + 0.0001. Watch them diverge in the chaotic regime (r near 4).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40 });
                            var margin = 50;
                            var plotW = viz.width - 2 * margin;
                            var plotH = viz.height - 2 * margin;

                            var rVal = 3.9;
                            var x0a = 0.4;
                            var eps = 0.0001;
                            var nSteps = 50;

                            function toPlot(n, x) {
                                return [margin + n / nSteps * plotW, viz.height - margin - x * plotH];
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;

                                // Axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(margin, viz.height - margin);
                                ctx.lineTo(margin + plotW, viz.height - margin);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(margin, viz.height - margin);
                                ctx.lineTo(margin, margin);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                for (var i = 0; i <= nSteps; i += 10) {
                                    var p = toPlot(i, 0);
                                    ctx.fillText(i, p[0], p[1] + 14);
                                }
                                viz.screenText('n (iteration)', viz.width / 2, viz.height - 8, viz.colors.text, 11, 'center', 'bottom');

                                // Compute two orbits
                                var xa = x0a, xb = x0a + eps;
                                var orbitA = [xa], orbitB = [xb];
                                for (var i = 0; i < nSteps; i++) {
                                    xa = rVal * xa * (1 - xa);
                                    xb = rVal * xb * (1 - xb);
                                    orbitA.push(xa);
                                    orbitB.push(xb);
                                }

                                // Draw orbit A (blue)
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i <= nSteps; i++) {
                                    var p = toPlot(i, orbitA[i]);
                                    if (i === 0) ctx.moveTo(p[0], p[1]);
                                    else ctx.lineTo(p[0], p[1]);
                                }
                                ctx.stroke();

                                // Draw orbit B (orange)
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i <= nSteps; i++) {
                                    var p = toPlot(i, orbitB[i]);
                                    if (i === 0) ctx.moveTo(p[0], p[1]);
                                    else ctx.lineTo(p[0], p[1]);
                                }
                                ctx.stroke();

                                viz.screenText('r = ' + rVal.toFixed(3) + '   \u0394x\u2080 = ' + eps, viz.width / 2, 18, viz.colors.white, 12, 'center', 'top');
                                viz.screenText('Blue: x\u2080 = ' + x0a.toFixed(4) + '   Orange: x\u2080 = ' + (x0a + eps).toFixed(4), viz.width / 2, 34, viz.colors.text, 11, 'center', 'top');
                            }

                            draw();

                            VizEngine.createSlider(controls, 'r', 2.5, 4.0, rVal, 0.01, function (v) { rVal = v; draw(); });
                            VizEngine.createSlider(controls, 'x\u2080', 0.05, 0.95, x0a, 0.01, function (v) { x0a = v; draw(); });

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'If a chaotic system has a Lyapunov exponent \\(\\lambda = 1\\) (per time step), and your initial measurement error is \\(10^{-12}\\), after how many steps does the error reach order 1?',
                        hint: 'The error grows as \\(\\epsilon_0 \\cdot e^{\\lambda n}\\). Set \\(10^{-12} \\cdot e^n = 1\\) and solve for \\(n\\).',
                        solution: '\\(e^n = 10^{12}\\), so \\(n = 12 \\ln 10 \\approx 27.6\\). After about 28 iterations, the error fills the entire state space. Even starting with a measurement precise to 12 decimal places, you lose all predictive power in fewer than 30 steps.'
                    },
                    {
                        question: 'The Lyapunov exponent of the logistic map at \\(r = 3.2\\) (period-2 regime) is negative. What does this mean physically?',
                        hint: 'A negative Lyapunov exponent means nearby orbits converge rather than diverge.',
                        solution: 'A negative Lyapunov exponent means the system is <strong>not</strong> chaotic at that parameter value. Nearby orbits converge exponentially to the same period-2 cycle. Small perturbations die out over time rather than growing. The system is stable and predictable. This is why the period-doubling region before the Feigenbaum point produces orderly behavior.'
                    }
                ]
            },

            // ===== Section 4: Strange attractors =====
            {
                id: 'strange-attractors',
                title: 'Strange Attractors',
                content: '\
<h2>Strange Attractors</h2>\
<p>Where does a chaotic trajectory actually go? It cannot escape to infinity (in the systems we study, the motion is bounded). It does not settle to a fixed point or a periodic cycle (that would not be chaotic). So what does it do?</p>\
\
<p>It lives on a <strong>strange attractor</strong>: a fractal set in state space that attracts all nearby trajectories, holds them forever, but never lets them repeat exactly.</p>\
\
<div class="env-block definition">\
<div class="env-title">Strange Attractor</div>\
<p>A <strong>strange attractor</strong> is an attracting set in the state space of a dynamical system that has a fractal structure and on which the dynamics are chaotic (sensitive to initial conditions). Trajectories are drawn to the attractor and wander on it forever without repeating.</p>\
</div>\
\
<p>The most famous strange attractor is the <strong>Lorenz attractor</strong>, discovered by Edward Lorenz from his weather equations. It lives in three-dimensional space and looks like a pair of butterfly wings (which is fitting, given the butterfly effect it famously illustrates).</p>\
\
<p>The Lorenz system consists of three coupled differential equations:</p>\
\\[ \\dot{x} = \\sigma(y - x), \\quad \\dot{y} = x(\\rho - z) - y, \\quad \\dot{z} = xy - \\beta z \\]\
<p>with the classic parameters \\(\\sigma = 10\\), \\(\\rho = 28\\), \\(\\beta = 8/3\\). The trajectory spirals around one "wing," then suddenly switches to the other wing, then back again, in an unpredictable pattern. It never crosses itself (in 3D), never repeats, and never leaves the attractor.</p>\
\
<div class="viz-placeholder" data-viz="lorenz-attractor"></div>\
\
<p>What makes the Lorenz attractor "strange" is its fractal structure. If you could cut the attractor with a plane, the cross-section would not be a simple set of points but rather a <strong>Cantor set</strong>: an infinite collection of points arranged in a fractal pattern. The attractor is locally the product of a curve and a Cantor set, which gives it a Hausdorff dimension of about 2.06, slightly more than a surface but less than a solid.</p>\
\
<div class="env-block intuition">\
<div class="env-title">Intuition: stretching and folding</div>\
<p>A strange attractor is created by two competing processes: <strong>stretching</strong> (which separates nearby trajectories, creating sensitivity) and <strong>folding</strong> (which brings distant trajectories close together, keeping the motion bounded). Think of making taffy: you pull the taffy (stretch) and fold it over, then pull and fold again. After many repetitions, the taffy is incredibly layered and mixed, yet it stays in a finite blob. The layers of taffy correspond to the fractal structure of the strange attractor.</p>\
</div>\
\
<p>Strange attractors appear in many systems beyond weather: dripping faucets, electrical circuits, lasers, heart rhythms, and even the orbits of asteroids. Their visual beauty has inspired artists, and their mathematical properties continue to challenge researchers. In 2001, Warwick Tucker gave the first rigorous computer-assisted proof that the Lorenz attractor genuinely exists as a strange attractor (and is not, say, a very long periodic orbit that merely looks chaotic). This took nearly 40 years after Lorenz\'s initial discovery.</p>\
\
<div class="env-block remark">\
<div class="env-title">Attractors as geometric "fates"</div>\
<p>In dynamical systems, an attractor represents the long-term fate of the system. A fixed point attractor means the system settles to rest. A periodic orbit (limit cycle) means the system oscillates. A strange attractor means the system wanders endlessly in a structured but unpredictable way. The geometry of the attractor tells you the qualitative behavior of the system: its shape encodes the dynamics.</p>\
</div>',

                visualizations: [
                    {
                        id: 'lorenz-attractor',
                        title: 'The Lorenz Attractor',
                        description: 'The trajectory traces out the butterfly-shaped strange attractor in real time. The 3D system is projected to 2D.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 7 });
                            viz.originX = viz.width / 2;
                            viz.originY = viz.height * 0.6;

                            var sigma = 10, rho = 28, beta = 8 / 3;
                            var dt = 0.004;
                            var x = 0.1, y = 0, z = 0;
                            var trail = [];
                            var maxTrail = 8000;
                            var angle = 0;
                            var autoRotate = true;

                            function project(px, py, pz) {
                                var ca = Math.cos(angle), sa = Math.sin(angle);
                                var rx = px * ca - py * sa;
                                var ry = pz - 25;
                                return [rx, ry];
                            }

                            function drawFrame(t) {
                                // Advance
                                for (var i = 0; i < 6; i++) {
                                    var dx = sigma * (y - x);
                                    var dy = x * (rho - z) - y;
                                    var dz = x * y - beta * z;
                                    x += dx * dt; y += dy * dt; z += dz * dt;
                                    trail.push([x, y, z]);
                                    if (trail.length > maxTrail) trail.shift();
                                }

                                if (autoRotate) angle += 0.001;

                                viz.clear();
                                var ctx = viz.ctx;

                                // Draw trail with gradient color
                                ctx.lineWidth = 1.2;
                                for (var i = 1; i < trail.length; i++) {
                                    var p0 = project(trail[i - 1][0], trail[i - 1][1], trail[i - 1][2]);
                                    var p1 = project(trail[i][0], trail[i][1], trail[i][2]);
                                    var s0 = viz.toScreen(p0[0], p0[1]);
                                    var s1 = viz.toScreen(p1[0], p1[1]);
                                    var hue = (i / trail.length * 270 + 200) % 360;
                                    var alpha = 0.15 + 0.85 * (i / trail.length);
                                    ctx.strokeStyle = 'hsla(' + hue + ',80%,55%,' + alpha + ')';
                                    ctx.beginPath();
                                    ctx.moveTo(s0[0], s0[1]);
                                    ctx.lineTo(s1[0], s1[1]);
                                    ctx.stroke();
                                }

                                // Current point
                                var cur = project(x, y, z);
                                var sc = viz.toScreen(cur[0], cur[1]);
                                ctx.fillStyle = '#fff';
                                ctx.beginPath(); ctx.arc(sc[0], sc[1], 4, 0, Math.PI * 2); ctx.fill();

                                viz.screenText('Lorenz Attractor', 10, 18, viz.colors.white, 13, 'left', 'top');
                                viz.screenText('\u03C3=10  \u03C1=28  \u03B2=8/3', 10, 36, viz.colors.text, 11, 'left', 'top');
                            }

                            viz.animate(drawFrame);

                            VizEngine.createButton(controls, 'Restart', function () {
                                x = 0.1; y = 0; z = 0; trail = [];
                            });
                            VizEngine.createButton(controls, 'Toggle Rotation', function () {
                                autoRotate = !autoRotate;
                            });

                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'The Lorenz attractor has a Hausdorff dimension of approximately 2.06. What does it mean for a geometric object to have a non-integer dimension?',
                        hint: 'A curve has dimension 1, a surface has dimension 2. What lies between?',
                        solution: 'A non-integer Hausdorff dimension means the object is too complex to be a surface (dimension 2) but not complex enough to fill a solid volume (dimension 3). The attractor is "more than a surface" because of its fractal layering (infinitely many sheets stacked in a Cantor-like structure), but it has zero volume. Dimension 2.06 captures this: it is a surface with a tiny bit of extra fractal complexity.'
                    },
                    {
                        question: 'The Lorenz system has three fixed points: the origin and two symmetric points. Why can a trajectory not simply settle onto one of these fixed points instead of wandering on the strange attractor?',
                        hint: 'Examine the stability of the fixed points at the classic parameter values.',
                        solution: 'At the classic parameters (\\(\\rho = 28\\)), all three fixed points are <strong>unstable</strong>. The origin is a saddle point, and the two symmetric fixed points are unstable spirals (their eigenvalues have positive real parts). Trajectories are repelled from all fixed points, but the system is bounded, so they must go somewhere: they end up on the strange attractor, the only stable attracting set in the system.'
                    }
                ]
            },

            // ===== Section 5: Chaos in everyday life =====
            {
                id: 'chaos-everyday',
                title: 'Chaos in Everyday Life',
                content: '\
<h2>Chaos in Everyday Life</h2>\
<p>Chaos is not confined to abstract mathematics or weather models. Once you know what to look for, you find it everywhere.</p>\
\
<p><strong>The double pendulum.</strong> Take a pendulum and attach another pendulum to its end. For small swings, the motion is gentle and predictable. But give it a strong push, and the double pendulum becomes wildly chaotic, tracing out erratic, looping paths that never repeat. Two double pendulums released from nearly identical positions will quickly diverge into completely different motions. It is one of the simplest mechanical systems that exhibits chaos.</p>\
\
<div class="viz-placeholder" data-viz="double-pendulum"></div>\
\
<p><strong>The heart.</strong> A healthy heartbeat is not a perfect metronome. Cardiologists have discovered that heart rate variability (small, chaotic fluctuations in the time between beats) is a sign of health. A perfectly regular heartbeat is actually a warning sign of impending cardiac failure. The healthy heart lives on a strange attractor; disease pushes it toward a simpler, more periodic (and more dangerous) rhythm.</p>\
\
<p><strong>The dripping faucet.</strong> A leaky faucet that drips at a steady rate is periodic. But turn up the flow slightly, and the dripping becomes irregular: sometimes two drops come quickly, then a pause, then three quick drops. Robert Shaw showed in the 1980s that this dripping pattern follows the period-doubling route to chaos, just like the logistic map.</p>\
\
<p><strong>Mixing paint.</strong> When you stir cream into coffee, you are exploiting chaos. The stretching and folding of the fluid creates the same kind of mixing that generates strange attractors. This is why a few stirs can thoroughly blend the cream: chaotic mixing is exponentially efficient.</p>\
\
<p><strong>The solar system.</strong> While the short-term motion of the planets is predictable (we can calculate eclipses centuries in advance), the long-term behavior is chaotic. Jack Wisdom showed in 1984 that the orbit of the asteroid Chiron is chaotic, and subsequent work revealed that the inner solar system (particularly Mercury) has a Lyapunov time of about 5 million years. We cannot predict the detailed positions of the planets beyond about 100 million years.</p>\
\
<div class="env-block intuition">\
<div class="env-title">Intuition: chaos as the rule, not the exception</div>\
<p>For most of the history of physics, scientists studied systems that are not chaotic: harmonic oscillators, simple pendulums, two-body gravitational problems. These are the exceptions. Most dynamical systems, once they have enough freedom (three or more interacting variables), are at least partly chaotic. The simple, predictable systems that fill textbooks are the rare gems; chaos is the common clay.</p>\
</div>\
\
<p><strong>What chaos teaches us.</strong> The discovery of chaos has profoundly changed how scientists think about prediction, complexity, and the limits of knowledge:</p>\
<ol>\
<li><strong>Simplicity can generate complexity.</strong> You do not need complicated rules to get complicated behavior. The logistic map, with its single line of algebra, produces the full period-doubling cascade to chaos.</li>\
<li><strong>Determinism does not equal predictability.</strong> A system can be perfectly deterministic yet effectively unpredictable beyond a finite time horizon.</li>\
<li><strong>Universality exists in chaos.</strong> The Feigenbaum constant, strange attractor dimensions, and other quantities are the same across wildly different systems. Chaos has its own kind of order.</li>\
<li><strong>Fractals and chaos are two sides of the same coin.</strong> Strange attractors are fractals in state space, generated by the stretching and folding that creates sensitive dependence.</li>\
</ol>\
\
<div class="env-block remark">\
<div class="env-title">The butterfly and the Mandelbrot set</div>\
<p>Chapters 9 and 10 are deeply connected. The Mandelbrot set is the "atlas of chaos" for the iteration \\(z^2 + c\\). Its boundary is where the transition from order to chaos occurs. The bifurcation diagram of the logistic map appears embedded along the real axis of the Mandelbrot set. Fractals, chaos, and dynamical systems are not separate topics; they are different perspectives on the same mathematical landscape.</p>\
</div>',

                visualizations: [
                    {
                        id: 'double-pendulum',
                        title: 'The Double Pendulum: Chaos in Motion',
                        description: 'Two double pendulums (blue and orange) with slightly different starting angles. Watch them diverge.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 60 });
                            viz.originX = viz.width / 2;
                            viz.originY = viz.height * 0.3;

                            var g = 9.81;
                            var L1 = 1.5, L2 = 1.5, m1 = 1, m2 = 1;

                            // State: [theta1, omega1, theta2, omega2]
                            var stateA = [Math.PI / 2, 0, Math.PI / 2, 0];
                            var stateB = [Math.PI / 2 + 0.001, 0, Math.PI / 2, 0];

                            var trailA = [], trailB = [];
                            var maxTrail = 600;
                            var dt = 0.01;

                            function derivs(s) {
                                var t1 = s[0], w1 = s[1], t2 = s[2], w2 = s[3];
                                var delta = t1 - t2;
                                var den1 = (2 * m1 + m2 - m2 * Math.cos(2 * delta));
                                var a1 = (-g * (2 * m1 + m2) * Math.sin(t1) - m2 * g * Math.sin(t1 - 2 * t2) - 2 * Math.sin(delta) * m2 * (w2 * w2 * L2 + w1 * w1 * L1 * Math.cos(delta))) / (L1 * den1);
                                var a2 = (2 * Math.sin(delta) * (w1 * w1 * L1 * (m1 + m2) + g * (m1 + m2) * Math.cos(t1) + w2 * w2 * L2 * m2 * Math.cos(delta))) / (L2 * den1);
                                return [w1, a1, w2, a2];
                            }

                            function rk4Step(s) {
                                var k1 = derivs(s);
                                var s2 = s.map(function (v, i) { return v + k1[i] * dt / 2; });
                                var k2 = derivs(s2);
                                var s3 = s.map(function (v, i) { return v + k2[i] * dt / 2; });
                                var k3 = derivs(s3);
                                var s4 = s.map(function (v, i) { return v + k3[i] * dt; });
                                var k4 = derivs(s4);
                                return s.map(function (v, i) { return v + (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) * dt / 6; });
                            }

                            function getPositions(s) {
                                var x1 = L1 * Math.sin(s[0]);
                                var y1 = -L1 * Math.cos(s[0]);
                                var x2 = x1 + L2 * Math.sin(s[2]);
                                var y2 = y1 - L2 * Math.cos(s[2]);
                                return { x1: x1, y1: y1, x2: x2, y2: y2 };
                            }

                            function drawFrame() {
                                for (var i = 0; i < 3; i++) {
                                    stateA = rk4Step(stateA);
                                    stateB = rk4Step(stateB);
                                }

                                var posA = getPositions(stateA);
                                var posB = getPositions(stateB);
                                trailA.push([posA.x2, posA.y2]);
                                trailB.push([posB.x2, posB.y2]);
                                if (trailA.length > maxTrail) trailA.shift();
                                if (trailB.length > maxTrail) trailB.shift();

                                viz.clear();
                                var ctx = viz.ctx;

                                // Draw trails
                                ctx.lineWidth = 1;
                                ctx.globalAlpha = 0.5;
                                // Trail A
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.beginPath();
                                for (var i = 0; i < trailA.length; i++) {
                                    var s = viz.toScreen(trailA[i][0], trailA[i][1]);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                                // Trail B
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.beginPath();
                                for (var i = 0; i < trailB.length; i++) {
                                    var s = viz.toScreen(trailB[i][0], trailB[i][1]);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                                ctx.globalAlpha = 1;

                                // Draw pendulum A
                                var pA = getPositions(stateA);
                                var o = viz.toScreen(0, 0);
                                var p1a = viz.toScreen(pA.x1, pA.y1);
                                var p2a = viz.toScreen(pA.x2, pA.y2);
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                                ctx.beginPath(); ctx.moveTo(o[0], o[1]); ctx.lineTo(p1a[0], p1a[1]); ctx.lineTo(p2a[0], p2a[1]); ctx.stroke();
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(p1a[0], p1a[1], 6, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(p2a[0], p2a[1], 6, 0, Math.PI * 2); ctx.fill();

                                // Draw pendulum B
                                var pB = getPositions(stateB);
                                var p1b = viz.toScreen(pB.x1, pB.y1);
                                var p2b = viz.toScreen(pB.x2, pB.y2);
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2.5;
                                ctx.beginPath(); ctx.moveTo(o[0], o[1]); ctx.lineTo(p1b[0], p1b[1]); ctx.lineTo(p2b[0], p2b[1]); ctx.stroke();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(p1b[0], p1b[1], 6, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(p2b[0], p2b[1], 6, 0, Math.PI * 2); ctx.fill();

                                // Pivot
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(o[0], o[1], 4, 0, Math.PI * 2); ctx.fill();

                                viz.screenText('Blue: \u03B8\u2081 = 90.000\u00B0    Orange: \u03B8\u2081 = 90.057\u00B0', 10, viz.height - 12, viz.colors.text, 11, 'left', 'bottom');
                            }

                            viz.animate(drawFrame);

                            VizEngine.createButton(controls, 'Restart', function () {
                                stateA = [Math.PI / 2, 0, Math.PI / 2, 0];
                                stateB = [Math.PI / 2 + 0.001, 0, Math.PI / 2, 0];
                                trailA = []; trailB = [];
                            });

                            VizEngine.createButton(controls, 'High Energy', function () {
                                stateA = [Math.PI * 0.9, 0, Math.PI * 0.9, 0];
                                stateB = [Math.PI * 0.9 + 0.001, 0, Math.PI * 0.9, 0];
                                trailA = []; trailB = [];
                            });

                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Watch the double pendulum visualization for 30 seconds. At what point do the two pendulums start to look completely different? Why does this happen even though they started almost identically?',
                        hint: 'The energy exchange between the two arms creates a sensitive dependence on initial angles.',
                        solution: 'Depending on the initial energy, the two pendulums typically diverge within 5 to 15 seconds of simulated time. This happens because the double pendulum is a chaotic system: its equations of motion are nonlinear, and the coupling between the two arms creates the stretching and folding in phase space that characterizes chaos. The 0.001 radian difference in initial angle grows exponentially until the motions are completely uncorrelated.'
                    },
                    {
                        question: 'Name three real-world systems (not mentioned in the text) that might exhibit chaotic behavior. For each, explain what the "sensitivity to initial conditions" would look like.',
                        hint: 'Think about systems with feedback, nonlinearity, and at least three interacting variables.',
                        solution: 'Possible answers include: (1) <strong>Traffic flow</strong>: a tiny hesitation by one driver can cause a traffic jam that propagates miles back. (2) <strong>Turbulent fluid flow</strong>: slightly different initial currents lead to completely different eddies and vortices downstream. (3) <strong>Neural networks in the brain</strong>: small differences in synaptic firing can lead to different thoughts and decisions. (4) <strong>Epidemics</strong>: small changes in early transmission can lead to vastly different outbreak sizes.'
                    },
                    {
                        question: 'The text states that the bifurcation diagram of the logistic map appears embedded along the real axis of the Mandelbrot set. Can you explain why this might be true?',
                        hint: 'Consider the iteration \\(z^2 + c\\) restricted to the real line (\\(z\\) and \\(c\\) both real).',
                        solution: 'When \\(z\\) and \\(c\\) are both real, the Mandelbrot iteration \\(z \\to z^2 + c\\) is a real-valued quadratic map. By a change of variables (\\(x = -z + 1/2\\), \\(c = r/2 - r^2/4\\), approximately), this becomes conjugate to the logistic map \\(x \\to rx(1-x)\\). So the Mandelbrot set restricted to the real axis encodes the same dynamics as the logistic map. The bifurcation diagram is literally a cross-section of the Mandelbrot set along the real line.'
                    }
                ]
            }
        ]
    });
})();
