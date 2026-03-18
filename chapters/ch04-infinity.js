// === Chapter 4: What Is Infinity? ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch04',
        number: 4,
        title: 'What Is Infinity?',
        subtitle: 'A journey to the edge of thought, where counting never stops and paradoxes become truth',

        sections: [
            // ============================================================
            // Section 1: Counting Forever
            // ============================================================
            {
                id: 'counting-forever',
                title: 'Counting Forever',
                content: `
<h2>The Number That Is Not a Number</h2>

<p>Start counting: 1, 2, 3, 4, 5, ... Will you ever finish? Obviously not. No matter how large a number you reach, you can always add 1 to get a larger one. There is no "biggest number." This observation is so simple that a child can grasp it, yet its implications have puzzled and delighted mathematicians for over two thousand years.</p>

<p>The concept of <strong>infinity</strong> is the mathematical response to this unending-ness. But here is the first surprise: infinity is <em>not a number</em>. You cannot find it on the number line. You cannot reach it by counting. It is, instead, a <em>concept</em>, a description of a process that has no end.</p>

<div class="env-block definition">
<strong>Potential Infinity</strong><br>
The idea that a process can continue without bound. "For any number \\(N\\) you name, I can name a larger one." This does not require that infinity itself "exists" as an object; it only says that no finite number is the last.
</div>

<p>The ancient Greeks struggled with this. Aristotle distinguished between <em>potential infinity</em> (a process that never ends) and <em>actual infinity</em> (a completed infinite collection). He accepted the first but firmly rejected the second. For him, infinity was a journey, never a destination.</p>

<p>It took until the 19th century for Georg Cantor to break through this barrier. We will meet his revolutionary ideas in the next two chapters. For now, let us build our intuition about what infinity <em>feels</em> like.</p>

<div class="viz-placeholder" data-viz="number-line-zoom"></div>

<h3>Infinity is not just "a very large number"</h3>

<p>This is the most common misconception. A trillion is huge, but it is still finite. A googol (\\(10^{100}\\)) is unimaginably large, but still finite. Even a googolplex (\\(10^{10^{100}}\\)), a number so large that writing it out would require more digits than there are atoms in the observable universe, is <em>still finite</em>. Infinity is not "very big." It is a fundamentally different kind of thing.</p>

<div class="env-block warning">
<strong>Common trap</strong><br>
You cannot do ordinary arithmetic with infinity. Writing \\(\\infty + 1 = \\infty\\) is suggestive, but it is not a legitimate equation in the same sense as \\(3 + 1 = 4\\). It is shorthand for "adding 1 to an unending process still yields an unending process." Treating \\(\\infty\\) as a number leads to contradictions (such as "subtracting \\(\\infty\\) from both sides" to get \\(1 = 0\\)).
</div>

<h3>Infinity in everyday language</h3>

<p>We use "infinite" loosely in daily life: "there are infinite possibilities," "I have infinite patience." These are metaphors. In mathematics, infinity has precise meanings that vary by context: the infinity of the natural numbers, the infinity of the real numbers (which turns out to be a <em>larger</em> infinity, as Cantor discovered), the "point at infinity" in projective geometry, the infinities that appear in calculus limits. Each is rigorously defined, and they are not all the same.</p>

<p>In this chapter, we will focus on the most intuitive entry point: what happens when a process continues forever, and especially what happens when an <em>infinite sum</em> adds up to a finite number.</p>
`,
                visualizations: [
                    {
                        id: 'number-line-zoom',
                        title: 'The Number Line: Zoom In, Zoom Out',
                        description: 'Use the slider to zoom in or out on the number line. No matter how far you zoom out, there are always more numbers beyond the edges. No matter how far you zoom in, there are always more numbers between any two points.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 240, scale: 40, originX: 310, originY: 120 });
                            var zoomLevel = 1;

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var effectiveScale = viz.scale * zoomLevel;
                                var W = viz.width, H = viz.height;
                                var centerY = viz.originY;

                                // Draw the number line
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(0, centerY);
                                ctx.lineTo(W, centerY);
                                ctx.stroke();

                                // Arrows at both ends
                                ctx.fillStyle = viz.colors.axis;
                                ctx.beginPath();
                                ctx.moveTo(W - 2, centerY);
                                ctx.lineTo(W - 12, centerY - 5);
                                ctx.lineTo(W - 12, centerY + 5);
                                ctx.fill();
                                ctx.beginPath();
                                ctx.moveTo(2, centerY);
                                ctx.lineTo(12, centerY - 5);
                                ctx.lineTo(12, centerY + 5);
                                ctx.fill();

                                // Determine tick spacing
                                var range = W / effectiveScale;
                                var tickSpacing = 1;
                                if (range > 40) tickSpacing = 10;
                                else if (range > 20) tickSpacing = 5;
                                else if (range > 8) tickSpacing = 2;
                                else if (range < 0.5) tickSpacing = 0.1;
                                else if (range < 2) tickSpacing = 0.25;
                                else if (range < 4) tickSpacing = 0.5;

                                var minVal = -range / 2;
                                var maxVal = range / 2;
                                var start = Math.ceil(minVal / tickSpacing) * tickSpacing;

                                ctx.strokeStyle = viz.colors.text;
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.lineWidth = 1;

                                for (var v = start; v <= maxVal; v += tickSpacing) {
                                    var sx = W / 2 + v * effectiveScale;
                                    if (sx < 15 || sx > W - 15) continue;
                                    ctx.beginPath();
                                    ctx.moveTo(sx, centerY - 6);
                                    ctx.lineTo(sx, centerY + 6);
                                    ctx.stroke();
                                    var label = tickSpacing < 1 ? v.toFixed(2) : Math.round(v).toString();
                                    ctx.fillText(label, sx, centerY + 20);
                                }

                                // Origin dot
                                var originSx = W / 2;
                                if (originSx > 15 && originSx < W - 15) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(originSx, centerY, 4, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Labels
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Range: ' + minVal.toFixed(1) + ' to ' + maxVal.toFixed(1), 10, 20);
                                ctx.textAlign = 'right';
                                ctx.fillText('Zoom: ' + zoomLevel.toFixed(2) + 'x', W - 10, 20);

                                // "... continues forever" labels
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'italic 11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('\u2190 continues forever', 10, centerY - 16);
                                ctx.textAlign = 'right';
                                ctx.fillText('continues forever \u2192', W - 10, centerY - 16);
                            }

                            VizEngine.createSlider(controls, 'Zoom', 0.05, 5, 1, 0.05, function (v) {
                                zoomLevel = v;
                                draw();
                            });

                            draw();
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Is there a largest prime number? What does this tell us about infinity?',
                        hint: 'Euclid proved something about this over 2000 years ago. His proof is one of the most famous in all of mathematics.',
                        solution: 'No. Euclid proved that there are infinitely many primes. If you multiply all known primes together and add 1, the result is either a new prime or divisible by a prime you have not yet discovered. Either way, your list was incomplete. This is a beautiful example of potential infinity: no matter how many primes you have found, there is always another.'
                    },
                    {
                        question: 'Why is it dangerous to write \\(\\infty - \\infty = 0\\)?',
                        hint: 'Consider the "sum" \\((1 + 2 + 3 + \\cdots) - (1 + 2 + 3 + \\cdots)\\). What if you shift one sequence before subtracting?',
                        solution: 'If both sequences are \\(1 + 2 + 3 + \\cdots\\), subtracting term-by-term gives \\(0 + 0 + 0 + \\cdots = 0\\). But if you shift one: subtract \\(0 + 1 + 2 + 3 + \\cdots\\) from \\(1 + 2 + 3 + 4 + \\cdots\\), you get \\(1 + 1 + 1 + 1 + \\cdots = \\infty\\). The same "\\(\\infty - \\infty\\)" gives two different answers depending on how you pair up the terms. This is why \\(\\infty - \\infty\\) is called an <strong>indeterminate form</strong>; it has no single value.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Zeno's Paradox
            // ============================================================
            {
                id: 'zeno',
                title: "Zeno's Paradox: Achilles and the Tortoise",
                content: `
<h2>The Race That Should Never End</h2>

<p>Around 450 BCE, a Greek philosopher named Zeno of Elea proposed several paradoxes that disturbed thinkers for millennia. The most famous is the race between Achilles and the tortoise.</p>

<p>Achilles, the fastest runner in Greece, races a tortoise. Being a good sport, he gives the tortoise a 100-meter head start. Achilles runs at 10 m/s, the tortoise at 1 m/s. Clearly Achilles will catch up. But Zeno argued he <em>never can</em>:</p>

<blockquote style="border-left:3px solid #bc8cff; padding-left:16px; color:#c9d1d9; margin:20px 0;">
"First, Achilles must reach the point where the tortoise started. But by then, the tortoise has moved forward. Now Achilles must reach <em>that</em> new point. But again, the tortoise has moved further. Each time Achilles reaches where the tortoise was, the tortoise has advanced a little more. There are infinitely many such stages, so Achilles can never finish them all."
</blockquote>

<p>We know from experience that fast runners catch slow ones. So where is the flaw in Zeno's reasoning?</p>

<div class="viz-placeholder" data-viz="zeno-race"></div>

<h3>The Resolution: Infinite Steps, Finite Time</h3>

<p>Zeno's argument implicitly assumes that infinitely many steps must take infinitely long. This feels right, but it is wrong. Here is the calculation:</p>

<ul>
    <li><strong>Stage 1:</strong> Achilles runs 100 m (to where the tortoise was). Time: 10 seconds. Tortoise moves 10 m ahead.</li>
    <li><strong>Stage 2:</strong> Achilles runs 10 m. Time: 1 second. Tortoise moves 1 m ahead.</li>
    <li><strong>Stage 3:</strong> Achilles runs 1 m. Time: 0.1 seconds. Tortoise moves 0.1 m ahead.</li>
    <li><strong>Stage 4:</strong> Achilles runs 0.1 m. Time: 0.01 seconds. ...</li>
</ul>

<p>Total time: \\(10 + 1 + 0.1 + 0.01 + 0.001 + \\cdots\\)</p>

<p>This is a <strong>geometric series</strong> with first term 10 and ratio 1/10. Its sum is:</p>

\\[
\\frac{10}{1 - 1/10} = \\frac{10}{9/10} = \\frac{100}{9} \\approx 11.11 \\text{ seconds}
\\]

<p>After exactly \\(100/9\\) seconds, Achilles catches the tortoise at the \\(1000/9 \\approx 111.11\\) meter mark. The infinitely many stages do <em>not</em> take infinitely long because the time for each stage shrinks fast enough. Infinity times something that shrinks fast enough can be finite.</p>

<div class="env-block intuition">
<strong>The key insight</strong><br>
An infinite process can have a finite result. Zeno confused "infinitely many steps" with "infinite total." If each step is sufficiently smaller than the previous one, the total can converge to a finite value. This is the fundamental idea behind <em>convergence</em> in mathematics.
</div>

<h3>Zeno's deeper point</h3>

<p>Historians debate whether Zeno genuinely believed motion was impossible or was making a subtler philosophical point about the nature of space, time, and infinity. Either way, his paradox forced mathematicians to develop rigorous tools for handling infinite processes. It took over two thousand years, but the eventual answer (the theory of limits, formalized by Cauchy and Weierstrass in the 1800s) is one of the foundations of modern mathematics.</p>

<div class="env-block remark">
<strong>Other Zeno paradoxes</strong><br>
Zeno proposed several related puzzles. In the "Dichotomy" paradox, before reaching a destination you must first reach the halfway point; but before that, the quarter point; and so on, producing infinitely many tasks before you take the first step. In the "Arrow" paradox, a flying arrow at any single instant is stationary (it occupies a fixed position), so how can it move? Each paradox probes a different aspect of infinity and continuity.
</div>
`,
                visualizations: [
                    {
                        id: 'zeno-race',
                        title: "Zeno's Paradox: Achilles vs. the Tortoise",
                        description: 'Watch Achilles close the gap in infinitely many stages, each smaller than the last. The total time is finite!',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 300, scale: 1, originX: 0, originY: 0 });
                            var running = false;
                            var t = 0;
                            var speed = 1;
                            var catchTime = 100 / 9; // 11.111...
                            var achillesSpeed = 10;
                            var tortoiseSpeed = 1;
                            var headStart = 100;
                            var stages = [];

                            // Precompute stages
                            var gap = headStart;
                            var cumTime = 0;
                            for (var i = 0; i < 15; i++) {
                                var stageTime = gap / achillesSpeed;
                                cumTime += stageTime;
                                var achillesPos = achillesSpeed * cumTime;
                                var tortoisePos = headStart + tortoiseSpeed * cumTime;
                                stages.push({ time: cumTime, achilles: achillesPos, tortoise: tortoisePos, gap: tortoisePos - achillesPos });
                                gap = gap * (tortoiseSpeed / achillesSpeed);
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var trackY = 100;
                                var scaleX = (W - 60) / 130;

                                // Track
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(30, trackY); ctx.lineTo(W - 30, trackY); ctx.stroke();

                                // Distance markers
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                for (var m = 0; m <= 120; m += 20) {
                                    var mx = 30 + m * scaleX;
                                    ctx.beginPath(); ctx.moveTo(mx, trackY - 4); ctx.lineTo(mx, trackY + 4); ctx.stroke();
                                    ctx.fillText(m + 'm', mx, trackY + 16);
                                }

                                // Positions
                                var achillesX, tortoiseX;
                                if (t >= catchTime) {
                                    achillesX = achillesSpeed * catchTime;
                                    tortoiseX = headStart + tortoiseSpeed * catchTime;
                                } else {
                                    achillesX = achillesSpeed * t;
                                    tortoiseX = headStart + tortoiseSpeed * t;
                                }

                                // Draw Achilles
                                var ax = 30 + achillesX * scaleX;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(ax, trackY - 14, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Achilles', ax, trackY - 28);

                                // Draw Tortoise
                                var tx = 30 + tortoiseX * scaleX;
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                // Simple tortoise shape
                                ctx.arc(tx, trackY - 14, 6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillRect(tx + 5, trackY - 16, 5, 4);
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('Tortoise', tx, trackY - 28);

                                // Gap
                                if (tortoiseX > achillesX + 0.5) {
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath(); ctx.moveTo(ax, trackY + 26); ctx.lineTo(tx, trackY + 26); ctx.stroke();
                                    ctx.setLineDash([]);
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.fillText('Gap: ' + (tortoiseX - achillesX).toFixed(2) + 'm', (ax + tx) / 2, trackY + 38);
                                }

                                // Stage indicators below
                                var stageY = 160;
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Zeno\'s stages:', 10, stageY);

                                var maxShowStages = Math.min(stages.length, 8);
                                for (var s = 0; s < maxShowStages; s++) {
                                    var sy = stageY + 18 + s * 15;
                                    var passed = t >= stages[s].time;
                                    ctx.fillStyle = passed ? viz.colors.teal : viz.colors.text;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    var gapStr = stages[s].gap < 0.01 ? stages[s].gap.toExponential(1) : stages[s].gap.toFixed(3);
                                    ctx.fillText('Stage ' + (s + 1) + ': t=' + stages[s].time.toFixed(4) + 's, gap=' + gapStr + 'm' + (passed ? ' \u2713' : ''), 20, sy);
                                }

                                // Time display
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText('Time: ' + t.toFixed(3) + 's', W - 20, 25);
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('Catch time: 100/9 \u2248 11.111s', W - 20, 45);

                                if (t >= catchTime) {
                                    ctx.fillStyle = viz.colors.gold;
                                    ctx.font = 'bold 16px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('Achilles catches the tortoise!', W / 2, 70);
                                }
                            }

                            var animHandle = null;

                            function startAnim() {
                                if (running) return;
                                running = true;
                                var startWall = performance.now();
                                var startT = t;
                                animHandle = viz.animate(function () {
                                    var elapsed = (performance.now() - startWall) / 1000 * speed;
                                    t = startT + elapsed;
                                    if (t > catchTime + 1) {
                                        t = catchTime + 1;
                                        running = false;
                                        viz.stopAnimation();
                                    }
                                    draw();
                                });
                            }

                            VizEngine.createButton(controls, 'Run', function () { startAnim(); });
                            VizEngine.createButton(controls, 'Pause', function () { running = false; viz.stopAnimation(); });
                            VizEngine.createButton(controls, 'Reset', function () { running = false; viz.stopAnimation(); t = 0; draw(); });
                            VizEngine.createSlider(controls, 'Speed', 0.5, 5, 1, 0.5, function (v) { speed = v; });

                            draw();
                            return { stopAnimation: function () { viz.stopAnimation(); running = false; } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In Zeno\'s paradox, suppose Achilles runs at 5 m/s and the tortoise at 1 m/s, with a 20-meter head start. At what time does Achilles catch the tortoise?',
                        hint: 'Set up the equation: Achilles position = Tortoise position. Or sum the geometric series.',
                        solution: 'Achilles is at \\(5t\\), tortoise at \\(20 + t\\). Setting equal: \\(5t = 20 + t\\), so \\(4t = 20\\), \\(t = 5\\) seconds. Alternatively, the stages form a geometric series: \\(4 + 0.8 + 0.16 + \\cdots = 4/(1-0.2) = 5\\) seconds. Both methods agree.'
                    },
                    {
                        question: 'The Dichotomy paradox says: to walk 1 meter, you must first walk 1/2 meter, but first 1/4 meter, but first 1/8 meter, and so on. Write this as an infinite sum. What is its value?',
                        hint: 'The distances form a geometric series starting from the smallest step.',
                        solution: 'The total distance is \\(\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\cdots = \\sum_{k=1}^{\\infty} \\frac{1}{2^k} = 1\\). The infinite sum equals exactly 1 meter, confirming that you do, in fact, arrive!'
                    },
                    {
                        question: 'Why can\'t you resolve Zeno\'s paradox by simply saying "obviously Achilles catches up"? What mathematical concept was missing in Zeno\'s time?',
                        hint: 'The Greeks had geometry and arithmetic, but they lacked a formal notion of ...',
                        solution: 'The missing concept was <strong>the limit</strong>. Saying "obviously he catches up" does not explain <em>how</em> infinitely many tasks can be completed in finite time. The resolution requires showing that the infinite sum converges to a finite value. The formal theory of limits was not developed until the 19th century by Cauchy and Weierstrass.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Infinity Is Not a Number
            // ============================================================
            {
                id: 'not-a-number',
                title: 'Infinity Is Not a Number',
                content: `
<h2>When Arithmetic Breaks Down</h2>

<p>What is \\(\\infty + 1\\)? Your instinct says \\(\\infty\\). And in a loose sense, that is correct: if a process never ends, adding one more step does not make it end. But this "arithmetic of infinity" is treacherous. Let us see why.</p>

<h3>Dangerous equations</h3>

<p>Suppose we naively treat \\(\\infty\\) as a number and apply the usual rules:</p>

<ol>
    <li>Start with \\(\\infty + 1 = \\infty\\).</li>
    <li>Subtract \\(\\infty\\) from both sides: \\(1 = 0\\). Disaster!</li>
</ol>

<p>The error is in step 2: "subtract \\(\\infty\\)" is not a valid operation. You cannot cancel infinity like you cancel 5. The expression \\(\\infty - \\infty\\) is not 0; it is <em>meaningless</em> (or more precisely, indeterminate). It could be anything.</p>

<div class="env-block warning">
<strong>Indeterminate forms</strong><br>
In calculus, the following are all "indeterminate forms," meaning their value depends on the specific context:
\\[
\\frac{\\infty}{\\infty}, \\quad \\infty - \\infty, \\quad 0 \\times \\infty, \\quad 0^0, \\quad 1^\\infty, \\quad \\infty^0, \\quad \\frac{0}{0}
\\]
Each of these can evaluate to different finite numbers (or even infinity) depending on <em>how</em> the components approach their limits.
</div>

<h3>What does "\\(\\infty + 1 = \\infty\\)" actually mean?</h3>

<p>Formally, it means: "if a set is infinite, adding one element to it does not change its size (cardinality)." This is a statement about <em>sets</em>, not about arithmetic with numbers. It was Cantor who showed that infinite sets have a well-defined notion of "size" (cardinality), and that \\(\\aleph_0 + 1 = \\aleph_0\\) (where \\(\\aleph_0\\) is the cardinality of the natural numbers). But Cantor also showed that \\(\\aleph_0 + \\aleph_0 = \\aleph_0\\) and \\(\\aleph_0 \\times \\aleph_0 = \\aleph_0\\), while \\(2^{\\aleph_0} &gt; \\aleph_0\\). Infinite arithmetic exists, but it is nothing like finite arithmetic.</p>

<h3>Division by zero: a related trap</h3>

<p>Students sometimes write \\(1/0 = \\infty\\). This is wrong. Division by zero is <em>undefined</em> in standard arithmetic. Here is why:</p>

<p>If \\(1/0 = x\\), then \\(0 \\times x = 1\\). But \\(0\\) times anything is \\(0\\), not \\(1\\). There is no value of \\(x\\) that works. What we can say is that \\(1/x\\) grows without bound as \\(x \\to 0^+\\) (approaching zero from the positive side), and \\(1/x \\to -\\infty\\) as \\(x \\to 0^-\\). The behavior is different from the two sides, which is another reason we cannot assign a single value to \\(1/0\\).</p>

<div class="env-block remark">
<strong>Extended systems</strong><br>
Mathematicians have created number systems that <em>do</em> include infinite and infinitesimal quantities: the hyperreal numbers (Robinson, 1960s), the surreal numbers (Conway, 1970s), and the projective real line (which adds a single point at infinity). In each system, the rules of arithmetic are carefully modified to avoid contradictions. These are real, rigorous mathematical constructions, not hand-waving.
</div>

<p>The moral: infinity is not forbidden or mystical. It simply demands respect. Use it carelessly, and you get nonsense. Use it carefully (with limits, cardinalities, or extended number systems), and you unlock some of the most powerful ideas in mathematics.</p>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Explain why \\(\\infty \\times 0\\) is indeterminate. Give two limits that have the form "\\(\\infty \\times 0\\)" but evaluate to different numbers.',
                        hint: 'Consider \\(\\lim_{x \\to \\infty} x \\cdot (1/x)\\) and \\(\\lim_{x \\to \\infty} x \\cdot (5/x)\\). Both are \\(\\infty \\times 0\\).',
                        solution: 'Example 1: \\(\\lim_{x \\to \\infty} x \\cdot \\frac{1}{x} = \\lim_{x \\to \\infty} 1 = 1\\). Example 2: \\(\\lim_{x \\to \\infty} x \\cdot \\frac{5}{x} = \\lim_{x \\to \\infty} 5 = 5\\). Both are "\\(\\infty \\times 0\\)" in form, but one equals 1 and the other equals 5. You can construct examples giving any value, which is why it is indeterminate.'
                    },
                    {
                        question: 'Why does \\(\\infty / \\infty\\) not equal 1? Give a counterexample.',
                        hint: 'Consider \\(\\lim_{x \\to \\infty} 2x / x\\).',
                        solution: '\\(\\lim_{x \\to \\infty} \\frac{2x}{x} = 2\\), not 1. Both numerator and denominator go to infinity, but the ratio is 2. Similarly, \\(\\lim_{x \\to \\infty} \\frac{x^2}{x} = \\infty\\). The form \\(\\infty / \\infty\\) can give any value.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Infinite Series That Sum to Finite Values
            // ============================================================
            {
                id: 'series',
                title: 'Infinite Series That Sum to Finite Values',
                content: `
<h2>Adding Forever and Getting a Finite Answer</h2>

<p>This is perhaps the most counterintuitive idea in this chapter: you can add infinitely many positive numbers and get a <em>finite</em> sum. Not always, but sometimes, and the "sometimes" is governed by beautiful mathematical laws.</p>

<h3>The geometric series</h3>

<p>The simplest and most important example:</p>

\\[
\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\frac{1}{16} + \\cdots = 1
\\]

<p>Why does this equal 1? Here is a visual argument. Start with a square of area 1. Cut it in half: one piece has area 1/2. Cut the remaining half in half: now you have an additional piece of area 1/4, with 1/4 remaining. Keep cutting.</p>

<p>At every stage, the total of all pieces you have cut off equals 1 minus whatever tiny remainder is left. The remainder is \\((1/2)^n\\), which approaches 0 as \\(n \\to \\infty\\). So the total of all the pieces is 1.</p>

<div class="viz-placeholder" data-viz="geometric-series"></div>

<div class="env-block theorem">
<strong>Geometric Series Formula</strong><br>
For \\(|r| &lt; 1\\):
\\[
\\sum_{k=0}^{\\infty} r^k = \\frac{1}{1-r}
\\]
For \\(|r| \\geq 1\\), the series diverges (the partial sums grow without bound).
</div>

<h3>Examples</h3>

<ul>
    <li>\\(r = 1/2\\): \\(1 + 1/2 + 1/4 + \\cdots = 1/(1-1/2) = 2\\).</li>
    <li>\\(r = 1/3\\): \\(1 + 1/3 + 1/9 + \\cdots = 1/(1-1/3) = 3/2\\).</li>
    <li>\\(r = 9/10\\): \\(1 + 0.9 + 0.81 + \\cdots = 10\\). This explains why \\(0.999\\ldots = 1\\): it is \\(9/10 + 9/100 + \\cdots = (9/10) \\cdot \\frac{1}{1-1/10} = 1\\).</li>
    <li>\\(r = -1/2\\): \\(1 - 1/2 + 1/4 - 1/8 + \\cdots = 1/(1+1/2) = 2/3\\). Even alternating series can converge!</li>
</ul>

<h3>A series that does NOT converge</h3>

<p>The <strong>harmonic series</strong> \\(1 + 1/2 + 1/3 + 1/4 + \\cdots\\) diverges: its partial sums grow without bound, slowly but inexorably. This is surprising because the terms \\(1/n\\) approach zero. But approaching zero is <em>necessary</em> for convergence, not <em>sufficient</em>. The terms must shrink fast enough.</p>

<div class="env-block intuition">
<strong>The crucial distinction</strong><br>
Terms shrinking to 0? Necessary for convergence, but not enough. The terms must shrink <em>fast enough</em>. Geometric decay (each term a fixed fraction of the previous) is always fast enough. The harmonic series (\\(1/n\\)) shrinks, but too slowly. The series \\(1/n^2\\) (each term is \\(1/n^2\\)) converges to \\(\\pi^2/6\\), a surprising result discovered by Euler.
</div>

<div class="viz-placeholder" data-viz="series-compare"></div>

<h3>Why this matters</h3>

<p>Infinite series are not just mathematical curiosities. They are the engine behind:</p>
<ul>
    <li><strong>Decimal expansions:</strong> \\(1/3 = 0.333\\ldots\\) is an infinite geometric series.</li>
    <li><strong>Calculus:</strong> Taylor series express functions as infinite polynomials.</li>
    <li><strong>Physics:</strong> Quantum mechanics uses infinite series everywhere.</li>
    <li><strong>Computer science:</strong> Algorithms approximate functions by computing partial sums of infinite series.</li>
    <li><strong>Finance:</strong> The present value of a perpetuity (endless stream of payments) is a geometric series.</li>
</ul>

<p>The ability to sum infinitely many things and get a finite answer is one of the most powerful ideas humanity has ever discovered.</p>
`,
                visualizations: [
                    {
                        id: 'geometric-series',
                        title: 'Geometric Series: Filling the Square',
                        description: 'Watch as pieces of area 1/2, 1/4, 1/8, ... fill up a unit square. The total area approaches 1.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 380, scale: 1, originX: 0, originY: 0 });
                            var numTerms = 1;
                            var maxTerms = 12;
                            var colors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.pink, viz.colors.yellow, viz.colors.red, viz.colors.gold, viz.colors.blue, viz.colors.teal, viz.colors.orange];

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var squareSize = 280;
                                var sx = 30, sy = 30;

                                // Draw unit square outline
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(sx, sy, squareSize, squareSize);

                                // Fill pieces using recursive halving
                                // Piece i: area (1/2)^(i+1)
                                // Alternate between cutting horizontally and vertically
                                var pieces = [];
                                var rx = sx, ry = sy, rw = squareSize, rh = squareSize;
                                for (var i = 0; i < numTerms && i < maxTerms; i++) {
                                    if (i % 2 === 0) {
                                        // Horizontal cut: take the left half
                                        pieces.push({ x: rx, y: ry, w: rw / 2, h: rh });
                                        rx = rx + rw / 2;
                                        rw = rw / 2;
                                    } else {
                                        // Vertical cut: take the top half
                                        pieces.push({ x: rx, y: ry, w: rw, h: rh / 2 });
                                        ry = ry + rh / 2;
                                        rh = rh / 2;
                                    }
                                }

                                // Draw pieces
                                for (var j = 0; j < pieces.length; j++) {
                                    var p = pieces[j];
                                    ctx.fillStyle = colors[j % colors.length] + '88';
                                    ctx.fillRect(p.x, p.y, p.w, p.h);
                                    ctx.strokeStyle = colors[j % colors.length];
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(p.x, p.y, p.w, p.h);

                                    // Label if big enough
                                    if (p.w > 30 && p.h > 20) {
                                        ctx.fillStyle = viz.colors.white;
                                        ctx.font = Math.min(14, p.w / 3) + 'px -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText('1/' + Math.pow(2, j + 1), p.x + p.w / 2, p.y + p.h / 2);
                                    }
                                }

                                // Partial sum display
                                var partialSum = 0;
                                for (var k = 1; k <= numTerms; k++) {
                                    partialSum += 1 / Math.pow(2, k);
                                }

                                var infoX = squareSize + 60;
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Partial sum:', infoX, 30);

                                var sumStr = '';
                                for (var m = 1; m <= Math.min(numTerms, 6); m++) {
                                    sumStr += (m > 1 ? ' + ' : '') + '1/' + Math.pow(2, m);
                                }
                                if (numTerms > 6) sumStr += ' + ...';

                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText(sumStr, infoX, 55);

                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('= ' + partialSum.toFixed(6), infoX, 80);

                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('Remainder: ' + (1 - partialSum).toFixed(6), infoX, 115);

                                // Visual progress bar
                                ctx.fillStyle = viz.colors.grid;
                                ctx.fillRect(infoX, 145, 200, 20);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillRect(infoX, 145, 200 * partialSum, 20);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.strokeRect(infoX, 145, 200, 20);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText((partialSum * 100).toFixed(2) + '% of 1', infoX + 100, 156);

                                ctx.textAlign = 'left';
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'italic 12px -apple-system,sans-serif';
                                ctx.fillText('As terms \u2192 \u221e, sum \u2192 1', infoX, 185);
                                ctx.fillText('(but never exceeds 1)', infoX, 202);

                                // Terms count
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Terms: ' + numTerms, infoX, 230);
                            }

                            VizEngine.createButton(controls, 'Add Term', function () {
                                if (numTerms < maxTerms) { numTerms++; draw(); }
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                numTerms = 1; draw();
                            });

                            VizEngine.createButton(controls, 'Fill All', function () {
                                numTerms = maxTerms; draw();
                            });

                            draw();
                        }
                    },
                    {
                        id: 'series-compare',
                        title: 'Convergent vs. Divergent Series',
                        description: 'Compare partial sums of different series. Adjust the ratio r for the geometric series, or switch to the harmonic series to see it diverge.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 340, scale: 1, originX: 0, originY: 0 });
                            var ratio = 0.5;
                            var maxN = 30;
                            var seriesType = 'geometric'; // 'geometric' or 'harmonic'

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var plotLeft = 60, plotRight = W - 30;
                                var plotTop = 40, plotBottom = H - 50;
                                var plotW = plotRight - plotLeft;
                                var plotH = plotBottom - plotTop;

                                // Compute partial sums
                                var sums = [0];
                                for (var n = 1; n <= maxN; n++) {
                                    if (seriesType === 'geometric') {
                                        sums.push(sums[n - 1] + Math.pow(ratio, n - 1));
                                    } else {
                                        sums.push(sums[n - 1] + 1 / n);
                                    }
                                }

                                var maxY = Math.max.apply(null, sums) * 1.15;
                                if (seriesType === 'geometric' && Math.abs(ratio) < 1) {
                                    var limit = 1 / (1 - ratio);
                                    maxY = Math.max(maxY, limit * 1.15);
                                }

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(plotLeft, plotTop); ctx.lineTo(plotLeft, plotBottom); ctx.lineTo(plotRight, plotBottom); ctx.stroke();

                                // Y labels
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                var yTicks = 5;
                                for (var yt = 0; yt <= yTicks; yt++) {
                                    var yVal = maxY * yt / yTicks;
                                    var yPx = plotBottom - (yVal / maxY) * plotH;
                                    ctx.fillText(yVal.toFixed(1), plotLeft - 5, yPx + 3);
                                    ctx.strokeStyle = viz.colors.grid;
                                    ctx.beginPath(); ctx.moveTo(plotLeft, yPx); ctx.lineTo(plotRight, yPx); ctx.stroke();
                                }

                                // X labels
                                ctx.textAlign = 'center';
                                for (var xt = 0; xt <= maxN; xt += 5) {
                                    var xPx = plotLeft + (xt / maxN) * plotW;
                                    ctx.fillText(xt, xPx, plotBottom + 15);
                                }
                                ctx.fillText('n (number of terms)', (plotLeft + plotRight) / 2, plotBottom + 35);

                                // Plot partial sums
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i <= maxN; i++) {
                                    var px = plotLeft + (i / maxN) * plotW;
                                    var py = plotBottom - (sums[i] / maxY) * plotH;
                                    if (py < plotTop) py = plotTop;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Dots
                                for (var j = 0; j <= maxN; j++) {
                                    var dpx = plotLeft + (j / maxN) * plotW;
                                    var dpy = plotBottom - (sums[j] / maxY) * plotH;
                                    if (dpy < plotTop) dpy = plotTop;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath(); ctx.arc(dpx, dpy, 3, 0, Math.PI * 2); ctx.fill();
                                }

                                // Limit line for convergent geometric series
                                if (seriesType === 'geometric' && Math.abs(ratio) < 1) {
                                    var limitVal = 1 / (1 - ratio);
                                    var limitPx = plotBottom - (limitVal / maxY) * plotH;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([6, 4]);
                                    ctx.beginPath(); ctx.moveTo(plotLeft, limitPx); ctx.lineTo(plotRight, limitPx); ctx.stroke();
                                    ctx.setLineDash([]);
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText('Limit = 1/(1-r) = ' + limitVal.toFixed(3), plotLeft + 10, limitPx - 8);
                                }

                                // Title
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                if (seriesType === 'geometric') {
                                    ctx.fillText('Geometric series: 1 + r + r\u00B2 + r\u00B3 + ...  (r = ' + ratio.toFixed(2) + ')', W / 2, 20);
                                    var converges = Math.abs(ratio) < 1;
                                    ctx.fillStyle = converges ? viz.colors.green : viz.colors.red;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.fillText(converges ? 'CONVERGES' : 'DIVERGES', W / 2, plotTop - 5);
                                } else {
                                    ctx.fillText('Harmonic series: 1 + 1/2 + 1/3 + 1/4 + ...', W / 2, 20);
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.fillText('DIVERGES (slowly)', W / 2, plotTop - 5);
                                }
                            }

                            VizEngine.createSlider(controls, 'Ratio r', -0.9, 0.95, ratio, 0.05, function (v) {
                                ratio = v;
                                seriesType = 'geometric';
                                draw();
                            });

                            VizEngine.createButton(controls, 'Harmonic', function () {
                                seriesType = 'harmonic';
                                draw();
                            });

                            VizEngine.createButton(controls, 'Geometric', function () {
                                seriesType = 'geometric';
                                draw();
                            });

                            draw();
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Compute the sum \\(1 + \\frac{1}{3} + \\frac{1}{9} + \\frac{1}{27} + \\cdots\\) using the geometric series formula.',
                        hint: 'This is a geometric series with first term \\(a = 1\\) and ratio \\(r = 1/3\\).',
                        solution: '\\(\\sum_{k=0}^{\\infty} (1/3)^k = \\frac{1}{1 - 1/3} = \\frac{1}{2/3} = \\frac{3}{2}\\).'
                    },
                    {
                        question: 'Prove that \\(0.999\\ldots = 1\\) using the geometric series formula.',
                        hint: 'Write \\(0.999\\ldots = 0.9 + 0.09 + 0.009 + \\cdots = \\frac{9}{10} + \\frac{9}{100} + \\frac{9}{1000} + \\cdots\\). Factor out 9/10.',
                        solution: '\\(0.999\\ldots = \\frac{9}{10}(1 + \\frac{1}{10} + \\frac{1}{100} + \\cdots) = \\frac{9}{10} \\cdot \\frac{1}{1 - 1/10} = \\frac{9}{10} \\cdot \\frac{10}{9} = 1\\). So \\(0.999\\ldots\\) is not "close to" 1; it <em>is</em> 1, exactly.'
                    },
                    {
                        question: 'The series \\(1 + \\frac{1}{2^2} + \\frac{1}{3^2} + \\frac{1}{4^2} + \\cdots\\) converges. Its exact sum is \\(\\pi^2/6\\). Compute the first 5 terms and see how close the partial sum is to \\(\\pi^2/6 \\approx 1.6449\\).',
                        hint: 'Just compute \\(1 + 1/4 + 1/9 + 1/16 + 1/25\\).',
                        solution: '\\(1 + 0.25 + 0.1111 + 0.0625 + 0.04 = 1.4636\\). This is already 89% of the way to \\(\\pi^2/6 \\approx 1.6449\\). The series converges, but not as fast as a geometric series.'
                    }
                ]
            },

            // ============================================================
            // Section 5: Playing with Infinity
            // ============================================================
            {
                id: 'playing',
                title: 'Playing with Infinity',
                content: `
<h2>Infinite Surprises</h2>

<p>Now that we have some intuition for infinity, let us collect a few more mind-bending facts that will prepare us for the next chapter (Hilbert's Hotel).</p>

<h3>There are as many even numbers as natural numbers</h3>

<p>This sounds wrong. The even numbers (2, 4, 6, 8, ...) are a <em>subset</em> of the natural numbers (1, 2, 3, 4, ...). Surely there are "fewer" of them? In the finite world, a proper subset is always smaller. But in the infinite world, this rule breaks.</p>

<p>The argument is simple. Line up the natural numbers with the even numbers:</p>

<pre style="color:#58a6ff; font-size:1.05rem; line-height:1.7; text-align:center;">
1  &harr;  2
2  &harr;  4
3  &harr;  6
4  &harr;  8
5  &harr;  10
&#8942;      &#8942;
n  &harr;  2n
</pre>

<p>Every natural number is paired with exactly one even number, and every even number is paired with exactly one natural number. The pairing \\(n \\leftrightarrow 2n\\) is a <strong>one-to-one correspondence</strong> (bijection). Since we can match them up perfectly, the two sets have the same "size" (cardinality).</p>

<div class="env-block definition">
<strong>Same cardinality</strong><br>
Two sets have the same cardinality (size) if there exists a one-to-one correspondence between them. For finite sets, this reduces to "they have the same number of elements." For infinite sets, it produces surprises.
</div>

<h3>The integers = the natural numbers (in size)</h3>

<p>The integers \\(\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\) extend in both directions, so you might think they are "twice as many" as the natural numbers. But there is a bijection:</p>

<pre style="color:#58a6ff; font-size:1.05rem; line-height:1.7; text-align:center;">
1 &harr;  0
2 &harr;  1
3 &harr; -1
4 &harr;  2
5 &harr; -2
6 &harr;  3
7 &harr; -3
&#8942;     &#8942;
</pre>

<p>We "zigzag" through the integers, hitting each one exactly once. So the integers have the same cardinality as the natural numbers. Both are <em>countably infinite</em>.</p>

<h3>What about the rationals?</h3>

<p>The rational numbers (fractions) seem far more numerous. Between any two integers, there are infinitely many fractions. Between 0 and 1 alone, there are 1/2, 1/3, 2/3, 1/4, 3/4, 1/5, ... an infinite collection. Surely the rationals outnumber the natural numbers?</p>

<p>No! Cantor proved that the rationals are also countably infinite. His ingenious "diagonal" argument arranges all positive fractions in a grid and traverses them in a zigzag pattern, hitting every fraction exactly once (after skipping duplicates). We will see this argument in detail in Chapter 6 (Cantor's Paradise).</p>

<div class="env-block intuition">
<strong>Infinity's signature property</strong><br>
An infinite set can be put in one-to-one correspondence with a proper subset of itself. This is <em>impossible</em> for finite sets. In fact, this property can be taken as the <em>definition</em> of infinity (this is Dedekind's definition): a set is infinite if and only if it has the same cardinality as one of its proper subsets.
</div>

<h3>Is there a "biggest infinity"?</h3>

<p>No. Cantor proved that for any set (even an infinite one), the set of all its subsets (the <em>power set</em>) is strictly larger. This means there are infinitely many <em>sizes</em> of infinity, an unending hierarchy of infinities, each bigger than the last. This is Cantor's Theorem, and it shook the foundations of mathematics when it was first published in the 1890s.</p>

<p>But we are getting ahead of ourselves. In the next chapter, we will visit Hilbert's Hotel, a thought experiment that makes the strange arithmetic of countable infinity vivid and unforgettable.</p>

<div class="env-block remark">
<strong>A quote from David Hilbert (1926)</strong><br>
"No one shall expel us from the paradise that Cantor has created." Even mathematicians who initially resisted Cantor's ideas eventually came to see them as essential. Today, the theory of infinite sets is a cornerstone of modern mathematics.
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Construct a one-to-one correspondence between the natural numbers and the odd numbers.',
                        hint: 'What formula sends \\(n\\) to the \\(n\\)-th odd number?',
                        solution: 'The correspondence is \\(n \\leftrightarrow 2n - 1\\). So: \\(1 \\leftrightarrow 1\\), \\(2 \\leftrightarrow 3\\), \\(3 \\leftrightarrow 5\\), \\(4 \\leftrightarrow 7\\), and so on. Every odd number is hit exactly once.'
                    },
                    {
                        question: 'Construct a one-to-one correspondence between the natural numbers and the set \\(\\{1, 4, 9, 16, 25, \\ldots\\}\\) (the perfect squares).',
                        hint: 'What is the \\(n\\)-th perfect square?',
                        solution: 'The correspondence is \\(n \\leftrightarrow n^2\\). So: \\(1 \\leftrightarrow 1\\), \\(2 \\leftrightarrow 4\\), \\(3 \\leftrightarrow 9\\), etc. This bijection proves that there are "as many" perfect squares as natural numbers, even though the squares become increasingly sparse. Galileo noted this paradox in 1638!'
                    },
                    {
                        question: 'Can you list all positive fractions (rationals) in a sequence? Describe a strategy, even if you cannot write out every term.',
                        hint: 'Arrange fractions in a grid where row \\(i\\) has numerator \\(i\\) and column \\(j\\) has denominator \\(j\\). Then zigzag along the diagonals.',
                        solution: 'Start: 1/1. Then zigzag: 1/2, 2/1, 3/1, 2/2 (skip, duplicate of 1/1), 1/3, 1/4, 2/3, 3/2, 4/1, 5/1, 4/2 (skip), 3/3 (skip), 2/4 (skip), 1/5, ... Skipping fractions that reduce to ones already listed, you hit every positive rational exactly once. This is Cantor\'s diagonal traversal, and it proves the rationals are countable.'
                    }
                ]
            }
        ]
    });
})();
