// === Chapter 7: Self-Similarity in Nature ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch07',
        number: 7,
        title: 'Self-Similarity in Nature',
        subtitle: 'When the part looks like the whole',
        sections: [
            // ============================================================
            // Section 1: What Is Self-Similarity?
            // ============================================================
            {
                id: 'what-is-self-similarity',
                title: 'What Is Self-Similarity?',
                content: `
<h2>Zoom In, See the Same Thing</h2>

<p>Break a piece off a head of cauliflower. Look at it closely. It looks like a miniature version of the whole head. Break off a smaller piece from that piece. Again, it resembles the original. This uncanny property, where a part of an object looks like the whole, is called <strong>self-similarity</strong>.</p>

<p>Self-similarity is everywhere in the natural world. Ferns unfurl fronds that are decorated with smaller frondlets, which are themselves decorated with even smaller copies. Lightning bolts branch, and their branches branch again in the same jagged pattern. River deltas, lung bronchi, blood vessel networks, mountain skylines, cloud edges: look closely enough and the same shapes keep repeating at smaller and smaller scales.</p>

<div class="env-block definition">
<strong>Self-Similarity</strong><br>
An object is <em>self-similar</em> if it looks (approximately) the same at different levels of magnification. Zooming in reveals structures that echo the overall shape.
</div>

<p>This is a radically different kind of geometry from what you learn in school. Classical geometry deals with smooth shapes: circles, triangles, spheres. Their edges become simpler as you zoom in; eventually a curve looks like a straight line. Self-similar objects do the opposite: they remain equally complex no matter how far you zoom. There is detail at every scale, structure nested within structure, all the way down.</p>

<h3>Exact vs. Statistical Self-Similarity</h3>

<p>Mathematicians distinguish two flavors:</p>

<div class="env-block intuition">
<strong>Two Kinds of Self-Similarity</strong><br>
<ul>
<li><strong>Exact self-similarity:</strong> The object is a mathematically perfect copy of itself at every scale. The Koch snowflake and Sierpinski triangle (which we will meet in the next chapter) have this property. These are mathematical ideals.</li>
<li><strong>Statistical self-similarity:</strong> The object looks <em>roughly</em> the same at different scales, with the same degree of roughness, branching, or complexity, but not as an exact copy. This is what we find in nature: coastlines, trees, clouds. The resemblance is in the <em>statistical character</em>, not in exact pixel-by-pixel identity.</li>
</ul>
</div>

<p>Both kinds share the essential magic: no matter where you look or how closely, the same motifs keep appearing. The mathematician Benoit Mandelbrot, who championed this idea more than anyone, gave these objects a name: <strong>fractals</strong>.</p>

<div class="viz-placeholder" data-viz="zoom-self-similar"></div>

<p>The word "fractal" comes from the Latin <em>fractus</em>, meaning "broken" or "fragmented." Mandelbrot chose it because these shapes are too irregular for classical geometry, too jagged and broken to be described by smooth curves. And yet they are not random; they possess a deep, recursive order.</p>

<h3>Why Should We Care?</h3>

<p>Self-similarity is not just a curiosity. It turns out to be one of nature's favorite design principles. When a tree branches, when a river carves a delta, when your lungs divide into ever-finer airways, the same pattern repeating at smaller scales is not accidental. It serves a purpose: maximizing surface area, optimizing flow, building complex structures from simple rules.</p>

<p>Understanding self-similarity gives us a new lens for seeing the world, one that reveals hidden order in apparent chaos.</p>
`,
                visualizations: [
                    {
                        id: 'zoom-self-similar',
                        title: 'Zoom into a Fractal Fern',
                        description: 'Click "Zoom In" to see how each part of the fern resembles the whole. The same shape repeats at every scale.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                            var zoomLevel = 0;
                            var maxZoom = 4;
                            var points = [];
                            var numPoints = 50000;

                            // Barnsley fern IFS
                            (function generateFern() {
                                var x = 0, y = 0;
                                for (var i = 0; i < numPoints; i++) {
                                    var r = Math.random();
                                    var nx, ny;
                                    if (r < 0.01) {
                                        nx = 0;
                                        ny = 0.16 * y;
                                    } else if (r < 0.86) {
                                        nx = 0.85 * x + 0.04 * y;
                                        ny = -0.04 * x + 0.85 * y + 1.6;
                                    } else if (r < 0.93) {
                                        nx = 0.2 * x - 0.26 * y;
                                        ny = 0.23 * x + 0.22 * y + 1.6;
                                    } else {
                                        nx = -0.15 * x + 0.28 * y;
                                        ny = 0.26 * x + 0.24 * y + 0.44;
                                    }
                                    x = nx; y = ny;
                                    if (i > 20) points.push([x, y]);
                                }
                            })();

                            // Zoom regions (approximate bounding boxes for interesting sub-ferns)
                            var zoomRegions = [
                                { xMin: -2.2, xMax: 2.8, yMin: 0, yMax: 10.2 },     // full
                                { xMin: -0.5, xMax: 2.2, yMin: 1.5, yMax: 7.0 },     // right branch
                                { xMin: 0.2, xMax: 1.8, yMin: 3.0, yMax: 6.5 },      // deeper
                                { xMin: 0.5, xMax: 1.5, yMin: 4.0, yMax: 6.0 },      // even deeper
                                { xMin: 0.6, xMax: 1.2, yMin: 4.5, yMax: 5.5 }       // very deep
                            ];

                            VizEngine.createButton(controls, 'Zoom In', function () {
                                if (zoomLevel < maxZoom) zoomLevel++;
                            });
                            VizEngine.createButton(controls, 'Zoom Out', function () {
                                if (zoomLevel > 0) zoomLevel--;
                            });
                            VizEngine.createButton(controls, 'Reset', function () { zoomLevel = 0; });

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width;
                                var H = viz.height;
                                var region = zoomRegions[zoomLevel];

                                var scaleX = W / (region.xMax - region.xMin);
                                var scaleY = H / (region.yMax - region.yMin);
                                var sc = Math.min(scaleX, scaleY) * 0.9;

                                var offsetX = W / 2 - (region.xMin + region.xMax) / 2 * sc;
                                var offsetY = H - 20 + region.yMin * sc;

                                ctx.globalAlpha = 0.4;
                                for (var i = 0; i < points.length; i++) {
                                    var px = points[i][0] * sc + offsetX;
                                    var py = offsetY - points[i][1] * sc;

                                    if (px < -2 || px > W + 2 || py < -2 || py > H + 2) continue;

                                    var hue = 120 + (points[i][1] / 10) * 40;
                                    ctx.fillStyle = VizEngine.hsl(hue, 70, 45);
                                    ctx.fillRect(px, py, 1.5, 1.5);
                                }
                                ctx.globalAlpha = 1;

                                // Zoom indicator
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Zoom level: ' + zoomLevel + 'x', 15, 25);

                                if (zoomLevel > 0) {
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.fillText('Each frond looks like the whole fern!', 15, 45);
                                }
                            }

                            viz.animate(function () { draw(); });
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Name three examples of self-similarity in the natural world that were not mentioned in the text.',
                        hint: 'Think about shapes you see in plants, weather, geology, and the human body.',
                        solution: 'Many answers are possible. Some examples: (1) Romanesco broccoli, whose cone-shaped florets are arranged in smaller cones that repeat the overall shape. (2) Snowflakes, which exhibit hexagonal branching at multiple scales. (3) Mountain ranges, whose silhouettes look similar whether viewed from a plane or up close. (4) Nerve cell branching patterns. (5) Frost crystals on a window.'
                    },
                    {
                        question: 'What is the difference between exact and statistical self-similarity? Which kind is more common in nature?',
                        hint: 'Think about whether a tree branch is a <em>perfect</em> copy of the whole tree.',
                        solution: 'Exact self-similarity means the object is a mathematically perfect copy of itself at every scale (like the Sierpinski triangle). Statistical self-similarity means the object has the same <em>statistical properties</em> (roughness, branching ratio, etc.) at different scales, without being an exact copy. Statistical self-similarity is far more common in nature. A tree branch resembles the whole tree in its branching pattern, but it is not a perfect miniature replica.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Fractals in Coastlines
            // ============================================================
            {
                id: 'coastline-paradox',
                title: 'Fractals in Coastlines',
                content: `
<h2>How Long Is Britain's Coastline?</h2>

<p>In 1967, the mathematician Benoit Mandelbrot published a paper with a deceptively simple title: "How Long Is the Coast of Britain?" The answer, it turned out, depends on how you measure it.</p>

<p>Imagine you are measuring the coastline of Britain using a ruler. If your ruler is 200 km long, you lay it along the coast, stepping from point to point, and get a rough estimate. The ruler skips over all the bays, inlets, and peninsulas smaller than 200 km.</p>

<p>Now use a shorter ruler, say 50 km. This ruler follows more of the coastline's twists and turns, entering bays and tracing headlands that the long ruler jumped over. Your measured length is <em>longer</em> than before.</p>

<p>Use a 10 km ruler, and the length increases again. A 1 km ruler captures even more detail. A 1 meter ruler follows individual rocks. And at the limit, with a hypothetically infinitesimal ruler, the measured length appears to grow without bound.</p>

<div class="env-block theorem">
<strong>The Coastline Paradox (Richardson, 1961; Mandelbrot, 1967)</strong><br>
The measured length of a coastline depends on the length of the ruler used. As the ruler gets shorter, the measured length increases without limit. A coastline does not have a well-defined "true" length in the classical sense.
</div>

<p>This was first observed empirically by the British mathematician Lewis Fry Richardson, who noticed that different countries reported wildly different lengths for their shared borders. The discrepancy was not due to sloppy measurement; it was a fundamental property of the borders themselves.</p>

<div class="viz-placeholder" data-viz="coastline-ruler"></div>

<h3>Why Coastlines Are Fractal</h3>

<p>The coastline paradox arises because coastlines are statistically self-similar. Viewed from space, a coastline is jagged. Zoom in on a single bay, and the shoreline of that bay is also jagged, with smaller bays and promontories. Zoom in further, and you see rocks with their own jagged edges. The roughness persists at every scale.</p>

<p>For a smooth curve (like a circle), measuring with shorter rulers gives lengths that converge to a definite value. The detail runs out; at fine enough resolution, the curve is essentially straight. But for a fractal coastline, there is <em>always</em> more detail to find, and the measured length keeps growing.</p>

<div class="env-block example">
<strong>Reported Coastline Lengths of Britain</strong><br>
<ul>
<li>With a 200 km ruler: approximately 2,400 km</li>
<li>With a 50 km ruler: approximately 3,400 km</li>
<li>With a 10 km ruler: approximately 5,500 km</li>
</ul>
The "official" length (about 12,400 km) depends on the resolution chosen by the Ordnance Survey.
</div>

<p>Mandelbrot's insight was that this behavior is not a bug; it is a feature. The coastline is telling us something about its fundamental nature: it is a <em>fractal</em>, an object whose complexity does not diminish with magnification.</p>
`,
                visualizations: [
                    {
                        id: 'coastline-ruler',
                        title: 'The Coastline Paradox',
                        description: 'Measure a fractal coastline with rulers of different lengths. Shorter rulers give longer measurements!',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 400, scale: 1, originX: 0, originY: 0 });

                            // Generate a fractal coastline using midpoint displacement
                            function generateCoast(depth) {
                                var pts = [{ x: 50, y: 200 }, { x: 650, y: 200 }];
                                for (var d = 0; d < depth; d++) {
                                    var newPts = [pts[0]];
                                    for (var i = 0; i < pts.length - 1; i++) {
                                        var mx = (pts[i].x + pts[i + 1].x) / 2;
                                        var my = (pts[i].y + pts[i + 1].y) / 2;
                                        var dx = pts[i + 1].x - pts[i].x;
                                        var dy = pts[i + 1].y - pts[i].y;
                                        var len = Math.sqrt(dx * dx + dy * dy);
                                        // Perpendicular displacement
                                        var disp = (Math.random() - 0.5) * len * 0.4;
                                        var nx = -dy / len;
                                        var ny = dx / len;
                                        newPts.push({ x: mx + nx * disp, y: my + ny * disp });
                                        newPts.push(pts[i + 1]);
                                    }
                                    pts = newPts;
                                }
                                return pts;
                            }

                            // Use a seeded version for consistency
                            var coast = null;
                            (function () {
                                // Simple seeded random
                                var seed = 42;
                                var origRandom = Math.random;
                                Math.random = function () {
                                    seed = (seed * 16807 + 0) % 2147483647;
                                    return seed / 2147483647;
                                };
                                coast = generateCoast(8);
                                Math.random = origRandom;
                            })();

                            var rulerLen = 150;
                            VizEngine.createSlider(controls, 'Ruler length (px)', 10, 200, 150, 5, function (v) { rulerLen = v; });

                            function measureWithRuler(pts, ruler) {
                                var steps = [];
                                var idx = 0;
                                var current = pts[0];
                                steps.push(current);

                                while (idx < pts.length - 1) {
                                    // Find the farthest point within ruler distance along the coast
                                    var bestIdx = idx + 1;
                                    var bestDist = 0;
                                    for (var j = idx + 1; j < pts.length; j++) {
                                        var dx = pts[j].x - current.x;
                                        var dy = pts[j].y - current.y;
                                        var dist = Math.sqrt(dx * dx + dy * dy);
                                        if (dist <= ruler) {
                                            if (dist > bestDist) { bestDist = dist; bestIdx = j; }
                                        } else {
                                            break;
                                        }
                                    }
                                    current = pts[bestIdx];
                                    steps.push(current);
                                    idx = bestIdx;
                                    if (bestIdx >= pts.length - 1) break;
                                }
                                return steps;
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;

                                // Draw coastline
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var i = 0; i < coast.length; i++) {
                                    if (i === 0) ctx.moveTo(coast[i].x, coast[i].y);
                                    else ctx.lineTo(coast[i].x, coast[i].y);
                                }
                                ctx.stroke();

                                // Measure
                                var steps = measureWithRuler(coast, rulerLen);
                                var totalLen = 0;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var j = 0; j < steps.length; j++) {
                                    if (j === 0) ctx.moveTo(steps[j].x, steps[j].y);
                                    else {
                                        ctx.lineTo(steps[j].x, steps[j].y);
                                        var dx = steps[j].x - steps[j - 1].x;
                                        var dy = steps[j].y - steps[j - 1].y;
                                        totalLen += Math.sqrt(dx * dx + dy * dy);
                                    }
                                }
                                ctx.stroke();

                                // Points
                                for (var k = 0; k < steps.length; k++) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(steps[k].x, steps[k].y, 4, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Info
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Ruler length: ' + rulerLen.toFixed(0) + ' px', 20, 30);
                                ctx.fillText('Steps: ' + (steps.length - 1), 20, 52);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Measured length: ' + totalLen.toFixed(0) + ' px', 20, 74);

                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText('Try a shorter ruler \u2192 longer measurement!', 20, H - 20);

                                var H = viz.height;
                            }

                            viz.animate(function () { draw(); });
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'If you measure a circle with shorter and shorter rulers, does the measured circumference increase without bound, like a coastline? Why or why not?',
                        hint: 'Think about what happens to a circle when you zoom in far enough. Does it still look curved?',
                        solution: 'No. A circle is a smooth curve, so as the ruler gets shorter, the measured circumference converges to the true value \\(2\\pi r\\). At fine enough resolution, the arc between two points is nearly straight, so shorter rulers give only tiny improvements. The key difference is that a circle has no detail below a certain scale; a fractal coastline has detail at <em>every</em> scale.'
                    },
                    {
                        question: 'Two countries share a border. Country A reports the border length as 500 km; Country B reports it as 700 km. Neither country is lying. How is this possible?',
                        hint: 'Richardson discovered exactly this phenomenon. What might differ about the two countries\' measurement methods?',
                        solution: 'The two countries likely measured the border at different resolutions (different "ruler lengths"). Country A used a coarser measurement that skips over small irregularities, yielding a shorter length. Country B used a finer measurement that follows more of the border\'s twists and turns, yielding a longer length. Both measurements are "correct" given their respective resolutions. This is the coastline paradox: a fractal boundary has no single definitive length.'
                    },
                    {
                        question: 'Estimate: if you measured your school\'s boundary fence with a 10-meter ruler, then again with a 1-meter ruler, which would give a longer measurement? By roughly how much?',
                        hint: 'Think about whether a fence has significant detail at the 1-meter scale (corners, bumps, gates) that a 10-meter ruler would skip.',
                        solution: 'The 1-meter ruler would give a longer measurement, since it follows corners, gate indentations, and any irregular features more precisely. For a typical school with mostly straight fences and some corners, the difference might be 5&ndash;15%. If the fence were very irregular (following a stream, for instance), the difference could be much larger. A truly fractal boundary could give a difference of 50% or more.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Branching Patterns
            // ============================================================
            {
                id: 'branching-patterns',
                title: 'Branching Patterns',
                content: `
<h2>Trees, Rivers, and Lungs</h2>

<p>Look at a tree in winter, stripped of its leaves. The trunk splits into large branches. Each branch splits into smaller branches. Each smaller branch splits into twigs. The pattern repeats, scale after scale, from the massive trunk down to the finest twig.</p>

<p>This branching pattern is one of nature's most ubiquitous examples of self-similarity. And it appears far beyond the plant kingdom:</p>

<ul>
<li><strong>River networks:</strong> A major river collects water from tributaries, which themselves collect from smaller streams, which collect from tiny rills. Viewed from above, a river basin looks remarkably like an inverted tree.</li>
<li><strong>Lungs:</strong> The trachea splits into two bronchi, which split into smaller bronchioles, which split into even smaller passages, ending in tiny alveoli where gas exchange occurs. Your lungs branch about 23 times before reaching the alveoli.</li>
<li><strong>Blood vessels:</strong> Arteries branch into smaller arterioles, then into capillaries. The branching structure maximizes the surface area for nutrient and oxygen delivery.</li>
<li><strong>Lightning:</strong> An electrical discharge branches as it seeks the path of least resistance through the air, creating a fractal pattern in an instant.</li>
</ul>

<div class="env-block intuition">
<strong>Why Branching?</strong><br>
Branching is nature's solution to a fundamental design problem: how to connect a single source (trunk, river mouth, trachea) to a huge number of endpoints (leaves, streams, alveoli) as efficiently as possible. Self-similar branching turns out to be remarkably efficient at distributing resources or collecting them.
</div>

<div class="viz-placeholder" data-viz="fractal-tree"></div>

<h3>The Mathematics of Branching</h3>

<p>A fractal tree can be generated by a stunningly simple rule: start with a trunk, then at its tip, attach two shorter branches at angles to the left and right. Repeat this rule for each new branch tip.</p>

<p>The key parameters are:</p>
<ul>
<li><strong>Branch angle:</strong> how far each new branch turns from its parent.</li>
<li><strong>Length ratio:</strong> how much shorter each child branch is compared to its parent.</li>
<li><strong>Depth:</strong> how many levels of branching to apply.</li>
</ul>

<p>By varying these parameters, you can generate an astonishing variety of "trees," from slender conifers to spreading oaks to bushy shrubs. The interactive visualization above lets you experiment with these parameters. Try setting the branch angle to about 25 degrees and the length ratio to 0.67; you will get something that looks remarkably like a real tree.</p>

<h3>Murray's Law: Optimal Branching</h3>

<p>In 1926, the physiologist Cecil Murray discovered that blood vessels branch in a way that minimizes the energy required to pump blood. Specifically, when a vessel of radius \\(r\\) splits into two vessels of radii \\(r_1\\) and \\(r_2\\), the radii satisfy:</p>

\\[r^3 = r_1^3 + r_2^3\\]

<p>This "cube law" has since been found in plant xylem, bronchial airways, and even river networks. Nature has independently discovered the same optimization principle in wildly different contexts. Self-similar branching is not just beautiful; it is <em>optimal</em>.</p>
`,
                visualizations: [
                    {
                        id: 'fractal-tree',
                        title: 'Interactive Fractal Tree',
                        description: 'Adjust the branch angle, depth, and length ratio to grow different trees. Watch how small changes in parameters produce dramatically different shapes.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 460, scale: 1, originX: 0, originY: 0 });
                            var angle = 25;
                            var depth = 10;
                            var ratio = 0.7;
                            var wind = 0;

                            VizEngine.createSlider(controls, 'Angle', 5, 60, 25, 1, function (v) { angle = v; });
                            VizEngine.createSlider(controls, 'Depth', 1, 13, 10, 1, function (v) { depth = Math.round(v); });
                            VizEngine.createSlider(controls, 'Length ratio', 0.4, 0.85, 0.7, 0.01, function (v) { ratio = v; });
                            VizEngine.createSlider(controls, 'Wind', -15, 15, 0, 1, function (v) { wind = v; });

                            function drawBranch(ctx, x, y, len, a, d, t) {
                                if (d <= 0 || len < 1) return;
                                var rad = a * Math.PI / 180;
                                // slight animation sway
                                var sway = Math.sin(t / 1500 + d * 0.7) * 2 * (1 - d / depth);
                                rad += sway * Math.PI / 180;
                                var x2 = x + len * Math.sin(rad);
                                var y2 = y - len * Math.cos(rad);

                                var thickness = Math.max(1, d * 1.2);
                                var hue = d > 3 ? 30 : 120 - (3 - d) * 10;
                                var lightness = d > 3 ? 25 + (depth - d) * 3 : 40 + (3 - d) * 8;
                                ctx.strokeStyle = VizEngine.hsl(hue, 50, lightness);
                                ctx.lineWidth = thickness;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x2, y2);
                                ctx.stroke();

                                // Leaves at tips
                                if (d <= 2) {
                                    ctx.fillStyle = VizEngine.hsl(110 + Math.random() * 30, 60, 40);
                                    ctx.globalAlpha = 0.7;
                                    ctx.beginPath();
                                    ctx.arc(x2, y2, 2 + Math.random() * 2, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.globalAlpha = 1;
                                }

                                drawBranch(ctx, x2, y2, len * ratio, a - angle + wind, d - 1, t);
                                drawBranch(ctx, x2, y2, len * ratio, a + angle + wind, d - 1, t);
                            }

                            function draw(t) {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width;
                                var H = viz.height;
                                var trunkLen = H * 0.22;

                                drawBranch(ctx, W / 2, H - 20, trunkLen, 0, depth, t);

                                // Labels
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Angle: ' + angle + '\u00B0  Depth: ' + depth + '  Ratio: ' + ratio.toFixed(2), 15, 20);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the fractal tree visualization, what happens when you set the branch angle to exactly 0 degrees? What about 90 degrees?',
                        hint: 'Think about where the branches would go if they never turn away from the trunk direction, or if they turn completely sideways.',
                        solution: 'At 0 degrees, both child branches continue in the same direction as the parent, so all branches overlap into a single straight line. The "tree" collapses into a stick. At 90 degrees, the branches shoot out sideways, creating a very flat, spread-out pattern. Real trees use angles between about 20 and 45 degrees, which balances vertical growth (reaching sunlight) with horizontal spread (capturing light over a wide area).'
                    },
                    {
                        question: 'Your lungs branch about 23 times from the trachea to the alveoli. If each branch splits into two, roughly how many alveoli do you have?',
                        hint: 'After \\(n\\) levels of binary branching, there are \\(2^n\\) endpoints.',
                        solution: 'After 23 levels of binary branching, there are approximately \\(2^{23} = 8{,}388{,}608\\) endpoints (about 8 million). In reality, the human lung has roughly 300&ndash;500 million alveoli because the branching is not strictly binary; some branches split into three or more, and the count varies. But the order-of-magnitude estimate from \\(2^{23}\\) captures the essential idea: exponential branching creates an enormous number of endpoints from a single starting tube.'
                    },
                    {
                        question: 'Why might a tree in a windy environment evolve to have a different branching angle than a tree in a calm forest?',
                        hint: 'Think about structural integrity and how wind loads are distributed through branches.',
                        solution: 'In a windy environment, trees with narrower branching angles (more upright branches) present less surface area to the wind and are more structurally stable, since the forces are directed closer to the trunk axis. Trees in calm forests can afford wider branching angles to maximize light capture, spreading their canopy broadly. You can see this in nature: trees on exposed ridges tend to be compact and narrow, while forest trees spread wide. The fractal tree visualization with the "wind" slider illustrates how asymmetric forces change the optimal tree shape.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Fractal Dimension
            // ============================================================
            {
                id: 'fractal-dimension',
                title: 'Fractal Dimension — Between 1D and 2D',
                content: `
<h2>How Rough Is That Coastline?</h2>

<p>In ordinary geometry, a line is 1-dimensional, a square is 2-dimensional, and a cube is 3-dimensional. The dimension is always a whole number. But fractals break this rule.</p>

<p>Consider the coastline of Britain. It is a curve (so you might say it is 1-dimensional), but it is so convoluted that it seems to partially fill an area. It is somewhere between a 1D line and a 2D surface. Mandelbrot assigned it a <strong>fractal dimension</strong> of approximately 1.25.</p>

<div class="env-block definition">
<strong>Fractal Dimension (Intuitive)</strong><br>
The fractal dimension measures how "space-filling" an object is. A smooth curve has dimension 1. A surface has dimension 2. A fractal curve that twists and turns enough to partially fill a plane has a dimension between 1 and 2. The rougher and more complex the fractal, the higher its dimension.
</div>

<h3>The Box-Counting Method</h3>

<p>Here is one intuitive way to measure fractal dimension. Cover the object with a grid of boxes of side length \\(\\varepsilon\\). Count how many boxes contain part of the object; call that number \\(N(\\varepsilon)\\). Now make the boxes smaller and count again.</p>

<p>For an ordinary curve, halving the box size roughly doubles the count: \\(N \\propto \\varepsilon^{-1}\\). For a filled square, halving the box size quadruples the count: \\(N \\propto \\varepsilon^{-2}\\). In general, \\(N(\\varepsilon) \\propto \\varepsilon^{-D}\\) where \\(D\\) is the dimension.</p>

<p>For a fractal, \\(D\\) is not a whole number. You can find it from the slope of a log-log plot of \\(N\\) vs. \\(1/\\varepsilon\\):</p>

\\[D = \\lim_{\\varepsilon \\to 0} \\frac{\\log N(\\varepsilon)}{\\log(1/\\varepsilon)}\\]

<div class="env-block example">
<strong>Fractal Dimensions of Familiar Objects</strong><br>
<ul>
<li>Coastline of Britain: \\(D \\approx 1.25\\)</li>
<li>Coastline of Norway (very fjord-y): \\(D \\approx 1.52\\)</li>
<li>Koch snowflake: \\(D = \\log 4 / \\log 3 \\approx 1.26\\)</li>
<li>Sierpinski triangle: \\(D = \\log 3 / \\log 2 \\approx 1.58\\)</li>
<li>A straight line: \\(D = 1.00\\)</li>
<li>A filled square: \\(D = 2.00\\)</li>
</ul>
</div>

<p>The fractal dimension captures something that our eyes sense intuitively: Norway's coast is "rougher" (more convoluted, more fjord-ridden) than Britain's, and its higher fractal dimension quantifies this.</p>

<div class="viz-placeholder" data-viz="box-counting-demo"></div>

<h3>Why Non-Integer Dimensions Make Sense</h3>

<p>At first, a dimension like 1.25 seems bizarre. How can something be "between" a line and a surface? But think of it this way: the fractal dimension tells you how the object's "content" scales as you zoom in. A line, zoomed in by a factor of 3, contains 3 copies of itself (\\(3 = 3^1\\), dimension 1). A square, zoomed in by 3, contains 9 copies (\\(9 = 3^2\\), dimension 2). The Koch snowflake, zoomed in by 3, contains 4 copies (\\(4 = 3^{1.26\\ldots}\\), dimension \\(\\approx\\)1.26).</p>

<p>The fractal dimension is not a metaphor or an approximation. It is a precise mathematical quantity that captures the scaling behavior of the object. Non-integer dimensions are simply what happens when nature builds structures that are too complex for lines but not complex enough to fill surfaces.</p>
`,
                visualizations: [
                    {
                        id: 'box-counting-demo',
                        title: 'Box-Counting Dimension',
                        description: 'Cover a fractal curve with boxes of different sizes. Watch how the count grows faster than expected for a smooth curve.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                            var boxSize = 80;

                            // Generate a Koch-like fractal curve
                            function kochPoints(x1, y1, x2, y2, depth) {
                                if (depth === 0) return [[x1, y1]];
                                var dx = x2 - x1, dy = y2 - y1;
                                var ax = x1 + dx / 3, ay = y1 + dy / 3;
                                var bx = x1 + 2 * dx / 3, by = y1 + 2 * dy / 3;
                                var px = (ax + bx) / 2 - (by - ay) * Math.sqrt(3) / 2;
                                var py = (ay + by) / 2 + (bx - ax) * Math.sqrt(3) / 2;
                                var pts = [];
                                pts = pts.concat(kochPoints(x1, y1, ax, ay, depth - 1));
                                pts = pts.concat(kochPoints(ax, ay, px, py, depth - 1));
                                pts = pts.concat(kochPoints(px, py, bx, by, depth - 1));
                                pts = pts.concat(kochPoints(bx, by, x2, y2, depth - 1));
                                return pts;
                            }
                            var curve = kochPoints(60, 300, 640, 300, 5);
                            curve.push([640, 300]);

                            VizEngine.createSlider(controls, 'Box size', 10, 120, 80, 5, function (v) { boxSize = v; });

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width;
                                var H = viz.height;

                                // Count filled boxes
                                var filledBoxes = {};
                                var count = 0;
                                for (var i = 0; i < curve.length; i++) {
                                    var bx = Math.floor(curve[i][0] / boxSize);
                                    var by = Math.floor(curve[i][1] / boxSize);
                                    var key = bx + ',' + by;
                                    if (!filledBoxes[key]) {
                                        filledBoxes[key] = true;
                                        count++;
                                    }
                                }

                                // Draw grid boxes
                                var cols = Math.ceil(W / boxSize);
                                var rows = Math.ceil(H / boxSize);
                                for (var r = 0; r < rows; r++) {
                                    for (var c = 0; c < cols; c++) {
                                        var key2 = c + ',' + r;
                                        if (filledBoxes[key2]) {
                                            ctx.fillStyle = viz.colors.teal + '22';
                                            ctx.fillRect(c * boxSize, r * boxSize, boxSize, boxSize);
                                            ctx.strokeStyle = viz.colors.teal + '66';
                                            ctx.lineWidth = 1;
                                            ctx.strokeRect(c * boxSize, r * boxSize, boxSize, boxSize);
                                        } else {
                                            ctx.strokeStyle = viz.colors.grid;
                                            ctx.lineWidth = 0.3;
                                            ctx.strokeRect(c * boxSize, r * boxSize, boxSize, boxSize);
                                        }
                                    }
                                }

                                // Draw curve
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var j = 0; j < curve.length; j++) {
                                    if (j === 0) ctx.moveTo(curve[j][0], curve[j][1]);
                                    else ctx.lineTo(curve[j][0], curve[j][1]);
                                }
                                ctx.stroke();

                                // Info
                                var dim = count > 1 ? (Math.log(count) / Math.log(W / boxSize)).toFixed(2) : '?';
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Box size: ' + boxSize + ' px', 15, 25);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('Boxes needed: ' + count, 15, 47);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Estimated dimension: ~' + dim, 15, 69);
                            }

                            viz.animate(function () { draw(); });
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A smooth curve has fractal dimension 1. A space-filling curve (one that visits every point in a square) has fractal dimension 2. What would a fractal dimension of 1.5 mean intuitively?',
                        hint: 'Think of dimension 1.5 as "halfway" between a curve and a surface in terms of space-filling behavior.',
                        solution: 'A fractal dimension of 1.5 means the curve is more complex than a simple line but less space-filling than a surface. It twists and turns enough to partially fill a 2D region, but with significant gaps. Intuitively, it is a moderately "rough" or "crinkly" curve. The Sierpinski triangle (\\(D \\approx 1.58\\)) is close to this; it fills a triangular region but with holes at every scale.'
                    },
                    {
                        question: 'Suppose you cover a fractal with boxes of size \\(\\varepsilon = 1/10\\) and need 500 boxes. Then with boxes of size \\(\\varepsilon = 1/100\\) you need 15,800 boxes. Estimate the fractal dimension.',
                        hint: 'Use the formula: \\(D \\approx \\log(N_2 / N_1) / \\log(\\varepsilon_1 / \\varepsilon_2)\\).',
                        solution: 'The ratio of box sizes is \\(10\\) (since \\((1/10)/(1/100) = 10\\)). The ratio of counts is \\(15800/500 = 31.6\\). The fractal dimension is approximately \\(D \\approx \\log(31.6)/\\log(10) = 1.50\\). So this is a fractal with dimension about 1.5.'
                    }
                ]
            },

            // ============================================================
            // Section 5: Why Nature Loves Fractals
            // ============================================================
            {
                id: 'why-nature-loves-fractals',
                title: 'Why Nature Loves Fractals',
                content: `
<h2>Simple Rules, Complex Results</h2>

<p>Throughout this chapter, we have seen fractals in coastlines, trees, rivers, lungs, and blood vessels. This ubiquity is not coincidental. Nature uses fractal-like structures because they solve important engineering problems elegantly and efficiently.</p>

<h3>Maximizing Surface Area</h3>

<p>Your lungs need to exchange oxygen and carbon dioxide between air and blood. The more surface area available for this exchange, the more efficient the process. By branching 23 times, the lungs pack roughly 70 square meters of surface area (about the size of a tennis court) into your chest cavity. A simple balloon-shaped lung could never achieve this.</p>

<p>The same principle applies to the roots of plants (maximizing nutrient absorption), the villi of the small intestine (maximizing nutrient absorption), and the branching of coral (maximizing food capture from water currents).</p>

<div class="env-block intuition">
<strong>The Surface-Area Advantage</strong><br>
Fractal branching creates enormous surfaces in small volumes. This is why biological systems that need to exchange materials (nutrients, gases, heat) across surfaces almost always adopt fractal-like branching patterns. It is evolution's answer to a geometry problem.
</div>

<h3>Robustness and Redundancy</h3>

<p>Self-similar structures are inherently robust. If a tree loses a branch, the remaining branches still function as trees. If a blood vessel is blocked, nearby vessels (part of the same branching network) can partially compensate. The repetitive, nested structure means that damage at one scale does not catastrophically affect the whole.</p>

<h3>Growth from Simple Rules</h3>

<p>Perhaps the deepest reason nature loves fractals is that they can be generated by extremely simple rules applied recursively. A fern does not need a blueprint for every frond, every leaflet, every sub-leaflet. It needs one rule: "branch, then repeat." The staggering complexity of a tree's canopy, with its millions of leaves arranged in a self-similar hierarchy, emerges from the iteration of a simple branching instruction encoded in DNA.</p>

<div class="viz-placeholder" data-viz="growth-animation"></div>

<h3>Fractals and the Limits of Classical Geometry</h3>

<p>Euclid's geometry gives us circles, triangles, and straight lines. These are powerful abstractions, but they do not describe the natural world well. As Mandelbrot famously wrote:</p>

<div class="env-block remark">
<strong>Mandelbrot's Observation</strong><br>
"Clouds are not spheres, mountains are not cones, coastlines are not circles, and bark is not smooth, nor does lightning travel in a straight line."
</div>

<p>Fractal geometry fills the gap. It provides a language for describing the irregular, jagged, self-similar shapes that Euclid's geometry ignores. With fractals, we can model clouds, terrain, blood vessel networks, and galaxy distributions, all of which share the property of looking similar at different scales.</p>

<h3>Looking Forward</h3>

<p>In the next chapter, we will meet the most famous mathematical fractals: the Koch snowflake, the Sierpinski triangle, and the Cantor set. These are the "pure" fractals, idealized objects that exhibit exact self-similarity. They will sharpen our understanding of fractal dimension, infinite perimeters, and the surprising beauty that emerges from simple recursive rules.</p>

<div class="env-block intuition">
<strong>The Big Idea</strong><br>
Nature's complexity does not require complex instructions. A few simple rules, repeated at every scale, can generate the breathtaking intricacy of a forest, a river delta, or a human circulatory system. Self-similarity is nature's compression algorithm: infinite detail from finite information.
</div>
`,
                visualizations: [
                    {
                        id: 'growth-animation',
                        title: 'Watch a Fractal Tree Grow',
                        description: 'A tree grows from a single seed, branching level by level. Simple rules create complex beauty.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                            var t0 = null;
                            var speed = 1;

                            VizEngine.createSlider(controls, 'Growth speed', 0.3, 3, 1, 0.1, function (v) { speed = v; });
                            VizEngine.createButton(controls, 'Restart', function () { t0 = null; });

                            function drawGrowingBranch(ctx, x, y, len, angle, maxDepth, growthTime, t) {
                                if (maxDepth <= 0 || len < 1) return;

                                var progress = VizEngine.clamp((t - growthTime) / 800, 0, 1);
                                if (progress <= 0) return;

                                var currentLen = len * progress;
                                var rad = angle * Math.PI / 180;
                                var x2 = x + currentLen * Math.sin(rad);
                                var y2 = y - currentLen * Math.cos(rad);

                                var thickness = Math.max(1, maxDepth * 1.1);
                                var hue = maxDepth > 3 ? 30 : 120;
                                var lightness = maxDepth > 3 ? 25 + (10 - maxDepth) * 4 : 45;
                                ctx.strokeStyle = VizEngine.hsl(hue, 50, lightness);
                                ctx.lineWidth = thickness;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x2, y2);
                                ctx.stroke();

                                if (progress >= 1) {
                                    var childDelay = growthTime + 600 / speed;
                                    var childLen = len * 0.68;
                                    drawGrowingBranch(ctx, x2, y2, childLen, angle - 28, maxDepth - 1, childDelay, t);
                                    drawGrowingBranch(ctx, x2, y2, childLen, angle + 28, maxDepth - 1, childDelay, t);

                                    // Leaves at tips
                                    if (maxDepth <= 2 && progress >= 1) {
                                        ctx.fillStyle = VizEngine.hsl(110, 60, 40);
                                        ctx.globalAlpha = 0.6;
                                        ctx.beginPath();
                                        ctx.arc(x2, y2, 3, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.globalAlpha = 1;
                                    }
                                }
                            }

                            function draw(t) {
                                if (t0 === null) t0 = t;
                                var elapsed = (t - t0) * speed;
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width;
                                var H = viz.height;

                                // Ground
                                ctx.fillStyle = '#1a0f05';
                                ctx.fillRect(0, H - 25, W, 25);

                                drawGrowingBranch(ctx, W / 2, H - 25, H * 0.22, 0, 10, 0, elapsed);

                                // Timer
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Time: ' + (elapsed / 1000).toFixed(1) + 's', 15, 20);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Explain in your own words why fractal branching is more efficient than a single large tube for transporting oxygen from the trachea to the alveoli.',
                        hint: 'Think about what would happen if your trachea did not branch. How would oxygen reach all parts of the lung tissue?',
                        solution: 'A single large tube would only expose its inner surface to the air. To exchange oxygen efficiently, you need a huge surface area in contact with thin-walled blood vessels. By branching 23 times, the lungs create millions of tiny alveoli, each with a very thin wall, providing about 70 m&sup2; of surface area. A single tube of the same volume would have vastly less surface area. The fractal branching structure maximizes the ratio of surface area to volume, which is exactly what you want for gas exchange.'
                    },
                    {
                        question: 'Mandelbrot wrote: "Clouds are not spheres, mountains are not cones." Choose an everyday natural object and explain how its shape differs from any simple Euclidean description.',
                        hint: 'Think about a tree, a river, a head of broccoli, or a bolt of lightning.',
                        solution: 'Many answers are valid. For example: <em>A tree</em> is not a cylinder topped by a sphere (the typical child\'s drawing). Its trunk is irregular, its branches spread in a self-similar pattern, and its canopy has a fractal boundary with gaps at every scale. No simple combination of Euclidean shapes (spheres, cones, cylinders) captures the intricate, self-similar reality. The tree\'s shape is better described as a fractal: a simple branching rule applied recursively at many scales.'
                    },
                    {
                        question: 'If nature uses self-similar branching because it is efficient, why aren\'t all trees identical? What other factors might influence the specific shape of a tree?',
                        hint: 'Efficiency is not the only constraint. What about the environment, available light, wind, and competition with other trees?',
                        solution: 'While fractal branching is universally efficient, the specific parameters (angles, ratios, depth) are tuned by evolution to local conditions. Key factors include: (1) <strong>Light availability:</strong> forest trees grow tall and narrow to reach canopy light, while solitary trees spread broadly. (2) <strong>Wind:</strong> exposed trees develop compact, streamlined forms. (3) <strong>Water/nutrients:</strong> desert trees have wide, shallow root fractals; rainforest trees have deep ones. (4) <strong>Competition:</strong> neighboring trees force asymmetric growth. (5) <strong>Species-specific genetics:</strong> conifers and oaks use different branching strategies, both fractal but with different parameters. Self-similarity provides the framework; environment and genetics fill in the details.'
                    }
                ]
            }
        ]
    });
})();
