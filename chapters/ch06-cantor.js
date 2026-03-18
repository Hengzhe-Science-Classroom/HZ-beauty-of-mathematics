// === Chapter 6: Cantor's Paradise ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch06',
        number: 6,
        title: "Cantor's Paradise",
        subtitle: 'Where infinity comes in different sizes',
        sections: [
            // ============================================================
            // Section 1: Georg Cantor's Bold Idea
            // ============================================================
            {
                id: 'cantor-bold-idea',
                title: "Georg Cantor's Bold Idea",
                content: `
<h2>The Man Who Tamed Infinity</h2>

<p>In the late 19th century, a German mathematician dared to ask a question that most of his contemporaries considered either trivial or insane: <strong>Are all infinities the same size?</strong></p>

<p>Georg Cantor (1845&ndash;1918) was not the first person to think about infinity. Philosophers and mathematicians had wrestled with the concept for millennia. Aristotle distinguished between "potential infinity" (a process that never ends, like counting) and "actual infinity" (a completed infinite collection). For over two thousand years, most thinkers refused to treat actual infinity as a legitimate mathematical object. Infinity was a direction, not a destination.</p>

<p>Cantor changed all of that. Working at the University of Halle, far from the mathematical elite of Berlin, he developed an entirely new theory of infinite sets that would eventually reshape the foundations of mathematics itself.</p>

<div class="env-block intuition">
<strong>The Central Question</strong><br>
Consider the natural numbers: 1, 2, 3, 4, 5, &hellip; There are infinitely many of them.<br>
Now consider the even numbers: 2, 4, 6, 8, 10, &hellip; There are infinitely many of those too.<br><br>
But the even numbers are a <em>subset</em> of the natural numbers. So shouldn't there be "fewer" of them? Or are both collections somehow the same size?
</div>

<p>Before Cantor, this question had no rigorous answer. Galileo had noticed the paradox back in 1638: you can pair every natural number with its double (1&harr;2, 2&harr;4, 3&harr;6, &hellip;), so the two sets seem to have equally many elements. But you can also see that the even numbers are "missing" all the odd numbers. Galileo concluded that words like "more," "fewer," and "equal" simply don't apply to infinite collections.</p>

<p>Cantor disagreed. He believed you <em>could</em> compare the sizes of infinite sets, and he found the tool for doing so: <strong>one-to-one correspondence</strong>.</p>

<h3>A Revolutionary Under Siege</h3>

<p>Cantor's ideas did not receive a warm welcome. Leopold Kronecker, one of the most powerful mathematicians in Berlin, called Cantor a "scientific charlatan" and a "corruptor of youth." Henri Poincar&eacute; described Cantor's set theory as a "disease" from which mathematics would one day recover. Even some of Cantor's allies found his results hard to believe.</p>

<p>The hostility took a personal toll. Cantor suffered from bouts of depression throughout his life, and he spent his final years in a sanatorium. He died in 1918, not fully appreciated in his own time.</p>

<p>But history vindicated him completely. David Hilbert, perhaps the greatest mathematician of the early 20th century, declared:</p>

<div class="env-block remark">
<strong>Hilbert's Declaration</strong><br>
"No one shall expel us from the paradise that Cantor has created."
</div>

<p>Today, Cantor's theory of infinite sets is part of the bedrock of modern mathematics. Every working mathematician uses his ideas, often without thinking twice. The "paradise" Hilbert spoke of is now simply called <em>set theory</em>, and it is the language in which virtually all of mathematics is written.</p>

<p>Let us enter that paradise together.</p>

<div class="viz-placeholder" data-viz="cantor-timeline"></div>
`,
                visualizations: [
                    {
                        id: 'cantor-timeline',
                        title: 'Cantor vs. Infinity: A Timeline',
                        description: 'Key moments in humanity\'s struggle with the infinite.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 340, scale: 1, originX: 0, originY: 170 });
                            var events = [
                                { year: 1638, label: 'Galileo\'s paradox', color: viz.colors.orange },
                                { year: 1845, label: 'Cantor born', color: viz.colors.blue },
                                { year: 1874, label: 'First proof:\nreals uncountable', color: viz.colors.green },
                                { year: 1891, label: 'Diagonal\nargument', color: viz.colors.teal },
                                { year: 1897, label: 'Paradoxes\nemerge', color: viz.colors.red },
                                { year: 1918, label: 'Cantor dies', color: viz.colors.purple },
                                { year: 1926, label: 'Hilbert:\n"Paradise"', color: viz.colors.gold }
                            ];
                            var minY = 1620;
                            var maxY = 1940;
                            var margin = 60;
                            var usable = viz.width - 2 * margin;

                            function draw(t) {
                                viz.clear();
                                var ctx = viz.ctx;
                                // timeline bar
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(margin, 170);
                                ctx.lineTo(viz.width - margin, 170);
                                ctx.stroke();

                                for (var i = 0; i < events.length; i++) {
                                    var e = events[i];
                                    var x = margin + (e.year - minY) / (maxY - minY) * usable;
                                    var delay = i * 400;
                                    var progress = VizEngine.clamp((t - delay) / 800, 0, 1);
                                    if (progress <= 0) continue;
                                    var alpha = progress;
                                    var yOff = (i % 2 === 0) ? -1 : 1;
                                    var baseY = 170;
                                    var tipY = baseY + yOff * (50 + 20 * (i % 3)) * progress;

                                    ctx.globalAlpha = alpha;
                                    ctx.strokeStyle = e.color;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(x, baseY);
                                    ctx.lineTo(x, tipY);
                                    ctx.stroke();

                                    ctx.fillStyle = e.color;
                                    ctx.beginPath();
                                    ctx.arc(x, baseY, 5, 0, Math.PI * 2);
                                    ctx.fill();

                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = yOff < 0 ? 'bottom' : 'top';
                                    ctx.fillText(e.year, x, tipY + yOff * 4);

                                    var lines = e.label.split('\n');
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.fillStyle = e.color;
                                    for (var li = 0; li < lines.length; li++) {
                                        ctx.fillText(lines[li], x, tipY + yOff * (20 + li * 14));
                                    }
                                    ctx.globalAlpha = 1;
                                }
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Galileo noticed that you can pair every counting number with its square (1&harr;1, 2&harr;4, 3&harr;9, &hellip;). Does this mean there are "as many" perfect squares as counting numbers? What was Galileo\'s own conclusion?',
                        hint: 'Think about what it means for two sets to be the "same size." In everyday life we compare sizes by counting; for infinite sets we need a different tool.',
                        solution: 'Yes, in the Cantorian sense, the perfect squares are the same "size" as the natural numbers, because we can create a one-to-one correspondence: \\(n \\leftrightarrow n^2\\). Every natural number gets a unique partner, and every perfect square is covered. Galileo, however, concluded that the notions of "equal," "greater," and "lesser" simply do not apply to infinite quantities. Cantor later showed that such comparisons <em>are</em> meaningful.'
                    },
                    {
                        question: 'Why do you think so many mathematicians resisted Cantor\'s ideas? Can you think of an everyday intuition about infinity that Cantor\'s theory contradicts?',
                        hint: 'Consider the intuition that "a part is always smaller than the whole." Does this remain true for infinite sets?',
                        solution: 'The main resistance came from the fact that Cantor\'s theory violates the ancient principle that "the whole is greater than any of its parts." For infinite sets, a proper subset (like the even numbers inside all natural numbers) can be put into one-to-one correspondence with the entire set. This feels wrong if you carry over intuitions from finite collections. Additionally, many mathematicians were uncomfortable treating "actual infinity" as a completed mathematical object at all.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Matching Sets — One-to-One Correspondence
            // ============================================================
            {
                id: 'one-to-one',
                title: 'Matching Sets — One-to-One Correspondence',
                content: `
<h2>How to Compare Infinite Collections</h2>

<p>Imagine you walk into a lecture hall and want to know whether there are more seats than students, or more students than seats. You <em>could</em> count both groups, but there is a simpler method: ask every student to sit down. If every student has a seat and every seat has a student, the two groups are the same size. No counting required.</p>

<p>This is the key idea behind <strong>one-to-one correspondence</strong> (also called a <em>bijection</em>). Two sets have the same size, or <strong>cardinality</strong>, if you can pair up their elements so that:</p>

<div class="env-block definition">
<strong>One-to-One Correspondence (Bijection)</strong><br>
A pairing between two sets \\(A\\) and \\(B\\) such that:
<ol>
<li>Every element of \\(A\\) is paired with exactly one element of \\(B\\).</li>
<li>Every element of \\(B\\) is paired with exactly one element of \\(A\\).</li>
<li>No element in either set is left unpaired.</li>
</ol>
If such a pairing exists, we say \\(|A| = |B|\\) (the sets have the same cardinality).
</div>

<p>For finite sets, this is completely intuitive. Five chairs and five students: everyone sits, everyone matched, done. But for infinite sets, remarkable things happen.</p>

<h3>The Naturals and the Evens</h3>

<p>Consider the natural numbers \\(\\mathbb{N} = \\{1, 2, 3, 4, 5, \\ldots\\}\\) and the even numbers \\(E = \\{2, 4, 6, 8, 10, \\ldots\\}\\). The pairing \\(n \\leftrightarrow 2n\\) is a perfect one-to-one correspondence:</p>

\\[1 \\leftrightarrow 2, \\quad 2 \\leftrightarrow 4, \\quad 3 \\leftrightarrow 6, \\quad 4 \\leftrightarrow 8, \\quad \\ldots\\]

<p>Every natural number has a unique even partner, and every even number is claimed. The two infinite sets have the <em>same cardinality</em>, even though one is a proper subset of the other.</p>

<h3>The Integers, Too</h3>

<p>What about the integers \\(\\mathbb{Z} = \\{\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\}\\)? This set extends in both directions, so it seems "twice as big" as \\(\\mathbb{N}\\). Yet we can build a correspondence:</p>

\\[0 \\leftrightarrow 1, \\quad 1 \\leftrightarrow 2, \\quad -1 \\leftrightarrow 3, \\quad 2 \\leftrightarrow 4, \\quad -2 \\leftrightarrow 5, \\quad \\ldots\\]

<p>We alternate: non-negative, then negative, zig-zagging through all the integers while counting with the naturals. Everyone gets a partner. So \\(|\\mathbb{Z}| = |\\mathbb{N}|\\).</p>

<div class="env-block intuition">
<strong>A set is called <em>countably infinite</em></strong> if it can be put into one-to-one correspondence with the natural numbers. This means you could, in principle, list its elements as a sequence: first, second, third, &hellip; with every element eventually appearing on the list.
</div>

<h3>Even the Rationals Are Countable</h3>

<p>This is one of Cantor's most surprising results. The rational numbers (fractions) seem far more numerous than the integers. Between any two integers, there are infinitely many fractions. Between 0 and 1 alone, there are \\(\\tfrac{1}{2}, \\tfrac{1}{3}, \\tfrac{2}{3}, \\tfrac{1}{4}, \\tfrac{3}{4}, \\ldots\\) and so on, forever. Surely there are "more" rationals than naturals?</p>

<p>Cantor showed the answer is no. Using a clever zig-zag argument (sometimes called "Cantor's snake"), you can list all positive fractions in a sequence. Arrange them in a grid where row \\(m\\) and column \\(n\\) contain the fraction \\(\\tfrac{m}{n}\\), then trace a diagonal path, skipping fractions you have already counted (like \\(\\tfrac{2}{4} = \\tfrac{1}{2}\\)).</p>

<div class="viz-placeholder" data-viz="bijection-demo"></div>

<p>The interactive visualization above lets you see how different infinite sets pair up with the natural numbers. Try switching between the naturals-to-evens, naturals-to-integers, and the zig-zag through the rationals.</p>

<div class="viz-placeholder" data-viz="cantor-zigzag"></div>
`,
                visualizations: [
                    {
                        id: 'bijection-demo',
                        title: 'One-to-One Correspondence',
                        description: 'Watch elements pair up between two infinite sets. Choose which sets to compare.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 300, scale: 1, originX: 0, originY: 0 });
                            var mode = 0; // 0=evens, 1=integers, 2=rationals
                            var count = 1;
                            var maxCount = 12;
                            var animT = 0;

                            VizEngine.createButton(controls, 'N ↔ Evens', function () { mode = 0; count = 1; });
                            VizEngine.createButton(controls, 'N ↔ Integers', function () { mode = 1; count = 1; });
                            var slider = VizEngine.createSlider(controls, 'Pairs shown', 1, maxCount, 1, 1, function (v) { count = Math.round(v); });

                            function getPartner(n, m) {
                                if (m === 0) return 2 * n; // evens
                                if (m === 1) { // integers: 0,1,-1,2,-2,...
                                    if (n === 1) return 0;
                                    if (n % 2 === 0) return n / 2;
                                    return -Math.floor(n / 2);
                                }
                                return n; // fallback
                            }

                            function partnerLabel(n, m) {
                                var v = getPartner(n, m);
                                return '' + v;
                            }

                            function draw(t) {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width;
                                var H = viz.height;
                                var topY = 70;
                                var botY = 210;

                                // labels
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Natural Numbers', W / 2, 30);

                                var setName = mode === 0 ? 'Even Numbers' : (mode === 1 ? 'Integers' : 'Rationals');
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText(setName, W / 2, H - 15);

                                var spacing = Math.min(52, (W - 80) / maxCount);
                                var startX = (W - spacing * (count - 1)) / 2;

                                for (var i = 1; i <= count; i++) {
                                    var x = startX + (i - 1) * spacing;

                                    // top circle (natural number)
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.arc(x, topY, 16, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.fillStyle = viz.colors.bg;
                                    ctx.font = 'bold 13px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText('' + i, x, topY);

                                    // bottom circle (partner)
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.beginPath();
                                    ctx.arc(x, botY, 16, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.fillStyle = viz.colors.bg;
                                    ctx.fillText(partnerLabel(i, mode), x, botY);

                                    // connecting line with animation
                                    var phase = VizEngine.clamp((t - i * 200) / 600, 0, 1);
                                    if (phase > 0) {
                                        ctx.strokeStyle = viz.colors.orange + (Math.round(phase * 255)).toString(16).padStart(2, '0');
                                        ctx.lineWidth = 2;
                                        ctx.beginPath();
                                        ctx.moveTo(x, topY + 16);
                                        ctx.lineTo(x, topY + 16 + (botY - topY - 32) * phase);
                                        ctx.stroke();

                                        // arrow head when complete
                                        if (phase > 0.95) {
                                            ctx.fillStyle = viz.colors.orange;
                                            ctx.beginPath();
                                            ctx.moveTo(x, botY - 16);
                                            ctx.lineTo(x - 5, botY - 24);
                                            ctx.lineTo(x + 5, botY - 24);
                                            ctx.closePath();
                                            ctx.fill();
                                        }
                                    }
                                }

                                // ellipsis
                                if (count > 0) {
                                    var ex = startX + count * spacing;
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '20px -apple-system,sans-serif';
                                    ctx.fillText('...', ex, topY);
                                    ctx.fillText('...', ex, botY);
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    },
                    {
                        id: 'cantor-zigzag',
                        title: "Cantor's Zig-Zag: Counting the Rationals",
                        description: 'Cantor arranged fractions in a grid, then traced a diagonal path to list them all. Press Play to watch the snake crawl.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                            var step = 0;
                            var maxStep = 28;
                            var playing = false;
                            var timer = null;

                            // Generate zig-zag order through grid
                            var path = [];
                            (function () {
                                var size = 8;
                                for (var s = 2; s <= size * 2; s++) {
                                    if (s % 2 === 0) {
                                        for (var r = 1; r < s && r <= size; r++) {
                                            var c = s - r;
                                            if (c >= 1 && c <= size) path.push([r, c]);
                                        }
                                    } else {
                                        for (var c2 = 1; c2 < s && c2 <= size; c2++) {
                                            var r2 = s - c2;
                                            if (r2 >= 1 && r2 <= size) path.push([r2, c2]);
                                        }
                                    }
                                }
                            })();

                            var stepSlider = VizEngine.createSlider(controls, 'Step', 0, maxStep, 0, 1, function (v) { step = Math.round(v); });
                            VizEngine.createButton(controls, 'Play', function () {
                                if (playing) { clearInterval(timer); playing = false; return; }
                                playing = true;
                                timer = setInterval(function () {
                                    step++;
                                    if (step > maxStep) { step = 0; }
                                    stepSlider.value = step;
                                    stepSlider.dispatchEvent(new Event('input'));
                                }, 500);
                            });
                            VizEngine.createButton(controls, 'Reset', function () {
                                step = 0; stepSlider.value = 0;
                                stepSlider.dispatchEvent(new Event('input'));
                                if (playing) { clearInterval(timer); playing = false; }
                            });

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var gridSize = 7;
                                var cellW = 70;
                                var cellH = 48;
                                var offX = 80;
                                var offY = 50;

                                // header labels
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                for (var c = 1; c <= gridSize; c++) {
                                    ctx.fillText('n=' + c, offX + c * cellW, offY - 10);
                                }
                                ctx.textAlign = 'right';
                                for (var r = 1; r <= gridSize; r++) {
                                    ctx.fillText('m=' + r, offX - 10, offY + r * cellH);
                                }

                                // grid of fractions
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                for (var rr = 1; rr <= gridSize; rr++) {
                                    for (var cc = 1; cc <= gridSize; cc++) {
                                        var gcd = (function g(a, b) { return b === 0 ? a : g(b, a % b); })(rr, cc);
                                        var isReduced = (gcd === 1);
                                        ctx.fillStyle = isReduced ? viz.colors.white : (viz.colors.text + '44');
                                        ctx.font = (isReduced ? '' : '') + '13px -apple-system,sans-serif';
                                        ctx.fillText(rr + '/' + cc, offX + cc * cellW, offY + rr * cellH);
                                    }
                                }

                                // draw path
                                if (step > 0) {
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    var limit = Math.min(step, path.length);
                                    for (var i = 0; i < limit; i++) {
                                        var px = offX + path[i][1] * cellW;
                                        var py = offY + path[i][0] * cellH;
                                        if (i === 0) ctx.moveTo(px, py);
                                        else ctx.lineTo(px, py);
                                    }
                                    ctx.stroke();

                                    // highlight current
                                    if (limit > 0) {
                                        var cur = path[limit - 1];
                                        var cx = offX + cur[1] * cellW;
                                        var cy = offY + cur[0] * cellH;
                                        ctx.fillStyle = viz.colors.orange + '44';
                                        ctx.beginPath();
                                        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
                                        ctx.fill();
                                    }

                                    // number visited
                                    var counted = 0;
                                    for (var j = 0; j < limit; j++) {
                                        var g = (function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); })(path[j][0], path[j][1]);
                                        if (g === 1) counted++;
                                    }
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText('Unique fractions counted: ' + counted, offX, offY + (gridSize + 1) * cellH + 10);
                                }
                            }

                            viz.animate(function () { draw(); });
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Find a one-to-one correspondence between the natural numbers and the odd numbers \\(\\{1, 3, 5, 7, \\ldots\\}\\).',
                        hint: 'What simple formula takes \\(n\\) and produces the \\(n\\)-th odd number?',
                        solution: 'The correspondence is \\(n \\leftrightarrow 2n - 1\\). So \\(1 \\leftrightarrow 1,\\ 2 \\leftrightarrow 3,\\ 3 \\leftrightarrow 5,\\ 4 \\leftrightarrow 7,\\ldots\\). Every natural number maps to a unique odd number and vice versa.'
                    },
                    {
                        question: 'Can you find a one-to-one correspondence between the set of positive integers and the set of all integers (including negatives and zero)?',
                        hint: 'Try alternating: send 1 to 0, 2 to 1, 3 to &minus;1, 4 to 2, 5 to &minus;2, &hellip;',
                        solution: 'Define \\(f(n)\\) as follows: if \\(n\\) is even, \\(f(n) = n/2\\); if \\(n\\) is odd, \\(f(n) = -(n-1)/2\\). So \\(f(1)=0,\\ f(2)=1,\\ f(3)=-1,\\ f(4)=2,\\ f(5)=-2,\\ldots\\). This pairs every positive integer with a unique integer.'
                    },
                    {
                        question: 'In Cantor\'s zig-zag through the rationals, why do we skip fractions like \\(\\tfrac{2}{4}\\) or \\(\\tfrac{3}{6}\\)?',
                        hint: 'What fraction are \\(\\tfrac{2}{4}\\) and \\(\\tfrac{3}{6}\\) equal to? Would counting them again cause a problem?',
                        solution: 'Both \\(\\tfrac{2}{4}\\) and \\(\\tfrac{3}{6}\\) equal \\(\\tfrac{1}{2}\\), which was already counted. If we counted them again, the same rational number would appear multiple times in our list, and we would not have a true one-to-one correspondence. By skipping fractions that are not in lowest terms, each rational number is counted exactly once.'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Diagonal Argument
            // ============================================================
            {
                id: 'diagonal-argument',
                title: 'The Diagonal Argument',
                content: `
<h2>The Most Elegant Proof in Mathematics</h2>

<p>In 1891, Cantor published a proof technique so simple and powerful that it is widely considered one of the most beautiful arguments in all of mathematics: the <strong>diagonal argument</strong>.</p>

<p>The goal is to show that the real numbers between 0 and 1 <em>cannot</em> be listed in a sequence. In other words, no matter how cleverly you try, you will never be able to create a complete list that pairs every real number with a natural number. The reals are <strong>uncountable</strong>.</p>

<h3>The Setup</h3>

<p>Suppose, for the sake of contradiction, that someone claims to have a complete list of all real numbers between 0 and 1, written as infinite decimal expansions:</p>

<div class="env-block example">
<strong>The "Complete" List</strong><br>
\\(r_1 = 0.\\mathbf{5}17293\\ldots\\)<br>
\\(r_2 = 0.3\\mathbf{8}4026\\ldots\\)<br>
\\(r_3 = 0.62\\mathbf{1}905\\ldots\\)<br>
\\(r_4 = 0.590\\mathbf{3}17\\ldots\\)<br>
\\(r_5 = 0.4820\\mathbf{6}4\\ldots\\)<br>
\\(r_6 = 0.93571\\mathbf{2}\\ldots\\)<br>
\\(\\vdots\\)
</div>

<p>The bolded digits are the <em>diagonal</em>: the 1st digit of the 1st number, the 2nd digit of the 2nd number, the 3rd digit of the 3rd number, and so on.</p>

<h3>The Killer Move</h3>

<p>Now construct a new number \\(d\\) by changing every diagonal digit. For instance, replace each diagonal digit with a different digit (say, if the digit is less than 5, change it to 7; if it is 5 or greater, change it to 2). In our example:</p>

<p>Diagonal digits: 5, 8, 1, 3, 6, 2, &hellip; &rarr; Changed digits: 2, 2, 7, 7, 2, 7, &hellip;</p>

<p>So \\(d = 0.227727\\ldots\\)</p>

<div class="env-block theorem">
<strong>Cantor's Diagonal Argument</strong><br>
The number \\(d\\) is <em>not on the list</em>. Why? Because \\(d\\) differs from \\(r_1\\) in the 1st decimal place, from \\(r_2\\) in the 2nd decimal place, from \\(r_3\\) in the 3rd decimal place, and in general from \\(r_n\\) in the \\(n\\)-th decimal place. So \\(d \\neq r_n\\) for every \\(n\\).<br><br>
But \\(d\\) is a real number between 0 and 1. If the list were truly complete, \\(d\\) would have to appear somewhere. It doesn't. Contradiction!<br><br>
Therefore, no such complete list can exist. The real numbers are <em>uncountable</em>.
</div>

<p>Take a moment to appreciate this. The argument does not depend on <em>which</em> list you write down. No matter how the list is constructed, the diagonal trick always produces a number that is missing. The reals <strong>inevitably</strong> overflow any attempt to count them.</p>

<div class="viz-placeholder" data-viz="diagonal-viz"></div>

<h3>Why This Matters</h3>

<p>The diagonal argument is not just a clever trick. It reveals something deep: there are fundamentally different "sizes" of infinity. The natural numbers, the integers, and the rationals are all countably infinite, all the "same size." But the real numbers are <em>strictly larger</em>. They represent a higher order of infinity altogether.</p>

<p>Cantor reportedly wrote to his friend Richard Dedekind: "I see it, but I don't believe it!" (Je le vois, mais je ne le crois pas.) The result was so startling that even its creator found it hard to accept.</p>

<div class="env-block remark">
<strong>"I see it, but I don't believe it!"</strong><br>
Georg Cantor, in a letter to Richard Dedekind, 1877. The mathematical evidence was undeniable, but the conclusion defied all intuition about infinity.
</div>
`,
                visualizations: [
                    {
                        id: 'diagonal-viz',
                        title: 'Interactive Diagonal Argument',
                        description: 'Watch the diagonal being extracted and the "missing" number being constructed. Click digits to edit the list and see how the new number always escapes!',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 440, scale: 1, originX: 0, originY: 0 });
                            var rows = 8;
                            var cols = 8;

                            // Generate random digits for the list
                            var grid = [];
                            for (var r = 0; r < rows; r++) {
                                var row = [];
                                for (var c = 0; c < cols; c++) {
                                    row.push(Math.floor(Math.random() * 10));
                                }
                                grid.push(row);
                            }

                            var highlightStep = -1;
                            var animating = false;
                            var animTimer = null;

                            function flipDigit(d) {
                                return d < 5 ? 7 : 2;
                            }

                            VizEngine.createButton(controls, 'Animate Diagonal', function () {
                                if (animating) return;
                                animating = true;
                                highlightStep = -1;
                                animTimer = setInterval(function () {
                                    highlightStep++;
                                    if (highlightStep >= rows) {
                                        clearInterval(animTimer);
                                        animating = false;
                                    }
                                }, 600);
                            });

                            VizEngine.createButton(controls, 'New Random List', function () {
                                for (var r2 = 0; r2 < rows; r2++) {
                                    for (var c2 = 0; c2 < cols; c2++) {
                                        grid[r2][c2] = Math.floor(Math.random() * 10);
                                    }
                                }
                                highlightStep = -1;
                                if (animating) { clearInterval(animTimer); animating = false; }
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                highlightStep = -1;
                                if (animating) { clearInterval(animTimer); animating = false; }
                            });

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var cellW = 42;
                                var cellH = 38;
                                var offX = 110;
                                var offY = 50;

                                // Title row
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('"Complete" list of reals in [0,1]:', offX, 25);

                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';

                                for (var r2 = 0; r2 < rows; r2++) {
                                    // Row label
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.textAlign = 'right';
                                    ctx.fillText('r' + (r2 + 1) + ' = 0.', offX - 8, offY + r2 * cellH + cellH / 2);

                                    for (var c2 = 0; c2 < cols; c2++) {
                                        var cx = offX + c2 * cellW + cellW / 2;
                                        var cy = offY + r2 * cellH + cellH / 2;
                                        var isDiag = (r2 === c2);

                                        // Background highlight for diagonal
                                        if (isDiag && highlightStep >= r2) {
                                            ctx.fillStyle = viz.colors.orange + '44';
                                            ctx.fillRect(offX + c2 * cellW + 2, offY + r2 * cellH + 2, cellW - 4, cellH - 4);
                                        }

                                        // Digit
                                        ctx.textAlign = 'center';
                                        if (isDiag && highlightStep >= r2) {
                                            ctx.fillStyle = viz.colors.orange;
                                            ctx.font = 'bold 18px -apple-system,monospace';
                                        } else {
                                            ctx.fillStyle = viz.colors.white;
                                            ctx.font = '16px -apple-system,monospace';
                                        }
                                        ctx.fillText('' + grid[r2][c2], cx, cy);
                                    }

                                    // Ellipsis
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '14px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText('...', offX + cols * cellW + 4, offY + r2 * cellH + cellH / 2);
                                }

                                // Vertical dots
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('\u22EE', offX + 3 * cellW, offY + rows * cellH + 10);

                                // The constructed number d
                                if (highlightStep >= 0) {
                                    var dY = offY + rows * cellH + 40;
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'right';
                                    ctx.fillText('d = 0.', offX - 8, dY);

                                    for (var k = 0; k < Math.min(highlightStep + 1, rows); k++) {
                                        var diagDigit = grid[k][k];
                                        var newDigit = flipDigit(diagDigit);
                                        var dxPos = offX + k * cellW + cellW / 2;

                                        ctx.fillStyle = viz.colors.green;
                                        ctx.font = 'bold 18px -apple-system,monospace';
                                        ctx.textAlign = 'center';
                                        ctx.fillText('' + newDigit, dxPos, dY);

                                        // small annotation: original → new
                                        ctx.fillStyle = viz.colors.text;
                                        ctx.font = '10px -apple-system,sans-serif';
                                        ctx.fillText(diagDigit + '\u2192' + newDigit, dxPos, dY + 18);
                                    }

                                    if (highlightStep >= rows - 1) {
                                        ctx.fillStyle = viz.colors.red;
                                        ctx.font = 'bold 13px -apple-system,sans-serif';
                                        ctx.textAlign = 'left';
                                        ctx.fillText('\u2190 This number is NOT on the list!', offX + rows * cellW + 20, dY);
                                    }
                                }
                            }

                            viz.animate(function () { draw(); });
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the diagonal argument, why do we change each diagonal digit instead of just reading them off? What goes wrong if we use the diagonal digits directly?',
                        hint: 'If you read off the diagonal digits without changing them, you get a number like \\(0.d_1 d_2 d_3 \\ldots\\). Could that number already be on the list?',
                        solution: 'If we simply read off the diagonal digits \\(0.d_{11}d_{22}d_{33}\\ldots\\) without changing them, the resulting number <em>might</em> already be on the list. It could be \\(r_7\\) or \\(r_{42}\\) or any other entry. By <em>changing</em> each digit, we guarantee that our new number differs from \\(r_n\\) in position \\(n\\) for <em>every</em> \\(n\\), so it cannot equal any entry on the list.'
                    },
                    {
                        question: 'Could you use the diagonal argument with binary expansions (only digits 0 and 1) instead of decimal? Would the proof still work?',
                        hint: 'In binary, flipping a digit means changing 0 to 1 and 1 to 0. Is there any subtlety with binary representations? (Think about \\(0.0111\\ldots = 0.1000\\ldots\\) in binary.)',
                        solution: 'Yes, the argument works in binary with one small precaution. In binary, \\(0.0111\\ldots = 0.1000\\ldots\\) (just like \\(0.999\\ldots = 1.000\\ldots\\) in decimal). To avoid this ambiguity, we can choose our flipping rule so it never produces an infinite string of all 1s or all 0s. For instance, always flip to 1 when the digit is 0, and to 0 when it is 1; the result has both 0s and 1s, so it has a unique binary representation. With this precaution, the proof goes through perfectly.'
                    },
                    {
                        question: 'Suppose someone says: "Fine, your number \\(d\\) is not on the list. Just add it as \\(r_0\\) at the top!" Does this fix the problem?',
                        hint: 'If you add \\(d\\) to the list, does the argument stop working? Can you repeat the diagonal trick on the new, "improved" list?',
                        solution: 'Adding \\(d\\) to the list does not fix the problem. Once you insert \\(d\\), you have a new list, and you can apply the diagonal argument <em>again</em> to produce yet another number that is not on the updated list. No matter how many times you "patch" the list, the diagonal argument always finds a missing number. This is the whole point: no list, however cleverly constructed, can capture all the reals.'
                    }
                ]
            },

            // ============================================================
            // Section 4: More Real Numbers Than Natural Numbers
            // ============================================================
            {
                id: 'reals-uncountable',
                title: 'More Real Numbers Than Natural Numbers',
                content: `
<h2>The Uncountability of the Continuum</h2>

<p>Let us absorb what Cantor's diagonal argument actually tells us. The set of all real numbers between 0 and 1, often denoted \\([0,1]\\), is <strong>uncountably infinite</strong>. It is "bigger" than the set of natural numbers, even though both sets are infinite.</p>

<p>This is worth pausing over. We showed in the previous sections that the natural numbers, integers, and rationals all have the same cardinality: they are all countably infinite. You might have started to suspect that all infinite sets are the same size, that "infinity is infinity." Cantor shattered that intuition.</p>

<div class="env-block theorem">
<strong>Cantor's Theorem (1891)</strong><br>
\\(|\\mathbb{R}| &gt; |\\mathbb{N}|\\)<br><br>
The set of real numbers is strictly larger than the set of natural numbers. No one-to-one correspondence between them is possible.
</div>

<h3>How "Many" Real Numbers Are There?</h3>

<p>Cantor introduced the symbol \\(\\aleph_0\\) (aleph-null, using the first letter of the Hebrew alphabet) for the cardinality of the natural numbers. This is the "smallest" infinity, the baseline of countable infinity.</p>

<p>The cardinality of the real numbers is denoted \\(\\mathfrak{c}\\) (for "continuum"). Cantor showed that \\(\\mathfrak{c} = 2^{\\aleph_0}\\). In words: the number of real numbers equals "2 raised to the power of aleph-null." This is a staggeringly larger infinity.</p>

<div class="env-block intuition">
<strong>Why \\(2^{\\aleph_0}\\)?</strong><br>
Every real number in \\([0,1]\\) can be written as an infinite binary string: \\(0.b_1 b_2 b_3 \\ldots\\) where each \\(b_i\\) is 0 or 1. Each binary string is a function from \\(\\mathbb{N}\\) to \\(\\{0,1\\}\\). The total number of such functions is \\(2^{|\\mathbb{N}|} = 2^{\\aleph_0}\\).<br><br>
For a finite set of size \\(n\\), the number of binary strings of length \\(n\\) is \\(2^n\\). The same logic extends to infinite sets: the "power set" of \\(\\mathbb{N}\\) has cardinality \\(2^{\\aleph_0}\\).
</div>

<h3>A Visual Comparison</h3>

<p>Imagine the number line. The natural numbers are like individual dots scattered along it: 1, 2, 3, &hellip;, each isolated and separate. The real numbers, by contrast, fill the line completely, creating a seamless continuum with no gaps. Between any two real numbers, no matter how close, there are infinitely many more reals. This is the key difference: the reals are <em>dense</em> in a way that even the rationals (which are also dense!) cannot match.</p>

<div class="viz-placeholder" data-viz="countable-vs-uncountable"></div>

<h3>The Power Set Argument</h3>

<p>Cantor proved an even more general result: for <em>any</em> set \\(S\\) (finite or infinite), the set of all subsets of \\(S\\) (called the <strong>power set</strong>, written \\(\\mathcal{P}(S)\\)) is strictly larger than \\(S\\) itself:</p>

\\[|\\mathcal{P}(S)| &gt; |S|\\]

<p>For a finite set of size 3 (say \\(\\{a, b, c\\}\\)), the power set has \\(2^3 = 8\\) elements: \\(\\{\\}, \\{a\\}, \\{b\\}, \\{c\\}, \\{a,b\\}, \\{a,c\\}, \\{b,c\\}, \\{a,b,c\\}\\). For the natural numbers, the power set has \\(2^{\\aleph_0}\\) elements. And we can keep going: the power set of the power set is even larger, ad infinitum.</p>

<div class="viz-placeholder" data-viz="power-set-explosion"></div>
`,
                visualizations: [
                    {
                        id: 'countable-vs-uncountable',
                        title: 'Countable vs. Uncountable on the Number Line',
                        description: 'Naturals appear as isolated dots; reals fill a continuous band. Watch dots accumulate, then see the continuum revealed.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 280, scale: 1, originX: 0, originY: 0 });
                            var phase = 0;
                            var t0 = null;

                            VizEngine.createButton(controls, 'Restart', function () { t0 = null; phase = 0; });

                            function draw(t) {
                                if (t0 === null) t0 = t;
                                var elapsed = (t - t0) / 1000;
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width;
                                var H = viz.height;

                                var lineY1 = 80;
                                var lineY2 = 190;
                                var margin = 60;

                                // Labels
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Natural Numbers (countable)', margin, lineY1 - 30);

                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('Real Numbers (uncountable)', margin, lineY2 - 30);

                                // Number lines
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(margin, lineY1);
                                ctx.lineTo(W - margin, lineY1);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(margin, lineY2);
                                ctx.lineTo(W - margin, lineY2);
                                ctx.stroke();

                                var usable = W - 2 * margin;

                                // Naturals: show dots appearing one by one
                                var numDots = Math.min(Math.floor(elapsed * 3) + 1, 20);
                                for (var i = 0; i < numDots; i++) {
                                    var x = margin + (i + 1) / 22 * usable;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.arc(x, lineY1, 5, 0, Math.PI * 2);
                                    ctx.fill();

                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('' + (i + 1), x, lineY1 + 16);
                                }

                                // Reals: fill with a gradient bar, expanding
                                var fillWidth = VizEngine.clamp(elapsed / 4, 0, 1) * usable;
                                if (fillWidth > 0) {
                                    var grad = ctx.createLinearGradient(margin, 0, margin + usable, 0);
                                    grad.addColorStop(0, viz.colors.teal);
                                    grad.addColorStop(0.5, viz.colors.green);
                                    grad.addColorStop(1, viz.colors.teal);
                                    ctx.fillStyle = grad;
                                    ctx.globalAlpha = 0.6;
                                    ctx.fillRect(margin, lineY2 - 8, fillWidth, 16);
                                    ctx.globalAlpha = 1;

                                    // sprinkle random points to show density
                                    var pointCount = Math.min(Math.floor(elapsed * 40), 200);
                                    for (var p = 0; p < pointCount; p++) {
                                        // use a deterministic-ish pseudo-random based on index
                                        var px = margin + ((p * 137.508) % usable);
                                        if (px < margin + fillWidth) {
                                            ctx.fillStyle = viz.colors.white;
                                            ctx.globalAlpha = 0.3;
                                            ctx.beginPath();
                                            ctx.arc(px, lineY2, 1.5, 0, Math.PI * 2);
                                            ctx.fill();
                                            ctx.globalAlpha = 1;
                                        }
                                    }
                                }

                                // Gap label
                                if (elapsed > 5) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = 'bold 13px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    var alpha = VizEngine.clamp(elapsed - 5, 0, 1);
                                    ctx.globalAlpha = alpha;
                                    ctx.fillText('Gaps everywhere!', W / 2, lineY1 + 35);
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.fillText('No gaps: a complete continuum', W / 2, lineY2 + 30);
                                    ctx.globalAlpha = 1;
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    },
                    {
                        id: 'power-set-explosion',
                        title: 'The Power Set Explosion',
                        description: 'See how quickly the power set grows. For a set of size n, the power set has 2^n elements.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 320, scale: 1, originX: 0, originY: 0 });
                            var n = 1;

                            var slider = VizEngine.createSlider(controls, 'Set size n', 0, 6, 1, 1, function (v) { n = Math.round(v); });

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width;
                                var H = viz.height;

                                var pow = Math.pow(2, n);

                                // Draw original set
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Set S = {' + (n > 0 ? Array.from({ length: n }, function (_, i) { return String.fromCharCode(97 + i); }).join(', ') : '') + '}    |S| = ' + n, W / 2, 30);

                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('Power set P(S) has 2^' + n + ' = ' + pow + ' subsets', W / 2, 55);

                                // Draw circles for original set
                                var setY = 90;
                                var spacing = Math.min(50, (W - 100) / Math.max(n, 1));
                                var startX = (W - spacing * (n - 1)) / 2;
                                for (var i = 0; i < n; i++) {
                                    var sx = startX + i * spacing;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.arc(sx, setY, 14, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.fillStyle = viz.colors.bg;
                                    ctx.font = 'bold 12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(String.fromCharCode(97 + i), sx, setY);
                                }

                                // Draw subsets as small boxes
                                var subsetY = 140;
                                var boxW = Math.min(80, (W - 40) / Math.min(pow, 16));
                                var boxH = 24;
                                var cols = Math.min(pow, Math.floor((W - 40) / boxW));
                                var rowCount = Math.ceil(pow / cols);

                                for (var s = 0; s < pow; s++) {
                                    var col = s % cols;
                                    var row = Math.floor(s / cols);
                                    var bx = 20 + col * boxW + 4;
                                    var by = subsetY + row * (boxH + 6);

                                    // Build subset string
                                    var members = [];
                                    for (var bit = 0; bit < n; bit++) {
                                        if (s & (1 << bit)) members.push(String.fromCharCode(97 + bit));
                                    }
                                    var label = '{' + members.join(',') + '}';

                                    var hue = (s / pow) * 360;
                                    ctx.fillStyle = VizEngine.hsl(hue, 60, 25);
                                    ctx.fillRect(bx, by, boxW - 8, boxH);
                                    ctx.strokeStyle = VizEngine.hsl(hue, 60, 50);
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(bx, by, boxW - 8, boxH);

                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '10px -apple-system,monospace';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(label, bx + (boxW - 8) / 2, by + boxH / 2);
                                }

                                // Infinity note
                                if (n >= 5) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('Imagine n = \u221E ... the power set is incomprehensibly larger!', W / 2, H - 15);
                                }
                            }

                            viz.animate(function () { draw(); });
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'How many subsets does a set of 10 elements have? What about 20 elements?',
                        hint: 'The number of subsets of a set with \\(n\\) elements is \\(2^n\\).',
                        solution: 'A set of 10 elements has \\(2^{10} = 1{,}024\\) subsets. A set of 20 elements has \\(2^{20} = 1{,}048{,}576\\) subsets (over a million). The exponential growth is staggering; even going from 10 to 20 elements multiplies the number of subsets by about 1,000.'
                    },
                    {
                        question: 'Explain in your own words why the diagonal argument proves the reals are uncountable, rather than just showing that one particular list is incomplete.',
                        hint: 'The argument starts by assuming <em>any</em> list is given, not a specific one. What role does the word "suppose" play?',
                        solution: 'The argument is a proof by contradiction: we assume that <em>some</em> complete list exists, without specifying which one. The diagonal construction then produces a number missing from <em>that</em> list, whatever it may be. Since the argument works for any list, no list can be complete. The proof does not target a particular enumeration; it demolishes all possible enumerations at once.'
                    }
                ]
            },

            // ============================================================
            // Section 5: Different Sizes of Infinity
            // ============================================================
            {
                id: 'aleph-hierarchy',
                title: 'Different Sizes of Infinity',
                content: `
<h2>A Staircase That Never Ends</h2>

<p>Once Cantor proved that some infinities are larger than others, a natural question arose: <strong>How many different sizes of infinity are there?</strong></p>

<p>The answer, remarkably, is that there are infinitely many sizes of infinity, and even that "infinity of infinities" is itself infinite in a way that defies easy description.</p>

<h3>The Aleph Numbers</h3>

<p>Cantor introduced the <strong>aleph numbers</strong> to name the sizes of infinite sets:</p>

<div class="env-block definition">
<strong>The Aleph Hierarchy</strong><br>
<ul>
<li>\\(\\aleph_0\\) (aleph-null): the smallest infinity, the cardinality of the natural numbers \\(\\mathbb{N}\\).</li>
<li>\\(\\aleph_1\\): the next larger infinity. By definition, there is no infinity "between" \\(\\aleph_0\\) and \\(\\aleph_1\\).</li>
<li>\\(\\aleph_2\\): the next one after that.</li>
<li>And so on: \\(\\aleph_3, \\aleph_4, \\ldots\\)</li>
</ul>
This hierarchy continues forever, producing a well-ordered tower of infinities, each strictly larger than the previous one.
</div>

<h3>The Continuum Hypothesis</h3>

<p>Here is one of the great unsolved (or rather, <em>unresolvable</em>) questions of mathematics. We know that \\(|\\mathbb{R}| = 2^{\\aleph_0}\\). And we know that \\(2^{\\aleph_0} &gt; \\aleph_0\\). But which aleph number is \\(2^{\\aleph_0}\\)?</p>

<p>Cantor conjectured that \\(2^{\\aleph_0} = \\aleph_1\\), meaning there is no infinity between the naturals and the reals. This conjecture is called the <strong>Continuum Hypothesis</strong> (CH).</p>

<div class="env-block theorem">
<strong>The Continuum Hypothesis (CH)</strong><br>
There is no set whose cardinality is strictly between that of the natural numbers and the real numbers. In symbols: \\(2^{\\aleph_0} = \\aleph_1\\).
</div>

<p>In 1940, Kurt G&ouml;del proved that the Continuum Hypothesis is <em>consistent</em> with the standard axioms of mathematics; you cannot disprove it. In 1963, Paul Cohen proved that it is also <em>independent</em> of those axioms; you cannot prove it either. The Continuum Hypothesis is neither true nor false within our standard framework. It is a genuinely undecidable statement, a place where the foundations of mathematics reach their limit.</p>

<div class="env-block remark">
<strong>A Statement Beyond Proof</strong><br>
The Continuum Hypothesis shows that mathematics, despite its apparent certainty, contains fundamental questions that our axioms cannot answer. This is not a failure of mathematics, but a feature of its depth. As G&ouml;del showed in his incompleteness theorems, any sufficiently rich mathematical system will contain truths that it cannot prove.
</div>

<h3>Beyond the Alephs</h3>

<p>The power set construction gives us an endless supply of ever-larger infinities:</p>

\\[\\aleph_0 \\;&lt;\\; 2^{\\aleph_0} \\;&lt;\\; 2^{2^{\\aleph_0}} \\;&lt;\\; 2^{2^{2^{\\aleph_0}}} \\;&lt;\\; \\cdots\\]

<p>Each step up creates a set so much bigger that it dwarfs everything below it. And yet, this tower itself is only the beginning; there are even larger "large cardinal" numbers that mathematicians study today.</p>

<p>Cantor's paradise is vast beyond imagination. And we are only at its gates.</p>

<div class="viz-placeholder" data-viz="aleph-tower"></div>

<h3>A Final Reflection</h3>

<p>Georg Cantor gave us something extraordinary: a way to think rigorously about the infinite. Before him, infinity was a vague philosophical concept. After him, it became a mathematical landscape with structure, hierarchy, and surprises at every turn.</p>

<p>As you explore the chapters ahead, on fractals, chaos, and the Mandelbrot set, remember that all these ideas rest, in one way or another, on Cantor's brave insight: that infinity is not a single, monolithic concept but a rich and varied world unto itself.</p>

<div class="env-block intuition">
<strong>The Big Picture</strong><br>
Countable infinity (\\(\\aleph_0\\)): naturals, integers, rationals, algebraic numbers.<br>
Uncountable infinity (\\(2^{\\aleph_0}\\)): real numbers, points on a line, continuous functions.<br>
And beyond: power sets of power sets, large cardinals, structures we can barely conceive.<br><br>
Mathematics is not just about what we can compute or measure. It is about what we can <em>imagine</em>, and then make precise.
</div>
`,
                visualizations: [
                    {
                        id: 'aleph-tower',
                        title: "Cantor's Tower of Infinities",
                        description: 'Each level is an incomprehensibly larger infinity. The tower never ends.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                            var t0 = null;

                            var levels = [
                                { label: '\u2135\u2080', name: 'Countable', desc: 'Naturals, Integers, Rationals', color: '#58a6ff' },
                                { label: '2^(\u2135\u2080)', name: 'Continuum', desc: 'Real Numbers', color: '#3fb9a0' },
                                { label: '2^2^(\u2135\u2080)', name: 'Power of Continuum', desc: 'Sets of Reals', color: '#f0883e' },
                                { label: '2^2^2^(\u2135\u2080)', name: 'And beyond...', desc: 'Sets of Sets of Reals', color: '#bc8cff' },
                                { label: '\u22EF', name: 'The tower never ends', desc: '', color: '#ffd700' }
                            ];

                            VizEngine.createButton(controls, 'Restart', function () { t0 = null; });

                            function draw(t) {
                                if (t0 === null) t0 = t;
                                var elapsed = (t - t0) / 1000;
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width;
                                var H = viz.height;
                                var baseY = H - 40;
                                var levelH = 70;
                                var boxW = 350;

                                for (var i = 0; i < levels.length; i++) {
                                    var delay = i * 1.2;
                                    var progress = VizEngine.clamp((elapsed - delay) / 0.8, 0, 1);
                                    if (progress <= 0) continue;

                                    var lev = levels[i];
                                    var y = baseY - i * levelH;
                                    var alpha = progress;

                                    ctx.globalAlpha = alpha;

                                    // Box
                                    var bx = (W - boxW) / 2;
                                    // Width grows with level to suggest expansion
                                    var thisW = boxW + i * 30;
                                    var thisBx = (W - thisW) / 2;

                                    ctx.fillStyle = lev.color + '22';
                                    ctx.fillRect(thisBx, y - levelH + 15, thisW, levelH - 10);
                                    ctx.strokeStyle = lev.color;
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(thisBx, y - levelH + 15, thisW, levelH - 10);

                                    // Label
                                    ctx.fillStyle = lev.color;
                                    ctx.font = 'bold 20px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText(lev.label, thisBx + 15, y - levelH / 2 + 10);

                                    // Name
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '14px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(lev.name, W / 2, y - levelH / 2 + 5);

                                    // Description
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.fillText(lev.desc, W / 2, y - levelH / 2 + 22);

                                    // Arrow up
                                    if (i > 0 && i < levels.length) {
                                        var arrowX = W / 2 + thisW / 2 + 20;
                                        ctx.strokeStyle = viz.colors.text;
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        ctx.moveTo(arrowX, y + 5);
                                        ctx.lineTo(arrowX, y - levelH + 25);
                                        ctx.stroke();
                                        ctx.fillStyle = viz.colors.text;
                                        ctx.font = '18px -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.fillText('<', arrowX, y - levelH / 2 + 12);
                                    }

                                    ctx.globalAlpha = 1;
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'If you take the power set of the real numbers, you get a set even larger than the reals. Can you describe, in everyday language, what an element of this "power set of the reals" would look like?',
                        hint: 'An element of the power set of a set \\(S\\) is a <em>subset</em> of \\(S\\). What does a subset of the real numbers look like?',
                        solution: 'An element of the power set of \\(\\mathbb{R}\\) is simply a <em>set of real numbers</em>. For example, the interval \\([0,1]\\), the set of all primes, the empty set, or the set \\(\\{\\pi, e, \\sqrt{2}\\}\\) are all elements of \\(\\mathcal{P}(\\mathbb{R})\\). The power set includes every possible collection of real numbers, including bizarre ones that cannot be described by any formula. There are so many such subsets that their totality is strictly larger than the reals themselves.'
                    },
                    {
                        question: 'Is the set of all irrational numbers countable or uncountable?',
                        hint: 'The reals equal the union of the rationals and the irrationals. If the irrationals were countable, what would that say about the reals?',
                        solution: 'The irrationals are uncountable. The reals are the union of the rationals and the irrationals: \\(\\mathbb{R} = \\mathbb{Q} \\cup (\\mathbb{R} \\setminus \\mathbb{Q})\\). If the irrationals were countable, then \\(\\mathbb{R}\\) would be a union of two countable sets, which is countable. But the reals are uncountable (by the diagonal argument). Contradiction! Therefore the irrationals must be uncountable. In fact, "most" real numbers are irrational.'
                    },
                    {
                        question: 'The Continuum Hypothesis says there is no infinity between \\(\\aleph_0\\) and \\(2^{\\aleph_0}\\). This is independent of our axioms. What does "independent" mean here? Is the Continuum Hypothesis true or false?',
                        hint: 'Think of an axiom system as a set of rules. "Independent" means the rules neither force the statement to be true nor force it to be false.',
                        solution: 'A statement is independent of an axiom system if neither the statement nor its negation can be derived from the axioms. G&ouml;del (1940) showed you can add CH to the standard axioms (ZFC) without contradiction; Cohen (1963) showed you can add its negation without contradiction. So within ZFC, the Continuum Hypothesis is neither provably true nor provably false. It is "undecidable." This does not mean it has no truth value in some absolute sense, it means our standard axioms are not powerful enough to determine it. Mathematicians who want CH to be true can work in models where it holds; those who prefer it false can work in models where it fails.'
                    }
                ]
            }
        ]
    });
})();
