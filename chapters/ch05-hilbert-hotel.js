// === Chapter 5: Hilbert's Hotel ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch05',
        number: 5,
        title: "Hilbert's Hotel",
        subtitle: 'A hotel with infinitely many rooms is never truly full',

        sections: [
            // ============================================================
            // Section 1: A Hotel with Infinite Rooms
            // ============================================================
            {
                id: 'the-hotel',
                title: 'A Hotel with Infinite Rooms',
                content: `
<h2>Welcome to the Grand Hilbert Hotel</h2>

<p>Imagine a hotel with infinitely many rooms, numbered 1, 2, 3, 4, 5, and so on forever. There is no "last room." The corridor stretches out to infinity. This is <strong>Hilbert's Hotel</strong>, a thought experiment proposed by the great mathematician David Hilbert in 1924 to illustrate the strange properties of infinite sets.</p>

<p>Here is the situation: <em>every room is occupied.</em> An infinite number of guests, one in each room. The "NO VACANCY" sign is glowing. The hotel is completely, totally, 100% full.</p>

<p>And then... someone knocks on the front door.</p>

<div class="viz-placeholder" data-viz="hotel-intro"></div>

<p>In a finite hotel, this would be the end of the story. No room, no stay, goodbye. But Hilbert's Hotel is not finite. And the manager of this extraordinary hotel is a mathematician.</p>

<div class="env-block intuition">
<strong>The central paradox</strong><br>
A hotel that is <em>completely full</em> can still accommodate new guests. This is not a contradiction; it is a genuine property of infinity. The key: "full" for an infinite hotel does not mean "no room." It means "every room is occupied." These are different statements when there are infinitely many rooms.
</div>

<h3>Why this matters</h3>

<p>Hilbert's Hotel is not just a fun story. It is a precise thought experiment that illustrates the core properties of countably infinite sets. Each "scenario" we will explore corresponds to a real theorem in set theory:</p>

<ul>
    <li>One new guest = \\(\\aleph_0 + 1 = \\aleph_0\\)</li>
    <li>A bus of infinite guests = \\(\\aleph_0 + \\aleph_0 = \\aleph_0\\)</li>
    <li>Infinitely many buses = \\(\\aleph_0 \\times \\aleph_0 = \\aleph_0\\)</li>
</ul>

<p>Here \\(\\aleph_0\\) (aleph-null, or aleph-naught) is the cardinality of the natural numbers, the "size" of the smallest infinity. These equations look absurd, but each has a rigorous proof via explicit constructions, which is exactly what the hotel scenarios provide.</p>

<h3>The ground rules</h3>

<p>To make the thought experiment precise:</p>
<ol>
    <li>The hotel has rooms numbered 1, 2, 3, 4, ... (one for each natural number).</li>
    <li>Each room holds exactly one guest.</li>
    <li>Every guest will cooperate with the manager's instructions.</li>
    <li>All room reassignments happen simultaneously (no one is left standing in the hallway forever).</li>
</ol>

<p>With these rules in place, let us see what happens when the first knock comes.</p>
`,
                visualizations: [
                    {
                        id: 'hotel-intro',
                        title: "Hilbert's Hotel: Fully Occupied",
                        description: 'Every room is occupied. Scroll to see that the rooms go on forever. A new guest is about to arrive.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 280, scale: 1, originX: 0, originY: 0 });
                            var scrollOffset = 0;
                            var maxScroll = 800;
                            var roomWidth = 56;
                            var roomHeight = 60;
                            var visibleRooms = Math.ceil(viz.width / roomWidth) + 2;

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var baseY = 80;

                                // Hotel facade
                                ctx.fillStyle = '#1a1a40';
                                ctx.fillRect(0, baseY - 30, W, roomHeight + 60);

                                // Roof
                                ctx.fillStyle = viz.colors.purple + '33';
                                ctx.fillRect(0, baseY - 30, W, 8);

                                // Title
                                ctx.fillStyle = viz.colors.gold;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('GRAND HILBERT HOTEL', W / 2, baseY - 14);

                                // Draw rooms
                                var firstRoom = Math.floor(scrollOffset / roomWidth);
                                var offsetPx = -(scrollOffset % roomWidth);

                                for (var i = 0; i < visibleRooms; i++) {
                                    var roomNum = firstRoom + i + 1;
                                    if (roomNum < 1) continue;
                                    var x = offsetPx + i * roomWidth;

                                    // Room frame
                                    ctx.fillStyle = '#0c0c20';
                                    ctx.fillRect(x + 2, baseY, roomWidth - 4, roomHeight);
                                    ctx.strokeStyle = viz.colors.axis;
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(x + 2, baseY, roomWidth - 4, roomHeight);

                                    // Room number
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('#' + roomNum, x + roomWidth / 2, baseY + 12);

                                    // Guest (stick figure)
                                    var gx = x + roomWidth / 2;
                                    var gy = baseY + 32;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath(); ctx.arc(gx, gy - 8, 5, 0, Math.PI * 2); ctx.fill();
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(gx, gy - 3); ctx.lineTo(gx, gy + 10); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(gx - 6, gy + 2); ctx.lineTo(gx + 6, gy + 2); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(gx, gy + 10); ctx.lineTo(gx - 5, gy + 18); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(gx, gy + 10); ctx.lineTo(gx + 5, gy + 18); ctx.stroke();

                                    // Occupied indicator
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath(); ctx.arc(x + roomWidth - 8, baseY + 6, 3, 0, Math.PI * 2); ctx.fill();
                                }

                                // Fade edges
                                var grad = ctx.createLinearGradient(0, 0, 40, 0);
                                grad.addColorStop(0, viz.colors.bg); grad.addColorStop(1, 'transparent');
                                ctx.fillStyle = grad;
                                ctx.fillRect(0, baseY - 30, 40, roomHeight + 60);

                                var grad2 = ctx.createLinearGradient(W - 40, 0, W, 0);
                                grad2.addColorStop(0, 'transparent'); grad2.addColorStop(1, viz.colors.bg);
                                ctx.fillStyle = grad2;
                                ctx.fillRect(W - 40, baseY - 30, 40, roomHeight + 60);

                                // Arrow
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = 'italic 11px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText('rooms continue forever \u2192', W - 10, baseY + roomHeight + 30);

                                // Status
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('NO VACANCY', 15, baseY + roomHeight + 30);

                                // New guest waiting
                                var nx = 30;
                                var ny = H - 40;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(nx, ny - 8, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(nx, ny - 2); ctx.lineTo(nx, ny + 12); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(nx - 7, ny + 3); ctx.lineTo(nx + 7, ny + 3); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(nx, ny + 12); ctx.lineTo(nx - 5, ny + 20); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(nx, ny + 12); ctx.lineTo(nx + 5, ny + 20); ctx.stroke();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('New guest: "Is there room?"', nx + 16, ny + 4);
                            }

                            VizEngine.createSlider(controls, 'Scroll rooms', 0, maxScroll, 0, 10, function (v) {
                                scrollOffset = v;
                                draw();
                            });

                            draw();
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In a finite hotel with 100 rooms, all occupied, can you fit one more guest (without doubling up)? Why is the infinite case different?',
                        hint: 'In the finite case, what would you need to do? Every room is the "last" in some sense.',
                        solution: 'No, in a finite hotel you cannot. There is a last room (room 100), and its occupant has nowhere to move. In the infinite hotel, there is no last room. Every guest in room \\(n\\) can move to room \\(n+1\\), and this works for <em>all</em> \\(n\\) simultaneously, because there is always a next room.'
                    },
                    {
                        question: 'The symbol \\(\\aleph_0\\) represents the "size" of the set of natural numbers. Why does \\(\\aleph_0 + 1 = \\aleph_0\\) make sense in the context of Hilbert\'s Hotel?',
                        hint: 'Adding 1 guest to a full hotel with \\(\\aleph_0\\) rooms still results in \\(\\aleph_0\\) occupied rooms.',
                        solution: 'After the shift (everyone moves from room \\(n\\) to room \\(n+1\\)), we still have one guest per room, and the rooms are still numbered 1, 2, 3, ... The total number of guests is the same as the total number of rooms: \\(\\aleph_0\\). We added 1 guest to \\(\\aleph_0\\) guests and still have \\(\\aleph_0\\) guests. Hence \\(\\aleph_0 + 1 = \\aleph_0\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: One New Guest Arrives
            // ============================================================
            {
                id: 'one-guest',
                title: 'One New Guest Arrives',
                content: `
<h2>The \\(n \\to n+1\\) Shift</h2>

<p>A weary traveler arrives at the fully occupied Grand Hilbert Hotel. "I'm sorry," you might expect the manager to say, "we're full." But this manager studied set theory in graduate school. Instead, she picks up the PA system:</p>

<blockquote style="border-left:3px solid #3fb9a0; padding-left:16px; color:#c9d1d9; margin:20px 0;">
"Attention all guests. Please move to the room whose number is <em>one more</em> than your current room. The guest in room 1, move to room 2. Room 2, move to room 3. Room \\(n\\), move to room \\(n+1\\). Thank you for your cooperation."
</blockquote>

<p>Every guest packs up and moves one room down. Since there is no last room, every guest has a room to move into. And now room 1 is empty. The new guest checks into room 1.</p>

<div class="viz-placeholder" data-viz="one-guest-shift"></div>

<h3>Wait, doesn't someone get displaced?</h3>

<p>This is the key question, and the answer is <em>no</em>. In a finite hotel, the guest in the last room has nowhere to go. But in Hilbert's Hotel, there is no last room. Guest \\(n\\) moves to room \\(n+1\\), which exists for every \\(n\\). No one ends up in the hallway.</p>

<p>You can verify: after the shift, room \\(n+1\\) contains the guest who was in room \\(n\\). Room 1 is empty. The new guest takes room 1. Everyone has a room.</p>

<div class="env-block theorem">
<strong>Mathematical statement</strong><br>
The function \\(f(n) = n + 1\\) is a one-to-one mapping from \\(\\{1, 2, 3, \\ldots\\}\\) to \\(\\{2, 3, 4, \\ldots\\}\\). Since it is a bijection between the original guest set and the rooms \\(\\{2, 3, 4, \\ldots\\}\\), room 1 is freed. This proves \\(\\aleph_0 + 1 = \\aleph_0\\).
</div>

<h3>What about 2 new guests? Or 37?</h3>

<p>The same idea works. For \\(k\\) new guests, ask everyone to move from room \\(n\\) to room \\(n + k\\). This frees up rooms 1 through \\(k\\). The new guests check into those rooms. Done.</p>

<p>More generally, \\(\\aleph_0 + k = \\aleph_0\\) for any finite number \\(k\\). Adding any finite number of guests to a countably infinite hotel does not change its "occupancy size." Infinity absorbs the finite.</p>

<div class="env-block remark">
<strong>A philosophical reflection</strong><br>
This scenario captures something strange about infinity: it is "bigger than itself plus one." In the finite world, adding something always makes a set bigger. In the infinite world, this fails. This is not a paradox; it is a genuine feature of infinite collections. Our finite intuitions simply do not apply.
</div>
`,
                visualizations: [
                    {
                        id: 'one-guest-shift',
                        title: 'The n \u2192 n+1 Shift',
                        description: 'Click "Shift" to watch every guest move one room to the right, freeing room 1 for the new guest.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 300, scale: 1, originX: 0, originY: 0 });
                            var phase = 0; // 0: initial, 1: shifting, 2: done
                            var animProgress = 0;
                            var numVisible = 9;
                            var roomW = 60;
                            var roomH = 56;

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var startX = 40;
                                var baseY = 60;

                                // Title
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                if (phase === 0) ctx.fillText('All rooms occupied. A new guest arrives.', W / 2, 20);
                                else if (phase === 1) ctx.fillText('Everyone shifts: room n \u2192 room n+1', W / 2, 20);
                                else ctx.fillText('Room 1 is free! New guest checks in.', W / 2, 20);

                                // Draw rooms
                                for (var i = 0; i < numVisible; i++) {
                                    var x = startX + i * roomW;
                                    ctx.fillStyle = '#0c0c20';
                                    ctx.fillRect(x, baseY, roomW - 4, roomH);
                                    ctx.strokeStyle = viz.colors.axis;
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(x, baseY, roomW - 4, roomH);

                                    // Room number
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('Room ' + (i + 1), x + roomW / 2 - 2, baseY + 12);
                                }

                                // "..." at end
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '18px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('\u2026', startX + numVisible * roomW, baseY + roomH / 2);

                                // Draw guests
                                for (var g = 0; g < numVisible; g++) {
                                    var guestOrigRoom = g; // 0-indexed
                                    var fromX = startX + guestOrigRoom * roomW + roomW / 2 - 2;
                                    var toX = startX + (guestOrigRoom + 1) * roomW + roomW / 2 - 2;
                                    var gx, gy;

                                    if (phase === 0) {
                                        gx = fromX;
                                        gy = baseY + 35;
                                    } else if (phase === 1) {
                                        var t = Math.min(1, animProgress);
                                        gx = fromX + (toX - fromX) * t;
                                        // Arc motion upward during transition
                                        gy = baseY + 35 - Math.sin(t * Math.PI) * 30;
                                    } else {
                                        gx = toX;
                                        gy = baseY + 35;
                                    }

                                    // Only draw if within visible area
                                    if (gx < W - 20) {
                                        ctx.fillStyle = viz.colors.blue;
                                        ctx.beginPath(); ctx.arc(gx, gy - 8, 5, 0, Math.PI * 2); ctx.fill();
                                        ctx.strokeStyle = viz.colors.blue;
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath(); ctx.moveTo(gx, gy - 3); ctx.lineTo(gx, gy + 8); ctx.stroke();
                                        ctx.beginPath(); ctx.moveTo(gx - 5, gy + 1); ctx.lineTo(gx + 5, gy + 1); ctx.stroke();

                                        // Arrow showing movement
                                        if (phase === 1 || phase === 2) {
                                            ctx.fillStyle = viz.colors.teal;
                                            ctx.font = '9px -apple-system,sans-serif';
                                            ctx.textAlign = 'center';
                                            ctx.fillText((g + 1) + '\u2192' + (g + 2), (fromX + toX) / 2, baseY + roomH + 15);
                                        }
                                    }
                                }

                                // New guest
                                var newGuestX = 20;
                                var newGuestY = H - 60;
                                if (phase === 2) {
                                    // New guest in room 1
                                    newGuestX = startX + roomW / 2 - 2;
                                    newGuestY = baseY + 35;
                                }
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(newGuestX, newGuestY - 8, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(newGuestX, newGuestY - 2); ctx.lineTo(newGuestX, newGuestY + 10); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(newGuestX - 6, newGuestY + 3); ctx.lineTo(newGuestX + 6, newGuestY + 3); ctx.stroke();

                                if (phase < 2) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.fillText('New guest waiting', newGuestX + 14, newGuestY);
                                } else {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('NEW!', newGuestX, baseY + roomH + 15);
                                }

                                // Room 1 highlight when empty
                                if (phase === 1 && animProgress > 0.8) {
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(startX, baseY, roomW - 4, roomH);
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.font = 'bold 10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('EMPTY!', startX + roomW / 2 - 2, baseY + roomH + 28);
                                }
                            }

                            VizEngine.createButton(controls, 'Shift!', function () {
                                if (phase !== 0) return;
                                phase = 1;
                                animProgress = 0;
                                var startTime = performance.now();
                                viz.animate(function () {
                                    animProgress = (performance.now() - startTime) / 1500;
                                    draw();
                                    if (animProgress >= 1) {
                                        viz.stopAnimation();
                                        phase = 2;
                                        draw();
                                    }
                                });
                            });

                            VizEngine.createButton(controls, 'Check In', function () {
                                if (phase !== 1) { phase = 2; draw(); }
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                viz.stopAnimation();
                                phase = 0; animProgress = 0;
                                draw();
                            });

                            draw();
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'If 5 new guests arrive at the fully occupied hotel, what instruction should the manager give?',
                        hint: 'Generalize the \\(n \\to n+1\\) rule.',
                        solution: 'The manager says: "Everyone in room \\(n\\), please move to room \\(n + 5\\)." This frees rooms 1 through 5 for the 5 new guests.'
                    },
                    {
                        question: 'After the \\(n \\to n+1\\) shift, which room is guest #100 now in?',
                        hint: 'The guest who was in room 100 follows the rule \\(n \\to n+1\\).',
                        solution: 'Guest #100 (originally in room 100) moves to room 101.'
                    },
                    {
                        question: 'Could you instead free up room 42 (instead of room 1)? How?',
                        hint: 'Only guests in rooms 42 and above need to move.',
                        solution: 'Yes. Instruct every guest in room \\(n \\geq 42\\) to move to room \\(n+1\\). Guests in rooms 1 through 41 stay put. Room 42 becomes empty. The new guest checks into room 42.'
                    }
                ]
            },

            // ============================================================
            // Section 3: A Bus of Infinite Guests
            // ============================================================
            {
                id: 'infinite-bus',
                title: 'A Bus of Infinite Guests',
                content: `
<h2>The Infinity Bus Arrives</h2>

<p>Just as the hotel settles back to normal after the last rearrangement, a bus pulls up. Not just any bus, but an <em>infinitely long</em> bus carrying infinitely many new guests, numbered 1, 2, 3, 4, ... The manager needs to fit all of them into the hotel, which is still fully occupied.</p>

<p>The \\(n \\to n+1\\) trick will not work here. Shifting everyone by 1 frees only one room. Shifting by 2 frees two rooms. But no finite shift will create infinitely many vacancies. We need a cleverer strategy.</p>

<h3>The \\(n \\to 2n\\) trick</h3>

<p>Here is the manager's stroke of genius:</p>

<blockquote style="border-left:3px solid #f0883e; padding-left:16px; color:#c9d1d9; margin:20px 0;">
"Attention all current guests. Please move from your room \\(n\\) to room \\(2n\\). Room 1, go to room 2. Room 2, go to room 4. Room 3, go to room 6. In general, room \\(n\\), go to room \\(2n\\)."
</blockquote>

<p>After this shift, the current guests occupy all the <em>even</em>-numbered rooms: 2, 4, 6, 8, 10, ... And all the <em>odd</em>-numbered rooms (1, 3, 5, 7, 9, ...) are empty! There are infinitely many odd rooms, one for each bus passenger.</p>

<p>Bus passenger \\(k\\) checks into room \\(2k - 1\\): passenger 1 gets room 1, passenger 2 gets room 3, passenger 3 gets room 5, and so on.</p>

<div class="viz-placeholder" data-viz="infinite-bus"></div>

<div class="env-block theorem">
<strong>Mathematical statement</strong><br>
The even numbers and the odd numbers each form a countably infinite set, and their union is all natural numbers. The mapping \\(n \\to 2n\\) bijects \\(\\mathbb{N}\\) onto the even numbers, freeing the odd numbers for the bus passengers. This proves \\(\\aleph_0 + \\aleph_0 = \\aleph_0\\).
</div>

<h3>Why evens and odds?</h3>

<p>This works because the natural numbers can be <em>partitioned</em> into two infinite subsets of equal cardinality. The even/odd split is the simplest such partition, but any two disjoint infinite arithmetic progressions would work. For example, the manager could send current guests to rooms that are multiples of 3 and use the remaining rooms for bus passengers (though the bookkeeping gets messier).</p>

<div class="env-block example">
<strong>Double-checking</strong><br>
After the rearrangement:<br>
&bull; Room 1: bus passenger 1 (room \\(2 \\cdot 1 - 1 = 1\\)) &#10003;<br>
&bull; Room 2: original guest from room 1 (room \\(2 \\cdot 1 = 2\\)) &#10003;<br>
&bull; Room 3: bus passenger 2 (room \\(2 \\cdot 2 - 1 = 3\\)) &#10003;<br>
&bull; Room 4: original guest from room 2 (room \\(2 \\cdot 2 = 4\\)) &#10003;<br>
&bull; Room 5: bus passenger 3 &#10003;<br>
Every room is occupied. No one is homeless.
</div>

<h3>The deeper lesson</h3>

<p>This scenario shows that the "size" of the even numbers is the same as the "size" of all natural numbers. This echoes what we saw in the previous chapter: an infinite set can be in bijection with a proper subset of itself. Hilbert's Hotel makes this abstract fact viscerally concrete.</p>
`,
                visualizations: [
                    {
                        id: 'infinite-bus',
                        title: 'The n \u2192 2n Shift: Making Room for Infinity',
                        description: 'Watch original guests move to even rooms, opening up all odd rooms for the infinite bus passengers.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 340, scale: 1, originX: 0, originY: 0 });
                            var phase = 0; // 0: full, 1: shifting to evens, 2: bus loading
                            var numShow = 8;
                            var roomW = 68;

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var startX = 16;
                                var baseY = 50;
                                var roomH = 48;

                                // Title
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                if (phase === 0) ctx.fillText('Hotel full. An infinite bus arrives!', W / 2, 18);
                                else if (phase === 1) ctx.fillText('Current guests move: room n \u2192 room 2n', W / 2, 18);
                                else ctx.fillText('Bus passengers fill odd rooms. Everyone fits!', W / 2, 18);

                                // Room headers
                                for (var i = 0; i < numShow; i++) {
                                    var x = startX + i * roomW;
                                    var roomNum = i + 1;
                                    var isEven = roomNum % 2 === 0;
                                    var isOdd = roomNum % 2 === 1;

                                    // Room box
                                    var boxColor = '#0c0c20';
                                    if (phase >= 1 && isOdd) boxColor = viz.colors.green + '11';
                                    if (phase >= 1 && isEven) boxColor = viz.colors.blue + '11';
                                    ctx.fillStyle = boxColor;
                                    ctx.fillRect(x, baseY, roomW - 4, roomH);
                                    ctx.strokeStyle = (phase >= 1 && isOdd) ? viz.colors.green : viz.colors.axis;
                                    ctx.lineWidth = (phase >= 1 && isOdd) ? 2 : 1;
                                    ctx.strokeRect(x, baseY, roomW - 4, roomH);

                                    // Room number
                                    ctx.fillStyle = (phase >= 1 && isOdd) ? viz.colors.green : (phase >= 1 && isEven ? viz.colors.blue : viz.colors.text);
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('Room ' + roomNum, x + roomW / 2 - 2, baseY + 11);

                                    // Phase label
                                    if (phase >= 1) {
                                        ctx.fillStyle = isOdd ? viz.colors.green : viz.colors.blue;
                                        ctx.font = '9px -apple-system,sans-serif';
                                        ctx.fillText(isOdd ? 'ODD' : 'EVEN', x + roomW / 2 - 2, baseY - 4);
                                    }
                                }

                                // "..."
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '16px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('\u2026', startX + numShow * roomW, baseY + roomH / 2);

                                // Draw occupants
                                for (var r = 0; r < numShow; r++) {
                                    var rx = startX + r * roomW + roomW / 2 - 2;
                                    var ry = baseY + 30;
                                    var roomNum2 = r + 1;

                                    if (phase === 0) {
                                        // Original guest in every room
                                        drawStick(ctx, rx, ry, viz.colors.blue, 'G' + roomNum2);
                                    } else if (phase === 1) {
                                        // Even rooms have original guests
                                        if (roomNum2 % 2 === 0) {
                                            var origGuest = roomNum2 / 2;
                                            drawStick(ctx, rx, ry, viz.colors.blue, 'G' + origGuest);
                                        }
                                        // Odd rooms empty
                                        if (roomNum2 % 2 === 1) {
                                            ctx.fillStyle = viz.colors.green;
                                            ctx.font = 'italic 10px -apple-system,sans-serif';
                                            ctx.textAlign = 'center';
                                            ctx.fillText('empty', rx, ry);
                                        }
                                    } else {
                                        // Phase 2: everyone placed
                                        if (roomNum2 % 2 === 0) {
                                            var origGuest2 = roomNum2 / 2;
                                            drawStick(ctx, rx, ry, viz.colors.blue, 'G' + origGuest2);
                                        } else {
                                            var busGuest = Math.ceil(roomNum2 / 2);
                                            drawStick(ctx, rx, ry, viz.colors.orange, 'B' + busGuest);
                                        }
                                    }
                                }

                                // Mapping table
                                var tableY = baseY + roomH + 30;
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Mapping:', 16, tableY);

                                ctx.font = '11px -apple-system,sans-serif';
                                if (phase >= 1) {
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.fillText('Original guests: room n \u2192 room 2n', 16, tableY + 18);
                                    for (var g = 1; g <= 4; g++) {
                                        ctx.fillText('G' + g + ': room ' + g + ' \u2192 room ' + (2 * g), 16 + (g - 1) * 140, tableY + 36);
                                    }
                                }
                                if (phase >= 2) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.fillText('Bus passengers: passenger k \u2192 room 2k\u22121', 16, tableY + 56);
                                    for (var b = 1; b <= 4; b++) {
                                        ctx.fillText('B' + b + ': \u2192 room ' + (2 * b - 1), 16 + (b - 1) * 140, tableY + 74);
                                    }
                                }

                                // Bus graphic
                                if (phase === 0) {
                                    ctx.fillStyle = viz.colors.orange + '33';
                                    ctx.fillRect(W - 160, H - 60, 150, 35);
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.strokeRect(W - 160, H - 60, 150, 35);
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('\u221E BUS: passengers 1, 2, 3, ...', W - 85, H - 38);
                                }
                            }

                            function drawStick(ctx, x, y, color, label) {
                                ctx.fillStyle = color;
                                ctx.beginPath(); ctx.arc(x, y - 6, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 1.2;
                                ctx.beginPath(); ctx.moveTo(x, y - 2); ctx.lineTo(x, y + 6); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(x - 4, y + 1); ctx.lineTo(x + 4, y + 1); ctx.stroke();
                                ctx.fillStyle = color;
                                ctx.font = '8px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(label, x, y + 16);
                            }

                            VizEngine.createButton(controls, 'Move to Evens', function () { phase = 1; draw(); });
                            VizEngine.createButton(controls, 'Load Bus', function () { phase = 2; draw(); });
                            VizEngine.createButton(controls, 'Reset', function () { phase = 0; draw(); });

                            draw();
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'After the \\(n \\to 2n\\) shift, what room is the original guest from room 50 in? What room is bus passenger 50 in?',
                        hint: 'Apply the formulas: original guest \\(n\\) goes to room \\(2n\\). Bus passenger \\(k\\) goes to room \\(2k - 1\\).',
                        solution: 'Original guest 50 goes to room \\(2 \\times 50 = 100\\). Bus passenger 50 goes to room \\(2 \\times 50 - 1 = 99\\).'
                    },
                    {
                        question: 'Could the manager use the rule \\(n \\to 3n\\) instead? What rooms would the bus passengers occupy?',
                        hint: 'If current guests go to multiples of 3, which rooms are left?',
                        solution: 'Yes. If current guests go to rooms \\(3, 6, 9, 12, \\ldots\\), then rooms \\(1, 2, 4, 5, 7, 8, 10, 11, \\ldots\\) are free. These are all natural numbers that are <em>not</em> multiples of 3. There are infinitely many such rooms (in fact, twice as many as the multiples of 3), so the bus passengers fit easily. The \\(n \\to 2n\\) trick is simpler, but \\(n \\to 3n\\) works too.'
                    },
                    {
                        question: 'After fitting the bus passengers, suppose <em>another</em> infinite bus arrives. Can the manager fit them too? How?',
                        hint: 'Apply the same trick again, or think of a combined strategy.',
                        solution: 'Yes! Apply \\(n \\to 2n\\) again: move everyone (current guests and first-bus passengers) from room \\(n\\) to room \\(2n\\). All odd rooms are now free for the second bus. Alternatively, the manager could have planned ahead from the start using the strategy from the next section (infinitely many buses).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Infinitely Many Buses
            // ============================================================
            {
                id: 'infinite-buses',
                title: 'Infinitely Many Buses Arrive',
                content: `
<h2>An Infinite Fleet</h2>

<p>The situation escalates. Not one, not two, but <em>infinitely many</em> buses arrive at the hotel, each carrying infinitely many passengers. Bus 1 has passengers numbered 1, 2, 3, ... Bus 2 has passengers numbered 1, 2, 3, ... And so on, for buses 1, 2, 3, 4, ...</p>

<p>That is \\(\\aleph_0\\) buses, each with \\(\\aleph_0\\) passengers. A total of \\(\\aleph_0 \\times \\aleph_0\\) new guests. Plus the \\(\\aleph_0\\) original hotel guests. Can the manager accommodate everyone?</p>

<p>Yes. And the method is one of the most beautiful arguments in mathematics.</p>

<h3>The prime powers method</h3>

<p>Here is one elegant approach. Assign each group a unique prime number:</p>
<ul>
    <li>Original hotel guests get prime \\(p = 2\\). Guest \\(n\\) goes to room \\(2^n\\).</li>
    <li>Bus 1 passengers get prime \\(p = 3\\). Passenger \\(k\\) goes to room \\(3^k\\).</li>
    <li>Bus 2 passengers get prime \\(p = 5\\). Passenger \\(k\\) goes to room \\(5^k\\).</li>
    <li>Bus \\(m\\) passengers get the \\((m+1)\\)-th prime \\(p_m\\). Passenger \\(k\\) goes to room \\(p_m^k\\).</li>
</ul>

<p>Since every natural number has a unique prime factorization (the Fundamental Theorem of Arithmetic), no two people are sent to the same room. Powers of different primes never collide: \\(2^a \\neq 3^b\\) for any positive integers \\(a, b\\).</p>

<div class="env-block theorem">
<strong>Mathematical statement</strong><br>
The function that maps the original guest \\(n\\) to \\(2^n\\), and bus \\(m\\) passenger \\(k\\) to \\(p_{m+1}^k\\) (where \\(p_j\\) is the \\(j\\)-th prime), is injective. This proves \\(\\aleph_0 + \\aleph_0 \\cdot \\aleph_0 = \\aleph_0\\), i.e., \\(\\aleph_0^2 = \\aleph_0\\).
</div>

<div class="env-block remark">
<strong>Many rooms wasted!</strong><br>
This method leaves many rooms empty (room 6, room 10, room 12, etc., are not prime powers). That is fine! We only need to show that everyone <em>fits</em>, not that every room is used. In fact, there is a more efficient method using the "diagonal zigzag" that fills every room, but the prime power method is easier to understand.
</div>

<h3>The diagonal zigzag method</h3>

<p>Another classic approach: arrange all guests (from the hotel and all buses) in a two-dimensional grid. Row 0 is the original hotel guests. Row 1 is bus 1. Row 2 is bus 2. And so on. Now zigzag along the diagonals of this grid, assigning room numbers 1, 2, 3, 4, ... as you go.</p>

<div class="viz-placeholder" data-viz="diagonal-zigzag"></div>

<p>This is exactly Cantor's diagonal argument that proves the rationals are countable. The same fundamental idea keeps appearing in different guises.</p>

<div class="env-block example">
<strong>Zigzag order for a 4&times;4 corner</strong><br>
(0,0) &rarr; Room 1<br>
(0,1) &rarr; Room 2, (1,0) &rarr; Room 3<br>
(2,0) &rarr; Room 4, (1,1) &rarr; Room 5, (0,2) &rarr; Room 6<br>
(0,3) &rarr; Room 7, (1,2) &rarr; Room 8, (2,1) &rarr; Room 9, (3,0) &rarr; Room 10<br>
... and so on, covering every grid point exactly once.
</div>
`,
                visualizations: [
                    {
                        id: 'diagonal-zigzag',
                        title: 'Cantor\'s Diagonal Zigzag',
                        description: 'Click "Step" to watch the zigzag path assign room numbers to an infinite grid of guests. Row 0 = original guests, Row 1 = Bus 1, Row 2 = Bus 2, etc.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { width: 620, height: 400, scale: 1, originX: 0, originY: 0 });
                            var gridSize = 7;
                            var cellSize = 54;
                            var visited = [];
                            var roomNum = 0;
                            var path = [];

                            // Generate zigzag path
                            function generatePath() {
                                path = [];
                                for (var diag = 0; diag < gridSize * 2; diag++) {
                                    var cells = [];
                                    for (var r = 0; r <= diag; r++) {
                                        var c = diag - r;
                                        if (r < gridSize && c < gridSize) {
                                            cells.push({ r: r, c: c });
                                        }
                                    }
                                    // Alternate direction
                                    if (diag % 2 === 0) cells.reverse();
                                    path = path.concat(cells);
                                }
                            }
                            generatePath();

                            function draw() {
                                viz.clear();
                                var ctx = viz.ctx;
                                var W = viz.width, H = viz.height;
                                var startX = 90, startY = 60;

                                // Column headers
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                for (var c = 0; c < gridSize; c++) {
                                    ctx.fillText('Guest ' + (c + 1), startX + c * cellSize + cellSize / 2, startY - 8);
                                }

                                // Row headers
                                ctx.textAlign = 'right';
                                var rowLabels = ['Hotel', 'Bus 1', 'Bus 2', 'Bus 3', 'Bus 4', 'Bus 5', 'Bus 6'];
                                for (var r = 0; r < gridSize; r++) {
                                    ctx.fillStyle = r === 0 ? viz.colors.blue : viz.colors.orange;
                                    ctx.fillText(rowLabels[r] || 'Bus ' + r, startX - 8, startY + r * cellSize + cellSize / 2 + 3);
                                }

                                // Grid cells
                                for (var row = 0; row < gridSize; row++) {
                                    for (var col = 0; col < gridSize; col++) {
                                        var x = startX + col * cellSize;
                                        var y = startY + row * cellSize;

                                        // Find if visited
                                        var visitIdx = -1;
                                        for (var vi = 0; vi < visited.length; vi++) {
                                            if (visited[vi].r === row && visited[vi].c === col) {
                                                visitIdx = vi;
                                                break;
                                            }
                                        }

                                        var isCurrent = (visitIdx === visited.length - 1 && visited.length > 0);

                                        ctx.fillStyle = visitIdx >= 0 ? (isCurrent ? viz.colors.teal + '44' : viz.colors.purple + '22') : '#0c0c20';
                                        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
                                        ctx.strokeStyle = visitIdx >= 0 ? viz.colors.purple : viz.colors.grid;
                                        ctx.lineWidth = isCurrent ? 2 : 0.5;
                                        ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

                                        if (visitIdx >= 0) {
                                            // Room number
                                            ctx.fillStyle = isCurrent ? viz.colors.teal : viz.colors.purple;
                                            ctx.font = 'bold 14px -apple-system,sans-serif';
                                            ctx.textAlign = 'center';
                                            ctx.fillText('R' + (visitIdx + 1), x + cellSize / 2, y + cellSize / 2 + 4);
                                        } else {
                                            // Dot placeholder
                                            ctx.fillStyle = row === 0 ? viz.colors.blue + '44' : viz.colors.orange + '44';
                                            ctx.beginPath(); ctx.arc(x + cellSize / 2, y + cellSize / 2, 3, 0, Math.PI * 2); ctx.fill();
                                        }
                                    }
                                }

                                // Draw path lines
                                if (visited.length > 1) {
                                    ctx.strokeStyle = viz.colors.teal + '88';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    for (var pi = 0; pi < visited.length; pi++) {
                                        var px = startX + visited[pi].c * cellSize + cellSize / 2;
                                        var py = startY + visited[pi].r * cellSize + cellSize / 2;
                                        if (pi === 0) ctx.moveTo(px, py);
                                        else ctx.lineTo(px, py);
                                    }
                                    ctx.stroke();
                                }

                                // Status
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Rooms assigned: ' + visited.length + ' / \u221e', 10, H - 16);
                            }

                            VizEngine.createButton(controls, 'Step', function () {
                                if (roomNum < path.length) {
                                    visited.push(path[roomNum]);
                                    roomNum++;
                                    draw();
                                }
                            });

                            VizEngine.createButton(controls, 'Auto (10 steps)', function () {
                                for (var s = 0; s < 10 && roomNum < path.length; s++) {
                                    visited.push(path[roomNum]);
                                    roomNum++;
                                }
                                draw();
                            });

                            VizEngine.createButton(controls, 'Fill All', function () {
                                while (roomNum < path.length) {
                                    visited.push(path[roomNum]);
                                    roomNum++;
                                }
                                draw();
                            });

                            VizEngine.createButton(controls, 'Reset', function () {
                                visited = [];
                                roomNum = 0;
                                draw();
                            });

                            draw();
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Using the prime powers method, what room does passenger 3 from bus 2 go to? (Bus 2 gets prime 5.)',
                        hint: 'Bus 2 gets the 3rd prime (\\(p_3 = 5\\)). Passenger \\(k\\) goes to room \\(5^k\\).',
                        solution: 'Passenger 3 from bus 2 goes to room \\(5^3 = 125\\).'
                    },
                    {
                        question: 'In the prime powers method, why can\'t two different people end up in the same room?',
                        hint: 'Think about the Fundamental Theorem of Arithmetic.',
                        solution: 'Each person is assigned a room of the form \\(p^k\\) where \\(p\\) is a prime and \\(k\\) is a positive integer. Two different groups use different primes, so their rooms are powers of different primes. Powers of different primes are never equal (because prime factorization is unique). Within the same group, different passengers \\(k_1 \\neq k_2\\) give \\(p^{k_1} \\neq p^{k_2}\\) since \\(p &gt; 1\\). So no collisions are possible.'
                    },
                    {
                        question: 'In the zigzag method, which room number does the guest at grid position (row 3, column 2) get? Trace the zigzag path.',
                        hint: 'The zigzag covers diagonals 0, 1, 2, 3, ... Diagonal \\(d\\) has all cells where row + column = \\(d\\). Row 3, column 2 is on diagonal 5.',
                        solution: 'Diagonals 0 through 4 have 1+2+3+4+5 = 15 cells total. Diagonal 5 (row+col=5) in the grid of size 7 contains cells (0,5), (1,4), (2,3), (3,2), (4,1), (5,0). Since diagonal 5 is odd, we traverse in this order (not reversed). Position (3,2) is the 4th cell on this diagonal, so it gets room \\(15 + 4 = 19\\).'
                    }
                ]
            },

            // ============================================================
            // Section 5: What This Tells Us About Infinity
            // ============================================================
            {
                id: 'lessons',
                title: 'What This Tells Us About Infinity',
                content: `
<h2>The Arithmetic of Countable Infinity</h2>

<p>Let us step back and see what Hilbert's Hotel has taught us. Each scenario corresponds to an equation in the arithmetic of infinite cardinalities:</p>

<table style="width:100%; border-collapse:collapse; margin:20px 0;">
<thead>
<tr style="border-bottom:2px solid #30363d;">
<th style="text-align:left; padding:8px; color:#58a6ff;">Scenario</th>
<th style="text-align:left; padding:8px; color:#58a6ff;">Equation</th>
<th style="text-align:left; padding:8px; color:#58a6ff;">Method</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #1a1a40;">
<td style="padding:8px;">1 new guest</td>
<td style="padding:8px;">\\(\\aleph_0 + 1 = \\aleph_0\\)</td>
<td style="padding:8px;">\\(n \\to n+1\\)</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
<td style="padding:8px;">\\(k\\) new guests</td>
<td style="padding:8px;">\\(\\aleph_0 + k = \\aleph_0\\)</td>
<td style="padding:8px;">\\(n \\to n+k\\)</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
<td style="padding:8px;">1 infinite bus</td>
<td style="padding:8px;">\\(\\aleph_0 + \\aleph_0 = \\aleph_0\\)</td>
<td style="padding:8px;">\\(n \\to 2n\\)</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
<td style="padding:8px;">\\(\\aleph_0\\) infinite buses</td>
<td style="padding:8px;">\\(\\aleph_0 \\times \\aleph_0 = \\aleph_0\\)</td>
<td style="padding:8px;">Prime powers or zigzag</td>
</tr>
</tbody>
</table>

<p>These equations would be absurd for finite numbers. Adding 1 to something always makes it bigger in the finite world. But countable infinity is closed under these operations: you cannot "escape" \\(\\aleph_0\\) by adding, multiplying, or even raising it to finite powers.</p>

<div class="env-block definition">
<strong>Countable infinity (\\(\\aleph_0\\))</strong><br>
A set is <em>countably infinite</em> if it can be put in one-to-one correspondence with the natural numbers. Equivalently, its elements can be listed in a sequence. The natural numbers, integers, rationals, and even algebraic numbers are all countably infinite.
</div>

<h3>The limits of countable infinity</h3>

<p>Is there anything Hilbert's Hotel <em>cannot</em> accommodate? Yes! If a bus arrived carrying one passenger for every <em>real number</em> (every point on the number line), the manager would be stumped. Cantor proved in 1891 that the real numbers are <strong>uncountable</strong>: there is no way to list them all in a sequence. No matter how clever the manager is, she cannot fit the "continuum bus" into her countable hotel.</p>

<p>This is Cantor's diagonal argument, the subject of our next chapter. It shows that there is a larger infinity, \\(\\mathfrak{c} = 2^{\\aleph_0}\\), the cardinality of the continuum. And beyond that, \\(2^{\\mathfrak{c}}\\), and \\(2^{2^{\\mathfrak{c}}}\\), and so on forever, an endless tower of ever-larger infinities.</p>

<div class="env-block intuition">
<strong>The hierarchy of infinities</strong><br>
\\[
\\aleph_0 \\;&lt;\\; 2^{\\aleph_0} \\;&lt;\\; 2^{2^{\\aleph_0}} \\;&lt;\\; \\cdots
\\]
Countable infinity is the <em>smallest</em> infinity. It is large enough to absorb addition and multiplication, but it is dwarfed by the power set operation. This hierarchy, discovered by Cantor, is one of the most profound ideas in all of mathematics.
</div>

<h3>Hilbert's legacy</h3>

<p>David Hilbert (1862-1943) was one of the most influential mathematicians of the 20th century. His hotel thought experiment, proposed during a 1924 lecture, was not a research contribution but a pedagogical masterpiece: it made the abstract theory of infinite sets vivid and accessible to anyone willing to think carefully.</p>

<p>The next time someone tells you "infinity plus one is still infinity," you will know exactly what that means, why it is true, and what proof looks like: it is the story of a hotel where the NO VACANCY sign never needs to go on.</p>

<div class="env-block remark">
<strong>Looking ahead</strong><br>
In Chapter 6, we will visit Cantor's Paradise and confront the question: are there different <em>sizes</em> of infinity? The answer is yes, and the proof is one of the most elegant arguments in the history of human thought.
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Can Hilbert\'s Hotel accommodate a guest for every <em>rational</em> number? Why or why not?',
                        hint: 'Are the rationals countable?',
                        solution: 'Yes! The rationals are countable (as Cantor proved with the diagonal zigzag), so a "rational bus" has the same cardinality \\(\\aleph_0\\) as the hotel. The manager can use any bijection between the rationals and the natural numbers to assign rooms.'
                    },
                    {
                        question: 'True or false: \\(\\aleph_0^{\\aleph_0} = \\aleph_0\\).',
                        hint: 'This is asking: can you list all <em>sequences</em> of natural numbers? Think about how this relates to the real numbers.',
                        solution: 'False! \\(\\aleph_0^{\\aleph_0} = 2^{\\aleph_0} = \\mathfrak{c}\\), the cardinality of the continuum (real numbers). Every real number can be represented as an infinite sequence of digits, and Cantor\'s diagonal argument shows that these sequences cannot be enumerated. So \\(\\aleph_0^{\\aleph_0} &gt; \\aleph_0\\).'
                    },
                    {
                        question: 'Hilbert\'s Hotel has rooms numbered 1, 2, 3, ... What if the rooms were numbered 0, 1, 2, 3, ... instead (including room 0)? Would any of the arguments change?',
                        hint: 'Think about whether \\(\\{0, 1, 2, 3, \\ldots\\}\\) has the same cardinality as \\(\\{1, 2, 3, \\ldots\\}\\).',
                        solution: 'Nothing changes. The sets \\(\\{0, 1, 2, \\ldots\\}\\) and \\(\\{1, 2, 3, \\ldots\\}\\) are in bijection via \\(n \\leftrightarrow n+1\\). Adding room 0 is just adding one more room to a countably infinite set, which (as we proved!) does not change the cardinality. All the same tricks work.'
                    }
                ]
            }
        ]
    });
})();
