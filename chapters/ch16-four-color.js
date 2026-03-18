// === Chapter 16: The Four Color Theorem ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'The Four Color Theorem',
    subtitle: 'Can every map be colored with just four colors?',
    sections: [
        // ─────────────────────────────────────────────
        // Section 1: Coloring Maps
        // ─────────────────────────────────────────────
        {
            id: 'sec-coloring-maps',
            title: 'Coloring Maps',
            content: `
<h2>The Mapmaker's Puzzle</h2>

<p>Imagine you are a cartographer designing a map of the countries of Europe. You want to color each country so that no two countries sharing a border have the same color. (Countries that touch only at a single point, like Arizona and Colorado in the US, do not count as "sharing a border.") What is the minimum number of colors you need?</p>

<p>Try it yourself. Pick up some colored pencils and start with a simple map: three countries arranged in a triangle, each one bordering the other two. You clearly need three colors. Now add a fourth country that borders all three. You need a fourth color. Can you draw a map that <em>requires</em> a fifth color?</p>

<p>Go ahead and try. Draw the wildest, most tangled map you can imagine. You will find, no matter how hard you try, that four colors always suffice.</p>

<div class="env-block theorem">
<strong>The Four Color Theorem.</strong> Every map drawn on a flat surface (or a sphere) can be colored with at most four colors so that no two adjacent regions share the same color.
</div>

<p>This statement is simple enough for a child to understand, yet it took over a century to prove, and the eventual proof was one of the most controversial in the history of mathematics.</p>

<h3>Why Not Three?</h3>

<p>Three colors are not enough. Consider a map with four regions where each region borders every other region. Such a map is easy to draw: start with a circle divided into three "pie slices" (like a peace symbol). Each slice borders the other two, so you need three colors. Now place a thin ring around the outside that borders all three slices. This ring is adjacent to all three colors, so it needs a fourth.</p>

<div class="viz-placeholder" data-viz="viz-why-not-three"></div>

<h3>The Rules of Map Coloring</h3>

<div class="env-block definition">
<strong>Proper Map Coloring.</strong> A coloring of a map is <em>proper</em> if:
<ol>
<li>Every region is assigned exactly one color.</li>
<li>No two regions that share a boundary segment (not just a point) have the same color.</li>
</ol>
The <em>chromatic number</em> of a map is the smallest number of colors needed for a proper coloring.
</div>

<p>Some maps need fewer than four colors. A checkerboard pattern needs only two. A map of the states of the US mainland needs four (due to combinations like Nevada-California-Oregon-Idaho or similar clusters). The Four Color Theorem says that four is always enough, no matter how complicated the map.</p>

<div class="env-block intuition">
<strong>Intuition.</strong> Why should four be the magic number? Think about it from the perspective of a single region. It can have many neighbors, but those neighbors also border each other in complex ways. The geometric constraints of a flat map prevent every possible "conflict pattern" from occurring. On a torus (doughnut shape), you can draw maps requiring up to <em>seven</em> colors, because the topology allows more complex neighbor relationships.
</div>
`,
            visualizations: [
                {
                    id: 'viz-why-not-three',
                    title: 'Why Three Colors Are Not Enough',
                    description: 'This map has four regions, each bordering the other three. Three colors cannot handle the outer ring. Click regions to cycle through colors and see for yourself.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var cx = w / 2, cy = h / 2;
                        var R = Math.min(w, h) * 0.32;
                        var innerR = R * 0.65;
                        var palette = [viz.colors.bg, viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple];
                        var paletteNames = ['(none)', 'Blue', 'Orange', 'Green', 'Purple'];
                        // Regions: 0=outer ring, 1=top slice, 2=bottom-left slice, 3=bottom-right slice
                        var regionColors = [0, 0, 0, 0];
                        var conflicts = 0;

                        // Adjacency: outer touches all three slices; each slice touches the other two
                        var adj = [
                            [false, true, true, true],
                            [true, false, true, true],
                            [true, true, false, true],
                            [true, true, true, false]
                        ];

                        function checkConflicts() {
                            conflicts = 0;
                            for (var i = 0; i < 4; i++) {
                                for (var j = i + 1; j < 4; j++) {
                                    if (adj[i][j] && regionColors[i] > 0 && regionColors[i] === regionColors[j]) {
                                        conflicts++;
                                    }
                                }
                            }
                        }

                        function draw() {
                            viz.clear();

                            // outer ring
                            ctx.beginPath();
                            ctx.arc(cx, cy, R, 0, Math.PI * 2);
                            ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
                            ctx.fillStyle = regionColors[0] > 0 ? palette[regionColors[0]] + 'aa' : 'rgba(40,40,80,0.5)';
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
                            ctx.beginPath(); ctx.arc(cx, cy, innerR, 0, Math.PI * 2); ctx.stroke();

                            // three slices
                            var angles = [-Math.PI / 2, -Math.PI / 2 + 2 * Math.PI / 3, -Math.PI / 2 + 4 * Math.PI / 3];
                            for (var s = 0; s < 3; s++) {
                                var a1 = angles[s], a2 = angles[(s + 1) % 3];
                                ctx.beginPath();
                                ctx.moveTo(cx, cy);
                                ctx.arc(cx, cy, innerR, a1, a2);
                                ctx.closePath();
                                ctx.fillStyle = regionColors[s + 1] > 0 ? palette[regionColors[s + 1]] + 'aa' : 'rgba(40,40,80,0.5)';
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 2;
                                ctx.stroke();
                            }

                            // labels
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('Ring', cx, cy - R + 20);
                            // slice labels
                            for (var s2 = 0; s2 < 3; s2++) {
                                var midA = (angles[s2] + angles[(s2 + 1) % 3]) / 2;
                                if (s2 === 2) midA = angles[2] + (angles[0] + 2 * Math.PI - angles[2]) / 2;
                                var lr = innerR * 0.45;
                                ctx.fillText((s2 + 1).toString(), cx + lr * Math.cos(midA), cy + lr * Math.sin(midA));
                            }

                            // info
                            checkConflicts();
                            ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Click a region to cycle its color', 12, 12);
                            if (conflicts > 0) {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('Conflicts: ' + conflicts, 12, 32);
                            } else {
                                var allColored = regionColors.every(function(c) { return c > 0; });
                                if (allColored) {
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.fillText('Valid coloring! Colors used: ' + new Set(regionColors).size, 12, 32);
                                } else {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.fillText('Keep coloring...', 12, 32);
                                }
                            }

                            // color legend
                            for (var c = 1; c < palette.length; c++) {
                                ctx.fillStyle = palette[c];
                                ctx.fillRect(w - 120, 10 + (c - 1) * 22, 14, 14);
                                ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                                ctx.fillText(paletteNames[c], w - 100, 11 + (c - 1) * 22);
                            }
                        }

                        function hitTest(mx, my) {
                            var dx = mx - cx, dy = my - cy;
                            var dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist > R) return -1;
                            if (dist > innerR) return 0; // outer ring
                            // which slice?
                            var angle = Math.atan2(dy, dx);
                            var angles = [-Math.PI / 2, -Math.PI / 2 + 2 * Math.PI / 3, -Math.PI / 2 + 4 * Math.PI / 3];
                            // normalize
                            function normAngle(a) { return ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI); }
                            var na = normAngle(angle);
                            for (var s = 0; s < 3; s++) {
                                var a1 = normAngle(angles[s]);
                                var a2 = normAngle(angles[(s + 1) % 3]);
                                if (a1 < a2) {
                                    if (na >= a1 && na < a2) return s + 1;
                                } else {
                                    if (na >= a1 || na < a2) return s + 1;
                                }
                            }
                            return -1;
                        }

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            var region = hitTest(mx, my);
                            if (region >= 0) {
                                regionColors[region] = (regionColors[region] + 1) % palette.length;
                                draw();
                            }
                        });

                        VizEngine.createButton(controls, 'Reset Colors', function() {
                            regionColors = [0, 0, 0, 0]; draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Draw a map of 5 regions where each region touches exactly 2 others (like a ring of 5 countries). How many colors do you need?',
                    hint: 'Think about an odd cycle of regions: A borders B, B borders C, C borders D, D borders E, E borders A.',
                    solution: 'A ring of 5 regions (an odd cycle) requires 3 colors. You can color them in the pattern A-B-A-B-C going around the ring. If there were an even number of regions, 2 colors would suffice.'
                },
                {
                    question: 'Can you draw a map on a flat surface where 5 regions each border every other region? Why or why not?',
                    hint: 'Think about what this would mean in terms of graph theory. The complete graph \\(K_5\\) cannot be drawn on a flat surface without crossings.',
                    solution: 'No, you cannot. In graph theory terms, this would require embedding the complete graph \\(K_5\\) (5 vertices, every pair connected) in the plane. By Kuratowski\'s theorem, \\(K_5\\) is not planar. This is actually closely related to why four colors suffice: the structure that would <em>require</em> five colors simply cannot exist on a flat surface.'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 2: The Four Color Conjecture
        // ─────────────────────────────────────────────
        {
            id: 'sec-conjecture',
            title: 'The Four Color Conjecture',
            content: `
<h2>A Question Born from a Student's Curiosity</h2>

<p>The story begins in 1852 in London. Francis Guthrie, a young law student who also studied mathematics, was coloring a map of the counties of England. He noticed that four colors were enough and wondered: is this always true for any map? He mentioned the question to his brother Frederick, who was studying under the great mathematician Augustus De Morgan. De Morgan was intrigued and wrote to the even greater mathematician Sir William Rowan Hamilton about it.</p>

<p>Hamilton's reply was dismissive: "I am not likely to attempt your quaternion of colours very soon." He never did. But the question refused to go away. It circulated among mathematicians, who found it both fascinating and infuriating. The statement was simple, the evidence overwhelming, but a proof was elusive.</p>

<h3>Early Attempts</h3>

<p>In 1879, Alfred Kempe, a London barrister and amateur mathematician, published what he claimed was a proof. It was accepted by the mathematical community, and Kempe was elected to the Royal Society partly on its strength. For eleven years, everyone believed the Four Color Theorem was proven.</p>

<p>Then, in 1890, Percy Heawood found a fatal flaw in Kempe's argument. A key step in the proof, involving what Kempe called "chains" of alternating colors, did not work as claimed. Kempe's proof was broken.</p>

<div class="env-block remark">
<strong>Remark.</strong> Kempe's proof was wrong, but his ideas were not worthless. The concept of "Kempe chains" (paths of alternating colors that can be swapped to fix conflicts) became a fundamental tool in graph coloring theory. Sometimes a wrong proof contributes more to mathematics than no proof at all.
</div>

<p>Heawood, however, salvaged something from the wreckage. Using Kempe's methods, he proved that <em>five</em> colors always suffice. This was easy compared to four, but the gap between 5 and 4 would remain open for nearly another century.</p>

<h3>The Conjecture's Stubborn Resistance</h3>

<p>Over the following decades, many mathematicians attacked the problem. Some tried direct geometric arguments. Others translated the problem into the language of graph theory, where maps become networks of vertices (regions) and edges (borders). In this language, map coloring becomes <em>graph coloring</em>: assign colors to vertices so that no two connected vertices share a color.</p>

<div class="env-block definition">
<strong>Chromatic Number of a Graph.</strong> The <em>chromatic number</em> \\(\\chi(G)\\) of a graph \\(G\\) is the smallest number of colors needed to properly color the vertices of \\(G\\) (so that no two adjacent vertices have the same color). The Four Color Theorem states that every <em>planar graph</em> has \\(\\chi(G) \\leq 4\\).
</div>

<div class="viz-placeholder" data-viz="viz-map-to-graph"></div>

<p>A crucial insight came from Euler's formula (\\(V - E + F = 2\\), see Chapter 12). For a planar graph, Euler's formula limits how densely connected the graph can be. Specifically, every planar graph must have at least one vertex with 5 or fewer neighbors. This is the starting point for any proof attempt: you can always find a "small" vertex to work with.</p>

<p>The question became: can you remove that small vertex, color the remaining (simpler) map, and then add the vertex back and fix the coloring? The answer, frustratingly, is "sometimes yes, but the fixing can cascade into an uncontrollable mess." This is why the problem resisted for so long.</p>
`,
            visualizations: [
                {
                    id: 'viz-map-to-graph',
                    title: 'From Map to Graph',
                    description: 'A map (left) and its dual graph (right). Each region becomes a vertex; shared borders become edges. Coloring the map is equivalent to coloring the graph.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var midX = w / 2;
                        var colors4 = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple];

                        function draw() {
                            viz.clear();

                            // === LEFT SIDE: MAP ===
                            var mapCx = midX / 2, mapCy = h / 2;
                            var mapR = Math.min(midX, h) * 0.35;

                            // 5 regions: center circle + 4 quadrants around it
                            var regionCenters = [
                                [mapCx, mapCy],                              // center
                                [mapCx, mapCy - mapR * 0.7],                 // top
                                [mapCx + mapR * 0.7, mapCy],                 // right
                                [mapCx, mapCy + mapR * 0.7],                 // bottom
                                [mapCx - mapR * 0.7, mapCy]                  // left
                            ];
                            var regionColorIdx = [0, 1, 2, 3, 1]; // valid coloring

                            // Draw outer quadrant regions
                            // Top
                            ctx.beginPath(); ctx.moveTo(mapCx - mapR, mapCy); ctx.lineTo(mapCx - mapR, mapCy - mapR);
                            ctx.lineTo(mapCx + mapR, mapCy - mapR); ctx.lineTo(mapCx + mapR, mapCy);
                            ctx.arc(mapCx, mapCy, mapR * 0.3, 0, -Math.PI, true); ctx.closePath();
                            ctx.fillStyle = colors4[1] + '88'; ctx.fill(); ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 2; ctx.stroke();

                            // Right
                            ctx.beginPath(); ctx.moveTo(mapCx, mapCy - mapR); ctx.lineTo(mapCx + mapR, mapCy - mapR);
                            ctx.lineTo(mapCx + mapR, mapCy + mapR); ctx.lineTo(mapCx, mapCy + mapR);
                            ctx.arc(mapCx, mapCy, mapR * 0.3, Math.PI / 2, -Math.PI / 2, true); ctx.closePath();
                            ctx.fillStyle = colors4[2] + '88'; ctx.fill(); ctx.stroke();

                            // Bottom
                            ctx.beginPath(); ctx.moveTo(mapCx + mapR, mapCy); ctx.lineTo(mapCx + mapR, mapCy + mapR);
                            ctx.lineTo(mapCx - mapR, mapCy + mapR); ctx.lineTo(mapCx - mapR, mapCy);
                            ctx.arc(mapCx, mapCy, mapR * 0.3, Math.PI, 0, true); ctx.closePath();
                            ctx.fillStyle = colors4[3] + '88'; ctx.fill(); ctx.stroke();

                            // Left
                            ctx.beginPath(); ctx.moveTo(mapCx, mapCy + mapR); ctx.lineTo(mapCx - mapR, mapCy + mapR);
                            ctx.lineTo(mapCx - mapR, mapCy - mapR); ctx.lineTo(mapCx, mapCy - mapR);
                            ctx.arc(mapCx, mapCy, mapR * 0.3, -Math.PI / 2, Math.PI / 2, true); ctx.closePath();
                            ctx.fillStyle = colors4[1] + '88'; ctx.fill(); ctx.stroke();

                            // Center circle
                            ctx.beginPath(); ctx.arc(mapCx, mapCy, mapR * 0.3, 0, Math.PI * 2);
                            ctx.fillStyle = colors4[0] + '88'; ctx.fill(); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('C', mapCx, mapCy);
                            ctx.fillText('T', mapCx, mapCy - mapR * 0.65);
                            ctx.fillText('R', mapCx + mapR * 0.65, mapCy);
                            ctx.fillText('B', mapCx, mapCy + mapR * 0.65);
                            ctx.fillText('L', mapCx - mapR * 0.65, mapCy);

                            // === RIGHT SIDE: GRAPH ===
                            var gCx = midX + midX / 2, gCy = h / 2;
                            var gR = Math.min(midX, h) * 0.3;

                            var verts = [
                                [gCx, gCy],                                 // C
                                [gCx, gCy - gR],                            // T
                                [gCx + gR * Math.sin(Math.PI * 2 / 5 * 1), gCy - gR * Math.cos(Math.PI * 2 / 5 * 1)], // R approx
                                [gCx + gR * Math.sin(Math.PI * 2 / 5 * 2), gCy - gR * Math.cos(Math.PI * 2 / 5 * 2)], // B approx
                                [gCx - gR * Math.sin(Math.PI * 2 / 5 * 2), gCy - gR * Math.cos(Math.PI * 2 / 5 * 2)]  // L approx
                            ];

                            // Edges: C-T, C-R, C-B, C-L, T-R, R-B, B-L, L-T
                            var edges = [[0,1],[0,2],[0,3],[0,4],[1,2],[2,3],[3,4],[4,1]];
                            ctx.strokeStyle = 'rgba(200,200,255,0.4)'; ctx.lineWidth = 1.5;
                            edges.forEach(function(e) {
                                ctx.beginPath(); ctx.moveTo(verts[e[0]][0], verts[e[0]][1]);
                                ctx.lineTo(verts[e[1]][0], verts[e[1]][1]); ctx.stroke();
                            });

                            // Vertices
                            var labels = ['C', 'T', 'R', 'B', 'L'];
                            verts.forEach(function(v, i) {
                                ctx.fillStyle = colors4[regionColorIdx[i]];
                                ctx.beginPath(); ctx.arc(v[0], v[1], 14, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.arc(v[0], v[1], 14, 0, Math.PI * 2); ctx.stroke();
                                ctx.fillStyle = viz.colors.white; ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(labels[i], v[0], v[1]);
                            });

                            // Arrow between map and graph
                            ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(midX - 30, h / 2); ctx.lineTo(midX + 15, h / 2); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(midX + 15, h / 2); ctx.lineTo(midX + 5, h / 2 - 6); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(midX + 15, h / 2); ctx.lineTo(midX + 5, h / 2 + 6); ctx.stroke();

                            // Titles
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Map', midX / 2, 12);
                            ctx.fillText('Dual Graph', midX + midX / 2, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Petersen graph is a famous graph with 10 vertices and 15 edges. It is <em>not</em> planar. Does the Four Color Theorem apply to it?',
                    hint: 'The Four Color Theorem only applies to <em>planar</em> graphs.',
                    solution: 'No. The Four Color Theorem guarantees that every <em>planar</em> graph can be 4-colored, but says nothing about non-planar graphs. The Petersen graph has chromatic number 3 (it can be 3-colored), but this is a coincidence; other non-planar graphs may need more than 4 colors.'
                },
                {
                    question: 'Convert this simple map description into a graph: Three countries A, B, C form a row (A borders B, B borders C, but A does not border C). A fourth country D borders all three. How many vertices, edges, and what is the chromatic number?',
                    hint: 'Draw the graph with vertices A, B, C, D and edges for each border.',
                    solution: 'Vertices: 4 (A, B, C, D). Edges: 5 (A-B, B-C, D-A, D-B, D-C). The chromatic number is 3: color A and C the same color (they are not adjacent), B a second color, and D a third color.'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 3: A Century of Failed Proofs
        // ─────────────────────────────────────────────
        {
            id: 'sec-failed-proofs',
            title: 'A Century of Failed Proofs',
            content: `
<h2>The Most Tempting Trap in Mathematics</h2>

<p>Between Kempe's failed proof in 1879 and the eventual resolution in 1976, the Four Color Problem became one of the most notorious open problems in mathematics. It attracted amateurs and professionals alike, and the mathematical community was flooded with incorrect proofs.</p>

<p>The problem was seductive for several reasons. First, the statement is incredibly simple. Second, any finite number of examples can be checked by trial and error. Third, every map anyone tried <em>could</em> be four-colored. The psychological effect was powerful: if it always works, there must be a simple reason why. Countless mathematicians believed they had found that simple reason, only to have their proofs shot down.</p>

<h3>Notable Attempts</h3>

<p><strong>Kempe (1879):</strong> His "proof" introduced Kempe chains, a color-swapping technique. The idea: if you need to recolor one region, swap colors along a chain of alternating colors. His error was assuming that two such swaps could always be done independently, when in fact they can interfere with each other.</p>

<p><strong>Tait (1880):</strong> Peter Guthrie Tait, a Scottish physicist, proposed an equivalent reformulation: if every bridgeless cubic planar graph (one where every vertex has exactly 3 edges) has a proper edge-coloring with 3 colors, then the Four Color Theorem follows. This was a brilliant insight, but proving Tait's conjecture was just as hard. In fact, Tait's conjecture was itself only proven in 1976, as a consequence of the Four Color Theorem, not the other way around.</p>

<p><strong>The "Map Problem" as a cultural phenomenon:</strong> By the mid-20th century, the Four Color Problem had become famous beyond mathematics. It was referenced in popular culture, puzzle books, and cocktail party conversations. The prominent mathematician Wolfgang Haken estimated that he received an average of one "proof" per month from amateur mathematicians. All were wrong.</p>

<h3>Reducibility and Discharging</h3>

<p>The most important advances came from two techniques that would eventually form the backbone of the proof.</p>

<div class="env-block definition">
<strong>Reducibility.</strong> A configuration in a map is <em>reducible</em> if any 4-coloring of the rest of the map can always be extended to include that configuration. If a map contains a reducible configuration, you can color the rest first and then handle the configuration.
</div>

<div class="env-block definition">
<strong>Discharging.</strong> A technique for proving that every planar map must contain at least one configuration from a given set. It works by assigning "charges" to vertices and faces using Euler's formula, then redistributing charges according to specific rules until a target configuration is guaranteed to appear.
</div>

<p>The strategy was clear: (1) find a set of configurations that is <em>unavoidable</em> (every map must contain at least one), and (2) prove every configuration in the set is <em>reducible</em>. Then any map can be four-colored, because you can always find a reducible piece, remove it, color the rest (by induction), and extend the coloring.</p>

<p>The problem was that both steps were enormously difficult. By hand, mathematicians had shown small unavoidable sets (Heinrich Heesch identified configurations that could be checked for reducibility), but the sets were never complete enough. What was needed was a brute-force search through a carefully organized landscape of possibilities, and that required something no mathematician had yet used to prove a major theorem: a computer.</p>

<div class="viz-placeholder" data-viz="viz-interactive-coloring"></div>

<div class="env-block remark">
<strong>Remark.</strong> Heesch spent decades developing the theory of discharging and reducibility. He never completed the proof himself, but his ideas directly enabled the breakthrough. In science and mathematics, the person who lays the groundwork is not always the one who finishes the building.
</div>
`,
            visualizations: [
                {
                    id: 'viz-interactive-coloring',
                    title: 'Interactive Map Coloring Challenge',
                    description: 'A random map with 12 regions. Click a region to cycle through 4 colors. Try to color it so no two adjacent regions share a color! The theorem guarantees a solution exists.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var palette = ['#333355', viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple];

                        // Generate a Voronoi-like partition using seed points
                        var seeds = [];
                        var regionColor = [];
                        var numRegions = 12;

                        function generateMap() {
                            seeds = [];
                            regionColor = [];
                            // Place seeds with some spacing
                            var pad = 40;
                            for (var i = 0; i < numRegions; i++) {
                                var tries = 0;
                                var sx, sy;
                                do {
                                    sx = pad + Math.random() * (w - 2 * pad);
                                    sy = pad + Math.random() * (h - 2 * pad);
                                    var ok = true;
                                    for (var j = 0; j < seeds.length; j++) {
                                        var d = Math.sqrt((sx - seeds[j][0]) * (sx - seeds[j][0]) + (sy - seeds[j][1]) * (sy - seeds[j][1]));
                                        if (d < 70) { ok = false; break; }
                                    }
                                    tries++;
                                    if (ok || tries > 50) break;
                                } while (true);
                                seeds.push([sx, sy]);
                                regionColor.push(0);
                            }
                        }

                        function closest(px, py) {
                            var best = -1, bestD = Infinity;
                            for (var i = 0; i < seeds.length; i++) {
                                var d = (px - seeds[i][0]) * (px - seeds[i][0]) + (py - seeds[i][1]) * (py - seeds[i][1]);
                                if (d < bestD) { bestD = d; best = i; }
                            }
                            return best;
                        }

                        // Build adjacency by scanning pixels
                        var adjacency = null;
                        var regionPixels = null;

                        function buildAdjacency() {
                            adjacency = [];
                            for (var i = 0; i < numRegions; i++) adjacency.push({});
                            regionPixels = [];
                            for (var i2 = 0; i2 < numRegions; i2++) regionPixels.push([]);

                            var step = 4;
                            var grid = [];
                            var cols = Math.ceil(w / step), rows = Math.ceil(h / step);
                            for (var gy = 0; gy < rows; gy++) {
                                grid[gy] = [];
                                for (var gx = 0; gx < cols; gx++) {
                                    var r = closest(gx * step, gy * step);
                                    grid[gy][gx] = r;
                                }
                            }
                            for (var gy2 = 0; gy2 < rows; gy2++) {
                                for (var gx2 = 0; gx2 < cols; gx2++) {
                                    var r2 = grid[gy2][gx2];
                                    if (gx2 + 1 < cols && grid[gy2][gx2 + 1] !== r2) {
                                        adjacency[r2][grid[gy2][gx2 + 1]] = true;
                                        adjacency[grid[gy2][gx2 + 1]][r2] = true;
                                    }
                                    if (gy2 + 1 < rows && grid[gy2 + 1][gx2] !== r2) {
                                        adjacency[r2][grid[gy2 + 1][gx2]] = true;
                                        adjacency[grid[gy2 + 1][gx2]][r2] = true;
                                    }
                                }
                            }
                        }

                        function countConflicts() {
                            var c = 0;
                            for (var i = 0; i < numRegions; i++) {
                                var nbrs = Object.keys(adjacency[i]);
                                for (var j = 0; j < nbrs.length; j++) {
                                    var n = parseInt(nbrs[j]);
                                    if (n > i && regionColor[i] > 0 && regionColor[i] === regionColor[n]) c++;
                                }
                            }
                            return c;
                        }

                        function draw() {
                            viz.clear();
                            // Draw Voronoi regions using pixel painting
                            var step = 3;
                            for (var py = 0; py < h; py += step) {
                                for (var px = 0; px < w; px += step) {
                                    var r = closest(px, py);
                                    ctx.fillStyle = palette[regionColor[r]];
                                    ctx.fillRect(px, py, step, step);
                                }
                            }

                            // Draw borders
                            var bstep = 2;
                            for (var py2 = 0; py2 < h; py2 += bstep) {
                                for (var px2 = 0; px2 < w; px2 += bstep) {
                                    var r1 = closest(px2, py2);
                                    var r2x = closest(px2 + bstep, py2);
                                    var r2y = closest(px2, py2 + bstep);
                                    if (r1 !== r2x || r1 !== r2y) {
                                        ctx.fillStyle = viz.colors.white;
                                        ctx.fillRect(px2, py2, bstep, bstep);
                                    }
                                }
                            }

                            // Draw seed dots
                            for (var i = 0; i < seeds.length; i++) {
                                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                                ctx.beginPath(); ctx.arc(seeds[i][0], seeds[i][1], 3, 0, Math.PI * 2); ctx.fill();
                            }

                            // Info
                            var conf = countConflicts();
                            var allColored = regionColor.every(function(c) { return c > 0; });
                            ctx.fillStyle = 'rgba(12,12,32,0.8)';
                            ctx.fillRect(8, 8, 230, 44);
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Click regions to color them (4 colors)', 14, 14);
                            if (allColored && conf === 0) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Solved! No conflicts!', 14, 32);
                            } else if (conf > 0) {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('Conflicts: ' + conf, 14, 32);
                            } else {
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('Keep coloring...', 14, 32);
                            }
                        }

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left, my = e.clientY - rect.top;
                            var r = closest(mx, my);
                            if (r >= 0) {
                                regionColor[r] = (regionColor[r] % 4) + 1;
                                draw();
                            }
                        });

                        VizEngine.createButton(controls, 'New Map', function() {
                            generateMap(); buildAdjacency(); draw();
                        });
                        VizEngine.createButton(controls, 'Reset Colors', function() {
                            for (var i = 0; i < numRegions; i++) regionColor[i] = 0;
                            draw();
                        });

                        generateMap();
                        buildAdjacency();
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Kempe\'s proof technique involves "Kempe chains." In a properly 2-colored path A-B-C-D-E (alternating red and blue), if you swap all the colors in the chain, is the coloring still proper?',
                    hint: 'Think about what happens to the adjacency constraints when every red becomes blue and every blue becomes red along the chain.',
                    solution: 'Yes, the coloring remains proper. If the path was A(red)-B(blue)-C(red)-D(blue)-E(red), swapping gives A(blue)-B(red)-C(blue)-D(red)-E(blue). Adjacent vertices along the chain still have different colors, because swapping preserves the alternating pattern. This is exactly how Kempe chains work: they allow local recoloring without breaking the coloring.'
                },
                {
                    question: 'Euler\'s formula for planar graphs says \\(V - E + F = 2\\). For a triangulated planar graph (every face is a triangle, including the outer face), show that \\(E = 3V - 6\\).',
                    hint: 'Count the edges from the face side: each face has 3 edges, but each edge is shared by 2 faces.',
                    solution: 'Each of the \\(F\\) faces has 3 edges on its boundary, giving \\(3F\\) edge-face incidences. Each edge borders exactly 2 faces, so \\(3F = 2E\\), meaning \\(F = 2E/3\\). Substituting into Euler\'s formula: \\(V - E + 2E/3 = 2\\), which gives \\(V - E/3 = 2\\), hence \\(E = 3V - 6\\). This limits how many edges a planar graph can have and is key to proving that some vertex must have degree 5 or less.'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 4: The Computer-Assisted Proof
        // ─────────────────────────────────────────────
        {
            id: 'sec-computer-proof',
            title: 'The Computer-Assisted Proof',
            content: `
<h2>The Proof That Changed Mathematics</h2>

<p>In June 1976, Kenneth Appel and Wolfgang Haken at the University of Illinois announced that they had proven the Four Color Theorem. The mathematical world was stunned, not because the result was surprising (almost everyone believed it was true), but because of <em>how</em> it was proven.</p>

<p>Their proof relied on a computer to check 1,936 specific map configurations. A human could not feasibly verify all the cases by hand; the computer calculations took over 1,200 hours of machine time (on 1970s hardware, equivalent to perhaps a few minutes on a modern laptop). For the first time in history, a major mathematical theorem rested on computations that no human could check.</p>

<h3>How the Proof Works</h3>

<p>The proof follows the strategy of "unavoidable sets" and "reducibility" that Heesch had developed:</p>

<ol>
<li><strong>Step 1: Discharging.</strong> Using Euler's formula and an elaborate system of 487 discharging rules, Appel and Haken showed that every planar map must contain at least one of 1,936 specific configurations (the "unavoidable set"). This part was done by hand, though the design of the rules required computer assistance.</li>
<li><strong>Step 2: Reducibility.</strong> For each of the 1,936 configurations, a computer verified that the configuration is "reducible," meaning any 4-coloring of the surrounding map can be extended through the configuration. This was the part that required massive computation.</li>
<li><strong>Conclusion:</strong> Since every map contains a reducible configuration, you can always simplify the map by removing that piece, color the simpler map (by induction), and extend the coloring. Therefore four colors suffice.</li>
</ol>

<div class="env-block theorem">
<strong>Appel-Haken Theorem (1976).</strong> Every planar graph is four-colorable.
</div>

<h3>The Controversy</h3>

<p>The proof ignited a fierce debate that continues to echo today. Mathematicians raised several objections:</p>

<p><strong>"Can we trust a computer?"</strong> Computers can have hardware glitches, software bugs, and programming errors. The proof was not verified by independent human reading but by independent re-implementation on different computers. Is that enough?</p>

<p><strong>"Is it really a proof?"</strong> Traditionally, a mathematical proof is a chain of logical reasoning that a human can follow from beginning to end. A proof that requires trusting a computer output is a fundamentally different kind of argument. Some mathematicians felt that the Four Color Theorem remained, in some philosophical sense, "not really proven."</p>

<p><strong>"Where is the understanding?"</strong> A proof should explain <em>why</em> something is true, not just verify <em>that</em> it is true. The Appel-Haken proof says "we checked all the cases and they all work," but gives no intuitive reason why four colors should suffice.</p>

<div class="env-block remark">
<strong>Remark.</strong> In 1997, Neil Robertson, Daniel Sanders, Paul Seymour, and Robin Thomas produced a simplified proof that reduced the unavoidable set to 633 configurations and made the computer verification more transparent. In 2005, Georges Gonthier used the Coq proof assistant (a program that verifies logical correctness step by step) to produce a fully machine-verified proof. This addressed the "software bug" concern, since the Coq kernel is small enough for humans to inspect.
</div>

<p>Today, computer-assisted proofs are increasingly common in mathematics. The Four Color Theorem was the first, and it opened the door to a new era where human ingenuity and computational power work together to solve problems neither could handle alone.</p>

<div class="viz-placeholder" data-viz="viz-proof-timeline"></div>
`,
            visualizations: [
                {
                    id: 'viz-proof-timeline',
                    title: 'Timeline of the Four Color Problem',
                    description: 'Key events from conjecture (1852) to computer-verified proof (2005).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;

                        var events = [
                            { year: 1852, label: 'Guthrie poses the question', color: viz.colors.blue },
                            { year: 1879, label: 'Kempe\'s "proof"', color: viz.colors.orange },
                            { year: 1890, label: 'Heawood finds the flaw', color: viz.colors.red },
                            { year: 1890.5, label: 'Heawood proves 5 colors suffice', color: viz.colors.green },
                            { year: 1922, label: 'Franklin: maps with \u226425 regions', color: viz.colors.purple },
                            { year: 1950, label: 'Heesch develops discharging theory', color: viz.colors.teal },
                            { year: 1976, label: 'Appel & Haken: computer proof!', color: viz.colors.gold },
                            { year: 1997, label: 'Robertson et al. simplified proof', color: viz.colors.blue },
                            { year: 2005, label: 'Gonthier: Coq-verified proof', color: viz.colors.green }
                        ];

                        function draw() {
                            viz.clear();
                            var padL = 30, padR = 30, padT = 40, padB = 30;
                            var timelineY = h / 2;
                            var plotW = w - padL - padR;
                            var yMin = 1850, yMax = 2010;

                            function toX(yr) { return padL + (yr - yMin) / (yMax - yMin) * plotW; }

                            // Timeline line
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(padL, timelineY); ctx.lineTo(w - padR, timelineY); ctx.stroke();

                            // Year ticks
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var yr = 1860; yr <= 2000; yr += 20) {
                                var x = toX(yr);
                                ctx.beginPath(); ctx.moveTo(x, timelineY - 4); ctx.lineTo(x, timelineY + 4);
                                ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 1; ctx.stroke();
                                ctx.fillText(yr.toString(), x, timelineY + 8);
                            }

                            // Events
                            events.forEach(function(ev, i) {
                                var x = toX(ev.year);
                                var above = (i % 2 === 0);
                                var yOff = above ? -1 : 1;
                                var labelY = timelineY + yOff * (30 + (i % 3) * 18);
                                var dotY = timelineY;

                                // connector line
                                ctx.strokeStyle = ev.color + '88'; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(x, dotY); ctx.lineTo(x, labelY); ctx.stroke();

                                // dot
                                ctx.fillStyle = ev.color;
                                ctx.beginPath(); ctx.arc(x, dotY, 5, 0, Math.PI * 2); ctx.fill();

                                // label
                                ctx.fillStyle = ev.color; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = above ? 'bottom' : 'top';

                                // Wrap long labels
                                var yearStr = Math.floor(ev.year).toString();
                                ctx.font = 'bold 10px -apple-system,sans-serif';
                                ctx.fillText(yearStr, x, labelY);
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.white;
                                var lineOffset = above ? -13 : 13;
                                // split label into lines of max 20 chars
                                var words = ev.label.split(' ');
                                var lines = ['']; var li = 0;
                                words.forEach(function(word) {
                                    if (lines[li].length + word.length > 18) { li++; lines[li] = ''; }
                                    lines[li] += (lines[li] ? ' ' : '') + word;
                                });
                                lines.forEach(function(line, k) {
                                    ctx.fillText(line, x, labelY + lineOffset + k * 11 * yOff);
                                });
                            });

                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('The Four Color Problem: 1852-2005', w / 2, 8);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Appel-Haken proof checked 1,936 configurations. The simplified Robertson et al. proof checked 633. Why is a smaller set better?',
                    hint: 'Think about verifiability and confidence.',
                    solution: 'A smaller unavoidable set means fewer cases to verify for reducibility, which means less computation time, fewer opportunities for bugs, and easier independent verification. The Robertson et al. proof was more convincing precisely because the unavoidable set was smaller and the computer code was cleaner and more carefully documented.'
                },
                {
                    question: 'Do you think a proof that relies on a computer should be accepted as a valid mathematical proof? Give arguments for and against.',
                    hint: 'Consider: What is the purpose of a proof? Is it to convince, to explain, or to verify? Do human proofs ever contain errors?',
                    solution: 'For: Human proofs also contain errors (Kempe\'s "proof" stood for 11 years). Computer proofs can be re-run and independently verified. Proof assistants like Coq verify logical correctness mechanically. Against: Proofs should provide understanding, not just verification. We cannot inspect 1,936 cases by hand, so we lose insight into <em>why</em> the theorem is true. This is an ongoing debate in the philosophy of mathematics; there is no single right answer.'
                },
                {
                    question: 'Gonthier\'s 2005 proof was verified by the Coq proof assistant. Why is a machine-checked proof more trustworthy than an unchecked computer calculation?',
                    hint: 'Think about the size of what needs to be trusted.',
                    solution: 'A proof assistant like Coq has a small, well-audited "kernel" (a few thousand lines of code) that checks each logical step. You only need to trust that this tiny kernel is correct. In contrast, a general computer program doing a brute-force search could have bugs anywhere in its thousands of lines of custom code. The Coq approach reduces the "trusted base" to something small enough for humans to inspect thoroughly.'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 5: Graph Coloring and Beyond
        // ─────────────────────────────────────────────
        {
            id: 'sec-graph-coloring-beyond',
            title: 'Graph Coloring and Beyond',
            content: `
<h2>From Maps to Algorithms</h2>

<p>The Four Color Theorem is beautiful mathematics, but graph coloring is much more than a curiosity about maps. It turns out to be one of the most practically important problems in computer science, with applications that affect your daily life.</p>

<h3>Scheduling Problems</h3>

<p>Suppose a university needs to schedule final exams. No student should have two exams at the same time. We can model this as a graph: each exam is a vertex, and we draw an edge between two exams if some student is enrolled in both. A proper coloring of this graph with \\(k\\) colors corresponds to a schedule using \\(k\\) time slots with no conflicts. The chromatic number tells us the minimum number of time slots needed.</p>

<h3>Register Allocation</h3>

<p>When a compiler translates a program into machine code, it must assign variables to a limited number of CPU registers. Two variables that are "alive" at the same time cannot share a register. This is exactly a graph coloring problem: variables are vertices, edges connect simultaneously live variables, and colors are registers. Efficient register allocation, which makes your software run faster, depends on fast graph coloring algorithms.</p>

<h3>Frequency Assignment</h3>

<p>Cell phone towers that are close together cannot use the same radio frequency, or their signals will interfere. Assigning frequencies to towers is a graph coloring problem: towers are vertices, nearby towers are connected by edges, and colors are frequencies. Using fewer frequencies (fewer colors) saves valuable radio spectrum.</p>

<div class="viz-placeholder" data-viz="viz-scheduling"></div>

<h3>The Computational Hardness of Graph Coloring</h3>

<p>Here is a sobering fact: while the Four Color Theorem guarantees that every planar graph can be 4-colored, actually <em>finding</em> a 4-coloring is computationally easy (there are efficient algorithms). But for general (non-planar) graphs, determining the chromatic number is <em>NP-hard</em>, one of the hardest types of problems in computer science. No one knows a fast algorithm for it, and most computer scientists believe no such algorithm exists.</p>

<div class="env-block definition">
<strong>NP-hard.</strong> A problem is NP-hard if it is at least as hard as the hardest problems in the class NP (problems whose solutions can be quickly <em>verified</em> but not necessarily quickly <em>found</em>). If someone found a fast algorithm for any NP-hard problem, it would solve the famous P vs NP problem and win a $1 million Millennium Prize.
</div>

<p>Even the question "Can this graph be 3-colored?" is NP-complete. So while 4-coloring planar graphs is easy, 3-coloring general graphs is incredibly hard. The boundary between easy and hard in mathematics is often razor-thin.</p>

<h3>Beyond Planar Graphs</h3>

<p>On surfaces more complex than a plane or sphere, the coloring number changes. On a torus (the surface of a doughnut), up to 7 colors may be needed, and 7 always suffice. This was proven by Heawood in 1890 (!) for all surfaces except the plane, using a beautiful formula involving the Euler characteristic of the surface. The plane (and sphere) was the hardest case, and it took until 1976 to settle.</p>

<div class="env-block intuition">
<strong>Intuition.</strong> Graph coloring connects geometry, topology, algebra, and computer science. A question that started with coloring counties on a map in 1852 led to deep mathematics, the first computer-assisted proof, and algorithms that run in every smartphone and laptop today. This is the beauty of mathematics: simple questions have deep answers, and deep answers have practical consequences.
</div>

<div class="viz-placeholder" data-viz="viz-chromatic-game"></div>
`,
            visualizations: [
                {
                    id: 'viz-scheduling',
                    title: 'Exam Scheduling as Graph Coloring',
                    description: 'Each vertex represents an exam. Edges connect exams that share students. Colors represent time slots. Click vertices to color them and find a conflict-free schedule.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var palette = ['#333355', viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple];
                        var slotNames = ['(none)', 'Mon 9am', 'Mon 2pm', 'Tue 9am', 'Tue 2pm'];

                        var exams = [
                            { name: 'Math', x: w * 0.2, y: h * 0.25, color: 0 },
                            { name: 'Physics', x: w * 0.5, y: h * 0.15, color: 0 },
                            { name: 'Chem', x: w * 0.8, y: h * 0.25, color: 0 },
                            { name: 'English', x: w * 0.15, y: h * 0.6, color: 0 },
                            { name: 'History', x: w * 0.45, y: h * 0.65, color: 0 },
                            { name: 'CS', x: w * 0.75, y: h * 0.6, color: 0 },
                            { name: 'Art', x: w * 0.5, y: h * 0.85, color: 0 }
                        ];

                        // Edges: shared students
                        var edges = [
                            [0, 1], [0, 3], [0, 4], // Math conflicts
                            [1, 2], [1, 5],          // Physics conflicts
                            [2, 5],                   // Chem-CS
                            [3, 4], [3, 6],           // English conflicts
                            [4, 5], [4, 6],           // History conflicts
                            [5, 6]                    // CS-Art
                        ];

                        function countConflicts() {
                            var c = 0;
                            edges.forEach(function(e) {
                                if (exams[e[0]].color > 0 && exams[e[0]].color === exams[e[1]].color) c++;
                            });
                            return c;
                        }

                        function draw() {
                            viz.clear();

                            // edges
                            edges.forEach(function(e) {
                                var a = exams[e[0]], b = exams[e[1]];
                                var isConflict = a.color > 0 && a.color === b.color;
                                ctx.strokeStyle = isConflict ? viz.colors.red : 'rgba(200,200,255,0.25)';
                                ctx.lineWidth = isConflict ? 2.5 : 1;
                                ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                            });

                            // vertices
                            exams.forEach(function(ex) {
                                ctx.fillStyle = palette[ex.color];
                                ctx.beginPath(); ctx.arc(ex.x, ex.y, 22, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.arc(ex.x, ex.y, 22, 0, Math.PI * 2); ctx.stroke();
                                ctx.fillStyle = viz.colors.white; ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(ex.name, ex.x, ex.y);
                                if (ex.color > 0) {
                                    ctx.font = '9px -apple-system,sans-serif'; ctx.fillStyle = viz.colors.text;
                                    ctx.fillText(slotNames[ex.color], ex.x, ex.y + 30);
                                }
                            });

                            // legend
                            ctx.fillStyle = 'rgba(12,12,32,0.8)';
                            ctx.fillRect(8, h - 80, 180, 72);
                            ctx.fillStyle = viz.colors.white; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            for (var c = 1; c < palette.length; c++) {
                                ctx.fillStyle = palette[c];
                                ctx.fillRect(14, h - 74 + (c - 1) * 16, 10, 10);
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(slotNames[c], 30, h - 74 + (c - 1) * 16);
                            }

                            // status
                            var conf = countConflicts();
                            var allColored = exams.every(function(e) { return e.color > 0; });
                            ctx.fillStyle = 'rgba(12,12,32,0.8)'; ctx.fillRect(w - 180, 8, 172, 30);
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            if (allColored && conf === 0) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Valid schedule found!', w - 172, 16);
                            } else if (conf > 0) {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('Conflicts: ' + conf, w - 172, 16);
                            } else {
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('Click exams to assign slots', w - 172, 16);
                            }
                        }

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left, my = e.clientY - rect.top;
                            for (var i = 0; i < exams.length; i++) {
                                var dx = mx - exams[i].x, dy = my - exams[i].y;
                                if (dx * dx + dy * dy < 22 * 22) {
                                    exams[i].color = (exams[i].color % 4) + 1;
                                    draw();
                                    return;
                                }
                            }
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            exams.forEach(function(e) { e.color = 0; });
                            draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-chromatic-game',
                    title: 'Chromatic Number Challenge',
                    description: 'A random planar graph. Try to color it with exactly 4 colors! The Four Color Theorem guarantees it\'s possible.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var palette = ['#333355', viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple];

                        var nodes = [];
                        var edgeList = [];

                        function generateGraph() {
                            nodes = [];
                            edgeList = [];
                            var n = 10;
                            var pad = 50;
                            // place nodes
                            for (var i = 0; i < n; i++) {
                                var tries = 0;
                                var nx, ny;
                                do {
                                    nx = pad + Math.random() * (w - 2 * pad);
                                    ny = pad + Math.random() * (h - 2 * pad);
                                    var ok = true;
                                    for (var j = 0; j < nodes.length; j++) {
                                        var d = Math.sqrt((nx - nodes[j].x) * (nx - nodes[j].x) + (ny - nodes[j].y) * (ny - nodes[j].y));
                                        if (d < 80) { ok = false; break; }
                                    }
                                    tries++;
                                    if (ok || tries > 50) break;
                                } while (true);
                                nodes.push({ x: nx, y: ny, color: 0 });
                            }

                            // build edges: connect nearby nodes (planar-like)
                            for (var a = 0; a < n; a++) {
                                for (var b = a + 1; b < n; b++) {
                                    var d = Math.sqrt((nodes[a].x - nodes[b].x) * (nodes[a].x - nodes[b].x) + (nodes[a].y - nodes[b].y) * (nodes[a].y - nodes[b].y));
                                    if (d < 180) {
                                        // check if this edge crosses existing edges (keep it planar-ish)
                                        var crosses = false;
                                        for (var e = 0; e < edgeList.length; e++) {
                                            var ea = edgeList[e];
                                            if (ea[0] === a || ea[0] === b || ea[1] === a || ea[1] === b) continue;
                                            if (segmentsIntersect(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y,
                                                nodes[ea[0]].x, nodes[ea[0]].y, nodes[ea[1]].x, nodes[ea[1]].y)) {
                                                crosses = true; break;
                                            }
                                        }
                                        if (!crosses) edgeList.push([a, b]);
                                    }
                                }
                            }
                        }

                        function segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
                            function cross(ox, oy, ax2, ay2, bx2, by2) {
                                return (ax2 - ox) * (by2 - oy) - (ay2 - oy) * (bx2 - ox);
                            }
                            var d1 = cross(cx, cy, dx, dy, ax, ay);
                            var d2 = cross(cx, cy, dx, dy, bx, by);
                            var d3 = cross(ax, ay, bx, by, cx, cy);
                            var d4 = cross(ax, ay, bx, by, dx, dy);
                            if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
                                ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return true;
                            return false;
                        }

                        function countConflicts() {
                            var c = 0;
                            edgeList.forEach(function(e) {
                                if (nodes[e[0]].color > 0 && nodes[e[0]].color === nodes[e[1]].color) c++;
                            });
                            return c;
                        }

                        function draw() {
                            viz.clear();
                            // edges
                            edgeList.forEach(function(e) {
                                var a = nodes[e[0]], b = nodes[e[1]];
                                var isConf = a.color > 0 && a.color === b.color;
                                ctx.strokeStyle = isConf ? viz.colors.red : 'rgba(200,200,255,0.3)';
                                ctx.lineWidth = isConf ? 2 : 1;
                                ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                            });
                            // nodes
                            nodes.forEach(function(nd) {
                                ctx.fillStyle = palette[nd.color];
                                ctx.beginPath(); ctx.arc(nd.x, nd.y, 16, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.arc(nd.x, nd.y, 16, 0, Math.PI * 2); ctx.stroke();
                            });
                            // info
                            var conf = countConflicts();
                            var all = nodes.every(function(n) { return n.color > 0; });
                            ctx.fillStyle = 'rgba(12,12,32,0.8)'; ctx.fillRect(8, 8, 220, 30);
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            if (all && conf === 0) {
                                ctx.fillStyle = viz.colors.green; ctx.fillText('4-colored! Well done!', 14, 16);
                            } else if (conf > 0) {
                                ctx.fillStyle = viz.colors.red; ctx.fillText('Conflicts: ' + conf + '. Keep trying!', 14, 16);
                            } else {
                                ctx.fillStyle = viz.colors.text; ctx.fillText('Click nodes to color (4 colors)', 14, 16);
                            }
                        }

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left, my = e.clientY - rect.top;
                            for (var i = 0; i < nodes.length; i++) {
                                var dx = mx - nodes[i].x, dy = my - nodes[i].y;
                                if (dx * dx + dy * dy < 16 * 16) {
                                    nodes[i].color = (nodes[i].color % 4) + 1;
                                    draw(); return;
                                }
                            }
                        });

                        VizEngine.createButton(controls, 'New Graph', function() { generateGraph(); draw(); });
                        VizEngine.createButton(controls, 'Reset Colors', function() { nodes.forEach(function(n) { n.color = 0; }); draw(); });

                        generateGraph();
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A university has 8 exams. After analyzing student enrollments, they find the conflict graph has chromatic number 3. What does this mean practically?',
                    hint: 'The chromatic number tells you the minimum number of time slots.',
                    solution: 'It means the exams can be scheduled in just 3 time slots with no student having two exams in the same slot. No schedule with only 2 time slots would be conflict-free.'
                },
                {
                    question: 'A graph with \\(n\\) vertices has chromatic number \\(n\\). What must be true about this graph?',
                    hint: 'If every vertex needs its own color, what does that say about edges?',
                    solution: 'The graph must be the <em>complete graph</em> \\(K_n\\), where every pair of vertices is connected by an edge. If any edge were missing, the two unconnected vertices could share a color, reducing the chromatic number below \\(n\\).'
                },
                {
                    question: 'On a torus (doughnut surface), maps can require up to 7 colors. Why does a torus allow more complex maps than a flat surface?',
                    hint: 'Think about what the "hole" in the doughnut does to the topology.',
                    solution: 'A torus has a different topology than a plane: it has a "handle" (hole) that allows regions to wrap around and border each other in ways impossible on a flat surface. Specifically, the complete graph \\(K_7\\) (7 vertices, every pair connected) can be embedded on a torus without crossings, which is impossible on a plane. The extra topological freedom allows more complex adjacency patterns, which in turn require more colors.'
                }
            ]
        }
    ]
});
})();
