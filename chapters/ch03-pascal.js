// === Chapter 3: Pascal's Triangle ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch03',
        number: 3,
        title: "Pascal's Triangle",
        subtitle: 'An infinite pyramid of numbers hiding patterns no one expected',

        sections: [
            // ============================================================
            // Section 1: Building Pascal's Triangle
            // ============================================================
            {
                id: 'building',
                title: "Building Pascal's Triangle",
                content: `
<h2>A Triangle Born from Addition</h2>

<p>Imagine you have been handed a single number: <strong>1</strong>. You place it at the tip of a triangle. Below it, you write two 1s. And then something magical begins: every number in the next row is simply the <em>sum of the two numbers directly above it</em>. If a number sits at the edge, treat the missing neighbor as 0. That is the entire recipe.</p>

<div class="env-block definition">
<strong>Pascal's Triangle (Construction Rule)</strong><br>
Start with a single 1 at the top. Each entry in row \\(n\\) and position \\(k\\) is the sum of the two entries above it:
\\[
T(n, k) = T(n-1, k-1) + T(n-1, k)
\\]
with \\(T(n, 0) = T(n, n) = 1\\) for every row \\(n\\).
</div>

<p>Here are the first few rows, centered neatly:</p>
<pre style="text-align:center; color:#58a6ff; font-size:1.05rem; line-height:1.7;">
            1
          1   1
        1   2   1
      1   3   3   1
    1   4   6   4   1
  1   5  10  10   5   1
1   6  15  20  15   6   1
</pre>

<p>The rule could not be simpler, yet the consequences are staggering. This humble triangle has appeared independently in China (Jia Xian, around 1050 CE), Persia (Omar Khayyam, 1100s), and Europe (Blaise Pascal, 1654). Pascal did not invent it, but his <em>Trait&eacute; du triangle arithm&eacute;tique</em> was the first systematic study of its properties, so Western tradition carries his name.</p>

<h3>Why 1s on the edges?</h3>

<p>Think of it this way: the leftmost and rightmost entry in every row has only <em>one</em> parent above it (or none, if we're at the very top). By convention we set those boundary values to 1. This is not arbitrary; it corresponds to a deep combinatorial fact we will meet later in this chapter.</p>

<h3>Row numbering starts at zero</h3>

<p>Mathematicians (being the creatures they are) start counting from 0. Row 0 is just "1." Row 1 is "1, 1." Row 4 is "1, 4, 6, 4, 1." This convention makes many formulas cleaner.</p>

<div class="env-block example">
<strong>Quick check</strong><br>
What is the entry at row 6, position 3? Look at the row above (row 5): the entries at positions 2 and 3 are 10 and 10. Their sum is 20. Done!
</div>

<p>Try building the triangle yourself in the interactive visualization below. Click the "Add Row" button and watch each new number appear as the sum of its two parents. You can also hover over any cell to see which two numbers combined to create it.</p>

<div class="viz-placeholder" data-viz="pascal-builder"></div>

<h3>Symmetry at a glance</h3>

<p>Every row reads the same forwards and backwards: 1, 4, 6, 4, 1 is a palindrome. This "mirror symmetry" is not a coincidence. It reflects the fact that choosing \\(k\\) items from \\(n\\) is the same as choosing which \\(n - k\\) items to <em>leave out</em>.</p>

<div class="env-block remark">
<strong>Historical note</strong><br>
The oldest known depiction of this triangle appears in a Chinese text from around 1303 CE by Zhu Shijie, though Jia Xian likely knew it 250 years earlier. In China it is called <em>Yang Hui's Triangle</em> (&#x6768;&#x8F89;&#x4E09;&#x89D2;), in Iran it is <em>Khayyam's Triangle</em>. Mathematics truly has no borders.
</div>

<p>With the triangle built, we are ready to peer inside it and discover patterns that will genuinely surprise you.</p>
`,
                visualizations: [
                    {
                        id: 'pascal-builder',
                        title: "Interactive Pascal's Triangle Builder",
                        description: 'Click "Add Row" to build the triangle row by row. Hover over a cell to highlight its two parent numbers.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 420, scale: 1, originX: 0, originY: 0 });
                            var rows = [[1]];
                            var maxRows = 13;
                            var hoverR = -1, hoverC = -1;

                            function drawTriangle() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var totalRows = rows.length;
                                var cellW = Math.min(46, (W - 20) / (totalRows + 1));
                                var cellH = Math.min(34, (H - 20) / (totalRows + 1));

                                for (var r = 0; r < totalRows; r++) {
                                    var row = rows[r];
                                    var rowLen = row.length;
                                    var startX = W / 2 - (rowLen - 1) * cellW / 2;
                                    var y = 20 + r * cellH;
                                    for (var c = 0; c < rowLen; c++) {
                                        var x = startX + c * cellW;
                                        var isHover = (r === hoverR && c === hoverC);
                                        var isParent = (hoverR > 0 && r === hoverR - 1 && (c === hoverC - 1 || c === hoverC) && c >= 0 && c < rows[r].length);

                                        // Draw connecting lines to parents
                                        if (r > 0) {
                                            var parentRow = rows[r - 1];
                                            var parentStartX = W / 2 - (parentRow.length - 1) * cellW / 2;
                                            if (c > 0) {
                                                var px = parentStartX + (c - 1) * cellW;
                                                var py = 20 + (r - 1) * cellH;
                                                ctx.strokeStyle = isHover ? viz.colors.orange : '#1a1a40';
                                                ctx.lineWidth = isHover ? 2 : 0.5;
                                                ctx.beginPath(); ctx.moveTo(px, py + 10); ctx.lineTo(x, y - 6); ctx.stroke();
                                            }
                                            if (c < parentRow.length) {
                                                var px2 = parentStartX + c * cellW;
                                                var py2 = 20 + (r - 1) * cellH;
                                                ctx.strokeStyle = isHover ? viz.colors.orange : '#1a1a40';
                                                ctx.lineWidth = isHover ? 2 : 0.5;
                                                ctx.beginPath(); ctx.moveTo(px2, py2 + 10); ctx.lineTo(x, y - 6); ctx.stroke();
                                            }
                                        }

                                        // Draw cell
                                        var bgColor = isHover ? viz.colors.orange : (isParent ? viz.colors.teal : 'transparent');
                                        if (bgColor !== 'transparent') {
                                            ctx.fillStyle = bgColor + '44';
                                            ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill();
                                        }

                                        ctx.fillStyle = isHover ? viz.colors.orange : (isParent ? viz.colors.teal : viz.colors.white);
                                        ctx.font = (isHover || isParent ? 'bold ' : '') + '13px -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText(row[c], x, y);
                                    }
                                }

                                // Row labels
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                for (var r2 = 0; r2 < totalRows; r2++) {
                                    ctx.fillText('Row ' + r2, 4, 20 + r2 * cellH);
                                }
                            }

                            VizEngine.createButton(controls, 'Add Row', function () {
                                if (rows.length >= maxRows) return;
                                var prev = rows[rows.length - 1];
                                var next = [1];
                                for (var i = 1; i < prev.length; i++) {
                                    next.push(prev[i - 1] + prev[i]);
                                }
                                next.push(1);
                                rows.push(next);
                                drawTriangle();
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                rows = [[1]];
                                hoverR = -1; hoverC = -1;
                                drawTriangle();
                            });

                            viz.canvas.addEventListener('mousemove', function (e) {
                                var rect = viz.canvas.getBoundingClientRect();
                                var mx = e.clientX - rect.left;
                                var my = e.clientY - rect.top;
                                var totalRows = rows.length;
                                var cellW = Math.min(46, (viz.width - 20) / (totalRows + 1));
                                var cellH = Math.min(34, (viz.height - 20) / (totalRows + 1));
                                hoverR = -1; hoverC = -1;
                                for (var r = 0; r < totalRows; r++) {
                                    var rowLen = rows[r].length;
                                    var startX = viz.width / 2 - (rowLen - 1) * cellW / 2;
                                    var y = 20 + r * cellH;
                                    for (var c = 0; c < rowLen; c++) {
                                        var x = startX + c * cellW;
                                        if (Math.abs(mx - x) < 14 && Math.abs(my - y) < 14) {
                                            hoverR = r; hoverC = c;
                                        }
                                    }
                                }
                                drawTriangle();
                            });

                            viz.canvas.addEventListener('mouseleave', function () {
                                hoverR = -1; hoverC = -1;
                                drawTriangle();
                            });

                            drawTriangle();
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Write out row 7 of Pascal\'s Triangle (remember, we start counting from row 0).',
                        hint: 'Row 6 is: 1, 6, 15, 20, 15, 6, 1. Add consecutive pairs to get row 7.',
                        solution: 'Row 7 is: <strong>1, 7, 21, 35, 35, 21, 7, 1</strong>. Check: 1+6=7, 6+15=21, 15+20=35, 20+15=35, 15+6=21, 6+1=7.'
                    },
                    {
                        question: 'What is the sum of all numbers in row 5? Row 6? Do you see a pattern?',
                        hint: 'Row 5 is: 1, 5, 10, 10, 5, 1. Add them up. Then do the same for row 6.',
                        solution: 'Row 5 sums to \\(1+5+10+10+5+1 = 32 = 2^5\\). Row 6 sums to \\(1+6+15+20+15+6+1 = 64 = 2^6\\). The pattern: the sum of row \\(n\\) is always \\(2^n\\). We will explore why in Section 4!'
                    },
                    {
                        question: 'Why is every row a palindrome (the same forwards and backwards)?',
                        hint: 'Think about the construction rule. If row \\(n-1\\) is symmetric, what happens when you add consecutive pairs?',
                        solution: 'If row \\(n-1\\) is symmetric, then the pair at distance \\(k\\) from the left equals the pair at distance \\(k\\) from the right. Their sums are therefore equal, so row \\(n\\) is also symmetric. Since row 0 (just "1") is trivially symmetric, <em>every</em> row is symmetric by induction.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Hidden Patterns — The Sierpinski Surprise
            // ============================================================
            {
                id: 'sierpinski',
                title: 'Hidden Patterns: The Sierpinski Surprise',
                content: `
<h2>Coloring by Even and Odd</h2>

<p>Here is an experiment that sounds almost too simple to be interesting. Take Pascal's Triangle, and color every cell: paint the <strong>odd</strong> numbers one color, and the <strong>even</strong> numbers another. Stand back. What do you see?</p>

<p>A fractal. Specifically, you see the <strong>Sierpinski Triangle</strong>, one of the most famous fractals in mathematics. The pattern of odd entries, when the triangle is drawn large enough, forms an endlessly self-similar structure of triangles within triangles within triangles.</p>

<div class="env-block intuition">
<strong>Why does this happen?</strong><br>
The key insight connects to modular arithmetic. When we compute \\(T(n,k) = T(n-1,k-1) + T(n-1,k)\\), the parity (odd or even) of the result depends only on the parities of the two parents. Odd + Odd = Even. Even + Even = Even. Odd + Even = Odd. This creates a pattern governed by the same rule as the Sierpinski Triangle: a cell is "on" (odd) precisely when, looking at the binary representations of \\(n\\) and \\(k\\), every bit of \\(k\\) is less than or equal to the corresponding bit of \\(n\\). This is <em>Lucas' theorem</em>, and it produces the fractal structure automatically.
</div>

<p>The result is breathtaking. With just 32 or 64 rows, you can already see the triangular voids appearing at multiple scales, each one a smaller copy of the whole pattern. With 128 or 256 rows, the fractal becomes unmistakable.</p>

<div class="viz-placeholder" data-viz="pascal-sierpinski"></div>

<h3>Other modular colorings</h3>

<p>What if instead of coloring by mod 2 (even/odd), you color by mod 3, or mod 5? You get different but equally stunning fractal patterns! Coloring mod 3 creates a pattern with triangular holes arranged in threes. Coloring mod 5 produces a five-fold symmetric pattern. Each prime modulus generates its own unique fractal flavor.</p>

<div class="env-block remark">
<strong>Connection to Sierpinski</strong><br>
The Sierpinski Triangle can be constructed in many ways: by repeatedly removing the middle triangle from an equilateral triangle, by the "chaos game" with three vertices, or by coloring Pascal's Triangle mod 2. The fact that all these utterly different procedures produce the <em>same</em> shape is a deep mathematical phenomenon. You will meet the Sierpinski Triangle again in Chapter 8 (Classic Fractals).
</div>

<h3>A number theory connection</h3>

<p>There is a beautiful theorem by Kummer (1852) that says: the highest power of a prime \\(p\\) dividing \\(\\binom{m+n}{m}\\) equals the number of "carries" when you add \\(m\\) and \\(n\\) in base \\(p\\). For \\(p = 2\\), this means a binomial coefficient is odd precisely when there are <em>no carries</em> in the binary addition. No carries means the Sierpinski pattern. Pure elegance.</p>

<p>Use the visualization above to see this for yourself. Toggle between mod 2, mod 3, and mod 5 colorings, and adjust the number of rows to watch the fractal structure emerge from more and more data.</p>
`,
                visualizations: [
                    {
                        id: 'pascal-sierpinski',
                        title: "Pascal's Triangle: Even/Odd Coloring",
                        description: 'Color cells by remainder when divided by the chosen modulus. Odd numbers glow brightly, even numbers stay dark, and a fractal emerges.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 450, scale: 1, originX: 0, originY: 0 });
                            var numRows = 64;
                            var modVal = 2;
                            var modColors = [
                                viz.colors.bg,
                                viz.colors.blue,
                                viz.colors.orange,
                                viz.colors.teal,
                                viz.colors.purple,
                                viz.colors.pink,
                                viz.colors.green,
                                viz.colors.yellow
                            ];

                            function computeAndDraw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var cellSize = Math.min((W - 4) / numRows, (H - 4) / (numRows * 0.6));
                                // Compute Pascal mod values row by row
                                var prev = [1];
                                for (var r = 0; r < numRows; r++) {
                                    var rowLen = r + 1;
                                    var startX = W / 2 - (rowLen - 1) * cellSize / 2;
                                    var y = 4 + r * cellSize * 0.58;
                                    for (var c = 0; c < rowLen; c++) {
                                        var val = prev[c] % modVal;
                                        var color = val === 0 ? viz.colors.bg : modColors[val % modColors.length];
                                        if (val !== 0) {
                                            ctx.fillStyle = color;
                                            ctx.fillRect(startX + c * cellSize - cellSize / 2 + 0.5, y - cellSize * 0.29, cellSize - 1, cellSize * 0.56);
                                        }
                                    }
                                    // Compute next row
                                    var next = [1];
                                    for (var i = 1; i < prev.length; i++) {
                                        next.push((prev[i - 1] + prev[i]) % (modVal * modVal * modVal));
                                    }
                                    next.push(1);
                                    prev = next;
                                }

                                // Title
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(numRows + ' rows, mod ' + modVal, W - 8, H - 8);
                            }

                            VizEngine.createSlider(controls, 'Rows', 8, 128, numRows, 8, function (v) {
                                numRows = Math.round(v);
                                computeAndDraw();
                            });

                            VizEngine.createSlider(controls, 'Mod', 2, 7, modVal, 1, function (v) {
                                modVal = Math.round(v);
                                computeAndDraw();
                            });

                            computeAndDraw();
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the first 8 rows (rows 0 through 7) of Pascal\'s Triangle, how many entries are odd? How many are even?',
                        hint: 'Write out all 8 rows and check each entry. Or use the pattern: in the Sierpinski coloring, the "lit" cells are the odd ones.',
                        solution: 'Rows 0-7 have 1+2+3+4+5+6+7+8 = 36 total entries. The number of odd entries in the first \\(2^n\\) rows is \\(3^n\\). For \\(n=3\\) (8 rows), that is \\(3^3 = 27\\) odd entries. So there are \\(36 - 27 = 9\\) even entries.'
                    },
                    {
                        question: 'Row 4 of Pascal\'s Triangle is 1, 4, 6, 4, 1. Which of these are odd? Does the position of the odd entries match the Sierpinski pattern?',
                        hint: 'Just check: is each number odd or even?',
                        solution: 'Only the first and last entries (both 1) are odd. The rest (4, 6, 4) are even. In the Sierpinski triangle, row 4 has lit pixels only at the two ends, which matches perfectly.'
                    },
                    {
                        question: 'If you color Pascal\'s Triangle mod 3, what would the first 3 rows look like (what remainders)?',
                        hint: 'Row 0: 1. Row 1: 1, 1. Row 2: 1, 2, 1. Now reduce each mod 3.',
                        solution: 'Row 0: [1]. Row 1: [1, 1]. Row 2: [1, 2, 1]. All entries are already less than 3, so the remainders are the numbers themselves. None are 0 (mod 3), so all cells are "lit." The first empty cell (divisible by 3) appears in row 3 at position 1: the entry is 3, which is 0 mod 3.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Fibonacci Inside Pascal
            // ============================================================
            {
                id: 'fibonacci',
                title: 'Fibonacci Inside Pascal',
                content: `
<h2>A Hidden Staircase</h2>

<p>You met the Fibonacci numbers in Chapter 1: 1, 1, 2, 3, 5, 8, 13, 21, 34, ... Each number is the sum of the two before it. You also know Pascal's Triangle, where each number is the sum of the two above it. These are different rules, different triangles, different sequences. They should have nothing to do with each other.</p>

<p>And yet.</p>

<p>Draw Pascal's Triangle on a grid. Now draw diagonal lines that slant from upper-right to lower-left, cutting across the triangle at a 45-degree angle. Each diagonal crosses several entries. Add up the entries along each diagonal.</p>

<p>The sums are: 1, 1, 2, 3, 5, 8, 13, 21, ...</p>

<p>The Fibonacci sequence was hiding in Pascal's Triangle all along, running along its "shallow diagonals."</p>

<div class="env-block theorem">
<strong>Fibonacci-Pascal Connection</strong><br>
The \\(n\\)-th Fibonacci number equals the sum of entries along the \\(n\\)-th shallow diagonal of Pascal's Triangle:
\\[
F_n = \\sum_{k=0}^{\\lfloor n/2 \\rfloor} \\binom{n-k}{k}
\\]
This identity is sometimes called the "Fibonacci diagonal sum."
</div>

<p>Let us trace a few examples to make this concrete:</p>
<ul>
    <li><strong>Diagonal 0:</strong> Just the top entry: 1. That is \\(F_1 = 1\\). &#10003;</li>
    <li><strong>Diagonal 1:</strong> The entry at row 1, position 0: 1. That is \\(F_2 = 1\\). &#10003;</li>
    <li><strong>Diagonal 2:</strong> Row 2 position 0 (which is 1) plus row 1 position 1 (which is 1). Sum = 2. That is \\(F_3 = 2\\). &#10003;</li>
    <li><strong>Diagonal 3:</strong> Row 3 position 0 (1) + row 2 position 1 (2). Sum = 3 = \\(F_4\\). &#10003;</li>
    <li><strong>Diagonal 4:</strong> 1 + 3 + 1 = 5 = \\(F_5\\). &#10003;</li>
    <li><strong>Diagonal 5:</strong> 1 + 4 + 3 = 8 = \\(F_6\\). &#10003;</li>
</ul>

<div class="viz-placeholder" data-viz="pascal-fibonacci"></div>

<h3>Why does this work?</h3>

<p>The intuition is lovely. Think of a staircase with \\(n\\) steps. You can climb it by taking steps of size 1 or size 2. The number of ways to climb \\(n\\) steps is the Fibonacci number \\(F_{n+1}\\) (this is a classic counting argument). Now, suppose you take exactly \\(k\\) double-steps. Then you take \\(n - 2k\\) single-steps, for a total of \\(n - k\\) "moves." The number of ways to arrange \\(k\\) double-steps among \\(n - k\\) moves is \\(\\binom{n-k}{k}\\), which is exactly a Pascal entry on the appropriate diagonal. Summing over all possible values of \\(k\\) gives the total Fibonacci count.</p>

<div class="env-block intuition">
<strong>Two different addition rules, one family</strong><br>
Pascal's rule adds <em>spatially</em> (two neighbors above). Fibonacci's rule adds <em>temporally</em> (two predecessors in sequence). The diagonal sum identity shows that summing Pascal entries along the right direction reproduces the temporal rule. Spatial and temporal addition are two faces of the same coin.
</div>

<p>This connection is not just a curiosity. It appears in tiling problems, combinatorics, and even in the theory of continued fractions. When two seemingly unrelated mathematical objects turn out to be secretly linked, it is a sign that something deep is going on.</p>
`,
                visualizations: [
                    {
                        id: 'pascal-fibonacci',
                        title: 'Fibonacci Diagonals in Pascal\'s Triangle',
                        description: 'Click a diagonal number to highlight the corresponding shallow diagonal. The sum of highlighted entries equals the Fibonacci number shown.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 420, scale: 1, originX: 0, originY: 0 });
                            var totalRows = 10;
                            var pascal = [];
                            for (var r = 0; r < totalRows; r++) {
                                pascal[r] = [1];
                                for (var c = 1; c < r; c++) {
                                    pascal[r][c] = pascal[r - 1][c - 1] + pascal[r - 1][c];
                                }
                                if (r > 0) pascal[r][r] = 1;
                            }

                            var activeDiag = -1;
                            var fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

                            function getDiagCells(d) {
                                var cells = [];
                                for (var k = 0; k <= Math.floor(d / 2); k++) {
                                    var row = d - k;
                                    var col = k;
                                    if (row < totalRows && col <= row) {
                                        cells.push({ r: row, c: col });
                                    }
                                }
                                return cells;
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var cellW = 44;
                                var cellH = 32;
                                var diagCells = activeDiag >= 0 ? getDiagCells(activeDiag) : [];

                                for (var r = 0; r < totalRows; r++) {
                                    var rowLen = pascal[r].length;
                                    var startX = W / 2 - (rowLen - 1) * cellW / 2;
                                    var y = 24 + r * cellH;
                                    for (var c = 0; c < rowLen; c++) {
                                        var x = startX + c * cellW;
                                        var highlighted = diagCells.some(function (dc) { return dc.r === r && dc.c === c; });

                                        if (highlighted) {
                                            ctx.fillStyle = viz.colors.orange + '55';
                                            ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2); ctx.fill();
                                        }

                                        ctx.fillStyle = highlighted ? viz.colors.orange : viz.colors.white;
                                        ctx.font = (highlighted ? 'bold 14px' : '13px') + ' -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText(pascal[r][c], x, y);
                                    }
                                }

                                // Draw diagonal lines lightly
                                if (activeDiag >= 0 && diagCells.length > 0) {
                                    ctx.strokeStyle = viz.colors.orange + '66';
                                    ctx.lineWidth = 2;
                                    ctx.setLineDash([4, 4]);
                                    var first = diagCells[0];
                                    var last = diagCells[diagCells.length - 1];
                                    var startX1 = W / 2 - (pascal[first.r].length - 1) * cellW / 2 + first.c * cellW;
                                    var y1 = 24 + first.r * cellH;
                                    var startX2 = W / 2 - (pascal[last.r].length - 1) * cellW / 2 + last.c * cellW;
                                    var y2 = 24 + last.r * cellH;
                                    ctx.beginPath(); ctx.moveTo(startX1 - 12, y1 - 12); ctx.lineTo(startX2 + 12, y2 + 12); ctx.stroke();
                                    ctx.setLineDash([]);

                                    // Show sum
                                    var sum = 0;
                                    var parts = [];
                                    diagCells.forEach(function (dc) {
                                        var val = pascal[dc.r][dc.c];
                                        sum += val;
                                        parts.push(val);
                                    });
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = 'bold 16px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('Diagonal ' + activeDiag + ':  ' + parts.join(' + ') + ' = ' + sum + '  (F\u2082=' + sum + ')', W / 2, H - 16);
                                }
                            }

                            // Create diagonal buttons
                            for (var d = 0; d < 10; d++) {
                                (function (diagIdx) {
                                    VizEngine.createButton(controls, 'D' + diagIdx + '=' + fibs[diagIdx], function () {
                                        activeDiag = diagIdx;
                                        draw();
                                    });
                                })(d);
                            }

                            draw();
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Verify the Fibonacci diagonal sum for diagonal 6. Which entries do you add, and what Fibonacci number do you get?',
                        hint: 'Diagonal 6 passes through: row 6 col 0, row 5 col 1, row 4 col 2. Look up those Pascal entries.',
                        solution: 'The entries are: \\(\\binom{6}{0} = 1\\), \\(\\binom{5}{1} = 5\\), \\(\\binom{4}{2} = 6\\), and \\(\\binom{3}{3} = 1\\). Sum: \\(1 + 5 + 6 + 1 = 13 = F_7\\). &#10003;'
                    },
                    {
                        question: 'The Lucas numbers are like Fibonacci but start with 2, 1: so 2, 1, 3, 4, 7, 11, 18, ... Can you find a similar diagonal sum pattern for Lucas numbers in Pascal\'s Triangle?',
                        hint: 'Try modifying the diagonal formula. What if you weight the entries differently?',
                        solution: 'The Lucas numbers satisfy a similar identity: \\(L_n = \\sum_{k=0}^{\\lfloor n/2 \\rfloor} \\frac{n}{n-k}\\binom{n-k}{k}\\). Alternatively, \\(L_n = F_{n-1} + F_{n+1}\\), so you can express each Lucas number as the sum of two Fibonacci diagonal sums shifted by one position.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Powers of 2 and the Hockey Stick
            // ============================================================
            {
                id: 'powers-hockey',
                title: 'Powers of 2 and the Hockey Stick',
                content: `
<h2>Row Sums: Powers of Two</h2>

<p>Here is possibly the simplest and most satisfying pattern in Pascal's Triangle. Add up all the numbers in any row:</p>

<ul>
    <li>Row 0: \\(1 = 2^0\\)</li>
    <li>Row 1: \\(1 + 1 = 2 = 2^1\\)</li>
    <li>Row 2: \\(1 + 2 + 1 = 4 = 2^2\\)</li>
    <li>Row 3: \\(1 + 3 + 3 + 1 = 8 = 2^3\\)</li>
    <li>Row 4: \\(1 + 4 + 6 + 4 + 1 = 16 = 2^4\\)</li>
</ul>

<div class="env-block theorem">
<strong>Row Sum Identity</strong><br>
The sum of all entries in row \\(n\\) of Pascal's Triangle is \\(2^n\\):
\\[
\\sum_{k=0}^{n} \\binom{n}{k} = 2^n
\\]
</div>

<p>Why? Think of it this way: \\(\\binom{n}{k}\\) counts the number of ways to choose \\(k\\) items from \\(n\\). When you sum over all values of \\(k\\), you are counting the total number of subsets of an \\(n\\)-element set. Each element is either in the subset or not, independently, giving \\(2 \\times 2 \\times \\cdots \\times 2 = 2^n\\) total subsets.</p>

<p>Alternatively, recall that \\((1+x)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^k\\). Set \\(x = 1\\) and you get \\(2^n\\) on the left, the row sum on the right.</p>

<h2>The Hockey Stick Identity</h2>

<p>Here is a pattern that is harder to spot but deeply satisfying once you see it. Pick any entry on the left edge (any 1 on the boundary). Travel diagonally downward through consecutive entries, adding as you go. Stop at any point. The total always equals the entry just <em>below and to the opposite side</em> of where you stopped.</p>

<p>The shape traced out by the entries you added, plus the entry that equals their sum, looks like a hockey stick (if you squint).</p>

<div class="env-block theorem">
<strong>Hockey Stick Identity</strong><br>
\\[
\\sum_{i=0}^{r} \\binom{n+i}{i} = \\binom{n+r+1}{r}
\\]
Equivalently, summing entries along a diagonal in Pascal's Triangle gives the entry one step down and one step over from the last entry you summed.
</div>

<p>For example, starting from \\(\\binom{2}{0} = 1\\) and going down: \\(1 + 3 + 6 + 10 = 20\\). And sure enough, \\(\\binom{6}{3} = 20\\), sitting right below and to the side of \\(\\binom{5}{3} = 10\\).</p>

<div class="viz-placeholder" data-viz="pascal-hockey"></div>

<div class="env-block example">
<strong>Real-world application</strong><br>
The hockey stick identity has a lovely combinatorial proof. Imagine you want to choose 4 items from the set \\(\\{1, 2, 3, 4, 5, 6\\}\\). You can partition the count by the <em>largest element chosen</em>: if the largest is 6, there are \\(\\binom{5}{3}\\) ways; if 5, there are \\(\\binom{4}{3}\\) ways; if 4, there are \\(\\binom{3}{3}\\) ways. Summing: \\(\\binom{3}{3} + \\binom{4}{3} + \\binom{5}{3} = 1 + 4 + 10 = 15 = \\binom{6}{4}\\).
</div>

<h3>Other row patterns</h3>

<p>Beyond the row sum, there are more patterns hiding in plain sight:</p>
<ul>
    <li><strong>Alternating sum:</strong> \\(\\sum_{k=0}^{n} (-1)^k \\binom{n}{k} = 0\\) for \\(n \\geq 1\\). (Set \\(x = -1\\) in the binomial theorem.)</li>
    <li><strong>Sum of squares:</strong> The sum of the squares of entries in row \\(n\\) equals the central entry of row \\(2n\\): \\(\\sum_{k=0}^{n} \\binom{n}{k}^2 = \\binom{2n}{n}\\).</li>
    <li><strong>Natural numbers:</strong> The second diagonal (positions 1 in each row) reads 1, 2, 3, 4, 5, ... The third diagonal reads 1, 3, 6, 10, 15, ... (triangular numbers!).</li>
</ul>

<p>Pascal's Triangle is a treasure chest. Every time you look at it from a new angle, another gem falls out.</p>
`,
                visualizations: [
                    {
                        id: 'pascal-hockey',
                        title: 'Hockey Stick Identity',
                        description: 'Click on any entry to start a hockey stick. Click entries along a diagonal to extend it. The running sum always matches the entry "below and over."',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 420, scale: 1, originX: 0, originY: 0 });
                            var totalRows = 10;
                            var pascal = [];
                            for (var r = 0; r < totalRows; r++) {
                                pascal[r] = [1];
                                for (var c = 1; c < r; c++) {
                                    pascal[r][c] = pascal[r - 1][c - 1] + pascal[r - 1][c];
                                }
                                if (r > 0) pascal[r][r] = 1;
                            }

                            var stickCells = [];
                            var stickDir = 0; // 0 = left diagonal, 1 = right diagonal
                            var cellW = 50, cellH = 34;

                            function getPos(r, c) {
                                return {
                                    x: viz.width / 2 - (pascal[r].length - 1) * cellW / 2 + c * cellW,
                                    y: 20 + r * cellH
                                };
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;

                                var sum = 0;
                                var stickSet = {};
                                stickCells.forEach(function (sc) { stickSet[sc.r + ',' + sc.c] = true; sum += pascal[sc.r][sc.c]; });

                                // Determine hockey stick result cell
                                var resultCell = null;
                                if (stickCells.length >= 2) {
                                    var last = stickCells[stickCells.length - 1];
                                    if (stickDir === 0) {
                                        resultCell = { r: last.r + 1, c: last.c };
                                    } else {
                                        resultCell = { r: last.r + 1, c: last.c + 1 };
                                    }
                                }

                                for (var r = 0; r < totalRows; r++) {
                                    for (var c = 0; c < pascal[r].length; c++) {
                                        var p = getPos(r, c);
                                        var inStick = stickSet[r + ',' + c];
                                        var isResult = resultCell && resultCell.r === r && resultCell.c === c;

                                        if (inStick) {
                                            ctx.fillStyle = viz.colors.teal + '55';
                                            ctx.beginPath(); ctx.arc(p.x, p.y, 16, 0, Math.PI * 2); ctx.fill();
                                        }
                                        if (isResult) {
                                            ctx.fillStyle = viz.colors.orange + '55';
                                            ctx.beginPath(); ctx.arc(p.x, p.y, 16, 0, Math.PI * 2); ctx.fill();
                                        }

                                        ctx.fillStyle = inStick ? viz.colors.teal : (isResult ? viz.colors.orange : viz.colors.white);
                                        ctx.font = (inStick || isResult ? 'bold 14px' : '12px') + ' -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText(pascal[r][c], p.x, p.y);
                                    }
                                }

                                // Draw stick lines
                                if (stickCells.length >= 2) {
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 2;
                                    for (var i = 0; i < stickCells.length - 1; i++) {
                                        var p1 = getPos(stickCells[i].r, stickCells[i].c);
                                        var p2 = getPos(stickCells[i + 1].r, stickCells[i + 1].c);
                                        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                                    }
                                    // Draw the "blade" to result
                                    if (resultCell && resultCell.r < totalRows) {
                                        var pLast = getPos(stickCells[stickCells.length - 1].r, stickCells[stickCells.length - 1].c);
                                        var pRes = getPos(resultCell.r, resultCell.c);
                                        ctx.strokeStyle = viz.colors.orange;
                                        ctx.beginPath(); ctx.moveTo(pLast.x, pLast.y); ctx.lineTo(pRes.x, pRes.y); ctx.stroke();
                                    }
                                }

                                // Show sum
                                if (stickCells.length > 0) {
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.font = '14px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    var parts = stickCells.map(function (sc) { return pascal[sc.r][sc.c]; });
                                    var txt = parts.join(' + ') + ' = ' + sum;
                                    if (resultCell && resultCell.r < totalRows) {
                                        txt += '  =  C(' + resultCell.r + ',' + resultCell.c + ')';
                                    }
                                    ctx.fillText(txt, viz.width / 2, viz.height - 14);
                                }
                            }

                            // Demo hockey sticks via buttons
                            var demos = [
                                { label: 'Example: 1+3+6+10=20', cells: [{ r: 2, c: 0 }, { r: 3, c: 1 }, { r: 4, c: 2 }, { r: 5, c: 3 }], dir: 1 },
                                { label: 'Example: 1+4+10=15', cells: [{ r: 1, c: 1 }, { r: 2, c: 2 }, { r: 3, c: 3 }], dir: 1 },
                                { label: 'Example: 1+1+1+1+1=5', cells: [{ r: 0, c: 0 }, { r: 1, c: 0 }, { r: 2, c: 0 }, { r: 3, c: 0 }, { r: 4, c: 0 }], dir: 0 }
                            ];

                            demos.forEach(function (demo) {
                                VizEngine.createButton(controls, demo.label, function () {
                                    stickCells = demo.cells;
                                    stickDir = demo.dir;
                                    draw();
                                });
                            });

                            VizEngine.createButton(controls, 'Clear', function () {
                                stickCells = [];
                                draw();
                            });

                            draw();
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Verify the row sum identity for row 7: add all entries and check that the result is \\(2^7 = 128\\).',
                        hint: 'Row 7 is: 1, 7, 21, 35, 35, 21, 7, 1.',
                        solution: '\\(1 + 7 + 21 + 35 + 35 + 21 + 7 + 1 = 128 = 2^7\\). &#10003;'
                    },
                    {
                        question: 'Find a hockey stick sum that equals 56. (Hint: 56 = C(8,3).)',
                        hint: 'You need a diagonal sum ending at the entry just before C(8,3). Try summing C(2,0) + C(3,1) + C(4,2) + C(5,3) + C(6,4) + C(7,5).',
                        solution: 'One example: sum along the diagonal \\(\\binom{3}{3} + \\binom{4}{3} + \\binom{5}{3} + \\binom{6}{3} + \\binom{7}{3} = 1 + 4 + 10 + 20 + 35 = 70\\). Actually, for 56 = \\(\\binom{8}{3}\\), sum: \\(\\binom{2}{2} + \\binom{3}{2} + \\binom{4}{2} + \\binom{5}{2} + \\binom{6}{2} + \\binom{7}{2} = 1 + 3 + 6 + 10 + 15 + 21 = 56\\). &#10003;'
                    },
                    {
                        question: 'The third diagonal of Pascal\'s Triangle reads 1, 3, 6, 10, 15, 21, ... These are the triangular numbers. Can you explain why \\(\\binom{n}{2} = \\frac{n(n-1)}{2}\\) gives triangular numbers?',
                        hint: 'A triangular number \\(T_k = 1 + 2 + \\cdots + k = \\frac{k(k+1)}{2}\\). Compare with \\(\\binom{n}{2}\\).',
                        solution: '\\(\\binom{n}{2} = \\frac{n!}{2!(n-2)!} = \\frac{n(n-1)}{2}\\). Setting \\(n = k+1\\), we get \\(\\binom{k+1}{2} = \\frac{(k+1)k}{2} = T_k\\), the \\(k\\)-th triangular number. So the third diagonal of Pascal\'s Triangle (entries \\(\\binom{2}{2}, \\binom{3}{2}, \\binom{4}{2}, \\ldots\\)) is exactly the sequence of triangular numbers.'
                    }
                ]
            },

            // ============================================================
            // Section 5: Binomial Connections
            // ============================================================
            {
                id: 'binomial',
                title: 'Binomial Connections',
                content: `
<h2>Why "Pascal's Triangle" is Really the "Binomial Triangle"</h2>

<p>Every entry in Pascal's Triangle has another name. The entry at row \\(n\\), position \\(k\\) is the <strong>binomial coefficient</strong> "\\(n\\) choose \\(k\\)," written \\(\\binom{n}{k}\\). It answers the question: <em>in how many ways can you choose \\(k\\) objects from a collection of \\(n\\)?</em></p>

<div class="env-block definition">
<strong>Binomial Coefficient</strong><br>
\\[
\\binom{n}{k} = \\frac{n!}{k!(n-k)!}
\\]
where \\(n! = n \\times (n-1) \\times \\cdots \\times 2 \\times 1\\) is the factorial. By convention, \\(0! = 1\\).
</div>

<p>Why "binomial"? Because these numbers appear as the coefficients when you expand a power of a binomial (a two-term expression):</p>

\\[
(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k
\\]

<p>For example:</p>
<ul>
    <li>\\((a+b)^2 = 1 \\cdot a^2 + 2 \\cdot ab + 1 \\cdot b^2\\). Coefficients: <strong>1, 2, 1</strong> (row 2!).</li>
    <li>\\((a+b)^3 = 1 \\cdot a^3 + 3 \\cdot a^2b + 3 \\cdot ab^2 + 1 \\cdot b^3\\). Coefficients: <strong>1, 3, 3, 1</strong> (row 3!).</li>
    <li>\\((a+b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4\\). Coefficients: <strong>1, 4, 6, 4, 1</strong> (row 4!).</li>
</ul>

<p>This is the <strong>Binomial Theorem</strong>, one of the most useful identities in all of mathematics. Isaac Newton later extended it to non-integer exponents, creating a tool that powered the development of calculus.</p>

<div class="viz-placeholder" data-viz="binomial-expand"></div>

<h3>Counting connections</h3>

<p>The combinatorial interpretation makes many Pascal identities obvious. For instance:</p>

<div class="env-block example">
<strong>Why \\(\\binom{n}{k} = \\binom{n}{n-k}\\)?</strong><br>
Choosing \\(k\\) items to <em>include</em> is the same as choosing \\(n-k\\) items to <em>exclude</em>. Same decision, different framing. This is why each row of Pascal's Triangle is symmetric.
</div>

<div class="env-block example">
<strong>Why \\(\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}\\)?</strong><br>
This is Pascal's Rule itself. Consider one particular item, say item #1. Either it is in your chosen set (then choose \\(k-1\\) more from the remaining \\(n-1\\); that is \\(\\binom{n-1}{k-1}\\)) or it is not (then choose all \\(k\\) from the remaining \\(n-1\\); that is \\(\\binom{n-1}{k}\\)). The two cases are mutually exclusive and exhaustive, so you add them.
</div>

<h3>Pascal's Triangle in probability</h3>

<p>Flip a fair coin \\(n\\) times. The number of ways to get exactly \\(k\\) heads is \\(\\binom{n}{k}\\). Since there are \\(2^n\\) total outcomes, the probability of exactly \\(k\\) heads in \\(n\\) flips is:</p>

\\[
P(k \\text{ heads}) = \\frac{\\binom{n}{k}}{2^n}
\\]

<p>This is the <strong>binomial distribution</strong>, the workhorse of probability theory. Pascal's Triangle literally gives you the probability of every outcome in a sequence of coin flips. When \\(n\\) is large, this distribution approaches the famous bell curve (Gaussian distribution), connecting our simple triangle to the deepest ideas in statistics.</p>

<div class="env-block intuition">
<strong>The big picture</strong><br>
Pascal's Triangle sits at the intersection of combinatorics, algebra, number theory, probability, and fractal geometry. A single construction rule (add the two numbers above) generates connections to Fibonacci numbers, powers of 2, the Sierpinski fractal, the binomial theorem, the normal distribution, and much more. It is a microcosm of mathematical unity: simple rules, infinite depth.
</div>

<p>We have only scratched the surface. Other patterns in Pascal's Triangle include Catalan numbers, Stirling numbers, the Bernoulli triangle, and connections to the Gamma function. But even what we have seen in this chapter should convince you: this is one of the most remarkable objects in all of mathematics.</p>
`,
                visualizations: [
                    {
                        id: 'binomial-expand',
                        title: 'Binomial Expansion Visualizer',
                        description: 'Choose an exponent n to see the expansion of (a+b)^n with coefficients from Pascal\'s Triangle highlighted.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 320, scale: 1, originX: 0, originY: 0 });
                            var n = 4;

                            function binomial(n, k) {
                                if (k < 0 || k > n) return 0;
                                if (k === 0 || k === n) return 1;
                                var result = 1;
                                for (var i = 0; i < k; i++) {
                                    result = result * (n - i) / (i + 1);
                                }
                                return Math.round(result);
                            }

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;

                                // Title
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('(a + b)' + superscript(n), W / 2, 30);

                                // Expansion
                                var terms = [];
                                for (var k = 0; k <= n; k++) {
                                    var coeff = binomial(n, k);
                                    var aPow = n - k;
                                    var bPow = k;
                                    var term = '';
                                    if (coeff !== 1 || (aPow === 0 && bPow === 0)) term += coeff;
                                    if (aPow > 0) term += 'a' + (aPow > 1 ? superscript(aPow) : '');
                                    if (bPow > 0) term += 'b' + (bPow > 1 ? superscript(bPow) : '');
                                    terms.push({ text: term, coeff: coeff });
                                }

                                // Draw terms
                                var totalWidth = 0;
                                var termWidths = terms.map(function (t, i) {
                                    ctx.font = '16px -apple-system,sans-serif';
                                    var w = ctx.measureText(t.text).width + (i < terms.length - 1 ? 28 : 0);
                                    totalWidth += w;
                                    return w;
                                });

                                var x = (W - totalWidth) / 2;
                                var y = 80;
                                terms.forEach(function (t, i) {
                                    // Draw coefficient bubble
                                    ctx.fillStyle = viz.colors.orange + '33';
                                    var coeffStr = '' + t.coeff;
                                    ctx.font = '16px -apple-system,sans-serif';
                                    var cw = ctx.measureText(coeffStr).width;
                                    ctx.beginPath();
                                    ctx.arc(x + cw / 2, y - 30, 14, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(coeffStr, x + cw / 2, y - 29);

                                    // Draw term
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '16px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText(t.text, x, y);
                                    x += termWidths[i] - 28;
                                    if (i < terms.length - 1) {
                                        ctx.fillStyle = viz.colors.text;
                                        ctx.fillText(' + ', x, y);
                                        x += 28;
                                    }
                                });

                                // Draw Pascal row below
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Row ' + n + ' of Pascal\'s Triangle:', W / 2, y + 50);

                                var rowY = y + 80;
                                var spacing = 50;
                                var startX2 = W / 2 - n * spacing / 2;
                                for (var k2 = 0; k2 <= n; k2++) {
                                    var val = binomial(n, k2);
                                    ctx.fillStyle = viz.colors.orange + '44';
                                    ctx.beginPath();
                                    ctx.arc(startX2 + k2 * spacing, rowY, 18, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = 'bold 16px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(val, startX2 + k2 * spacing, rowY + 1);
                                }

                                // Formula
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Each coefficient C(n,k) = n! / (k!(n-k)!)', W / 2, H - 20);
                            }

                            function superscript(num) {
                                var sup = { '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3', '4': '\u2074', '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079' };
                                return ('' + num).split('').map(function (d) { return sup[d] || d; }).join('');
                            }

                            VizEngine.createSlider(controls, 'n', 1, 8, n, 1, function (v) {
                                n = Math.round(v);
                                draw();
                            });

                            draw();
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Expand \\((a + b)^5\\) using Pascal\'s Triangle.',
                        hint: 'Row 5 is: 1, 5, 10, 10, 5, 1. Each coefficient multiplies \\(a^{5-k} b^k\\).',
                        solution: '\\((a+b)^5 = a^5 + 5a^4b + 10a^3b^2 + 10a^2b^3 + 5ab^4 + b^5\\).'
                    },
                    {
                        question: 'If you flip a fair coin 6 times, what is the probability of getting exactly 3 heads?',
                        hint: 'Use the formula \\(P = \\binom{6}{3} / 2^6\\). Look up \\(\\binom{6}{3}\\) from row 6 of Pascal\'s Triangle.',
                        solution: '\\(\\binom{6}{3} = 20\\) and \\(2^6 = 64\\), so the probability is \\(20/64 = 5/16 \\approx 0.3125\\), or about 31.25%.'
                    },
                    {
                        question: 'Use the Binomial Theorem to compute \\(1.01^{10}\\) approximately. (Hint: write \\(1.01 = 1 + 0.01\\) and keep only the first three terms.)',
                        hint: '\\((1 + 0.01)^{10} \\approx \\binom{10}{0}(0.01)^0 + \\binom{10}{1}(0.01)^1 + \\binom{10}{2}(0.01)^2 + \\cdots\\)',
                        solution: 'Keeping the first three terms: \\(1 + 10(0.01) + 45(0.0001) = 1 + 0.1 + 0.0045 = 1.1045\\). The exact value is \\(1.01^{10} \\approx 1.10462\\), so the three-term approximation is remarkably close!'
                    }
                ]
            }
        ]
    });
})();
