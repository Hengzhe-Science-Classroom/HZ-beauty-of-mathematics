// === Chapter 14: Tilings & Penrose Patterns ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'Tilings & Penrose Patterns',
    subtitle: 'From bathroom floors to Nobel Prizes: the surprising mathematics of covering the plane',
    sections: [
        // ========== SECTION 1: Covering the plane ==========
        {
            id: 'sec14-covering',
            title: 'Covering the plane',
            content: `
<h2>14.1 Covering the Plane</h2>

<div class="env-block intuition">
<strong>Look at the floor beneath your feet.</strong> Chances are, it is tiled: a repeating pattern of shapes that fit together perfectly, leaving no gaps and no overlaps. This simple, practical problem, covering a flat surface with shapes, turns out to have deep and surprising mathematics behind it. Questions about tilings have occupied mathematicians from the ancient Greeks to the present day, and the subject keeps producing astonishing discoveries.
</div>

<p>A <strong>tiling</strong> (or <strong>tessellation</strong>) of the plane is a way of covering the entire infinite flat plane with shapes, called <strong>tiles</strong>, such that:</p>
<ul>
<li>Every point of the plane is covered by at least one tile.</li>
<li>No two tiles overlap (except at their boundaries).</li>
</ul>

<p>The most familiar tilings use regular polygons: squares on a bathroom floor, hexagons in a honeycomb, triangles in a geodesic dome. But the subject goes far deeper than simple repeating patterns.</p>

<p>The fundamental question is: <strong>which shapes can tile the plane?</strong> The answer depends enormously on what rules we impose. If we allow any shape at all, the answer is "almost anything" (with enough cleverness). But if we restrict to regular polygons, the answer becomes precise and elegant.</p>

<div class="env-block definition">
<strong>Regular tiling.</strong> A <em>regular tiling</em> (or regular tessellation) is a tiling of the plane by congruent copies of a single regular polygon, meeting edge-to-edge, with the same arrangement at every vertex.
</div>

<p>Which regular polygons can tile the plane by themselves? The answer comes from a simple angle calculation. At each vertex of the tiling, several polygons meet. The angles at each vertex must sum to exactly \\(360^\\circ\\) (a full turn). For a regular \\(n\\)-gon, each interior angle is \\(\\frac{(n-2) \\cdot 180^\\circ}{n}\\).</p>

<p>For \\(k\\) copies of a regular \\(n\\)-gon to meet at a vertex, we need:</p>
\\[
k \\cdot \\frac{(n-2) \\cdot 180^\\circ}{n} = 360^\\circ
\\]

<p>This simplifies to \\(k = \\frac{2n}{n-2}\\). For \\(k\\) to be a positive integer with \\(k \\geq 3\\) (at least three tiles meet at each vertex), the only solutions are:</p>

<table class="data-table" style="margin:16px auto;border-collapse:collapse;text-align:center;color:#c9d1d9;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:6px 14px;">Polygon</th><th style="padding:6px 14px;">\\(n\\)</th><th style="padding:6px 14px;">Interior angle</th><th style="padding:6px 14px;">\\(k\\) at vertex</th></tr>
<tr><td>Equilateral triangle</td><td>3</td><td>\\(60^\\circ\\)</td><td>6</td></tr>
<tr><td>Square</td><td>4</td><td>\\(90^\\circ\\)</td><td>4</td></tr>
<tr><td>Regular hexagon</td><td>6</td><td>\\(120^\\circ\\)</td><td>3</td></tr>
</table>

<div class="env-block theorem">
<strong>Theorem.</strong> There are exactly <strong>three</strong> regular tilings of the plane: by equilateral triangles, by squares, and by regular hexagons.
</div>

<p>This is why you see these three shapes everywhere in floors, walls, and decorative art, and never regular pentagons or octagons by themselves. A regular pentagon has interior angles of \\(108^\\circ\\), and \\(360 / 108 = 3.33...\\), which is not an integer. Pentagons simply cannot fit together without gaps.</p>

<div class="viz-placeholder" data-viz="viz-regular-tilings"></div>

<p>Of the three regular tilings, the hexagonal one is arguably the most efficient. In 1999, Thomas Hales proved the <strong>honeycomb conjecture</strong>: the regular hexagonal tiling is the way to partition the plane into equal areas with the least total perimeter. The bees, it seems, were right all along.</p>
`,
            visualizations: [
                {
                    id: 'viz-regular-tilings',
                    title: 'The Three Regular Tilings',
                    description: 'Select a regular polygon to see how it tiles the plane. Only triangles, squares, and hexagons work!',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var tileType = 'square';
                        var tileSize = 40;

                        function drawRegularPolygon(cx, cy, r, n, rotation, fill, stroke) {
                            ctx.beginPath();
                            for (var i = 0; i <= n; i++) {
                                var angle = rotation + (i * 2 * Math.PI / n);
                                var px = cx + r * Math.cos(angle);
                                var py = cy + r * Math.sin(angle);
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.closePath();
                            if (fill) { ctx.fillStyle = fill; ctx.fill(); }
                            if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); }
                        }

                        function drawTiling() {
                            viz.clear();
                            var s = tileSize;

                            if (tileType === 'triangle') {
                                var h = s * Math.sqrt(3) / 2;
                                var cols = Math.ceil(W / s) + 2;
                                var rows = Math.ceil(H / h) + 2;
                                for (var row = -1; row < rows; row++) {
                                    for (var col = -1; col < cols; col++) {
                                        var x = col * s + (row % 2) * s / 2;
                                        var y = row * h;

                                        // Up triangle
                                        var hue = ((col + row * 7) * 37) % 360;
                                        ctx.beginPath();
                                        ctx.moveTo(x, y + h);
                                        ctx.lineTo(x + s / 2, y);
                                        ctx.lineTo(x + s, y + h);
                                        ctx.closePath();
                                        ctx.fillStyle = VizEngine.hsl(hue, 50, 25);
                                        ctx.fill();
                                        ctx.strokeStyle = viz.colors.blue;
                                        ctx.lineWidth = 1;
                                        ctx.stroke();

                                        // Down triangle
                                        var hue2 = ((col + row * 7 + 3) * 37) % 360;
                                        ctx.beginPath();
                                        ctx.moveTo(x + s / 2, y);
                                        ctx.lineTo(x + s, y + h);
                                        ctx.lineTo(x + s * 1.5, y);
                                        ctx.closePath();
                                        ctx.fillStyle = VizEngine.hsl(hue2, 50, 20);
                                        ctx.fill();
                                        ctx.stroke();
                                    }
                                }
                            } else if (tileType === 'square') {
                                var cols2 = Math.ceil(W / s) + 1;
                                var rows2 = Math.ceil(H / s) + 1;
                                for (var r = 0; r < rows2; r++) {
                                    for (var c2 = 0; c2 < cols2; c2++) {
                                        var hue3 = ((c2 + r * 5) * 47) % 360;
                                        ctx.fillStyle = VizEngine.hsl(hue3, 50, 25);
                                        ctx.fillRect(c2 * s, r * s, s, s);
                                        ctx.strokeStyle = viz.colors.blue;
                                        ctx.lineWidth = 1;
                                        ctx.strokeRect(c2 * s, r * s, s, s);
                                    }
                                }
                            } else if (tileType === 'hexagon') {
                                var hr = s * 0.6;
                                var hh = hr * Math.sqrt(3);
                                var cols3 = Math.ceil(W / (hr * 1.5)) + 2;
                                var rows3 = Math.ceil(H / hh) + 2;
                                for (var r3 = -1; r3 < rows3; r3++) {
                                    for (var c3 = -1; c3 < cols3; c3++) {
                                        var hx = c3 * hr * 1.5;
                                        var hy = r3 * hh + (c3 % 2) * hh / 2;
                                        var hue4 = ((c3 + r3 * 3) * 53) % 360;
                                        drawRegularPolygon(hx, hy, hr, 6, Math.PI / 6, VizEngine.hsl(hue4, 50, 25), viz.colors.blue);
                                    }
                                }
                            }

                            // Label
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(0, 0, W, 35);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var names = { triangle: 'Equilateral Triangles (6 at each vertex)', square: 'Squares (4 at each vertex)', hexagon: 'Regular Hexagons (3 at each vertex)' };
                            ctx.fillText(names[tileType], W / 2, 22);
                        }

                        VizEngine.createButton(controls, 'Triangles', function() { tileType = 'triangle'; drawTiling(); });
                        VizEngine.createButton(controls, 'Squares', function() { tileType = 'square'; drawTiling(); });
                        VizEngine.createButton(controls, 'Hexagons', function() { tileType = 'hexagon'; drawTiling(); });
                        VizEngine.createSlider(controls, 'Tile size:', 20, 80, 40, 5, function(val) { tileSize = val; drawTiling(); });

                        drawTiling();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why can regular pentagons not tile the plane by themselves? Show the calculation.',
                    hint: 'Compute the interior angle of a regular pentagon and check if \\(360^\\circ\\) is divisible by it.',
                    solution: 'A regular pentagon has interior angle \\(\\frac{(5-2) \\times 180^\\circ}{5} = 108^\\circ\\). We need \\(k \\times 108^\\circ = 360^\\circ\\), giving \\(k = 3.33...\\). Since \\(k\\) must be a positive integer, pentagons cannot tile the plane edge-to-edge. Three pentagons leave a \\(36^\\circ\\) gap; four overlap.'
                },
                {
                    question: 'Can you tile the plane with <strong>regular octagons</strong> alone? What about octagons combined with squares?',
                    hint: 'Interior angle of a regular octagon is \\(135^\\circ\\). Check if octagons alone work, then try combining octagons and squares.',
                    solution: 'Octagons alone: \\(360 / 135 = 2.67\\), not an integer. So octagons alone cannot tile. But two octagons (\\(2 \\times 135 = 270^\\circ\\)) plus one square (\\(90^\\circ\\)) gives exactly \\(360^\\circ\\). This is the well-known "octagon-square" tiling, one of the 11 Archimedean (semi-regular) tilings!'
                },
                {
                    question: 'The <strong>Archimedean tilings</strong> use two or more types of regular polygons, with the same arrangement at every vertex. There are exactly 11 of them (including the 3 regular tilings). Can you name or describe at least 2 Archimedean tilings besides the 3 regular ones?',
                    hint: 'Think about tilings you may have seen on floors or walls. Common ones combine squares with triangles, or octagons with squares.',
                    solution: 'Some Archimedean tilings: (1) The <em>snub square</em> tiling (3 triangles and 2 squares at each vertex). (2) The <em>truncated square</em> tiling (2 octagons and 1 square at each vertex, the "bathroom floor" pattern). (3) The <em>trihexagonal</em> tiling (triangles and hexagons alternating, the "Star of David" pattern). (4) The <em>small rhombitrihexagonal</em> tiling (triangles, squares, and hexagons).'
                }
            ]
        },

        // ========== SECTION 2: Regular and semi-regular tilings ==========
        {
            id: 'sec14-semiregular',
            title: 'Regular and semi-regular tilings',
            content: `
<h2>14.2 Regular and Semi-Regular Tilings</h2>

<p>We have seen that there are exactly 3 regular tilings. But what if we allow <em>more than one</em> type of regular polygon, while still requiring the same arrangement at every vertex? These are the <strong>Archimedean tilings</strong> (also called <em>semi-regular</em> or <em>uniform</em> tilings), named after the ancient Greek mathematician Archimedes, who is believed to have studied them over 2000 years ago.</p>

<div class="env-block definition">
<strong>Archimedean tiling.</strong> An <em>Archimedean tiling</em> is an edge-to-edge tiling of the plane by regular polygons such that every vertex has the same arrangement of polygons around it (the same types in the same cyclic order).
</div>

<p>Finding all Archimedean tilings is a satisfying exercise in arithmetic. At each vertex, the angles of the meeting polygons must sum to \\(360^\\circ\\). We need to find all combinations of regular polygons whose angles add up to exactly \\(360^\\circ\\), and then check which combinations actually produce a valid tiling.</p>

<p>The result, known since at least the work of Kepler in 1619:</p>

<div class="env-block theorem">
<strong>Theorem.</strong> There are exactly <strong>11 Archimedean tilings</strong> of the plane (including the 3 regular tilings). The 8 non-regular ones are characterized by their vertex configurations:
<br>(3.3.3.3.6), (3.3.3.4.4), (3.3.4.3.4), (3.4.6.4), (3.6.3.6), (3.12.12), (4.6.12), (4.8.8).
</div>

<p>The notation \\((3.4.6.4)\\) means that, at each vertex, you encounter (in order) a triangle, a square, a hexagon, and a square. Each of these 11 tilings is a gem of geometric design, and you can find many of them in Islamic art, Roman mosaics, and modern architecture.</p>

<div class="viz-placeholder" data-viz="viz-archimedean"></div>

<p>All the tilings we have discussed so far are <strong>periodic</strong>: they have a repeating unit that, when translated, covers the entire plane. You can describe the entire infinite tiling by specifying a single "fundamental domain" and two translation vectors. This periodicity is what makes these tilings practical for floor tiles and wallpapers; a manufacturer only needs to produce one pattern that repeats.</p>

<p>But periodicity is not the only possibility. In the next section, we will encounter tilings that cover the plane perfectly but <em>never repeat</em>.</p>
`,
            visualizations: [
                {
                    id: 'viz-archimedean',
                    title: 'Archimedean Tilings Gallery',
                    description: 'Explore some of the 11 Archimedean (semi-regular) tilings. Each has a different arrangement of regular polygons at every vertex.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var currentTiling = '4.8.8';

                        function poly(cx, cy, r, n, rot, fill, stroke) {
                            ctx.beginPath();
                            for (var i = 0; i <= n; i++) {
                                var a = rot + i * 2 * Math.PI / n;
                                var px = cx + r * Math.cos(a);
                                var py = cy + r * Math.sin(a);
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.closePath();
                            if (fill) { ctx.fillStyle = fill; ctx.fill(); }
                            if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.2; ctx.stroke(); }
                        }

                        function drawTiling488() {
                            // 4.8.8 = truncated square tiling
                            var s = 35;
                            var octR = s / (2 * Math.sin(Math.PI / 8));
                            var sqR = s / Math.sqrt(2);
                            var step = s + s * Math.cos(Math.PI / 4) * 2;

                            for (var row = -2; row < Math.ceil(H / step) + 2; row++) {
                                for (var col = -2; col < Math.ceil(W / step) + 2; col++) {
                                    var ox = col * step;
                                    var oy = row * step;

                                    // Octagon
                                    var hue = ((col + row * 3) * 41) % 360;
                                    poly(ox, oy, octR, 8, Math.PI / 8, VizEngine.hsl(hue, 45, 25), viz.colors.blue);

                                    // Small square in the gap
                                    var sqX = ox + step / 2;
                                    var sqY = oy + step / 2;
                                    poly(sqX, sqY, sqR * 0.65, 4, Math.PI / 4, VizEngine.hsl((hue + 120) % 360, 45, 30), viz.colors.teal);
                                }
                            }
                        }

                        function drawTiling366() {
                            // 3.6.3.6 = trihexagonal tiling (kagome)
                            var s = 30;
                            var hexR = s;
                            var hh = hexR * Math.sqrt(3);

                            for (var row = -2; row < Math.ceil(H / hh) + 2; row++) {
                                for (var col = -2; col < Math.ceil(W / (hexR * 3)) + 2; col++) {
                                    var hx = col * hexR * 3;
                                    var hy = row * hh;
                                    if (col % 2 === 1) hy += hh / 2;

                                    var hue2 = ((col + row * 5) * 47) % 360;
                                    poly(hx, hy, hexR, 6, 0, VizEngine.hsl(hue2, 50, 22), viz.colors.blue);

                                    // Triangles fill the gaps between hexagons
                                    var triR = hexR * 0.58;
                                    for (var t = 0; t < 6; t++) {
                                        var ta = t * Math.PI / 3 + Math.PI / 6;
                                        var tx = hx + hexR * 1.15 * Math.cos(ta);
                                        var ty = hy + hexR * 1.15 * Math.sin(ta);
                                        poly(tx, ty, triR, 3, ta + Math.PI, VizEngine.hsl((hue2 + 180) % 360, 50, 30), viz.colors.teal);
                                    }
                                }
                            }
                        }

                        function drawTiling31212() {
                            // 3.12.12 = truncated hexagonal tiling (simplified)
                            var s = 40;
                            var dodR = s;
                            var step12 = dodR * 2 * Math.cos(Math.PI / 12) * 1.05;

                            for (var row = -2; row < Math.ceil(H / (step12 * 0.87)) + 2; row++) {
                                for (var col = -2; col < Math.ceil(W / step12) + 2; col++) {
                                    var dx = col * step12 + (row % 2) * step12 / 2;
                                    var dy = row * step12 * 0.87;
                                    var hue3 = ((col * 3 + row * 7) * 31) % 360;
                                    poly(dx, dy, dodR, 12, Math.PI / 12, VizEngine.hsl(hue3, 45, 22), viz.colors.blue);
                                }
                            }
                        }

                        function drawCurrent() {
                            viz.clear();
                            if (currentTiling === '4.8.8') drawTiling488();
                            else if (currentTiling === '3.6.3.6') drawTiling366();
                            else if (currentTiling === '3.12.12') drawTiling31212();

                            // Label
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(0, 0, W, 32);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var labels = { '4.8.8': 'Truncated Square (4.8.8): Octagons + Squares', '3.6.3.6': 'Trihexagonal (3.6.3.6): Hexagons + Triangles', '3.12.12': 'Truncated Hexagonal (3.12.12): Dodecagons + Triangles' };
                            ctx.fillText(labels[currentTiling], W / 2, 22);
                        }

                        VizEngine.createButton(controls, '4.8.8', function() { currentTiling = '4.8.8'; drawCurrent(); });
                        VizEngine.createButton(controls, '3.6.3.6', function() { currentTiling = '3.6.3.6'; drawCurrent(); });
                        VizEngine.createButton(controls, '3.12.12', function() { currentTiling = '3.12.12'; drawCurrent(); });

                        drawCurrent();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the vertex configuration (4.8.8) works: show that one square and two octagons at a vertex produce angles summing to \\(360^\\circ\\).',
                    hint: 'Interior angle of a regular \\(n\\)-gon: \\(\\frac{(n-2) \\cdot 180^\\circ}{n}\\).',
                    solution: 'Square: \\(\\frac{(4-2) \\times 180}{4} = 90^\\circ\\). Octagon: \\(\\frac{(8-2) \\times 180}{8} = 135^\\circ\\). Sum: \\(90 + 135 + 135 = 360^\\circ\\). It works!'
                },
                {
                    question: 'Can four equilateral triangles and one regular hexagon meet at a vertex? Check whether (3.3.3.3.6) is a valid vertex configuration.',
                    hint: 'Triangle angle: \\(60^\\circ\\). Hexagon angle: \\(120^\\circ\\).',
                    solution: 'Four triangles: \\(4 \\times 60 = 240^\\circ\\). One hexagon: \\(120^\\circ\\). Sum: \\(240 + 120 = 360^\\circ\\). Yes! This is a valid vertex configuration, corresponding to the <em>snub hexagonal</em> tiling.'
                }
            ]
        },

        // ========== SECTION 3: Penrose tiles ==========
        {
            id: 'sec14-penrose',
            title: 'Penrose tiles \u2014 aperiodic beauty',
            content: `
<h2>14.3 Penrose Tiles: Aperiodic Beauty</h2>

<p>In 1974, the British mathematician and physicist Sir Roger Penrose made a discovery that stunned the mathematical world. He found a set of just <strong>two tiles</strong> that can tile the entire infinite plane, but with a remarkable constraint: <em>the tiling can never be periodic</em>. No matter how you arrange these two shapes, the resulting pattern will never repeat.</p>

<div class="env-block intuition">
<strong>Periodic vs. aperiodic.</strong> A <em>periodic</em> tiling has a repeating unit cell: if you slide the entire pattern by a certain distance in a certain direction, it looks identical. Every wallpaper pattern is periodic. An <em>aperiodic</em> tiling has no such translational symmetry. The pattern goes on forever without ever repeating. Yet it is not random; it is governed by strict local rules.
</div>

<p>Penrose's two tiles are called the <strong>kite</strong> and the <strong>dart</strong>. They are both quadrilaterals derived from a regular pentagon, with angles that are multiples of \\(36^\\circ\\) (one-tenth of a full turn). The kite has angles \\(72^\\circ\\), \\(72^\\circ\\), \\(72^\\circ\\), \\(144^\\circ\\), and the dart has angles \\(36^\\circ\\), \\(72^\\circ\\), \\(36^\\circ\\), \\(216^\\circ\\).</p>

<p>The key to enforcing aperiodicity is a set of <strong>matching rules</strong>: the tiles have colored marks or bumps on their edges that must align when tiles are placed next to each other. Without these rules, the kite and dart can tile the plane periodically. With the rules, periodicity becomes impossible.</p>

<div class="env-block remark">
<strong>The golden ratio strikes again!</strong> Penrose tilings are deeply connected to the golden ratio \\(\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618\\). The ratio of kites to darts in any infinite Penrose tiling is exactly \\(\\phi\\). The tilings also exhibit <strong>five-fold symmetry</strong>, a type of symmetry that is impossible in periodic tilings (by the crystallographic restriction theorem). The golden ratio appears in the tile proportions, the frequency ratios, and the self-similar structure at every scale.
</div>

<div class="viz-placeholder" data-viz="viz-penrose-tiling"></div>

<h3>Self-Similarity and Inflation</h3>

<p>One of the most beautiful properties of Penrose tilings is their <strong>self-similarity</strong>. If you group certain tiles together and rescale, you get the same tiling at a larger scale. This process is called <strong>inflation</strong> (or <strong>substitution</strong>). Each kite can be subdivided into smaller kites and darts, and each dart can also be subdivided. Repeating this process generates an increasingly detailed Penrose tiling.</p>

<p>This self-similarity is reminiscent of fractals (Chapters 7-9), and indeed Penrose tilings have a fractal-like quality: the same patterns appear at every scale, though never in exactly the same arrangement. The tiling is ordered (not random) but never periodic (not repeating). It exists in a fascinating middle ground between order and disorder.</p>
`,
            visualizations: [
                {
                    id: 'viz-penrose-tiling',
                    title: 'Penrose Tiling by Subdivision',
                    description: 'A Penrose tiling generated by the subdivision (inflation) method. Click "Subdivide" to increase the detail level. Each level splits kites and darts into smaller pieces.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var PHI = (1 + Math.sqrt(5)) / 2;
                        var level = 0;

                        // Robinson triangles approach
                        // Two types: "thin" (36-108-36) and "thick" (72-72-36)
                        // Store as [type, ax, ay, bx, by, cx, cy]
                        // type 0 = thick (golden gnomon), type 1 = thin (golden triangle)

                        var triangles = [];

                        function initStar() {
                            triangles = [];
                            var cx2 = W / 2, cy2 = H / 2;
                            var R = Math.min(W, H) * 0.45;

                            // Start with 10 thick triangles forming a decagon
                            for (var i = 0; i < 10; i++) {
                                var a1 = (2 * i - 1) * Math.PI / 10;
                                var a2 = (2 * i + 1) * Math.PI / 10;
                                var bx = cx2 + R * Math.cos(a1);
                                var by = cy2 - R * Math.sin(a1);
                                var ccx = cx2 + R * Math.cos(a2);
                                var ccy = cy2 - R * Math.sin(a2);

                                if (i % 2 === 0) {
                                    triangles.push([0, cx2, cy2, bx, by, ccx, ccy]);
                                } else {
                                    triangles.push([0, cx2, cy2, ccx, ccy, bx, by]);
                                }
                            }
                        }

                        function subdivide() {
                            var newTri = [];
                            for (var i = 0; i < triangles.length; i++) {
                                var t = triangles[i];
                                var type = t[0];
                                var ax = t[1], ay = t[2];
                                var bx = t[3], by = t[4];
                                var ccx = t[5], ccy = t[6];

                                if (type === 0) {
                                    // Thick triangle (golden gnomon) subdivision
                                    // Split point P on edge AC at ratio 1/phi from A
                                    var px = ax + (ccx - ax) / PHI;
                                    var py = ay + (ccy - ay) / PHI;
                                    newTri.push([0, ccx, ccy, px, py, bx, by]);
                                    newTri.push([1, px, py, bx, by, ax, ay]);
                                } else {
                                    // Thin triangle subdivision
                                    var qx = bx + (ax - bx) / PHI;
                                    var qy = by + (ay - by) / PHI;
                                    var rx = bx + (ccx - bx) / PHI;
                                    var ry = by + (ccy - by) / PHI;
                                    newTri.push([1, rx, ry, ccx, ccy, ax, ay]);
                                    newTri.push([1, qx, qy, rx, ry, bx, by]);
                                    newTri.push([0, rx, ry, qx, qy, ax, ay]);
                                }
                            }
                            triangles = newTri;
                            level++;
                        }

                        function draw() {
                            viz.clear();

                            for (var i = 0; i < triangles.length; i++) {
                                var t = triangles[i];
                                var type = t[0];
                                ctx.beginPath();
                                ctx.moveTo(t[1], t[2]);
                                ctx.lineTo(t[3], t[4]);
                                ctx.lineTo(t[5], t[6]);
                                ctx.closePath();

                                if (type === 0) {
                                    // Thick = kite-component
                                    var hue = 210 + (i * 3) % 40;
                                    ctx.fillStyle = VizEngine.hsl(hue, 50, 28);
                                } else {
                                    // Thin = dart-component
                                    var hue2 = 30 + (i * 3) % 40;
                                    ctx.fillStyle = VizEngine.hsl(hue2, 50, 25);
                                }
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.blue + '66';
                                ctx.lineWidth = 0.5;
                                ctx.stroke();
                            }

                            // Info
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(10, 10, 240, 50);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Subdivision level: ' + level, 20, 30);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Triangles: ' + triangles.length + '  (never periodic!)', 20, 50);
                        }

                        VizEngine.createButton(controls, 'Subdivide', function() {
                            if (level < 8) {
                                subdivide();
                                draw();
                            }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            level = 0;
                            initStar();
                            draw();
                        });

                        initStar();
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'In a Penrose tiling, the ratio of kites to darts approaches the golden ratio \\(\\phi \\approx 1.618\\) as the tiling grows. If a region contains 1000 darts, approximately how many kites does it contain?',
                    hint: 'The ratio kites:darts = \\(\\phi\\).',
                    solution: 'Number of kites \\(\\approx \\phi \\times 1000 = 1618\\). The ratio is exactly the golden ratio in the limit, so a large region with 1000 darts will contain approximately 1618 kites.'
                },
                {
                    question: 'Why is five-fold symmetry impossible in a periodic tiling? (This is related to the <em>crystallographic restriction theorem</em>.)',
                    hint: 'Think about which regular polygons tile the plane. None of them have 5-fold symmetry. More precisely, if a tiling has a lattice of translational symmetries, the rotational symmetries are restricted.',
                    solution: 'The crystallographic restriction theorem states that the rotational symmetries of a periodic tiling must be of order 1, 2, 3, 4, or 6. Five-fold (and seven-fold, etc.) rotational symmetry is impossible because a lattice of translations cannot be compatible with 5-fold rotations. The angle \\(72^\\circ = 360^\\circ / 5\\) does not produce integer lattice points. This is why the five-fold symmetry of Penrose tilings was so shocking: it is aperiodic <em>because</em> of its five-fold nature.'
                }
            ]
        },

        // ========== SECTION 4: Quasicrystals ==========
        {
            id: 'sec14-quasicrystals',
            title: 'Quasicrystals \u2014 Penrose in nature',
            content: `
<h2>14.4 Quasicrystals: Penrose in Nature</h2>

<p>For decades after Penrose's discovery in 1974, aperiodic tilings were considered a mathematical curiosity: beautiful but without physical relevance. Every known crystal had a periodic atomic structure. The laws of crystallography, established over two centuries, insisted that crystals must have translational symmetry, and five-fold rotational symmetry was strictly forbidden.</p>

<p>Then, in 1982, Daniel Shechtman looked at an electron diffraction pattern from a rapidly cooled aluminum-manganese alloy and saw something that should have been impossible: <strong>perfect five-fold symmetry</strong>.</p>

<div class="env-block intuition">
<strong>The impossible diffraction pattern.</strong> When X-rays or electrons pass through a crystal, they produce a diffraction pattern: a set of bright spots whose arrangement reveals the crystal's internal symmetry. Periodic crystals produce patterns with 2-fold, 3-fold, 4-fold, or 6-fold symmetry, but never 5-fold. Shechtman's alloy produced sharp, clear diffraction spots with unmistakable 10-fold (icosahedral) symmetry. The scientific community was skeptical, even hostile. Linus Pauling, a two-time Nobel laureate, declared: "There is no such thing as quasicrystals, only quasi-scientists."
</div>

<p>But Shechtman was right. His alloy was a <strong>quasicrystal</strong>: a new form of matter whose atomic arrangement is ordered but not periodic, exactly like a three-dimensional version of a Penrose tiling. The atoms are arranged according to strict local rules, producing long-range order and sharp diffraction spots, but the pattern never repeats.</p>

<div class="viz-placeholder" data-viz="viz-diffraction"></div>

<p>The connection to Penrose tilings is direct. A 3D Penrose-like pattern (called a quasiperiodic structure) can be constructed by projecting a regular lattice from a higher-dimensional space (typically 5D or 6D) down to 3D. The resulting atomic positions have the same kind of aperiodic, self-similar order that Penrose tilings have in 2D.</p>

<p>Shechtman's discovery was confirmed by many independent research groups in the 1980s. Hundreds of quasicrystalline alloys have since been found, including aluminum-palladium-manganese, zinc-magnesium-holmium, and others. In 2009, a natural quasicrystal (icosahedrite) was even discovered in a meteorite from the Khatyrka region of Russia, proving that nature produces quasicrystals without human intervention.</p>

<div class="env-block theorem">
<strong>Nobel Prize in Chemistry, 2011.</strong> Daniel Shechtman was awarded the Nobel Prize in Chemistry "for the discovery of quasicrystals." The prize citation noted that his discovery "fundamentally altered how chemists conceive of solid matter."
</div>

<p>Quasicrystals have remarkable physical properties. They are extremely hard but brittle, have very low friction, are poor conductors of heat and electricity (despite being metallic), and are non-stick (making them useful as coatings for frying pans). Their unique properties arise directly from their aperiodic structure.</p>

<div class="env-block remark">
<strong>From art to nature and back.</strong> Fascinatingly, aperiodic patterns resembling Penrose tilings appear in medieval Islamic art, centuries before Penrose. The Darb-e Imam shrine in Isfahan, Iran (built in 1453) features a tile pattern with near-perfect Penrose-like aperiodic order and local five-fold symmetry. Whether the medieval craftsmen understood the mathematical principles behind their designs remains a subject of scholarly debate.
</div>
`,
            visualizations: [
                {
                    id: 'viz-diffraction',
                    title: 'Quasicrystal Diffraction Pattern',
                    description: 'A simulated diffraction pattern showing the five-fold symmetry characteristic of quasicrystals. Compare with the periodic patterns that show only 2, 3, 4, or 6-fold symmetry.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var patternType = 'quasicrystal';

                        function drawDiffraction() {
                            viz.clear();
                            var cx = W / 2, cy = H / 2;

                            if (patternType === 'quasicrystal') {
                                // 5-fold symmetric diffraction pattern
                                // Generate spots using quasilattice
                                for (var n1 = -10; n1 <= 10; n1++) {
                                    for (var n2 = -10; n2 <= 10; n2++) {
                                        for (var k = 0; k < 5; k++) {
                                            var angle = k * 2 * Math.PI / 5;
                                            var dx = n1 * Math.cos(angle) + n2 * Math.cos(angle + 2 * Math.PI / 5);
                                            var dy = n1 * Math.sin(angle) + n2 * Math.sin(angle + 2 * Math.PI / 5);
                                            var dist = Math.sqrt(dx * dx + dy * dy);
                                            if (dist > 12) continue;

                                            var sx = cx + dx * 18;
                                            var sy = cy + dy * 18;
                                            if (sx < 0 || sx > W || sy < 0 || sy > H) continue;

                                            var intensity = Math.max(0.1, 1 / (1 + dist * 0.5));
                                            var radius = Math.max(1, 4 * intensity);
                                            var alpha = Math.min(1, intensity);

                                            ctx.fillStyle = 'rgba(88,166,255,' + alpha + ')';
                                            ctx.beginPath();
                                            ctx.arc(sx, sy, radius, 0, Math.PI * 2);
                                            ctx.fill();

                                            // Glow
                                            if (intensity > 0.3) {
                                                ctx.fillStyle = 'rgba(88,166,255,' + (alpha * 0.3) + ')';
                                                ctx.beginPath();
                                                ctx.arc(sx, sy, radius * 2.5, 0, Math.PI * 2);
                                                ctx.fill();
                                            }
                                        }
                                    }
                                }
                            } else if (patternType === 'periodic4') {
                                // 4-fold (square lattice)
                                var spacing = 25;
                                for (var qx = -15; qx <= 15; qx++) {
                                    for (var qy = -15; qy <= 15; qy++) {
                                        var dist2 = Math.sqrt(qx * qx + qy * qy);
                                        if (dist2 > 12) continue;
                                        var sx2 = cx + qx * spacing;
                                        var sy2 = cy + qy * spacing;
                                        if (sx2 < 5 || sx2 > W - 5 || sy2 < 5 || sy2 > H - 5) continue;
                                        var int2 = 1 / (1 + dist2 * 0.4);
                                        var r2 = Math.max(1.5, 4 * int2);
                                        ctx.fillStyle = 'rgba(63,185,80,' + Math.min(1, int2) + ')';
                                        ctx.beginPath();
                                        ctx.arc(sx2, sy2, r2, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                }
                            } else if (patternType === 'periodic6') {
                                // 6-fold (hexagonal lattice)
                                var sp6 = 25;
                                for (var h1 = -15; h1 <= 15; h1++) {
                                    for (var h2 = -15; h2 <= 15; h2++) {
                                        var hx = h1 + h2 * 0.5;
                                        var hy = h2 * Math.sqrt(3) / 2;
                                        var dist6 = Math.sqrt(hx * hx + hy * hy);
                                        if (dist6 > 12) continue;
                                        var sx6 = cx + hx * sp6;
                                        var sy6 = cy + hy * sp6;
                                        if (sx6 < 5 || sx6 > W - 5 || sy6 < 5 || sy6 > H - 5) continue;
                                        var int6 = 1 / (1 + dist6 * 0.4);
                                        var r6 = Math.max(1.5, 4 * int6);
                                        ctx.fillStyle = 'rgba(240,136,62,' + Math.min(1, int6) + ')';
                                        ctx.beginPath();
                                        ctx.arc(sx6, sy6, r6, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                }
                            }

                            // Label
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(0, 0, W, 35);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var labels = {
                                quasicrystal: 'Quasicrystal: 5-fold symmetry (impossible for periodic crystals!)',
                                periodic4: 'Periodic Crystal: 4-fold symmetry (square lattice)',
                                periodic6: 'Periodic Crystal: 6-fold symmetry (hexagonal lattice)'
                            };
                            ctx.fillText(labels[patternType], W / 2, 22);
                        }

                        VizEngine.createButton(controls, '5-fold (Quasi)', function() { patternType = 'quasicrystal'; drawDiffraction(); });
                        VizEngine.createButton(controls, '4-fold (Square)', function() { patternType = 'periodic4'; drawDiffraction(); });
                        VizEngine.createButton(controls, '6-fold (Hex)', function() { patternType = 'periodic6'; drawDiffraction(); });

                        drawDiffraction();
                    }
                }
            ],
            exercises: [
                {
                    question: 'The crystallographic restriction theorem says that periodic tilings in 2D can only have rotational symmetries of order 1, 2, 3, 4, or 6. Why is order 5 excluded? Think about what happens if you try to pack regular pentagons.',
                    hint: 'A rotation of order 5 means \\(72^\\circ\\). If a lattice has this rotational symmetry, consider two nearest lattice points and rotate one around the other by \\(72^\\circ\\). Where does it land?',
                    solution: 'If a 2D lattice has 5-fold rotational symmetry, take two nearest-neighbor lattice points A and B. Rotating B around A by \\(72^\\circ\\) produces a new lattice point B\'. The distance from B to B\' is shorter than AB (it is \\(2 \\sin(36^\\circ) \\approx 1.18\\) times... actually closer due to geometry). Repeating the argument generates lattice points that are arbitrarily close together, contradicting the assumption that the lattice is discrete. Therefore, 5-fold symmetry is incompatible with periodicity.'
                },
                {
                    question: 'Quasicrystals can be understood as "slices" or "projections" of regular periodic lattices in higher dimensions (typically 5D or 6D). Why does this make the resulting 3D structure aperiodic?',
                    hint: 'Think about what happens when you take a diagonal slice through a simple 2D square grid. If the slope is irrational, the resulting 1D pattern never repeats.',
                    solution: 'When you project a periodic lattice from a higher dimension onto a lower-dimensional subspace at an irrational angle (related to the golden ratio), the resulting pattern is ordered (because the original lattice is ordered) but never periodic (because the irrational angle means the projection never exactly repeats). This is exactly analogous to how a line with irrational slope through a square lattice hits lattice points in a non-periodic sequence. The golden ratio, being the "most irrational" number, produces the most uniform aperiodic patterns.'
                }
            ]
        },

        // ========== SECTION 5: The einstein tile (2023) ==========
        {
            id: 'sec14-einstein',
            title: 'The einstein tile (2023)',
            content: `
<h2>14.5 The Einstein Tile (2023)</h2>

<p>Penrose showed in 1974 that two tiles can force aperiodicity. But a deeper question lingered: <strong>can a single tile force aperiodicity?</strong> Such a tile would be called an <em>einstein</em>, from the German <em>ein Stein</em> meaning "one stone." For nearly 50 years, this was one of the great open problems in tiling theory.</p>

<div class="env-block intuition">
<strong>The einstein problem.</strong> Find a single shape such that (1) it can tile the entire plane (with copies of itself), but (2) every such tiling is necessarily aperiodic (no translational symmetry). A single tile that forces aperiodicity.
</div>

<p>In March 2023, a retired printing technician and amateur mathematician named <strong>David Smith</strong> from Yorkshire, England, discovered such a tile. Working with mathematicians Craig Kaplan, Joseph Samuel Myers, and Chaim Goodman-Strauss, he proved that a simple 13-sided polygon, which they called the <strong>"hat"</strong>, is an einstein.</p>

<p>The hat tile is remarkably simple. It is made of 8 kite-shaped pieces that fit together in an irregular polygon with 13 sides. It looks somewhat like a fedora hat, hence the name. When you try to tile the plane with copies of the hat (both the original and its mirror image), the only possible tilings are aperiodic.</p>

<div class="viz-placeholder" data-viz="viz-hat-tile"></div>

<p>The mathematical proof that the hat is an einstein has two parts:</p>
<ol>
<li><strong>The hat can tile the plane.</strong> Smith and his collaborators showed a substitution rule (similar to Penrose's inflation) that generates larger and larger hat tilings.</li>
<li><strong>Every hat tiling is aperiodic.</strong> This is the hard part. They proved that any periodic tiling by hats would lead to a contradiction, by showing that the substitution structure forces non-periodic hierarchical organization at every scale.</li>
</ol>

<div class="env-block remark">
<strong>A small caveat and its resolution.</strong> The original hat einstein requires both the tile and its mirror image (reflection). Some mathematicians argued that this makes it a "two-tile" solution in disguise. In May 2023, the same team found an improved tile called the <strong>"spectre"</strong> that tiles the plane aperiodically <em>without</em> using reflections. The spectre is a true "one-tile" aperiodic monotile, settling the einstein problem completely.
</div>

<p>The discovery made international headlines and captured the public imagination. It showed that profound mathematical discoveries are still being made, sometimes by amateur mathematicians with a keen eye for patterns. David Smith found the hat by experimenting with shapes using paper cutouts, long before any computer analysis confirmed its properties.</p>

<div class="env-block example">
<strong>A timeline of aperiodic tiles.</strong>
<ul>
<li><strong>1964</strong>: Robert Berger constructs the first aperiodic tile set: 20,426 tiles.</li>
<li><strong>1971</strong>: Raphael Robinson reduces it to 6 tiles.</li>
<li><strong>1974</strong>: Roger Penrose achieves 2 tiles (kite and dart).</li>
<li><strong>2023</strong>: David Smith, Craig Kaplan, Joseph Myers, and Chaim Goodman-Strauss achieve <strong>1 tile</strong> (the hat/spectre).</li>
</ul>
From 20,426 tiles to 1. Fifty-nine years of mathematical progress.
</div>

<div class="viz-placeholder" data-viz="viz-periodic-vs-aperiodic"></div>

<p>The einstein tile is not just a mathematical trophy. It connects to deep questions about the nature of order and symmetry. Aperiodic structures, from Penrose tilings to quasicrystals to the hat, reveal that order does not require repetition. The universe can be structured without being periodic, and a single humble tile can embody this profound principle.</p>
`,
            visualizations: [
                {
                    id: 'viz-hat-tile',
                    title: 'The Hat Einstein Tile',
                    description: 'The "hat" tile and a small patch showing how copies fit together. This single shape can tile the entire plane, but only aperiodically.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        // The hat tile is built on a kite grid
                        // Approximate hat polygon (13 vertices, based on hex/kite grid)
                        var s = 20; // base scale
                        var sq3 = Math.sqrt(3);

                        // Hat tile vertices (from the original paper, on a hex kite grid)
                        // Normalized coordinates
                        var hatVerts = [
                            [0, 0],
                            [1, 0],
                            [1.5, sq3 / 2],
                            [1, sq3],
                            [1.5, 3 * sq3 / 2],
                            [1, 2 * sq3],
                            [0, 2 * sq3],
                            [-0.5, 3 * sq3 / 2],
                            [-1, 2 * sq3],
                            [-1.5, 3 * sq3 / 2],
                            [-1, sq3],
                            [-1.5, sq3 / 2],
                            [-1, 0]
                        ];

                        function drawHat(cx, cy, scale, rotation, color, strokeColor) {
                            var ca = Math.cos(rotation), sa = Math.sin(rotation);
                            ctx.beginPath();
                            for (var i = 0; i < hatVerts.length; i++) {
                                var vx = hatVerts[i][0] * scale;
                                var vy = hatVerts[i][1] * scale;
                                // Center the shape
                                vx -= 0;
                                vy -= sq3;
                                // Rotate
                                var rx = vx * ca - vy * sa;
                                var ry = vx * sa + vy * ca;
                                if (i === 0) ctx.moveTo(cx + rx, cy + ry);
                                else ctx.lineTo(cx + rx, cy + ry);
                            }
                            ctx.closePath();
                            ctx.fillStyle = color;
                            ctx.fill();
                            ctx.strokeStyle = strokeColor;
                            ctx.lineWidth = 1.5;
                            ctx.stroke();
                        }

                        function draw() {
                            viz.clear();

                            // Draw a single large hat in the center
                            drawHat(W / 2, H / 2, 18, 0, viz.colors.blue + '44', viz.colors.blue);

                            // Draw vertex dots
                            var ca0 = 1, sa0 = 0;
                            for (var i = 0; i < hatVerts.length; i++) {
                                var vx = (hatVerts[i][0]) * 18;
                                var vy = (hatVerts[i][1] - sq3) * 18;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(W / 2 + vx, H / 2 + vy, 3, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Draw a small patch of hats around it
                            var patchColors = [
                                viz.colors.purple + '33',
                                viz.colors.teal + '33',
                                viz.colors.orange + '33',
                                viz.colors.green + '33',
                                viz.colors.pink + '33',
                                viz.colors.gold + '33'
                            ];
                            var patchStrokes = [
                                viz.colors.purple,
                                viz.colors.teal,
                                viz.colors.orange,
                                viz.colors.green,
                                viz.colors.pink,
                                viz.colors.gold
                            ];

                            // Approximate neighbor positions (hand-placed for visual clarity)
                            var neighbors = [
                                { x: 70, y: -40, rot: Math.PI / 3, mirror: false },
                                { x: -70, y: -40, rot: -Math.PI / 3, mirror: true },
                                { x: 80, y: 50, rot: 2 * Math.PI / 3, mirror: false },
                                { x: -80, y: 50, rot: -2 * Math.PI / 3, mirror: true },
                                { x: 0, y: -80, rot: 0, mirror: false },
                                { x: 0, y: 80, rot: Math.PI, mirror: true }
                            ];

                            for (var ni = 0; ni < neighbors.length; ni++) {
                                var n = neighbors[ni];
                                drawHat(W / 2 + n.x, H / 2 + n.y, 12, n.rot,
                                    patchColors[ni % patchColors.length],
                                    patchStrokes[ni % patchStrokes.length]);
                            }

                            // Title and info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('The "Hat" Einstein Tile (2023)', W / 2, 25);

                            ctx.fillStyle = viz.colors.gold;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('13 sides \u2022 1 tile \u2022 aperiodic \u2022 discovered by David Smith', W / 2, 48);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Central tile (large) surrounded by approximate neighbor placements', W / 2, H - 12);
                        }

                        draw();
                    }
                },
                {
                    id: 'viz-periodic-vs-aperiodic',
                    title: 'Periodic vs. Aperiodic Tilings',
                    description: 'Compare a periodic tiling (which repeats) with an aperiodic Penrose tiling (which never repeats). Both cover the plane completely with no gaps.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        function draw() {
                            viz.clear();
                            var halfW = W / 2;

                            // Left: Periodic (square tiling)
                            var s = 30;
                            for (var row = 0; row < Math.ceil(H / s) + 1; row++) {
                                for (var col = 0; col < Math.ceil(halfW / s) + 1; col++) {
                                    var hue = ((col + row * 3) * 47 + 200) % 360;
                                    ctx.fillStyle = VizEngine.hsl(hue, 40, 22);
                                    ctx.fillRect(col * s, row * s, s - 1, s - 1);
                                }
                            }

                            // Right: Aperiodic (Penrose-like using rhombuses)
                            var PHI = (1 + Math.sqrt(5)) / 2;
                            // Generate a set of rhombus tiles based on the multigrid method
                            var offset = halfW + 10;
                            for (var i = 0; i < 5; i++) {
                                var angle = i * Math.PI / 5;
                                var ca = Math.cos(angle), sa = Math.sin(angle);
                                for (var j = -8; j <= 8; j++) {
                                    // Draw grid lines
                                    var baseX = offset + halfW / 2 + j * 20 * ca;
                                    var baseY = H / 2 + j * 20 * sa;
                                    ctx.strokeStyle = VizEngine.hsl(i * 72, 50, 30);
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.moveTo(baseX - 200 * sa, baseY + 200 * ca);
                                    ctx.lineTo(baseX + 200 * sa, baseY - 200 * ca);
                                    ctx.stroke();
                                }
                            }

                            // Overlay decorative Penrose-like patterns
                            for (var pi = 0; pi < 80; pi++) {
                                var px = offset + 20 + Math.random() * (halfW - 50);
                                var py = 20 + Math.random() * (H - 40);
                                var pr = 3 + Math.random() * 5;
                                var ph = (pi * 37) % 360;
                                ctx.fillStyle = VizEngine.hsl(ph, 60, 35) + '88';
                                ctx.beginPath();
                                // Small kite shapes
                                var pa = (pi * 1.1);
                                ctx.moveTo(px, py - pr);
                                ctx.lineTo(px + pr * 0.6, py);
                                ctx.lineTo(px, py + pr * 0.4);
                                ctx.lineTo(px - pr * 0.6, py);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Dividing line
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([5, 5]);
                            ctx.beginPath();
                            ctx.moveTo(halfW, 0);
                            ctx.lineTo(halfW, H);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(0, 0, W, 40);

                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('PERIODIC', halfW / 2, 18);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Repeats by translation', halfW / 2, 34);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('APERIODIC', halfW + halfW / 2, 18);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Ordered but never repeats', halfW + halfW / 2, 34);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'The progression from 20,426 tiles (Berger, 1964) to 1 tile (Smith et al., 2023) took 59 years. Explain in your own words why finding a single aperiodic tile is harder than finding a set of many aperiodic tiles.',
                    hint: 'With many tiles, you have more "degrees of freedom" to force aperiodicity through matching rules. With one tile, the shape itself must somehow encode the impossibility of periodicity.',
                    solution: 'With a large set of tiles, you can design elaborate matching rules (colored edges, bumps and dents) that force aperiodicity. The complexity of the rule system can be distributed across many different tile types. With a single tile, the shape alone must prevent periodic arrangement. The geometry of the single tile must be so cleverly designed that any attempt to repeat a pattern gets "frustrated" at some scale. This is much harder because all the aperiodic-forcing information must be encoded in a single polygon, rather than in the interaction between multiple tile types.'
                },
                {
                    question: 'The spectre tile (the improved version of the hat) tiles without reflections. Why might some mathematicians insist that a "true" einstein should not require reflections?',
                    hint: 'Think about physical tiles: can you physically flip a 3D tile to get its mirror image?',
                    solution: 'If reflections are allowed, then you effectively have two distinct tiles: the original and its mirror image. For a physical (3D) tile with asymmetric features (like a real ceramic tile with a pattern), flipping it over gives a genuinely different object. So requiring both a tile and its reflection could be seen as using "two" tiles. The spectre resolves this by needing only direct copies (translations and rotations), making it a true monotile by any reasonable definition.'
                },
                {
                    question: 'David Smith, who discovered the hat tile, was a retired printing technician, not a professional mathematician. What does this tell us about the nature of mathematical discovery?',
                    hint: 'Think about what tools and abilities were needed: deep pattern recognition, patience, hands-on experimentation with physical shapes.',
                    solution: 'Mathematical discovery does not always require advanced degrees or institutional affiliations. Some problems, especially in combinatorial geometry, are accessible to anyone with strong spatial intuition and persistence. Smith found the hat by physically cutting and arranging paper shapes, a low-tech approach that professional mathematicians (who might have relied more on computer searches) had not tried in the same way. His discovery illustrates that fresh perspectives and dogged experimentation can succeed where existing methods stall. It also shows the power of collaboration: Smith found the shape, and the professional mathematicians (Kaplan, Myers, Goodman-Strauss) provided the rigorous proof.'
                }
            ]
        }
    ]
});
