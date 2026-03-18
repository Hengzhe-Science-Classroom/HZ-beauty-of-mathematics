// === Chapter 17: The Music of Primes ===
(function() {
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'The Music of Primes',
    subtitle: 'The atoms of arithmetic and the greatest unsolved problem in mathematics',
    sections: [
        // ─────────────────────────────────────────────
        // Section 1: What Makes a Number Prime?
        // ─────────────────────────────────────────────
        {
            id: 'sec-what-is-prime',
            title: 'What Makes a Number Prime?',
            content: `
<h2>The Atoms of Number Theory</h2>

<p>Every material object you have ever touched is made of atoms. Break a chunk of iron into smaller and smaller pieces, and eventually you reach a single iron atom; it cannot be broken down further without ceasing to be iron. Numbers have their own kind of atoms, and we call them <em>prime numbers</em>.</p>

<div class="env-block definition">
<strong>Prime Number.</strong> A natural number \\(p > 1\\) is <em>prime</em> if its only positive divisors are 1 and \\(p\\) itself. A number greater than 1 that is not prime is called <em>composite</em>.
</div>

<p>The first few primes are:</p>
\\[ 2,\\; 3,\\; 5,\\; 7,\\; 11,\\; 13,\\; 17,\\; 19,\\; 23,\\; 29,\\; 31,\\; 37,\\; 41,\\; 43,\\; 47,\\; \\ldots \\]

<p>Notice: 2 is the only even prime (every other even number is divisible by 2). The number 1 is <em>not</em> considered prime, by convention, because including it would break the uniqueness of prime factorization.</p>

<h3>The Fundamental Theorem of Arithmetic</h3>

<p>Why do we call primes the "atoms" of numbers? Because of the following theorem, one of the oldest and most important results in all of mathematics:</p>

<div class="env-block theorem">
<strong>The Fundamental Theorem of Arithmetic.</strong> Every integer greater than 1 can be expressed as a product of prime numbers in exactly one way (up to the order of the factors).
</div>

<p>For example:</p>
<ul>
<li>\\(12 = 2^2 \\times 3\\)</li>
<li>\\(100 = 2^2 \\times 5^2\\)</li>
<li>\\(2024 = 2^3 \\times 11 \\times 23\\)</li>
<li>\\(13 = 13\\) (a prime is its own factorization)</li>
</ul>

<p>There is no other way to factor 12 into primes. You will always get two 2s and one 3, no matter how you do it. This uniqueness is the cornerstone of number theory and the reason primes matter so much.</p>

<h3>How to Check if a Number is Prime</h3>

<p>To check whether a number \\(n\\) is prime, you only need to test divisibility by primes up to \\(\\sqrt{n}\\). Why? Because if \\(n = a \\times b\\) and both \\(a\\) and \\(b\\) are greater than \\(\\sqrt{n}\\), then \\(a \\times b > n\\), a contradiction. So at least one factor must be \\(\\leq \\sqrt{n}\\).</p>

<div class="env-block example">
<strong>Example.</strong> Is 97 prime? We check divisibility by primes up to \\(\\sqrt{97} \\approx 9.8\\), that is, by 2, 3, 5, and 7.
<ul>
<li>97/2 = 48.5 (not divisible)</li>
<li>97/3 = 32.33... (not divisible)</li>
<li>97/5 = 19.4 (not divisible)</li>
<li>97/7 = 13.86... (not divisible)</li>
</ul>
Since none divide 97 evenly, 97 is prime.
</div>

<div class="viz-placeholder" data-viz="viz-prime-checker"></div>
`,
            visualizations: [
                {
                    id: 'viz-prime-checker',
                    title: 'Prime Number Explorer',
                    description: 'Numbers from 2 to 200. Primes are highlighted in gold; composites are gray. Hover over a number to see its factorization. Notice how primes thin out but never stop.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var maxNum = 200;

                        function isPrime(n) {
                            if (n < 2) return false;
                            if (n === 2) return true;
                            if (n % 2 === 0) return false;
                            for (var i = 3; i * i <= n; i += 2) {
                                if (n % i === 0) return false;
                            }
                            return true;
                        }

                        function factorize(n) {
                            if (n < 2) return '';
                            var factors = [];
                            var d = 2;
                            var m = n;
                            while (d * d <= m) {
                                while (m % d === 0) { factors.push(d); m /= d; }
                                d++;
                            }
                            if (m > 1) factors.push(m);
                            if (factors.length === 1 && factors[0] === n) return n + ' (prime)';
                            return n + ' = ' + factors.join(' \u00D7 ');
                        }

                        var hoverNum = -1;
                        var cols = 20;
                        var cellW = (w - 20) / cols;
                        var cellH = Math.min(cellW, (h - 50) / Math.ceil(maxNum / cols));
                        var offsetX = 10, offsetY = 10;

                        function numToCell(n) {
                            var idx = n - 1;
                            var col = idx % cols;
                            var row = Math.floor(idx / cols);
                            return { x: offsetX + col * cellW, y: offsetY + row * cellH };
                        }

                        function draw() {
                            viz.clear();
                            for (var n = 2; n <= maxNum; n++) {
                                var cell = numToCell(n);
                                var prime = isPrime(n);
                                var isHover = (n === hoverNum);
                                if (isHover) {
                                    ctx.fillStyle = prime ? viz.colors.gold : viz.colors.orange;
                                } else if (prime) {
                                    ctx.fillStyle = viz.colors.gold + 'cc';
                                } else {
                                    ctx.fillStyle = '#2a2a4a';
                                }
                                ctx.fillRect(cell.x + 1, cell.y + 1, cellW - 2, cellH - 2);
                                ctx.fillStyle = prime ? '#000' : viz.colors.text;
                                ctx.font = (cellW > 28 ? '11' : '9') + 'px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(n.toString(), cell.x + cellW / 2, cell.y + cellH / 2);
                            }

                            // info bar
                            ctx.fillStyle = 'rgba(12,12,32,0.9)';
                            ctx.fillRect(0, h - 34, w, 34);
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            if (hoverNum >= 2) {
                                ctx.fillText(factorize(hoverNum), w / 2, h - 17);
                            } else {
                                var primeCount = 0;
                                for (var nn = 2; nn <= maxNum; nn++) { if (isPrime(nn)) primeCount++; }
                                ctx.fillText('Primes in 2-' + maxNum + ': ' + primeCount + ' out of ' + (maxNum - 1) + ' numbers (' + (primeCount / (maxNum - 1) * 100).toFixed(1) + '%)', w / 2, h - 17);
                            }
                        }

                        viz.canvas.addEventListener('mousemove', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left, my = e.clientY - rect.top;
                            hoverNum = -1;
                            for (var n = 2; n <= maxNum; n++) {
                                var cell = numToCell(n);
                                if (mx >= cell.x && mx < cell.x + cellW && my >= cell.y && my < cell.y + cellH) {
                                    hoverNum = n; break;
                                }
                            }
                            draw();
                        });

                        viz.canvas.addEventListener('mouseleave', function() {
                            hoverNum = -1; draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Is 91 prime? Many people think it is. Check by testing divisibility by all primes up to \\(\\sqrt{91} \\approx 9.5\\).',
                    hint: 'Test 2, 3, 5, 7.',
                    solution: '91/7 = 13. So \\(91 = 7 \\times 13\\), and 91 is composite. It is one of the most commonly mistaken "primes" because neither 7 nor 13 is an obvious factor at first glance.'
                },
                {
                    question: 'What is the prime factorization of 2310?',
                    hint: 'Start dividing by small primes: 2, 3, 5, 7, 11...',
                    solution: '\\(2310 = 2 \\times 1155 = 2 \\times 3 \\times 385 = 2 \\times 3 \\times 5 \\times 77 = 2 \\times 3 \\times 5 \\times 7 \\times 11\\). This is the product of the first five primes (called a <em>primorial</em>): \\(2310 = 2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot 11\\).'
                },
                {
                    question: 'Why is 1 not considered a prime number?',
                    hint: 'Think about what would happen to the Fundamental Theorem of Arithmetic.',
                    solution: 'If 1 were prime, then factorizations would not be unique: \\(12 = 2^2 \\times 3 = 1 \\times 2^2 \\times 3 = 1^{100} \\times 2^2 \\times 3\\), and so on. By excluding 1, every positive integer has a <em>unique</em> prime factorization, which is far more useful.'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 2: The Sieve of Eratosthenes
        // ─────────────────────────────────────────────
        {
            id: 'sec-sieve',
            title: 'The Sieve of Eratosthenes',
            content: `
<h2>An Ancient Algorithm, Still Beautiful Today</h2>

<p>Around 240 BCE, the Greek mathematician Eratosthenes of Cyrene (the same person who estimated the circumference of the Earth) devised a simple, elegant method for finding all prime numbers up to any given limit. His method, called the <em>Sieve of Eratosthenes</em>, is one of the oldest algorithms in existence and is still taught in computer science courses today.</p>

<h3>How the Sieve Works</h3>

<p>Suppose you want to find all primes up to 100. Write out all the numbers from 2 to 100. Now follow these steps:</p>

<ol>
<li>Circle 2 (it is prime). Now cross out every multiple of 2 (4, 6, 8, 10, ...). These are all composite.</li>
<li>The next uncrossed number is 3. Circle it (it is prime). Cross out every multiple of 3 that has not been crossed out yet (9, 15, 21, 27, ...).</li>
<li>The next uncrossed number is 5. Circle it. Cross out multiples of 5 (25, 35, 55, ...).</li>
<li>The next uncrossed number is 7. Circle it. Cross out multiples of 7 (49, 77, 91, ...).</li>
<li>Since \\(11^2 = 121 > 100\\), we can stop. Every remaining uncrossed number is prime.</li>
</ol>

<p>The beauty of the sieve is that it requires no division at all; you just count and cross out. A child can do it. Yet it is remarkably efficient: to find all primes up to \\(N\\), you only need to sieve up to \\(\\sqrt{N}\\), and the total work is approximately \\(N \\ln(\\ln N)\\), which is very fast.</p>

<div class="env-block intuition">
<strong>Intuition.</strong> The sieve works because every composite number has a prime factor no larger than its square root. So by the time you have sieved out multiples of all primes up to \\(\\sqrt{N}\\), every remaining number must be prime: if it were composite, one of its prime factors would have already caught it.
</div>

<div class="viz-placeholder" data-viz="viz-sieve"></div>

<h3>The Sieve in the Modern World</h3>

<p>Eratosthenes' sieve has been adapted and optimized for modern computers. The "segmented sieve" processes numbers in chunks that fit in the CPU cache, achieving remarkable speed. In 2024, finding all primes up to one trillion takes only a few seconds on a desktop computer. Yet the basic principle is the same one Eratosthenes discovered over 2,200 years ago.</p>

<div class="env-block remark">
<strong>Remark.</strong> The sieve of Eratosthenes is an early example of what computer scientists call a "space-time tradeoff." You use memory (to store which numbers are crossed out) in exchange for speed (no division needed). This same principle underlies many modern algorithms.
</div>
`,
            visualizations: [
                {
                    id: 'viz-sieve',
                    title: 'Animated Sieve of Eratosthenes',
                    description: 'Watch the sieve in action! Press Play to see composites get crossed out one prime at a time. Gold = prime, red = just eliminated, dark = composite.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var N = 120;
                        var cols = 12;
                        var cellW = Math.min((w - 20) / cols, 44);
                        var cellH = Math.min(cellW, (h - 60) / Math.ceil(N / cols));
                        var offsetX = (w - cols * cellW) / 2;
                        var offsetY = 8;

                        // States: 0 = unchecked, 1 = prime, 2 = just eliminated, 3 = eliminated
                        var state = [];
                        var currentPrime = 2;
                        var currentMultiple = 0;
                        var sieveDone = false;
                        var animId = null;
                        var speed = 50;
                        var stepQueue = [];

                        function reset() {
                            state = new Array(N + 1).fill(0);
                            state[0] = 3; state[1] = 3;
                            currentPrime = 2;
                            currentMultiple = 0;
                            sieveDone = false;
                            stepQueue = [];
                            buildSteps();
                        }

                        function buildSteps() {
                            stepQueue = [];
                            var s = new Array(N + 1).fill(true);
                            s[0] = s[1] = false;
                            for (var p = 2; p * p <= N; p++) {
                                if (!s[p]) continue;
                                stepQueue.push({ type: 'prime', num: p });
                                for (var m = p * p; m <= N; m += p) {
                                    if (s[m]) {
                                        stepQueue.push({ type: 'eliminate', num: m, by: p });
                                        s[m] = false;
                                    }
                                }
                            }
                            // remaining primes
                            for (var pp = 2; pp <= N; pp++) {
                                if (s[pp]) {
                                    stepQueue.push({ type: 'prime', num: pp });
                                }
                            }
                        }

                        var stepIdx = 0;

                        function doStep() {
                            if (stepIdx >= stepQueue.length) {
                                sieveDone = true;
                                return false;
                            }
                            // clear "just eliminated" states
                            for (var i = 2; i <= N; i++) {
                                if (state[i] === 2) state[i] = 3;
                            }
                            var step = stepQueue[stepIdx];
                            if (step.type === 'prime') {
                                state[step.num] = 1;
                            } else {
                                state[step.num] = 2;
                            }
                            stepIdx++;
                            return true;
                        }

                        function numToCell(n) {
                            var idx = n - 1;
                            return { x: offsetX + (idx % cols) * cellW, y: offsetY + Math.floor(idx / cols) * cellH };
                        }

                        function draw() {
                            viz.clear();
                            for (var n = 2; n <= N; n++) {
                                var cell = numToCell(n);
                                var s = state[n];
                                if (s === 1) ctx.fillStyle = viz.colors.gold + 'cc';
                                else if (s === 2) ctx.fillStyle = viz.colors.red + 'aa';
                                else if (s === 3) ctx.fillStyle = '#1a1a30';
                                else ctx.fillStyle = '#2a2a5a';

                                ctx.fillRect(cell.x + 1, cell.y + 1, cellW - 2, cellH - 2);
                                ctx.fillStyle = s === 3 || s === 2 ? '#555' : (s === 1 ? '#000' : viz.colors.white);
                                ctx.font = (cellW > 30 ? '12' : '10') + 'px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(n.toString(), cell.x + cellW / 2, cell.y + cellH / 2);

                                // strikethrough for eliminated
                                if (s === 3) {
                                    ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(cell.x + 4, cell.y + cellH / 2);
                                    ctx.lineTo(cell.x + cellW - 4, cell.y + cellH / 2);
                                    ctx.stroke();
                                }
                            }

                            // info
                            var primeCount = 0;
                            for (var i = 2; i <= N; i++) { if (state[i] === 1) primeCount++; }
                            ctx.fillStyle = 'rgba(12,12,32,0.9)';
                            ctx.fillRect(0, h - 30, w, 30);
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            if (sieveDone) {
                                ctx.fillText('Sieve complete! Found ' + primeCount + ' primes up to ' + N, w / 2, h - 15);
                            } else if (stepIdx > 0 && stepIdx <= stepQueue.length) {
                                var lastStep = stepQueue[stepIdx - 1];
                                if (lastStep.type === 'prime') {
                                    ctx.fillText('Found prime: ' + lastStep.num, w / 2, h - 15);
                                } else {
                                    ctx.fillText('Eliminating ' + lastStep.num + ' (multiple of ' + lastStep.by + ')', w / 2, h - 15);
                                }
                            } else {
                                ctx.fillText('Press Play to start the sieve', w / 2, h - 15);
                            }
                        }

                        var playing = false;
                        function startAnim() {
                            if (playing) return;
                            if (sieveDone) { reset(); stepIdx = 0; draw(); }
                            playing = true;
                            function tick() {
                                if (!playing) return;
                                var more = doStep();
                                draw();
                                if (more) {
                                    animId = setTimeout(tick, speed);
                                } else {
                                    playing = false;
                                }
                            }
                            tick();
                        }

                        function stopAnim() {
                            playing = false;
                            if (animId) { clearTimeout(animId); animId = null; }
                        }

                        VizEngine.createButton(controls, 'Play', startAnim);
                        VizEngine.createButton(controls, 'Pause', stopAnim);
                        VizEngine.createButton(controls, 'Step', function() {
                            stopAnim();
                            if (sieveDone) { reset(); stepIdx = 0; }
                            doStep(); draw();
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            stopAnim(); reset(); stepIdx = 0; draw();
                        });
                        VizEngine.createSlider(controls, 'Speed: ', 10, 200, 50, 10, function(val) {
                            speed = 210 - val; // invert so higher = faster
                        });

                        reset();
                        draw();
                        return { stopAnimation: function() { stopAnim(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Sieve of Eratosthenes to find all primes up to 50 by hand. How many are there?',
                    hint: 'You only need to sieve multiples of 2, 3, 5, and 7 (since \\(7^2 = 49 < 50\\) but \\(11^2 = 121 > 50\\)).',
                    solution: 'The primes up to 50 are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. That is 15 primes.'
                },
                {
                    question: 'In the sieve, we start crossing out multiples of \\(p\\) starting from \\(p^2\\), not from \\(2p\\). Why?',
                    hint: 'What about multiples like \\(2p, 3p, \\ldots, (p-1)p\\)?',
                    solution: 'The multiples \\(2p, 3p, \\ldots, (p-1)p\\) have already been eliminated when we sieved by 2, 3, ..., \\(p-1\\). The first multiple of \\(p\\) that has not been eliminated yet is \\(p \\times p = p^2\\). Starting from \\(p^2\\) avoids redundant work.'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 3: Primes Go On Forever
        // ─────────────────────────────────────────────
        {
            id: 'sec-infinite-primes',
            title: 'Primes Go On Forever',
            content: `
<h2>Euclid's Timeless Argument</h2>

<p>As you look at larger and larger numbers, primes become rarer. Among the first 100 numbers, there are 25 primes (one in four). Among the first million, there are 78,498 primes (about one in thirteen). Among the first billion, about one in twenty-two. Are the primes eventually going to run out?</p>

<p>No. There are infinitely many primes. This was proven by Euclid around 300 BCE, in what may be the most famous proof in all of mathematics. It is a masterpiece of logical reasoning, requiring nothing more than the definition of a prime and basic arithmetic.</p>

<div class="env-block theorem">
<strong>Euclid's Theorem.</strong> There are infinitely many prime numbers.
</div>

<h3>The Story of the Proof</h3>

<p>Euclid's argument is a <em>proof by contradiction</em>. Suppose, for the sake of argument, that there are only finitely many primes. List them all:</p>
\\[ p_1, p_2, p_3, \\ldots, p_n \\]

<p>Now consider the number:</p>
\\[ Q = p_1 \\times p_2 \\times p_3 \\times \\cdots \\times p_n + 1 \\]

<p>What can we say about \\(Q\\)? When we divide \\(Q\\) by any of our primes \\(p_i\\), we get a remainder of 1 (because \\(Q = (p_1 p_2 \\cdots p_n) + 1\\)). So \\(Q\\) is not divisible by any prime on our list.</p>

<p>But by the Fundamental Theorem of Arithmetic, \\(Q\\) must have a prime factor. Since that prime factor is not on our list, our list was incomplete. Contradiction! Therefore, no finite list can contain all primes.</p>

<div class="env-block example">
<strong>Example.</strong> Suppose we think the only primes are 2, 3, and 5. Then \\(Q = 2 \\times 3 \\times 5 + 1 = 31\\). Is 31 divisible by 2? No. By 3? No. By 5? No. And 31 is itself prime, so we have discovered a prime not on our list. (Note: \\(Q\\) does not have to be prime itself; it just has to have a prime factor not on the list. For instance, if our primes were 2, 3, 5, 7, 11, 13, then \\(Q = 30031 = 59 \\times 509\\), and both 59 and 509 are primes not on the list.)
</div>

<div class="env-block intuition">
<strong>Intuition.</strong> Euclid's proof does not construct the "next" prime; it shows that any finite list is incomplete. The argument is non-constructive: it tells you a new prime exists without telling you exactly what it is. This style of reasoning, proving existence without construction, is one of the hallmarks of pure mathematics.
</div>

<h3>The Largest Known Prime</h3>

<p>Although primes are infinite, finding large primes is extremely difficult. The largest known primes are <em>Mersenne primes</em>, of the form \\(2^p - 1\\) where \\(p\\) is itself prime. As of 2024, the largest known prime is \\(2^{136,279,841} - 1\\), a number with over 41 million digits. It was found by the Great Internet Mersenne Prime Search (GIMPS), a distributed computing project where volunteers donate their computers' idle time to search for new primes.</p>

<p>There are only 52 known Mersenne primes, and whether there are infinitely many is still an open question. New ones are discovered roughly every few years, and each discovery makes headlines in the mathematical community.</p>

<div class="viz-placeholder" data-viz="viz-prime-density"></div>
`,
            visualizations: [
                {
                    id: 'viz-prime-density',
                    title: 'How Primes Thin Out',
                    description: 'The blue staircase shows \\(\\pi(x)\\), the number of primes up to \\(x\\). The orange curve is the Prime Number Theorem approximation \\(x/\\ln(x)\\). Watch how they stay close!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var maxX = 500;

                        // Precompute primes via sieve
                        var sieve = new Uint8Array(maxX + 1);
                        sieve[0] = sieve[1] = 1;
                        for (var p = 2; p * p <= maxX; p++) {
                            if (!sieve[p]) { for (var m = p * p; m <= maxX; m += p) sieve[m] = 1; }
                        }
                        var piX = new Array(maxX + 1);
                        piX[0] = 0; piX[1] = 0;
                        for (var i = 2; i <= maxX; i++) {
                            piX[i] = piX[i - 1] + (sieve[i] ? 0 : 1);
                        }

                        var slider = VizEngine.createSlider(controls, 'Range: ', 50, 500, 500, 50, function(val) {
                            maxX = Math.round(val);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var padL = 60, padR = 30, padT = 30, padB = 50;
                            var plotW = w - padL - padR;
                            var plotH = h - padT - padB;
                            var yMax = piX[maxX] * 1.15;

                            function toSx(x) { return padL + (x / maxX) * plotW; }
                            function toSy(y) { return padT + (1 - y / yMax) * plotH; }

                            // grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            var yStep = Math.ceil(yMax / 6);
                            for (var yy = 0; yy <= yMax; yy += yStep) {
                                var sy = toSy(yy);
                                ctx.beginPath(); ctx.moveTo(padL, sy); ctx.lineTo(w - padR, sy); ctx.stroke();
                            }

                            // axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB); ctx.lineTo(w - padR, h - padB); ctx.stroke();

                            // y labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var yy2 = 0; yy2 <= yMax; yy2 += yStep) {
                                ctx.fillText(Math.round(yy2).toString(), padL - 6, toSy(yy2));
                            }

                            // x labels
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            var xStep = maxX <= 100 ? 20 : (maxX <= 200 ? 50 : 100);
                            for (var xx = 0; xx <= maxX; xx += xStep) {
                                ctx.fillText(xx.toString(), toSx(xx), h - padB + 6);
                            }

                            // pi(x) staircase
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(toSx(2), toSy(0));
                            for (var x = 2; x <= maxX; x++) {
                                ctx.lineTo(toSx(x), toSy(piX[x]));
                            }
                            ctx.stroke();

                            // x/ln(x) approximation
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var x2 = 2; x2 <= maxX; x2++) {
                                var approx = x2 / Math.log(x2);
                                if (!started) { ctx.moveTo(toSx(x2), toSy(approx)); started = true; }
                                else ctx.lineTo(toSx(x2), toSy(approx));
                            }
                            ctx.stroke();

                            // legend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(padL + 10, padT + 8, 20, 3);
                            ctx.fillStyle = viz.colors.blue; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillText('\u03C0(x) = prime counting function', padL + 35, padT + 10);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(padL + 10, padT + 28, 20, 3);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('x / ln(x) approximation', padL + 35, padT + 30);

                            // current values
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'top';
                            ctx.fillText('\u03C0(' + maxX + ') = ' + piX[maxX], w - padR, padT + 8);
                            var approxVal = maxX / Math.log(maxX);
                            ctx.fillStyle = viz.colors.orange; ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText(maxX + '/ln(' + maxX + ') = ' + approxVal.toFixed(1), w - padR, padT + 26);

                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('x', w / 2, h - 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In Euclid\'s proof, suppose the only primes are 2, 3, 5, and 7. Compute \\(Q = 2 \\times 3 \\times 5 \\times 7 + 1\\). Is \\(Q\\) prime, or can you factor it?',
                    hint: 'Compute \\(Q\\) first, then check if it is divisible by small primes.',
                    solution: '\\(Q = 210 + 1 = 211\\). Checking: 211/2, 211/3, 211/5, 211/7, 211/11, 211/13 all leave remainders. Since \\(14^2 = 196 < 211 < 225 = 15^2\\), we only need to check primes up to 14. None work, so 211 is prime, a new prime not on our list.'
                },
                {
                    question: 'The Prime Number Theorem says \\(\\pi(x) \\approx x/\\ln(x)\\). Use this to estimate how many primes there are up to 1 million.',
                    hint: 'Compute \\(1{,}000{,}000 / \\ln(1{,}000{,}000)\\). Note \\(\\ln(10^6) = 6\\ln(10) \\approx 13.82\\).',
                    solution: '\\(\\pi(10^6) \\approx \\frac{10^6}{13.82} \\approx 72{,}382\\). The true value is \\(\\pi(10^6) = 78{,}498\\). The approximation is about 8% too low, which is typical; the Prime Number Theorem gives the right order of magnitude but is not exact.'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 4: Patterns in Primes
        // ─────────────────────────────────────────────
        {
            id: 'sec-patterns',
            title: 'Patterns in Primes',
            content: `
<h2>Order in the Chaos</h2>

<p>At first glance, the primes appear random. There is no simple formula that generates all primes and only primes. Yet mathematicians have discovered tantalizing patterns lurking beneath the surface.</p>

<h3>Twin Primes</h3>

<p>Some primes come in pairs separated by just 2: (3, 5), (5, 7), (11, 13), (17, 19), (29, 31), (41, 43), ... These are called <em>twin primes</em>. Do twin primes go on forever, like primes themselves?</p>

<div class="env-block theorem">
<strong>Twin Prime Conjecture.</strong> There are infinitely many pairs of primes that differ by 2.
</div>

<p>Despite centuries of effort, this remains unproven. In 2013, Yitang Zhang made a spectacular breakthrough, proving that there are infinitely many pairs of primes that differ by at most 70 million. (Yes, 70 million, not 2, but it was the first time anyone proved a finite bound.) Subsequent work by James Maynard and a collaborative Polymath project reduced the gap to 246. The twin prime conjecture (gap of 2) remains open.</p>

<h3>Prime Gaps</h3>

<p>The gap between consecutive primes can be as small as 2 (twin primes) or arbitrarily large. You can always find a million consecutive composite numbers: the numbers \\(n! + 2, n! + 3, \\ldots, n! + n\\) are all composite for any \\(n \\geq 2\\) (because \\(n! + k\\) is divisible by \\(k\\) when \\(2 \\leq k \\leq n\\)). So prime gaps can grow without bound. But on average, the gap between consecutive primes near \\(x\\) is approximately \\(\\ln x\\).</p>

<div class="viz-placeholder" data-viz="viz-prime-gaps"></div>

<h3>The Ulam Spiral: An Unexpected Visual Pattern</h3>

<p>In 1963, the mathematician Stanislaw Ulam was sitting in a boring meeting when he started doodling. He wrote the natural numbers in a spiral pattern, starting with 1 in the center, and circled the primes. To his astonishment, the primes were not scattered randomly; they tended to line up along diagonal lines!</p>

<p>This is the <em>Ulam spiral</em>, and it remains somewhat mysterious. The diagonal patterns correspond to certain quadratic polynomials that produce many primes (like Euler's famous \\(n^2 + n + 41\\), which gives primes for \\(n = 0, 1, 2, \\ldots, 39\\)). But there is no complete explanation for why primes should prefer diagonals in a spiral arrangement of numbers.</p>

<div class="viz-placeholder" data-viz="viz-ulam"></div>

<div class="env-block intuition">
<strong>Intuition.</strong> The Ulam spiral is a vivid reminder that primes, while individually unpredictable, collectively exhibit deep structure. The patterns we see are shadows of the arithmetic relationships between primes, refracted through the geometry of the spiral. Mathematics is full of such surprises: choose the right way to look at something familiar, and hidden order reveals itself.
</div>
`,
            visualizations: [
                {
                    id: 'viz-prime-gaps',
                    title: 'Gaps Between Consecutive Primes',
                    description: 'Each bar represents the gap between two consecutive primes. Notice how gaps fluctuate wildly but trend upward on average.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var maxN = 1000;

                        var sieve = new Uint8Array(maxN + 1);
                        sieve[0] = sieve[1] = 1;
                        for (var p = 2; p * p <= maxN; p++) {
                            if (!sieve[p]) { for (var m = p * p; m <= maxN; m += p) sieve[m] = 1; }
                        }
                        var primes = [];
                        for (var i = 2; i <= maxN; i++) { if (!sieve[i]) primes.push(i); }

                        var gaps = [];
                        for (var g = 1; g < primes.length; g++) {
                            gaps.push({ prime: primes[g], gap: primes[g] - primes[g - 1] });
                        }

                        var showCount = 167; // all gaps for primes up to 1000

                        VizEngine.createSlider(controls, 'Show gaps: ', 20, gaps.length, gaps.length, 10, function(val) {
                            showCount = Math.round(val);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var padL = 50, padR = 20, padT = 30, padB = 50;
                            var plotW = w - padL - padR;
                            var plotH = h - padT - padB;
                            var n = Math.min(showCount, gaps.length);
                            var maxGap = 0;
                            for (var i = 0; i < n; i++) { if (gaps[i].gap > maxGap) maxGap = gaps[i].gap; }
                            maxGap = Math.max(maxGap, 4);
                            var barW = plotW / n;

                            // axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB); ctx.lineTo(w - padR, h - padB); ctx.stroke();

                            // bars
                            for (var i2 = 0; i2 < n; i2++) {
                                var gap = gaps[i2].gap;
                                var bh = (gap / maxGap) * plotH;
                                var bx = padL + i2 * barW;
                                var by = padT + plotH - bh;
                                // Color by gap size
                                var hue = gap === 2 ? 50 : (gap <= 4 ? 120 : (gap <= 8 ? 200 : (gap <= 14 ? 280 : 0)));
                                ctx.fillStyle = VizEngine.hsl(hue, 70, 50);
                                ctx.fillRect(bx, by, Math.max(barW - 0.5, 1), bh);
                            }

                            // twin prime markers
                            ctx.fillStyle = viz.colors.gold; ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';

                            // y labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var yy = 0; yy <= maxGap; yy += (maxGap > 20 ? 4 : 2)) {
                                var sy = padT + (1 - yy / maxGap) * plotH;
                                ctx.fillText(yy.toString(), padL - 6, sy);
                            }

                            // info
                            var twinCount = 0;
                            for (var i3 = 0; i3 < n; i3++) { if (gaps[i3].gap === 2) twinCount++; }
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Twin prime pairs (gap=2): ' + twinCount, padL + 10, padT + 4);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Largest gap: ' + maxGap, padL + 10, padT + 20);

                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Consecutive prime pairs (index)', w / 2, h - 16);
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Gap size', 4, padT);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ulam',
                    title: 'The Ulam Spiral',
                    description: 'Numbers arranged in a spiral from the center. Primes are shown as bright dots. Notice the diagonal lines! Increase the range to see the pattern more clearly.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;
                        var maxN = 10000;

                        var sieve = new Uint8Array(maxN + 1);
                        sieve[0] = sieve[1] = 1;
                        for (var p = 2; p * p <= maxN; p++) {
                            if (!sieve[p]) { for (var m = p * p; m <= maxN; m += p) sieve[m] = 1; }
                        }

                        // Spiral coordinate for number n
                        function spiralPos(n) {
                            if (n === 1) return [0, 0];
                            var k = Math.ceil((Math.sqrt(n) - 1) / 2);
                            var t = 2 * k + 1;
                            var m = t * t;
                            if (n >= m - t + 1) return [k - (m - n), -k];
                            m -= (t - 1);
                            if (n >= m - t + 2) return [-k, -k + (m - n)];
                            m -= (t - 1);
                            if (n >= m - t + 2) return [-k + (m - n), k];
                            return [k, k - (m - t + 1 - n)];
                        }

                        var showN = 5000;

                        VizEngine.createSlider(controls, 'Numbers: ', 500, 10000, 5000, 500, function(val) {
                            showN = Math.round(val);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var cx = w / 2, cy = h / 2;
                            // Find bounds
                            var maxCoord = Math.ceil(Math.sqrt(showN) / 2) + 1;
                            var pixelSize = Math.min(w, h) / (2 * maxCoord + 1);
                            pixelSize = Math.max(pixelSize, 1);

                            for (var n = 2; n <= showN; n++) {
                                if (sieve[n]) continue; // skip composites
                                var pos = spiralPos(n);
                                var sx = cx + pos[0] * pixelSize;
                                var sy = cy - pos[1] * pixelSize;
                                var s = Math.max(pixelSize * 0.8, 1.5);
                                ctx.fillStyle = viz.colors.gold;
                                ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
                            }

                            // info
                            ctx.fillStyle = 'rgba(12,12,32,0.85)';
                            ctx.fillRect(0, h - 28, w, 28);
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            var pc = 0; for (var nn = 2; nn <= showN; nn++) { if (!sieve[nn]) pc++; }
                            ctx.fillText('Ulam Spiral: ' + showN + ' numbers, ' + pc + ' primes shown as gold dots', w / 2, h - 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find all twin prime pairs between 1 and 100.',
                    hint: 'List all primes up to 100 first, then check which consecutive primes differ by exactly 2.',
                    solution: 'The twin prime pairs up to 100 are: (3,5), (5,7), (11,13), (17,19), (29,31), (41,43), (59,61), (71,73). That is 8 pairs. Note that (5,7) overlaps with (3,5); the number 5 belongs to two twin pairs.'
                },
                {
                    question: 'Compute the first ten values of Euler\'s polynomial \\(n^2 + n + 41\\) for \\(n = 0, 1, 2, \\ldots, 9\\). Are they all prime?',
                    hint: 'Just substitute and compute.',
                    solution: 'The values are: 41, 43, 47, 53, 61, 71, 83, 97, 113, 131. Every single one is prime! This polynomial produces primes for all \\(n\\) from 0 to 39. At \\(n = 40\\), we get \\(40^2 + 40 + 41 = 40 \\times 41 + 41 = 41^2 = 1681\\), which is composite. No polynomial can produce primes for all \\(n\\).'
                },
                {
                    question: 'Explain why \\(n! + 2, n! + 3, \\ldots, n! + n\\) are all composite when \\(n \\geq 2\\). Use this to show there is a gap of at least 999 between two consecutive primes.',
                    hint: 'For \\(n! + k\\), factor out \\(k\\).',
                    solution: 'For any \\(k\\) with \\(2 \\leq k \\leq n\\): \\(n! + k = k(n!/k + 1)\\). Since \\(k \\leq n\\), \\(k\\) divides \\(n!\\), so \\(n!/k\\) is an integer. Thus \\(n! + k\\) is divisible by \\(k\\) and greater than \\(k\\), hence composite. The numbers \\(n!+2\\) through \\(n!+n\\) form a run of \\(n-1\\) consecutive composites. Setting \\(n = 1000\\) gives a gap of at least 999 consecutive composites. (The actual gap could be larger since numbers before and after may also be composite.)'
                }
            ]
        },

        // ─────────────────────────────────────────────
        // Section 5: The Riemann Hypothesis
        // ─────────────────────────────────────────────
        {
            id: 'sec-riemann',
            title: 'The Riemann Hypothesis',
            content: `
<h2>The Greatest Unsolved Problem</h2>

<p>We have seen that primes thin out as numbers grow, and the Prime Number Theorem tells us the average rate: \\(\\pi(x) \\approx x/\\ln x\\). But this is only an approximation. The <em>exact</em> distribution of primes hides in a single, mysterious function that has obsessed mathematicians for over 160 years: the <em>Riemann zeta function</em>.</p>

<h3>Euler's Product and Riemann's Insight</h3>

<p>In the 1730s, Euler discovered a stunning connection between the primes and infinite sums. He proved that:</p>

\\[ \\sum_{n=1}^{\\infty} \\frac{1}{n^s} = \\prod_{p \\text{ prime}} \\frac{1}{1 - p^{-s}} \\]

<p>The left side is a sum over all positive integers; the right side is a product over all primes. This "Euler product" says that the distribution of primes is encoded in the behavior of the function on the left, which we now call the <em>zeta function</em> \\(\\zeta(s)\\).</p>

<p>A century later, in 1859, Bernhard Riemann, in one of the most influential papers in the history of mathematics (just eight pages long!), made a conceptual leap: he extended the zeta function to <em>complex numbers</em> \\(s = a + bi\\), where \\(i = \\sqrt{-1}\\). This extension revealed that the zeros of the zeta function (the values of \\(s\\) where \\(\\zeta(s) = 0\\)) control the exact distribution of primes, like a musical score controls the sound of an orchestra.</p>

<div class="env-block definition">
<strong>The Riemann Zeta Function.</strong>
\\[ \\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s} = \\frac{1}{1^s} + \\frac{1}{2^s} + \\frac{1}{3^s} + \\cdots \\]
This converges for \\(\\text{Re}(s) &gt; 1\\) and extends to all complex numbers (except \\(s=1\\)) by analytic continuation.
</div>

<h3>The Hypothesis</h3>

<p>Riemann observed that the zeta function has "trivial" zeros at \\(s = -2, -4, -6, \\ldots\\) (the negative even integers). But it also has infinitely many "non-trivial" zeros, which are complex numbers of the form \\(s = a + bi\\) with \\(0 &lt; a &lt; 1\\). Riemann calculated a few of these zeros and noticed that they all had \\(a = \\frac{1}{2}\\). He conjectured that this is always the case.</p>

<div class="env-block theorem">
<strong>The Riemann Hypothesis (1859).</strong> All non-trivial zeros of the Riemann zeta function have real part \\(\\frac{1}{2}\\). In other words, they all lie on the "critical line" \\(\\text{Re}(s) = \\frac{1}{2}\\).
</div>

<p>This is perhaps the most famous unsolved problem in all of mathematics. It has been verified computationally for the first ten trillion zeros (all on the critical line), but no one has been able to prove it. The Clay Mathematics Institute has offered a prize of <strong>$1,000,000</strong> for a proof (or disproof).</p>

<h3>Why It Matters</h3>

<p>If the Riemann Hypothesis is true, it would give us the best possible understanding of how primes are distributed. The Prime Number Theorem says \\(\\pi(x) \\approx x/\\ln x\\); the Riemann Hypothesis would sharpen this to \\(|\\pi(x) - \\text{Li}(x)| \\leq C\\sqrt{x}\\ln x\\), where \\(\\text{Li}(x)\\) is the logarithmic integral. In other words, the "error" in estimating the number of primes would be as small as mathematically possible.</p>

<p>The Hypothesis also has consequences far beyond number theory. It connects to quantum physics (the zeros of the zeta function may correspond to energy levels of a quantum system), random matrix theory, and even cryptography. If it were disproven, it could potentially threaten the security assumptions underlying RSA encryption, which relies on the difficulty of factoring large numbers, a problem intimately related to prime distribution.</p>

<div class="viz-placeholder" data-viz="viz-zeta-zeros"></div>

<h3>Primes in Cryptography</h3>

<p>Every time you make an online purchase, send a private message, or log into a website, prime numbers are protecting you. The RSA encryption algorithm, the backbone of internet security for decades, works because it is easy to multiply two large primes together but extraordinarily difficult to factor the result back into its prime components.</p>

<p>If you multiply two 300-digit primes, you get a 600-digit number. Multiplying takes a fraction of a second. But factoring that 600-digit number, even with the fastest computers on Earth, would take longer than the age of the universe. This asymmetry between multiplication (easy) and factoring (hard) is what keeps your data safe.</p>

<div class="env-block intuition">
<strong>The Music Metaphor.</strong> The title "The Music of Primes" is not just poetic. Riemann's analysis reveals that the primes produce a kind of "spectrum," like the harmonic frequencies of a musical instrument. Each zero of the zeta function corresponds to a "note," and together they produce the "music" of the primes, the exact pattern of how primes are distributed along the number line. Understanding this music is the deepest quest in number theory.
</div>

<div class="env-block warning">
<strong>Open Problem.</strong> The Riemann Hypothesis has resisted proof for over 160 years. It is one of the seven Millennium Prize Problems and is widely regarded as the single most important unsolved problem in pure mathematics. Many of the deepest results in number theory are proven "assuming the Riemann Hypothesis," meaning they would follow immediately if someone proved it.
</div>
`,
            visualizations: [
                {
                    id: 'viz-zeta-zeros',
                    title: 'Non-Trivial Zeros of the Riemann Zeta Function',
                    description: 'The critical line Re(s) = 1/2 is shown in gold. The first several non-trivial zeros (blue dots) all lie on this line. The Riemann Hypothesis says ALL zeros do.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var w = viz.width, h = viz.height;

                        // Known imaginary parts of first non-trivial zeros
                        var zeroImag = [
                            14.134725, 21.022040, 25.010858, 30.424876, 32.935062,
                            37.586178, 40.918719, 43.327073, 48.005151, 49.773832,
                            52.970321, 56.446248, 59.347044, 60.831779, 65.112544,
                            67.079811, 69.546402, 72.067158, 75.704691, 77.144840
                        ];

                        function draw() {
                            viz.clear();
                            var padL = 80, padR = 40, padT = 40, padB = 50;
                            var plotW = w - padL - padR;
                            var plotH = h - padT - padB;
                            var reMin = -0.5, reMax = 1.5;
                            var imMax = 80;

                            function toSx(re) { return padL + (re - reMin) / (reMax - reMin) * plotW; }
                            function toSy(im) { return padT + (1 - im / imMax) * plotH; }

                            // Critical strip (0 < Re < 1)
                            var x0 = toSx(0), x1 = toSx(1);
                            ctx.fillStyle = 'rgba(88,166,255,0.08)';
                            ctx.fillRect(x0, padT, x1 - x0, plotH);

                            // Grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var im = 0; im <= imMax; im += 10) {
                                var sy = toSy(im);
                                ctx.beginPath(); ctx.moveTo(padL, sy); ctx.lineTo(w - padR, sy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(padL, h - padB); ctx.lineTo(w - padR, h - padB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB); ctx.stroke();

                            // Critical line Re(s) = 1/2
                            var critX = toSx(0.5);
                            ctx.strokeStyle = viz.colors.gold; ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(critX, padT); ctx.lineTo(critX, h - padB); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            [-0.5, 0, 0.5, 1, 1.5].forEach(function(re) {
                                ctx.fillText(re.toFixed(1), toSx(re), h - padB + 6);
                            });
                            ctx.fillStyle = viz.colors.gold;
                            ctx.fillText('Re(s) = 1/2', critX, h - padB + 20);

                            ctx.fillStyle = viz.colors.text; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var im2 = 0; im2 <= imMax; im2 += 20) {
                                ctx.fillText(im2.toString(), padL - 6, toSy(im2));
                            }

                            // Axis labels
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Re(s)', w / 2, h - 14);
                            ctx.save(); ctx.translate(14, h / 2); ctx.rotate(-Math.PI / 2);
                            ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
                            ctx.fillText('Im(s)', 0, 0);
                            ctx.restore();

                            // Zeros
                            zeroImag.forEach(function(im) {
                                var sx = critX;
                                var sy = toSy(im);
                                // glow
                                ctx.fillStyle = 'rgba(88,166,255,0.3)';
                                ctx.beginPath(); ctx.arc(sx, sy, 8, 0, Math.PI * 2); ctx.fill();
                                // dot
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2); ctx.fill();
                            });

                            // Legend
                            ctx.fillStyle = 'rgba(12,12,32,0.85)';
                            ctx.fillRect(w - padR - 180, padT, 176, 64);
                            ctx.fillStyle = viz.colors.blue; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.beginPath(); ctx.arc(w - padR - 166, padT + 12, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.fillText('Non-trivial zeros', w - padR - 156, padT + 6);
                            ctx.fillStyle = viz.colors.gold;
                            ctx.fillRect(w - padR - 170, padT + 28, 12, 3);
                            ctx.fillText('Critical line Re=1/2', w - padR - 156, padT + 22);
                            ctx.fillStyle = viz.colors.teal; ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('All 20 zeros shown lie on', w - padR - 170, padT + 40);
                            ctx.fillText('the critical line', w - padR - 170, padT + 52);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\zeta(2) = \\frac{1}{1^2} + \\frac{1}{2^2} + \\frac{1}{3^2} + \\cdots\\). (Hint: we met this in Chapter 15!) What does this have to do with \\(\\pi\\)?',
                    hint: 'This is the Basel problem, solved by Euler.',
                    solution: '\\(\\zeta(2) = \\frac{\\pi^2}{6} \\approx 1.6449\\). This is Euler\'s famous Basel sum. The appearance of \\(\\pi\\) in a sum over integers is a first hint that the zeta function connects number theory (integers, primes) to analysis (\\(\\pi\\), continuous functions).'
                },
                {
                    question: 'RSA encryption relies on the difficulty of factoring large numbers. If someone proved that the Riemann Hypothesis is false, could this affect cryptography? Think about what the distribution of primes has to do with factoring.',
                    hint: 'If primes were distributed very differently from what we expect, our assumptions about the difficulty of factoring could be wrong.',
                    solution: 'If the Riemann Hypothesis were false, it would mean that primes are distributed less regularly than expected; there could be large "clumps" or "deserts" of primes that we do not anticipate. In principle, this could lead to new factoring algorithms that exploit these irregularities, potentially weakening RSA. In practice, the threat is more theoretical than immediate, but it illustrates how pure mathematics can have real-world security implications.'
                },
                {
                    question: 'The first non-trivial zero of the zeta function is at \\(s = \\frac{1}{2} + 14.1347i\\). What does it mean for a complex number to be a "zero" of a function?',
                    hint: 'What does it mean for a real number \\(x\\) to be a zero of \\(f(x)\\)?',
                    solution: 'A complex number \\(s_0\\) is a zero of \\(\\zeta(s)\\) if \\(\\zeta(s_0) = 0\\), just as a real number \\(x_0\\) is a zero of \\(f(x)\\) if \\(f(x_0) = 0\\). For the zeta function, the input \\(s = \\frac{1}{2} + 14.1347i\\) is a complex number, and the output \\(\\zeta(s)\\) is also a complex number. Saying it equals zero means both its real and imaginary parts are zero. The Riemann Hypothesis claims that all such zeros have real part exactly \\(\\frac{1}{2}\\).'
                }
            ]
        }
    ]
});
})();
