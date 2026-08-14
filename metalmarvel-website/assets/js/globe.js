/* Transparent orange wireframe globe with real continents.

   Geometry is precomputed on the unit sphere once and projected per frame into a
   small set of Path2D buckets, so a full redraw is a handful of draw calls rather
   than one per dot. */

import { LAND_DOTS } from './land-dots.js';
import { reducedMotion } from './ui.js';

const ORANGE = '255, 122, 24';
const TILT = 18 * Math.PI / 180;   // camera tilt, so latitudes read as ellipses
const AUTO_ROTATE = 0.00024;       // radians per ms

function unitVec(lat, lon) {
    const phi = lat * Math.PI / 180;
    const lambda = lon * Math.PI / 180;
    const cosPhi = Math.cos(phi);
    return { x: cosPhi * Math.sin(lambda), y: Math.sin(phi), z: cosPhi * Math.cos(lambda) };
}

export function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const land = [];
    for (let i = 0; i < LAND_DOTS.length; i += 2) {
        land.push(unitVec(LAND_DOTS[i], LAND_DOTS[i + 1]));
    }

    // Graticule geometry is fixed on the sphere, so precompute it once too.
    const graticule = [];
    for (let lat = -60; lat <= 60; lat += 30) {
        const line = [];
        for (let lon = 0; lon <= 360; lon += 8) line.push(unitVec(lat, lon));
        graticule.push(line);
    }
    for (let lon = 0; lon < 360; lon += 30) {
        const line = [];
        for (let lat = -90; lat <= 90; lat += 6) line.push(unitVec(lat, lon));
        graticule.push(line);
    }

    let width = 0, height = 0, cx = 0, cy = 0, radius = 0;
    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        if (!w || !h) return;
        width = w;
        height = h;
        cx = width / 2;
        cy = height / 2;
        radius = Math.min(width, height) * 0.44;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        // setTransform, not scale — scale compounds on every resize.
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation-loop state. Declared before the drag handlers because moveDrag
    // reads `running` to decide whether it must repaint by itself.
    let running = false;
    let frameHandle = 0;
    let lastFrame = 0;

    // --- drag to spin ---
    let rotationY = -0.4;
    let isDragging = false;
    let previousX = 0;

    function startDrag(x) { isDragging = true; previousX = x; }
    function moveDrag(x) {
        if (!isDragging) return;
        rotationY += (x - previousX) * 0.008;
        previousX = x;
        if (!running) drawFrame();   // keep drag responsive when the loop is idle
    }
    function endDrag() { isDragging = false; }

    canvas.addEventListener('mousedown', (e) => startDrag(e.clientX));
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    window.addEventListener('mouseup', endDrag);
    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) startDrag(e.touches[0].clientX);
    }, { passive: true });
    canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) moveDrag(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', endDrag);

    // Per-frame rotation state, hoisted so projection stays allocation-free.
    let sinRot = 0, cosRot = 1;
    const sinTilt = Math.sin(TILT), cosTilt = Math.cos(TILT);

    // Spin a precomputed unit vector into screen space.
    // Returns depth > 0 for the near hemisphere.
    const out = { px: 0, py: 0, depth: 0 };
    function project(v) {
        const x = v.x * cosRot + v.z * sinRot;
        const z = v.z * cosRot - v.x * sinRot;
        const yt = v.y * cosTilt - z * sinTilt;
        out.px = cx + radius * x;
        out.py = cy - radius * yt;
        out.depth = v.y * sinTilt + z * cosTilt;
        return out;
    }

    // Segments are bucketed by depth so the whole cage strokes in a few passes
    // instead of one stroke() per segment.
    const GRAT_BUCKETS = 4;
    const gratPaths = [];

    function drawGraticule() {
        for (let i = 0; i < GRAT_BUCKETS; i++) gratPaths[i] = new Path2D();

        for (let l = 0; l < graticule.length; l++) {
            const line = graticule[l];
            let prevX = 0, prevY = 0, prevD = 0;
            for (let i = 0; i < line.length; i++) {
                const p = project(line[i]);
                if (i > 0) {
                    const facing = (prevD + p.depth) / 2;
                    const b = facing > 0
                        ? 1 + Math.min(GRAT_BUCKETS - 2, Math.floor(facing * (GRAT_BUCKETS - 1)))
                        : 0;
                    gratPaths[b].moveTo(prevX, prevY);
                    gratPaths[b].lineTo(p.px, p.py);
                }
                prevX = p.px; prevY = p.py; prevD = p.depth;
            }
        }

        ctx.lineWidth = 1;
        for (let i = 0; i < GRAT_BUCKETS; i++) {
            const alpha = i === 0 ? 0.045 : 0.07 + i * 0.05;
            ctx.strokeStyle = 'rgba(' + ORANGE + ', ' + alpha.toFixed(3) + ')';
            ctx.stroke(gratPaths[i]);
        }

        ctx.strokeStyle = 'rgba(' + ORANGE + ', 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Continents, as land dots on the near hemisphere. Bucketed by depth so the
    // whole map draws in a handful of fills instead of ~1900 separate ones.
    const BUCKETS = 5;
    const buckets = [];

    function drawContinents() {
        for (let i = 0; i < BUCKETS; i++) buckets[i] = new Path2D();

        const dotR = Math.max(radius * 0.0075, 0.9);
        for (let i = 0; i < land.length; i++) {
            const p = project(land[i]);
            if (p.depth <= 0.02) continue;
            const b = Math.min(BUCKETS - 1, Math.floor(p.depth * BUCKETS));
            const path = buckets[b];
            path.moveTo(p.px + dotR, p.py);
            path.arc(p.px, p.py, dotR, 0, Math.PI * 2);
        }

        for (let i = 0; i < BUCKETS; i++) {
            const alpha = 0.22 + (i / (BUCKETS - 1)) * 0.68;
            ctx.fillStyle = 'rgba(' + ORANGE + ', ' + alpha.toFixed(3) + ')';
            ctx.fill(buckets[i]);
        }
    }

    function drawFrame() {
        if (canvas.offsetWidth && canvas.width !== Math.round(canvas.offsetWidth * dpr)) {
            resizeCanvas();
        }
        if (!radius) return;

        sinRot = Math.sin(rotationY);
        cosRot = Math.cos(rotationY);

        ctx.clearRect(0, 0, width, height);

        // Soft orange rim light, leaving the core transparent
        const halo = ctx.createRadialGradient(cx, cy, radius * 0.55, cx, cy, radius * 1.18);
        halo.addColorStop(0, 'rgba(' + ORANGE + ', 0)');
        halo.addColorStop(0.72, 'rgba(' + ORANGE + ', 0.10)');
        halo.addColorStop(1, 'rgba(' + ORANGE + ', 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
        ctx.fill();

        drawGraticule();
        drawContinents();
    }

    /* --- Animation loop ---
       Only runs while the globe is actually on screen. Previously it re-armed
       unconditionally and kept projecting ~1900 dots per frame after the visitor
       had scrolled past it. */
    function frame(now) {
        const dt = Math.min(now - lastFrame, 100);
        lastFrame = now;
        if (!isDragging) rotationY += AUTO_ROTATE * dt;
        drawFrame();
        frameHandle = requestAnimationFrame(frame);
    }

    function start() {
        if (running) return;
        running = true;
        lastFrame = performance.now();
        frameHandle = requestAnimationFrame(frame);
    }

    function stop() {
        if (!running) return;
        running = false;
        cancelAnimationFrame(frameHandle);
    }

    /* Reduced motion: paint the globe once and leave it. It is still draggable,
       which is motion the visitor asked for. */
    if (reducedMotion.matches) {
        drawFrame();
        window.addEventListener('resize', drawFrame);
        return;
    }

    const wrapper = document.getElementById('globe-wrapper') ?? canvas;
    const visibility = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) start();
                else stop();
            }
        },
        { threshold: 0 }
    );
    visibility.observe(wrapper);

    // A hidden tab throttles rAF but does not stop it; this makes it explicit.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else if (wrapper.getBoundingClientRect().top < window.innerHeight) start();
    });
}
