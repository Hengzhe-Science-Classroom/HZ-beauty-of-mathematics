// === Chapter 12: Euler's Formula V - E + F = 2 ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: "Euler's Formula V\u2212E+F=2",
    subtitle: 'The equation that launched topology: counting vertices, edges, and faces reveals a hidden constant',
    sections: [
        // ========== SECTION 1: Euler, the master of us all ==========
        {
            id: 'sec12-euler-master',
            title: 'Euler \u2014 the master of us all',
            content: `
<h2>12.1 Euler \u2014 the Master of Us All</h2>

<div class="env-block intuition">
<strong>A mind beyond comparison.</strong> If mathematics were an ocean, Leonhard Euler (1707\u20131783) would be its most prolific explorer. He published more pages of mathematics than any other human being in history, and he did so across virtually every branch of the subject that existed in his time. His collected works, the <em>Opera Omnia</em>, fill over 80 large volumes and contain roughly 866 distinct papers. Even after he went completely blind in 1771, his output <em>increased</em>. He would dictate papers to his assistants, often composing entire treatises from memory.
</div>

<p>Euler was born in Basel, Switzerland. His father, a pastor and amateur mathematician, arranged for young Leonhard to study under Johann Bernoulli, one of the greatest mathematicians of the era. Bernoulli quickly recognized the boy's extraordinary talent. By age 20, Euler had already won a prize from the Paris Academy of Sciences for his analysis of the optimal placement of masts on ships, despite having never seen an ocean vessel.</p>

<p>His contributions span an astonishing range. In <strong>analysis</strong>, he systematized the use of functions, introduced the notation \\(f(x)\\), and developed the theory of infinite series. In <strong>number theory</strong>, he proved Fermat's Little Theorem and laid groundwork that would eventually lead to the prime number theorem. In <strong>physics</strong>, he formulated the equations of fluid dynamics (the Euler equations) and contributed to optics, astronomy, and mechanics. In <strong>graph theory</strong>, his solution of the K&ouml;nigsberg bridge problem is considered the birth of the entire field.</p>

<p>But today we focus on one particular gem from 1750: a simple formula connecting the vertices, edges, and faces of a polyhedron. It is so fundamental that the great mathematician who called Euler "the master of us all" (Pierre-Simon Laplace) could not have found a better illustration of the title.</p>

<div class="env-block remark">
<strong>A formula with many names.</strong> The formula \\(V - E + F = 2\\) is sometimes called the <em>Euler polyhedron formula</em>, the <em>Euler characteristic formula</em>, or simply <em>Euler's formula</em>. Do not confuse it with Euler's other famous formula, \\(e^{i\\pi} + 1 = 0\\), which connects five fundamental constants. Euler had so many results that several different theorems carry his name.
</div>

<p>What makes \\(V - E + F = 2\\) so remarkable? On the surface it is a statement about counting: take any convex polyhedron (like a cube or a tetrahedron), count its vertices \\(V\\), its edges \\(E\\), and its faces \\(F\\), and you will always get the same answer when you compute \\(V - E + F\\). Always 2. No matter how complicated the polyhedron, as long as it has no holes. This constancy hints at something much deeper than geometry; it is a topological invariant, a quantity that survives any continuous deformation of the shape. Euler did not know this at the time, but his little counting formula would grow into one of the pillars of modern mathematics: algebraic topology.</p>

<p>Let us begin by doing exactly what Euler did: counting.</p>
`,
            visualizations: [
                {
                    id: 'viz-euler-portrait',
                    title: "Euler's Incredible Output",
                    description: 'A visual comparison of Euler\'s publication count against other great mathematicians. Each dot represents approximately 10 publications.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var data = [
                            { name: 'Euler', count: 866, color: viz.colors.gold },
                            { name: 'Cayley', count: 967, color: viz.colors.blue },
                            { name: 'Erd\u0151s', count: 1525, color: viz.colors.teal },
                            { name: 'Gauss', count: 155, color: viz.colors.orange },
                            { name: 'Riemann', count: 68, color: viz.colors.purple },
                            { name: 'Newton', count: 98, color: viz.colors.green }
                        ];

                        viz.clear();
                        ctx.fillStyle = viz.colors.bg;
                        ctx.fillRect(0, 0, W, H);

                        var barW = 60;
                        var gap = 20;
                        var totalW = data.length * barW + (data.length - 1) * gap;
                        var startX = (W - totalW) / 2;
                        var maxCount = 1600;
                        var barArea = H - 100;

                        // Title
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 16px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Publication Counts of Great Mathematicians', W / 2, 28);

                        for (var i = 0; i < data.length; i++) {
                            var d = data[i];
                            var x = startX + i * (barW + gap);
                            var barH = (d.count / maxCount) * barArea;
                            var y = H - 40 - barH;

                            // Bar
                            ctx.fillStyle = d.color + '88';
                            ctx.fillRect(x, y, barW, barH);
                            ctx.strokeStyle = d.color;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(x, y, barW, barH);

                            // Count
                            ctx.fillStyle = d.color;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(d.count.toString(), x + barW / 2, y - 8);

                            // Name
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText(d.name, x + barW / 2, H - 22);
                        }

                        // Highlight Euler
                        ctx.fillStyle = viz.colors.gold;
                        ctx.font = '11px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Euler: 866 papers, 80+ volumes of collected works', W / 2, H - 4);
                    }
                }
            ],
            exercises: [
                {
                    question: 'Euler published approximately 866 papers over a career spanning about 57 years (from age 19 to 76). How many papers per year is that, on average? How does that compare to a modern researcher who publishes 3 papers per year?',
                    hint: 'Divide 866 by 57 for the annual rate, then divide by 3.',
                    solution: 'Euler averaged about \\(866 / 57 \\approx 15.2\\) papers per year. That is roughly 5 times the rate of a prolific modern researcher. And Euler did this across multiple fields simultaneously, without computers, internet, or even electric light.'
                },
                {
                    question: 'Euler went completely blind in 1771 and died in 1783. In those 12 blind years he produced roughly half of his total output. Approximately how many papers did he write while blind?',
                    hint: 'Half of 866.',
                    solution: 'Approximately \\(866 / 2 \\approx 433\\) papers were produced after Euler lost his sight. That is about 36 papers per year while blind, an astonishing feat of mental calculation and memory.'
                }
            ]
        },

        // ========== SECTION 2: Counting vertices, edges, and faces ==========
        {
            id: 'sec12-counting',
            title: 'Counting vertices, edges, and faces',
            content: `
<h2>12.2 Counting Vertices, Edges, and Faces</h2>

<p>Before we can appreciate Euler's formula, we need to be precise about what we are counting. A <strong>polyhedron</strong> is a three-dimensional solid bounded by flat polygonal faces. Think of a crystal, a die, or a gemstone. Every polyhedron has three kinds of building blocks:</p>

<div class="env-block definition">
<strong>Vertices, Edges, and Faces.</strong>
<ul>
<li>A <strong>vertex</strong> (plural: vertices) is a corner point where edges meet.</li>
<li>An <strong>edge</strong> is a line segment where two faces meet.</li>
<li>A <strong>face</strong> is a flat polygonal surface.</li>
</ul>
We denote the number of vertices by \\(V\\), the number of edges by \\(E\\), and the number of faces by \\(F\\).
</div>

<p>Let us practice counting with some familiar shapes:</p>

<p><strong>The Tetrahedron</strong> (triangular pyramid): Imagine a pyramid with a triangular base. It has 4 triangular faces, 4 vertices (3 on the base, 1 at the apex), and 6 edges (3 on the base, 3 going up to the apex). So \\(V = 4\\), \\(E = 6\\), \\(F = 4\\). Euler's sum: \\(V - E + F = 4 - 6 + 4 = 2\\). Check!</p>

<p><strong>The Cube</strong>: The most familiar polyhedron. It has 8 vertices, 12 edges, and 6 faces (all squares). Euler's sum: \\(V - E + F = 8 - 12 + 6 = 2\\). Check!</p>

<p><strong>The Octahedron</strong>: Two square-based pyramids glued at the base. It has 6 vertices, 12 edges, and 8 triangular faces. Euler's sum: \\(6 - 12 + 8 = 2\\). Check!</p>

<p><strong>The Dodecahedron</strong>: One of the most beautiful solids in geometry, with 12 pentagonal faces. It has 20 vertices, 30 edges, and 12 faces. Euler's sum: \\(20 - 30 + 12 = 2\\). Check!</p>

<p><strong>The Icosahedron</strong>: 20 triangular faces, like a roughly spherical gem. It has 12 vertices, 30 edges, and 20 faces. Euler's sum: \\(12 - 30 + 20 = 2\\). Check!</p>

<div class="env-block remark">
<strong>The five Platonic solids.</strong> The tetrahedron, cube, octahedron, dodecahedron, and icosahedron are the five <em>Platonic solids</em>, the only convex polyhedra where every face is the same regular polygon and the same number of faces meet at each vertex. The ancient Greeks knew all five, and Plato associated them with the classical elements: earth (cube), fire (tetrahedron), air (octahedron), water (icosahedron), and the cosmos (dodecahedron). For all five, \\(V - E + F = 2\\).
</div>

<p>Now try it yourself with the interactive explorer below. You can click to place vertices and connect edges on a flat graph, and watch the Euler count update in real time.</p>

<div class="viz-placeholder" data-viz="viz-planar-graph"></div>

<p>Notice something wonderful: it does not matter <em>which</em> polyhedron you pick. Tetrahedron, cube, dodecahedron, or even a bizarre shape with hundreds of faces. As long as the polyhedron is convex (no dents or holes), the answer is always 2. This is the content of Euler's theorem.</p>
`,
            visualizations: [
                {
                    id: 'viz-planar-graph',
                    title: 'Interactive Planar Graph: Track V \u2212 E + F',
                    description: 'Click on the canvas to add vertices. Click one vertex, then another to add an edge between them. The counter shows V \u2212 E + F in real time. For a connected planar graph, it equals 2 (counting the outer face).',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var vertices = [];
                        var edges = [];
                        var selectedVertex = -1;

                        function countFaces() {
                            // For connected planar graph: F = E - V + 2
                            // But we count using the actual formula
                            if (vertices.length === 0) return 0;
                            var V = vertices.length;
                            var E = edges.length;
                            var F = E - V + 2;
                            return Math.max(F, 1);
                        }

                        function draw() {
                            viz.clear();

                            // Grid background
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = 0; gx < W; gx += 40) {
                                ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
                            }
                            for (var gy = 0; gy < H; gy += 40) {
                                ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
                            }

                            // Edges
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            for (var i = 0; i < edges.length; i++) {
                                var e = edges[i];
                                var a = vertices[e[0]], b = vertices[e[1]];
                                ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                            }

                            // Vertices
                            for (var j = 0; j < vertices.length; j++) {
                                var v = vertices[j];
                                var isSelected = (j === selectedVertex);
                                ctx.fillStyle = isSelected ? viz.colors.orange : viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(v.x, v.y, isSelected ? 10 : 7, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText((j + 1).toString(), v.x, v.y);
                            }

                            // Counter display
                            var V = vertices.length;
                            var E = edges.length;
                            var F = V > 0 ? E - V + 2 : 0;
                            var euler = V > 0 ? V - E + F : 0;

                            ctx.fillStyle = viz.colors.bg + 'dd';
                            ctx.fillRect(10, 10, 280, 75);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(10, 10, 280, 75);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('V = ' + V + '    E = ' + E + '    F = ' + F, 20, 18);

                            ctx.fillStyle = viz.colors.gold;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.fillText('V \u2212 E + F = ' + euler, 20, 44);

                            // Instructions
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Click to add vertices. Click vertex then another to add edge.', W / 2, H - 15);

                            if (selectedVertex >= 0) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Vertex ' + (selectedVertex + 1) + ' selected. Click another to connect.', W / 2, H - 32);
                            }
                        }

                        function findVertex(px, py) {
                            for (var i = 0; i < vertices.length; i++) {
                                var dx = vertices[i].x - px;
                                var dy = vertices[i].y - py;
                                if (Math.sqrt(dx * dx + dy * dy) < 15) return i;
                            }
                            return -1;
                        }

                        function hasEdge(a, b) {
                            for (var i = 0; i < edges.length; i++) {
                                if ((edges[i][0] === a && edges[i][1] === b) || (edges[i][0] === b && edges[i][1] === a)) return true;
                            }
                            return false;
                        }

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var px = e.clientX - rect.left;
                            var py = e.clientY - rect.top;

                            var clickedV = findVertex(px, py);

                            if (clickedV >= 0) {
                                if (selectedVertex >= 0 && selectedVertex !== clickedV) {
                                    if (!hasEdge(selectedVertex, clickedV)) {
                                        edges.push([selectedVertex, clickedV]);
                                    }
                                    selectedVertex = -1;
                                } else {
                                    selectedVertex = clickedV;
                                }
                            } else {
                                if (py > 90 && py < H - 40) {
                                    vertices.push({ x: px, y: py });
                                    selectedVertex = -1;
                                }
                            }
                            draw();
                        });

                        VizEngine.createButton(controls, 'Clear All', function() {
                            vertices = [];
                            edges = [];
                            selectedVertex = -1;
                            draw();
                        });

                        VizEngine.createButton(controls, 'Make Cube Graph', function() {
                            vertices = [];
                            edges = [];
                            selectedVertex = -1;
                            var cx = W / 2, cy = H / 2;
                            var outer = 120, inner = 60;
                            for (var k = 0; k < 4; k++) {
                                var ang = k * Math.PI / 2 - Math.PI / 4;
                                vertices.push({ x: cx + outer * Math.cos(ang), y: cy + outer * Math.sin(ang) });
                            }
                            for (var k2 = 0; k2 < 4; k2++) {
                                var ang2 = k2 * Math.PI / 2 - Math.PI / 4;
                                vertices.push({ x: cx + inner * Math.cos(ang2), y: cy + inner * Math.sin(ang2) });
                            }
                            edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
                            draw();
                        });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A <strong>triangular prism</strong> (like a Toblerone box) has two triangular faces and three rectangular faces. Count \\(V\\), \\(E\\), and \\(F\\), then verify that \\(V - E + F = 2\\).',
                    hint: 'The prism has two triangular ends (3 vertices each, but shared? No, they are separate). Think of the 3 top vertices and 3 bottom vertices.',
                    solution: 'A triangular prism has \\(V = 6\\) (3 top + 3 bottom), \\(E = 9\\) (3 top + 3 bottom + 3 vertical), and \\(F = 5\\) (2 triangles + 3 rectangles). So \\(V - E + F = 6 - 9 + 5 = 2\\). Check!'
                },
                {
                    question: 'A <strong>soccer ball</strong> (truncated icosahedron) has 12 pentagonal faces and 20 hexagonal faces, for a total of \\(F = 32\\). It has \\(V = 60\\) vertices. How many edges does it have? Verify Euler\'s formula.',
                    hint: 'Each pentagonal face has 5 edges and each hexagonal face has 6 edges. But each edge is shared by exactly two faces. So \\(E = (12 \\times 5 + 20 \\times 6) / 2\\).',
                    solution: 'Total edge-counts from faces: \\(12 \\times 5 + 20 \\times 6 = 60 + 120 = 180\\). Since each edge borders two faces, \\(E = 180 / 2 = 90\\). Check: \\(V - E + F = 60 - 90 + 32 = 2\\). Euler holds!'
                },
                {
                    question: 'What happens if you try to compute \\(V - E + F\\) for a single triangle (a flat polygon, not a solid)? Consider the triangle as having 3 vertices, 3 edges, and 2 faces (front and back, or inside and outside in the plane). Does the formula still work?',
                    hint: 'In the plane, a triangle divides the plane into 2 regions: the interior and the exterior (unbounded).',
                    solution: 'For a triangle in the plane: \\(V = 3\\), \\(E = 3\\), \\(F = 2\\) (interior + exterior). So \\(V - E + F = 3 - 3 + 2 = 2\\). The formula works for planar graphs too! This is actually the more general version of Euler\'s formula.'
                }
            ]
        },

        // ========== SECTION 3: V - E + F = 2 for every convex polyhedron ==========
        {
            id: 'sec12-vef2',
            title: 'V\u2212E+F=2 for every convex polyhedron',
            content: `
<h2>12.3 V \u2212 E + F = 2 for Every Convex Polyhedron</h2>

<div class="env-block theorem">
<strong>Euler's Polyhedron Formula (1750).</strong> For any convex polyhedron (or, more generally, any polyhedron that is topologically equivalent to a sphere),
\\[
V - E + F = 2
\\]
where \\(V\\) is the number of vertices, \\(E\\) is the number of edges, and \\(F\\) is the number of faces.
</div>

<p>This formula is both simple and profound. It tells us that no matter how we sculpt a convex polyhedron, no matter how many faces we carve, the alternating sum \\(V - E + F\\) remains stubbornly fixed at 2. It is as if the number 2 is woven into the fabric of sphere-like shapes.</p>

<p>Let us verify this once more with the five Platonic solids, displayed together:</p>

<table class="data-table" style="margin:16px auto;border-collapse:collapse;text-align:center;color:#c9d1d9;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:6px 14px;">Solid</th><th style="padding:6px 14px;">V</th><th style="padding:6px 14px;">E</th><th style="padding:6px 14px;">F</th><th style="padding:6px 14px;">V\u2212E+F</th></tr>
<tr><td>Tetrahedron</td><td>4</td><td>6</td><td>4</td><td style="color:#ffd700;font-weight:bold;">2</td></tr>
<tr><td>Cube</td><td>8</td><td>12</td><td>6</td><td style="color:#ffd700;font-weight:bold;">2</td></tr>
<tr><td>Octahedron</td><td>6</td><td>12</td><td>8</td><td style="color:#ffd700;font-weight:bold;">2</td></tr>
<tr><td>Dodecahedron</td><td>20</td><td>30</td><td>12</td><td style="color:#ffd700;font-weight:bold;">2</td></tr>
<tr><td>Icosahedron</td><td>12</td><td>30</td><td>20</td><td style="color:#ffd700;font-weight:bold;">2</td></tr>
</table>

<p>The number 2 appears every single time. It works for the Platonic solids, but also for any convex polyhedron you can imagine: prisms, antiprisms, truncated solids, and even strange irregular polyhedra with faces of all different shapes and sizes.</p>

<div class="viz-placeholder" data-viz="viz-polyhedra-wireframe"></div>

<p>But the formula goes beyond three dimensions in spirit. The same counting works for any <strong>connected planar graph</strong>. If you draw a network of vertices and edges on a flat piece of paper such that no edges cross, and count the regions (faces) the edges create (including the unbounded outer region), you get \\(V - E + F = 2\\).</p>

<div class="env-block example">
<strong>Example: The Petersen Graph.</strong> Some graphs cannot be drawn in the plane without crossings. For these non-planar graphs, our formula does not directly apply (you would need to embed them on a different surface). The Petersen graph, a famous graph with 10 vertices and 15 edges, is one such example. It cannot live on the sphere, so \\(V - E + F = 2\\) does not hold for it on the plane.
</div>

<p>The number 2 in Euler's formula is not just a coincidence or a numerical curiosity. It is what mathematicians call the <strong>Euler characteristic</strong> of the sphere, denoted \\(\\chi\\) (the Greek letter chi). For a sphere (or anything that can be continuously deformed into a sphere), \\(\\chi = 2\\). In the next section we will see <em>why</em> this works, and after that, what happens for shapes that are <em>not</em> sphere-like.</p>
`,
            visualizations: [
                {
                    id: 'viz-polyhedra-wireframe',
                    title: '3D Polyhedra Wireframes with V, E, F Counts',
                    description: 'Rotating wireframe renderings of the five Platonic solids with their vertex, edge, and face counts.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        // Define Platonic solid vertices and edges
                        var solids = {
                            tetrahedron: {
                                name: 'Tetrahedron', V: 4, E: 6, F: 4,
                                verts: [[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]],
                                edges: [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]
                            },
                            cube: {
                                name: 'Cube', V: 8, E: 12, F: 6,
                                verts: [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],
                                edges: [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
                            },
                            octahedron: {
                                name: 'Octahedron', V: 6, E: 12, F: 8,
                                verts: [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],
                                edges: [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]]
                            }
                        };

                        var currentSolid = 'tetrahedron';

                        function project(v3, angle, cx, cy, scl) {
                            var cosA = Math.cos(angle), sinA = Math.sin(angle);
                            var x = v3[0] * cosA - v3[2] * sinA;
                            var z = v3[0] * sinA + v3[2] * cosA;
                            var cosB = Math.cos(0.4), sinB = Math.sin(0.4);
                            var y2 = v3[1] * cosB - z * sinB;
                            var perspective = 4 / (4 + z * sinA * 0.3);
                            return [cx + x * scl * perspective, cy - y2 * scl * perspective];
                        }

                        function drawSolid(t) {
                            viz.clear();
                            var s = solids[currentSolid];
                            var angle = t * 0.001;
                            var cx = W / 2, cy = H / 2 - 20;
                            var scl = 80;

                            // Project all vertices
                            var proj = [];
                            for (var i = 0; i < s.verts.length; i++) {
                                proj.push(project(s.verts[i], angle, cx, cy, scl));
                            }

                            // Draw edges
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            for (var j = 0; j < s.edges.length; j++) {
                                var a = proj[s.edges[j][0]], b = proj[s.edges[j][1]];
                                ctx.beginPath();
                                ctx.moveTo(a[0], a[1]);
                                ctx.lineTo(b[0], b[1]);
                                ctx.stroke();
                            }

                            // Draw vertices
                            for (var k = 0; k < proj.length; k++) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(proj[k][0], proj[k][1], 5, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Info box
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(15, 15, 200, 80);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText(s.name, 25, 38);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('V = ' + s.V + '  E = ' + s.E + '  F = ' + s.F, 25, 58);

                            ctx.fillStyle = viz.colors.gold;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('V \u2212 E + F = ' + (s.V - s.E + s.F), 25, 80);
                        }

                        VizEngine.createButton(controls, 'Tetrahedron', function() { currentSolid = 'tetrahedron'; });
                        VizEngine.createButton(controls, 'Cube', function() { currentSolid = 'cube'; });
                        VizEngine.createButton(controls, 'Octahedron', function() { currentSolid = 'octahedron'; });

                        viz.animate(drawSolid);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'An <strong>antiprism</strong> is formed by placing two parallel polygons and connecting them with a zig-zag band of triangles. A square antiprism has two squares connected by 8 triangles. Find \\(V\\), \\(E\\), and \\(F\\), then check Euler\'s formula.',
                    hint: 'The two squares give \\(4 + 4 = 8\\) vertices. Each square has 4 edges; the zig-zag band adds more edges. Count the triangular faces.',
                    solution: 'A square antiprism has \\(V = 8\\) (4 top + 4 bottom), \\(F = 10\\) (2 squares + 8 triangles), and \\(E = 16\\) (4 top edges + 4 bottom edges + 8 lateral edges). Check: \\(V - E + F = 8 - 16 + 10 = 2\\).'
                },
                {
                    question: 'If a convex polyhedron has all triangular faces and 12 vertices, how many edges and faces does it have?',
                    hint: 'Every face is a triangle (3 edges per face), and each edge is shared by 2 faces, so \\(3F = 2E\\). Combine with \\(V - E + F = 2\\).',
                    solution: 'From \\(3F = 2E\\) we get \\(F = 2E/3\\). Substituting into \\(V - E + F = 2\\): \\(12 - E + 2E/3 = 2\\), so \\(-E/3 = -10\\), giving \\(E = 30\\) and \\(F = 20\\). This is the icosahedron!'
                }
            ]
        },

        // ========== SECTION 4: Why does it work? ==========
        {
            id: 'sec12-why',
            title: 'Why does it work?',
            content: `
<h2>12.4 Why Does It Work?</h2>

<p>We have verified Euler's formula for many polyhedra. But <em>why</em> is it always 2? There is a beautiful and intuitive argument that gives us a window into the reasoning, without requiring heavy machinery. The key idea is to imagine <strong>deforming</strong> any convex polyhedron into a flat planar graph, and then simplifying that graph step by step.</p>

<h3>The Argument by Flattening</h3>

<p>Imagine your convex polyhedron is made of rubber. Here is the recipe:</p>

<p><strong>Step 1: Remove one face.</strong> Pick any face of the polyhedron and remove it, leaving a hole. Now stretch the remaining rubber surface flat onto a table, like deflating a balloon through the hole. You now have a <strong>planar graph</strong>: a network of vertices and edges dividing the plane into regions (faces). The face you removed has become the infinite outer region.</p>

<p>At this point we have \\(V\\) vertices, \\(E\\) edges, and \\(F - 1\\) interior faces (since one face became the outside). We need to show that \\(V - E + (F - 1) = 1\\), which is the same as \\(V - E + F = 2\\).</p>

<p><strong>Step 2: Triangulate.</strong> If any face in the planar graph is not a triangle, add a diagonal to split it. Each diagonal adds 1 edge and 1 face, so \\(E\\) and \\(F\\) both increase by 1, and \\(V - E + F\\) stays the same. Keep going until every face is a triangle.</p>

<p><strong>Step 3: Remove triangles from the outside in.</strong> Now start peeling off triangles from the boundary of the graph:</p>
<ul>
<li>If a boundary triangle has one edge on the outside, removing that edge and face decreases both \\(E\\) and \\(F\\) by 1. The quantity \\(V - E + F\\) is unchanged.</li>
<li>If a boundary triangle has two edges on the outside, removing those two edges, the vertex between them, and the face decreases \\(V\\) by 1, \\(E\\) by 2, and \\(F\\) by 1. Again, \\(V - E + F\\) is unchanged (since \\(-1 - (-2) + (-1) = 0\\)).</li>
</ul>

<p><strong>Step 4: End state.</strong> Keep peeling until only a single triangle remains. For a single triangle: \\(V = 3\\), \\(E = 3\\), \\(F = 1\\) (just the interior; the outside does not count because we already subtracted 1 face in Step 1). So \\(V - E + F = 3 - 3 + 1 = 1\\).</p>

<p>Since every step preserved \\(V - E + F\\), and the final triangle gives 1, we conclude that the original flattened graph also had \\(V - E + (F - 1) = 1\\), hence \\(V - E + F = 2\\) for the original polyhedron.</p>

<div class="env-block intuition">
<strong>The deep insight.</strong> This argument reveals that Euler's formula is not really about geometry at all. It is about <em>topology</em>: the structure of connections. We never used any distances, angles, or coordinates. We only used the facts that faces can be triangulated, and boundary triangles can be peeled off. Any shape that can be continuously deformed into a sphere will give the same answer, because the deformation preserves the combinatorial structure of vertices, edges, and faces.
</div>

<div class="viz-placeholder" data-viz="viz-peel-demo"></div>

<p>This argument was essentially given by Cauchy in 1811, improving on Euler's original 1750 proof. It is one of the most beautiful proofs in all of mathematics: transparent, visual, and deeply revealing.</p>
`,
            visualizations: [
                {
                    id: 'viz-peel-demo',
                    title: 'Triangle Peeling Demonstration',
                    description: 'Watch how removing boundary triangles from a planar graph preserves V \u2212 E + F. Click "Peel" to remove one boundary triangle at a time.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        // Start with a triangulated hexagonal graph
                        var cx = W / 2, cy = H / 2 - 10;
                        var R = 120;
                        var allVerts = [{ x: cx, y: cy }]; // center
                        for (var i = 0; i < 6; i++) {
                            var angle = i * Math.PI / 3 - Math.PI / 2;
                            allVerts.push({ x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) });
                        }

                        var activeVerts = [];
                        var activeEdges = [];
                        var activeFaces = [];
                        var peelHistory = [];

                        function resetGraph() {
                            activeVerts = [];
                            for (var i2 = 0; i2 < allVerts.length; i2++) {
                                activeVerts.push({ x: allVerts[i2].x, y: allVerts[i2].y, alive: true });
                            }
                            // Edges: center to each outer vertex, and outer ring
                            activeEdges = [];
                            for (var j = 1; j <= 6; j++) {
                                activeEdges.push({ a: 0, b: j, alive: true });
                            }
                            for (var k = 1; k <= 6; k++) {
                                var next = k < 6 ? k + 1 : 1;
                                activeEdges.push({ a: k, b: next, alive: true });
                            }
                            // 6 triangular faces
                            activeFaces = [];
                            for (var m = 1; m <= 6; m++) {
                                var nxt = m < 6 ? m + 1 : 1;
                                activeFaces.push({ verts: [0, m, nxt], alive: true });
                            }
                            peelHistory = [];
                        }

                        function countAlive() {
                            var V = 0, E = 0, F = 0;
                            for (var i3 = 0; i3 < activeVerts.length; i3++) { if (activeVerts[i3].alive) V++; }
                            for (var j3 = 0; j3 < activeEdges.length; j3++) { if (activeEdges[j3].alive) E++; }
                            for (var k3 = 0; k3 < activeFaces.length; k3++) { if (activeFaces[k3].alive) F++; }
                            return { V: V, E: E, F: F };
                        }

                        function peel() {
                            // Find the first alive face that is on the boundary
                            for (var fi = activeFaces.length - 1; fi >= 0; fi--) {
                                if (!activeFaces[fi].alive) continue;
                                activeFaces[fi].alive = false;

                                // Find edges of this face that are only used by this face
                                var fv = activeFaces[fi].verts;
                                var faceEdges = [];
                                for (var ei = 0; ei < activeEdges.length; ei++) {
                                    if (!activeEdges[ei].alive) continue;
                                    var ea = activeEdges[ei].a, eb = activeEdges[ei].b;
                                    if (fv.indexOf(ea) >= 0 && fv.indexOf(eb) >= 0) {
                                        faceEdges.push(ei);
                                    }
                                }

                                // Check which edges to remove (those not shared with another alive face)
                                for (var fe = 0; fe < faceEdges.length; fe++) {
                                    var edgeIdx = faceEdges[fe];
                                    var shared = false;
                                    for (var fi2 = 0; fi2 < activeFaces.length; fi2++) {
                                        if (!activeFaces[fi2].alive) continue;
                                        var fv2 = activeFaces[fi2].verts;
                                        if (fv2.indexOf(activeEdges[edgeIdx].a) >= 0 && fv2.indexOf(activeEdges[edgeIdx].b) >= 0) {
                                            shared = true;
                                            break;
                                        }
                                    }
                                    if (!shared) {
                                        activeEdges[edgeIdx].alive = false;
                                    }
                                }

                                // Check which vertices to remove (those with no alive edges)
                                for (var vi = 0; vi < activeVerts.length; vi++) {
                                    if (!activeVerts[vi].alive) continue;
                                    var hasEdge = false;
                                    for (var ej = 0; ej < activeEdges.length; ej++) {
                                        if (!activeEdges[ej].alive) continue;
                                        if (activeEdges[ej].a === vi || activeEdges[ej].b === vi) {
                                            hasEdge = true;
                                            break;
                                        }
                                    }
                                    if (!hasEdge) activeVerts[vi].alive = false;
                                }

                                break;
                            }
                            draw();
                        }

                        function draw() {
                            viz.clear();

                            // Draw alive faces (filled)
                            for (var fi3 = 0; fi3 < activeFaces.length; fi3++) {
                                if (!activeFaces[fi3].alive) continue;
                                var fvs = activeFaces[fi3].verts;
                                ctx.fillStyle = viz.colors.blue + '22';
                                ctx.beginPath();
                                ctx.moveTo(activeVerts[fvs[0]].x, activeVerts[fvs[0]].y);
                                ctx.lineTo(activeVerts[fvs[1]].x, activeVerts[fvs[1]].y);
                                ctx.lineTo(activeVerts[fvs[2]].x, activeVerts[fvs[2]].y);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Draw alive edges
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            for (var ei2 = 0; ei2 < activeEdges.length; ei2++) {
                                if (!activeEdges[ei2].alive) continue;
                                var va = activeVerts[activeEdges[ei2].a];
                                var vb = activeVerts[activeEdges[ei2].b];
                                ctx.beginPath();
                                ctx.moveTo(va.x, va.y);
                                ctx.lineTo(vb.x, vb.y);
                                ctx.stroke();
                            }

                            // Draw alive vertices
                            for (var vi2 = 0; vi2 < activeVerts.length; vi2++) {
                                if (!activeVerts[vi2].alive) continue;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(activeVerts[vi2].x, activeVerts[vi2].y, 6, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Stats
                            var c = countAlive();
                            var euler = c.V - c.E + c.F;

                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(10, 10, 250, 55);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('V = ' + c.V + '   E = ' + c.E + '   F = ' + c.F + ' (inner)', 20, 30);

                            ctx.fillStyle = viz.colors.gold;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillText('V \u2212 E + F = ' + euler + '  (always 1 for inner faces)', 20, 55);
                        }

                        VizEngine.createButton(controls, 'Peel Triangle', peel);
                        VizEngine.createButton(controls, 'Reset', function() { resetGraph(); draw(); });

                        resetGraph();
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the peeling argument, when we add a diagonal to triangulate a non-triangular face, why does \\(V - E + F\\) stay the same?',
                    hint: 'Count what changes: the diagonal is a new edge, and it splits one face into two faces.',
                    solution: 'Adding a diagonal adds 1 edge (\\(E \\to E+1\\)) and splits one face into two (\\(F \\to F+1\\)). Since \\(V\\) does not change, \\(V - (E+1) + (F+1) = V - E + F\\). The quantity is preserved.'
                },
                {
                    question: 'Could you use this peeling argument for a polyhedron that has a hole through it (like a donut shape)?',
                    hint: 'Think about Step 1. Can you flatten a donut onto a plane without cutting?',
                    solution: 'No! The argument fails because a torus (donut shape) cannot be flattened onto a plane without cutting or tearing. When you remove one face from a torus, the remaining surface does not flatten to a simple planar graph. This is why \\(V - E + F \\neq 2\\) for a torus, as we explore in the next section.'
                }
            ]
        },

        // ========== SECTION 5: When V - E + F ≠ 2 (torus) ==========
        {
            id: 'sec12-torus',
            title: 'When V\u2212E+F \u2260 2 (torus)',
            content: `
<h2>12.5 When V \u2212 E + F &ne; 2: The Torus</h2>

<p>Everything we have seen so far concerned shapes that are, topologically speaking, spheres. Inflate a cube like a balloon and it becomes a sphere. Inflate a dodecahedron and you also get a sphere. But what about a shape with a <em>hole</em> through it?</p>

<p>A <strong>torus</strong> is the mathematical name for a donut shape. You can make one by taking a rectangular sheet, rolling it into a tube, and then bending the tube into a ring so the two circular ends meet. Unlike a sphere, a torus has a hole; you can thread a string through it.</p>

<div class="env-block definition">
<strong>Euler Characteristic.</strong> The quantity \\(\\chi = V - E + F\\) is called the <em>Euler characteristic</em> of the surface on which the graph is drawn. For a sphere, \\(\\chi = 2\\). For a torus, \\(\\chi = 0\\). In general, for an orientable surface with \\(g\\) holes (called the <em>genus</em>),
\\[
\\chi = 2 - 2g
\\]
</div>

<p>Let us verify that \\(\\chi = 0\\) for the torus with a concrete example. The simplest way to tile a torus is to think of it as a square with opposite edges identified (glued together). Here is a specific triangulation:</p>

<p>Take a square grid with the top edge glued to the bottom and the left edge glued to the right. Using a \\(3 \\times 3\\) grid of squares, each divided into 2 triangles, we get:</p>
<ul>
<li>\\(V = 9\\) vertices (the \\(3 \\times 3\\) grid points, where points on opposite edges are identified)</li>
<li>\\(E = 27\\) edges (18 from the square grid sides + 9 diagonals)</li>
<li>\\(F = 18\\) triangular faces</li>
</ul>
<p>Euler characteristic: \\(\\chi = 9 - 27 + 18 = 0\\). Exactly as predicted!</p>

<div class="env-block example">
<strong>A simpler example.</strong> You can tile the torus with just one vertex, 2 edges, and 1 face: take a square, identify opposite edges (creating the torus), and notice the 4 corners all become the same vertex. The 4 sides become 2 edges (top=bottom, left=right). The square itself is 1 face. So \\(V - E + F = 1 - 2 + 1 = 0\\). The minimal torus triangulation is remarkably economical.
</div>

<div class="viz-placeholder" data-viz="viz-torus-demo"></div>

<p>The Euler characteristic is a <strong>topological invariant</strong>. You can stretch, bend, compress, or twist a surface, and \\(\\chi\\) will not change, as long as you do not tear or glue. This makes it extraordinarily powerful: if two surfaces have different Euler characteristics, they cannot be topologically the same.</p>

<h3>The General Formula</h3>

<p>The formula \\(\\chi = 2 - 2g\\) gives us a complete table:</p>

<table class="data-table" style="margin:16px auto;border-collapse:collapse;text-align:center;color:#c9d1d9;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:6px 14px;">Surface</th><th style="padding:6px 14px;">Genus \\(g\\)</th><th style="padding:6px 14px;">\\(\\chi = 2-2g\\)</th></tr>
<tr><td>Sphere</td><td>0</td><td style="color:#ffd700;">2</td></tr>
<tr><td>Torus (donut)</td><td>1</td><td style="color:#ffd700;">0</td></tr>
<tr><td>Double torus</td><td>2</td><td style="color:#ffd700;">&minus;2</td></tr>
<tr><td>Triple torus</td><td>3</td><td style="color:#ffd700;">&minus;4</td></tr>
<tr><td>Genus \\(g\\)</td><td>\\(g\\)</td><td style="color:#ffd700;">\\(2-2g\\)</td></tr>
</table>

<div class="env-block intuition">
<strong>Why does a hole subtract 2?</strong> Intuitively, each hole in a surface provides an extra "way around" that disrupts the simple sphere-like structure. The peeling argument from Section 12.4 fails because you cannot flatten a surface with holes onto the plane without cutting. Each cut introduces new boundary edges and vertices that throw off the count by exactly 2.
</div>

<p>Euler's innocent formula about polyhedra opened the door to an entire branch of mathematics. In Chapter 13, we will dive deeper into the world of surfaces and topology, where stretching and bending are allowed, but cutting and gluing are not.</p>

<div class="viz-placeholder" data-viz="viz-genus-explorer"></div>
`,
            visualizations: [
                {
                    id: 'viz-torus-demo',
                    title: 'Torus: Euler Characteristic \u03C7 = 0',
                    description: 'A rotating wireframe torus. The grid on its surface shows vertices, edges, and faces. No matter how you subdivide it, V \u2212 E + F always equals 0.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;

                        var R = 90; // major radius
                        var r = 40; // minor radius
                        var nu = 20; // divisions around tube
                        var nv = 12; // divisions around ring

                        function torusPoint(u, v, angle) {
                            var cu = Math.cos(u), su = Math.sin(u);
                            var cv = Math.cos(v), sv = Math.sin(v);
                            var x0 = (R + r * cu) * cv;
                            var y0 = (R + r * cu) * sv;
                            var z0 = r * su;
                            // Rotate around Y axis
                            var ca = Math.cos(angle), sa = Math.sin(angle);
                            var x1 = x0 * ca - y0 * sa;
                            var y1 = x0 * sa + y0 * ca;
                            // Tilt
                            var ct = Math.cos(0.5), st = Math.sin(0.5);
                            var y2 = y1 * ct - z0 * st;
                            var z2 = y1 * st + z0 * ct;
                            return [W / 2 + x1, H / 2 - 20 + y2, z2];
                        }

                        function drawFrame(t) {
                            viz.clear();
                            var angle = t * 0.0005;

                            // Draw torus wireframe
                            ctx.strokeStyle = viz.colors.blue + '66';
                            ctx.lineWidth = 1;

                            // Latitude circles (u = const)
                            for (var iv = 0; iv < nv; iv++) {
                                var v0 = iv * 2 * Math.PI / nv;
                                ctx.beginPath();
                                var started = false;
                                for (var iu = 0; iu <= nu; iu++) {
                                    var u0 = iu * 2 * Math.PI / nu;
                                    var p = torusPoint(u0, v0, angle);
                                    if (!started) { ctx.moveTo(p[0], p[1]); started = true; }
                                    else ctx.lineTo(p[0], p[1]);
                                }
                                ctx.stroke();
                            }

                            // Longitude circles (v = const)
                            for (var iu2 = 0; iu2 < nu; iu2++) {
                                var u1 = iu2 * 2 * Math.PI / nu;
                                ctx.beginPath();
                                var started2 = false;
                                for (var iv2 = 0; iv2 <= nv; iv2++) {
                                    var v1 = iv2 * 2 * Math.PI / nv;
                                    var p2 = torusPoint(u1, v1, angle);
                                    if (!started2) { ctx.moveTo(p2[0], p2[1]); started2 = true; }
                                    else ctx.lineTo(p2[0], p2[1]);
                                }
                                ctx.stroke();
                            }

                            // Info
                            var Vtorus = nu * nv;
                            var Etorus = 2 * nu * nv;
                            var Ftorus = nu * nv;
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(10, 10, 260, 70);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Torus (genus 1)', 20, 30);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Grid: V=' + Vtorus + '  E=' + Etorus + '  F=' + Ftorus, 20, 50);
                            ctx.fillStyle = viz.colors.gold;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('\u03C7 = V\u2212E+F = ' + (Vtorus - Etorus + Ftorus), 20, 70);
                        }

                        viz.animate(drawFrame);
                        return viz;
                    }
                },
                {
                    id: 'viz-genus-explorer',
                    title: 'Genus Explorer: \u03C7 = 2 \u2212 2g',
                    description: 'Select a surface genus to see how the Euler characteristic changes. Each hole subtracts 2 from \u03C7.',
                    setup(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var W = viz.width, H = viz.height;
                        var genus = 0;

                        function draw() {
                            viz.clear();
                            var chi = 2 - 2 * genus;
                            var names = ['Sphere', 'Torus', 'Double Torus', 'Triple Torus', 'Genus 4 Surface'];
                            var name = genus < names.length ? names[genus] : 'Genus ' + genus + ' Surface';

                            // Draw surface representation
                            var cx = W / 2, cy = H / 2 - 20;

                            if (genus === 0) {
                                // Sphere
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 80, 0, Math.PI * 2);
                                ctx.stroke();
                                // Shading
                                var grad = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, 80);
                                grad.addColorStop(0, viz.colors.blue + '33');
                                grad.addColorStop(1, viz.colors.blue + '08');
                                ctx.fillStyle = grad;
                                ctx.fill();
                            } else {
                                // Draw genus-g surface as connected "donuts"
                                var totalWidth = genus * 100 + (genus - 1) * 20;
                                var startX = cx - totalWidth / 2 + 50;

                                for (var g = 0; g < genus; g++) {
                                    var hx = startX + g * 120;
                                    // Outer ellipse
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.ellipse(hx, cy, 50, 60, 0, 0, Math.PI * 2);
                                    ctx.stroke();
                                    // Inner hole
                                    ctx.fillStyle = viz.colors.bg;
                                    ctx.beginPath();
                                    ctx.ellipse(hx, cy, 20, 25, 0, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.ellipse(hx, cy, 20, 25, 0, 0, Math.PI * 2);
                                    ctx.stroke();
                                }

                                // Connect them
                                if (genus > 1) {
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 2;
                                    for (var g2 = 0; g2 < genus - 1; g2++) {
                                        var x1 = startX + g2 * 120 + 50;
                                        var x2 = startX + (g2 + 1) * 120 - 50;
                                        ctx.beginPath(); ctx.moveTo(x1, cy - 60); ctx.lineTo(x2, cy - 60); ctx.stroke();
                                        ctx.beginPath(); ctx.moveTo(x1, cy + 60); ctx.lineTo(x2, cy + 60); ctx.stroke();
                                    }
                                }
                            }

                            // Info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(name, cx, 30);

                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Genus g = ' + genus + '    (number of holes)', cx, 55);

                            ctx.fillStyle = viz.colors.gold;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.fillText('\u03C7 = 2 \u2212 2(' + genus + ') = ' + chi, cx, H - 30);
                        }

                        VizEngine.createSlider(controls, 'Genus g:', 0, 4, 0, 1, function(val) {
                            genus = Math.round(val);
                            draw();
                        });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A surface has Euler characteristic \\(\\chi = -6\\). What is its genus?',
                    hint: 'Use \\(\\chi = 2 - 2g\\).',
                    solution: 'From \\(-6 = 2 - 2g\\), we get \\(2g = 8\\), so \\(g = 4\\). This is a surface with 4 holes.'
                },
                {
                    question: 'Can you think of a real-world object that is topologically a torus (genus 1)? What about genus 2?',
                    hint: 'Think about objects with holes all the way through them.',
                    solution: 'A coffee mug (with its handle), a bagel, or a life preserver ring is genus 1 (one hole). A pair of scissors with two finger holes, or a pretzel with two holes, is genus 2. Your t-shirt (head hole, two arm holes, body hole) is actually a more complex surface!'
                },
                {
                    question: 'Verify \\(\\chi = 0\\) for the torus using the "minimal" tiling: 1 vertex, 2 edges, 1 face. Draw a square and mark which edges are identified to create a torus. Where do the 4 corners end up?',
                    hint: 'On a torus (square with opposite edges glued), all four corners of the square are identified to a single point.',
                    solution: 'Draw a square. Label the top and bottom edges as edge \\(a\\), and the left and right edges as edge \\(b\\). When you glue top to bottom and left to right, all four corners merge into one vertex. You have \\(V = 1\\), \\(E = 2\\) (edges \\(a\\) and \\(b\\)), \\(F = 1\\) (the square). So \\(\\chi = 1 - 2 + 1 = 0\\).'
                }
            ]
        }
    ]
});
