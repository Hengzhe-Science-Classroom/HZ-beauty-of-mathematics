// === Chapter 8: Classic Fractals ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch08',
        number: 8,
        title: 'Classic Fractals',
        subtitle: 'Infinite complexity from simple rules',
        sections: [
            // ============================================================
            // Section 1: Koch Snowflake
            // ============================================================
            {
                id: 'koch-snowflake',
                title: 'Koch Snowflake',
                content: `
<h2>Infinite Perimeter, Finite Area</h2>

<p>In 1904, the Swedish mathematician Helge von Koch described a curve so strange that it scandalized the mathematical establishment. It was continuous (you could draw it without lifting your pen) but <em>nowhere smooth</em>: at every single point, the curve had a sharp corner. It was, in Koch's own words, "a continuous curve that has no tangent at any point."</p>

<p>The construction is disarmingly simple.</p>

<div class="env-block definition">
<strong>Constructing the Koch Curve</strong><br>
<ol>
<li>Start with a straight line segment.</li>
<li>Divide it into three equal parts.</li>
<li>Replace the middle third with two sides of an equilateral triangle (pointing outward), removing the base.</li>
<li>Repeat steps 2&ndash;3 for every straight segment in the resulting figure.</li>
</ol>
After infinitely many iterations, you have the <strong>Koch curve</strong>.
</div>

<p>If you apply this construction to all three sides of an equilateral triangle, you get the <strong>Koch snowflake</strong>, one of the most iconic fractals in mathematics.</p>

<div class="viz-placeholder" data-viz="koch-snowflake-viz"></div>

<h3>The Paradox of Infinite Perimeter</h3>

<p>At each iteration, every line segment is replaced by four segments, each one-third the length of the original. So the total length is multiplied by \\(4/3\\) at each step:</p>

<ul>
<li>Start: perimeter = 3 (for a unit triangle)</li>
<li>Iteration 1: perimeter = \\(3 \\times 4/3 = 4\\)</li>
<li>Iteration 2: perimeter = \\(3 \\times (4/3)^2 \\approx 5.33\\)</li>
<li>Iteration \\(n\\): perimeter = \\(3 \\times (4/3)^n\\)</li>
</ul>

<p>Since \\(4/3 &gt; 1\\), this grows without bound. After infinitely many iterations, the perimeter is <strong>infinite</strong>.</p>

<p>But what about the area? Each iteration adds tiny triangles, but each new batch of triangles is much smaller than the last. The total area added forms a geometric series that converges. The Koch snowflake has:</p>

\\[\\text{Area} = \\frac{2\\sqrt{3}}{5} s^2\\]

<p>where \\(s\\) is the side of the original triangle. This is exactly \\(8/5\\) of the original triangle's area. Finite!</p>

<div class="env-block theorem">
<strong>Koch Snowflake: The Paradox</strong><br>
The Koch snowflake encloses a <em>finite</em> area inside an <em>infinite</em> perimeter. You could never walk around it (infinite boundary), yet you could paint its interior with a finite amount of paint.
</div>

<h3>Fractal Dimension of the Koch Curve</h3>

<p>At each iteration, each segment produces 4 copies of itself, each scaled down by a factor of 3. The fractal dimension is:</p>

\\[D = \\frac{\\log 4}{\\log 3} \\approx 1.2619\\]

<p>This is greater than 1 (a line) but less than 2 (a surface), confirming that the Koch curve is "more than a line but less than a plane."</p>
`,
                visualizations: [
                    {
                        id: 'koch-snowflake-viz',
                        title: 'Koch Snowflake Builder',
                        description: 'Use the slider to increase the iteration level. Watch the perimeter grow while the area barely changes.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 460, scale: 1, originX: 0, originY: 0 });
                            var iteration = 0;
                            var targetIter = 0;
                            var animProgress = 1;

                            VizEngine.createSlider(controls, 'Iteration', 0, 6, 0, 1, function (v) {
                                targetIter = Math.round(v);
                                if (targetIter !== iteration) {
                                    animProgress = 0;
                                    iteration = targetIter;
                                }
                            });

                            function kochSide(x1, y1, x2, y2, depth) {
                                if (depth === 0) return [[x1, y1]];
                                var dx = x2 - x1, dy = y2 - y1;
                                var ax = x1 + dx / 3, ay = y1 + dy / 3;
                                var bx = x1 + 2 * dx / 3, by = y1 + 2 * dy / 3;
                                var px = (ax + bx) / 2 - (by - ay) * Math.sqrt(3) / 2;
                                var py = (ay + by) / 2 + (bx - ax) * Math.sqrt(3) / 2;
                                var pts = [];
                                pts = pts.concat(kochSide(x1, y1, ax, ay, depth - 1));
                                pts = pts.concat(kochSide(ax, ay, px, py, depth - 1));
                                pts = pts.concat(kochSide(px, py, bx, by, depth - 1));
                                pts = pts.concat(kochSide(bx, by, x2, y2, depth - 1));
                                return pts;
                            }

                            function getSnowflake(iter) {
                                var W = viz.width, H = viz.height;
                                var cx = W / 2, cy = H / 2 + 20;
                                var R = Math.min(W, H) * 0.38;
                                // Equilateral triangle vertices
                                var v1x = cx, v1y = cy - R;
                                var v2x = cx - R * Math.sqrt(3) / 2, v2y = cy + R / 2;
                                var v3x = cx + R * Math.sqrt(3) / 2, v3y = cy + R / 2;

                                var pts = [];
                                pts = pts.concat(kochSide(v1x, v1y, v2x, v2y, iter));
                                pts = pts.concat(kochSide(v2x, v2y, v3x, v3y, iter));
                                pts = pts.concat(kochSide(v3x, v3y, v1x, v1y, iter));
                                pts.push([v1x, v1y]);
                                return pts;
                            }

                            function draw(t) {
                                animProgress = VizEngine.clamp(animProgress + 0.02, 0, 1);
                                viz.clear();
                                var ctx = viz.ctx;

                                var pts = getSnowflake(iteration);

                                // Fill
                                ctx.fillStyle = viz.colors.blue + '22';
                                ctx.beginPath();
                                for (var i = 0; i < pts.length; i++) {
                                    if (i === 0) ctx.moveTo(pts[i][0], pts[i][1]);
                                    else ctx.lineTo(pts[i][0], pts[i][1]);
                                }
                                ctx.closePath();
                                ctx.fill();

                                // Stroke
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = iteration <= 3 ? 2 : 1;
                                ctx.beginPath();
                                for (var j = 0; j < pts.length; j++) {
                                    if (j === 0) ctx.moveTo(pts[j][0], pts[j][1]);
                                    else ctx.lineTo(pts[j][0], pts[j][1]);
                                }
                                ctx.closePath();
                                ctx.stroke();

                                // Stats
                                var perimeter = 3 * Math.pow(4 / 3, iteration);
                                var segments = 3 * Math.pow(4, iteration);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Iteration: ' + iteration, 15, 25);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Perimeter: ' + perimeter.toFixed(2) + ' (relative)', 15, 47);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('Segments: ' + segments.toLocaleString(), 15, 69);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('Dimension: log(4)/log(3) \u2248 1.262', 15, 91);

                                if (iteration >= 4) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('Perimeter \u2192 \u221E,  but area stays finite!', viz.width / 2, viz.height - 15);
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'After 5 iterations of the Koch snowflake, what is the perimeter (relative to the original triangle with perimeter 3)?',
                        hint: 'The perimeter at iteration \\(n\\) is \\(3 \\times (4/3)^n\\).',
                        solution: 'After 5 iterations: \\(3 \\times (4/3)^5 = 3 \\times 1024/243 \\approx 3 \\times 4.214 \\approx 12.64\\). The perimeter has more than quadrupled from the original 3, and it will continue growing without bound.'
                    },
                    {
                        question: 'How many line segments does the Koch snowflake have after 4 iterations?',
                        hint: 'Starting with 3 segments, each iteration replaces every segment with 4 new ones.',
                        solution: 'After \\(n\\) iterations, the number of segments is \\(3 \\times 4^n\\). After 4 iterations: \\(3 \\times 4^4 = 3 \\times 256 = 768\\) segments.'
                    },
                    {
                        question: 'Can you think of a real-world object that, like the Koch snowflake, has a very long boundary relative to its area?',
                        hint: 'Think of objects designed to maximize surface-to-volume ratio: cooling fins, radiators, certain leaves.',
                        solution: 'Many examples work: (1) Cooling fins on a radiator have a very long, folded boundary to maximize heat transfer from a small area. (2) The fractal-like edges of some oak leaves increase the perimeter-to-area ratio, which may help with gas exchange or pest resistance. (3) The convoluted boundary of a coral reef maximizes the surface available for filter-feeding organisms. The Koch snowflake is the mathematical ideal of this principle.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Sierpinski Triangle
            // ============================================================
            {
                id: 'sierpinski-triangle',
                title: 'Sierpinski Triangle',
                content: `
<h2>Building Beauty by Removing</h2>

<p>In 1915, the Polish mathematician Wac&#322;aw Sierpi&#324;ski described a shape that seems to contradict common sense: you create it by <em>removing</em> material, yet the result is infinitely intricate and stunningly beautiful.</p>

<div class="env-block definition">
<strong>Constructing the Sierpinski Triangle</strong><br>
<ol>
<li>Start with a solid equilateral triangle.</li>
<li>Find the midpoints of each side and connect them, dividing the triangle into four smaller triangles.</li>
<li>Remove the central (upside-down) triangle.</li>
<li>Repeat steps 2&ndash;3 for each of the three remaining solid triangles.</li>
</ol>
After infinitely many iterations, the remaining set is the <strong>Sierpinski triangle</strong> (also called the Sierpinski gasket).
</div>

<p>At each step, you remove the middle quarter of every remaining triangle. After one iteration, you have 3 triangles. After two, 9. After three, 27. After \\(n\\) iterations, you have \\(3^n\\) tiny triangles.</p>

<div class="viz-placeholder" data-viz="sierpinski-viz"></div>

<h3>Area and Dimension</h3>

<p>What happens to the area? At each iteration, you keep \\(3/4\\) of the remaining area. After \\(n\\) iterations:</p>

\\[\\text{Area}_n = \\left(\\frac{3}{4}\\right)^n \\times \\text{Area}_0\\]

<p>As \\(n \\to \\infty\\), \\((3/4)^n \\to 0\\). The Sierpinski triangle has <strong>zero area</strong>! You have removed everything, yet something remains: an infinite, infinitely detailed, self-similar skeleton.</p>

<div class="env-block theorem">
<strong>Sierpinski Triangle Properties</strong><br>
<ul>
<li><strong>Area:</strong> zero (everything has been removed)</li>
<li><strong>Number of pieces:</strong> 3 copies at each level, each scaled by 1/2</li>
<li><strong>Fractal dimension:</strong> \\(D = \\log 3 / \\log 2 \\approx 1.585\\)</li>
</ul>
The dimension is between 1 and 2: more than a collection of lines, less than a surface.
</div>

<h3>Surprising Appearances</h3>

<p>The Sierpinski triangle shows up in unexpected places:</p>

<ul>
<li><strong>Pascal's Triangle:</strong> Color the odd numbers in Pascal's triangle. The pattern that emerges is a Sierpinski triangle! (Recall Chapter 3.)</li>
<li><strong>The Chaos Game:</strong> Place three dots at the vertices of a triangle. Pick a random starting point. Repeatedly jump halfway toward a randomly chosen vertex and plot the point. After thousands of iterations, the Sierpinski triangle appears, as if by magic.</li>
<li><strong>Cellular automata:</strong> Rule 90 of Stephen Wolfram's elementary cellular automata produces the Sierpinski triangle.</li>
</ul>

<p>The fact that such different processes all produce the same shape hints at something deep: the Sierpinski triangle is not just a mathematical curiosity. It is a fundamental pattern, a kind of attractor in the space of self-similar structures.</p>
`,
                visualizations: [
                    {
                        id: 'sierpinski-viz',
                        title: 'Sierpinski Triangle Builder',
                        description: 'Increase the iteration level to remove more and more triangles. Also try the "Chaos Game" mode!',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 460, scale: 1, originX: 0, originY: 0 });
                            var iteration = 0;
                            var mode = 0; // 0=removal, 1=chaos game
                            var chaosPoints = [];
                            var chaosTimer = null;

                            VizEngine.createSlider(controls, 'Iteration', 0, 8, 0, 1, function (v) {
                                iteration = Math.round(v);
                                if (mode === 1) { mode = 0; clearChaos(); }
                            });
                            VizEngine.createButton(controls, 'Chaos Game', function () {
                                mode = 1;
                                chaosPoints = [];
                                var W = viz.width, H = viz.height;
                                var margin = 40;
                                var v1 = [W / 2, margin];
                                var v2 = [margin, H - margin];
                                var v3 = [W - margin, H - margin];
                                var verts = [v1, v2, v3];
                                var cx = W / 2, cy = H / 2;

                                var batchSize = 100;
                                chaosTimer = setInterval(function () {
                                    for (var i = 0; i < batchSize; i++) {
                                        var target = verts[Math.floor(Math.random() * 3)];
                                        cx = (cx + target[0]) / 2;
                                        cy = (cy + target[1]) / 2;
                                        if (chaosPoints.length > 50) {
                                            chaosPoints.push([cx, cy]);
                                        } else {
                                            chaosPoints.push([cx, cy]);
                                        }
                                    }
                                    if (chaosPoints.length > 50000) clearInterval(chaosTimer);
                                }, 30);
                            });

                            function clearChaos() {
                                if (chaosTimer) clearInterval(chaosTimer);
                                chaosPoints = [];
                            }
                            VizEngine.createButton(controls, 'Reset', function () {
                                mode = 0; iteration = 0; clearChaos();
                            });

                            function drawSierpinski(ctx, x1, y1, x2, y2, x3, y3, depth) {
                                if (depth === 0) {
                                    ctx.beginPath();
                                    ctx.moveTo(x1, y1);
                                    ctx.lineTo(x2, y2);
                                    ctx.lineTo(x3, y3);
                                    ctx.closePath();
                                    ctx.fill();
                                    return;
                                }
                                var mx1 = (x1 + x2) / 2, my1 = (y1 + y2) / 2;
                                var mx2 = (x2 + x3) / 2, my2 = (y2 + y3) / 2;
                                var mx3 = (x1 + x3) / 2, my3 = (y1 + y3) / 2;
                                drawSierpinski(ctx, x1, y1, mx1, my1, mx3, my3, depth - 1);
                                drawSierpinski(ctx, mx1, my1, x2, y2, mx2, my2, depth - 1);
                                drawSierpinski(ctx, mx3, my3, mx2, my2, x3, y3, depth - 1);
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var margin = 40;

                                if (mode === 0) {
                                    // Sierpinski by removal
                                    ctx.fillStyle = viz.colors.purple;
                                    drawSierpinski(ctx, W / 2, margin, margin, H - margin, W - margin, H - margin, iteration);

                                    // Stats
                                    var triangles = Math.pow(3, iteration);
                                    var areaFrac = Math.pow(3 / 4, iteration);
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText('Iteration: ' + iteration, 15, 25);
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.fillText('Triangles: ' + triangles.toLocaleString(), 15, 47);
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.fillText('Area remaining: ' + (areaFrac * 100).toFixed(1) + '%', 15, 69);
                                } else {
                                    // Chaos game
                                    ctx.fillStyle = viz.colors.purple;
                                    ctx.globalAlpha = 0.5;
                                    for (var i = 0; i < chaosPoints.length; i++) {
                                        ctx.fillRect(chaosPoints[i][0], chaosPoints[i][1], 1, 1);
                                    }
                                    ctx.globalAlpha = 1;

                                    // Vertices
                                    var verts = [[W / 2, margin], [margin, H - margin], [W - margin, H - margin]];
                                    for (var v = 0; v < 3; v++) {
                                        ctx.fillStyle = viz.colors.orange;
                                        ctx.beginPath();
                                        ctx.arc(verts[v][0], verts[v][1], 5, 0, Math.PI * 2);
                                        ctx.fill();
                                    }

                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText('Chaos Game: ' + chaosPoints.length.toLocaleString() + ' points', 15, 25);
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.fillText('Random jumps halfway to a vertex \u2192 Sierpinski triangle!', 15, 47);
                                }
                            }

                            viz.animate(function () { draw(); });
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'After 6 iterations of the Sierpinski triangle construction, how many small triangles remain? What fraction of the original area is left?',
                        hint: 'Number of triangles: \\(3^n\\). Area fraction: \\((3/4)^n\\).',
                        solution: 'After 6 iterations: \\(3^6 = 729\\) triangles remain. The area fraction is \\((3/4)^6 = 729/4096 \\approx 0.178\\), so about 17.8% of the original area is left. After infinitely many iterations, the area reaches zero.'
                    },
                    {
                        question: 'In the Chaos Game, why does jumping halfway to a random vertex produce the Sierpinski triangle rather than random noise?',
                        hint: 'Think about which points are <em>never</em> visited. If you are inside the "removed" central triangle, where does jumping halfway to a vertex take you?',
                        solution: 'The Chaos Game works because jumping halfway to a vertex is exactly the contraction mapping that defines the Sierpinski triangle as an attractor of an Iterated Function System (IFS). Any point in the central "removed" triangle, when mapped halfway to any vertex, lands in one of the three "kept" sub-triangles. Points are always drawn toward the attractor. Over many iterations, the probability distribution of visited points converges to the Sierpinski triangle. The removed regions are never visited because they are repelling under these transformations.'
                    },
                    {
                        question: 'Verify that the fractal dimension of the Sierpinski triangle is \\(\\log 3 / \\log 2 \\approx 1.585\\). Why does this make sense intuitively?',
                        hint: 'Each iteration creates 3 copies of itself, each scaled down by a factor of 2.',
                        solution: 'When we scale the Sierpinski triangle by a factor of 2, we get 3 copies of the original. For a \\(d\\)-dimensional object, scaling by factor \\(r\\) gives \\(r^d\\) copies. So \\(2^d = 3\\), which gives \\(d = \\log 3 / \\log 2 \\approx 1.585\\). Intuitively, the Sierpinski triangle is "more" than a network of lines (dimension 1) but "less" than a filled surface (dimension 2). Its dimension of about 1.6 reflects the fact that it fills a significant portion, but not all, of its bounding triangle.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Sierpinski Carpet & Menger Sponge
            // ============================================================
            {
                id: 'carpet-and-sponge',
                title: 'Sierpinski Carpet &amp; Menger Sponge',
                content: `
<h2>From 2D to 3D: Extending the Pattern</h2>

<p>The Sierpinski triangle removes the center of a triangle. What if we apply the same idea to a square? And then to a cube?</p>

<h3>Sierpinski Carpet</h3>

<div class="env-block definition">
<strong>Constructing the Sierpinski Carpet</strong><br>
<ol>
<li>Start with a solid square.</li>
<li>Divide it into 9 equal smaller squares (a 3&times;3 grid).</li>
<li>Remove the center square.</li>
<li>Repeat for each of the 8 remaining squares.</li>
</ol>
</div>

<p>After one iteration, you have 8 small squares. After two, 64. After \\(n\\) iterations, \\(8^n\\) tiny squares remain. The area fraction after \\(n\\) steps is \\((8/9)^n\\), which goes to zero. Like the Sierpinski triangle, the carpet has zero area but is still a rich, self-similar structure.</p>

<p>The fractal dimension is \\(D = \\log 8 / \\log 3 \\approx 1.893\\). This is almost 2, reflecting the fact that the carpet is nearly a filled square but with a fractal pattern of holes at every scale.</p>

<div class="viz-placeholder" data-viz="sierpinski-carpet-viz"></div>

<h3>Menger Sponge: The 3D Version</h3>

<p>Now extend the idea to three dimensions. Start with a solid cube, divide it into 27 (3&times;3&times;3) smaller cubes, and remove the center cube of each face plus the very center, leaving 20 sub-cubes. Repeat.</p>

<p>The result is the <strong>Menger sponge</strong>, one of the most famous three-dimensional fractals. Its properties are mind-bending:</p>

<div class="env-block theorem">
<strong>Menger Sponge Properties</strong><br>
<ul>
<li><strong>Volume:</strong> zero (after infinitely many iterations, all the interior has been removed)</li>
<li><strong>Surface area:</strong> infinite (the removal process keeps creating new surfaces)</li>
<li><strong>Fractal dimension:</strong> \\(D = \\log 20 / \\log 3 \\approx 2.727\\)</li>
</ul>
It is between a surface (dimension 2) and a solid (dimension 3). Zero volume, infinite surface, and a dimension that is neither whole number.
</div>

<p>The Menger sponge is a 3D object with zero volume. You could not fill it with paint (infinite surface!), and it weighs nothing (zero volume!), yet it exists as a well-defined geometric object with an intricate, self-similar structure. It is the kind of object that could only exist in the world of mathematical abstraction, yet its cross-sections yield Sierpinski carpets, and its edges trace Cantor sets.</p>

<h3>A Family of Fractals</h3>

<p>These three fractals form a beautiful family, each one the natural generalization of the previous to one higher dimension:</p>

<ul>
<li><strong>1D: Cantor set</strong> (remove the middle third of line segments)</li>
<li><strong>2D: Sierpinski carpet</strong> (remove the center of squares)</li>
<li><strong>3D: Menger sponge</strong> (remove the center of cubes)</li>
</ul>

<p>The pattern could be extended to 4D, 5D, and beyond, though we cannot visualize those. The principle remains the same: divide, remove the center, repeat.</p>
`,
                visualizations: [
                    {
                        id: 'sierpinski-carpet-viz',
                        title: 'Sierpinski Carpet Builder',
                        description: 'Watch the carpet emerge as squares are removed at each iteration level.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 460, scale: 1, originX: 0, originY: 0 });
                            var iteration = 0;

                            VizEngine.createSlider(controls, 'Iteration', 0, 5, 0, 1, function (v) {
                                iteration = Math.round(v);
                            });

                            function drawCarpet(ctx, x, y, size, depth) {
                                if (depth === 0) {
                                    ctx.fillRect(x, y, size, size);
                                    return;
                                }
                                var s = size / 3;
                                for (var row = 0; row < 3; row++) {
                                    for (var col = 0; col < 3; col++) {
                                        if (row === 1 && col === 1) continue; // remove center
                                        drawCarpet(ctx, x + col * s, y + row * s, s, depth - 1);
                                    }
                                }
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var margin = 40;
                                var size = Math.min(W, H) - 2 * margin;
                                var offX = (W - size) / 2;
                                var offY = (H - size) / 2 + 15;

                                ctx.fillStyle = viz.colors.purple;
                                drawCarpet(ctx, offX, offY, size, iteration);

                                // Stats
                                var squares = Math.pow(8, iteration);
                                var areaFrac = Math.pow(8 / 9, iteration);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Iteration: ' + iteration, 15, 25);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('Squares: ' + squares.toLocaleString(), 15, 47);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Area remaining: ' + (areaFrac * 100).toFixed(1) + '%', 15, 69);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('Dimension: log(8)/log(3) \u2248 1.893', 15, 91);
                            }

                            viz.animate(function () { draw(); });
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'After 3 iterations of the Sierpinski carpet, how many squares remain? What percentage of the original area is left?',
                        hint: 'After \\(n\\) iterations: \\(8^n\\) squares, area fraction \\((8/9)^n\\).',
                        solution: 'After 3 iterations: \\(8^3 = 512\\) squares remain. Area fraction: \\((8/9)^3 = 512/729 \\approx 0.702\\), so about 70.2% of the original area is left. The carpet loses area slowly because \\(8/9\\) is close to 1, but eventually the area reaches zero.'
                    },
                    {
                        question: 'The Menger sponge has fractal dimension \\(\\log 20 / \\log 3 \\approx 2.727\\). How does this compare to the Sierpinski carpet (\\(\\approx 1.893\\)) and the Cantor set (\\(\\approx 0.631\\))? Do you see a pattern?',
                        hint: 'The Cantor set lives in 1D space, the carpet in 2D, and the sponge in 3D. Compare each fractal\'s dimension to the dimension of the space it lives in.',
                        solution: 'The pattern is that each fractal has a dimension roughly 0.7&ndash;0.9 of the dimension of the space it lives in. Cantor set: 0.631 out of 1D. Sierpinski carpet: 1.893 out of 2D. Menger sponge: 2.727 out of 3D. Each removes a fixed fraction at each level, and the resulting dimension reflects how much "space" remains. More precisely, each fractal\'s dimension is \\(\\log(\\text{pieces kept}) / \\log(\\text{scale factor})\\). The Cantor set keeps 2 of 3 pieces, the carpet keeps 8 of 9, and the sponge keeps 20 of 27.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Cantor Set
            // ============================================================
            {
                id: 'cantor-set',
                title: 'Cantor Set',
                content: `
<h2>The Dust That Contains Infinity</h2>

<p>We return to Georg Cantor, whose revolutionary ideas about infinity we explored in Chapter 6. Before his work on infinite sets, Cantor discovered one of the most enigmatic objects in mathematics: the <strong>Cantor set</strong> (1883).</p>

<div class="env-block definition">
<strong>Constructing the Cantor Set</strong><br>
<ol>
<li>Start with the interval \\([0, 1]\\).</li>
<li>Remove the open middle third: \\((1/3, 2/3)\\). You are left with \\([0, 1/3] \\cup [2/3, 1]\\).</li>
<li>Remove the open middle third of each remaining interval.</li>
<li>Repeat forever.</li>
</ol>
What remains after infinitely many steps is the Cantor set.
</div>

<div class="viz-placeholder" data-viz="cantor-set-viz"></div>

<h3>What Is Left?</h3>

<p>At each step, we keep \\(2/3\\) of the total length of the remaining intervals. Wait, that cannot be right. Let us count more carefully.</p>

<p>After step 1, we remove an interval of length \\(1/3\\). After step 2, we remove 2 intervals of length \\(1/9\\). After step 3, 4 intervals of length \\(1/27\\). The total length removed is:</p>

\\[\\frac{1}{3} + \\frac{2}{9} + \\frac{4}{27} + \\frac{8}{81} + \\cdots = \\frac{1}{3} \\cdot \\frac{1}{1 - 2/3} = 1\\]

<p>We have removed a total length of 1 from an interval of length 1. The Cantor set has <strong>zero length</strong> (more precisely, zero Lebesgue measure).</p>

<div class="env-block theorem">
<strong>The Cantor Set Paradox</strong><br>
The Cantor set has zero length, yet it is <em>uncountably infinite</em>. It contains as many points as the entire interval \\([0, 1]\\).
</div>

<p>How can something with zero length contain uncountably many points? This is the magic of the Cantor set. Every point in the Cantor set can be written in base 3 (ternary) using only the digits 0 and 2 (never 1). Since each position in the ternary expansion can be 0 or 2, this is equivalent to choosing an infinite binary string, and there are uncountably many of those (by Cantor's diagonal argument from Chapter 6!).</p>

<h3>Fractal Dimension</h3>

<p>The Cantor set consists of 2 copies of itself, each scaled by 1/3. Its fractal dimension is:</p>

\\[D = \\frac{\\log 2}{\\log 3} \\approx 0.631\\]

<p>This is between 0 (a collection of isolated points) and 1 (a line segment). The Cantor set is "dusty": it has too many points to be countable, but too little "substance" to have any length. Mathematicians sometimes call it <strong>Cantor dust</strong>.</p>

<div class="env-block remark">
<strong>A Connection to Chapter 6</strong><br>
The Cantor set is simultaneously "small" (zero length, zero probability of landing on it if you throw a dart at \\([0,1]\\)) and "large" (uncountably infinite, same cardinality as \\([0,1]\\) itself). This duality perfectly illustrates how our everyday intuitions about "size" break down for infinite sets, just as Cantor showed.
</div>
`,
                visualizations: [
                    {
                        id: 'cantor-set-viz',
                        title: 'Cantor Set: Step by Step',
                        description: 'Watch the middle thirds being removed, step by step. What remains is Cantor dust.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 400, scale: 1, originX: 0, originY: 0 });
                            var iteration = 0;
                            var maxIter = 8;

                            VizEngine.createSlider(controls, 'Iteration', 0, maxIter, 0, 1, function (v) {
                                iteration = Math.round(v);
                            });

                            function getIntervals(n) {
                                if (n === 0) return [[0, 1]];
                                var prev = getIntervals(n - 1);
                                var result = [];
                                for (var i = 0; i < prev.length; i++) {
                                    var a = prev[i][0], b = prev[i][1];
                                    var len = (b - a) / 3;
                                    result.push([a, a + len]);
                                    result.push([b - len, b]);
                                }
                                return result;
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var margin = 40;
                                var usable = W - 2 * margin;
                                var rowH = 32;
                                var startY = 40;

                                // Draw all iterations up to current
                                for (var iter = 0; iter <= iteration; iter++) {
                                    var intervals = getIntervals(iter);
                                    var y = startY + iter * rowH;

                                    // Label
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'right';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText('n=' + iter, margin - 8, y + 8);

                                    // Draw bars
                                    var hue = 280 - iter * 20;
                                    for (var i = 0; i < intervals.length; i++) {
                                        var x1 = margin + intervals[i][0] * usable;
                                        var x2 = margin + intervals[i][1] * usable;
                                        var barH = Math.max(3, 16 - iter);

                                        ctx.fillStyle = VizEngine.hsl(hue, 60, 50);
                                        ctx.fillRect(x1, y, x2 - x1, barH);
                                    }

                                    // Removed sections in red (from previous level)
                                    if (iter > 0) {
                                        var prevIntervals = getIntervals(iter - 1);
                                        ctx.fillStyle = viz.colors.red + '33';
                                        for (var j = 0; j < prevIntervals.length; j++) {
                                            var a = prevIntervals[j][0], b = prevIntervals[j][1];
                                            var gap1 = a + (b - a) / 3;
                                            var gap2 = b - (b - a) / 3;
                                            var gx1 = margin + gap1 * usable;
                                            var gx2 = margin + gap2 * usable;
                                            ctx.fillRect(gx1, y - rowH, gx2 - gx1, Math.max(3, 16 - (iter - 1)));
                                        }
                                    }
                                }

                                // Stats
                                var numIntervals = Math.pow(2, iteration);
                                var totalLength = Math.pow(2 / 3, iteration);
                                var lengthRemoved = 1 - totalLength;
                                var statsY = startY + (maxIter + 1) * rowH + 20;

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Iteration: ' + iteration, margin, statsY);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('Intervals: ' + numIntervals, margin, statsY + 22);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Length remaining: ' + (totalLength * 100).toFixed(2) + '%', margin, statsY + 44);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('Length removed: ' + (lengthRemoved * 100).toFixed(2) + '%', margin, statsY + 66);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('Dimension: log(2)/log(3) \u2248 0.631', margin + 350, statsY);

                                if (iteration >= 5) {
                                    ctx.fillStyle = viz.colors.purple;
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.fillText('Length \u2192 0, yet uncountably many points remain!', margin + 350, statsY + 22);
                                }
                            }

                            viz.animate(function () { draw(); });
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'After 4 iterations of the Cantor set construction, how many intervals remain? What is their total length?',
                        hint: 'After \\(n\\) iterations: \\(2^n\\) intervals, each of length \\(1/3^n\\).',
                        solution: 'After 4 iterations: \\(2^4 = 16\\) intervals remain, each of length \\(1/3^4 = 1/81\\). Total length: \\(16/81 \\approx 0.198\\), about 19.8% of the original. Equivalently, \\((2/3)^4 = 16/81\\).'
                    },
                    {
                        question: 'The Cantor set has zero length but uncountably many points. Explain why this does not lead to a contradiction.',
                        hint: 'Think about a single point. What "length" does it have? Can uncountably many things of zero length add up to zero?',
                        solution: 'There is no contradiction because the "length" (Lebesgue measure) of a single point is zero, and the sum of uncountably many zeros is still zero. Length is a measure-theoretic concept, not a counting concept. The number of points (cardinality) and the total length (measure) are fundamentally different notions of "size." The Cantor set is "large" in cardinality (uncountable) but "small" in measure (zero length). This distinction is at the heart of modern measure theory.'
                    },
                    {
                        question: 'Is the number \\(1/4\\) in the Cantor set? What about \\(1/3\\)?',
                        hint: 'Write each number in base 3 (ternary). Cantor set members have ternary expansions using only digits 0 and 2.',
                        solution: '\\(1/3\\) is IN the Cantor set: in base 3, \\(1/3 = 0.1\\) but can also be written as \\(0.0222\\ldots\\) (using only digits 0 and 2). It is the right endpoint of the first interval \\([0, 1/3]\\) and is never removed. \\(1/4\\) is NOT in the Cantor set: in base 3, \\(1/4 = 0.020202\\ldots\\), which only uses digits 0 and 2. Wait, actually it IS in the Cantor set! Any number whose ternary expansion avoids the digit 1 belongs to the Cantor set, and \\(1/4 = 0.020202\\ldots_3\\) qualifies. This surprises many people: the Cantor set contains points that are not endpoints of any removed interval.'
                    }
                ]
            },

            // ============================================================
            // Section 5: Creating Your Own Fractals
            // ============================================================
            {
                id: 'create-your-own',
                title: 'Creating Your Own Fractals',
                content: `
<h2>The Recipe for a Fractal</h2>

<p>By now, you have seen the Koch snowflake, the Sierpinski triangle, the Sierpinski carpet, the Menger sponge, and the Cantor set. Different as they look, they all follow the same basic recipe:</p>

<div class="env-block definition">
<strong>The Fractal Recipe</strong><br>
<ol>
<li><strong>Start</strong> with a simple shape (line, triangle, square, cube).</li>
<li><strong>Apply a rule</strong> that replaces each piece with a modified version of itself.</li>
<li><strong>Repeat</strong> the rule at every scale, forever.</li>
</ol>
That's it. Three steps. The complexity comes from the repetition, not from the rule itself.
</div>

<p>This is the deep insight of fractal geometry: <strong>simple rules, applied recursively, generate infinite complexity</strong>. You do not need a complicated blueprint to build a fractal. You need only a simple rule and the patience to repeat it.</p>

<h3>Design Your Own</h3>

<p>Here are some ways to invent new fractals by modifying the classics:</p>

<ul>
<li><strong>Change the replacement rule:</strong> Instead of adding an equilateral triangle to the Koch curve, try a square, or a right triangle, or a random bump.</li>
<li><strong>Change what you remove:</strong> Instead of removing the center of a square, remove a corner. Or remove two opposite corners. Each choice gives a different fractal.</li>
<li><strong>Change the branching:</strong> Instead of splitting into two branches (binary tree), try three or four. Change the angles. Make one branch longer than the other.</li>
<li><strong>Mix rules:</strong> Alternate between two different replacement rules at each level.</li>
</ul>

<div class="viz-placeholder" data-viz="custom-fractal-explorer"></div>

<h3>L-Systems: A Language for Fractals</h3>

<p>In 1968, the Hungarian biologist Aristid Lindenmayer introduced a formal language for describing fractal-like growth patterns, now called <strong>L-systems</strong>. The idea is simple: start with a string of symbols and repeatedly replace each symbol according to a set of rules.</p>

<div class="env-block example">
<strong>Koch Curve as an L-System</strong><br>
<ul>
<li>Alphabet: F (draw forward), + (turn left 60&deg;), &minus; (turn right 60&deg;)</li>
<li>Start: F</li>
<li>Rule: F &rarr; F+F&minus;&minus;F+F</li>
</ul>
After 1 iteration: F+F&minus;&minus;F+F<br>
After 2 iterations: F+F&minus;&minus;F+F+F+F&minus;&minus;F+F&minus;&minus;F+F&minus;&minus;F+F+F+F&minus;&minus;F+F<br>
Interpret the string as drawing instructions, and out comes the Koch curve!
</div>

<p>L-systems can generate an astonishing variety of fractal shapes: trees, seaweed, flowers, dragon curves, Hilbert curves, and much more. They are used in computer graphics to generate realistic vegetation and in biology to model plant growth.</p>

<h3>The Beauty of Simplicity</h3>

<p>What makes fractals so captivating is the contrast between the simplicity of their rules and the complexity of their results. A single line, the instruction "add a triangle," repeated forever, produces the Koch snowflake with its infinite perimeter and fractal dimension. Three points and the rule "jump halfway" produce the Sierpinski triangle from apparent randomness.</p>

<p>This theme, simple rules generating complex behavior, will return powerfully in the coming chapters when we explore the Mandelbrot set and chaos theory. For now, take a moment to appreciate what we have learned: the universe of fractals is generated not by complicated engineering, but by the relentless application of simple ideas.</p>

<div class="env-block intuition">
<strong>The Fractal Principle</strong><br>
You do not need complexity to create complexity. You need simplicity, applied recursively.
</div>
`,
                visualizations: [
                    {
                        id: 'custom-fractal-explorer',
                        title: 'Fractal Explorer: Koch Variants',
                        description: 'Modify the Koch curve by changing the bump angle and the number of sides in the base polygon. Discover new fractals!',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 460, scale: 1, originX: 0, originY: 0 });
                            var bumpAngle = 60;
                            var sides = 3;
                            var iterDepth = 3;

                            VizEngine.createSlider(controls, 'Bump angle', 10, 120, 60, 5, function (v) { bumpAngle = v; });
                            VizEngine.createSlider(controls, 'Base polygon sides', 3, 8, 3, 1, function (v) { sides = Math.round(v); });
                            VizEngine.createSlider(controls, 'Iteration', 0, 5, 3, 1, function (v) { iterDepth = Math.round(v); });

                            function kochVariant(x1, y1, x2, y2, depth, angle) {
                                if (depth === 0) return [[x1, y1]];
                                var dx = x2 - x1, dy = y2 - y1;
                                var ax = x1 + dx / 3, ay = y1 + dy / 3;
                                var bx = x1 + 2 * dx / 3, by = y1 + 2 * dy / 3;
                                // Peak point
                                var mx = (ax + bx) / 2, my = (ay + by) / 2;
                                var len = Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay));
                                var h = len * Math.tan(angle * Math.PI / 360);
                                var nx = -(by - ay), ny = (bx - ax);
                                var nl = Math.sqrt(nx * nx + ny * ny);
                                if (nl > 0) { nx /= nl; ny /= nl; }
                                var px = mx + nx * h, py = my + ny * h;

                                var pts = [];
                                pts = pts.concat(kochVariant(x1, y1, ax, ay, depth - 1, angle));
                                pts = pts.concat(kochVariant(ax, ay, px, py, depth - 1, angle));
                                pts = pts.concat(kochVariant(px, py, bx, by, depth - 1, angle));
                                pts = pts.concat(kochVariant(bx, by, x2, y2, depth - 1, angle));
                                return pts;
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var cx = W / 2, cy = H / 2 + 20;
                                var R = Math.min(W, H) * 0.32;

                                // Generate polygon vertices
                                var verts = [];
                                for (var i = 0; i < sides; i++) {
                                    var a = -Math.PI / 2 + (2 * Math.PI * i) / sides;
                                    verts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
                                }

                                // Generate fractal for each side
                                var allPts = [];
                                for (var s = 0; s < sides; s++) {
                                    var v1 = verts[s];
                                    var v2 = verts[(s + 1) % sides];
                                    allPts = allPts.concat(kochVariant(v1[0], v1[1], v2[0], v2[1], iterDepth, bumpAngle));
                                }
                                allPts.push(allPts[0]); // close

                                // Fill
                                ctx.fillStyle = viz.colors.teal + '22';
                                ctx.beginPath();
                                for (var j = 0; j < allPts.length; j++) {
                                    if (j === 0) ctx.moveTo(allPts[j][0], allPts[j][1]);
                                    else ctx.lineTo(allPts[j][0], allPts[j][1]);
                                }
                                ctx.closePath();
                                ctx.fill();

                                // Stroke
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = iterDepth <= 3 ? 1.5 : 0.8;
                                ctx.beginPath();
                                for (var k = 0; k < allPts.length; k++) {
                                    if (k === 0) ctx.moveTo(allPts[k][0], allPts[k][1]);
                                    else ctx.lineTo(allPts[k][0], allPts[k][1]);
                                }
                                ctx.closePath();
                                ctx.stroke();

                                // Info
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Bump: ' + bumpAngle + '\u00B0  Sides: ' + sides + '  Iter: ' + iterDepth, 15, 25);

                                var name = '';
                                if (bumpAngle === 60 && sides === 3) name = '(Classic Koch Snowflake)';
                                else if (bumpAngle === 90 && sides === 4) name = '(Quadratic Koch Island)';
                                else name = '(Custom fractal)';
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText(name, 15, 47);
                            }

                            viz.animate(function () { draw(); });
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Design your own fractal! Describe a simple rule that, when applied recursively, would create an interesting self-similar pattern. (You don\'t need to be precise; just describe the idea.)',
                        hint: 'Start with any shape: a square, a star, the letter T. Then decide what to replace each piece with. The replacement should include smaller copies of the original shape.',
                        solution: 'Many answers are possible. Here is one: <em>T-Square Fractal</em>. Start with a solid square. At each corner, attach a square half the size, centered on the corner. Repeat for each new square. After many iterations, you get a shape that looks like a plus sign made of smaller plus signs made of even smaller plus signs. Its fractal dimension is \\(\\log 4 / \\log 2 = 2\\), so it is actually area-filling! Another example: start with a line segment. Replace each segment with a zig-zag: go forward 1/4, turn left 90 degrees, forward 1/4, turn right 90 degrees, forward 1/4, turn right 90 degrees, forward 1/4, turn left 90 degrees, forward 1/4. This gives a variant of the quadratic Koch curve.'
                    },
                    {
                        question: 'In the fractal explorer, set the bump angle to 90&deg; and the base polygon to a square (4 sides). Describe what you see. How does it differ from the Koch snowflake?',
                        hint: 'With 90&deg; bumps on a square, the bumps are square rather than triangular.',
                        solution: 'With 90&deg; bumps on a square base, you get the "quadratic Koch island." Instead of triangular bumps, each segment grows a square bump outward. The result is blockier and more angular than the Koch snowflake, resembling a medieval city wall or a circuit board pattern. It still has infinite perimeter and finite area, but the fractal dimension is different: \\(D = \\log 5 / \\log 3 \\approx 1.465\\) (compared to 1.262 for the standard Koch). The higher dimension reflects the fact that 90&deg; bumps fill more area than 60&deg; bumps.'
                    },
                    {
                        question: 'Summarize the key properties of each classic fractal we studied in this chapter: Koch snowflake, Sierpinski triangle, Sierpinski carpet, and Cantor set. Include the fractal dimension of each.',
                        hint: 'Think about: what is the construction rule? What happens to area/length? What is the fractal dimension?',
                        solution: '<strong>Koch snowflake:</strong> Replace each side with a triangular bump. Infinite perimeter, finite area. \\(D \\approx 1.262\\).<br><strong>Sierpinski triangle:</strong> Remove the central sub-triangle at each level. Zero area remains. \\(D \\approx 1.585\\).<br><strong>Sierpinski carpet:</strong> Remove the central sub-square at each level. Zero area. \\(D \\approx 1.893\\).<br><strong>Cantor set:</strong> Remove the middle third of each interval. Zero length, but uncountably many points. \\(D \\approx 0.631\\).<br>All share the fractal property: self-similarity, non-integer dimension, and infinite complexity from simple recursive rules.'
                    }
                ]
            }
        ]
    });
})();
