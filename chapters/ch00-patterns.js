// === Chapter 0: Mathematics — The Science of Patterns ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Mathematics — The Science of Patterns',
    subtitle: 'Seeing the hidden order behind the world',
    sections: [
        // ===== Section 0: What is math really? =====
        {
            id: 'what-is-math',
            title: 'What Is Math, Really?',
            content: `
<h2>Forget Everything You Think You Know</h2>

<p>Quick: close your eyes and think of the word "mathematics." What comes to mind? Probably a blackboard covered in equations, a stack of homework, or that one teacher who loved pop quizzes. Maybe a calculator, a dusty textbook, or the dreaded times table.</p>

<p>Here is a secret that most textbooks never tell you: <strong>mathematics is not about calculations.</strong> Calculations are to mathematics what spelling is to poetry. They are a necessary skill, sure, but they completely miss the point. Nobody reads Shakespeare and says, "Wow, what excellent spelling!" And nobody should look at the Mandelbrot set and say, "Wow, what excellent arithmetic!"</p>

<div class="env-block intuition">
<strong>Core Insight</strong><br>
Mathematics is the <em>science of patterns</em>. It is the study of structure, order, and regularity wherever they appear: in numbers, in shapes, in motion, in logic, in the universe itself.
</div>

<p>The mathematician Keith Devlin wrote a wonderful book with exactly that title: <em>Mathematics: The Science of Patterns</em>. His point was simple but profound. Every branch of mathematics, from algebra to topology, from number theory to chaos theory, is ultimately about discovering, describing, and explaining patterns.</p>

<p>Arithmetic studies patterns of counting and quantity. Geometry studies patterns of shape and space. Calculus studies patterns of continuous change. Statistics studies patterns in data. Even logic studies patterns of reasoning itself.</p>

<p>And here is the truly magical part: the patterns that mathematicians discover are not inventions. They are <em>discoveries</em>. The Fibonacci sequence did not start existing when Fibonacci wrote it down. It was already there in the spirals of sunflowers, the arrangement of pinecone scales, and the breeding patterns of rabbits. The golden ratio did not begin when the ancient Greeks measured it. It was already woven into the geometry of pentagons and the growth of nautilus shells.</p>

<h3>A Different Way to See</h3>

<p>Think about music for a moment. A person who knows nothing about music hears a symphony and thinks, "That sounds nice." A trained musician hears the same symphony and notices the key changes, the counterpoint, the way the theme from the first movement reappears, transformed, in the finale. The music is the same. But the experience is completely different.</p>

<p>Mathematics works the same way. Once you learn to see patterns, the entire world transforms. A pinecone is no longer just a pinecone; it is a masterpiece of spiral geometry. A soap bubble is not just a bubble; it is a perfect minimal surface, nature solving an optimization problem in real time. A galaxy is not just pretty; it is a logarithmic spiral, the same curve you find in a nautilus shell and a hurricane.</p>

<p>This course is about learning to see the world that way. No proofs required. No exams. Just the patterns, the stories, and the beauty.</p>

<div class="viz-placeholder" data-viz="ch00-kaleidoscope"></div>

<div class="env-block remark">
<strong>A word on formulas</strong><br>
We will use a few formulas in this course, but only when they make things clearer. A formula like \\(F_n = F_{n-1} + F_{n-2}\\) is just a compact way of saying "each number is the sum of the two before it." Think of formulas as shorthand, not as the point.
</div>
`,
            visualizations: [
                {
                    id: 'ch00-kaleidoscope',
                    title: 'Mathematical Kaleidoscope',
                    description: 'Watch as different mathematical patterns blend into each other. Each pattern appears everywhere in nature.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var patternIndex = 0;
                        var patternNames = ['Spirals', 'Waves', 'Symmetry', 'Fractals'];
                        var label = document.createElement('div');
                        label.style.cssText = 'color:#8b949e;font-size:0.85rem;text-align:center;margin-top:4px;';
                        label.textContent = 'Pattern: Spirals';
                        container.appendChild(label);

                        VizEngine.createButton(controls, 'Next Pattern', function() {
                            patternIndex = (patternIndex + 1) % patternNames.length;
                            label.textContent = 'Pattern: ' + patternNames[patternIndex];
                        });

                        function drawSpirals(t) {
                            var cx = w / 2, cy = h / 2;
                            for (var i = 0; i < 6; i++) {
                                var angle = (Math.PI * 2 / 6) * i + t * 0.0005;
                                ctx.strokeStyle = VizEngine.hsl((i * 60 + t * 0.02) % 360, 70, 60);
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var s = 0; s < 200; s++) {
                                    var theta = s * 0.08 + angle;
                                    var r = s * 0.8 + Math.sin(t * 0.002 + s * 0.05) * 10;
                                    var x = cx + r * Math.cos(theta);
                                    var y = cy + r * Math.sin(theta);
                                    if (s === 0) ctx.moveTo(x, y);
                                    else ctx.lineTo(x, y);
                                }
                                ctx.stroke();
                            }
                        }

                        function drawWaves(t) {
                            for (var row = 0; row < 8; row++) {
                                ctx.strokeStyle = VizEngine.hsl((row * 45 + t * 0.03) % 360, 70, 55);
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var x = 0; x <= w; x += 2) {
                                    var freq1 = 0.015 + row * 0.003;
                                    var freq2 = 0.008;
                                    var y = h / 2 + Math.sin(x * freq1 + t * 0.002 + row) * (40 + row * 8) +
                                            Math.sin(x * freq2 - t * 0.001) * 20 +
                                            (row - 3.5) * 35;
                                    if (x === 0) ctx.moveTo(x, y);
                                    else ctx.lineTo(x, y);
                                }
                                ctx.stroke();
                            }
                        }

                        function drawSymmetry(t) {
                            var cx = w / 2, cy = h / 2;
                            var folds = 8;
                            for (var layer = 0; layer < 4; layer++) {
                                var baseR = 40 + layer * 45 + Math.sin(t * 0.001 + layer) * 15;
                                ctx.strokeStyle = VizEngine.hsl((layer * 90 + t * 0.02) % 360, 75, 60);
                                ctx.lineWidth = 2;
                                for (var f = 0; f < folds; f++) {
                                    var a0 = (Math.PI * 2 / folds) * f + t * 0.0003 * (layer % 2 === 0 ? 1 : -1);
                                    var a1 = a0 + Math.PI * 2 / folds;
                                    ctx.beginPath();
                                    for (var s = 0; s <= 20; s++) {
                                        var frac = s / 20;
                                        var angle = a0 + (a1 - a0) * frac;
                                        var r = baseR + Math.sin(frac * Math.PI * 3 + t * 0.003) * (15 + layer * 5);
                                        var x = cx + r * Math.cos(angle);
                                        var y = cy + r * Math.sin(angle);
                                        if (s === 0) ctx.moveTo(x, y);
                                        else ctx.lineTo(x, y);
                                    }
                                    ctx.stroke();
                                }
                            }
                        }

                        function drawFractalTree(t) {
                            var cx = w / 2, cy = h - 20;
                            var baseAngle = -Math.PI / 2;
                            var branchAngle = 0.45 + Math.sin(t * 0.001) * 0.15;
                            var ratio = 0.68;

                            function branch(x, y, len, angle, depth) {
                                if (depth > 10 || len < 3) return;
                                var x2 = x + len * Math.cos(angle);
                                var y2 = y + len * Math.sin(angle);
                                ctx.strokeStyle = VizEngine.hsl(120 + depth * 15, 60, 35 + depth * 5);
                                ctx.lineWidth = Math.max(1, 8 - depth);
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x2, y2);
                                ctx.stroke();
                                branch(x2, y2, len * ratio, angle - branchAngle, depth + 1);
                                branch(x2, y2, len * ratio, angle + branchAngle, depth + 1);
                            }

                            branch(cx, cy, h * 0.28, baseAngle, 0);
                        }

                        var drawFns = [drawSpirals, drawWaves, drawSymmetry, drawFractalTree];

                        viz.animate(function(t) {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);
                            drawFns[patternIndex](t);
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Look around the room you are in right now. Can you find at least three examples of patterns? They could be in floor tiles, fabric textures, window grilles, or anything else. Write down what you notice.',
                    hint: 'Patterns do not have to be complex. A row of evenly spaced windows is a pattern. A wallpaper design that repeats is a pattern. Even the grid of pixels on your screen is a pattern.',
                    solution: 'There is no single "right" answer here. Common examples include: repeating tile patterns on floors or walls, the symmetry of a window frame, the spiral binding of a notebook, the hexagonal pattern of a honeycomb-shaped shelf, or the regular spacing of keys on a keyboard. The goal is to start noticing that patterns are everywhere.'
                },
                {
                    question: 'The mathematician G.H. Hardy said: "A mathematician, like a painter or a poet, is a maker of patterns." What do you think he meant by comparing mathematics to art?',
                    hint: 'Think about what painters and poets do. They take raw materials (paint, words) and arrange them into pleasing structures. What are the "raw materials" of mathematics?',
                    solution: 'Hardy was making the point that mathematics, like art, is fundamentally creative. Just as a painter arranges colors and shapes into a beautiful composition, a mathematician arranges logical ideas into beautiful structures. The "raw materials" of math are concepts like numbers, shapes, and logical relationships. The "artwork" is the theorems, proofs, and theories that reveal deep, surprising connections. Both activities require imagination, taste, and a sense of elegance.'
                }
            ]
        },

        // ===== Section 1: Patterns in Nature =====
        {
            id: 'patterns-in-nature',
            title: 'Patterns in Nature',
            content: `
<h2>Nature's Hidden Geometry</h2>

<p>In 1952, the British mathematician Alan Turing (yes, the same Turing who cracked the Enigma code and invented the concept of a computer) published a remarkable paper called "The Chemical Basis of Morphogenesis." In it, he asked a question that seems almost childlike in its simplicity: <em>Why does a leopard have spots?</em></p>

<p>Think about it. A leopard starts as a single fertilized cell. That cell divides, and divides again, billions of times, eventually forming a full-grown animal. Every cell has the same DNA. So how do some cells "know" to produce dark pigment while others stay light? How does a pattern of spots, rather than stripes or solid color, emerge from identical building blocks?</p>

<p>Turing's answer was extraordinary. He showed that two simple chemicals, diffusing across a surface at different rates while reacting with each other, could spontaneously generate patterns. Spots, stripes, spirals, waves: all could arise from the same basic mechanism, depending on the relative diffusion rates and reaction strengths. This is now called a <strong>Turing pattern</strong> or a <strong>reaction-diffusion system</strong>.</p>

<div class="env-block definition">
<strong>Reaction-Diffusion</strong><br>
A system where substances spread out (diffuse) while also undergoing chemical reactions with each other. The interplay of these two processes can create spatial patterns from an initially uniform state.
</div>

<h3>Spirals: The Universe's Favorite Shape</h3>

<p>If nature had to pick a single favorite shape, it would be the spiral. Spirals appear at every scale of the universe:</p>

<ul>
<li><strong>Galaxies</strong> like the Milky Way are vast spirals of hundreds of billions of stars.</li>
<li><strong>Hurricanes</strong> form spiral bands of storm clouds hundreds of kilometers across.</li>
<li><strong>Sunflowers</strong> arrange their seeds in interlocking spirals (we will explore this deeply in Chapter 1).</li>
<li><strong>Nautilus shells</strong> grow in a logarithmic spiral, adding new chambers in a beautiful geometric progression.</li>
<li><strong>DNA</strong>, the molecule of life itself, is a double helix: two spirals wound around each other.</li>
</ul>

<p>Why spirals? Because a spiral is what happens when something grows while also turning. A nautilus shell adds material at its opening, and the opening slowly rotates as the animal grows. A galaxy's arms are shaped by the combined effects of gravity and rotation. Even water going down a drain forms a spiral because of the interplay between gravity pulling it down and the Coriolis effect giving it a slight twist.</p>

<div class="viz-placeholder" data-viz="ch00-natural-patterns"></div>

<h3>Stripes, Spots, and the Turing Mechanism</h3>

<p>After Turing's 1952 paper, decades passed before biologists could test his ideas. But when they did, the results were stunning. In the 1990s, researchers showed that the patterns on tropical fish match Turing's predictions almost perfectly. When young angelfish grow, their stripes actually split and new stripes appear between them, exactly as the Turing model predicts.</p>

<p>Here is a fun empirical rule that the mathematician James Murray discovered: on animals, thin tails always have stripes (never spots), but spotted bodies can have either striped or spotted tails. Why? Because of the geometry. A tail is essentially a thin cylinder. Turing's equations on a thin cylinder can only produce stripes (the wavelength of the pattern cannot "fit" around the small circumference to make spots). But a wider body gives the pattern enough room to form spots.</p>

<div class="env-block example">
<strong>Spotted Body, Striped Tail</strong><br>
Look at a cheetah, a leopard, or a giraffe. The body has spots (or patches), but the tail has stripes (or rings). This is not a coincidence; it is geometry constraining the pattern.
</div>

<h3>Branching and Fractals</h3>

<p>Trees branch. Rivers branch. Blood vessels branch. Lightning branches. Lungs branch. Even the cracks in dried mud branch. Why does the same pattern keep showing up?</p>

<p>Because branching is an efficient solution to a common problem: <em>how to reach every point in a region while using as little material as possible.</em> A tree needs sunlight on every leaf. Your circulatory system needs to deliver blood to every cell. A river system needs to drain water from every part of a watershed. The branching pattern solves all these problems, which is why evolution (and physics) converge on it again and again.</p>

<p>These branching patterns are examples of <strong>fractals</strong>, structures that look similar at different scales. We will spend an entire part of this course (Chapters 7 through 10) exploring fractals in depth. For now, just notice: zoom in on a tree branch, and it looks like a miniature tree. Zoom in on a river tributary, and it looks like a miniature river system. This self-similarity is one of nature's deepest patterns.</p>
`,
            visualizations: [
                {
                    id: 'ch00-natural-patterns',
                    title: 'Spirals in Nature',
                    description: 'An animated logarithmic spiral, the shape shared by galaxies, hurricanes, and seashells. Adjust the growth rate to see how the spiral changes.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 30, originX: undefined, originY: undefined });
                        var w = viz.width, h = viz.height;
                        viz.originX = w / 2;
                        viz.originY = h / 2;
                        var growthRate = 0.18;

                        VizEngine.createSlider(controls, 'Growth rate', 0.05, 0.4, growthRate, 0.01, function(v) {
                            growthRate = v;
                        });

                        viz.animate(function(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = w / 2, cy = h / 2;
                            var maxAngle = 6 * Math.PI;
                            var offset = t * 0.0008;

                            // Draw multiple interleaved spirals
                            for (var s = 0; s < 3; s++) {
                                var phaseShift = (2 * Math.PI / 3) * s;
                                ctx.strokeStyle = VizEngine.hsl((s * 120 + t * 0.01) % 360, 65, 55);
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 600; i++) {
                                    var theta = (i / 600) * maxAngle + phaseShift + offset;
                                    var r = 5 * Math.exp(growthRate * theta);
                                    var x = cx + r * Math.cos(theta);
                                    var y = cy + r * Math.sin(theta);
                                    if (r > Math.max(w, h)) break;
                                    if (!started) { ctx.moveTo(x, y); started = true; }
                                    else ctx.lineTo(x, y);
                                }
                                ctx.stroke();
                            }

                            // Center dot
                            ctx.fillStyle = viz.colors.gold;
                            ctx.beginPath();
                            ctx.arc(cx, cy, 4, 0, Math.PI * 2);
                            ctx.fill();

                            viz.screenText('Logarithmic Spiral: r = ae^(b\u03B8)', w / 2, h - 18, viz.colors.text, 12);
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Name three examples of spirals in nature that were not mentioned in the text. For each, explain what is "growing while turning."',
                    hint: 'Think about plant tendrils, spider webs, horns of certain animals, the arrangement of leaves on a stem, or weather systems.',
                    solution: 'Possible answers: (1) Ram horns grow from the base while the animal grows, producing a spiral. (2) Spider webs have a spiral of sticky silk that the spider lays down while walking in circles. (3) The tendrils of climbing plants spiral as they grow and search for support. (4) The arms of a whirlpool spiral as water rotates while being pulled inward.'
                },
                {
                    question: 'Why do you think thin tails can only have stripes, not spots? Try to explain in your own words, thinking about what happens when you try to "wrap" a polka-dot pattern around a narrow cylinder.',
                    hint: 'Imagine cutting out a piece of spotted wrapping paper and wrapping it around a pencil. What happens to the spots?',
                    solution: 'If the tail is very thin (small circumference), a single "spot" would wrap most of the way around, effectively becoming a stripe or a ring. The Turing mechanism produces patterns with a characteristic wavelength (the spacing between spots). If the cylinder is narrower than this wavelength, the pattern cannot form distinct spots; it can only form stripes that run along the length. This is a purely geometric constraint.'
                },
                {
                    question: 'Fractals look "the same at different scales." Can you think of a human-made structure that has this self-similar property?',
                    hint: 'Think about organizational structures, road networks, or certain architectural designs.',
                    solution: 'Examples: (1) Road networks: a highway branches into roads, which branch into streets, which branch into driveways, each level looking similar to the one above. (2) A corporate org chart: the CEO oversees divisions, each division has departments, each department has teams. (3) Russian nesting dolls (matryoshka): each doll contains a smaller version of itself. (4) Broccoli or cauliflower (borderline natural/human-cultivated) where each floret looks like a miniature version of the whole.'
                }
            ]
        },

        // ===== Section 2: Patterns in Numbers =====
        {
            id: 'patterns-in-numbers',
            title: 'Patterns in Numbers',
            content: `
<h2>The Playground of Pure Thought</h2>

<p>Nature gives us spirals, stripes, and branching trees. But mathematics has its own garden of patterns, built purely from numbers and logic. And the remarkable thing is that these abstract number patterns keep turning up in the real world, in places nobody expected.</p>

<h3>The Simplest Pattern: Counting</h3>

<p>The most basic pattern is the one you learned as a toddler: 1, 2, 3, 4, 5, ... Each number is one more than the last. Simple. But even this humble sequence hides surprises. Add up the first few counting numbers:</p>

\\[1 = 1\\]
\\[1 + 2 = 3\\]
\\[1 + 2 + 3 = 6\\]
\\[1 + 2 + 3 + 4 = 10\\]

<p>The results (1, 3, 6, 10, 15, 21, ...) are called <strong>triangular numbers</strong> because you can arrange that many dots into a perfect triangle. The ancient Greeks loved these. They discovered that the \\(n\\)-th triangular number is always \\(\\frac{n(n+1)}{2}\\). Legend has it that the young Gauss, at age 7 or 8, rediscovered this formula when his teacher told the class to add up the numbers from 1 to 100. While his classmates labored, Gauss paired the numbers: 1+100, 2+99, 3+98, ..., getting 50 pairs of 101 each. Answer: 5050. In seconds.</p>

<div class="viz-placeholder" data-viz="ch00-number-patterns"></div>

<h3>Squares and Beyond</h3>

<p>Square numbers are another ancient favorite: 1, 4, 9, 16, 25, ... These are 1&sup2;, 2&sup2;, 3&sup2;, 4&sup2;, 5&sup2;. You can arrange them into perfect squares of dots. But here is a lovely pattern hiding inside:</p>

\\[1 = 1\\]
\\[4 - 1 = 3\\]
\\[9 - 4 = 5\\]
\\[16 - 9 = 7\\]
\\[25 - 16 = 9\\]

<p>The differences between consecutive squares are always the odd numbers! In general, \\((n+1)^2 - n^2 = 2n + 1\\). You can see this visually: to go from an \\(n \\times n\\) square to an \\((n+1) \\times (n+1)\\) square, you add one new row of \\(n\\) dots along the bottom, one new column of \\(n\\) dots along the side, and one dot in the corner. That is \\(n + n + 1 = 2n + 1\\) dots, which is always odd.</p>

<div class="env-block example">
<strong>Sums of Odd Numbers</strong><br>
Since each square number is the previous square plus an odd number, it follows that the sum of the first \\(n\\) odd numbers is \\(n^2\\):<br>
\\[1 + 3 + 5 + 7 + \\cdots + (2n-1) = n^2\\]
The ancient Greeks proved this by arranging L-shaped "gnomons" around a growing square.
</div>

<h3>Prime Numbers: The Atoms of Arithmetic</h3>

<p>Of all number patterns, the primes are the most mysterious. A prime number is a whole number greater than 1 that cannot be divided evenly by anything except 1 and itself: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...</p>

<p>Primes are the "atoms" of the number system. Every whole number can be built by multiplying primes together (this is called the <strong>Fundamental Theorem of Arithmetic</strong>). For example, 12 = 2 &times; 2 &times; 3, and 2310 = 2 &times; 3 &times; 5 &times; 7 &times; 11.</p>

<p>But here is what makes primes so fascinating: they seem to follow no simple pattern. They thin out as you go higher (there are 25 primes below 100 but only 21 between 100 and 200), yet they never stop entirely. Euclid proved over 2,000 years ago that there are infinitely many primes. And the exact distribution of primes remains one of the deepest unsolved problems in all of mathematics, connected to the famous <strong>Riemann Hypothesis</strong> (which we will glimpse in Chapter 17).</p>

<div class="env-block intuition">
<strong>Primes are wild</strong><br>
If you list the gaps between consecutive primes, you get: 1, 2, 2, 4, 2, 4, 2, 4, 6, 2, 6, ... There is no formula that generates this sequence. Primes appear to be scattered almost randomly, yet they are completely determined by the simple definition "not divisible by anything smaller." This tension between simplicity and apparent randomness is one of the great mysteries of mathematics.
</div>
`,
            visualizations: [
                {
                    id: 'ch00-number-patterns',
                    title: 'Number Pattern Explorer',
                    description: 'Explore different number patterns visually. Watch how triangular, square, and other figurate numbers grow.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var currentPattern = 0;
                        var patternNames = ['Triangular Numbers', 'Square Numbers', 'Odd Numbers \u2192 Squares'];
                        var nValue = 6;

                        VizEngine.createSlider(controls, 'n', 1, 10, nValue, 1, function(v) {
                            nValue = Math.round(v);
                            draw();
                        });

                        VizEngine.createButton(controls, 'Next Pattern', function() {
                            currentPattern = (currentPattern + 1) % patternNames.length;
                            draw();
                        });

                        var label = document.createElement('div');
                        label.style.cssText = 'color:#8b949e;font-size:0.85rem;text-align:center;margin-top:4px;';
                        container.appendChild(label);

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);
                            label.textContent = patternNames[currentPattern];

                            var n = nValue;
                            var dotR = Math.min(14, Math.max(4, Math.floor(180 / (n + 1))));
                            var spacing = dotR * 2.5;

                            if (currentPattern === 0) {
                                // Triangular numbers
                                var totalRows = n;
                                var totalH = totalRows * spacing;
                                var startY = (h - totalH) / 2 + dotR;
                                var count = 0;
                                for (var row = 1; row <= n; row++) {
                                    var rowW = row * spacing;
                                    var startX = (w - rowW) / 2 + spacing / 2;
                                    for (var col = 0; col < row; col++) {
                                        count++;
                                        var hue = (row * 40) % 360;
                                        ctx.fillStyle = VizEngine.hsl(hue, 65, 55);
                                        ctx.beginPath();
                                        ctx.arc(startX + col * spacing, startY + (row - 1) * spacing, dotR, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                }
                                viz.screenText('T(' + n + ') = ' + count, w / 2, h - 24, viz.colors.gold, 16);
                            } else if (currentPattern === 1) {
                                // Square numbers
                                var totalW = n * spacing;
                                var startX = (w - totalW) / 2 + spacing / 2;
                                var startY = (h - totalW) / 2 + spacing / 2;
                                for (var row = 0; row < n; row++) {
                                    for (var col = 0; col < n; col++) {
                                        var hue = ((row + col) * 25) % 360;
                                        ctx.fillStyle = VizEngine.hsl(hue, 60, 50);
                                        ctx.beginPath();
                                        ctx.arc(startX + col * spacing, startY + row * spacing, dotR, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                }
                                viz.screenText(n + '\u00B2 = ' + (n * n), w / 2, h - 24, viz.colors.gold, 16);
                            } else {
                                // Odd numbers summing to squares: show L-shaped gnomons
                                var totalW = n * spacing;
                                var startX = (w - totalW) / 2 + spacing / 2;
                                var startY = (h - totalW) / 2 + spacing / 2;
                                for (var layer = 1; layer <= n; layer++) {
                                    var hue = ((layer - 1) * 40 + 200) % 360;
                                    var color = VizEngine.hsl(hue, 65, 50);
                                    // Bottom row of this gnomon
                                    for (var col = 0; col < layer; col++) {
                                        ctx.fillStyle = color;
                                        ctx.beginPath();
                                        ctx.arc(startX + col * spacing, startY + (layer - 1) * spacing, dotR, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                    // Right column of this gnomon (excluding corner)
                                    for (var row = 0; row < layer - 1; row++) {
                                        ctx.fillStyle = color;
                                        ctx.beginPath();
                                        ctx.arc(startX + (layer - 1) * spacing, startY + row * spacing, dotR, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                }
                                var oddNum = 2 * n - 1;
                                viz.screenText('1 + 3 + ... + ' + oddNum + ' = ' + (n * n), w / 2, h - 24, viz.colors.gold, 14);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using Gauss\'s pairing trick, calculate \\(1 + 2 + 3 + \\cdots + 50\\). Show how you pair the numbers.',
                    hint: 'Pair the first with the last, the second with the second-to-last, and so on. How many pairs are there? What does each pair sum to?',
                    solution: 'Pair: 1+50 = 51, 2+49 = 51, 3+48 = 51, ..., 25+26 = 51. There are 25 pairs, each summing to 51. So the total is 25 &times; 51 = 1275. Alternatively, using the formula: \\(\\frac{50 \\times 51}{2} = 1275\\).'
                },
                {
                    question: 'What is the sum of the first 8 odd numbers? Verify that it equals \\(8^2\\).',
                    hint: 'The first 8 odd numbers are 1, 3, 5, 7, 9, 11, 13, 15.',
                    solution: '1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 = 64 = 8&sup2;. This confirms the pattern that the sum of the first \\(n\\) odd numbers is always \\(n^2\\).'
                },
                {
                    question: 'Is 91 prime? Many people think so at first glance. Can you find its factors?',
                    hint: 'Try dividing by small primes: 2, 3, 5, 7, 11, 13...',
                    solution: '91 is NOT prime. 91 = 7 &times; 13. It is a common "trick" number because it looks and feels prime, but it has these two prime factors. You only need to check primes up to &radic;91 &asymp; 9.5, so checking 2, 3, 5, and 7 is sufficient.'
                }
            ]
        },

        // ===== Section 3: Math as a Universal Language =====
        {
            id: 'universal-language',
            title: 'Math as a Universal Language',
            content: `
<h2>The Language That Needs No Translation</h2>

<p>In 1977, NASA launched the Voyager spacecraft, each carrying a golden record with sounds and images from Earth, intended for any extraterrestrial civilization that might find them. What mathematical concepts did NASA include? The positions of pulsars expressed as binary numbers, the hydrogen atom's spin-flip frequency as a unit of time, and diagrams that use basic geometry to show where Earth is located.</p>

<p>Why math? Because it is the one language that does not depend on culture, biology, or history. An alien civilization might have no concept of English, no ears to hear music, no eyes to see pictures. But if they are intelligent enough to build technology, they must understand that 2 + 3 = 5, that circles have a constant ratio of circumference to diameter, and that prime numbers are prime. These facts are true everywhere in the universe.</p>

<div class="env-block intuition">
<strong>The Unreasonable Effectiveness of Mathematics</strong><br>
In 1960, the physicist Eugene Wigner wrote a famous essay titled "The Unreasonable Effectiveness of Mathematics in the Natural Sciences." His point: it is deeply mysterious that mathematics, a product of pure human thought, turns out to describe the physical universe with astonishing precision. Why should equations written on paper predict the behavior of galaxies, atoms, and everything in between?
</div>

<h3>Galileo's Insight</h3>

<p>Galileo Galilei wrote in 1623: "The Book of Nature is written in the language of mathematics." This was not a metaphor. Galileo was making a precise claim: the laws of physics are mathematical relationships. Gravity does not merely "pull things down." It pulls with a force precisely proportional to the product of the masses and inversely proportional to the square of the distance:</p>

\\[F = G\\frac{m_1 m_2}{r^2}\\]

<p>This equation, Newton's law of gravity, predicts the motion of planets, the trajectories of spacecraft, and the tides of the ocean, all from a single compact formula. The same equation that tells you how fast an apple falls tells NASA how to navigate a probe to Jupiter.</p>

<h3>The Same Math, Different Worlds</h3>

<p>One of the most striking things about mathematics is how the same structures appear in completely unrelated contexts:</p>

<ul>
<li>The <strong>wave equation</strong> describes ripples on a pond, vibrations of a guitar string, light traveling through space, and quantum probability waves. Different physics, same math.</li>
<li>The <strong>exponential function</strong> \\(e^x\\) describes population growth, radioactive decay, compound interest, and the cooling of a hot cup of coffee. Different phenomena, same math.</li>
<li>The <strong>normal distribution</strong> (the bell curve) appears in heights of people, measurement errors, thermal fluctuations, and test scores. Different data, same math.</li>
</ul>

<p>This is not a coincidence. When two different systems obey the same mathematical law, it means they share a deep structural similarity that is invisible on the surface. Mathematics gives us the eyes to see these hidden connections.</p>

<h3>A Shared Heritage</h3>

<p>Mathematics transcends not only physics but also culture. The Pythagorean theorem was discovered independently by the Babylonians, the Chinese, and the Indians, centuries before Pythagoras. The concept of zero was developed by Mayan and Indian mathematicians on opposite sides of the world. Pascal's triangle was studied by Chinese, Persian, and Indian scholars before Pascal was born.</p>

<p>These are not cases of cultural transmission; they are cases of different civilizations finding the same truths because those truths are inherent in the structure of numbers and shapes themselves. Mathematics is not something we invent; it is something we <em>discover</em>, like a continent that was always there, waiting for someone to land on its shores.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'The exponential function appears in both population growth and radioactive decay. In population growth, the quantity increases over time; in radioactive decay, it decreases. How can the same function describe both? What changes?',
                    hint: 'The exponential function is \\(f(t) = A \\cdot e^{kt}\\). Think about what happens when \\(k\\) is positive versus negative.',
                    solution: 'When \\(k \\gt 0\\), the exponential function \\(Ae^{kt}\\) grows without bound (population growth). When \\(k \\lt 0\\), it decays toward zero (radioactive decay). The mathematical structure is identical; only the sign of the rate constant \\(k\\) changes. This illustrates how a single mathematical idea can encompass seemingly opposite phenomena.'
                },
                {
                    question: 'If you were designing a message for extraterrestrial intelligence, what mathematical concepts would you include to demonstrate that the sender is intelligent? List at least three ideas and explain why each would be understood by any sufficiently advanced civilization.',
                    hint: 'Think about what mathematical facts are universal: they do not depend on our number system, our language, or even our physics.',
                    solution: 'Good choices: (1) Prime numbers (e.g., send pulses in groups of 2, 3, 5, 7, 11, 13...). Any civilization that understands multiplication will recognize these. (2) The Pythagorean theorem or a right triangle with sides 3, 4, 5. Geometry is universal. (3) The ratio \\(\\pi\\) expressed as a relationship between a circle and its diameter. (4) The value of \\(e\\) or properties of exponential growth. (5) Binary representations of fundamental physical constants.'
                }
            ]
        },

        // ===== Section 4: Why Math is Beautiful =====
        {
            id: 'why-beautiful',
            title: 'Why Math Is Beautiful',
            content: `
<h2>Beauty You Can Prove</h2>

<p>In 2014, neuroscientists at University College London put mathematicians in an fMRI brain scanner and showed them equations. When the mathematicians saw a formula they considered beautiful (like Euler's identity \\(e^{i\\pi} + 1 = 0\\)), the same brain region lit up that responds to beautiful music and art: the medial orbito-frontal cortex. Mathematical beauty is not a metaphor. It is a genuine aesthetic experience, processed by the same neural machinery as any other form of beauty.</p>

<p>But what makes a piece of mathematics beautiful? Here are some qualities that mathematicians consistently point to:</p>

<h3>1. Surprise</h3>

<p>The most beautiful results are the ones you never saw coming. Consider this: draw any triangle. Find the midpoint of each side. Connect each midpoint to the opposite vertex. Those three lines always meet at a single point, the centroid. <em>Always</em>, no matter how weird or lopsided the triangle. That is surprising, and that surprise is beautiful.</p>

<h3>2. Inevitability</h3>

<p>The best proofs feel like they could not have gone any other way. Once you understand them, you feel not just that the result is true, but that it <em>had</em> to be true. There is a sense of necessity, of deep rightness, like hearing a chord resolve in music.</p>

<h3>3. Connections</h3>

<p>When two apparently unrelated ideas turn out to be secretly connected, mathematicians find it thrilling. Euler's formula \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\) connects the exponential function (from calculus) with trigonometry (from geometry) through complex numbers (from algebra). Three different worlds, one equation. That is profound.</p>

<div class="env-block theorem">
<strong>Euler's Identity</strong><br>
\\[e^{i\\pi} + 1 = 0\\]
This single equation connects five of the most important numbers in mathematics: \\(e\\) (the base of natural logarithms), \\(i\\) (the imaginary unit), \\(\\pi\\) (the ratio of a circle's circumference to its diameter), \\(1\\) (the multiplicative identity), and \\(0\\) (the additive identity). It has been called "the most beautiful equation in mathematics."
</div>

<h3>4. Simplicity from Complexity</h3>

<p>Sometimes a complicated mess simplifies to something clean and elegant. The sum \\(\\frac{1}{1^2} + \\frac{1}{2^2} + \\frac{1}{3^2} + \\frac{1}{4^2} + \\cdots\\) looks like it should be some ugly decimal. But Euler showed it equals exactly \\(\\frac{\\pi^2}{6}\\). Why should the sum of reciprocal squares involve \\(\\pi\\), a number from geometry? Nobody expected this. It is like finding a perfect diamond buried in mud.</p>

<div class="viz-placeholder" data-viz="ch00-beauty-demo"></div>

<h3>5. Visual Splendor</h3>

<p>Some mathematics is literally, visually beautiful. The Mandelbrot set, which we will explore in Chapter 9, is defined by a formula of laughable simplicity (\\(z_{n+1} = z_n^2 + c\\)), yet it produces images of infinite complexity and haunting beauty. Fractals, tessellations, minimal surfaces, and strange attractors are all mathematically defined objects that rival any artwork in their visual impact.</p>

<h3>Your Journey Begins</h3>

<p>Over the next 17 chapters, we are going to explore some of the most beautiful ideas in mathematics. We will meet Fibonacci and his rabbits, stare into the infinite, build fractals, discover symmetry, and encounter problems that the greatest minds on Earth have struggled with for centuries. Along the way, you will see patterns you never noticed before, connections you never expected, and beauty you never imagined could exist in the world of numbers.</p>

<p>No formulas to memorize. No exams to pass. Just the patterns, the stories, and the beauty. Let's begin.</p>

<div class="env-block remark">
<strong>How to use this course</strong><br>
Each chapter is self-contained, but they build on each other gently. The interactive visualizations are not optional; they are the heart of the course. Play with them. Drag things around. Change the sliders. Break things. Mathematics is not a spectator sport; the best way to understand it is to get your hands dirty.
</div>
`,
            visualizations: [
                {
                    id: 'ch00-beauty-demo',
                    title: 'The Basel Sum Approaches \\(\\pi^2/6\\)',
                    description: 'Watch the sum \\(\\frac{1}{1^2} + \\frac{1}{2^2} + \\frac{1}{3^2} + \\cdots\\) converge to \\(\\pi^2/6 \\approx 1.6449\\). Each bar represents one term; the total creeps toward the target.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var w = viz.width, h = viz.height;
                        var ctx = viz.ctx;
                        var nTerms = 15;

                        VizEngine.createSlider(controls, 'Terms', 1, 50, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        var target = Math.PI * Math.PI / 6;

                        function draw() {
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(0, 0, w, h);

                            var margin = 60;
                            var graphW = w - margin * 2;
                            var graphH = h - margin * 2;

                            // Axes
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(margin, margin);
                            ctx.lineTo(margin, h - margin);
                            ctx.lineTo(w - margin, h - margin);
                            ctx.stroke();

                            // Target line
                            var targetY = h - margin - (target / 2) * graphH;
                            ctx.strokeStyle = '#f0883e';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(margin, targetY);
                            ctx.lineTo(w - margin, targetY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('\u03C0\u00B2/6 \u2248 1.6449', w - margin - 60, targetY - 10, viz.colors.orange, 12);

                            // Bars showing partial sums
                            var barW = Math.max(2, Math.min(30, graphW / nTerms - 2));
                            var sum = 0;
                            for (var k = 1; k <= nTerms; k++) {
                                sum += 1 / (k * k);
                                var barH = (sum / 2) * graphH;
                                var x = margin + (k - 0.5) / nTerms * graphW - barW / 2;
                                var y = h - margin - barH;

                                var hue = 200 + (k / nTerms) * 160;
                                ctx.fillStyle = VizEngine.hsl(hue % 360, 65, 50);
                                ctx.fillRect(x, y, barW, barH);
                            }

                            viz.screenText('Sum after ' + nTerms + ' terms: ' + sum.toFixed(6), w / 2, 30, viz.colors.white, 14);
                            viz.screenText('Error: ' + (target - sum).toFixed(6), w / 2, 50, viz.colors.text, 12);

                            // Y-axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            for (var v = 0; v <= 2; v += 0.5) {
                                var ly = h - margin - (v / 2) * graphH;
                                ctx.fillText(v.toFixed(1), margin - 6, ly + 4);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Euler\'s identity \\(e^{i\\pi} + 1 = 0\\) is often called the "most beautiful equation." In your own words, explain why connecting five fundamental constants in one equation is considered beautiful.',
                    hint: 'Think about the five qualities of mathematical beauty listed in this section. Which ones apply?',
                    solution: 'Euler\'s identity is beautiful because of (1) surprise: who would expect the irrational, transcendental numbers \\(e\\) and \\(\\pi\\), the imaginary unit \\(i\\), and the basic counting numbers 0 and 1 to be related? (2) Simplicity from complexity: a single, short equation encapsulates the deepest connections between analysis, geometry, and algebra. (3) Connection: it links five different mathematical worlds (exponentiation, trigonometry, complex numbers, arithmetic, and the concept of nothing). (4) Inevitability: once you understand Euler\'s formula \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\), setting \\(\\theta = \\pi\\) makes the identity feel necessary and inescapable.'
                },
                {
                    question: 'The sum \\(\\frac{1}{1^2} + \\frac{1}{2^2} + \\frac{1}{3^2} + \\cdots = \\frac{\\pi^2}{6}\\) is called the Basel problem. Use the interactive visualization to find out: how many terms do you need to get within 0.01 of \\(\\pi^2/6\\)?',
                    hint: 'Use the slider to increase the number of terms. Watch the "Error" display until it drops below 0.01.',
                    solution: 'You need about 100 terms to get within 0.01 of \\(\\pi^2/6\\). The error after \\(n\\) terms is approximately \\(\\frac{1}{n}\\), so for error &lt; 0.01 you need \\(n \\gt 100\\). The convergence is quite slow, which is part of what makes it remarkable that the sum equals something as clean as \\(\\pi^2/6\\).'
                }
            ]
        }
    ]
});
})();
