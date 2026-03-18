// === Chapter 1: Fibonacci Numbers ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Fibonacci Numbers',
    subtitle: 'The sequence that nature cannot stop using',
    sections: [
        // ===== Section 0: The Rabbit Problem =====
        {
            id: 'rabbit-problem',
            title: 'The Rabbit Problem',
            content: `
<h2>A Mathematician Walks Into a Rabbit Farm</h2>

<p>The year is 1202. A young Italian merchant named Leonardo, son of Bonaccio, has just returned to the city of Pisa from years of traveling through North Africa, where he learned the Hindu-Arabic numeral system (the one we use today: 0, 1, 2, 3, ..., 9) from Arab mathematicians. He is about to publish a book called <em>Liber Abaci</em> ("The Book of Calculation") that will change European mathematics forever.</p>

<p>Leonardo, whom history remembers as <strong>Fibonacci</strong> (a contraction of "filius Bonaccii," meaning "son of Bonaccio"), wrote his book mainly to convince European merchants that the Hindu-Arabic system was vastly superior to Roman numerals for doing business. (Try multiplying MCMXCIV by XLVII in your head. Now try 1994 &times; 47. Point made.)</p>

<p>But buried among the practical bookkeeping problems in <em>Liber Abaci</em> was a little puzzle about rabbits that would make Fibonacci's name immortal:</p>

<div class="env-block example">
<strong>Fibonacci's Rabbit Problem (1202)</strong><br>
A man puts a pair of newborn rabbits in a field. Rabbits take one month to mature. Once mature, each pair produces one new pair every month. Assuming no rabbits die, how many pairs will there be after 12 months?
</div>

<p>Let us think through this carefully, month by month:</p>

<ul>
<li><strong>Month 0:</strong> 1 pair (newborn)</li>
<li><strong>Month 1:</strong> 1 pair (now mature, but have not bred yet)</li>
<li><strong>Month 2:</strong> 2 pairs (the original pair breeds; 1 mature + 1 newborn)</li>
<li><strong>Month 3:</strong> 3 pairs (original breeds again, month-2 babies are now mature but have not bred yet)</li>
<li><strong>Month 4:</strong> 5 pairs (original breeds, month-2 pair breeds, month-3 pair is maturing)</li>
<li><strong>Month 5:</strong> 8 pairs</li>
</ul>

<p>Do you see the pattern? Each month, the number of pairs equals the sum of the previous two months. The newborns this month come from all the mature pairs, which are all the pairs that existed two months ago. And the pairs that existed last month are all still alive. So:</p>

\\[\\text{This month} = \\text{Last month} + \\text{Two months ago}\\]

<p>This gives us the sequence: <strong>1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...</strong></p>

<p>After 12 months, there are 144 pairs. Fibonacci duly noted this and moved on to other problems. He had no idea that this little sequence would turn out to be one of the most important in all of mathematics.</p>

<div class="viz-placeholder" data-viz="ch01-rabbit-breeding"></div>

<div class="env-block remark">
<strong>Historical note</strong><br>
Fibonacci did not actually discover this sequence. Indian mathematicians, including Virahanka (around 700 CE) and Hemachandra (around 1150 CE), had studied it centuries earlier in the context of Sanskrit poetry. But Fibonacci's book introduced it to Europe, and European mathematics named it after him. This is a common pattern in the history of math: ideas are discovered, lost, rediscovered, and eventually named after whoever brought them to the widest audience.
</div>
`,
            visualizations: [
                {
                    id: 'ch01-rabbit-breeding',
                    title: 'Fibonacci Rabbit Breeding',
                    description: 'Watch the rabbit population grow month by month. Mature pairs (gold) breed each month; young pairs (blue) take a month to mature.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var month = 0;
                        var maxMonth = 10;

                        var fib = [1, 1];
                        for (var i = 2; i <= maxMonth; i++) fib.push(fib[i-1] + fib[i-2]);

                        VizEngine.createSlider(controls, 'Month', 0, maxMonth, 0, 1, function(v) {
                            month = Math.round(v);
                            draw();
                        });

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            var margin = 50;
                            var colW = (w - margin * 2) / (maxMonth + 1);

                            // Draw month labels and bars
                            for (var m = 0; m <= maxMonth; m++) {
                                var x = margin + m * colW + colW / 2;
                                var val = fib[m];

                                // Background bars
                                var barH = Math.min((val / fib[maxMonth]) * (h - margin * 3), h - margin * 3);
                                var barW = colW * 0.7;

                                if (m <= month) {
                                    // Mature pairs (existed 2 months ago)
                                    var mature = m >= 2 ? fib[m - 2] : (m >= 1 ? 0 : 0);
                                    if (m === 0) mature = 0;
                                    if (m === 1) mature = 1;
                                    if (m >= 2) mature = fib[m - 1] - (m >= 2 ? fib[m-2] : 0);
                                    // Simpler: just show total count
                                    var newPairs = m >= 2 ? fib[m - 2] : 0;
                                    var oldPairs = m >= 1 ? fib[m - 1] : 1;
                                    // Total
                                    ctx.fillStyle = m === month ? viz.colors.gold : '#3a3a60';
                                    ctx.fillRect(x - barW / 2, h - margin - barH, barW, barH);

                                    // If current month, split into new and old
                                    if (m === month && m >= 2) {
                                        var newH = (newPairs / fib[maxMonth]) * (h - margin * 3);
                                        ctx.fillStyle = viz.colors.blue;
                                        ctx.fillRect(x - barW / 2, h - margin - newH, barW, newH);

                                        var existH = barH - newH;
                                        ctx.fillStyle = viz.colors.gold;
                                        ctx.fillRect(x - barW / 2, h - margin - barH, barW, existH);
                                    }
                                } else {
                                    ctx.fillStyle = '#1a1a40';
                                    ctx.fillRect(x - barW / 2, h - margin - barH, barW, barH);
                                }

                                // Month label
                                viz.screenText('M' + m, x, h - margin + 16, viz.colors.text, 11);

                                // Value label
                                if (m <= month) {
                                    viz.screenText('' + fib[m], x, h - margin - barH - 12, viz.colors.white, 13);
                                }
                            }

                            // Title
                            viz.screenText('Month ' + month + ': ' + fib[month] + ' pair' + (fib[month] > 1 ? 's' : ''), w / 2, 24, viz.colors.gold, 16);

                            if (month >= 2) {
                                viz.screenText(fib[month] + ' = ' + fib[month - 1] + ' + ' + fib[month - 2], w / 2, 48, viz.colors.teal, 14);
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.gold;
                            ctx.fillRect(w - 170, 20, 12, 12);
                            viz.screenText('Existing pairs', w - 100, 26, viz.colors.text, 11);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(w - 170, 38, 12, 12);
                            viz.screenText('New births', w - 112, 44, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Continue Fibonacci\'s rabbit problem: how many pairs are there at month 6? At month 7? Work through the logic of which pairs are mature enough to breed.',
                    hint: 'At month 5 there are 8 pairs. At month 6, all 8 pairs from month 5 survive, and all the pairs that existed at month 4 (5 pairs) produce one new pair each.',
                    solution: 'Month 6: 8 + 5 = 13 pairs. Month 7: 13 + 8 = 21 pairs. The pattern continues: each month\'s count is the sum of the two previous months. 1, 1, 2, 3, 5, 8, 13, 21, 34, ...'
                },
                {
                    question: 'Fibonacci\'s model assumes no rabbits die. In reality, if rabbits lived only 3 months after reaching maturity, how would the sequence change? Can you figure out the first 8 terms?',
                    hint: 'Now a pair born in month \\(n\\) matures in month \\(n+1\\), breeds in months \\(n+1, n+2, n+3\\), and dies at the end of month \\(n+3\\). The count becomes: (survivors from last month) + (new births) - (deaths).',
                    solution: 'With a 3-month lifespan after maturity, the recurrence becomes \\(F(n) = F(n-1) + F(n-2) - F(n-5)\\) (we subtract the pairs that were born 5 months ago, which have now died). Working it out: 1, 1, 2, 3, 5, 7, 11, 15, ... The sequence still grows, but slower than the original Fibonacci sequence.'
                }
            ]
        },

        // ===== Section 1: The Fibonacci Sequence =====
        {
            id: 'fibonacci-sequence',
            title: 'The Fibonacci Sequence',
            content: `
<h2>The Sequence Itself</h2>

<p>Let us give the Fibonacci numbers proper notation. We write \\(F_n\\) for the \\(n\\)-th Fibonacci number, starting with:</p>

\\[F_1 = 1, \\quad F_2 = 1\\]

<p>And the rule that generates the rest:</p>

\\[F_n = F_{n-1} + F_{n-2} \\quad \\text{for } n \\geq 3\\]

<p>This kind of formula, where each term depends on previous terms, is called a <strong>recurrence relation</strong>. It is like a machine: feed in two consecutive Fibonacci numbers, and it spits out the next one. The first 20 Fibonacci numbers are:</p>

<p style="text-align:center; font-size:1.05rem; color:#3fb9a0; letter-spacing:0.3px;">1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765</p>

<h3>How Fast Do They Grow?</h3>

<p>The Fibonacci numbers grow fast. Not as fast as, say, powers of 2 (1, 2, 4, 8, 16, 32, ...), but surprisingly close. In fact, the ratio of consecutive Fibonacci numbers tells a remarkable story:</p>

\\[\\frac{F_2}{F_1} = \\frac{1}{1} = 1.000\\]
\\[\\frac{F_3}{F_2} = \\frac{2}{1} = 2.000\\]
\\[\\frac{F_4}{F_3} = \\frac{3}{2} = 1.500\\]
\\[\\frac{F_5}{F_4} = \\frac{5}{3} = 1.667\\]
\\[\\frac{F_6}{F_5} = \\frac{8}{5} = 1.600\\]
\\[\\frac{F_7}{F_6} = \\frac{13}{8} = 1.625\\]

<p>These ratios are bouncing around, getting closer and closer to some number near 1.618. That number is the <strong>golden ratio</strong>, which we will study deeply in Chapter 2. For now, just notice: the Fibonacci sequence naturally converges to this mysterious constant.</p>

<div class="env-block definition">
<strong>The Fibonacci Sequence</strong><br>
A sequence of numbers where each term is the sum of the two preceding terms, starting with 1, 1. Formally: \\(F_1 = F_2 = 1\\) and \\(F_n = F_{n-1} + F_{n-2}\\) for \\(n \\geq 3\\). Some authors start with \\(F_0 = 0, F_1 = 1\\), which shifts the indices by one but produces the same numbers.
</div>

<div class="viz-placeholder" data-viz="ch01-ratio-convergence"></div>

<h3>An Exact Formula (Binet's Formula)</h3>

<p>Here is something that should shock you. The Fibonacci numbers are all whole numbers: 1, 1, 2, 3, 5, 8, 13, .... They are defined by adding whole numbers together. There is no division, no square roots, no irrational numbers involved anywhere in the definition.</p>

<p>And yet, there is an exact formula for the \\(n\\)-th Fibonacci number that involves the square root of 5:</p>

\\[F_n = \\frac{1}{\\sqrt{5}} \\left[ \\left(\\frac{1+\\sqrt{5}}{2}\\right)^n - \\left(\\frac{1-\\sqrt{5}}{2}\\right)^n \\right]\\]

<p>This is called <strong>Binet's formula</strong> (though it was known to Euler and Daniel Bernoulli before Binet). It seems almost absurd: plug in any positive integer \\(n\\), do a calculation involving \\(\\sqrt{5}\\) (an irrational number with infinitely many non-repeating decimals), and out pops a perfect whole number. Every time. Without fail.</p>

<p>The secret is that the irrational parts from the two terms cancel each other perfectly, leaving only a whole number behind. It is like watching two messy paint splatters combine to form a perfect circle.</p>

<div class="env-block intuition">
<strong>Why does Binet's formula work?</strong><br>
The two numbers \\(\\frac{1+\\sqrt{5}}{2} \\approx 1.618\\) and \\(\\frac{1-\\sqrt{5}}{2} \\approx -0.618\\) are the two solutions to the equation \\(x^2 = x + 1\\). This equation is just the Fibonacci recurrence \\(F_n = F_{n-1} + F_{n-2}\\) in disguise! If you assume \\(F_n = x^n\\) for some constant \\(x\\), then \\(x^n = x^{n-1} + x^{n-2}\\) simplifies to \\(x^2 = x + 1\\). Binet's formula is a weighted combination of these two solutions.
</div>
`,
            visualizations: [
                {
                    id: 'ch01-ratio-convergence',
                    title: 'Fibonacci Ratio Convergence',
                    description: 'Watch the ratio \\(F_{n+1}/F_n\\) bounce around and converge to the golden ratio \\(\\varphi \\approx 1.618\\). The ratios alternate above and below the target, getting closer each time.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var maxN = 15;
                        var phi = (1 + Math.sqrt(5)) / 2;

                        // Compute Fibonacci and ratios
                        var fib = [1, 1];
                        for (var i = 2; i <= maxN; i++) fib.push(fib[i-1] + fib[i-2]);
                        var ratios = [];
                        for (var i = 1; i <= maxN; i++) ratios.push(fib[i] / fib[i-1]);

                        var nShow = 15;
                        VizEngine.createSlider(controls, 'Terms', 2, maxN, nShow, 1, function(v) {
                            nShow = Math.round(v);
                            draw();
                        });

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            var margin = { left: 60, right: 30, top: 40, bottom: 50 };
                            var graphW = w - margin.left - margin.right;
                            var graphH = h - margin.top - margin.bottom;

                            // Y range: 0.8 to 2.2
                            var yMin = 0.8, yMax = 2.2;
                            function toY(val) { return margin.top + graphH * (1 - (val - yMin) / (yMax - yMin)); }
                            function toX(idx) { return margin.left + (idx / (nShow - 1)) * graphW; }

                            // Grid
                            ctx.strokeStyle = '#1a1a40';
                            ctx.lineWidth = 0.5;
                            for (var y = 1.0; y <= 2.0; y += 0.2) {
                                var sy = toY(y);
                                ctx.beginPath(); ctx.moveTo(margin.left, sy); ctx.lineTo(w - margin.right, sy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(y.toFixed(1), margin.left - 8, sy + 4);
                            }

                            // Golden ratio line
                            var phiY = toY(phi);
                            ctx.strokeStyle = viz.colors.gold;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([8, 4]);
                            ctx.beginPath();
                            ctx.moveTo(margin.left, phiY);
                            ctx.lineTo(w - margin.right, phiY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('\u03C6 \u2248 1.618', w - margin.right - 50, phiY - 12, viz.colors.gold, 12);

                            // Plot ratios
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i < nShow && i < ratios.length; i++) {
                                var sx = toX(i);
                                var sy = toY(ratios[i]);
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Points
                            for (var i = 0; i < nShow && i < ratios.length; i++) {
                                var sx = toX(i);
                                var sy = toY(ratios[i]);
                                ctx.fillStyle = ratios[i] > phi ? viz.colors.teal : viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(sx, sy, 5, 0, Math.PI * 2);
                                ctx.fill();

                                // X label
                                viz.screenText(fib[i+1] + '/' + fib[i], sx, h - margin.bottom + 18, viz.colors.text, 9, 'center');
                            }

                            // Current ratio display
                            var lastIdx = Math.min(nShow - 1, ratios.length - 1);
                            viz.screenText('F(' + (lastIdx + 2) + ')/F(' + (lastIdx + 1) + ') = ' + ratios[lastIdx].toFixed(8), w / 2, 22, viz.colors.white, 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use Binet\'s formula to verify that \\(F_6 = 8\\). You will need \\(\\varphi = \\frac{1+\\sqrt{5}}{2} \\approx 1.6180\\) and \\(\\hat{\\varphi} = \\frac{1-\\sqrt{5}}{2} \\approx -0.6180\\).',
                    hint: 'Compute \\(\\varphi^6\\) and \\(\\hat{\\varphi}^6\\), subtract, divide by \\(\\sqrt{5}\\). Use a calculator.',
                    solution: '\\(\\varphi^6 \\approx 1.6180^6 \\approx 17.944\\). \\(\\hat{\\varphi}^6 \\approx (-0.6180)^6 \\approx 0.0557\\). Difference: \\(17.944 - 0.0557 = 17.889\\). Divide by \\(\\sqrt{5} \\approx 2.236\\): \\(17.889 / 2.236 \\approx 8.000\\). It works!'
                },
                {
                    question: 'Notice that \\(\\hat{\\varphi} \\approx -0.618\\), so \\(|\\hat{\\varphi}| &lt; 1\\). What does this mean for \\(\\hat{\\varphi}^n\\) as \\(n\\) gets large? What does that tell you about a simpler approximate formula for \\(F_n\\)?',
                    hint: 'If \\(|x| &lt; 1\\), then \\(x^n\\) gets closer and closer to 0 as \\(n\\) increases.',
                    solution: 'Since \\(|\\hat{\\varphi}| &lt; 1\\), the term \\(\\hat{\\varphi}^n\\) shrinks toward 0 as \\(n\\) grows. This means for large \\(n\\), we can approximate: \\(F_n \\approx \\frac{\\varphi^n}{\\sqrt{5}}\\). In fact, this approximation is so good that \\(F_n\\) is always the nearest whole number to \\(\\frac{\\varphi^n}{\\sqrt{5}}\\). A formula involving irrational numbers gives the closest integer!'
                },
                {
                    question: 'What happens if you start the Fibonacci-style recurrence with different initial values, say \\(L_1 = 1, L_2 = 3\\)? Compute the first 10 terms. Do the ratios of consecutive terms still approach \\(\\varphi\\)?',
                    hint: 'Apply the same rule: each term is the sum of the two before. The sequence 1, 3, 4, 7, 11, ... is called the Lucas numbers.',
                    solution: 'The Lucas numbers: 1, 3, 4, 7, 11, 18, 29, 47, 76, 123. The ratios: 3.00, 1.33, 1.75, 1.57, 1.64, 1.61, 1.62, 1.617, 1.618... Yes! The ratios still converge to \\(\\varphi\\). In fact, ANY Fibonacci-style sequence (with any positive starting values) has ratios that converge to \\(\\varphi\\). The golden ratio is an attractor of the recurrence, not a property of the specific starting values 1, 1.'
                }
            ]
        },

        // ===== Section 2: Fibonacci in Nature =====
        {
            id: 'fibonacci-nature',
            title: 'Fibonacci in Nature',
            content: `
<h2>When Nature Counts in Fibonacci</h2>

<p>Here is a game you can play right now, if it is the right season. Go outside, find some flowers, and count the petals. You will notice something peculiar:</p>

<ul>
<li><strong>Lilies</strong> have 3 petals</li>
<li><strong>Buttercups</strong> have 5 petals</li>
<li><strong>Delphiniums</strong> have 8 petals</li>
<li><strong>Marigolds</strong> have 13 petals</li>
<li><strong>Asters</strong> have 21 petals</li>
<li><strong>Daisies</strong> often have 34, 55, or 89 petals</li>
</ul>

<p>3, 5, 8, 13, 21, 34, 55, 89: these are all Fibonacci numbers! Is this a coincidence? Not at all. The reason lies in a beautiful geometric principle called <strong>phyllotaxis</strong>, the arrangement of leaves (or petals, or seeds) on a plant.</p>

<h3>The Sunflower's Secret</h3>

<p>Look at the center of a sunflower. The seeds are arranged in two sets of spirals: one set curving clockwise and the other counterclockwise. Count the spirals in each direction. In a typical sunflower, you will find 34 spirals going one way and 55 going the other. Or 55 and 89. Always consecutive Fibonacci numbers.</p>

<p>Why? Each new seed (or leaf, or petal) is placed at an angle of about 137.5 degrees from the previous one. This angle, called the <strong>golden angle</strong>, is related to the golden ratio: it is \\(360^\\circ \\times (1 - 1/\\varphi) \\approx 137.508^\\circ\\). It is the most "irrational" angle possible, meaning it is the angle that avoids lining up with any previous seed for as long as possible.</p>

<div class="env-block definition">
<strong>The Golden Angle</strong><br>
The golden angle is approximately 137.508 degrees. It divides a full circle into two arcs whose ratio is the golden ratio: the smaller arc is to the larger arc as the larger arc is to the full circle. It is the key to efficient packing in plant growth.
</div>

<p>This is nature's optimization at work. A plant wants its leaves to get maximum sunlight, or its seeds to pack as tightly as possible. If each new leaf were placed at a "nice" rational fraction of a full turn (like 1/3 or 2/5 of 360 degrees), the leaves would line up in straight rows, leaving big gaps. But at the golden angle, the leaves spread out as evenly as possible, avoiding the waste of straight-row alignment.</p>

<div class="viz-placeholder" data-viz="ch01-phyllotaxis"></div>

<h3>Pinecones and Pineapples</h3>

<p>The same principle applies to pinecones and pineapples. Look at a pinecone from the bottom. You will see two sets of spirals, one steep and one shallow. Count them: typically 8 in one direction and 13 in the other. Or 5 and 8. Always consecutive Fibonacci numbers.</p>

<p>The same is true of pineapples (8, 13, 21), romanesco broccoli (a stunning natural fractal that arranges its florets in Fibonacci spirals), and even the scales on a pangolin.</p>

<div class="env-block intuition">
<strong>Why Fibonacci numbers specifically?</strong><br>
The golden angle is the key, and the golden ratio is connected to Fibonacci numbers through continued fractions (more on this in Chapter 2). The "best rational approximations" to the golden ratio are ratios of consecutive Fibonacci numbers: 1/1, 2/1, 3/2, 5/3, 8/5, 13/8, ... So when nature uses the golden angle, the resulting spiral counts naturally come out as Fibonacci numbers.
</div>

<h3>A Word of Caution</h3>

<p>It would be an overstatement to say that all natural counts are Fibonacci numbers. Plenty of flowers have 4 petals (which is not a Fibonacci number), and plenty of biological structures follow completely different mathematical rules. The Fibonacci pattern is real and widespread, but it is not a universal law. Science requires us to be honest about exceptions, not just to collect confirming examples.</p>
`,
            visualizations: [
                {
                    id: 'ch01-phyllotaxis',
                    title: 'Sunflower Phyllotaxis',
                    description: 'See how seeds arrange themselves when each new seed is placed at the golden angle (137.5\u00B0) from the last. Adjust the angle to see why the golden angle is special.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var seedCount = 300;
                        var angle = 137.508;
                        var goldenAngle = 137.508;

                        VizEngine.createSlider(controls, 'Seeds', 10, 600, seedCount, 1, function(v) {
                            seedCount = Math.round(v);
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Angle (\u00B0)', 100, 170, angle, 0.1, function(v) {
                            angle = v;
                            draw();
                        });

                        VizEngine.createButton(controls, 'Reset to Golden', function() {
                            angle = goldenAngle;
                            draw();
                            // Update slider display
                            var sliders = controls.querySelectorAll('.viz-slider');
                            if (sliders[1]) {
                                sliders[1].value = goldenAngle;
                                var vals = controls.querySelectorAll('.viz-slider-value');
                                if (vals[1]) vals[1].textContent = goldenAngle.toFixed(1);
                            }
                        });

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            var cx = w / 2, cy = h / 2;
                            var maxR = Math.min(w, h) / 2 - 20;
                            var angleRad = angle * Math.PI / 180;

                            for (var i = 0; i < seedCount; i++) {
                                var theta = i * angleRad;
                                var r = Math.sqrt(i) * (maxR / Math.sqrt(seedCount));
                                var x = cx + r * Math.cos(theta);
                                var y = cy + r * Math.sin(theta);
                                var dotR = Math.max(1.5, 4 - i * 0.005);

                                var hue = (i * 0.8) % 360;
                                ctx.fillStyle = VizEngine.hsl(hue, 70, 50);
                                ctx.beginPath();
                                ctx.arc(x, y, dotR, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Label
                            var diff = Math.abs(angle - goldenAngle);
                            var labelColor = diff < 0.5 ? viz.colors.gold : viz.colors.text;
                            var labelText = 'Angle: ' + angle.toFixed(1) + '\u00B0';
                            if (diff < 0.5) labelText += ' \u2248 Golden Angle!';
                            viz.screenText(labelText, w / 2, h - 16, labelColor, 13);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the phyllotaxis visualization, set the angle to exactly 120 degrees (which is 1/3 of 360). What pattern do you see? Why is this bad for a plant?',
                    hint: 'At 120\u00B0, every third seed lands in the same direction.',
                    solution: 'At 120\u00B0, seeds line up in exactly 3 straight arms radiating from the center. This is terrible for a plant because it leaves huge gaps between the arms, wasting space and sunlight. The golden angle avoids this by ensuring no two seeds ever line up, filling the circle as uniformly as possible.'
                },
                {
                    question: 'Try the angle 137.0 degrees and then 138.0 degrees (just slightly off from the golden angle 137.508\u00B0). What happens to the pattern? How sensitive is the arrangement to small changes?',
                    hint: 'Look for gaps and straight lines appearing in the seed arrangement.',
                    solution: 'Even a small deviation from 137.508\u00B0 causes visible "spokes" and gaps in the seed pattern. At 137.0\u00B0, you can see faint arm-like structures. At 138.0\u00B0, the effect is even more pronounced. The golden angle is a remarkably precise optimum; nature must get within a fraction of a degree for the pattern to work well. This shows why the Fibonacci connection is not approximate but deeply structural.'
                },
                {
                    question: 'Count the spirals in the phyllotaxis visualization (set seeds to about 300 and angle to the golden angle). You should see spirals going clockwise and counterclockwise. Try to count each set. What Fibonacci numbers do you get?',
                    hint: 'Focus on one direction at a time. It helps to follow one spiral arm from the center outward and then count how many parallel arms you can see.',
                    solution: 'With about 300 seeds at the golden angle, you should count approximately 21 spirals in one direction and 34 in the other. These are consecutive Fibonacci numbers! With more seeds (try 500+), you might see the 34 and 55 pair. The Fibonacci numbers emerge naturally from the golden angle spacing.'
                }
            ]
        },

        // ===== Section 3: The Fibonacci Spiral =====
        {
            id: 'fibonacci-spiral',
            title: 'The Fibonacci Spiral',
            content: `
<h2>Building the Spiral, Square by Square</h2>

<p>There is a famous construction that connects the Fibonacci sequence to one of the most beautiful curves in mathematics: the <strong>Fibonacci spiral</strong>.</p>

<p>Here is how it works:</p>

<ol>
<li>Start with a 1&times;1 square.</li>
<li>Place another 1&times;1 square next to it.</li>
<li>Below both, place a 2&times;2 square (since 1+1=2).</li>
<li>To the right, place a 3&times;3 square (since 1+2=3).</li>
<li>On top, place a 5&times;5 square (since 2+3=5).</li>
<li>To the left, place an 8&times;8 square (since 3+5=8).</li>
<li>Continue: the side length of each new square is the sum of the two before it.</li>
</ol>

<p>The result is a <strong>golden rectangle</strong> that grows in a spiral pattern. Now, draw a quarter-circle arc in each square, connecting opposite corners. These arcs join up to form a smooth spiral that looks remarkably like a nautilus shell.</p>

<div class="viz-placeholder" data-viz="ch01-spiral-construction"></div>

<p>This Fibonacci spiral is actually an approximation to the true <strong>logarithmic spiral</strong>, also called the <em>spira mirabilis</em> ("miraculous spiral") by the great mathematician Jacob Bernoulli. A logarithmic spiral has the remarkable property of <strong>self-similarity</strong>: no matter how much you zoom in or out, it looks the same. Bernoulli was so enchanted by this curve that he asked for it to be engraved on his tombstone, with the inscription "Eadem mutata resurgo" ("Although changed, I rise again the same").</p>

<div class="env-block remark">
<strong>The stonecutter's mistake</strong><br>
When Bernoulli died in 1705, the stonecutter accidentally carved an Archimedean spiral (the kind with evenly spaced turns) instead of a logarithmic spiral on his tomb. Mathematicians ever since have found this both tragic and hilarious.
</div>

<h3>Self-Similarity: The Key Idea</h3>

<p>What makes the Fibonacci spiral so special is its self-similarity. Cut off the largest square from a golden rectangle, and what remains is another golden rectangle, just smaller. Cut off the largest square from that, and you get another golden rectangle. This process can continue forever, spiraling inward, creating an infinite regression of similar shapes.</p>

<p>This is a deep property. Most rectangles do not have it. If you cut a square from a regular sheet of paper, what remains is some random rectangle, not a smaller version of what you started with. The golden rectangle is unique in this self-replicating behavior, and it is this property that connects it to growth patterns in nature.</p>

<h3>Where You See It</h3>

<p>The Fibonacci spiral (or its close relative, the logarithmic spiral) appears in:</p>

<ul>
<li><strong>Nautilus shells</strong>: the animal adds chambers in a geometric progression, each chamber about \\(\\varphi\\) times the size of the last.</li>
<li><strong>Hurricane cloud bands</strong>: the shape of the storm is governed by the interplay of rotation and radial flow.</li>
<li><strong>Spiral galaxies</strong>: the arms follow logarithmic spirals shaped by gravity and angular momentum.</li>
<li><strong>The cochlea of the inner ear</strong>: your hearing organ is a logarithmic spiral.</li>
</ul>

<p>In every case, the spiral arises because something is growing (or flowing) while simultaneously rotating. The golden ratio enters because it represents the most "balanced" growth rate, one that avoids the resonances and alignments that would disrupt the smooth spiral.</p>
`,
            visualizations: [
                {
                    id: 'ch01-spiral-construction',
                    title: 'Fibonacci Spiral Construction',
                    description: 'Watch the Fibonacci spiral being built step by step. Each new square has a side length equal to the sum of the two before it.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var stepCount = 8;
                        var showSpiral = true;

                        VizEngine.createSlider(controls, 'Steps', 1, 12, stepCount, 1, function(v) {
                            stepCount = Math.round(v);
                            draw();
                        });

                        VizEngine.createButton(controls, 'Toggle Spiral', function() {
                            showSpiral = !showSpiral;
                            draw();
                        });

                        var hues = [200, 160, 45, 300, 30, 120, 340, 220, 80, 270, 10, 190];

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            var fib = [1, 1];
                            for (var i = 2; i < stepCount; i++) fib.push(fib[i-1] + fib[i-2]);

                            // Build the squares
                            // Each square has position and size
                            // Direction cycle: right, up, left, down
                            var dirs = [
                                { dx: 1, dy: 0 },  // right
                                { dx: 0, dy: -1 }, // up
                                { dx: -1, dy: 0 }, // left
                                { dx: 0, dy: 1 }   // down
                            ];

                            var squares = [];
                            var cx = 0, cy = 0;

                            for (var i = 0; i < stepCount; i++) {
                                var s = fib[i];
                                var dirIdx = i % 4;
                                var sx, sy;

                                if (i === 0) {
                                    sx = 0; sy = 0;
                                } else if (i === 1) {
                                    sx = fib[0]; sy = 0;
                                } else {
                                    var prev = squares[i - 1];
                                    var prevPrev = squares[i - 2];
                                    if (dirIdx === 0) { // right
                                        sx = prev.x + prev.s;
                                        sy = prev.y + prev.s - s;
                                    } else if (dirIdx === 1) { // up
                                        sx = prev.x + prev.s - s;
                                        sy = prev.y - s;
                                    } else if (dirIdx === 2) { // left
                                        sx = prev.x - s;
                                        sy = prev.y;
                                    } else { // down
                                        sx = prev.x;
                                        sy = prev.y + prev.s;
                                    }
                                }
                                squares.push({ x: sx, y: sy, s: s, dir: dirIdx });
                            }

                            // Find bounds
                            var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                            for (var i = 0; i < squares.length; i++) {
                                var sq = squares[i];
                                minX = Math.min(minX, sq.x);
                                maxX = Math.max(maxX, sq.x + sq.s);
                                minY = Math.min(minY, sq.y);
                                maxY = Math.max(maxY, sq.y + sq.s);
                            }

                            var rangeX = maxX - minX;
                            var rangeY = maxY - minY;
                            var scale = Math.min((w - 60) / rangeX, (h - 60) / rangeY);
                            var offX = (w - rangeX * scale) / 2 - minX * scale;
                            var offY = (h - rangeY * scale) / 2 - minY * scale;

                            function tx(x) { return x * scale + offX; }
                            function ty(y) { return y * scale + offY; }

                            // Draw squares
                            for (var i = 0; i < squares.length; i++) {
                                var sq = squares[i];
                                var hue = hues[i % hues.length];
                                ctx.fillStyle = VizEngine.hsl(hue, 40, 15);
                                ctx.strokeStyle = VizEngine.hsl(hue, 60, 50);
                                ctx.lineWidth = 1.5;
                                ctx.fillRect(tx(sq.x), ty(sq.y), sq.s * scale, sq.s * scale);
                                ctx.strokeRect(tx(sq.x), ty(sq.y), sq.s * scale, sq.s * scale);

                                // Label
                                if (sq.s * scale > 20) {
                                    viz.screenText('' + sq.s, tx(sq.x + sq.s / 2), ty(sq.y + sq.s / 2), VizEngine.hsl(hue, 60, 65), Math.min(16, sq.s * scale * 0.3));
                                }
                            }

                            // Draw spiral
                            if (showSpiral) {
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var started = false;

                                for (var i = 0; i < squares.length; i++) {
                                    var sq = squares[i];
                                    var r = sq.s * scale;
                                    var arcCx, arcCy, startAngle, endAngle;

                                    // Quarter circle in each square
                                    if (sq.dir === 0) { // right
                                        arcCx = tx(sq.x + sq.s);
                                        arcCy = ty(sq.y + sq.s);
                                        startAngle = Math.PI;
                                        endAngle = 1.5 * Math.PI;
                                    } else if (sq.dir === 1) { // up
                                        arcCx = tx(sq.x);
                                        arcCy = ty(sq.y + sq.s);
                                        startAngle = 1.5 * Math.PI;
                                        endAngle = 2 * Math.PI;
                                    } else if (sq.dir === 2) { // left
                                        arcCx = tx(sq.x);
                                        arcCy = ty(sq.y);
                                        startAngle = 0;
                                        endAngle = 0.5 * Math.PI;
                                    } else { // down
                                        arcCx = tx(sq.x + sq.s);
                                        arcCy = ty(sq.y);
                                        startAngle = 0.5 * Math.PI;
                                        endAngle = Math.PI;
                                    }

                                    if (!started) {
                                        ctx.moveTo(arcCx + r * Math.cos(startAngle), arcCy + r * Math.sin(startAngle));
                                        started = true;
                                    }
                                    ctx.arc(arcCx, arcCy, r, startAngle, endAngle);
                                }
                                ctx.stroke();
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the Fibonacci spiral construction, the rectangle formed at each step is approximately a golden rectangle (ratio \\(\\approx 1.618\\)). Check this: what is the ratio of the long side to the short side after 6 steps? After 8 steps?',
                    hint: 'After \\(n\\) steps, the rectangle\'s dimensions are \\(F_n \\times F_{n+1}\\). The ratio is \\(F_{n+1}/F_n\\).',
                    solution: 'After 6 steps (using Fibonacci numbers up to F(6)=8): the rectangle is 8 &times; 13, ratio = 13/8 = 1.625. After 8 steps (up to F(8)=21): the rectangle is 21 &times; 34, ratio = 34/21 &asymp; 1.619. Both are very close to \\(\\varphi \\approx 1.6180\\), and the approximation improves with more steps.'
                },
                {
                    question: 'Jacob Bernoulli loved the logarithmic spiral\'s self-similarity property: zoom in, and it looks the same. Can you think of other mathematical objects with this property?',
                    hint: 'Think about the fractals mentioned in Chapter 0. What about certain number sequences?',
                    solution: 'Many fractals have self-similarity: the Koch snowflake, the Sierpinski triangle, the Mandelbrot set, and branching trees. The Cantor set is another example: removing the middle third of every segment produces a set that looks the same at every scale. Even the Fibonacci sequence itself has a kind of algebraic self-similarity: removing the first term gives a sequence that satisfies the same recurrence.'
                }
            ]
        },

        // ===== Section 4: Fibonacci Surprises =====
        {
            id: 'fibonacci-surprises',
            title: 'Fibonacci Surprises',
            content: `
<h2>Unexpected Patterns Within the Pattern</h2>

<p>The Fibonacci sequence is like a gift that keeps unwrapping. Just when you think you have seen everything it has to offer, another surprise appears. Here are some of the most delightful ones.</p>

<h3>1. Fibonacci Sums</h3>

<p>Add up the first few Fibonacci numbers:</p>

\\[F_1 = 1\\]
\\[F_1 + F_2 = 1 + 1 = 2\\]
\\[F_1 + F_2 + F_3 = 1 + 1 + 2 = 4\\]
\\[F_1 + F_2 + F_3 + F_4 = 1 + 1 + 2 + 3 = 7\\]
\\[F_1 + \\cdots + F_5 = 1 + 1 + 2 + 3 + 5 = 12\\]

<p>Now compare: 1, 2, 4, 7, 12. These are one less than 2, 3, 5, 8, 13. The sum of the first \\(n\\) Fibonacci numbers is \\(F_{n+2} - 1\\). Always! This is not a coincidence; it follows directly from the recurrence, since each Fibonacci number can be "telescoped" into a sum.</p>

<div class="env-block theorem">
<strong>Fibonacci Sum Formula</strong><br>
\\[F_1 + F_2 + F_3 + \\cdots + F_n = F_{n+2} - 1\\]
</div>

<h3>2. Fibonacci Squares</h3>

<p>Here is something even more surprising. Take consecutive Fibonacci numbers and square them, then add:</p>

\\[F_1^2 + F_2^2 = 1 + 1 = 2 = 1 \\times 2\\]
\\[F_1^2 + F_2^2 + F_3^2 = 1 + 1 + 4 = 6 = 2 \\times 3\\]
\\[F_1^2 + \\cdots + F_4^2 = 1 + 1 + 4 + 9 = 15 = 3 \\times 5\\]
\\[F_1^2 + \\cdots + F_5^2 = 1 + 1 + 4 + 9 + 25 = 40 = 5 \\times 8\\]

<p>The sum of Fibonacci squares equals the product of two consecutive Fibonacci numbers: \\(F_n \\times F_{n+1}\\). This has a beautiful visual proof: arrange the Fibonacci squares as actual squares, fitting them together into a rectangle. The rectangle always has dimensions \\(F_n \\times F_{n+1}\\).</p>

<div class="env-block theorem">
<strong>Sum of Fibonacci Squares</strong><br>
\\[F_1^2 + F_2^2 + F_3^2 + \\cdots + F_n^2 = F_n \\cdot F_{n+1}\\]
This is the same rectangle we used to build the Fibonacci spiral!
</div>

<h3>3. Cassini's Identity</h3>

<p>This one feels like a magic trick. Take any three consecutive Fibonacci numbers, say \\(F_5 = 5, F_6 = 8, F_7 = 13\\). Compute:</p>

\\[F_6^2 - F_5 \\cdot F_7 = 64 - 65 = -1\\]

<p>Now try \\(F_4 = 3, F_5 = 5, F_6 = 8\\):</p>

\\[F_5^2 - F_4 \\cdot F_6 = 25 - 24 = +1\\]

<p>The result always alternates between +1 and -1! This is <strong>Cassini's identity</strong>:</p>

\\[F_n^2 - F_{n-1} \\cdot F_{n+1} = (-1)^{n+1}\\]

<p>It was discovered by the French astronomer Jean-Dominique Cassini in 1680 (the same Cassini who discovered the gap in Saturn's rings).</p>

<div class="viz-placeholder" data-viz="ch01-fibonacci-calculator"></div>

<h3>4. Every Positive Integer is a Sum of Fibonacci Numbers</h3>

<p>This one is called <strong>Zeckendorf's theorem</strong>: every positive integer can be written as a sum of non-consecutive Fibonacci numbers, and this representation is unique. For example:</p>

<ul>
<li>7 = 5 + 2</li>
<li>10 = 8 + 2</li>
<li>42 = 34 + 8</li>
<li>100 = 89 + 8 + 3</li>
</ul>

<p>This is analogous to how every positive integer can be written in binary (as sums of powers of 2), but using Fibonacci numbers instead. Some computer scientists have actually explored "Fibonacci-base" number systems based on this idea.</p>

<h3>5. Fibonacci and Divisibility</h3>

<p>Here is a pattern that surprises even professional mathematicians when they first see it: \\(F_m\\) divides \\(F_n\\) whenever \\(m\\) divides \\(n\\). For example:</p>

<ul>
<li>\\(F_3 = 2\\) divides \\(F_6 = 8\\), \\(F_9 = 34\\), \\(F_{12} = 144\\)</li>
<li>\\(F_4 = 3\\) divides \\(F_8 = 21\\), \\(F_{12} = 144\\)</li>
<li>\\(F_5 = 5\\) divides \\(F_{10} = 55\\), \\(F_{15} = 610\\)</li>
</ul>

<p>The Fibonacci sequence has an arithmetic structure that mirrors the integers themselves. This is a deep and beautiful fact, and it hints at the profound connections between the Fibonacci sequence and number theory.</p>

<div class="env-block remark">
<strong>Looking ahead</strong><br>
In the next chapter, we will see how the ratio of consecutive Fibonacci numbers converges to the golden ratio \\(\\varphi\\), and why \\(\\varphi\\) is considered the "most irrational" number. The Fibonacci story is just getting started.
</div>
`,
            visualizations: [
                {
                    id: 'ch01-fibonacci-calculator',
                    title: 'Fibonacci Identity Explorer',
                    description: 'Verify the Fibonacci identities yourself. Choose a value of n and see the sum formula, squares formula, and Cassini identity in action.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var nVal = 6;

                        var fib = [0, 1, 1];
                        for (var i = 3; i <= 25; i++) fib.push(fib[i-1] + fib[i-2]);

                        VizEngine.createSlider(controls, 'n', 2, 15, nVal, 1, function(v) {
                            nVal = Math.round(v);
                            draw();
                        });

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            var n = nVal;
                            var y = 40;
                            var lineH = 50;

                            // Display Fibonacci numbers
                            var fibStr = '';
                            for (var i = 1; i <= n; i++) {
                                fibStr += (i > 1 ? ', ' : '') + fib[i];
                            }
                            viz.screenText('F(1)..F(' + n + '): ' + fibStr, w / 2, y, viz.colors.white, 13);
                            y += lineH;

                            // Sum identity
                            var sum = 0;
                            for (var i = 1; i <= n; i++) sum += fib[i];
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fillRect(20, y - 20, w - 40, 40);
                            viz.screenText('Sum Identity: F(1)+...+F(' + n + ') = ' + sum + '  =  F(' + (n+2) + ')-1 = ' + fib[n+2] + '-1 = ' + (fib[n+2] - 1), w / 2, y, viz.colors.blue, 13);
                            var sumOk = sum === fib[n+2] - 1;
                            viz.screenText(sumOk ? '\u2713' : '\u2717', w - 35, y, sumOk ? viz.colors.green : viz.colors.red, 16);
                            y += lineH;

                            // Squares identity
                            var sqSum = 0;
                            for (var i = 1; i <= n; i++) sqSum += fib[i] * fib[i];
                            var sqProd = fib[n] * fib[n + 1];
                            ctx.fillStyle = viz.colors.teal + '22';
                            ctx.fillRect(20, y - 20, w - 40, 40);
                            viz.screenText('Squares: F(1)\u00B2+...+F(' + n + ')\u00B2 = ' + sqSum + '  =  F(' + n + ')\u00B7F(' + (n+1) + ') = ' + fib[n] + '\u00B7' + fib[n+1] + ' = ' + sqProd, w / 2, y, viz.colors.teal, 13);
                            var sqOk = sqSum === sqProd;
                            viz.screenText(sqOk ? '\u2713' : '\u2717', w - 35, y, sqOk ? viz.colors.green : viz.colors.red, 16);
                            y += lineH;

                            // Cassini identity
                            if (n >= 2) {
                                var cassini = fib[n] * fib[n] - fib[n-1] * fib[n+1];
                                var expected = Math.pow(-1, n + 1);
                                ctx.fillStyle = viz.colors.orange + '22';
                                ctx.fillRect(20, y - 20, w - 40, 40);
                                viz.screenText('Cassini: F(' + n + ')\u00B2 - F(' + (n-1) + ')\u00B7F(' + (n+1) + ') = ' + (fib[n]*fib[n]) + ' - ' + (fib[n-1]*fib[n+1]) + ' = ' + cassini + '  [expected: ' + expected + ']', w / 2, y, viz.colors.orange, 13);
                                var casOk = cassini === expected;
                                viz.screenText(casOk ? '\u2713' : '\u2717', w - 35, y, casOk ? viz.colors.green : viz.colors.red, 16);
                            }
                            y += lineH;

                            // Zeckendorf representation of a number
                            var num = fib[n] + 7;
                            var zeck = [];
                            var rem = num;
                            for (var i = 20; i >= 1; i--) {
                                if (fib[i] <= rem) {
                                    zeck.push(fib[i]);
                                    rem -= fib[i];
                                }
                                if (rem === 0) break;
                            }
                            ctx.fillStyle = viz.colors.purple + '22';
                            ctx.fillRect(20, y - 20, w - 40, 40);
                            viz.screenText('Zeckendorf: ' + num + ' = ' + zeck.join(' + '), w / 2, y, viz.colors.purple, 13);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify the Fibonacci sum formula for \\(n = 7\\): compute \\(F_1 + F_2 + \\cdots + F_7\\) directly and check that it equals \\(F_9 - 1\\).',
                    hint: 'The first 9 Fibonacci numbers are 1, 1, 2, 3, 5, 8, 13, 21, 34.',
                    solution: '\\(F_1 + F_2 + \\cdots + F_7 = 1 + 1 + 2 + 3 + 5 + 8 + 13 = 33\\). And \\(F_9 - 1 = 34 - 1 = 33\\). It checks out!'
                },
                {
                    question: 'Find the Zeckendorf representation of 50 (write it as a sum of non-consecutive Fibonacci numbers).',
                    hint: 'Start with the largest Fibonacci number that does not exceed 50, then repeat with the remainder. Fibonacci numbers: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...',
                    solution: 'The largest Fibonacci number &le; 50 is 34. Remainder: 50 - 34 = 16. Largest Fibonacci &le; 16 is 13. Remainder: 16 - 13 = 3. 3 is a Fibonacci number. So 50 = 34 + 13 + 3. Check: no two of these are consecutive Fibonacci numbers. Valid!'
                },
                {
                    question: 'Verify the divisibility property: check that \\(F_4 = 3\\) divides \\(F_8\\), \\(F_{12}\\), and \\(F_{16}\\).',
                    hint: 'Compute \\(F_8, F_{12}, F_{16}\\) and check if each is divisible by 3.',
                    solution: '\\(F_8 = 21 = 3 \\times 7\\). \\(F_{12} = 144 = 3 \\times 48\\). \\(F_{16} = 987 = 3 \\times 329\\). All divisible by \\(F_4 = 3\\)!'
                }
            ]
        }
    ]
});
})();
