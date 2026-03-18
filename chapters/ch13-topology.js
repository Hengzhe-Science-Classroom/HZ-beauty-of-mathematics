// === Chapter 13: Surfaces & Topology ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Surfaces & Topology',
    subtitle: 'Rubber-sheet geometry: the mathematics of stretching, bending, and classifying surfaces',
    sections: [
        // ========== SECTION 1: Rubber sheet geometry ==========
        {
            id: 'sec13-rubber-sheet',
            title: 'Rubber sheet geometry',
            content: `
<h2>13.1 Rubber Sheet Geometry</h2>

<div class="env-block intuition">
<strong>Imagine a world made of rubber.</strong> In this world, distances do not matter. Angles do not matter. Straight lines can be curved, circles can be squished into ellipses, and cubes can be inflated into spheres. The only rule is: <em>you cannot tear, puncture, or glue</em>. If two shapes can be continuously deformed into each other under this rule, a topologist considers them to be the same.
</div>

<p>This is the central idea of <strong>topology</strong>, one of the most important branches of modern mathematics. The word comes from the Greek <em>topos</em> (place) and <em>logos</em> (study). It was born in the 18th century from Euler's work on polyhedra and the K&ouml;nigsberg bridge problem, but it did not mature into a full discipline until the late 19th and early 20th centuries, through the work of Bernhard Riemann, Henri Poincar&eacute;, and others.</p>

<p>In ordinary geometry, the shape of a triangle depends on the lengths of its sides and the measures of its angles. Change a length, and you have a different triangle. But in topology, all triangles are the same, because you can stretch any one into any other without cutting. In fact, a triangle, a circle, a square, and any simple closed curve in the plane are all topologically identical. They are all <em>homeomorphic</em> to each other.</p>

<div class="env-block definition">
<strong>Homeomorphism (informal).</strong> Two shapes are <em>homeomorphic</em> (topologically equivalent) if one can be continuously deformed into the other without cutting, tearing, or gluing. A homeomorphism is a bijective, continuous map with a continuous inverse.
</div>

<p>What properties survive this kind of deformation? Not distances, not angles, not areas. But some properties <em>do</em> survive:</p>
<ul>
<li><strong>Connectedness</strong>: if a shape is in one piece, it stays in one piece.</li>
<li><strong>Number of holes</strong>: you cannot create or destroy a hole by stretching.</li>
<li><strong>Dimension</strong>: a line cannot be deformed into a plane.</li>
<li><strong>Orientability</strong>: whether a surface has a "front" and "back" (more on this soon).</li>
<li><strong>Euler characteristic</strong>: the quantity \\(\\chi = V - E + F\\) from Chapter 12.</li>
</ul>

<p>These invariant properties are what topology studies. They capture the <em>essence</em> of shape, stripped of all geometric detail.</p>

<div class="viz-placeholder" data-viz="viz-deformation"></div>

<div class="env-block remark">
<strong>Why should we care?</strong> Topology is not just abstract beauty. It has become essential in physics (understanding the shape of the universe, classifying quantum states of matter), biology (analyzing the shape of DNA and proteins), data science (topological data analysis extracts shape from high-dimensional datasets), and even robotics (configuration spaces of robots are topological objects). The 2016 Nobel Prize in Physics was awarded for topological phases of matter.
</div>

<p>Let us explore some of the most famous and surprising objects in topology.</p>
`,
            visualizations: [
                {
                    id: 'viz-deformation',
                    title: 'Continuous Deformation: All These Shapes Are the Same',
                    description: 'Watch a circle smoothly deform into a square, triangle, and back. All are topologically equivalent (homeomorphic) because no cutting or gluing occurs.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: null, originY: null });
                        viz.originX = viz.width / 2;
                        viz.originY = viz.height / 2;
                        var ctx = viz.ctx;

                        var shapeIdx = 0;
                        var shapes = ['circle', 'square', 'triangle', 'star', 'circle'];
                        var shapeNames = ['Circle', 'Square', 'Triangle', 'Star', 'Circle'];
                        var morphT = 0;
                        var morphSpeed = 0.005;

                        function shapeR(theta, shape) {
                            if (shape === 'circle') return 3;
                            if (shape === 'square') {
                                var a = ((theta % (Math.PI / 2)) + Math.PI / 2) % (Math.PI / 2) - Math.PI / 4;
                                return 3 / Math.cos(a);
                            }
                            if (shape === 'triangle') {
                                var t3 = ((theta + Math.PI / 2) % (2 * Math.PI / 3) + 2 * Math.PI / 3) % (2 * Math.PI / 3) - Math.PI / 3;
                                return 2.5 / Math.cos(t3);
                            }
                            if (shape === 'star') {
                                return 2.5 + 1.0 * Math.cos(5 * theta);
                            }
                            return 3;
                        }

                        function drawFrame(t) {
                            viz.clear();
                            viz.drawGrid();

                            morphT += morphSpeed;
                            if (morphT >= 1) {
                                morphT = 0;
                                shapeIdx = (shapeIdx + 1) % (shapes.length - 1);
                            }

                            var from = shapes[shapeIdx];
                            var to = shapes[shapeIdx + 1];
                            var smooth = 0.5 - 0.5 * Math.cos(morphT * Math.PI); // easing

                            // Draw morphing shape
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var steps = 200;
                            for (var i = 0; i <= steps; i++) {
                                var theta = (i / steps) * 2 * Math.PI;
                                var r1 = shapeR(theta, from);
                                var r2 = shapeR(theta, to);
                                var r = VizEngine.lerp(r1, r2, smooth);
                                var sx = viz.originX + r * Math.cos(theta) * viz.scale;
                                var sy = viz.originY - r * Math.sin(theta) * viz.scale;
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.blue + '18';
                            ctx.fill();
                            ctx.stroke();

                            // Label
                            var fromName = shapeNames[shapeIdx];
                            var toName = shapeNames[shapeIdx + 1];
                            viz.screenText(fromName + ' \u2192 ' + toName, viz.width / 2, 25, viz.colors.white, 16);
                            viz.screenText('All topologically equivalent!', viz.width / 2, viz.height - 18, viz.colors.gold, 13);

                            // Progress bar
                            ctx.fillStyle = viz.colors.axis;
                            ctx.fillRect(50, viz.height - 40, viz.width - 100, 3);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(50, viz.height - 40, (viz.width - 100) * smooth, 3);
                        }

                        viz.animate(drawFrame);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Which of the following pairs are topologically equivalent (homeomorphic)? (a) A sphere and a cube. (b) A sphere and a torus. (c) The letter "O" and the letter "D". (d) The letter "B" and the number "8".',
                    hint: 'Two shapes are homeomorphic if you can deform one into the other without cutting or gluing. Count the number of holes.',
                    solution: '(a) Yes, a sphere and cube are homeomorphic (inflate the cube). (b) No, a sphere has no hole and a torus has one hole. (c) Yes, "O" and "D" are both simple closed curves. (d) Yes, "B" and "8" both enclose two holes (two enclosed regions).'
                },
                {
                    question: 'Is a line segment homeomorphic to a circle? Why or why not?',
                    hint: 'What happens at the endpoints of the line segment?',
                    solution: 'No. A line segment has two endpoints (boundary points), while a circle has none. If you remove any point from a circle, it remains connected (it becomes an arc). But removing an interior point from a line segment disconnects it into two pieces. More fundamentally, a circle is a closed curve; no amount of stretching turns a segment into a loop without gluing the ends together.'
                }
            ]
        },

        // ========== SECTION 2: The M\u00f6bius strip ==========
        {
            id: 'sec13-mobius',
            title: 'The M\u00f6bius strip',
            content: `
<h2>13.2 The M&ouml;bius Strip</h2>

<p>In 1858, two German mathematicians independently discovered one of the most surprising objects in all of mathematics. August Ferdinand M&ouml;bius and Johann Benedict Listing both realized that you can create a surface with <strong>only one side</strong>.</p>

<p>The construction is delightfully simple: take a long rectangular strip of paper, give it a <strong>half-twist</strong> (180 degrees), and then glue the short ends together. The result is the <strong>M&ouml;bius strip</strong> (or M&ouml;bius band).</p>

<div class="env-block intuition">
<strong>Try it yourself!</strong> Cut a strip of paper about 30 cm long and 3 cm wide. Give it a half-twist and tape the ends together. Now take a pencil and draw a line along the center of the strip, without lifting your pencil. You will find that your line goes all the way around and comes back to where it started, covering <em>both sides</em> of the original paper. The M&ouml;bius strip has only one side!
</div>

<p>This is deeply strange. An ordinary cylinder (a strip with no twist, ends glued) has two distinct sides: an inside and an outside. You can paint the inside red and the outside blue, and the colors will never meet. But on a M&ouml;bius strip, there is no "inside" and "outside." If you start painting one side, you will eventually paint the entire surface without ever lifting your brush.</p>

<p>The M&ouml;bius strip also has another remarkable property: it has <strong>only one edge</strong>. An ordinary strip has two edges (top and bottom). But after the half-twist and gluing, these two edges become a single continuous loop. You can verify this by running your finger along the edge; you will trace the entire boundary before returning to your starting point.</p>

<div class="viz-placeholder" data-viz="viz-mobius-construct"></div>

<div class="env-block definition">
<strong>Orientability.</strong> A surface is <em>orientable</em> if it has two distinct sides, so that you can consistently define "clockwise" at every point. A surface is <em>non-orientable</em> if it has only one side. The M&ouml;bius strip is the simplest example of a non-orientable surface.
</div>

<h3>Cutting a M&ouml;bius Strip</h3>

<p>What happens if you cut a M&ouml;bius strip along its center line? With a normal cylinder, you would get two separate rings. But with a M&ouml;bius strip, the result is surprising: you get <strong>one longer strip with two half-twists</strong> (a full twist). It is still a single connected piece! Even more surprising: if you cut this resulting strip down the middle again, you get <strong>two linked rings</strong>.</p>

<p>And what if you cut a M&ouml;bius strip one-third of the way from the edge instead of the center? You get <strong>two linked strips</strong>: one is a M&ouml;bius strip (the narrow one-third), and the other is a longer strip with a full twist (the wider two-thirds). These unexpected results have delighted mathematicians and puzzlers for over 160 years.</p>

<div class="env-block remark">
<strong>M&ouml;bius in the real world.</strong> The M&ouml;bius strip is not just a mathematical curiosity. It has practical applications: conveyor belts are sometimes designed as M&ouml;bius strips so that both "sides" of the belt receive equal wear, doubling the belt's lifespan. The universal recycling symbol (three chasing arrows) forms a M&ouml;bius strip. And in electronics, M&ouml;bius resistors have been used to create non-inductive electrical components.
</div>
`,
            visualizations: [
                {
                    id: 'viz-mobius-construct',
                    title: 'Constructing a M\u00f6bius Strip',
                    description: 'Watch a rectangular strip receive a half-twist and join its ends to form a M\u00f6bius strip. The animation shows how the two "sides" of the paper become one continuous surface.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var phase = 0; // 0=flat, 1=twisting, 2=mobius rotating

                        function drawFrame(t) {
                            viz.clear();
                            var cx = W / 2, cy = H / 2;

                            // Animated Mobius strip as 3D parametric surface
                            var angle = t * 0.0008;
                            var twist = Math.min(1, (t % 10000) / 5000); // 0 to 1 over 5 seconds

                            var strips = 40;
                            var widthStrips = 8;
                            var R = 90;
                            var halfW = 25;

                            // Two-color scheme to show single-sidedness
                            for (var wi = -widthStrips; wi < widthStrips; wi++) {
                                var wFrac = wi / widthStrips;
                                for (var si = 0; si < strips; si++) {
                                    var u1 = (si / strips) * 2 * Math.PI;
                                    var u2 = ((si + 1) / strips) * 2 * Math.PI;
                                    var w1 = wFrac;
                                    var w2 = (wi + 1) / widthStrips;

                                    var pts = [];
                                    var corners = [[u1, w1], [u2, w1], [u2, w2], [u1, w2]];
                                    var zAvg = 0;

                                    for (var c = 0; c < 4; c++) {
                                        var u = corners[c][0];
                                        var w = corners[c][1];
                                        // Mobius parametrization
                                        var twistAngle = u / 2 * twist; // half the angle for Mobius twist
                                        var x = (R + halfW * w * Math.cos(twistAngle)) * Math.cos(u);
                                        var y = (R + halfW * w * Math.cos(twistAngle)) * Math.sin(u);
                                        var z = halfW * w * Math.sin(twistAngle);

                                        // Rotate for viewing
                                        var ca = Math.cos(angle), sa = Math.sin(angle);
                                        var xr = x * ca - y * sa;
                                        var yr = x * sa + y * ca;

                                        var tilt = 0.6;
                                        var ct = Math.cos(tilt), st = Math.sin(tilt);
                                        var yr2 = yr * ct - z * st;
                                        var zr = yr * st + z * ct;

                                        pts.push([cx + xr, cy - yr2]);
                                        zAvg += zr;
                                    }
                                    zAvg /= 4;

                                    // Color based on twist angle (shows single-sidedness)
                                    var hue = (si / strips) * 360;
                                    var brightness = 30 + (zAvg + 40) * 0.4;
                                    ctx.fillStyle = VizEngine.hsl(hue, 60, VizEngine.clamp(brightness, 15, 55));
                                    ctx.beginPath();
                                    ctx.moveTo(pts[0][0], pts[0][1]);
                                    ctx.lineTo(pts[1][0], pts[1][1]);
                                    ctx.lineTo(pts[2][0], pts[2][1]);
                                    ctx.lineTo(pts[3][0], pts[3][1]);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            // Edge outline
                            ctx.strokeStyle = viz.colors.white + '88';
                            ctx.lineWidth = 1.5;
                            for (var edge = -1; edge <= 1; edge += 2) {
                                ctx.beginPath();
                                for (var es = 0; es <= strips * 2; es++) {
                                    var eu = (es / (strips * 2)) * 2 * Math.PI;
                                    var eTwist = eu / 2 * twist;
                                    var ex = (R + halfW * edge * Math.cos(eTwist)) * Math.cos(eu);
                                    var ey = (R + halfW * edge * Math.cos(eTwist)) * Math.sin(eu);
                                    var ez = halfW * edge * Math.sin(eTwist);
                                    var eca = Math.cos(angle), esa = Math.sin(angle);
                                    var exr = ex * eca - ey * esa;
                                    var eyr = ex * esa + ey * eca;
                                    var ect = Math.cos(0.6), est = Math.sin(0.6);
                                    var eyr2 = eyr * ect - ez * est;
                                    if (es === 0) ctx.moveTo(cx + exr, cy - eyr2);
                                    else ctx.lineTo(cx + exr, cy - eyr2);
                                }
                                ctx.stroke();
                            }

                            // Label
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (twist < 0.5) {
                                ctx.fillText('Flat strip (no twist yet)...', cx, 25);
                            } else if (twist < 1) {
                                ctx.fillText('Adding half-twist...', cx, 25);
                            } else {
                                ctx.fillText('M\u00f6bius Strip: One side, one edge!', cx, 25);
                            }
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Colors change continuously around the band, showing there is only one side', cx, H - 12);
                        }

                        viz.animate(drawFrame);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'If you give a strip of paper <strong>two</strong> half-twists (a full 360-degree twist) before gluing, is the result orientable or non-orientable? How many sides does it have?',
                    hint: 'Try tracing your finger along one side. Does it come back to the same side or the other?',
                    solution: 'A strip with a full twist (two half-twists) is <em>orientable</em>; it has two distinct sides. If you start painting one side, you will return to the same side without painting the other. Only an odd number of half-twists produces a non-orientable surface.'
                },
                {
                    question: 'What is the Euler characteristic of a M&ouml;bius strip? (Hint: it is a surface with boundary.)',
                    hint: 'Triangulate the M&ouml;bius strip and count V, E, F. Or recall that for surfaces with boundary, \\(\\chi = V - E + F\\) can differ from the closed case.',
                    solution: 'A simple triangulation of the M&ouml;bius strip gives \\(\\chi = 0\\). For example, using a rectangular strip with one twist: you can build it with \\(V = 3\\), \\(E = 6\\), \\(F = 3\\), giving \\(\\chi = 3 - 6 + 3 = 0\\). (Various triangulations exist; they all yield \\(\\chi = 0\\).)'
                }
            ]
        },

        // ========== SECTION 3: The Klein bottle ==========
        {
            id: 'sec13-klein',
            title: 'The Klein bottle',
            content: `
<h2>13.3 The Klein Bottle</h2>

<p>The M&ouml;bius strip has a boundary (its single edge). What if we could create a <em>closed</em> (no boundary) non-orientable surface? The result is the <strong>Klein bottle</strong>, discovered by Felix Klein in 1882.</p>

<p>Here is how to think about it. Start with a square. Glue the top edge to the bottom edge to make a cylinder. Now you need to glue the remaining two circular ends together, but with a <em>reversal</em>: the left circle must be glued to the right circle with opposite orientations (the way you would glue a M&ouml;bius strip's edge).</p>

<p>In three-dimensional space, this is impossible without the surface passing through itself. To glue the ends with a reversal, the tube must curve around, pass through its own wall, and connect from the inside. In 3D, the Klein bottle must self-intersect. But in <strong>four-dimensional</strong> space, there is enough room for the surface to curve around without any self-intersection, just as a figure-eight curve self-intersects in 2D but can be "lifted" into 3D as a smooth knot.</p>

<div class="env-block definition">
<strong>The Klein bottle.</strong> A <em>Klein bottle</em> is a closed, non-orientable surface with no boundary. It cannot be embedded in 3D without self-intersection, but it can be embedded in 4D. It has Euler characteristic \\(\\chi = 0\\).
</div>

<div class="viz-placeholder" data-viz="viz-klein-bottle"></div>

<p>The Klein bottle has some wonderful properties:</p>
<ul>
<li><strong>No inside or outside.</strong> Like the M&ouml;bius strip, the Klein bottle is non-orientable. An ant walking on its surface can reach any point without crossing an edge (there are no edges). If the bottle were filled with water, the water would be on "both sides" of the surface; there is no distinction between inside and outside.</li>
<li><strong>Zero Euler characteristic.</strong> Like the torus, the Klein bottle has \\(\\chi = 0\\). But unlike the torus, the Klein bottle is non-orientable.</li>
<li><strong>Made from two M&ouml;bius strips.</strong> If you cut a Klein bottle in half along a certain loop, you get two M&ouml;bius strips. Conversely, gluing two M&ouml;bius strips along their (single) edges produces a Klein bottle.</li>
</ul>

<div class="env-block remark">
<strong>Can you fill a Klein bottle with water?</strong> This is a classic trick question. Since a Klein bottle has no inside or outside, the concept of "filling" it does not apply in the usual sense. In the self-intersecting 3D immersion, water would leak through the self-intersection. But in 4D, where the Klein bottle lives without self-intersection, the question becomes more subtle: the surface does not bound a volume, so there is nothing to "fill."
</div>

<p>The Klein bottle, together with the M&ouml;bius strip, demonstrates that non-orientability is a genuine topological phenomenon, not just a trick with paper. These surfaces behave fundamentally differently from spheres and tori, and this difference is captured by their topological invariants.</p>
`,
            visualizations: [
                {
                    id: 'viz-klein-bottle',
                    title: 'The Klein Bottle (3D Immersion)',
                    description: 'A rotating Klein bottle. In 3D it must pass through itself (shown by the "neck" going through the "body"). In 4D it would have no self-intersection.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        function drawFrame(t) {
                            viz.clear();
                            var cx = W / 2, cy = H / 2;
                            var angle = t * 0.0006;

                            // Klein bottle parametrization (figure-8 immersion)
                            var strips = 60;
                            var rings = 30;

                            for (var ri = 0; ri < rings; ri++) {
                                var v1 = (ri / rings) * 2 * Math.PI;
                                var v2 = ((ri + 1) / rings) * 2 * Math.PI;

                                for (var si = 0; si < strips; si++) {
                                    var u1 = (si / strips) * 2 * Math.PI;
                                    var u2 = ((si + 1) / strips) * 2 * Math.PI;

                                    var corners = [[u1, v1], [u2, v1], [u2, v2], [u1, v2]];
                                    var pts = [];
                                    var zAvg = 0;

                                    for (var ci = 0; ci < 4; ci++) {
                                        var u = corners[ci][0];
                                        var v = corners[ci][1];

                                        // Klein bottle parametric equations (figure-8)
                                        var r2 = 2 - Math.cos(u);
                                        var x, y, z;
                                        if (u < Math.PI) {
                                            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + r2 * Math.cos(u) * Math.cos(v);
                                            y = 8 * Math.sin(u) + r2 * Math.sin(u) * Math.cos(v);
                                        } else {
                                            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + r2 * Math.cos(v + Math.PI);
                                            y = 8 * Math.sin(u);
                                        }
                                        z = r2 * Math.sin(v);

                                        // Scale down
                                        x *= 8; y *= 8; z *= 8;

                                        // Rotate
                                        var ca = Math.cos(angle), sa = Math.sin(angle);
                                        var xr = x * ca - z * sa;
                                        var zr = x * sa + z * ca;

                                        var tilt = 0.3;
                                        var ct2 = Math.cos(tilt), st2 = Math.sin(tilt);
                                        var yr = y * ct2 - zr * st2;
                                        var zr2 = y * st2 + zr * ct2;

                                        pts.push([cx + xr, cy - yr]);
                                        zAvg += zr2;
                                    }
                                    zAvg /= 4;

                                    var hue = (ri / rings) * 260 + 180;
                                    var bright = 25 + VizEngine.clamp((zAvg + 100) * 0.15, 0, 30);
                                    ctx.fillStyle = VizEngine.hsl(hue % 360, 55, bright);
                                    ctx.beginPath();
                                    ctx.moveTo(pts[0][0], pts[0][1]);
                                    ctx.lineTo(pts[1][0], pts[1][1]);
                                    ctx.lineTo(pts[2][0], pts[2][1]);
                                    ctx.lineTo(pts[3][0], pts[3][1]);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            // Label
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Klein Bottle: no inside, no outside, no boundary', cx, 22);
                            ctx.fillStyle = viz.colors.gold;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('\u03C7 = 0 (non-orientable, genus equivalent to torus in \u03C7 but topologically distinct)', cx, H - 12);
                        }

                        viz.animate(drawFrame);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain intuitively why the Klein bottle cannot exist in 3D without self-intersection, but can exist in 4D.',
                    hint: 'Think about how a figure-eight (which self-intersects in 2D) can be "lifted" into 3D as a smooth loop with no crossing, by using the third dimension to go "over" and "under."',
                    solution: 'In 3D, the Klein bottle\'s "neck" must pass through its own wall to connect from the inside. There is no room to avoid the intersection. In 4D, the neck can move into the fourth dimension to pass "over" (or "beside") the wall, just as a crossing in a flat figure-eight can be resolved by lifting one strand into the third dimension. The extra dimension provides a direction of escape.'
                },
                {
                    question: 'A Klein bottle has \\(\\chi = 0\\), and a torus also has \\(\\chi = 0\\). Are they homeomorphic?',
                    hint: 'The Euler characteristic alone does not uniquely identify a surface. What other topological property distinguishes them?',
                    solution: 'No, they are not homeomorphic. The torus is orientable (it has two distinct sides), while the Klein bottle is non-orientable (one side). Two surfaces must share both their Euler characteristic <em>and</em> their orientability to be homeomorphic (by the classification theorem of surfaces).'
                },
                {
                    question: 'If you cut a Klein bottle along a suitable circle, you can get two M&ouml;bius strips. If instead you cut along a different circle, you get a single cylinder. What determines the difference?',
                    hint: 'Think about cutting along a circle that goes around the "tube" versus one that goes along the length.',
                    solution: 'It depends on whether the cut circle is orientation-reversing or orientation-preserving. Cutting along an orientation-reversing circle (one that goes around the non-orientable "twist") yields two M&ouml;bius strips. Cutting along an orientation-preserving circle yields a single cylinder. The topology of the cut depends on how the cut interacts with the non-orientability.'
                }
            ]
        },

        // ========== SECTION 4: Coffee cups and donuts ==========
        {
            id: 'sec13-coffee-donut',
            title: 'Coffee cups and donuts',
            content: `
<h2>13.4 Coffee Cups and Donuts</h2>

<p>There is a famous joke in mathematics: <em>"A topologist is someone who cannot tell the difference between a coffee cup and a donut."</em> This joke captures the essence of topological equivalence in a single vivid image.</p>

<p>Consider a ceramic coffee cup with a handle. It has one hole, the hole through the handle. Now consider a donut (a torus). It also has one hole. Since both objects have exactly one hole, they are topologically equivalent. A topologist could, in principle, continuously deform one into the other: shrink the cup's bowl until it is flat, then reshape the remaining handle-ring into a smooth torus.</p>

<div class="viz-placeholder" data-viz="viz-cup-to-donut"></div>

<p>This is not just a joke; it is a profound statement about what topology measures. The coffee cup and the donut have the same genus (\\(g = 1\\)), the same Euler characteristic (\\(\\chi = 0\\)), and the same orientability (both are orientable). By the classification theorem for surfaces (which we will see in the next section), they must be homeomorphic.</p>

<div class="env-block intuition">
<strong>What matters in topology.</strong> A topologist does not care about:
<ul>
<li>Size (a marble and the Earth are the same)</li>
<li>Shape (a circle and a square are the same)</li>
<li>Curvature (a flat plane and a wavy surface are the same, if both are infinite sheets)</li>
</ul>
A topologist cares about:
<ul>
<li>Number of holes</li>
<li>Number of connected pieces</li>
<li>Whether the surface is orientable</li>
<li>Whether the surface has boundary</li>
</ul>
</div>

<p>Here are some more examples of topological equivalences that may surprise you:</p>
<ul>
<li>A <strong>pen</strong> (without its cap) is topologically a sphere (genus 0). No holes.</li>
<li>A <strong>pair of scissors</strong> (with two finger loops) is topologically a double torus (genus 2). Two holes.</li>
<li>A <strong>pretzel</strong> (with three holes) is genus 3.</li>
<li>A <strong>straw</strong> is topologically a torus! The inside of the straw is connected to the outside by the holes at each end, creating a surface with one hole running all the way through.</li>
</ul>

<div class="env-block remark">
<strong>Is a straw one hole or two?</strong> This is a surprisingly contentious question. Topologically, a straw is a cylinder with two boundary circles. If we cap both ends (creating a closed surface), we get a sphere (genus 0). But the open straw, considered as a surface, is homeomorphic to an annulus (a ring), which has Euler characteristic 0. The "number of holes" depends on exactly what you mean by "hole." Topology makes this precise through the concept of genus.
</div>
`,
            visualizations: [
                {
                    id: 'viz-cup-to-donut',
                    title: 'Coffee Cup \u2192 Donut Morph',
                    description: 'Watch a coffee cup continuously deform into a donut. The handle\'s hole is preserved throughout the transformation, because topology forbids creating or destroying holes.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var morphParam = 0;

                        function draw() {
                            viz.clear();
                            var cx = W / 2, cy = H / 2;
                            var t = morphParam; // 0 = cup, 1 = donut

                            // We draw an interpolation between cup silhouette and donut silhouette
                            // Cup: body (rectangle) + handle (loop on side)
                            // Donut: torus cross-section

                            if (t < 0.01) {
                                // Draw cup
                                // Cup body
                                ctx.fillStyle = viz.colors.blue + '33';
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;

                                // Body
                                ctx.beginPath();
                                ctx.moveTo(cx - 60, cy - 60);
                                ctx.lineTo(cx - 50, cy + 60);
                                ctx.lineTo(cx + 50, cy + 60);
                                ctx.lineTo(cx + 60, cy - 60);
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();

                                // Handle
                                ctx.beginPath();
                                ctx.arc(cx + 60, cy - 10, 30, -Math.PI / 2, Math.PI / 2);
                                ctx.stroke();

                                // Rim
                                ctx.beginPath();
                                ctx.ellipse(cx, cy - 60, 60, 15, 0, 0, Math.PI * 2);
                                ctx.stroke();

                            } else if (t > 0.99) {
                                // Draw donut (torus front view)
                                var R = 70, rr = 28;
                                // Outer ellipse
                                ctx.fillStyle = viz.colors.blue + '33';
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.ellipse(cx, cy, R + rr, (R + rr) * 0.5, 0, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.stroke();

                                // Inner hole
                                ctx.fillStyle = viz.colors.bg;
                                ctx.beginPath();
                                ctx.ellipse(cx, cy, R - rr, (R - rr) * 0.5, 0, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.ellipse(cx, cy, R - rr, (R - rr) * 0.5, 0, 0, Math.PI * 2);
                                ctx.stroke();

                            } else {
                                // Intermediate morph: interpolate key shapes
                                // Shrink cup body, keep handle, morph to torus
                                var bodyWidth = VizEngine.lerp(60, 28, t);
                                var bodyHeight = VizEngine.lerp(60, 28, t);
                                var bodyX = VizEngine.lerp(0, 0, t);
                                var handleR = VizEngine.lerp(30, 70, t);
                                var handleX = VizEngine.lerp(60, 0, t);
                                var handleY = VizEngine.lerp(-10, 0, t);
                                var handleArcStart = VizEngine.lerp(-Math.PI / 2, 0, t);
                                var handleArcEnd = VizEngine.lerp(Math.PI / 2, Math.PI * 2, t);

                                ctx.fillStyle = viz.colors.blue + '33';
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;

                                // Shrinking body (becomes the cross-section of torus)
                                var bx = cx + bodyX;
                                var by = cy + handleY;
                                ctx.beginPath();
                                ctx.ellipse(bx + handleX, by, bodyWidth, bodyHeight * VizEngine.lerp(1, 0.5, t), 0, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.stroke();

                                // Growing handle (becomes the ring of torus)
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(cx + bodyX, cy + handleY, handleR, handleArcStart, handleArcEnd);
                                ctx.stroke();
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';

                            if (t < 0.3) ctx.fillText('Coffee Cup (genus 1)', cx, 25);
                            else if (t > 0.7) ctx.fillText('Donut / Torus (genus 1)', cx, 25);
                            else ctx.fillText('Morphing... (genus stays 1)', cx, 25);

                            ctx.fillStyle = viz.colors.gold;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('The hole in the handle is preserved throughout!', cx, H - 15);
                        }

                        VizEngine.createSlider(controls, 'Morph:', 0, 1, 0, 0.01, function(val) {
                            morphParam = val;
                            draw();
                        });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Classify the following objects by their topological genus: (a) a basketball, (b) a mug with two handles, (c) a pair of eyeglasses (just the frames, no lenses), (d) a button with 4 holes.',
                    hint: 'Count the number of holes that go completely through the object.',
                    solution: '(a) Basketball: genus 0 (no holes). (b) Two-handled mug: genus 2 (two holes through the handles). (c) Eyeglass frames: genus 2 (two lens holes). (d) Button with 4 holes: genus 4 (four thread holes go through the button).'
                },
                {
                    question: 'Is a hollow ball (like a tennis ball) topologically the same as a solid ball?',
                    hint: 'Think about whether you could continuously shrink the interior of the hollow ball to a point.',
                    solution: 'It depends on the context. A hollow ball (sphere) is a 2D surface; a solid ball is a 3D volume. As surfaces, the outer surface of the solid ball and the hollow ball are both spheres (genus 0), so they are the same. But as 3-dimensional objects, the solid ball is contractible (can be shrunk to a point) while a hollow ball is not. The distinction depends on whether you consider them as surfaces or as solid objects.'
                }
            ]
        },

        // ========== SECTION 5: Classification of surfaces ==========
        {
            id: 'sec13-classification',
            title: 'Classification of surfaces',
            content: `
<h2>13.5 Classification of Surfaces</h2>

<p>One of the great triumphs of 19th and early 20th century mathematics is the <strong>classification theorem for compact surfaces</strong>. It provides a complete and elegant answer to the question: what are all possible shapes for a closed surface?</p>

<div class="env-block theorem">
<strong>Classification of Compact Surfaces.</strong> Every compact, connected surface without boundary is homeomorphic to exactly one of:
<ul>
<li>The <strong>sphere</strong> (genus 0, orientable), or</li>
<li>A <strong>connected sum of \\(g\\) tori</strong> (genus \\(g\\), orientable), or</li>
<li>A <strong>connected sum of \\(k\\) projective planes</strong> (non-orientable).</li>
</ul>
Two surfaces are homeomorphic if and only if they have the same Euler characteristic and the same orientability.
</div>

<p>This is a stunning result. The world of surfaces, which seems infinite and bewildering in its variety, is in fact completely organized by just <strong>two numbers</strong>: the Euler characteristic \\(\\chi\\) and a yes/no answer to the orientability question.</p>

<div class="env-block definition">
<strong>Connected sum.</strong> The <em>connected sum</em> of two surfaces is formed by cutting a small disk out of each surface and gluing the resulting boundary circles together. For example, the connected sum of two tori is a "double torus" (a surface with two holes, like a figure eight or a two-holed pretzel).
</div>

<p>The orientable surfaces form a neat sequence:</p>
<ul>
<li>Genus 0: Sphere. \\(\\chi = 2\\).</li>
<li>Genus 1: Torus (one hole). \\(\\chi = 0\\).</li>
<li>Genus 2: Double torus (two holes). \\(\\chi = -2\\).</li>
<li>Genus 3: Triple torus (three holes). \\(\\chi = -4\\).</li>
<li>And so on: genus \\(g\\) has \\(\\chi = 2 - 2g\\).</li>
</ul>

<p>The non-orientable surfaces form a parallel sequence:</p>
<ul>
<li>Projective plane (\\(\\chi = 1\\))</li>
<li>Klein bottle (\\(\\chi = 0\\))</li>
<li>Connected sum of 3 projective planes (\\(\\chi = -1\\))</li>
<li>And so on: \\(k\\) projective planes have \\(\\chi = 2 - k\\).</li>
</ul>

<div class="viz-placeholder" data-viz="viz-classification-table"></div>

<div class="env-block intuition">
<strong>Why is this remarkable?</strong> Classification theorems are the holy grail of mathematics. They say: "I can list <em>every single</em> object in this category, with no exceptions." For surfaces, the classification is complete and beautifully simple. For 3-dimensional shapes (3-manifolds), the classification is vastly more complicated and was not completed until the 2000s (Perelman's proof of the Poincar&eacute; conjecture). For 4-dimensional shapes, the classification is still open and contains deep unsolved problems.
</div>

<p>The classification theorem reveals that topology is a kind of <em>discrete</em> mathematics hiding inside continuous geometry. Despite the infinite variety of geometric shapes, there are only countably many topological types: one for each combination of (genus, orientability). It is a perfect example of mathematical beauty: a seemingly complex landscape reduced to elegant simplicity.</p>

<div class="env-block remark">
<strong>The Poincar&eacute; Conjecture.</strong> In 1904, Henri Poincar&eacute; asked whether the 3-dimensional analogue of the sphere could be characterized in purely topological terms. This became one of the seven Millennium Prize Problems, each carrying a $1 million reward. In 2003, the reclusive Russian mathematician Grigori Perelman posted a proof online. He was awarded both the Fields Medal and the Millennium Prize, and famously declined both. His proof of the Poincar&eacute; Conjecture is considered one of the greatest mathematical achievements of the 21st century.
</div>
`,
            visualizations: [
                {
                    id: 'viz-classification-table',
                    title: 'The Classification of Surfaces',
                    description: 'An interactive chart showing all possible compact surfaces, organized by genus and orientability. Each surface is uniquely determined by two invariants.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        function drawChart() {
                            viz.clear();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Complete Classification of Compact Surfaces', W / 2, 25);

                            // Two rows: orientable and non-orientable
                            var row1Y = 100; // orientable
                            var row2Y = 250; // non-orientable

                            // Row labels
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Orientable:', 15, row1Y - 40);

                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Non-orientable:', 15, row2Y - 40);

                            // Orientable surfaces
                            var oSurfaces = [
                                { name: 'Sphere', g: 0, chi: 2 },
                                { name: 'Torus', g: 1, chi: 0 },
                                { name: 'Double\nTorus', g: 2, chi: -2 },
                                { name: 'Triple\nTorus', g: 3, chi: -4 },
                                { name: '...', g: -1, chi: null }
                            ];

                            var colW = (W - 40) / oSurfaces.length;

                            for (var i = 0; i < oSurfaces.length; i++) {
                                var s = oSurfaces[i];
                                var sx = 30 + i * colW + colW / 2;

                                if (s.g === -1) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '24px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('...', sx, row1Y);
                                    continue;
                                }

                                // Draw surface symbol
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                if (s.g === 0) {
                                    ctx.beginPath();
                                    ctx.arc(sx, row1Y, 25, 0, Math.PI * 2);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.blue + '22';
                                    ctx.fill();
                                } else {
                                    // Draw g-holed torus symbol
                                    var tw = Math.min(30, 60 / s.g);
                                    var startX = sx - (s.g * tw) / 2 + tw / 2;
                                    for (var gi = 0; gi < s.g; gi++) {
                                        var hx = startX + gi * tw;
                                        ctx.beginPath();
                                        ctx.ellipse(hx, row1Y, tw * 0.4, 25, 0, 0, Math.PI * 2);
                                        ctx.stroke();
                                        // hole
                                        ctx.fillStyle = viz.colors.bg;
                                        ctx.beginPath();
                                        ctx.ellipse(hx, row1Y, tw * 0.15, 10, 0, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.strokeStyle = viz.colors.teal;
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.ellipse(hx, row1Y, tw * 0.15, 10, 0, 0, Math.PI * 2);
                                        ctx.stroke();
                                        ctx.strokeStyle = viz.colors.blue;
                                        ctx.lineWidth = 2;
                                    }
                                }

                                // Name and chi
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                var lines = s.name.split('\n');
                                for (var li = 0; li < lines.length; li++) {
                                    ctx.fillText(lines[li], sx, row1Y + 38 + li * 14);
                                }

                                ctx.fillStyle = viz.colors.gold;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.fillText('\u03C7 = ' + s.chi, sx, row1Y + 38 + lines.length * 14 + 4);
                            }

                            // Non-orientable surfaces
                            var nSurfaces = [
                                { name: 'Projective\nPlane', k: 1, chi: 1 },
                                { name: 'Klein\nBottle', k: 2, chi: 0 },
                                { name: '3 Proj.\nPlanes', k: 3, chi: -1 },
                                { name: '4 Proj.\nPlanes', k: 4, chi: -2 },
                                { name: '...', k: -1, chi: null }
                            ];

                            for (var j = 0; j < nSurfaces.length; j++) {
                                var ns = nSurfaces[j];
                                var nsx = 30 + j * colW + colW / 2;

                                if (ns.k === -1) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '24px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('...', nsx, row2Y);
                                    continue;
                                }

                                // Draw non-orientable symbol (cross-cap indicator)
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(nsx, row2Y, 25, 0, Math.PI * 2);
                                ctx.stroke();
                                // Cross inside to indicate non-orientable
                                ctx.strokeStyle = viz.colors.red + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(nsx - 10, row2Y - 10);
                                ctx.lineTo(nsx + 10, row2Y + 10);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(nsx + 10, row2Y - 10);
                                ctx.lineTo(nsx - 10, row2Y + 10);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(ns.k.toString(), nsx, row2Y + 5);

                                // Name and chi
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '11px -apple-system,sans-serif';
                                var nlines = ns.name.split('\n');
                                for (var nli = 0; nli < nlines.length; nli++) {
                                    ctx.fillText(nlines[nli], nsx, row2Y + 38 + nli * 14);
                                }

                                ctx.fillStyle = viz.colors.gold;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.fillText('\u03C7 = ' + ns.chi, nsx, row2Y + 38 + nlines.length * 14 + 4);
                            }

                            // Bottom note
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Every compact surface is completely determined by \u03C7 and orientability.', W / 2, H - 15);
                        }

                        drawChart();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A compact, orientable surface has Euler characteristic \\(\\chi = -8\\). What surface is it? How many holes does it have?',
                    hint: 'Use \\(\\chi = 2 - 2g\\) and solve for \\(g\\).',
                    solution: 'From \\(-8 = 2 - 2g\\), we get \\(g = 5\\). This is a 5-holed torus (the connected sum of 5 tori).'
                },
                {
                    question: 'Is there a compact, non-orientable surface with Euler characteristic \\(\\chi = 2\\)?',
                    hint: 'For \\(k\\) projective planes, \\(\\chi = 2 - k\\).',
                    solution: 'From \\(2 = 2 - k\\), we get \\(k = 0\\). But \\(k = 0\\) means no projective planes, which gives us the sphere, and the sphere is orientable. So no, there is no compact non-orientable surface with \\(\\chi = 2\\). The only surface with \\(\\chi = 2\\) is the sphere.'
                },
                {
                    question: 'Two surfaces have the same Euler characteristic \\(\\chi = 0\\). One is the torus, and the other is the Klein bottle. Explain why they are not homeomorphic despite having the same \\(\\chi\\).',
                    hint: 'What is the second invariant in the classification theorem?',
                    solution: 'The classification theorem says a surface is determined by \\(\\chi\\) <em>and</em> orientability. The torus is orientable (two-sided) and the Klein bottle is non-orientable (one-sided). Since they differ in orientability, they are not homeomorphic, even though both have \\(\\chi = 0\\).'
                }
            ]
        }
    ]
});
