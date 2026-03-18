// === Chapter 11: Symmetry Everywhere ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch11',
        number: 11,
        title: 'Symmetry Everywhere',
        subtitle: 'The hidden order behind beauty',
        sections: [
            // ===== Section 1: What is symmetry? =====
            {
                id: 'what-is-symmetry',
                title: 'What Is Symmetry?',
                content: '\
<h2>What Is Symmetry?</h2>\
<p>You know symmetry when you see it. A butterfly\'s wings, a snowflake, a human face, the Taj Mahal. Something feels <em>balanced</em>, <em>harmonious</em>, <em>right</em>. But what exactly is symmetry, mathematically?</p>\
\
<p>The answer, which took mathematicians centuries to crystallize, is surprisingly simple and enormously powerful:</p>\
\
<div class="env-block definition">\
<div class="env-title">Symmetry</div>\
<p>A <strong>symmetry</strong> of an object is a transformation that leaves the object looking exactly the same as before. The set of all symmetries of an object forms a mathematical structure called a <strong>group</strong>.</p>\
</div>\
\
<p>This definition is deceptively deep. It shifts the focus from the object itself to the <em>transformations</em> that preserve it. A square, for example, has eight symmetries: four rotations (by 0&deg;, 90&deg;, 180&deg;, 270&deg;) and four reflections (across the horizontal, vertical, and two diagonal axes). A circle has infinitely many: you can rotate it by any angle, or reflect it across any diameter.</p>\
\
<p>The key insight is that symmetries compose. If you rotate a square by 90&deg; and then by another 90&deg;, you get a 180&deg; rotation, which is also a symmetry. This composition operation makes the set of symmetries into a <strong>group</strong>, one of the most fundamental structures in all of mathematics.</p>\
\
<div class="env-block intuition">\
<div class="env-title">Intuition: symmetry as "invisibility of change"</div>\
<p>Imagine someone rearranges the furniture in your room while you are away. A symmetry is a rearrangement so perfect that when you return, you cannot tell anything was moved. The more symmetries an object has, the more ways it can be rearranged while looking identical, and the more "symmetric" we perceive it to be.</p>\
</div>\
\
<p>The mathematician <strong>Hermann Weyl</strong>, in his classic book <em>Symmetry</em> (1952), wrote: "Symmetry, as wide or as narrow as you may define its meaning, is one idea by which man through the ages has tried to comprehend and create order, beauty, and perfection." Weyl was one of the first to recognize that symmetry is not just an aesthetic quality but a organizing principle of nature itself.</p>\
\
<p>In physics, symmetry plays an even more fundamental role. <strong>Emmy Noether\'s theorem</strong> (1918), one of the most beautiful results in theoretical physics, shows that every symmetry of the laws of physics corresponds to a conservation law:</p>\
<ul>\
<li>The laws of physics are the same at every point in space (translational symmetry) &rarr; conservation of momentum</li>\
<li>The laws of physics are the same at every moment in time (temporal symmetry) &rarr; conservation of energy</li>\
<li>The laws of physics are the same in every direction (rotational symmetry) &rarr; conservation of angular momentum</li>\
</ul>\
\
<p>Symmetry is not decoration. It is the deepest structural principle we know.</p>\
\
<div class="viz-placeholder" data-viz="symmetry-explorer"></div>\
\
<p>The visualization above lets you explore the symmetries of regular polygons. Drag the slider to change the number of sides and see how the symmetry group grows. Each polygon with \\(n\\) sides has \\(2n\\) symmetries: \\(n\\) rotations and \\(n\\) reflections. This is called the <strong>dihedral group</strong> \\(D_n\\).</p>',

                visualizations: [
                    {
                        id: 'symmetry-explorer',
                        title: 'Symmetries of Regular Polygons',
                        description: 'Choose the number of sides. Click buttons to apply rotation or reflection symmetries. The colored vertices help you track the transformation.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 80 });
                            viz.originX = viz.width / 2;
                            viz.originY = viz.height / 2;

                            var n = 6;
                            var currentRotation = 0; // in multiples of 2pi/n
                            var reflected = false;

                            var vertexColors = [
                                '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff',
                                '#9b59b6', '#e67e22', '#1abc9c', '#e74c3c',
                                '#3498db', '#2ecc71', '#f39c12', '#9b59b6'
                            ];

                            function draw() {
                                viz.clear();

                                var ctx = viz.ctx;
                                var R = 2;

                                // Draw reflection axes
                                ctx.setLineDash([4, 4]);
                                ctx.strokeStyle = viz.colors.text + '33';
                                ctx.lineWidth = 0.5;
                                for (var i = 0; i < n; i++) {
                                    var angle = 2 * Math.PI * i / n / 2 - Math.PI / 2;
                                    if (n % 2 === 0) angle = Math.PI * i / n - Math.PI / 2;
                                    var ax = R * 1.3 * Math.cos(angle);
                                    var ay = R * 1.3 * Math.sin(angle);
                                    viz.drawSegment(-ax, -ay, ax, ay, viz.colors.text + '33', 0.5, true);
                                }
                                ctx.setLineDash([]);

                                // Compute vertices with current transformation
                                var vertices = [];
                                var labels = [];
                                for (var i = 0; i < n; i++) {
                                    var idx = i;
                                    if (reflected) idx = (n - i) % n;
                                    idx = (idx + currentRotation) % n;
                                    var angle = 2 * Math.PI * i / n - Math.PI / 2;
                                    var vx = R * Math.cos(angle);
                                    var vy = R * Math.sin(angle);
                                    vertices.push([vx, vy]);
                                    labels.push(idx);
                                }

                                // Draw polygon fill
                                ctx.fillStyle = viz.colors.blue + '11';
                                ctx.beginPath();
                                for (var i = 0; i < n; i++) {
                                    var s = viz.toScreen(vertices[i][0], vertices[i][1]);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.closePath();
                                ctx.fill();

                                // Draw edges
                                for (var i = 0; i < n; i++) {
                                    var next = (i + 1) % n;
                                    viz.drawSegment(vertices[i][0], vertices[i][1], vertices[next][0], vertices[next][1], viz.colors.white + 'aa', 2);
                                }

                                // Draw vertices with colors
                                for (var i = 0; i < n; i++) {
                                    var col = vertexColors[labels[i] % vertexColors.length];
                                    var s = viz.toScreen(vertices[i][0], vertices[i][1]);
                                    ctx.fillStyle = col;
                                    ctx.beginPath(); ctx.arc(s[0], s[1], 10, 0, Math.PI * 2); ctx.fill();
                                    ctx.fillStyle = '#fff'; ctx.font = 'bold 11px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(labels[i] + 1, s[0], s[1]);
                                }

                                // Info
                                var rotDeg = Math.round(currentRotation * 360 / n);
                                var info = 'Rotation: ' + rotDeg + '\u00B0' + (reflected ? '  + Reflection' : '');
                                viz.screenText(info, viz.width / 2, 20, viz.colors.white, 13, 'center', 'top');
                                viz.screenText(n + '-gon: ' + (2 * n) + ' symmetries (D\u2099 with n=' + n + ')', viz.width / 2, viz.height - 12, viz.colors.text, 11, 'center', 'bottom');
                            }

                            draw();

                            VizEngine.createSlider(controls, 'Sides', 3, 12, n, 1, function (v) {
                                n = Math.round(v);
                                currentRotation = 0;
                                reflected = false;
                                draw();
                            });

                            VizEngine.createButton(controls, 'Rotate', function () {
                                currentRotation = (currentRotation + 1) % n;
                                draw();
                            });

                            VizEngine.createButton(controls, 'Reflect', function () {
                                reflected = !reflected;
                                draw();
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                currentRotation = 0;
                                reflected = false;
                                draw();
                            });

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'List all the symmetries of an equilateral triangle. How many are there?',
                        hint: 'An equilateral triangle has rotational symmetries (including the identity) and reflection symmetries.',
                        solution: 'The equilateral triangle has 6 symmetries: (1) the identity (do nothing), (2) rotation by 120&deg;, (3) rotation by 240&deg;, (4) reflection across the axis through vertex 1, (5) reflection across the axis through vertex 2, (6) reflection across the axis through vertex 3. This is the dihedral group \\(D_3\\), which has \\(2 \\times 3 = 6\\) elements.'
                    },
                    {
                        question: 'A circle has infinitely many symmetries. Can you describe them all?',
                        hint: 'Think about rotations by any angle and reflections across any diameter.',
                        solution: 'A circle has two families of symmetries: (1) rotation by any angle \\(\\theta \\in [0, 2\\pi)\\), giving a continuous infinity of rotational symmetries, and (2) reflection across any line through the center (any diameter), giving another continuous infinity of reflections. Together, these form the group \\(O(2)\\), the orthogonal group in 2 dimensions.'
                    },
                    {
                        question: 'Consider the letter "S". Does it have any symmetry? What about the letter "A"?',
                        hint: 'Think about what transformations leave each letter looking the same.',
                        solution: '"S" has a 180&deg; rotational symmetry (rotate it half a turn and it looks the same) but no reflection symmetry. "A" has one reflection symmetry (across the vertical axis through its peak) but no non-trivial rotational symmetry. The letter "H" has more: both a vertical reflection, a horizontal reflection, and a 180&deg; rotation. The letter "O" (if perfectly circular) has all the symmetries of a circle.'
                    }
                ]
            },

            // ===== Section 2: Reflections and rotations =====
            {
                id: 'reflections-rotations',
                title: 'Reflections and Rotations',
                content: '\
<h2>Reflections and Rotations</h2>\
<p>The two most basic kinds of symmetry are <strong>reflections</strong> and <strong>rotations</strong>. Let us understand each one and see how they interact.</p>\
\
<p>A <strong>reflection</strong> maps every point to its mirror image across some line (in 2D) or plane (in 3D). Your left hand reflected in a mirror becomes a right hand. The line of reflection is the "mirror."</p>\
\
<p>A <strong>rotation</strong> spins every point around a fixed center by some angle. A clock hand rotates around the center of the clock. The key parameter is the angle of rotation.</p>\
\
<div class="env-block theorem">\
<div class="env-title">Fundamental fact about reflections</div>\
<p>Every rotation can be written as the composition of two reflections. If you reflect across line \\(\\ell_1\\) and then across line \\(\\ell_2\\), the result is a rotation by twice the angle between \\(\\ell_1\\) and \\(\\ell_2\\), centered at their intersection point.</p>\
</div>\
\
<p>This is a stunning result. It means that reflections are the "atoms" of symmetry: every symmetry in the plane can be built from reflections. Rotations are built from two reflections; translations (shifts) are built from two reflections across parallel lines; and glide reflections (the fourth type of planar symmetry) are built from three reflections.</p>\
\
<p>The interaction between reflections and rotations is captured by the <strong>dihedral group</strong> \\(D_n\\), the symmetry group of a regular \\(n\\)-gon. This group has a beautiful structure:</p>\
\
<div class="env-block definition">\
<div class="env-title">The Dihedral Group \\(D_n\\)</div>\
<p>The dihedral group \\(D_n\\) consists of \\(n\\) rotations (by \\(0, 2\\pi/n, 4\\pi/n, \\ldots, 2\\pi(n-1)/n\\)) and \\(n\\) reflections. It has \\(2n\\) elements in total.</p>\
<p>Key relations: if \\(r\\) denotes rotation by \\(2\\pi/n\\) and \\(s\\) denotes any reflection, then \\(r^n = e\\) (identity), \\(s^2 = e\\), and \\(srs = r^{-1}\\) (reflecting reverses the direction of rotation).</p>\
</div>\
\
<p>The relation \\(srs = r^{-1}\\) is the heart of the dihedral group. It says: if you reflect, then rotate, then reflect again, the net effect is a rotation in the <em>opposite</em> direction. This is why, in a mirror, clocks appear to run backwards. The mirror reverses the "handedness" of rotation.</p>\
\
<div class="viz-placeholder" data-viz="symmetry-drawer"></div>\
\
<p>The interactive drawing tool above lets you create patterns with different symmetry types. Draw a shape in one sector, and watch it get reflected and rotated to fill the entire pattern. This is exactly how nature creates symmetric objects: one local template, repeated by the symmetry group.</p>\
\
<div class="env-block example">\
<div class="env-title">Example: the symmetry of a starfish</div>\
<p>A starfish (sea star) typically has five arms, giving it the symmetry group \\(D_5\\): five rotational symmetries (0&deg;, 72&deg;, 144&deg;, 216&deg;, 288&deg;) and five reflections (one through each arm). This five-fold symmetry is common in the animal kingdom (echinoderms) but almost completely absent in crystals, where only 2-fold, 3-fold, 4-fold, and 6-fold symmetries are possible. This is the famous <strong>crystallographic restriction</strong>.</p>\
</div>\
\
<p>Why can\'t crystals have 5-fold symmetry? Because pentagons cannot tile the plane without gaps. You can fit squares (4-fold) or hexagons (6-fold) together perfectly, but pentagons always leave gaps or overlaps. Since a crystal is built by repeating a unit cell to fill space, only symmetries compatible with tiling are allowed. This restriction was considered an absolute law of crystallography until 1984, when Dan Shechtman discovered <strong>quasicrystals</strong>, materials with five-fold symmetry that fill space without a periodic repeating pattern (like Penrose tilings, which we will meet in Chapter 14).</p>',

                visualizations: [
                    {
                        id: 'symmetry-drawer',
                        title: 'Interactive Symmetry Drawer',
                        description: 'Draw in the highlighted sector. Your strokes are automatically reflected and rotated to create a symmetric pattern.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1 });
                            viz.originX = viz.width / 2;
                            viz.originY = viz.height / 2;
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = viz.height / 2;
                            var R = Math.min(cx, cy) - 20;

                            var nFold = 6;
                            var includeReflection = true;
                            var strokes = []; // array of {points: [{x,y},...], color}
                            var currentStroke = null;
                            var drawing = false;

                            var hue = 200;

                            function drawPattern() {
                                viz.clear();

                                // Draw sector guides
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                for (var i = 0; i < nFold; i++) {
                                    var angle = 2 * Math.PI * i / nFold - Math.PI / 2;
                                    ctx.beginPath();
                                    ctx.moveTo(cx, cy);
                                    ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
                                    ctx.stroke();
                                }

                                // Highlight primary sector
                                ctx.fillStyle = viz.colors.blue + '0a';
                                ctx.beginPath();
                                ctx.moveTo(cx, cy);
                                var a0 = -Math.PI / 2;
                                var a1 = a0 + 2 * Math.PI / nFold;
                                ctx.arc(cx, cy, R, a0, a1);
                                ctx.closePath();
                                ctx.fill();

                                // Draw outer circle
                                ctx.strokeStyle = viz.colors.axis + '44';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(cx, cy, R, 0, Math.PI * 2);
                                ctx.stroke();

                                // Draw all strokes with symmetry applied
                                var allStrokes = strokes.slice();
                                if (currentStroke) allStrokes.push(currentStroke);

                                for (var si = 0; si < allStrokes.length; si++) {
                                    var stroke = allStrokes[si];
                                    if (stroke.points.length < 2) continue;

                                    ctx.lineWidth = 2.5;
                                    ctx.lineCap = 'round';
                                    ctx.lineJoin = 'round';

                                    var totalTransforms = includeReflection ? nFold * 2 : nFold;
                                    for (var t = 0; t < totalTransforms; t++) {
                                        var rotIdx = t % nFold;
                                        var doReflect = t >= nFold;
                                        var angle = 2 * Math.PI * rotIdx / nFold;

                                        var h = (parseFloat(stroke.color) + rotIdx * 30) % 360;
                                        ctx.strokeStyle = VizEngine.hsl(h, 75, 55);
                                        ctx.beginPath();

                                        for (var p = 0; p < stroke.points.length; p++) {
                                            var dx = stroke.points[p].x - cx;
                                            var dy = stroke.points[p].y - cy;

                                            if (doReflect) {
                                                // Reflect across the x-axis (relative to center)
                                                dy = -dy;
                                            }

                                            // Rotate
                                            var rx = dx * Math.cos(angle) - dy * Math.sin(angle);
                                            var ry = dx * Math.sin(angle) + dy * Math.cos(angle);

                                            if (p === 0) ctx.moveTo(cx + rx, cy + ry);
                                            else ctx.lineTo(cx + rx, cy + ry);
                                        }
                                        ctx.stroke();
                                    }
                                }
                            }

                            drawPattern();

                            // Drawing handlers
                            function getXY(e) {
                                var rect = viz.canvas.getBoundingClientRect();
                                return {
                                    x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
                                    y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
                                };
                            }

                            function startDraw(e) {
                                drawing = true;
                                var p = getXY(e);
                                hue = (hue + 40) % 360;
                                currentStroke = { points: [p], color: String(hue) };
                                e.preventDefault();
                            }
                            function moveDraw(e) {
                                if (!drawing || !currentStroke) return;
                                var p = getXY(e);
                                currentStroke.points.push(p);
                                drawPattern();
                                e.preventDefault();
                            }
                            function endDraw(e) {
                                if (currentStroke && currentStroke.points.length > 1) {
                                    strokes.push(currentStroke);
                                }
                                currentStroke = null;
                                drawing = false;
                                drawPattern();
                            }

                            viz.canvas.addEventListener('mousedown', startDraw);
                            viz.canvas.addEventListener('mousemove', moveDraw);
                            viz.canvas.addEventListener('mouseup', endDraw);
                            viz.canvas.addEventListener('mouseleave', endDraw);
                            viz.canvas.addEventListener('touchstart', startDraw, { passive: false });
                            viz.canvas.addEventListener('touchmove', moveDraw, { passive: false });
                            viz.canvas.addEventListener('touchend', endDraw);

                            VizEngine.createSlider(controls, 'Fold', 2, 12, nFold, 1, function (v) {
                                nFold = Math.round(v);
                                drawPattern();
                            });

                            VizEngine.createButton(controls, 'Toggle Reflection', function () {
                                includeReflection = !includeReflection;
                                drawPattern();
                            });

                            VizEngine.createButton(controls, 'Clear', function () {
                                strokes = [];
                                currentStroke = null;
                                drawPattern();
                            });

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'If you compose a reflection with itself, what do you get? What about composing a 120&deg; rotation with itself three times?',
                        hint: 'Reflecting twice returns everything to its original position. Rotating 120&deg; three times is 360&deg;.',
                        solution: 'Reflecting twice gives the identity (everything back in place): \\(s^2 = e\\). Rotating 120&deg; three times gives \\(360&deg; = 0&deg;\\), also the identity: \\(r^3 = e\\). These are the defining relations of the dihedral group \\(D_3\\).'
                    },
                    {
                        question: 'Use the symmetry drawer to create a pattern with 5-fold symmetry (reflection on). Then switch to 6-fold. Which one could tile a bathroom floor? Why?',
                        hint: 'Think about which regular polygons can tile the plane without gaps.',
                        solution: 'The 6-fold pattern could tile a floor because regular hexagons tile the plane perfectly (each interior angle is 120&deg;, and three hexagons meet at each vertex: \\(3 \\times 120&deg; = 360&deg;\\)). The 5-fold pattern cannot tile periodically because regular pentagons have interior angles of 108&deg;, and no integer number of 108&deg; angles sum to 360&deg;. This is the crystallographic restriction in action.'
                    }
                ]
            },

            // ===== Section 3: Symmetry in nature =====
            {
                id: 'symmetry-nature',
                title: 'Symmetry in Nature',
                content: '\
<h2>Symmetry in Nature</h2>\
<p>Nature is saturated with symmetry, and the reasons are as varied as the organisms and phenomena that display it.</p>\
\
<p><strong>Bilateral symmetry (mirror symmetry).</strong> Most animals, including humans, have bilateral symmetry: left and right halves are mirror images. This is not an accident. Animals that move through their environment need to be equally capable of turning left or right, so evolutionary pressure favors a body plan that treats both sides equally. A lopsided cheetah would run in circles.</p>\
\
<p><strong>Radial symmetry.</strong> Organisms that do not move in a preferred direction, like jellyfish, sea anemones, and flowers, often have radial symmetry. A daisy does not need to distinguish "left" from "right"; it faces the sun from all directions equally. The number of petals often reflects the organism\'s developmental genetics: lilies have three petals (3-fold symmetry), buttercups have five (5-fold), daisies can have 13, 21, or 34 (Fibonacci numbers!).</p>\
\
<p><strong>Snowflakes and six-fold symmetry.</strong> Every snowflake has six-fold symmetry (\\(D_6\\)), and no two are exactly alike. The six-fold pattern comes from the hexagonal crystal structure of ice: water molecules bond at angles of 120&deg;, forming hexagonal rings. As the crystal grows, each arm develops independently, shaped by the slightly different temperatures and humidity it encounters. But since all six arms grow from the same core and experience nearly the same large-scale conditions, they end up nearly identical. The snowflake is a beautiful compromise between the deterministic symmetry of its crystal structure and the chaotic randomness of its growth environment.</p>\
\
<div class="viz-placeholder" data-viz="snowflake-generator"></div>\
\
<p>The snowflake generator above creates random snowflakes with perfect 6-fold symmetry. Each time you click "Generate," a new random branching pattern is created in one sector and then replicated six times. Notice how each snowflake is unique yet unmistakably hexagonal.</p>\
\
<p><strong>Crystals.</strong> The symmetries of crystals are among the most constrained in nature. A crystal is a regular lattice of atoms, and its symmetries must be compatible with this lattice structure. This leads to the <strong>crystallographic restriction</strong>: in 2D, only 2-fold, 3-fold, 4-fold, and 6-fold rotational symmetries are possible. In 3D, the same restriction holds (with some additional subtleties), giving rise to exactly <strong>32 crystallographic point groups</strong> and <strong>230 space groups</strong>. Every crystal that has ever existed or will ever exist belongs to one of these 230 categories.</p>\
\
<div class="env-block remark">\
<div class="env-title">Why no 5-fold crystals?</div>\
<p>The proof is elegant. Suppose a lattice has a 5-fold rotation. Take two lattice points separated by the smallest possible distance \\(d\\). Rotating one point around the other by \\(72&deg;\\) produces a new lattice point. Rotating the second point around the first by \\(-72&deg;\\) produces another. The distance between these two new points turns out to be \\(d(2\\cos 72&deg; - 1) = d(2 \\times 0.309 - 1) \\approx -0.382d\\). A negative distance is nonsensical, and the magnitude \\(0.382d &lt; d\\) contradicts our assumption that \\(d\\) was the smallest lattice spacing. Contradiction. Five-fold rotational symmetry is impossible in a periodic lattice.</p>\
</div>\
\
<p><strong>Spirals and approximate symmetry.</strong> Not all natural symmetry is exact. Sunflower seed heads, nautilus shells, and hurricanes display <em>approximate</em> rotational symmetry and spiral structure. These are governed by optimization principles: sunflower seeds pack most efficiently in Fibonacci spirals, and hurricanes are shaped by the Coriolis force and conservation of angular momentum. The symmetry is not exact, but it is unmistakable.</p>\
\
<p>The ubiquity of symmetry in nature comes from a few deep sources: physical laws that are themselves symmetric (Noether\'s theorem), evolutionary pressures that favor balanced body plans, and mathematical constraints on how structures can fill space. Symmetry is not imposed from outside; it emerges inevitably from the underlying rules.</p>',

                visualizations: [
                    {
                        id: 'snowflake-generator',
                        title: 'Snowflake Generator',
                        description: 'Click "Generate" to create a unique snowflake with 6-fold symmetry. Each one is different!',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1 });
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = viz.height / 2;
                            var maxR = Math.min(cx, cy) - 30;

                            function generateSnowflake() {
                                viz.clear();

                                // Draw background faint circle
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
                                ctx.stroke();

                                // Generate a random branching pattern in one sector (0 to 60 degrees)
                                var branches = [];
                                var nBranches = 4 + Math.floor(Math.random() * 5); // 4-8 main branches on each arm

                                // Main arm
                                var armLength = maxR * (0.7 + Math.random() * 0.25);
                                var armWidth = 2 + Math.random() * 2;

                                // Generate branch points along the main arm
                                for (var b = 0; b < nBranches; b++) {
                                    var dist = armLength * (0.2 + 0.7 * b / nBranches);
                                    var branchLen = (armLength - dist) * (0.3 + Math.random() * 0.5);
                                    var branchAngle = 0.3 + Math.random() * 0.7; // angle from main arm
                                    branches.push({ dist: dist, len: branchLen, angle: branchAngle, width: 1 + Math.random() * 1.5 });
                                    // Sub-branches
                                    if (Math.random() > 0.4) {
                                        var subDist = dist + branchLen * 0.5;
                                        var subLen = branchLen * (0.2 + Math.random() * 0.3);
                                        branches.push({ dist: subDist, len: subLen, angle: branchAngle * 0.8, width: 0.5 + Math.random(), isSub: true, parentDist: dist, parentLen: branchLen, parentAngle: branchAngle });
                                    }
                                }

                                // Hexagonal plate details
                                var hasPlate = Math.random() > 0.5;
                                var plateR = armLength * (0.1 + Math.random() * 0.15);

                                // Draw with 6-fold symmetry (+ reflections = 12 total)
                                for (var fold = 0; fold < 6; fold++) {
                                    var baseAngle = fold * Math.PI / 3 - Math.PI / 2;

                                    for (var mirror = 0; mirror < 2; mirror++) {
                                        var sign = mirror === 0 ? 1 : -1;

                                        // Main arm
                                        var endX = cx + armLength * Math.cos(baseAngle);
                                        var endY = cy + armLength * Math.sin(baseAngle);

                                        var hue = 200 + fold * 5;
                                        ctx.strokeStyle = VizEngine.hsl(hue, 60, 70);
                                        ctx.lineWidth = armWidth;
                                        ctx.lineCap = 'round';
                                        ctx.beginPath();
                                        ctx.moveTo(cx, cy);
                                        ctx.lineTo(endX, endY);
                                        ctx.stroke();

                                        // Branches
                                        for (var b = 0; b < branches.length; b++) {
                                            var br = branches[b];
                                            // Position on main arm
                                            var bx = cx + br.dist * Math.cos(baseAngle);
                                            var by = cy + br.dist * Math.sin(baseAngle);

                                            if (br.isSub) {
                                                // Sub-branch: positioned on parent branch
                                                var pAngle = baseAngle + sign * br.parentAngle;
                                                bx = cx + br.parentDist * Math.cos(baseAngle) + br.parentLen * 0.5 * Math.cos(pAngle);
                                                by = cy + br.parentDist * Math.sin(baseAngle) + br.parentLen * 0.5 * Math.sin(pAngle);
                                            }

                                            var brAngle = baseAngle + sign * br.angle;
                                            var brEndX = bx + br.len * Math.cos(brAngle);
                                            var brEndY = by + br.len * Math.sin(brAngle);

                                            ctx.strokeStyle = VizEngine.hsl(hue + 20, 50, 65);
                                            ctx.lineWidth = br.width;
                                            ctx.beginPath();
                                            ctx.moveTo(bx, by);
                                            ctx.lineTo(brEndX, brEndY);
                                            ctx.stroke();
                                        }
                                    }
                                }

                                // Center hexagonal plate
                                if (hasPlate) {
                                    ctx.strokeStyle = VizEngine.hsl(210, 50, 60);
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    for (var i = 0; i <= 6; i++) {
                                        var a = i * Math.PI / 3 - Math.PI / 2;
                                        var px = cx + plateR * Math.cos(a);
                                        var py = cy + plateR * Math.sin(a);
                                        if (i === 0) ctx.moveTo(px, py);
                                        else ctx.lineTo(px, py);
                                    }
                                    ctx.stroke();
                                }

                                // Center dot
                                ctx.fillStyle = VizEngine.hsl(200, 60, 80);
                                ctx.beginPath();
                                ctx.arc(cx, cy, 3, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            generateSnowflake();

                            VizEngine.createButton(controls, 'Generate', generateSnowflake);

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why do most animals have bilateral (mirror) symmetry, while many plants and fungi have radial symmetry?',
                        hint: 'Think about movement: animals typically have a "front" and a "back," while a tree or mushroom does not.',
                        solution: 'Animals that move through their environment need to distinguish "front" (where they are going) from "back" (where they came from), which breaks radial symmetry. But they have no reason to favor left over right, so bilateral symmetry is preserved. Plants and fungi are typically rooted in place and receive resources (light, rain) from all directions equally, so radial symmetry (or no particular symmetry) is more natural for them.'
                    },
                    {
                        question: 'A benzene molecule (\\(C_6H_6\\)) is a hexagonal ring of 6 carbon atoms. What is its symmetry group?',
                        hint: 'Consider both rotations around the center and reflections. Also consider that the molecule is planar.',
                        solution: 'In 2D (restricting to the plane of the ring), benzene has the symmetry group \\(D_6\\): 6 rotations (0&deg;, 60&deg;, 120&deg;, 180&deg;, 240&deg;, 300&deg;) and 6 reflections, for a total of 12 symmetries. In 3D, it has additional symmetries including reflection through the plane of the ring, giving the full point group \\(D_{6h}\\) with 24 elements.'
                    }
                ]
            },

            // ===== Section 4: Wallpaper groups (a taste) =====
            {
                id: 'wallpaper-groups',
                title: 'Wallpaper Groups: A Taste',
                content: '\
<h2>Wallpaper Groups: A Taste</h2>\
<p>Imagine you are a medieval artisan tasked with covering a wall with a repeating decorative pattern. You can use tiles, paint, or mosaic, but the pattern must repeat endlessly in two directions to fill the entire wall. How many fundamentally different types of repeating patterns are possible?</p>\
\
<p>The answer, proved by the Russian crystallographer Evgraf Fedorov in 1891, is exactly <strong>17</strong>.</p>\
\
<div class="env-block theorem">\
<div class="env-title">The Classification of Wallpaper Groups</div>\
<p>There are exactly 17 distinct symmetry groups for patterns that repeat periodically in two directions in the plane. These are called the <strong>wallpaper groups</strong> (or plane crystallographic groups).</p>\
</div>\
\
<p>This is a remarkable result. No matter how creative the artist, no matter how intricate the design, the underlying symmetry type must be one of these 17. Each one combines translational symmetry (the pattern repeats) with some selection of rotational symmetries (2-, 3-, 4-, or 6-fold), reflections, and glide reflections (a reflection combined with a half-period translation).</p>\
\
<p>The 17 wallpaper groups are typically labeled with names like <strong>p1</strong> (only translations, no other symmetry), <strong>pm</strong> (translations plus one reflection), <strong>p4m</strong> (translations, 4-fold rotation, and reflections), and <strong>p6m</strong> (the most symmetric, with 6-fold rotation and reflections). The notation encodes the symmetries: the number indicates the highest rotational symmetry, and letters indicate the presence of mirrors (m), glide reflections (g), or both.</p>\
\
<p>What makes this classification extraordinary is that it was discovered simultaneously in mathematics and in art. Long before Fedorov proved his theorem, the Islamic artists who decorated the <strong>Alhambra palace</strong> in Granada, Spain (13th-14th century) had already created examples of all 17 wallpaper groups. The Alhambra is, in effect, a proof by exhibition that all 17 types exist, made 500 years before the mathematics was formalized.</p>\
\
<div class="env-block intuition">\
<div class="env-title">Intuition: why exactly 17?</div>\
<p>The constraint is the crystallographic restriction: rotational symmetry compatible with a 2D lattice can only be 1-fold, 2-fold, 3-fold, 4-fold, or 6-fold. For each rotational symmetry, there are a limited number of ways to add reflections and glide reflections while maintaining lattice compatibility. Enumerating all possibilities, eliminating duplicates (groups that look different but are mathematically equivalent), gives exactly 17.</p>\
</div>\
\
<div class="viz-placeholder" data-viz="wallpaper-patterns"></div>\
\
<p>Some notable wallpaper groups:</p>\
<ul>\
<li><strong>p1</strong>: The simplest. Only translations, no rotational or reflective symmetry at all. Like a field of identical parallelograms.</li>\
<li><strong>p6m</strong>: The most symmetric. Has 6-fold rotation, multiple mirror lines, and glide reflections. A honeycomb pattern has this symmetry.</li>\
<li><strong>p4g</strong>: Has 4-fold rotation and glide reflections but <em>no</em> mirror lines through the rotation centers. Found in many bathroom tile patterns.</li>\
<li><strong>p3m1 vs. p31m</strong>: These two groups both have 3-fold rotation and reflections, but the mirror lines are oriented differently relative to the rotation centers. They are easy to confuse but are genuinely distinct symmetry types.</li>\
</ul>\
\
<div class="env-block remark">\
<div class="env-title">The Alhambra: mathematics in stone</div>\
<p>The Alhambra was built primarily between 1238 and 1358. Its decorators, constrained by Islamic art\'s preference for geometric (rather than figurative) patterns, explored the space of symmetric tilings with extraordinary thoroughness. When mathematicians finally classified the wallpaper groups in the 1890s, they were astonished to find that the Alhambra artisans had anticipated every possibility. Whether this was conscious mathematical knowledge or artistic intuition refined over centuries remains debated, but the achievement is remarkable either way.</p>\
</div>\
\
<p>The classification of wallpaper groups extends to 3D: there are 230 <strong>space groups</strong>, which classify the symmetries of three-dimensional crystals. These were enumerated independently by Fedorov, Arthur Schoenflies, and William Barlow in the 1890s. Every salt crystal, diamond, and snowflake belongs to one of these 230 categories. The entire solid-state physics and materials science rests on this classification.</p>',

                visualizations: [
                    {
                        id: 'wallpaper-patterns',
                        title: 'Wallpaper Group Sampler',
                        description: 'Click the buttons to see different wallpaper groups. Each pattern tiles the plane with a different combination of symmetries.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1 });
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            function drawP1() {
                                viz.clear();
                                var cellW = 60, cellH = 50;
                                for (var row = -1; row < H / cellH + 1; row++) {
                                    for (var col = -1; col < W / cellW + 1; col++) {
                                        var ox = col * cellW + (row % 2) * cellW * 0.3;
                                        var oy = row * cellH;
                                        ctx.strokeStyle = VizEngine.hsl(200 + col * 10, 60, 50);
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        ctx.moveTo(ox + 10, oy + 10);
                                        ctx.lineTo(ox + 30, oy + 5);
                                        ctx.lineTo(ox + 45, oy + 25);
                                        ctx.lineTo(ox + 25, oy + 40);
                                        ctx.closePath();
                                        ctx.stroke();
                                        // Small motif
                                        ctx.fillStyle = VizEngine.hsl(200 + col * 10, 60, 50) + '44';
                                        ctx.beginPath();
                                        ctx.arc(ox + 28, oy + 20, 5, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                }
                                viz.screenText('p1: translations only', W / 2, H - 14, viz.colors.white, 12, 'center', 'bottom');
                            }

                            function drawP4M() {
                                viz.clear();
                                var cell = 50;
                                for (var row = -1; row < H / cell + 1; row++) {
                                    for (var col = -1; col < W / cell + 1; col++) {
                                        var ox = col * cell;
                                        var oy = row * cell;
                                        // 4-fold rotational + mirror symmetry pattern
                                        for (var rot = 0; rot < 4; rot++) {
                                            for (var mir = 0; mir < 2; mir++) {
                                                ctx.save();
                                                ctx.translate(ox + cell / 2, oy + cell / 2);
                                                ctx.rotate(rot * Math.PI / 2);
                                                if (mir) ctx.scale(-1, 1);
                                                ctx.strokeStyle = VizEngine.hsl(30 + rot * 20, 70, 55);
                                                ctx.lineWidth = 1.2;
                                                ctx.beginPath();
                                                ctx.moveTo(0, 0);
                                                ctx.lineTo(cell * 0.4, 0);
                                                ctx.lineTo(cell * 0.3, cell * 0.2);
                                                ctx.stroke();
                                                ctx.fillStyle = VizEngine.hsl(30 + rot * 20, 70, 55) + '33';
                                                ctx.beginPath();
                                                ctx.moveTo(0, 0);
                                                ctx.lineTo(cell * 0.4, 0);
                                                ctx.lineTo(cell * 0.3, cell * 0.2);
                                                ctx.closePath();
                                                ctx.fill();
                                                ctx.restore();
                                            }
                                        }
                                    }
                                }
                                viz.screenText('p4m: 4-fold rotation + mirrors', W / 2, H - 14, viz.colors.white, 12, 'center', 'bottom');
                            }

                            function drawP6M() {
                                viz.clear();
                                var s = 35; // hex radius
                                var dx = s * Math.sqrt(3);
                                var dy = s * 1.5;
                                for (var row = -2; row < H / dy + 2; row++) {
                                    for (var col = -2; col < W / dx + 2; col++) {
                                        var ox = col * dx + (row % 2) * dx / 2;
                                        var oy = row * dy;

                                        // Hexagon
                                        ctx.strokeStyle = VizEngine.hsl(260, 50, 40);
                                        ctx.lineWidth = 0.5;
                                        ctx.beginPath();
                                        for (var i = 0; i <= 6; i++) {
                                            var a = i * Math.PI / 3 - Math.PI / 6;
                                            var hx = ox + s * Math.cos(a);
                                            var hy = oy + s * Math.sin(a);
                                            if (i === 0) ctx.moveTo(hx, hy);
                                            else ctx.lineTo(hx, hy);
                                        }
                                        ctx.stroke();

                                        // Internal 6-fold motif
                                        for (var k = 0; k < 6; k++) {
                                            var a = k * Math.PI / 3;
                                            ctx.strokeStyle = VizEngine.hsl(260 + k * 15, 60, 55);
                                            ctx.lineWidth = 1.5;
                                            ctx.beginPath();
                                            ctx.moveTo(ox, oy);
                                            ctx.lineTo(ox + s * 0.5 * Math.cos(a), oy + s * 0.5 * Math.sin(a));
                                            ctx.stroke();
                                            ctx.fillStyle = VizEngine.hsl(260 + k * 15, 60, 55) + '44';
                                            ctx.beginPath();
                                            var ta = a + Math.PI / 6;
                                            ctx.arc(ox + s * 0.35 * Math.cos(ta), oy + s * 0.35 * Math.sin(ta), 3, 0, Math.PI * 2);
                                            ctx.fill();
                                        }
                                    }
                                }
                                viz.screenText('p6m: 6-fold rotation + mirrors (honeycomb)', W / 2, H - 14, viz.colors.white, 12, 'center', 'bottom');
                            }

                            function drawPM() {
                                viz.clear();
                                var cellW = 40, cellH = 50;
                                for (var row = -1; row < H / cellH + 1; row++) {
                                    for (var col = -1; col < W / cellW + 1; col++) {
                                        var ox = col * cellW;
                                        var oy = row * cellH;
                                        var flip = col % 2 === 0 ? 1 : -1;
                                        ctx.save();
                                        ctx.translate(ox + cellW / 2, oy);
                                        ctx.scale(flip, 1);
                                        ctx.strokeStyle = VizEngine.hsl(140, 55, 50);
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        ctx.moveTo(-10, 5);
                                        ctx.quadraticCurveTo(5, 15, 0, 30);
                                        ctx.quadraticCurveTo(-10, 35, -5, 45);
                                        ctx.stroke();
                                        ctx.fillStyle = VizEngine.hsl(140, 55, 50) + '33';
                                        ctx.beginPath();
                                        ctx.arc(-3, 20, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();
                                    }
                                }
                                // Draw mirror lines
                                ctx.setLineDash([3, 3]);
                                ctx.strokeStyle = viz.colors.orange + '44';
                                ctx.lineWidth = 0.5;
                                for (var col = 0; col < W / cellW + 1; col++) {
                                    ctx.beginPath();
                                    ctx.moveTo(col * cellW, 0);
                                    ctx.lineTo(col * cellW, H);
                                    ctx.stroke();
                                }
                                ctx.setLineDash([]);
                                viz.screenText('pm: translations + vertical mirrors', W / 2, H - 14, viz.colors.white, 12, 'center', 'bottom');
                            }

                            function drawP3() {
                                viz.clear();
                                var s = 45;
                                var dx = s * Math.sqrt(3);
                                var dy = s * 1.5;
                                for (var row = -2; row < H / dy + 2; row++) {
                                    for (var col = -2; col < W / dx + 2; col++) {
                                        var ox = col * dx + (row % 2) * dx / 2;
                                        var oy = row * dy;
                                        for (var k = 0; k < 3; k++) {
                                            var a = k * 2 * Math.PI / 3 - Math.PI / 6;
                                            ctx.strokeStyle = VizEngine.hsl(320 + k * 40, 60, 50);
                                            ctx.lineWidth = 2;
                                            ctx.beginPath();
                                            ctx.moveTo(ox, oy);
                                            var midX = ox + s * 0.4 * Math.cos(a);
                                            var midY = oy + s * 0.4 * Math.sin(a);
                                            var endX = ox + s * 0.6 * Math.cos(a + 0.3);
                                            var endY = oy + s * 0.6 * Math.sin(a + 0.3);
                                            ctx.quadraticCurveTo(midX, midY, endX, endY);
                                            ctx.stroke();
                                        }
                                    }
                                }
                                viz.screenText('p3: 3-fold rotation, no mirrors', W / 2, H - 14, viz.colors.white, 12, 'center', 'bottom');
                            }

                            drawP6M();

                            VizEngine.createButton(controls, 'p1', drawP1);
                            VizEngine.createButton(controls, 'pm', drawPM);
                            VizEngine.createButton(controls, 'p3', drawP3);
                            VizEngine.createButton(controls, 'p4m', drawP4M);
                            VizEngine.createButton(controls, 'p6m', drawP6M);

                            return { stopAnimation: function () {} };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A standard brick wall (with staggered rows) has a repeating pattern. What wallpaper group does it belong to?',
                        hint: 'A brick wall has translational symmetry in two directions. Does it have any rotational symmetry? Any mirror lines?',
                        solution: 'A standard brick wall has 2-fold rotational symmetry (rotating 180&deg; around the center of a brick maps the pattern to itself) and a horizontal glide reflection (reflect horizontally and shift by half a brick width). The wallpaper group is <strong>p2gg</strong> (two glide reflections and 2-fold rotation).'
                    },
                    {
                        question: 'The Alhambra contains examples of all 17 wallpaper groups. Why might Islamic art have been particularly suited to discovering all of them?',
                        hint: 'Islamic art traditionally avoids depicting human or animal figures.',
                        solution: 'Islamic art\'s prohibition on figurative representation led artists to focus exclusively on geometric and abstract patterns. This pushed them to systematically explore all possible ways to create repeating designs, naturally leading them to discover all 17 wallpaper groups through centuries of artistic experimentation. Western art, with its focus on figurative subjects, had less motivation to systematically explore abstract tiling patterns.'
                    },
                    {
                        question: 'There are 17 wallpaper groups in 2D but 230 space groups in 3D. Why is the jump so large?',
                        hint: 'In 3D, there are more types of symmetry operations available (screw axes, improper rotations, etc.).',
                        solution: 'The jump from 17 to 230 comes from the additional symmetry operations possible in 3D. In 2D, we have rotations, reflections, and glide reflections. In 3D, we add: <strong>screw axes</strong> (rotation + translation along the axis), <strong>rotoinversions</strong> (rotation + inversion through a point), and <strong>glide planes</strong> (reflection + translation parallel to the plane). These extra operations create many more ways to combine symmetries, dramatically increasing the count.'
                    }
                ]
            },

            // ===== Section 5: Symmetry breaking =====
            {
                id: 'symmetry-breaking',
                title: 'Symmetry Breaking: When Imperfection Is Beautiful',
                content: '\
<h2>Symmetry Breaking: When Imperfection Is Beautiful</h2>\
<p>If perfect symmetry is beautiful, why is the most striking art, the most interesting physics, and the most complex biology found where symmetry is <em>broken</em>?</p>\
\
<p>A perfectly symmetric sphere of matter has no features, no structure, no interest. It is the <em>breaking</em> of that symmetry, the collapse into something less symmetric, that creates the rich structure of the world.</p>\
\
<div class="env-block definition">\
<div class="env-title">Symmetry Breaking</div>\
<p><strong>Symmetry breaking</strong> occurs when a system that could be symmetric instead adopts a less symmetric state. The underlying rules may be perfectly symmetric, but the system\'s actual state is not.</p>\
</div>\
\
<p>The classic example is a pencil balanced on its tip. The setup is perfectly symmetric: the pencil, gravity, and the table all have rotational symmetry around the vertical axis. But the pencil must fall in <em>some</em> direction, and whichever direction it falls, the symmetry is broken. The laws do not prefer any direction, but the outcome has a definite direction. This is <strong>spontaneous symmetry breaking</strong>.</p>\
\
<div class="env-block intuition">\
<div class="env-title">Intuition: the Mexican hat potential</div>\
<p>Imagine a marble on top of a sombrero (a Mexican hat). The hat is perfectly symmetric: round, with a bump in the center. The marble sitting on top of the bump is in a symmetric position but an unstable one. It must roll down into the brim, and it will end up at some point on the circular valley. Which point? The hat does not care; all points in the valley are equivalent. But the marble can only be at one point at a time, so the circular symmetry is broken by the marble\'s actual position.</p>\
</div>\
\
<p>Symmetry breaking is responsible for some of the most profound phenomena in physics:</p>\
<ul>\
<li><strong>The Higgs mechanism</strong>: The laws of particle physics are symmetric under certain transformations. But the Higgs field "falls off the bump" (picks a definite value in the vacuum), breaking this symmetry and giving mass to the W and Z bosons. Without symmetry breaking, all particles would be massless and the universe would have no atoms.</li>\
<li><strong>Magnets</strong>: The equations governing iron atoms treat all directions equally. But below a critical temperature, the atoms\' magnetic moments spontaneously align in one direction, breaking rotational symmetry and creating a magnet.</li>\
<li><strong>The Big Bang</strong>: The very early universe was extremely symmetric (uniform, isotropic). Tiny quantum fluctuations, amplified by inflation, broke this symmetry and seeded the galaxies, stars, and planets we see today.</li>\
</ul>\
\
<div class="viz-placeholder" data-viz="kaleidoscope"></div>\
\
<p>The kaleidoscope visualization above creates beautiful patterns from randomness by imposing partial symmetry. Move your mouse to change the source image, and notice how the interplay between the ordered symmetry and the disordered source creates something more visually interesting than either alone.</p>\
\
<p><strong>Symmetry breaking in art.</strong> The most celebrated works of art do not exhibit perfect symmetry. The Parthenon\'s columns are not perfectly equally spaced (the corner columns are slightly thicker and closer together, breaking the translational symmetry to create a more visually stable appearance). A jazz musician who plays "behind the beat" is deliberately breaking the temporal symmetry of the metronomic pulse, and the result is more expressive than perfect regularity.</p>\
\
<p><strong>Symmetry breaking in biology.</strong> Your heart is on the left side of your body, not in the center. This left-right asymmetry, which breaks the bilateral symmetry of the body plan, is caused by a molecular mechanism involving a protein called Nodal that is preferentially expressed on the left side during embryonic development. The gene that controls this, called <em>situs inversus</em> when mutated, can reverse the entire body plan, placing the heart on the right. About 1 in 10,000 people have this condition.</p>\
\
<div class="env-block remark">\
<div class="env-title">The deepest symmetry</div>\
<p>Perhaps the deepest insight of modern physics is that <strong>the laws themselves are symmetric, even when the world is not</strong>. The universe we inhabit is a specific, symmetry-broken state of an underlying reality that has far more symmetry than we can directly observe. The symmetry is not gone; it is hidden, and it constrains what patterns of breaking are possible. Understanding this interplay between hidden symmetry and visible asymmetry is at the frontier of theoretical physics today.</p>\
</div>\
\
<p>Symmetry and its breaking form one of the grand organizing principles of mathematics, physics, and art. Perfect symmetry gives us the elegance of crystal structures, the taxonomy of wallpaper groups, and the power of Noether\'s theorem. Broken symmetry gives us the richness of the actual world: galaxies, snowflakes, faces, music, and life itself. Together, they tell us that beauty lies not in perfection alone, but in the creative tension between order and its violation.</p>',

                visualizations: [
                    {
                        id: 'kaleidoscope',
                        title: 'Kaleidoscope: Symmetry Meets Randomness',
                        description: 'Move your mouse over the canvas to change the pattern. The kaleidoscope imposes 6-fold symmetry on the mouse-generated input.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1 });
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = viz.height / 2;
                            var R = Math.min(cx, cy) - 10;
                            var nFold = 6;

                            // Accumulation buffer
                            var particles = [];
                            var maxParticles = 2000;
                            var mouseX = cx, mouseY = cy;
                            var hueBase = 0;

                            function drawFrame() {
                                // Fade background
                                ctx.fillStyle = 'rgba(12, 12, 32, 0.03)';
                                ctx.fillRect(0, 0, viz.width, viz.height);

                                // Add new particles near mouse
                                for (var i = 0; i < 3; i++) {
                                    var dx = mouseX - cx;
                                    var dy = mouseY - cy;
                                    particles.push({
                                        x: dx + (Math.random() - 0.5) * 20,
                                        y: dy + (Math.random() - 0.5) * 20,
                                        vx: (Math.random() - 0.5) * 2,
                                        vy: (Math.random() - 0.5) * 2,
                                        life: 1,
                                        hue: hueBase + Math.random() * 60,
                                        size: 1.5 + Math.random() * 2
                                    });
                                }
                                hueBase = (hueBase + 0.3) % 360;

                                if (particles.length > maxParticles) {
                                    particles.splice(0, particles.length - maxParticles);
                                }

                                // Update and draw particles with symmetry
                                for (var pi = particles.length - 1; pi >= 0; pi--) {
                                    var p = particles[pi];
                                    p.x += p.vx;
                                    p.y += p.vy;
                                    p.life -= 0.005;

                                    if (p.life <= 0) {
                                        particles.splice(pi, 1);
                                        continue;
                                    }

                                    var alpha = p.life * 0.8;
                                    var color = 'hsla(' + Math.floor(p.hue) + ',70%,55%,' + alpha.toFixed(2) + ')';
                                    ctx.fillStyle = color;

                                    // Draw with n-fold symmetry
                                    for (var k = 0; k < nFold; k++) {
                                        for (var m = 0; m < 2; m++) {
                                            var px = p.x, py = p.y;
                                            if (m === 1) py = -py;
                                            var angle = k * 2 * Math.PI / nFold;
                                            var rx = px * Math.cos(angle) - py * Math.sin(angle);
                                            var ry = px * Math.sin(angle) + py * Math.cos(angle);
                                            var sx = cx + rx;
                                            var sy = cy + ry;

                                            if (sx >= 0 && sx <= viz.width && sy >= 0 && sy <= viz.height) {
                                                ctx.beginPath();
                                                ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
                                                ctx.fill();
                                            }
                                        }
                                    }
                                }
                            }

                            viz.canvas.addEventListener('mousemove', function (e) {
                                var rect = viz.canvas.getBoundingClientRect();
                                mouseX = e.clientX - rect.left;
                                mouseY = e.clientY - rect.top;
                            });

                            viz.canvas.addEventListener('touchmove', function (e) {
                                var rect = viz.canvas.getBoundingClientRect();
                                mouseX = e.touches[0].clientX - rect.left;
                                mouseY = e.touches[0].clientY - rect.top;
                                e.preventDefault();
                            }, { passive: false });

                            viz.animate(drawFrame);

                            VizEngine.createSlider(controls, 'Symmetry', 2, 12, nFold, 1, function (v) {
                                nFold = Math.round(v);
                                // Clear canvas
                                ctx.fillStyle = viz.colors.bg;
                                ctx.fillRect(0, 0, viz.width, viz.height);
                                particles = [];
                            });

                            VizEngine.createButton(controls, 'Clear', function () {
                                ctx.fillStyle = viz.colors.bg;
                                ctx.fillRect(0, 0, viz.width, viz.height);
                                particles = [];
                            });

                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A round table with five people seated equally spaced has 5-fold rotational symmetry. When one person stands up to give a toast, what symmetry remains?',
                        hint: 'The standing person marks a specific position, breaking rotational symmetry. Is there any symmetry left?',
                        solution: 'When one person stands, the 5-fold rotational symmetry is completely broken (rotating by 72&deg; would move the standing person to a sitting person\'s position). However, if the remaining four seated people are symmetric about the standing person, there is one <strong>reflection symmetry</strong> remaining: the mirror line through the standing person and the center of the table. The symmetry group has been reduced from \\(D_5\\) (10 elements) to \\(\\{e, s\\}\\) (2 elements, just identity and one reflection).'
                    },
                    {
                        question: 'Explain why a magnet is an example of spontaneous symmetry breaking. What is the symmetric state, and what is the broken-symmetry state?',
                        hint: 'Above a critical temperature (the Curie temperature), iron is not magnetic.',
                        solution: 'The symmetric state is unmagnetized iron above the Curie temperature (~770&deg;C): the atomic magnetic moments point in random directions, so the material has no preferred direction (rotational symmetry). Below the Curie temperature, the moments spontaneously align in one direction, creating a net magnetic field. This direction breaks the rotational symmetry. The laws governing the atomic interactions are rotationally symmetric, but the ground state is not. The system "chose" a direction, just as the marble "chose" a point on the sombrero brim.'
                    },
                    {
                        question: 'The kaleidoscope creates beauty by imposing symmetry on random input. Can you think of other examples, in art or nature, where beauty arises from the combination of order and randomness?',
                        hint: 'Think about music, architecture, or natural landscapes.',
                        solution: 'Examples include: (1) <strong>Music</strong>: a repeated rhythmic structure (order) with improvisational melody (randomness) creates jazz and many forms of world music. (2) <strong>Trees</strong>: branching follows recursive rules (order), but each branch is shaped by wind, light, and chance (randomness). (3) <strong>Jackson Pollock paintings</strong>: drip patterns have fractal structure (order) arising from chaotic fluid dynamics (randomness). (4) <strong>Clouds</strong>: atmospheric convection follows physical laws (order), but turbulence makes each cloud unique (randomness). In each case, pure order would be sterile and pure randomness would be meaningless; the combination is what creates beauty.'
                    }
                ]
            }
        ]
    });
})();
