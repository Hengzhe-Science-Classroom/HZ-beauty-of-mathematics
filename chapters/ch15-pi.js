// === Chapter 15: The Story of π ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'The Story of \u03C0',
    subtitle: 'The most famous number in mathematics, hiding everywhere you look',
    sections: [
        // ─────────────────────────────────────────────
        // Section 1: The Most Famous Number
        // ─────────────────────────────────────────────
        {
            id: 'sec-most-famous',
            title: 'The Most Famous Number',
            content: `
<h2>A Number That Never Ends</h2>

<p>Take any circle, anywhere in the universe. Wrap a string around it to measure the circumference, then stretch another string across its widest point to measure the diameter. Divide the first length by the second. No matter how large or small the circle, no matter whether you drew it on paper, traced it on a beach, or imagined it orbiting a distant star, you will always get the same number:</p>

\\[ \\pi = 3.14159265358979323846\\ldots \\]

<p>Those digits never end and never settle into a repeating pattern. That single fact, that such a simple geometric ratio produces a number of infinite, patternless complexity, is one of the great surprises of mathematics.</p>

<div class="env-block definition">
<strong>Definition.</strong> The number \\(\\pi\\) (pi) is the ratio of a circle's circumference \\(C\\) to its diameter \\(d\\):
\\[ \\pi = \\frac{C}{d} \\]
</div>

<h3>An Ancient Obsession</h3>

<p>Humans have been chasing \\(\\pi\\) for over 4,000 years. The ancient Babylonians, around 1900 BCE, used the approximation \\(\\pi \\approx 3\\frac{1}{8} = 3.125\\). Not bad for a civilization writing on clay tablets. The Egyptians, in the Rhind Papyrus (circa 1650 BCE), effectively used \\(\\pi \\approx \\frac{256}{81} \\approx 3.1605\\). The Hebrew Bible mentions a circular basin with circumference 30 cubits and diameter 10 cubits, implying \\(\\pi = 3\\), a rough but workable estimate for practical construction.</p>

<p>In ancient India, the Shatapatha Brahmana gave \\(\\pi \\approx \\frac{339}{108} \\approx 3.139\\). In China, the brilliant mathematician Zu Chongzhi (5th century CE) calculated \\(\\pi\\) to seven decimal places and found the remarkable fraction \\(\\frac{355}{113} \\approx 3.1415929\\ldots\\), accurate to six decimal places. This approximation was not surpassed in Europe for another thousand years.</p>

<h3>What Kind of Number Is \\(\\pi\\)?</h3>

<p>As mathematicians sharpened their tools, they discovered that \\(\\pi\\) is not just irrational (Johann Lambert proved this in 1761, meaning it cannot be written as a fraction of two whole numbers), but <em>transcendental</em> (Ferdinand von Lindemann proved this in 1882, meaning it is not the root of any polynomial equation with integer coefficients).</p>

<div class="env-block theorem">
<strong>Lindemann's Theorem (1882).</strong> The number \\(\\pi\\) is transcendental. As a consequence, it is impossible to "square the circle" (construct a square with the same area as a given circle using only a compass and straightedge).
</div>

<p>This settled a question that had tormented geometers for over 2,000 years. Countless people had tried to square the circle; Lindemann showed they were chasing a phantom.</p>

<div class="viz-placeholder" data-viz="viz-pi-timeline"></div>

<div class="env-block intuition">
<strong>Intuition.</strong> An <em>irrational</em> number has a decimal expansion that goes on forever without repeating. A <em>transcendental</em> number goes even further: it cannot be the solution of any algebraic equation like \\(x^2 - 2 = 0\\) (which gives \\(\\sqrt{2}\\)). Most real numbers are transcendental, but proving any specific number is transcendental is extremely difficult. Only a handful of famous constants have been proven transcendental, and \\(\\pi\\) is one of them.
</div>
`,
            visualizations: [
                {
                    id: 'viz-pi-timeline',
                    title: 'Approximations of \u03C0 Through History',
                    description: 'Watch how humanity\'s knowledge of \u03C0 improved over millennia. The blue line shows each civilization\'s best estimate; the dashed orange line is the true value.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 60, originY: 340 });
                        var data = [
                            { year: -1900, val: 3.125, label: 'Babylon' },
                            { year: -1650, val: 3.1605, label: 'Egypt' },
                            { year: -250, val: 3.14185, label: 'Archimedes' },
                            { year: 150, val: 3.14166, label: 'Ptolemy' },
                            { year: 480, val: 3.1415926, label: 'Zu Chongzhi' },
                            { year: 1400, val: 3.14159265, label: 'Madhava' },
                            { year: 1706, val: 3.141592653, label: 'Machin' },
                            { year: 1874, val: 3.14159265358, label: 'Shanks' }
                        ];
                        var w = viz.width, h = viz.height;
                        var piTrue = Math.PI;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var padL = 80, padR = 40, padT = 40, padB = 60;
                            var plotW = w - padL - padR;
                            var plotH = h - padT - padB;
                            var yMin = 3.0, yMax = 3.2;
                            var xMin = -2000, xMax = 2000;

                            function toSx(yr) { return padL + (yr - xMin) / (xMax - xMin) * plotW; }
                            function toSy(v) { return padT + (1 - (v - yMin) / (yMax - yMin)) * plotH; }

                            // grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var yy = 3.0; yy <= 3.2; yy += 0.02) {
                                var sy = toSy(yy);
                                ctx.beginPath(); ctx.moveTo(padL, sy); ctx.lineTo(w - padR, sy); ctx.stroke();
                            }

                            // true pi line
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
                            var piY = toSy(piTrue);
                            ctx.beginPath(); ctx.moveTo(padL, piY); ctx.lineTo(w - padR, piY); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.orange; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            ctx.fillText('\u03C0 = 3.14159...', w - padR - 100, piY - 4);

                            // axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB); ctx.lineTo(w - padR, h - padB); ctx.stroke();

                            // y labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var yy2 = 3.0; yy2 <= 3.2; yy2 += 0.05) {
                                ctx.fillText(yy2.toFixed(2), padL - 6, toSy(yy2));
                            }

                            // x labels
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            [-2000, -1000, 0, 1000, 2000].forEach(function(yr) {
                                ctx.fillText((yr < 0 ? Math.abs(yr) + ' BCE' : yr + ' CE'), toSx(yr), h - padB + 6);
                            });

                            // data line
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            ctx.beginPath();
                            data.forEach(function(d, i) {
                                var sx = toSx(d.year), sy = toSy(d.val);
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            });
                            ctx.stroke();

                            // data points
                            data.forEach(function(d) {
                                var sx = toSx(d.year), sy = toSy(d.val);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.white; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                                ctx.fillText(d.label, sx, sy - 8);
                            });

                            ctx.fillStyle = viz.colors.text; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Year', w / 2, h - 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'If a circle has a diameter of 10 cm, what is its circumference? What if the diameter is 1 million km?',
                    hint: 'Use the definition \\(C = \\pi d\\).',
                    solution: 'For \\(d = 10\\) cm: \\(C = 10\\pi \\approx 31.416\\) cm. For \\(d = 1{,}000{,}000\\) km: \\(C = 1{,}000{,}000\\pi \\approx 3{,}141{,}593\\) km. The ratio \\(C/d\\) is always \\(\\pi\\), regardless of scale.'
                },
                {
                    question: 'Why can\'t \\(\\pi\\) be exactly equal to \\(\\frac{22}{7}\\)?',
                    hint: 'What kind of number is \\(\\frac{22}{7}\\)? What kind of number is \\(\\pi\\)?',
                    solution: 'The fraction \\(\\frac{22}{7} = 3.142857142857\\ldots\\) is a <em>rational</em> number (its decimal expansion repeats the block 142857 forever). But \\(\\pi\\) is <em>irrational</em>, so its decimal expansion never repeats. Therefore \\(\\pi \\neq \\frac{22}{7}\\). However, \\(\\frac{22}{7}\\) is a useful approximation, accurate to about two decimal places.'
                },
                {
                    question: 'Zu Chongzhi\'s approximation \\(\\frac{355}{113}\\) is accurate to six decimal places. Compute \\(\\frac{355}{113}\\) and compare it to \\(\\pi = 3.14159265\\ldots\\)',
                    hint: 'Do the long division, or use a calculator.',
                    solution: '\\(\\frac{355}{113} = 3.14159292\\ldots\\) while \\(\\pi = 3.14159265\\ldots\\) The two agree through the sixth decimal place (3.141592), differing only at the seventh digit. This makes it one of the best rational approximations of \\(\\pi\\) relative to the size of the denominator.'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 2: Archimedes' Brilliant Idea
        // ─────────────────────────────────────────────
        {
            id: 'sec-archimedes',
            title: 'Archimedes\' Brilliant Idea',
            content: `
<h2>Squeezing \\(\\pi\\) Between Polygons</h2>

<p>Around 250 BCE, the Greek mathematician Archimedes of Syracuse devised one of the most elegant ideas in the history of mathematics. He could not compute \\(\\pi\\) exactly, but he could trap it between two numbers that he <em>could</em> compute, and then squeeze those numbers closer and closer together.</p>

<p>His strategy was beautifully simple. Draw a circle. Now draw a regular polygon <em>inside</em> the circle (inscribed) and another regular polygon <em>outside</em> the circle (circumscribed). The perimeter of the inner polygon is a bit less than the circumference of the circle, and the perimeter of the outer polygon is a bit more. So if we divide each perimeter by the diameter, we get a lower bound and an upper bound for \\(\\pi\\).</p>

<div class="env-block intuition">
<strong>Archimedes' Squeeze.</strong> If \\(P_{\\text{in}}\\) is the perimeter of the inscribed polygon and \\(P_{\\text{out}}\\) is the perimeter of the circumscribed polygon, both for a circle of diameter \\(d\\), then:
\\[ \\frac{P_{\\text{in}}}{d} \\;&lt;\\; \\pi \\;&lt;\\; \\frac{P_{\\text{out}}}{d} \\]
As the number of sides increases, both bounds converge to \\(\\pi\\).
</div>

<p>Start with a hexagon (6 sides). The inscribed hexagon has perimeter exactly \\(6r = 3d\\), giving a lower bound of 3. Not very impressive. The circumscribed hexagon gives an upper bound of about 3.464. So with hexagons, all we know is that \\(3 &lt; \\pi &lt; 3.464\\).</p>

<p>But now comes the magic: double the number of sides. A 12-sided polygon (dodecagon) hugs the circle more tightly. Archimedes used a clever geometric trick to compute the perimeter of a \\(2n\\)-gon from the perimeter of an \\(n\\)-gon, without starting from scratch each time. He doubled again and again: 12, 24, 48, and finally 96 sides.</p>

<p>With a 96-sided polygon, Archimedes proved that:</p>
\\[ 3\\tfrac{10}{71} \\;&lt;\\; \\pi \\;&lt;\\; 3\\tfrac{1}{7} \\]
<p>In decimal, that is \\(3.14084 &lt; \\pi &lt; 3.14286\\). He had pinned down \\(\\pi\\) to two decimal places, a triumph of pure geometric reasoning, done without algebra, without calculus, without a calculator, using only a compass, a straightedge, and brilliant ingenuity.</p>

<h3>Why This Idea Matters</h3>

<p>Archimedes' method is a precursor to the concept of a <em>limit</em>, which would not be made rigorous for another two thousand years. The idea of trapping a quantity between an upper bound and a lower bound that converge is at the heart of calculus. Every time you see a \\(\\lim\\) symbol in a calculus textbook, you are seeing Archimedes' ghost.</p>

<p>Later mathematicians extended his method. By the late 1500s, Ludolph van Ceulen used polygons with \\(2^{62}\\) sides (over 4 quintillion sides!) to compute 35 digits of \\(\\pi\\). He was so proud of this achievement that the digits were engraved on his tombstone. In Germany, \\(\\pi\\) is still sometimes called the "Ludolphine number."</p>

<div class="viz-placeholder" data-viz="viz-archimedes"></div>

<div class="env-block remark">
<strong>Remark.</strong> The formula for the perimeter of a regular \\(n\\)-gon inscribed in a circle of radius \\(r\\) is \\(P_n = 2nr\\sin(\\pi/n)\\). As \\(n \\to \\infty\\), we get \\(P_n \\to 2\\pi r\\), confirming that the polygon perimeter converges to the circle's circumference. But Archimedes did not have trigonometry; he computed everything with purely geometric methods.
</div>
`,
            visualizations: [
                {
                    id: 'viz-archimedes',
                    title: 'Archimedes\' Method: Polygons Approaching a Circle',
                    description: 'Use the slider to increase the number of sides. Watch how the inscribed (blue) and circumscribed (orange) polygons squeeze the circle (white), and how the upper and lower bounds converge to \u03C0.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 100, originX: null, originY: null });
                        viz.originX = viz.width / 2;
                        viz.originY = viz.height / 2 + 10;
                        var nSides = 6;
                        var slider = VizEngine.createSlider(controls, 'Sides: ', 3, 96, 6, 1, function(val) {
                            nSides = Math.round(val);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var r = 1; // radius in math coords

                            // circumscribed polygon
                            var outerPts = [];
                            for (var i = 0; i < nSides; i++) {
                                var angle = (2 * Math.PI * i / nSides) - Math.PI / 2;
                                var rOut = r / Math.cos(Math.PI / nSides);
                                outerPts.push([rOut * Math.cos(angle), rOut * Math.sin(angle)]);
                            }
                            viz.drawPolygon(outerPts, 'rgba(240,136,62,0.12)', viz.colors.orange, 2);

                            // circle
                            viz.drawCircle(0, 0, r, null, viz.colors.white, 2);

                            // inscribed polygon
                            var innerPts = [];
                            for (var j = 0; j < nSides; j++) {
                                var angle2 = (2 * Math.PI * j / nSides) - Math.PI / 2;
                                innerPts.push([r * Math.cos(angle2), r * Math.sin(angle2)]);
                            }
                            viz.drawPolygon(innerPts, 'rgba(88,166,255,0.12)', viz.colors.blue, 2);

                            // compute bounds
                            var lower = nSides * Math.sin(Math.PI / nSides);
                            var upper = nSides * Math.tan(Math.PI / nSides);

                            // display info
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            var infoX = 14, infoY = 14;
                            ctx.fillText('n = ' + nSides + ' sides', infoX, infoY);
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Lower bound: ' + lower.toFixed(8), infoX, infoY + 22);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Upper bound: ' + upper.toFixed(8), infoX, infoY + 40);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Gap: ' + (upper - lower).toFixed(8), infoX, infoY + 58);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('\u03C0 = ' + Math.PI.toFixed(8), infoX, infoY + 76);

                            // convergence bar at bottom
                            var barY = viz.height - 30;
                            var barX0 = 60, barW = viz.width - 120;
                            var vMin = 3.0, vMax = 3.3;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(barX0, barY); ctx.lineTo(barX0 + barW, barY); ctx.stroke();

                            function valToX(v) { return barX0 + (v - vMin) / (vMax - vMin) * barW; }

                            // pi marker
                            var piX = valToX(Math.PI);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(piX, barY, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.teal; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText('\u03C0', piX, barY - 8);

                            // bounds
                            var lx = valToX(lower), ux = valToX(upper);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(lx, barY, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(ux, barY, 4, 0, Math.PI * 2); ctx.fill();

                            // bracket
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(lx, barY - 4); ctx.lineTo(lx, barY + 4); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(ux, barY - 4); ctx.lineTo(ux, barY + 4); ctx.stroke();
                            ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 8;
                            ctx.beginPath(); ctx.moveTo(lx, barY); ctx.lineTo(ux, barY); ctx.stroke();

                            // labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('3.0', barX0, barY + 6);
                            ctx.fillText('3.3', barX0 + barW, barY + 6);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A regular hexagon inscribed in a circle of radius 1 has perimeter 6. What lower bound does this give for \\(\\pi\\)?',
                    hint: 'The circle has diameter \\(d = 2\\). The lower bound is \\(P_{\\text{in}} / d\\).',
                    solution: 'The lower bound is \\(\\frac{6}{2} = 3\\). This is the crudest Archimedean bound: \\(\\pi &gt; 3\\).'
                },
                {
                    question: 'If you double the number of sides from 6 to 12, the inscribed perimeter becomes \\(12\\sin(\\pi/12) \\approx 6.2117\\). What is the new lower bound for \\(\\pi\\)?',
                    hint: 'Divide by the diameter, which is 2.',
                    solution: 'Lower bound \\(= \\frac{12\\sin(\\pi/12)}{2} = 6\\sin(15^\\circ) \\approx \\frac{6.2117}{2} \\approx 3.1058\\). Already closer to \\(\\pi\\) than the hexagon bound of 3.'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 3: Buffon's Needle and Monte Carlo
        // ─────────────────────────────────────────────
        {
            id: 'sec-buffon-monte-carlo',
            title: 'Buffon\'s Needle and Monte Carlo',
            content: `
<h2>Finding \\(\\pi\\) with Random Needles</h2>

<p>In 1777, the French naturalist Georges-Louis Leclerc, Comte de Buffon, posed a charming question: suppose you have a floor made of parallel wooden planks, each the same width, and you drop a needle onto the floor at random. What is the probability that the needle crosses one of the lines between the planks?</p>

<p>The answer, astonishingly, involves \\(\\pi\\).</p>

<div class="env-block theorem">
<strong>Buffon's Needle.</strong> If a needle of length \\(L\\) is dropped on a floor with parallel lines spaced \\(d\\) apart (where \\(L \\leq d\\)), the probability that the needle crosses a line is:
\\[ P = \\frac{2L}{\\pi d} \\]
</div>

<p>This means that if you drop many needles and count how many cross a line, you can estimate \\(\\pi\\)! Rearranging: \\(\\pi \\approx \\frac{2L \\cdot N}{d \\cdot H}\\), where \\(N\\) is the total number of needles dropped and \\(H\\) is the number of hits (crossings). The more needles you drop, the better the estimate.</p>

<p>In 1901, the Italian mathematician Mario Lazzarini claimed to have performed the experiment with 3,408 needle tosses and obtained \\(\\pi \\approx 3.1415929\\), matching the first six decimal places. This result was suspiciously good; modern statisticians believe he rigged the stopping point. But the mathematics behind Buffon's needle is perfectly sound.</p>

<div class="viz-placeholder" data-viz="viz-buffon"></div>

<h2>Monte Carlo: Throw Darts at \\(\\pi\\)</h2>

<p>There is an even simpler way to estimate \\(\\pi\\) using randomness. Draw a square, and inscribe a quarter-circle inside it (one corner of the square is the center of the circle). Now throw darts at the square completely at random. Some darts will land inside the quarter-circle; others will land outside it but still inside the square.</p>

<p>The area of the quarter-circle is \\(\\frac{\\pi r^2}{4}\\), and the area of the square is \\(r^2\\). So the probability that a random dart lands inside the quarter-circle is:</p>

\\[ P = \\frac{\\pi r^2 / 4}{r^2} = \\frac{\\pi}{4} \\]

<p>Therefore \\(\\pi \\approx 4 \\times \\frac{\\text{darts inside circle}}{\\text{total darts}}\\). This is a <em>Monte Carlo method</em>, named after the famous casino in Monaco, because it relies on randomness to compute something deterministic.</p>

<div class="viz-placeholder" data-viz="viz-monte-carlo"></div>

<div class="env-block remark">
<strong>Remark.</strong> Monte Carlo methods converge slowly: to get one more decimal digit of accuracy, you need roughly 100 times as many random samples. Nobody uses Monte Carlo to actually compute digits of \\(\\pi\\) today, but the same idea of using randomness to approximate complex quantities is fundamental in physics, finance, machine learning, and countless other fields.
</div>
`,
            visualizations: [
                {
                    id: 'viz-buffon',
                    title: 'Buffon\'s Needle Simulation',
                    description: 'Click "Drop Needles" to drop random needles onto parallel lines. Needles that cross a line are orange; those that don\'t are blue. Watch the estimate of \u03C0 converge.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var needles = [];
                        var hits = 0;
                        var lineSpacing = 60; // pixels
                        var needleLen = 40; // pixels (L < d)
                        var running = false;
                        var dropInterval = null;

                        function draw() {
                            viz.clear();
                            // draw parallel lines
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 1;
                            for (var y = lineSpacing; y < h; y += lineSpacing) {
                                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
                            }

                            // draw needles
                            for (var i = 0; i < needles.length; i++) {
                                var n = needles[i];
                                ctx.strokeStyle = n.hit ? viz.colors.orange : viz.colors.blue;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(n.x1, n.y1); ctx.lineTo(n.x2, n.y2); ctx.stroke();
                            }

                            // info box
                            ctx.fillStyle = 'rgba(12,12,32,0.85)';
                            ctx.fillRect(8, 8, 220, 72);
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Needles: ' + needles.length + '  |  Hits: ' + hits, 16, 16);
                            if (needles.length > 0 && hits > 0) {
                                var est = (2 * needleLen * needles.length) / (lineSpacing * hits);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('\u03C0 \u2248 ' + est.toFixed(6), 16, 36);
                                ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Error: ' + Math.abs(est - Math.PI).toFixed(6), 16, 56);
                            }
                        }

                        function dropOne() {
                            var cx = Math.random() * w;
                            var cy = Math.random() * h;
                            var angle = Math.random() * Math.PI;
                            var dx = (needleLen / 2) * Math.cos(angle);
                            var dy = (needleLen / 2) * Math.sin(angle);
                            var x1 = cx - dx, y1 = cy - dy;
                            var x2 = cx + dx, y2 = cy + dy;
                            // check crossing
                            var yMin = Math.min(y1, y2), yMax = Math.max(y1, y2);
                            var crossed = false;
                            for (var ly = lineSpacing; ly < h; ly += lineSpacing) {
                                if (yMin <= ly && yMax >= ly) { crossed = true; break; }
                            }
                            if (crossed) hits++;
                            needles.push({ x1: x1, y1: y1, x2: x2, y2: y2, hit: crossed });
                        }

                        function dropBatch() {
                            for (var i = 0; i < 20; i++) dropOne();
                            draw();
                        }

                        VizEngine.createButton(controls, 'Drop 20 Needles', dropBatch);
                        VizEngine.createButton(controls, 'Drop 500', function() {
                            for (var i = 0; i < 500; i++) dropOne();
                            draw();
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            needles = []; hits = 0; draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-monte-carlo',
                    title: 'Monte Carlo \u03C0 Estimation',
                    description: 'Random points are thrown into a unit square. Points inside the quarter-circle (distance from origin &le; 1) are teal; points outside are red. The ratio estimates \u03C0/4.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var side = Math.min(w, h) - 80;
                        var ox = 50, oy = 20;
                        var points = [];
                        var inside = 0;

                        function draw() {
                            viz.clear();
                            // square
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.strokeRect(ox, oy, side, side);

                            // quarter circle arc
                            ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(ox, oy + side, side, -Math.PI / 2, 0);
                            ctx.stroke();

                            // points
                            for (var i = 0; i < points.length; i++) {
                                var p = points[i];
                                ctx.fillStyle = p.in ? viz.colors.teal : viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(ox + p.x * side, oy + (1 - p.y) * side, 1.5, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // info
                            ctx.fillStyle = 'rgba(12,12,32,0.85)';
                            ctx.fillRect(ox + side + 10, oy, 170, 100);
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Total: ' + points.length, ox + side + 18, oy + 8);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Inside: ' + inside, ox + side + 18, oy + 28);
                            if (points.length > 0) {
                                var est = 4 * inside / points.length;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.fillText('\u03C0 \u2248 ' + est.toFixed(6), ox + side + 18, oy + 52);
                                ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Error: ' + Math.abs(est - Math.PI).toFixed(6), ox + side + 18, oy + 74);
                            }
                        }

                        function throwDarts(n) {
                            for (var i = 0; i < n; i++) {
                                var x = Math.random(), y = Math.random();
                                var isIn = (x * x + y * y) <= 1;
                                if (isIn) inside++;
                                points.push({ x: x, y: y, in: isIn });
                            }
                            draw();
                        }

                        VizEngine.createButton(controls, 'Throw 100', function() { throwDarts(100); });
                        VizEngine.createButton(controls, 'Throw 1000', function() { throwDarts(1000); });
                        VizEngine.createButton(controls, 'Throw 10000', function() { throwDarts(10000); });
                        VizEngine.createButton(controls, 'Reset', function() { points = []; inside = 0; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In a Buffon\'s needle experiment, you dropped 1000 needles and 637 crossed a line. The needle length equals the line spacing (\\(L = d\\)). Estimate \\(\\pi\\).',
                    hint: 'Use the formula \\(\\pi \\approx \\frac{2L \\cdot N}{d \\cdot H}\\). When \\(L = d\\), this simplifies to \\(\\pi \\approx \\frac{2N}{H}\\).',
                    solution: '\\(\\pi \\approx \\frac{2 \\times 1000}{637} = \\frac{2000}{637} \\approx 3.1397\\). This is within about 0.06% of the true value.'
                },
                {
                    question: 'In a Monte Carlo experiment with 5000 random points, 3927 landed inside the quarter-circle. Estimate \\(\\pi\\).',
                    hint: 'Use \\(\\pi \\approx 4 \\times \\frac{\\text{inside}}{\\text{total}}\\).',
                    solution: '\\(\\pi \\approx 4 \\times \\frac{3927}{5000} = 4 \\times 0.7854 = 3.1416\\). Very close to the true value!'
                },
                {
                    question: 'Why does Monte Carlo converge so slowly? If you want to double the number of correct decimal digits, roughly how many more points do you need?',
                    hint: 'Think about the law of large numbers and standard errors.',
                    solution: 'The standard error of a proportion estimate decreases as \\(1/\\sqrt{N}\\). To get one more decimal digit of accuracy (reduce error by a factor of 10), you need about \\(10^2 = 100\\) times as many points. To double the number of correct digits, you need roughly \\(N^2\\) total points if you started with \\(N\\) points. This is why Monte Carlo is illustrative but impractical for precision computation of \\(\\pi\\).'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 4: π in Unexpected Places
        // ─────────────────────────────────────────────
        {
            id: 'sec-pi-unexpected',
            title: '\u03C0 in Unexpected Places',
            content: `
<h2>Far Beyond Circles</h2>

<p>If \\(\\pi\\) only appeared in the formula for a circle's circumference, it would be a useful number but not a deeply mysterious one. What makes \\(\\pi\\) extraordinary is that it shows up in places that seem to have absolutely nothing to do with circles.</p>

<h3>Euler's Identity: The Most Beautiful Equation</h3>

<p>In 1748, the Swiss mathematician Leonhard Euler published a formula that many mathematicians consider the most beautiful equation ever written:</p>

\\[ e^{i\\pi} + 1 = 0 \\]

<p>This single equation links five of the most fundamental constants in mathematics: \\(e\\) (the base of natural logarithms, approximately 2.718), \\(i\\) (the imaginary unit, \\(\\sqrt{-1}\\)), \\(\\pi\\), 1 (the multiplicative identity), and 0 (the additive identity). It connects arithmetic (0 and 1), algebra (\\(i\\)), analysis (\\(e\\)), and geometry (\\(\\pi\\)) in one short, elegant line. The physicist Richard Feynman, upon encountering it as a teenager, called it "the most remarkable formula in mathematics."</p>

<div class="env-block definition">
<strong>Euler's Formula (general form).</strong>
\\[ e^{i\\theta} = \\cos\\theta + i\\sin\\theta \\]
Setting \\(\\theta = \\pi\\) gives \\(e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1 + 0 = -1\\), hence \\(e^{i\\pi} + 1 = 0\\).
</div>

<h3>\\(\\pi\\) in the Gaussian Bell Curve</h3>

<p>The Gaussian (normal) distribution, the famous "bell curve" that describes everything from exam scores to measurement errors to the heights of people in a population, has the formula:</p>

\\[ f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-(x-\\mu)^2/(2\\sigma^2)} \\]

<p>Why is \\(\\pi\\) here? This formula describes a probability distribution, not a circle. The reason is subtle and beautiful: the bell curve is connected to the circle through the Gaussian integral, one of the most remarkable results in calculus:</p>

\\[ \\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi} \\]

<p>The proof of this result (due to Poisson, building on Euler's ideas) involves converting the one-dimensional integral to a two-dimensional one using polar coordinates, and in two dimensions, circles naturally appear. So \\(\\pi\\) sneaks into probability through geometry in disguise.</p>

<h3>\\(\\pi\\) in Number Theory</h3>

<p>In 1735, Euler solved a famous problem that had stumped mathematicians for nearly a century: what is the exact value of the sum \\(1 + \\frac{1}{4} + \\frac{1}{9} + \\frac{1}{16} + \\cdots\\), the sum of reciprocals of perfect squares? His answer stunned the mathematical world:</p>

\\[ \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6} \\]

<p>Squares! Reciprocals! Nothing here looks circular. Yet \\(\\pi\\) is hiding inside. Euler went on to find similar formulas for higher even powers, all involving \\(\\pi\\). This discovery opened the door to what we now call the Riemann zeta function, which connects \\(\\pi\\) to prime numbers and is the subject of the greatest unsolved problem in mathematics (see Chapter 17).</p>

<div class="viz-placeholder" data-viz="viz-euler-sum"></div>

<h3>\\(\\pi\\) in Colliding Blocks</h3>

<p>Here is perhaps the most jaw-dropping appearance of \\(\\pi\\). In 2003, the mathematician Gregory Galperin showed that the number of collisions between two billiard blocks on a frictionless surface, one against a wall, encodes the digits of \\(\\pi\\). If the mass ratio is \\(100^N : 1\\), the number of collisions is the first \\(N+1\\) digits of \\(\\pi\\). For example, with a mass ratio of 100:1, there are exactly 31 collisions. With a ratio of 10000:1, there are 314 collisions. With 1000000:1, there are 3141 collisions. The pattern continues forever: \\(\\pi\\) lurks in the physics of elastic collisions.</p>

<div class="env-block intuition">
<strong>Intuition.</strong> Why does \\(\\pi\\) appear everywhere? At the deepest level, \\(\\pi\\) is not really "about circles." It is about periodicity, rotation, and oscillation. Anything in mathematics that oscillates, rotates, or cycles will eventually bring \\(\\pi\\) into the picture, because \\(\\pi\\) is fundamentally the half-period of the sine and cosine functions. Since oscillation and periodicity are everywhere in nature and mathematics, so is \\(\\pi\\).
</div>
`,
            visualizations: [
                {
                    id: 'viz-euler-sum',
                    title: 'Euler\'s Basel Sum: Partial Sums Converge to \u03C0\u00B2/6',
                    description: 'Watch the partial sum \\(\\sum_{n=1}^{N} \\frac{1}{n^2}\\) converge to \\(\\pi^2/6 \\approx 1.6449\\) as N increases.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var target = Math.PI * Math.PI / 6;
                        var maxN = 100;
                        var currentN = 100;

                        var slider = VizEngine.createSlider(controls, 'Terms N: ', 1, 200, 100, 1, function(val) {
                            currentN = Math.round(val);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var padL = 70, padR = 30, padT = 30, padB = 50;
                            var plotW = w - padL - padR;
                            var plotH = h - padT - padB;
                            var yMin = 0, yMax = 2.0;

                            function toSx(n) { return padL + (n / currentN) * plotW; }
                            function toSy(v) { return padT + (1 - (v - yMin) / (yMax - yMin)) * plotH; }

                            // grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var yy = 0; yy <= 2.0; yy += 0.5) {
                                var sy = toSy(yy);
                                ctx.beginPath(); ctx.moveTo(padL, sy); ctx.lineTo(w - padR, sy); ctx.stroke();
                            }

                            // target line
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
                            var tY = toSy(target);
                            ctx.beginPath(); ctx.moveTo(padL, tY); ctx.lineTo(w - padR, tY); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.orange; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
                            ctx.fillText('\u03C0\u00B2/6 = ' + target.toFixed(4), w - padR, tY - 4);

                            // axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB); ctx.lineTo(w - padR, h - padB); ctx.stroke();

                            // y labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var yy2 = 0; yy2 <= 2.0; yy2 += 0.5) {
                                ctx.fillText(yy2.toFixed(1), padL - 6, toSy(yy2));
                            }

                            // compute and plot partial sums
                            var sum = 0;
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var n = 1; n <= currentN; n++) {
                                sum += 1 / (n * n);
                                var sx = toSx(n), sy2 = toSy(sum);
                                if (n === 1) ctx.moveTo(sx, sy2); else ctx.lineTo(sx, sy2);
                            }
                            ctx.stroke();

                            // final dot
                            var finalSx = toSx(currentN), finalSy = toSy(sum);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(finalSx, finalSy, 5, 0, Math.PI * 2); ctx.fill();

                            // info
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('S(' + currentN + ') = ' + sum.toFixed(8), padL + 10, padT + 6);
                            ctx.fillStyle = viz.colors.green; ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Gap to \u03C0\u00B2/6: ' + (target - sum).toFixed(8), padL + 10, padT + 24);

                            // x label
                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('n (number of terms)', w / 2, h - 16);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the partial sum \\(1 + \\frac{1}{4} + \\frac{1}{9} + \\frac{1}{16} + \\frac{1}{25}\\) (the first 5 terms of the Basel series). How close is it to \\(\\pi^2/6\\)?',
                    hint: 'Compute each fraction, add them up, then compare to \\(\\pi^2/6 \\approx 1.6449\\).',
                    solution: '\\(1 + 0.25 + 0.1111 + 0.0625 + 0.04 = 1.4636\\). This is about \\(0.181\\) below \\(\\pi^2/6 \\approx 1.6449\\). The series converges slowly; you need hundreds of terms to get close.'
                },
                {
                    question: 'Euler\'s identity \\(e^{i\\pi} + 1 = 0\\) involves five fundamental constants. List them and explain what branch of mathematics each comes from.',
                    hint: 'The five constants are \\(e\\), \\(i\\), \\(\\pi\\), 1, and 0.',
                    solution: '<em>e</em> \\(\\approx 2.718\\): analysis (calculus), the base of natural logarithms and exponential growth. <em>i</em>: algebra, the imaginary unit satisfying \\(i^2 = -1\\). <em>\\(\\pi\\)</em>: geometry, the ratio of circumference to diameter. <em>1</em>: arithmetic, the multiplicative identity. <em>0</em>: arithmetic, the additive identity. Euler\'s formula unites all five in one equation.'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 5: The Digits of π
        // ─────────────────────────────────────────────
        {
            id: 'sec-digits',
            title: 'The Digits of \u03C0',
            content: `
<h2>An Infinite, Patternless River of Digits</h2>

<p>As of 2024, over 100 trillion digits of \\(\\pi\\) have been computed. This feat, accomplished using sophisticated algorithms running on powerful computers for months at a time, is a benchmark for both hardware and software. But why do people compute so many digits? After all, NASA uses only 15 decimal places of \\(\\pi\\) for interplanetary navigation, and 39 digits would suffice to compute the circumference of the observable universe to within the width of a hydrogen atom.</p>

<p>The answer is partly practical (testing computers, developing algorithms) and partly the sheer human drive to explore the unknown. The digits of \\(\\pi\\) are like a vast, uncharted territory that we keep mapping, even though we know it extends forever.</p>

<h3>Do the Digits Look Random?</h3>

<p>One of the great open questions about \\(\\pi\\) is whether it is a <em>normal number</em>, meaning every digit (0 through 9) appears with equal frequency, every two-digit combination (00 through 99) appears with equal frequency, and so on. Billions of digits have been analyzed, and statistically, the digits of \\(\\pi\\) look perfectly random. Each digit appears about 10% of the time; there are no suspicious patterns. But nobody has proven that \\(\\pi\\) is normal. It remains a conjecture.</p>

<div class="env-block definition">
<strong>Normal Number.</strong> A number is <em>normal</em> in base 10 if every digit 0-9 occurs with equal limiting frequency \\(1/10\\), every pair of digits with frequency \\(1/100\\), every triple with frequency \\(1/1000\\), and so on. A number is <em>absolutely normal</em> if this holds in every base.
</div>

<h3>Memorable Formulas</h3>

<p>Before computers, mathematicians competed to find rapidly converging series for \\(\\pi\\). Some classics:</p>

<p><strong>Leibniz formula</strong> (1674), beautiful but painfully slow:</p>
\\[ \\frac{\\pi}{4} = 1 - \\frac{1}{3} + \\frac{1}{5} - \\frac{1}{7} + \\frac{1}{9} - \\cdots \\]

<p><strong>Ramanujan's formula</strong> (1914), which converges astonishingly fast, adding roughly 8 correct digits per term:</p>
\\[ \\frac{1}{\\pi} = \\frac{2\\sqrt{2}}{9801} \\sum_{k=0}^{\\infty} \\frac{(4k)!(1103 + 26390k)}{(k!)^4 \\cdot 396^{4k}} \\]

<p>Srinivasa Ramanujan, the self-taught genius from India, discovered this formula through a combination of deep intuition and mystical insight. He claimed his mathematical ideas came to him in dreams, given by the goddess Namagiri. Modern mathematicians have verified every one of his formulas rigorously, but the mystery of how he found them remains.</p>

<h3>The Culture of \\(\\pi\\)</h3>

<p>March 14 (3/14 in American date format) is celebrated as "Pi Day" around the world. In 2015, the date 3/14/15 at 9:26:53 was a once-in-a-century moment matching the first 10 digits of \\(\\pi\\). Competitive memorizers ("pi-ists") recite thousands of digits from memory; the world record, held by Suresh Kumar Sharma of India (2015), is 70,030 digits, recited over 17 hours. There are "pilish" poems where each word has a number of letters matching the successive digits of \\(\\pi\\), and the digits of \\(\\pi\\) have been set to music, turned into art, and even used to generate random numbers in computer simulations.</p>

<div class="viz-placeholder" data-viz="viz-pi-digits"></div>

<div class="env-block intuition">
<strong>Intuition.</strong> The digits of \\(\\pi\\) encode no message and follow no pattern, yet they are completely determined. There is no randomness in \\(\\pi\\); every digit is fixed forever by the geometry of the circle. The appearance of randomness arises from our inability to find a pattern, not from any actual randomness. This tension, between determinism and apparent randomness, is one of the deep themes in mathematics.
</div>
`,
            visualizations: [
                {
                    id: 'viz-pi-digits',
                    title: 'Digit Frequency in \u03C0',
                    description: 'The first 1000 digits of \u03C0 are analyzed. Each bar shows how many times a digit (0-9) appears. If \u03C0 were perfectly "normal," each bar would be at 100.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;

                        // First 1000 digits of pi after the decimal point
                        var piStr = '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788659361533818279682303019520353018529689957736225994138912497217752834791315155748572424541506959508295331168617278558890750983817546374649393192550604009277016711390098488240128583616035637076601047101819429555961989467678374494482553797747268471040475346462080466842590694912933136770289891521047521620569660240580381501935112533824300355876402474964732639141992726042699227967823547816360093417216412199245863150302861829745557067498385054945885869269956909272107975093029553211653449872027559602364806654991198818347977535663698074265425278625518184175746728909777727938000816470600161452491921732172147723501414419735685481613611573525521334757418494684385233239073941433345477624168625189835694855620992192221842725502542568876717904946016534668049886272327917860857843838279679766814541009538837863609506800642251252051173929848960841284886269456042419652850222106611863067442786220391949450471237137869609563643719172874677646575739624138908658326459958133904780275900994657640789512694683983525957098258226205224894077267194782684826014769909026401363944374553050682034962524517493996514314298091906592509372216964615157098583874105978859597729754989301617539284681382686838689427741559918559252459539594310499725246808459872736446958486538367362226260991246080512438843904512441365497627807977156914359977001296160894416948685558484063534220722258284886481584560285060168427394522674676788952521385225499546667278239864565961163548862305774564980355936345681743241125150760694794510965960940252288797108931456691368672287489405601015033086179286809208747609178249385890097149096759852613655497818931297848216829989487226588048575640142704775551323796414515237462343645428584447952658678210511413547357395231134271661021359695362314429524849371871101457654035902799344037420073105785390621983874478084784896833214457138687519435064302184531910484810053706146806749192781911979399520614196634287544406437451237181921799983910159195618146751426912397489409071864942319615679452080951465502252316038819301420937621378559566389377870830390697920773467221825625996615014215030680384477345492026054146659252014974428507325186660021324340881907104863317346496514539057962685610055081066587969981635747363840525714591028970641401109712062804390397595156771577004203378699360072305587631763594218731251471205422401412'.substring(0, 1000);

                        function draw(numDigits) {
                            viz.clear();
                            var digits = piStr.substring(0, numDigits);
                            var counts = new Array(10).fill(0);
                            for (var i = 0; i < digits.length; i++) {
                                counts[parseInt(digits[i])]++;
                            }
                            var expected = numDigits / 10;

                            var padL = 60, padR = 30, padT = 40, padB = 50;
                            var plotW = w - padL - padR;
                            var plotH = h - padT - padB;
                            var barW = plotW / 10 - 6;
                            var maxCount = Math.max.apply(null, counts) * 1.1;

                            // axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB); ctx.lineTo(w - padR, h - padB); ctx.stroke();

                            // expected line
                            var expY = padT + (1 - expected / maxCount) * plotH;
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4]);
                            ctx.beginPath(); ctx.moveTo(padL, expY); ctx.lineTo(w - padR, expY); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.orange; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            ctx.fillText('Expected: ' + expected.toFixed(0), w - padR - 100, expY - 4);

                            var hues = [200, 170, 140, 50, 30, 340, 300, 270, 220, 120];
                            // bars
                            for (var d = 0; d < 10; d++) {
                                var bx = padL + d * (plotW / 10) + 3;
                                var bh = (counts[d] / maxCount) * plotH;
                                var by = padT + plotH - bh;
                                ctx.fillStyle = VizEngine.hsl(hues[d], 70, 55);
                                ctx.fillRect(bx, by, barW, bh);
                                // digit label
                                ctx.fillStyle = viz.colors.white; ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                ctx.fillText(d.toString(), bx + barW / 2, h - padB + 6);
                                // count label
                                ctx.fillStyle = viz.colors.white; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(counts[d].toString(), bx + barW / 2, by - 4);
                            }

                            // title
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Digit frequencies in first ' + numDigits + ' digits of \u03C0', padL, 10);
                        }

                        var showDigits = 1000;
                        VizEngine.createSlider(controls, 'Digits: ', 50, 1000, 1000, 50, function(val) {
                            showDigits = Math.round(val);
                            draw(showDigits);
                        });

                        draw(showDigits);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Leibniz formula to compute the first 5 partial sums (1, 2, 3, 4, 5 terms). Does the series seem to converge quickly or slowly?',
                    hint: 'The Leibniz formula is \\(\\frac{\\pi}{4} = 1 - \\frac{1}{3} + \\frac{1}{5} - \\frac{1}{7} + \\frac{1}{9} - \\cdots\\). Multiply each partial sum by 4.',
                    solution: 'Partial sums times 4: \\(4 \\times 1 = 4\\), \\(4 \\times \\frac{2}{3} = 2.667\\), \\(4 \\times \\frac{13}{15} = 3.467\\), \\(4 \\times \\frac{76}{105} = 2.895\\), \\(4 \\times \\frac{263}{315} = 3.340\\). After 5 terms, we only know \\(\\pi \\approx 3.3\\), not even one correct decimal place. The Leibniz series converges extremely slowly.'
                },
                {
                    question: 'If the first 1000 digits of \\(\\pi\\) after the decimal point are truly "random-looking," about how many times would you expect the digit 7 to appear? In reality, the digit 7 appears 95 times. Is this suspicious?',
                    hint: 'If digits are uniformly distributed, each digit has probability 1/10.',
                    solution: 'Expected count: \\(1000 \\times 0.1 = 100\\). Getting 95 out of 1000 is well within normal statistical fluctuation; the standard deviation is \\(\\sqrt{1000 \\times 0.1 \\times 0.9} \\approx 9.5\\), so 95 is only about 0.5 standard deviations below the mean. This is perfectly normal, not suspicious at all.'
                }
            ]
        }
    ]
});
})();
