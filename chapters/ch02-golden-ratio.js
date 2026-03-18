// === Chapter 2: The Golden Ratio φ ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'The Golden Ratio \u03C6',
    subtitle: 'The most beautiful number in the universe',
    sections: [
        // ===== Section 0: The Most Beautiful Number =====
        {
            id: 'most-beautiful-number',
            title: 'The Most Beautiful Number',
            content: `
<h2>A Number Unlike Any Other</h2>

<p>There is a number that has fascinated mathematicians, artists, architects, and mystics for over two thousand years. The ancient Greeks called it the "extreme and mean ratio." Renaissance artists called it the "divine proportion." Modern mathematicians call it \\(\\varphi\\) (phi), and it has a very simple value:</p>

\\[\\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.6180339887...\\]

<p>This number, the <strong>golden ratio</strong>, pops up in the most unexpected places: in the geometry of pentagons, in the arrangement of sunflower seeds, in the proportions of the human body (allegedly), in the stock market (dubiously), and in the deep structure of number theory (genuinely). It is the number that refuses to go away.</p>

<h3>Where It Comes From</h3>

<p>The simplest way to define \\(\\varphi\\) is this. Take a line segment and divide it into two parts, a long part \\(a\\) and a short part \\(b\\), such that the ratio of the whole to the long part equals the ratio of the long part to the short part:</p>

\\[\\frac{a + b}{a} = \\frac{a}{b} = \\varphi\\]

<p>In other words, the whole is to the larger part as the larger part is to the smaller part. This proportion is "self-similar" in a sense: the same ratio appears at two different scales. If we set \\(b = 1\\) and \\(a = \\varphi\\), the equation becomes:</p>

\\[\\frac{\\varphi + 1}{\\varphi} = \\varphi\\]

<p>Cross-multiplying: \\(\\varphi + 1 = \\varphi^2\\), which rearranges to:</p>

\\[\\varphi^2 - \\varphi - 1 = 0\\]

<p>Using the quadratic formula (and taking the positive root):</p>

\\[\\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618034\\]

<div class="env-block definition">
<strong>The Golden Ratio</strong><br>
The golden ratio \\(\\varphi\\) is the positive root of \\(x^2 - x - 1 = 0\\). Equivalently, it is the number that satisfies \\(\\varphi = 1 + \\frac{1}{\\varphi}\\). Its decimal expansion begins 1.6180339887... and never repeats.
</div>

<h3>The Greeks and the Pentagon</h3>

<p>The ancient Greeks encountered \\(\\varphi\\) when studying the regular pentagon, one of their favorite geometric figures. The diagonal of a regular pentagon with side length 1 has length \\(\\varphi\\). Moreover, the diagonals of a pentagon form a smaller pentagon inside, whose diagonals form an even smaller pentagon, and so on, ad infinitum. At every level, the same ratio \\(\\varphi\\) appears. This infinite self-similar nesting is part of what made \\(\\varphi\\) seem "divine" to the Greeks.</p>

<p>The Pythagoreans (followers of Pythagoras) were particularly obsessed with this number. Legend has it that the discovery that \\(\\varphi\\) is irrational (it cannot be expressed as a fraction of two whole numbers) was deeply disturbing to the Pythagoreans, who believed that all of reality could be expressed in terms of whole-number ratios. According to some accounts, the Pythagorean Hippasus was drowned for revealing this terrible secret. (Historians are skeptical about this story, but it makes great lore.)</p>

<div class="viz-placeholder" data-viz="ch02-pentagon-phi"></div>

<div class="env-block remark">
<strong>On overblown claims</strong><br>
The golden ratio has attracted more than its share of pseudoscience and myth. Claims that the Parthenon, the Great Pyramid, the Mona Lisa, and the human body are designed around \\(\\varphi\\) are mostly exaggerated or false. When you hear "the golden ratio appears in X," ask: was it measured precisely, or was someone just fitting rectangles and squinting? Real appearances of \\(\\varphi\\) in nature (like phyllotaxis) are remarkable enough without the fabrications.
</div>
`,
            visualizations: [
                {
                    id: 'ch02-pentagon-phi',
                    title: 'The Golden Ratio in the Pentagon',
                    description: 'A regular pentagon with its diagonals. The ratio of diagonal to side length is exactly \\(\\varphi\\). The inner pentagon creates another set of diagonals, repeating the pattern infinitely.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var depth = 3;

                        VizEngine.createSlider(controls, 'Nesting depth', 1, 6, depth, 1, function(v) {
                            depth = Math.round(v);
                            draw();
                        });

                        var phi = (1 + Math.sqrt(5)) / 2;

                        function pentagonPoints(cx, cy, r, rotation) {
                            var pts = [];
                            for (var i = 0; i < 5; i++) {
                                var angle = rotation + (2 * Math.PI / 5) * i - Math.PI / 2;
                                pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
                            }
                            return pts;
                        }

                        function drawPentagonLevel(cx, cy, r, rotation, level) {
                            if (level > depth || r < 2) return;

                            var pts = pentagonPoints(cx, cy, r, rotation);
                            var hue = (level * 60 + 200) % 360;
                            var alpha = Math.max(0.3, 1 - level * 0.15);

                            // Draw edges
                            ctx.strokeStyle = VizEngine.hsl(hue, 70, 55);
                            ctx.lineWidth = Math.max(0.5, 3 - level * 0.5);
                            ctx.globalAlpha = alpha;
                            ctx.beginPath();
                            for (var i = 0; i < 5; i++) {
                                var j = (i + 1) % 5;
                                ctx.moveTo(pts[i][0], pts[i][1]);
                                ctx.lineTo(pts[j][0], pts[j][1]);
                            }
                            ctx.stroke();

                            // Draw diagonals
                            ctx.strokeStyle = VizEngine.hsl((hue + 30) % 360, 50, 45);
                            ctx.lineWidth = Math.max(0.3, 1.5 - level * 0.3);
                            ctx.beginPath();
                            for (var i = 0; i < 5; i++) {
                                for (var j = i + 2; j < 5; j++) {
                                    if (j === (i + 4) % 5 + (i + 4 < 5 ? 0 : 0)) continue;
                                    ctx.moveTo(pts[i][0], pts[i][1]);
                                    ctx.lineTo(pts[j][0], pts[j][1]);
                                }
                            }
                            // Actually draw all diagonals
                            ctx.stroke();
                            ctx.beginPath();
                            for (var i = 0; i < 5; i++) {
                                var j = (i + 2) % 5;
                                ctx.moveTo(pts[i][0], pts[i][1]);
                                ctx.lineTo(pts[j][0], pts[j][1]);
                            }
                            ctx.stroke();

                            ctx.globalAlpha = 1;

                            // Inner pentagon: vertices are intersection points of diagonals
                            // The inner pentagon has radius r / (phi^2)
                            var innerR = r / (phi * phi);
                            var innerRot = rotation + Math.PI;
                            drawPentagonLevel(cx, cy, innerR, innerRot, level + 1);
                        }

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            var cx = w / 2, cy = h / 2;
                            var r = Math.min(w, h) * 0.38;

                            drawPentagonLevel(cx, cy, r, 0, 1);

                            // Labels
                            var pts = pentagonPoints(cx, cy, r, 0);
                            // Side length
                            var mx1 = (pts[0][0] + pts[1][0]) / 2;
                            var my1 = (pts[0][1] + pts[1][1]) / 2;
                            viz.screenText('side = 1', mx1 + 15, my1, viz.colors.text, 11, 'left');

                            // Diagonal
                            var mx2 = (pts[0][0] + pts[2][0]) / 2;
                            var my2 = (pts[0][1] + pts[2][1]) / 2;
                            viz.screenText('diagonal = \u03C6', mx2 + 10, my2, viz.colors.gold, 12, 'left');

                            viz.screenText('diagonal / side = \u03C6 \u2248 1.618', w / 2, h - 18, viz.colors.gold, 13);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(\\varphi^2 = \\varphi + 1\\). Then compute \\(\\varphi^3\\) and \\(\\varphi^4\\) in terms of \\(\\varphi\\) and whole numbers (hint: keep substituting \\(\\varphi^2 = \\varphi + 1\\)).',
                    hint: '\\(\\varphi^3 = \\varphi \\cdot \\varphi^2 = \\varphi(\\varphi + 1) = \\varphi^2 + \\varphi\\). Now substitute \\(\\varphi^2 = \\varphi + 1\\) again.',
                    solution: '\\(\\varphi^2 = \\varphi + 1\\) (given). \\(\\varphi^3 = \\varphi \\cdot \\varphi^2 = \\varphi(\\varphi + 1) = \\varphi^2 + \\varphi = (\\varphi + 1) + \\varphi = 2\\varphi + 1\\). \\(\\varphi^4 = \\varphi \\cdot \\varphi^3 = \\varphi(2\\varphi + 1) = 2\\varphi^2 + \\varphi = 2(\\varphi + 1) + \\varphi = 3\\varphi + 2\\). Notice: the coefficients are Fibonacci numbers! \\(\\varphi^n = F_n \\varphi + F_{n-1}\\).'
                },
                {
                    question: 'The golden ratio satisfies \\(\\varphi = 1 + \\frac{1}{\\varphi}\\). What number do you get if you start with a guess (say 2) and repeatedly compute \\(x \\to 1 + \\frac{1}{x}\\)? Try 10 iterations.',
                    hint: 'Start: \\(x_0 = 2\\). Then \\(x_1 = 1 + 1/2 = 1.5\\). Then \\(x_2 = 1 + 1/1.5 = 1.6\\overline{6}\\). Continue...',
                    solution: '\\(x_0 = 2, x_1 = 1.500, x_2 = 1.667, x_3 = 1.600, x_4 = 1.625, x_5 = 1.615, x_6 = 1.619, x_7 = 1.618, ...\\) The iterates converge to \\(\\varphi \\approx 1.6180\\). This works because \\(\\varphi\\) is the unique positive fixed point of \\(f(x) = 1 + 1/x\\), and the iteration is a contraction.'
                }
            ]
        },

        // ===== Section 1: φ from Fibonacci =====
        {
            id: 'phi-from-fibonacci',
            title: '\u03C6 from Fibonacci',
            content: `
<h2>The Connection That Ties Everything Together</h2>

<p>In Chapter 1, we noticed that the ratios of consecutive Fibonacci numbers seem to approach a limit near 1.618. Now we can prove this and understand why.</p>

<p>Suppose the ratios \\(r_n = F_{n+1}/F_n\\) converge to some limit \\(L\\) as \\(n\\) goes to infinity. Since \\(F_{n+1} = F_n + F_{n-1}\\), we can divide both sides by \\(F_n\\):</p>

\\[\\frac{F_{n+1}}{F_n} = 1 + \\frac{F_{n-1}}{F_n} = 1 + \\frac{1}{F_n/F_{n-1}}\\]

<p>As \\(n \\to \\infty\\), the left side approaches \\(L\\), and \\(F_n/F_{n-1}\\) also approaches \\(L\\). So:</p>

\\[L = 1 + \\frac{1}{L}\\]

<p>Multiply by \\(L\\): \\(L^2 = L + 1\\). This is exactly the equation that defines \\(\\varphi\\)! So \\(L = \\varphi\\). The Fibonacci ratios converge to the golden ratio.</p>

<div class="env-block theorem">
<strong>Fibonacci Ratios Approach \\(\\varphi\\)</strong><br>
\\[\\lim_{n \\to \\infty} \\frac{F_{n+1}}{F_n} = \\varphi = \\frac{1 + \\sqrt{5}}{2}\\]
The convergence is rapid: by \\(n = 10\\), the ratio is accurate to 5 decimal places.
</div>

<h3>How Fast Does It Converge?</h3>

<p>Let us track the convergence:</p>

<table style="margin:auto; border-collapse:collapse; color:#c9d1d9;">
<tr style="border-bottom:1px solid #30363d;"><th style="padding:6px 14px;">n</th><th style="padding:6px 14px;">\\(F_{n+1}/F_n\\)</th><th style="padding:6px 14px;">Error</th></tr>
<tr><td style="padding:4px 14px;text-align:center;">1</td><td style="padding:4px 14px;">1.000000</td><td style="padding:4px 14px;">0.618034</td></tr>
<tr><td style="padding:4px 14px;text-align:center;">2</td><td style="padding:4px 14px;">2.000000</td><td style="padding:4px 14px;">0.381966</td></tr>
<tr><td style="padding:4px 14px;text-align:center;">3</td><td style="padding:4px 14px;">1.500000</td><td style="padding:4px 14px;">0.118034</td></tr>
<tr><td style="padding:4px 14px;text-align:center;">5</td><td style="padding:4px 14px;">1.600000</td><td style="padding:4px 14px;">0.018034</td></tr>
<tr><td style="padding:4px 14px;text-align:center;">8</td><td style="padding:4px 14px;">1.619048</td><td style="padding:4px 14px;">0.001014</td></tr>
<tr><td style="padding:4px 14px;text-align:center;">10</td><td style="padding:4px 14px;">1.618056</td><td style="padding:4px 14px;">0.000022</td></tr>
<tr><td style="padding:4px 14px;text-align:center;">15</td><td style="padding:4px 14px;">1.618034</td><td style="padding:4px 14px;">0.0000001</td></tr>
</table>

<p>The error roughly gets multiplied by 0.38 with each step (which is \\(1/\\varphi^2\\)). By the 15th ratio, you have the golden ratio to 7 decimal places.</p>

<div class="viz-placeholder" data-viz="ch02-fib-ratio-visual"></div>

<h3>Not Just Fibonacci</h3>

<p>Here is an even more remarkable fact. Start with <em>any</em> two positive numbers, not just 1 and 1. Say, 3 and 7. Build a "Fibonacci-like" sequence by always adding the last two:</p>

<p style="text-align:center; color:#3fb9a0;">3, 7, 10, 17, 27, 44, 71, 115, 186, 301, ...</p>

<p>Compute the ratios: 7/3 = 2.333, 10/7 = 1.429, 17/10 = 1.700, 27/17 = 1.588, 44/27 = 1.630, 71/44 = 1.614, 115/71 = 1.620, 186/115 = 1.617, 301/186 = 1.618...</p>

<p>They converge to \\(\\varphi\\) again! The golden ratio is not a property of the specific starting values 1, 1. It is a property of the <em>recurrence rule</em> \\(x_{n} = x_{n-1} + x_{n-2}\\). No matter where you start, the ratio always settles down to \\(\\varphi\\). Mathematicians say \\(\\varphi\\) is an <strong>attractor</strong> of the Fibonacci recurrence.</p>

<div class="env-block intuition">
<strong>Why is \\(\\varphi\\) an attractor?</strong><br>
The Fibonacci recurrence has two "eigensolutions": \\(\\varphi^n\\) and \\(\\hat{\\varphi}^n\\) where \\(\\hat{\\varphi} = (1-\\sqrt{5})/2 \\approx -0.618\\). Any starting pair gives a combination \\(A\\varphi^n + B\\hat{\\varphi}^n\\). Since \\(|\\hat{\\varphi}| &lt; 1\\), the second term vanishes as \\(n\\) grows, and the ratio of consecutive terms approaches \\(\\varphi^{n+1}/\\varphi^n = \\varphi\\). The golden ratio wins because it is the dominant eigenvalue.
</div>
`,
            visualizations: [
                {
                    id: 'ch02-fib-ratio-visual',
                    title: 'Custom Fibonacci Ratio Convergence',
                    description: 'Start with any two numbers and watch the ratios converge to \\(\\varphi\\). Try starting with 1 and 100, or 47 and 3, or anything you like.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var a = 1, b = 1;
                        var phi = (1 + Math.sqrt(5)) / 2;

                        VizEngine.createSlider(controls, 'Start a', 1, 50, a, 1, function(v) {
                            a = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Start b', 1, 50, b, 1, function(v) {
                            b = Math.round(v);
                            draw();
                        });

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            // Generate sequence
                            var seq = [a, b];
                            for (var i = 2; i < 18; i++) seq.push(seq[i-1] + seq[i-2]);

                            var ratios = [];
                            for (var i = 1; i < seq.length; i++) ratios.push(seq[i] / seq[i-1]);

                            var margin = { left: 55, right: 25, top: 45, bottom: 45 };
                            var graphW = w - margin.left - margin.right;
                            var graphH = h - margin.top - margin.bottom;

                            // Y range: dynamic
                            var yMin = Math.min(phi - 0.5, Math.min.apply(null, ratios) - 0.1);
                            var yMax = Math.max(phi + 0.5, Math.max.apply(null, ratios) + 0.1);

                            function toY(val) { return margin.top + graphH * (1 - (val - yMin) / (yMax - yMin)); }
                            function toX(idx) { return margin.left + (idx / (ratios.length - 1)) * graphW; }

                            // Grid
                            ctx.strokeStyle = '#1a1a40';
                            ctx.lineWidth = 0.5;
                            for (var y = Math.ceil(yMin * 5) / 5; y <= yMax; y += 0.2) {
                                var sy = toY(y);
                                if (sy > margin.top && sy < h - margin.bottom) {
                                    ctx.beginPath(); ctx.moveTo(margin.left, sy); ctx.lineTo(w - margin.right, sy); ctx.stroke();
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'right';
                                    ctx.fillText(y.toFixed(1), margin.left - 6, sy + 4);
                                }
                            }

                            // phi line
                            var phiY = toY(phi);
                            ctx.strokeStyle = viz.colors.gold;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([8, 4]);
                            ctx.beginPath();
                            ctx.moveTo(margin.left, phiY);
                            ctx.lineTo(w - margin.right, phiY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('\u03C6 \u2248 1.618', w - margin.right - 50, phiY - 12, viz.colors.gold, 11);

                            // Plot line
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i < ratios.length; i++) {
                                var sx = toX(i), sy = toY(ratios[i]);
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Points
                            for (var i = 0; i < ratios.length; i++) {
                                var sx = toX(i), sy = toY(ratios[i]);
                                ctx.fillStyle = Math.abs(ratios[i] - phi) < 0.01 ? viz.colors.gold : viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(sx, sy, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Title
                            viz.screenText('Sequence starting: ' + a + ', ' + b + ', ' + seq[2] + ', ' + seq[3] + ', ...', w / 2, 20, viz.colors.white, 13);
                            viz.screenText('Final ratio: ' + ratios[ratios.length - 1].toFixed(10), w / 2, h - 12, viz.colors.teal, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Start a Fibonacci-like sequence with the numbers 2 and 5. Compute the first 10 terms and the first 8 ratios. How quickly do the ratios approach \\(\\varphi\\)?',
                    hint: 'The sequence begins 2, 5, 7, 12, 19, ... The ratios are 5/2 = 2.5, 7/5 = 1.4, 12/7 = 1.714, ...',
                    solution: 'Sequence: 2, 5, 7, 12, 19, 31, 50, 81, 131, 212. Ratios: 2.500, 1.400, 1.714, 1.583, 1.632, 1.613, 1.620, 1.617. By the 8th ratio, we are within 0.001 of \\(\\varphi\\). The convergence is fast regardless of starting values.'
                },
                {
                    question: 'We showed that \\(L = 1 + 1/L\\) implies \\(L = \\varphi\\). But the equation \\(L^2 = L + 1\\) has <em>two</em> solutions. What is the other one, and why do we discard it?',
                    hint: 'Use the quadratic formula on \\(L^2 - L - 1 = 0\\).',
                    solution: 'The two solutions are \\(L = \\frac{1+\\sqrt{5}}{2} \\approx 1.618\\) and \\(L = \\frac{1-\\sqrt{5}}{2} \\approx -0.618\\). We discard the negative root because Fibonacci ratios are ratios of positive numbers, so the limit must be positive. (However, the negative root is precisely \\(\\hat{\\varphi}\\) from Binet\'s formula, so it is not meaningless; it plays a hidden role in the exact formula.)'
                },
                {
                    question: 'What happens if you start a "Fibonacci-like" sequence with 1 and \\(-1\\)? Compute the first 10 terms. Do the ratios still converge to \\(\\varphi\\)?',
                    hint: 'The sequence is 1, -1, 0, -1, -1, -2, -3, ... What happens when you divide by zero?',
                    solution: 'Sequence: 1, -1, 0, -1, -1, -2, -3, -5, -8, -13. Ratios: -1, 0, undefined (division by zero!), 1, 2, 1.5, 1.667, 1.6, 1.625. After the hiccup at position 3, the ratios do approach \\(\\varphi\\). The golden ratio is a very robust attractor; even negative starting values eventually lead to it (in absolute value).'
                }
            ]
        },

        // ===== Section 2: The Golden Rectangle =====
        {
            id: 'golden-rectangle',
            title: 'The Golden Rectangle',
            content: `
<h2>The Rectangle That Regenerates Itself</h2>

<p>A <strong>golden rectangle</strong> is a rectangle whose sides are in the ratio \\(\\varphi : 1\\), approximately 1.618 : 1. What makes it special is a remarkable self-similar property: if you remove a square from one end (a square whose side equals the shorter dimension of the rectangle), the remaining piece is another golden rectangle, just smaller.</p>

<div class="env-block definition">
<strong>Golden Rectangle</strong><br>
A rectangle with aspect ratio \\(\\varphi : 1\\). Removing the largest possible square from one end leaves a smaller golden rectangle. This process can continue infinitely, spiraling inward.
</div>

<p>Let us verify this. If the rectangle has dimensions \\(\\varphi \\times 1\\), removing a \\(1 \\times 1\\) square leaves a rectangle of dimensions \\(1 \\times (\\varphi - 1)\\). The ratio of the new rectangle is:</p>

\\[\\frac{1}{\\varphi - 1}\\]

<p>Now, since \\(\\varphi = 1 + 1/\\varphi\\), we can rearrange to get \\(\\varphi - 1 = 1/\\varphi\\). So:</p>

\\[\\frac{1}{\\varphi - 1} = \\frac{1}{1/\\varphi} = \\varphi\\]

<p>The remaining rectangle has the same aspect ratio as the original. This is the <em>only</em> rectangle with this property (among rectangles with aspect ratio greater than 1).</p>

<h3>Is It Really the "Most Beautiful" Rectangle?</h3>

<p>You may have heard the claim that the golden rectangle is the most aesthetically pleasing rectangle, based on psychological experiments by Gustav Fechner in the 1870s. Fechner showed people a set of rectangles and asked which one they found most attractive. The golden rectangle was the most popular choice.</p>

<p>Modern researchers have tried to replicate these experiments with mixed results. The preference for golden rectangles is real but weak; many people prefer squarer or wider rectangles. The "golden rectangle is the most beautiful" claim is an overstatement. It is a pleasant shape, but not overwhelmingly preferred over, say, a 3:2 or 5:3 rectangle.</p>

<p>What is genuinely special about the golden rectangle is its mathematics: the self-similar property, the connection to the Fibonacci spiral, and the way it arises from the simplest possible self-referential proportion.</p>

<div class="viz-placeholder" data-viz="ch02-rectangle-explorer"></div>

<h3>Golden Rectangles in Design</h3>

<p>Whether or not the golden rectangle is objectively "the most beautiful," it does appear frequently in design. Credit cards, business cards, and many book covers have proportions close to the golden ratio. The iPod (original) was famously close to a golden rectangle. Many photographers use the "rule of thirds," which creates divisions near the golden ratio.</p>

<p>But here is the honest truth: most of these cases are approximate at best. A credit card (85.6 &times; 53.98 mm) has a ratio of about 1.586, which is closer to 8/5 = 1.6 than to \\(\\varphi \\approx 1.618\\). Many claims of golden-ratio design are retroactive pattern-matching, not intentional design. The lesson: be skeptical about golden-ratio sightings, but appreciate the genuine mathematical beauty of the number itself.</p>
`,
            visualizations: [
                {
                    id: 'ch02-rectangle-explorer',
                    title: 'Rectangle Proportion Explorer',
                    description: 'Adjust the aspect ratio and "feel" for yourself which rectangle looks best. The golden ratio is marked for reference. Remove squares to see the self-similar property.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var ratio = 1.618;
                        var showSubdivision = false;
                        var phi = (1 + Math.sqrt(5)) / 2;

                        VizEngine.createSlider(controls, 'Ratio', 1.0, 3.0, ratio, 0.01, function(v) {
                            ratio = v;
                            draw();
                        });

                        VizEngine.createButton(controls, 'Set to \u03C6', function() {
                            ratio = phi;
                            var sliders = controls.querySelectorAll('.viz-slider');
                            if (sliders[0]) {
                                sliders[0].value = phi;
                                var vals = controls.querySelectorAll('.viz-slider-value');
                                if (vals[0]) vals[0].textContent = phi.toFixed(1);
                            }
                            draw();
                        });

                        VizEngine.createButton(controls, 'Toggle Subdivide', function() {
                            showSubdivision = !showSubdivision;
                            draw();
                        });

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            // Draw the rectangle
                            var maxW = w - 80;
                            var maxH = h - 100;
                            var rectH, rectW;
                            if (ratio * maxH > maxW) {
                                rectW = maxW;
                                rectH = maxW / ratio;
                            } else {
                                rectH = maxH;
                                rectW = maxH * ratio;
                            }

                            var x0 = (w - rectW) / 2;
                            var y0 = (h - rectH) / 2 + 10;

                            // Is it golden?
                            var isGolden = Math.abs(ratio - phi) < 0.02;
                            var borderColor = isGolden ? viz.colors.gold : viz.colors.blue;

                            ctx.strokeStyle = borderColor;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(x0, y0, rectW, rectH);

                            if (showSubdivision && ratio > 1.05) {
                                // Subdivide: remove squares recursively
                                var cx = x0, cy = y0, cw = rectW, ch = rectH;
                                var maxIter = 8;
                                var hues = [200, 120, 45, 300, 30, 160, 340, 220];

                                for (var iter = 0; iter < maxIter; iter++) {
                                    if (cw < 3 || ch < 3) break;
                                    var isHoriz = cw >= ch;
                                    var sqSize = isHoriz ? ch : cw;

                                    ctx.fillStyle = VizEngine.hsl(hues[iter % hues.length], 35, 18);
                                    ctx.strokeStyle = VizEngine.hsl(hues[iter % hues.length], 60, 50);
                                    ctx.lineWidth = 1.5;

                                    if (isHoriz) {
                                        ctx.fillRect(cx, cy, sqSize, sqSize);
                                        ctx.strokeRect(cx, cy, sqSize, sqSize);

                                        // Draw quarter arc
                                        ctx.strokeStyle = viz.colors.gold;
                                        ctx.lineWidth = 2;
                                        ctx.beginPath();
                                        var acx, acy, startA, endA;
                                        if (iter % 4 === 0) { acx = cx + sqSize; acy = cy + sqSize; startA = Math.PI; endA = 1.5 * Math.PI; }
                                        else if (iter % 4 === 1) { acx = cx; acy = cy + sqSize; startA = 1.5 * Math.PI; endA = 2 * Math.PI; }
                                        else if (iter % 4 === 2) { acx = cx; acy = cy; startA = 0; endA = 0.5 * Math.PI; }
                                        else { acx = cx + sqSize; acy = cy; startA = 0.5 * Math.PI; endA = Math.PI; }
                                        ctx.arc(acx, acy, sqSize, startA, endA);
                                        ctx.stroke();

                                        cx += sqSize;
                                        cw -= sqSize;
                                    } else {
                                        ctx.fillRect(cx, cy, sqSize, sqSize);
                                        ctx.strokeRect(cx, cy, sqSize, sqSize);
                                        cy += sqSize;
                                        ch -= sqSize;
                                    }
                                }
                            }

                            // Label
                            var label = 'Ratio: ' + ratio.toFixed(3);
                            if (isGolden) label += ' \u2248 \u03C6 (Golden!)';
                            viz.screenText(label, w / 2, 22, isGolden ? viz.colors.gold : viz.colors.white, 15);

                            // Reference ratios
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var refs = [
                                { r: 1.0, label: '1:1' },
                                { r: 1.414, label: '\u221A2' },
                                { r: 1.5, label: '3:2' },
                                { r: phi, label: '\u03C6' },
                                { r: 2.0, label: '2:1' }
                            ];
                            var barY = h - 25;
                            var barX0 = 60, barX1 = w - 60;
                            ctx.strokeStyle = '#2a2a50';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(barX0, barY);
                            ctx.lineTo(barX1, barY);
                            ctx.stroke();
                            for (var i = 0; i < refs.length; i++) {
                                var rx = barX0 + (refs[i].r - 1.0) / 2.0 * (barX1 - barX0);
                                ctx.fillStyle = Math.abs(refs[i].r - ratio) < 0.02 ? viz.colors.gold : viz.colors.text;
                                ctx.fillText(refs[i].label, rx, barY - 8);
                                ctx.fillRect(rx - 0.5, barY - 3, 1, 6);
                            }
                            // Current position
                            var curX = barX0 + (ratio - 1.0) / 2.0 * (barX1 - barX0);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(curX, barY, 4, 0, Math.PI * 2);
                            ctx.fill();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A4 paper (the international standard) has dimensions 210 &times; 297 mm. What is its aspect ratio? Is it close to the golden ratio? (Hint: A4 paper is actually designed around a different irrational number.)',
                    hint: 'Compute 297/210. Then compare with \\(\\varphi \\approx 1.618\\) and \\(\\sqrt{2} \\approx 1.414\\).',
                    solution: '297/210 = 1.414..., which is \\(\\sqrt{2}\\), not the golden ratio. A-series paper is designed so that cutting it in half produces two sheets of the next smaller size with the same aspect ratio. This requires \\(\\sqrt{2}\\), not \\(\\varphi\\). The self-similar property of A-series paper (cut in half) is different from the golden rectangle (cut off a square).'
                },
                {
                    question: 'The self-similar property says removing a square from a golden rectangle leaves a smaller golden rectangle. If you start with a golden rectangle of area 1, what is the area of the remaining golden rectangle after removing one square?',
                    hint: 'If the original rectangle is \\(\\varphi \\times 1\\) with area \\(\\varphi\\), scale so the area is 1. The square has side equal to the short side.',
                    solution: 'A golden rectangle with area 1 has dimensions \\(\\sqrt{\\varphi} \\times \\frac{1}{\\sqrt{\\varphi}}\\). Alternatively, think proportionally: the original is \\(\\varphi \\times 1\\) with area \\(\\varphi\\). The square is \\(1 \\times 1\\) with area 1. The remaining rectangle has area \\(\\varphi - 1 = 1/\\varphi \\approx 0.618\\). As a fraction of the original: \\(\\frac{\\varphi - 1}{\\varphi} = \\frac{1}{\\varphi^2} = \\frac{1}{\\varphi + 1} \\approx 0.382\\). So each subdivision removes about 61.8% of the area.'
                }
            ]
        },

        // ===== Section 3: Golden Spirals in Art & Nature =====
        {
            id: 'golden-spirals',
            title: 'Golden Spirals in Art & Nature',
            content: `
<h2>The Spiral That Connects Everything</h2>

<p>When you repeatedly subdivide a golden rectangle and draw quarter-circle arcs in the removed squares, you get the Fibonacci spiral that we built in Chapter 1. This spiral is a very close approximation to the true <strong>golden spiral</strong>, a logarithmic spiral that grows by a factor of \\(\\varphi\\) with each quarter turn.</p>

<div class="env-block definition">
<strong>Golden Spiral</strong><br>
A logarithmic spiral whose growth factor is \\(\\varphi^{2/\\pi}\\), meaning it grows by a factor of \\(\\varphi\\) for every 90-degree turn. In polar coordinates: \\(r = a \\cdot \\varphi^{2\\theta/\\pi}\\).
</div>

<h3>In Nature</h3>

<p>The golden spiral (or spirals very close to it) appears in a remarkable variety of natural settings:</p>

<p><strong>Nautilus shells.</strong> The chambered nautilus is the poster child for the golden spiral. As the animal grows, it adds new chambers to its shell. Each chamber is roughly \\(\\varphi\\) times the size of the previous one, and the chambers are arranged in a spiral. The result is a nearly perfect logarithmic spiral. (To be precise, the nautilus spiral has a growth factor slightly different from \\(\\varphi\\), typically around 1.33 per quarter turn rather than 1.618. But the Fibonacci spiral is a reasonable approximation.)</p>

<p><strong>Hurricanes.</strong> The cloud bands of a hurricane form a logarithmic spiral, shaped by the interplay of the Coriolis effect (which makes the wind curve) and the pressure gradient (which draws air inward). The exact growth factor depends on the storm, but the spiral structure is unmistakable.</p>

<p><strong>Galaxies.</strong> The arms of spiral galaxies follow logarithmic spirals. The Milky Way has spiral arms with a pitch angle of about 12 degrees, corresponding to a specific growth factor. Different galaxies have different pitch angles, but the logarithmic spiral shape is universal.</p>

<p><strong>Plants.</strong> As we discussed in Chapter 1, the golden angle (closely related to \\(\\varphi\\)) governs phyllotaxis, and the resulting seed arrangements trace out Fibonacci spirals.</p>

<h3>In Art and Architecture</h3>

<p>Artists have certainly been <em>inspired</em> by the golden spiral, even if claims of its deliberate historical use are often exaggerated:</p>

<ul>
<li><strong>Salvador Dali</strong> explicitly used the golden ratio in several paintings, including "The Sacrament of the Last Supper" (1955), where the scene is set inside a golden-rectangle frame with a dodecahedron (a solid built from pentagons, which are full of \\(\\varphi\\)).</li>
<li><strong>Le Corbusier</strong>, the modernist architect, developed a proportioning system called "Le Modulor" based on the golden ratio and the human body.</li>
<li><strong>Modern graphic design</strong> often uses golden-ratio grids to lay out logos and compositions. The Apple logo, the Twitter bird, and the Pepsi logo have all been analyzed (retroactively) for golden-ratio proportions.</li>
</ul>

<div class="viz-placeholder" data-viz="ch02-spiral-overlay"></div>

<div class="env-block warning">
<strong>The golden ratio myth industry</strong><br>
Be cautious with claims that specific artworks or buildings are "designed using the golden ratio." The Parthenon, the Great Pyramid, and the Mona Lisa are frequently cited, but careful measurement does not support these claims. The human tendency to see patterns where none exist (apophenia) is powerful, and the golden ratio is vague enough (any ratio between 1.5 and 1.7 "looks close") that confirmation bias runs rampant.
</div>
`,
            visualizations: [
                {
                    id: 'ch02-spiral-overlay',
                    title: 'Golden Spiral Explorer',
                    description: 'Watch how the golden spiral grows. Adjust the number of quarter-turns and compare the Fibonacci approximation (blue) with the true golden spiral (gold).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var turns = 4;
                        var showTrue = true;
                        var showFib = true;
                        var phi = (1 + Math.sqrt(5)) / 2;

                        VizEngine.createSlider(controls, 'Quarter turns', 1, 12, turns, 1, function(v) {
                            turns = Math.round(v);
                            draw();
                        });

                        VizEngine.createButton(controls, 'Toggle True Spiral', function() {
                            showTrue = !showTrue;
                            draw();
                        });

                        VizEngine.createButton(controls, 'Toggle Fibonacci', function() {
                            showFib = !showFib;
                            draw();
                        });

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            var cx = w * 0.45, cy = h * 0.5;
                            var baseR = 8;

                            // True golden spiral
                            if (showTrue) {
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var started = false;
                                var steps = turns * 100;
                                for (var i = 0; i <= steps; i++) {
                                    var theta = (i / steps) * turns * Math.PI / 2;
                                    var r = baseR * Math.pow(phi, 2 * theta / Math.PI);
                                    var x = cx + r * Math.cos(theta);
                                    var y = cy - r * Math.sin(theta);
                                    if (!started) { ctx.moveTo(x, y); started = true; }
                                    else ctx.lineTo(x, y);
                                }
                                ctx.stroke();
                            }

                            // Fibonacci spiral (quarter arcs)
                            if (showFib) {
                                var fib = [1, 1];
                                for (var i = 2; i < turns + 2; i++) fib.push(fib[i-1] + fib[i-2]);

                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;

                                // Build squares and arcs (simplified)
                                var arcCx = cx, arcCy = cy;
                                var scale = baseR;

                                for (var q = 0; q < turns && q < fib.length; q++) {
                                    var r = fib[q] * scale;
                                    var startAngle, endAngle;
                                    var dir = q % 4;

                                    if (dir === 0) {
                                        startAngle = Math.PI;
                                        endAngle = Math.PI / 2;
                                    } else if (dir === 1) {
                                        startAngle = Math.PI / 2;
                                        endAngle = 0;
                                    } else if (dir === 2) {
                                        startAngle = 0;
                                        endAngle = -Math.PI / 2;
                                    } else {
                                        startAngle = -Math.PI / 2;
                                        endAngle = -Math.PI;
                                    }

                                    ctx.beginPath();
                                    ctx.arc(arcCx, arcCy, r, startAngle, endAngle, true);
                                    ctx.stroke();

                                    // Move center for next arc
                                    var nextR = q + 1 < fib.length ? fib[q + 1] * scale : r * phi;
                                    if (dir === 0) { arcCx += 0; arcCy -= fib[q] * scale; }
                                    else if (dir === 1) { arcCx += fib[q] * scale; arcCy += 0; }
                                    else if (dir === 2) { arcCx += 0; arcCy += fib[q] * scale; }
                                    else { arcCx -= fib[q] * scale; arcCy += 0; }
                                }
                            }

                            // Legend
                            if (showTrue) {
                                ctx.fillStyle = viz.colors.gold;
                                ctx.fillRect(15, 15, 14, 3);
                                viz.screenText('True golden spiral', 90, 18, viz.colors.gold, 11, 'left');
                            }
                            if (showFib) {
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(15, 32, 14, 3);
                                viz.screenText('Fibonacci approximation', 90, 35, viz.colors.blue, 11, 'left');
                            }

                            viz.screenText('Quarter turns: ' + turns, w / 2, h - 15, viz.colors.text, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The nautilus shell\'s actual growth factor per quarter turn is about 1.33, not \\(\\varphi \\approx 1.618\\). Calculate: after a full turn (360\u00B0 = 4 quarter turns), how much does the nautilus shell grow? How much would a true golden spiral grow?',
                    hint: 'The growth per full turn is the quarter-turn growth factor raised to the 4th power.',
                    solution: 'Nautilus: \\(1.33^4 \\approx 3.13\\), so the shell roughly triples in size per full turn. Golden spiral: \\(\\varphi^4 \\approx 6.85\\), so it would grow nearly sevenfold per turn. The golden spiral grows much faster than a real nautilus. The nautilus is a logarithmic spiral, but not a golden one. This is a case where the popular claim ("nautilus = golden spiral") is not quite right.'
                },
                {
                    question: 'A photographer uses the "rule of thirds," placing key elements at 1/3 and 2/3 of the frame. How does this compare to the golden ratio division, which would place elements at approximately 1/\\(\\varphi\\) and 1 - 1/\\(\\varphi\\) of the frame?',
                    hint: 'Compute \\(1/\\varphi \\approx 0.618\\) and \\(1/3 \\approx 0.333\\). Where would each place a focal point?',
                    solution: '\\(1/\\varphi \\approx 0.618\\) and \\(1 - 1/\\varphi \\approx 0.382\\). The rule of thirds places elements at 0.333 and 0.667. The golden ratio places them at 0.382 and 0.618. These are different! The golden ratio division is closer to the center. In practice, both are rough guidelines, and the difference is subtle. But they are not the same rule, despite often being conflated.'
                }
            ]
        },

        // ===== Section 4: φ — The Most Irrational Number =====
        {
            id: 'most-irrational',
            title: '\u03C6 — The Most Irrational Number',
            content: `
<h2>What Does "Most Irrational" Even Mean?</h2>

<p>We know that \\(\\varphi\\) is irrational: its decimal expansion 1.6180339887... never terminates or repeats. But so are \\(\\sqrt{2}\\), \\(\\pi\\), and \\(e\\). What makes \\(\\varphi\\) special among irrationals?</p>

<p>The answer lies in <strong>continued fractions</strong>, one of the most beautiful ideas in number theory.</p>

<h3>Continued Fractions: A Brief Tour</h3>

<p>Any real number can be written as a continued fraction. For example:</p>

\\[\\pi = 3 + \\cfrac{1}{7 + \\cfrac{1}{15 + \\cfrac{1}{1 + \\cfrac{1}{292 + \\cdots}}}}\\]

<p>The numbers 3, 7, 15, 1, 292, ... are called the "partial quotients" of \\(\\pi\\). The bigger a partial quotient is, the better the previous convergent approximates the number. The 292 in \\(\\pi\\)'s expansion explains why the fraction 355/113 is such an amazingly good approximation (it is accurate to 6 decimal places).</p>

<p>Now here is the continued fraction for \\(\\varphi\\):</p>

\\[\\varphi = 1 + \\cfrac{1}{1 + \\cfrac{1}{1 + \\cfrac{1}{1 + \\cfrac{1}{1 + \\cdots}}}}\\]

<p>Every partial quotient is 1. The smallest possible. There are no large numbers anywhere in the expansion, which means there are no especially good rational approximations at any point. Every convergent is "equally bad" (or equally good). The number \\(\\varphi\\) resists rational approximation more stubbornly than any other irrational number.</p>

<div class="env-block theorem">
<strong>\\(\\varphi\\) Is the "Hardest to Approximate" Irrational</strong><br>
Among all irrational numbers, \\(\\varphi\\) is the worst approximated by rational numbers, in the following precise sense: the continued fraction convergents of \\(\\varphi\\) approach it more slowly than for any other irrational number. Its continued fraction \\([1; 1, 1, 1, \\ldots]\\) has the smallest possible partial quotients.
</div>

<h3>The Convergents Are Fibonacci Ratios</h3>

<p>What are the convergents (the "best rational approximations") of \\(\\varphi\\)? Let us compute them from the continued fraction:</p>

\\[1, \\quad \\frac{2}{1}, \\quad \\frac{3}{2}, \\quad \\frac{5}{3}, \\quad \\frac{8}{5}, \\quad \\frac{13}{8}, \\quad \\frac{21}{13}, \\quad \\frac{34}{21}, \\quad \\ldots\\]

<p>These are exactly the ratios of consecutive Fibonacci numbers! The Fibonacci sequence is not just related to \\(\\varphi\\); it provides the <em>best possible rational approximations</em> to \\(\\varphi\\), and these approximations improve at the slowest possible rate for any irrational number.</p>

<p>This is why \\(\\varphi\\) appears in nature. When a plant needs to avoid alignments (to spread leaves evenly or pack seeds tightly), the worst thing it can do is use a rational angle (which creates lines). The best thing is to use the <em>most irrational</em> angle, the golden angle, which avoids all rational alignments as effectively as possible. \\(\\varphi\\) is nature's answer to the question: "What angle creates the least pattern?"</p>

<div class="viz-placeholder" data-viz="ch02-continued-fraction"></div>

<h3>An Infinite Nesting of Beauty</h3>

<p>The golden ratio can also be expressed as an infinite nested radical:</p>

\\[\\varphi = \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\cdots}}}}\\]

<p>To verify: if \\(x = \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\cdots}}}\\), then \\(x = \\sqrt{1 + x}\\), so \\(x^2 = 1 + x\\), giving \\(x = \\varphi\\).</p>

<p>And as an infinite continued fraction:</p>

\\[\\varphi = 1 + \\cfrac{1}{1 + \\cfrac{1}{1 + \\cfrac{1}{\\ddots}}}\\]

<p>If \\(x = 1 + \\frac{1}{1 + \\frac{1}{1 + \\cdots}}\\), then \\(x = 1 + \\frac{1}{x}\\), so \\(x^2 = x + 1\\), giving \\(x = \\varphi\\).</p>

<p>In both cases, the golden ratio emerges as the fixed point of the simplest possible self-referential expression. It is the number that satisfies \\(x^2 = x + 1\\), which is the algebraic equivalent of a hall of mirrors: a structure that contains a copy of itself.</p>

<div class="env-block remark">
<strong>The end of the beginning</strong><br>
The golden ratio connects to Fibonacci numbers, to continued fractions, to phyllotaxis, to the geometry of pentagons, and to deep questions in number theory. We have only scratched the surface. In Chapter 3 (Pascal's Triangle), we will discover that the Fibonacci numbers are hidden inside another famous mathematical object, and the connections will deepen further.
</div>
`,
            visualizations: [
                {
                    id: 'ch02-continued-fraction',
                    title: 'Continued Fraction Convergence',
                    description: 'Watch the continued fraction convergents (Fibonacci ratios) approach \\(\\varphi\\), alternating above and below. Compare with how quickly \\(\\pi\\)\'s convergents approach \\(\\pi\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var phi = (1 + Math.sqrt(5)) / 2;
                        var showPhi = true;
                        var showPi = false;
                        var nTerms = 10;

                        // Fibonacci convergents to phi
                        var fib = [1, 1];
                        for (var i = 2; i <= 16; i++) fib.push(fib[i-1] + fib[i-2]);
                        var phiConv = [];
                        for (var i = 0; i < 15; i++) phiConv.push({ num: fib[i+1], den: fib[i], val: fib[i+1] / fib[i] });

                        // Pi convergents
                        var piConv = [
                            { num: 3, den: 1, val: 3 },
                            { num: 22, den: 7, val: 22/7 },
                            { num: 333, den: 106, val: 333/106 },
                            { num: 355, den: 113, val: 355/113 },
                            { num: 103993, den: 33102, val: 103993/33102 }
                        ];

                        VizEngine.createSlider(controls, 'Terms', 2, 12, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        VizEngine.createButton(controls, 'Show \u03C6', function() {
                            showPhi = true; showPi = false; draw();
                        });

                        VizEngine.createButton(controls, 'Show \u03C0', function() {
                            showPhi = false; showPi = true; draw();
                        });

                        VizEngine.createButton(controls, 'Compare Both', function() {
                            showPhi = true; showPi = true; draw();
                        });

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            var margin = { left: 60, right: 30, top: 55, bottom: 45 };
                            var graphW = w - margin.left - margin.right;
                            var graphH = h - margin.top - margin.bottom;

                            // Plot log10(error) vs n
                            function toX(n) { return margin.left + (n / Math.max(nTerms, 3)) * graphW; }
                            function toY(logErr) {
                                var yMin = -16, yMax = 0;
                                return margin.top + graphH * (1 - (logErr - yMin) / (yMax - yMin));
                            }

                            // Grid
                            ctx.strokeStyle = '#1a1a40';
                            ctx.lineWidth = 0.5;
                            for (var y = -14; y <= 0; y += 2) {
                                var sy = toY(y);
                                ctx.beginPath(); ctx.moveTo(margin.left, sy); ctx.lineTo(w - margin.right, sy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText('10^' + y, margin.left - 6, sy + 4);
                            }

                            // X axis labels
                            for (var n = 1; n <= nTerms; n++) {
                                viz.screenText('' + n, toX(n), h - margin.bottom + 18, viz.colors.text, 10);
                            }
                            viz.screenText('Convergent #', w / 2, h - 8, viz.colors.text, 11);
                            viz.screenText('Approximation error (log scale)', w / 2, margin.top - 35, viz.colors.white, 13);

                            if (showPhi) {
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i < nTerms && i < phiConv.length; i++) {
                                    var err = Math.abs(phiConv[i].val - phi);
                                    if (err === 0) err = 1e-16;
                                    var logErr = Math.log10(err);
                                    var sx = toX(i + 1), sy = toY(logErr);
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                                for (var i = 0; i < nTerms && i < phiConv.length; i++) {
                                    var err = Math.abs(phiConv[i].val - phi);
                                    if (err === 0) err = 1e-16;
                                    var logErr = Math.log10(err);
                                    var sx = toX(i + 1), sy = toY(logErr);
                                    ctx.fillStyle = viz.colors.gold;
                                    ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2); ctx.fill();
                                    if (i < 6) {
                                        viz.screenText(phiConv[i].num + '/' + phiConv[i].den, sx, sy - 12, viz.colors.gold, 9);
                                    }
                                }
                            }

                            if (showPi) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                var maxPi = Math.min(nTerms, piConv.length);
                                for (var i = 0; i < maxPi; i++) {
                                    var err = Math.abs(piConv[i].val - Math.PI);
                                    if (err === 0) err = 1e-16;
                                    var logErr = Math.log10(err);
                                    var sx = toX(i + 1), sy = toY(logErr);
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                                for (var i = 0; i < maxPi; i++) {
                                    var err = Math.abs(piConv[i].val - Math.PI);
                                    if (err === 0) err = 1e-16;
                                    var logErr = Math.log10(err);
                                    var sx = toX(i + 1), sy = toY(logErr);
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2); ctx.fill();
                                    viz.screenText(piConv[i].num + '/' + piConv[i].den, sx, sy - 12, viz.colors.teal, 9);
                                }
                            }

                            // Legend
                            if (showPhi) {
                                ctx.fillStyle = viz.colors.gold;
                                ctx.fillRect(w - 180, 15, 14, 3);
                                viz.screenText('\u03C6 convergents', w - 100, 18, viz.colors.gold, 11);
                            }
                            if (showPi) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillRect(w - 180, 32, 14, 3);
                                viz.screenText('\u03C0 convergents', w - 100, 35, viz.colors.teal, 11);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the first 5 convergents of \\(\\varphi\\)\'s continued fraction \\([1; 1, 1, 1, 1, \\ldots]\\) and verify they are Fibonacci ratios.',
                    hint: 'A continued fraction \\([a_0; a_1, a_2, \\ldots]\\) has convergents \\(a_0\\), \\(a_0 + 1/a_1\\), \\(a_0 + 1/(a_1 + 1/a_2)\\), etc.',
                    solution: 'Convergent 1: 1/1 = 1. Convergent 2: 1 + 1/1 = 2/1. Convergent 3: 1 + 1/(1 + 1/1) = 1 + 1/2 = 3/2. Convergent 4: 1 + 1/(1 + 1/(1+1/1)) = 1 + 1/(1+1/2) = 1 + 1/(3/2) = 1 + 2/3 = 5/3. Convergent 5: 8/5. These are 1/1, 2/1, 3/2, 5/3, 8/5, which are ratios of consecutive Fibonacci numbers.'
                },
                {
                    question: '355/113 approximates \\(\\pi\\) to 6 decimal places, while 8/5 approximates \\(\\varphi\\) only to 2 decimal places. Both are the 4th convergent of their respective continued fractions. Why is the \\(\\pi\\) approximation so much better?',
                    hint: 'Look at the partial quotients. For \\(\\pi\\): [3; 7, 15, 1, 292, ...]. For \\(\\varphi\\): [1; 1, 1, 1, 1, ...]. The big number 292 in \\(\\pi\\)\'s expansion is the key.',
                    solution: 'The large partial quotient 292 in \\(\\pi\\)\'s continued fraction means that the next convergent barely changes the value, so 355/113 is an exceptionally good approximation. In contrast, \\(\\varphi\\)\'s partial quotients are all 1 (the smallest possible), so each convergent only slightly improves the approximation. This is precisely why \\(\\varphi\\) is the "most irrational" number: it has no unusually good rational approximations at any point.'
                },
                {
                    question: 'Verify that \\(\\varphi = \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\cdots}}}\\) by computing the first 10 iterates: start with \\(x_0 = 1\\) and repeatedly compute \\(x_{n+1} = \\sqrt{1 + x_n}\\).',
                    hint: 'Use a calculator. \\(x_1 = \\sqrt{2} \\approx 1.414\\), \\(x_2 = \\sqrt{1 + 1.414} \\approx 1.554\\), ...',
                    solution: '\\(x_0 = 1.000, x_1 = 1.414, x_2 = 1.554, x_3 = 1.598, x_4 = 1.612, x_5 = 1.616, x_6 = 1.617, x_7 = 1.618, x_8 = 1.6180, x_9 = 1.61803\\). By the 9th iterate, we have \\(\\varphi\\) accurate to 4 decimal places. The convergence is geometric, with each step reducing the error by roughly a factor of \\(1/(2\\varphi) \\approx 0.31\\).'
                }
            ]
        }
    ]
});
})();
