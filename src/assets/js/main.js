/* ============================================================
   VICTOR AMARANTE — PORTFOLIO INTERACTIONS
   ============================================================ */

/* ─────────────────────────────────────────────────────────
   1. HERO — WebGL cursor-reactive aurora/plasma shader
   (adapted from the Cadence hero canvas)
   ───────────────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl) return;

  let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const W = canvas.parentElement.clientWidth;
    const H = canvas.parentElement.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}`;
  const FRAG = `
precision highp float;
uniform float u_t; uniform vec2 u_r; uniform vec2 u_m;
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 perm(vec4 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.); const vec4 D=vec4(0,.5,1,2);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.-g; vec3 i1=min(g,l.zxy); vec3 i2=max(g,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy; i=mod289(i);
  vec4 p=perm(perm(perm(i.z+vec4(0,i1.z,i2.z,1))+i.y+vec4(0,i1.y,i2.y,1))+i.x+vec4(0,i1.x,i2.x,1));
  float n_=1./7.; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.; vec4 sh=-step(h,vec4(0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=1.79284291400159-.85373472095314*vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){ float v=0.,a=.5; for(int i=0;i<5;i++){ v+=a*snoise(p); p*=2.1; a*=.48; } return v; }
void main(){
  vec2 uv=(gl_FragCoord.xy)/u_r; vec2 p=uv*2.-1.; p.x*=u_r.x/u_r.y;
  vec2 mp=u_m*2.-1.; mp.x*=u_r.x/u_r.y;
  float md=length(p-mp);
  float mInfluence=smoothstep(1.5,0.,md)*0.6;
  p+=normalize(p-mp+.001)*mInfluence*0.45;
  float t=u_t*0.25;
  float n1=fbm(vec3(p*1.2+vec2(t*0.4,t*0.3),t*0.2));
  float n2=fbm(vec3(p*2.5+vec2(-t*0.6,t*0.5),t*0.35+5.));
  float n3=fbm(vec3(p*1.8+mp*0.5,t*0.5+10.));
  float wave=sin(length(p)*4.0-t*2.0)*0.5+0.5;
  float n4=fbm(vec3(p*0.8+vec2(t*0.2,-t*0.15),t*0.1+20.))*wave;
  float n=n1*0.55+n2*0.3+n3*mInfluence*1.5+n4*0.35;
  vec3 c1=vec3(0.05,0.58,0.51);
  vec3 c2=vec3(0.18,0.84,0.75);
  vec3 c3=vec3(0.37,0.93,0.85);
  float intensity=smoothstep(-0.2,0.8,n);
  vec3 col=mix(c1,c2,intensity);
  col=mix(col,c3,smoothstep(0.5,1.0,intensity)*0.6);
  float glow=exp(-md*md*2.5)*0.5; col+=c3*glow;
  float vig=1.-smoothstep(0.4,1.5,length(uv*2.-1.));
  float alpha=intensity*0.30*vig+glow*0.7*vig;
  float centerGlow=exp(-dot(p,p)*0.6)*0.12; alpha+=centerGlow;
  gl_FragColor=vec4(col,alpha);
}`;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const pLoc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(pLoc);
  gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

  const u_t = gl.getUniformLocation(prog, 'u_t');
  const u_r = gl.getUniformLocation(prog, 'u_r');
  const u_m = gl.getUniformLocation(prog, 'u_m');

  // Cursor tracking across the whole hero
  window.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    tmx = (e.clientX - r.left) / r.width;
    tmy = 1.0 - (e.clientY - r.top) / r.height;
  });

  resize();
  window.addEventListener('resize', resize);

  function frame(t) {
    requestAnimationFrame(frame);
    mx += (tmx - mx) * 0.12; my += (tmy - my) * 0.12;
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.useProgram(prog);
    gl.uniform1f(u_t, t * 0.001);
    gl.uniform2f(u_r, canvas.width, canvas.height);
    gl.uniform2f(u_m, mx, my);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  requestAnimationFrame(frame);
})();

/* ─────────────────────────────────────────────────────────
   2. GLOBE — Canvas 2D fibonacci-sphere network
   (adapted from the Omi hero globe, recolored to teal)
   ───────────────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-globe');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;

  const NODE = 'rgba(45,212,191,0.85)';
  const HL = '#5EEAD4';
  const ARC = '20,184,166';
  const RING = 'rgba(20,184,166,0.22)';
  const LINE = 'rgba(45,212,191,0.10)';

  const globeNodes = [], arcs = [];
  const numNodes = 780;
  let globeRadius = 210;
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < numNodes; i++) {
    const y = 1 - (i / (numNodes - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radius, z = Math.sin(theta) * radius;
    const isHighlight = Math.random() > 0.92;
    const d = 1 + (Math.random() * 0.06 - 0.03);
    globeNodes.push({ x: x * d, y: y * d, z: z * d, baseRadius: isHighlight ? 2 : 1, color: isHighlight ? HL : NODE });
  }
  for (let i = 0; i < 18; i++) {
    arcs.push({ n1: (Math.random() * numNodes) | 0, n2: (Math.random() * numNodes) | 0, progress: Math.random(), speed: 0.002 + Math.random() * 0.005 });
  }
  const orbitalRings = [
    { radius: 1.3, tiltX: 0.2, tiltZ: 0.5, speed: 0.001, angle: 0 },
    { radius: 1.45, tiltX: -0.4, tiltZ: 0.2, speed: -0.0015, angle: Math.PI / 3 },
    { radius: 1.2, tiltX: 0.5, tiltZ: -0.3, speed: 0.002, angle: Math.PI / 1.5 }
  ];

  function resizeCanvas() {
    const parent = canvas.parentElement;
    width = parent.clientWidth; height = parent.clientHeight;
    globeRadius = Math.max(150, Math.min(230, width * 0.36));
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr; canvas.height = height * dpr;
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let angleY = 0; const angleX = 0.2;
  function renderGlobe() {
    ctx.clearRect(0, 0, width, height);
    angleY += 0.002;
    const cx = width / 2, cy = height / 2, fov = 800;

    const g = ctx.createRadialGradient(cx, cy, globeRadius * 0.4, cx, cy, globeRadius * 1.6);
    g.addColorStop(0, 'rgba(20,184,166,0.13)');
    g.addColorStop(0.5, 'rgba(20,184,166,0.04)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);

    const sinY = Math.sin(angleY), cosY = Math.cos(angleY);
    const sinX = Math.sin(angleX), cosX = Math.cos(angleX);

    ctx.lineWidth = 1; ctx.strokeStyle = LINE; ctx.setLineDash([2, 4]);
    for (let lat = -4; lat <= 4; lat++) {
      const y = lat * 0.22, r = Math.sqrt(1 - y * y) * globeRadius;
      ctx.beginPath();
      for (let lon = 0; lon <= Math.PI * 2.01; lon += 0.1) {
        const x = Math.cos(lon) * r, z = Math.sin(lon) * r;
        const x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY;
        const y1 = (y * globeRadius) * cosX - z1 * sinX, z2 = (y * globeRadius) * sinX + z1 * cosX;
        const s = fov / (fov + z2), px = cx + x1 * s, py = cy + y1 * s;
        lon === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    for (let lon = 0; lon < Math.PI; lon += Math.PI / 6) {
      ctx.beginPath();
      for (let lat = -Math.PI / 2; lat <= Math.PI / 2 + 0.01; lat += 0.1) {
        const y = Math.sin(lat) * globeRadius, r = Math.cos(lat) * globeRadius;
        const x = Math.cos(lon) * r, z = Math.sin(lon) * r;
        const x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX, z2 = y * sinX + z1 * cosX;
        const s = fov / (fov + z2), px = cx + x1 * s, py = cy + y1 * s;
        lat === -Math.PI / 2 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);

    const proj = [];
    for (let i = 0; i < numNodes; i++) {
      const n = globeNodes[i];
      const x1 = n.x * cosY - n.z * sinY, z1 = n.x * sinY + n.z * cosY;
      const y1 = n.y * cosX - z1 * sinX, z2 = n.y * sinX + z1 * cosX;
      const s = fov / (fov + z2 * globeRadius);
      proj.push({ px: cx + x1 * globeRadius * s, py: cy + y1 * globeRadius * s, z: z2, scale: s, color: n.color, r: n.baseRadius });
    }

    orbitalRings.forEach(ring => {
      ring.angle += ring.speed;
      ctx.beginPath(); ctx.strokeStyle = RING; ctx.lineWidth = 1;
      for (let i = 0; i <= Math.PI * 2.01; i += 0.05) {
        const x = Math.cos(i) * globeRadius * ring.radius, z = Math.sin(i) * globeRadius * ring.radius;
        const ty = x * ring.tiltX + z * ring.tiltZ;
        const x1 = x * Math.cos(ring.angle) - z * Math.sin(ring.angle), z1 = x * Math.sin(ring.angle) + z * Math.cos(ring.angle);
        const pxr = x1 * cosY - z1 * sinY, pzr = x1 * sinY + z1 * cosY;
        const pyr = ty * cosX - pzr * sinX, fz = ty * sinX + pzr * cosX;
        const s = fov / (fov + fz), px = cx + pxr * s, py = cy + pyr * s;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();

      const dx = globeRadius * ring.radius, dz = 0;
      const dty = dx * ring.tiltX + dz * ring.tiltZ;
      const dx1 = dx * Math.cos(ring.angle), dz1 = dx * Math.sin(ring.angle);
      const pxrd = dx1 * cosY - dz1 * sinY, pzrd = dx1 * sinY + dz1 * cosY;
      const pyrd = dty * cosX - pzrd * sinX, fzd = dty * sinX + pzrd * cosX;
      if (fzd > -globeRadius * 1.5) {
        const s = fov / (fov + fzd), pX = cx + pxrd * s, pY = cy + pyrd * s;
        ctx.beginPath(); ctx.arc(pX, pY, 2 * s, 0, Math.PI * 2); ctx.fillStyle = HL; ctx.fill();
        ctx.beginPath(); ctx.arc(pX, pY, 6 * s, 0, Math.PI * 2); ctx.fillStyle = 'rgba(20,184,166,0.4)'; ctx.fill();
      }
    });

    ctx.lineWidth = 1.5;
    arcs.forEach(arc => {
      arc.progress += arc.speed; if (arc.progress > 1) arc.progress = 0;
      const a = proj[arc.n1], b = proj[arc.n2];
      if (a.z > -0.5 && b.z > -0.5) {
        ctx.beginPath(); ctx.moveTo(a.px, a.py);
        const mx = (a.px + b.px) / 2, my = (a.py + b.py) / 2 - 20 * a.scale;
        ctx.quadraticCurveTo(mx, my, b.px, b.py);
        const grad = ctx.createLinearGradient(a.px, a.py, b.px, b.py);
        grad.addColorStop(0, `rgba(${ARC},0)`);
        grad.addColorStop(arc.progress, `rgba(${ARC},0.85)`);
        grad.addColorStop(Math.min(1, arc.progress + 0.1), `rgba(${ARC},0)`);
        ctx.strokeStyle = grad; ctx.stroke();
      }
    });

    proj.sort((a, b) => b.z - a.z);
    for (let i = 0; i < proj.length; i++) {
      const p = proj[i];
      const alpha = Math.min(1, Math.max(0.1, p.z + 1.2));
      const d = Math.hypot(p.px - cx, p.py - cy);
      const edge = Math.min(1, d / (globeRadius * 0.8));
      ctx.globalAlpha = Math.min(1, alpha * (0.5 + edge * 0.5));
      ctx.beginPath(); ctx.arc(p.px, p.py, p.r * p.scale, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
      if (p.r > 1.5 && ctx.globalAlpha > 0.4) {
        ctx.beginPath(); ctx.arc(p.px, p.py, p.r * 2.5 * p.scale, 0, Math.PI * 2); ctx.fillStyle = 'rgba(20,184,166,0.3)'; ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(renderGlobe);
  }
  renderGlobe();
})();

/* ─────────────────────────────────────────────────────────
   3. Nav — scroll state + mobile toggle
   ───────────────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navMobile.classList.remove('open');
}));

/* ─────────────────────────────────────────────────────────
   4. Scroll reveals
   ───────────────────────────────────────────────────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-up').forEach(el => io.observe(el));

/* ─────────────────────────────────────────────────────────
   5. CONSENSUS — testimonials
   ══ EDIT HERE: paste each recommendation as an object.
      name     → who wrote it
      relation → how you worked together (role · company)
      text     → what they wrote about you
   ───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Eric Barreto',
    relation: 'Colleague · Amigo Tech',
    text: `“I had the pleasure of working with Victor Amarante at Amigo Tech, and I can confidently say he is an outstanding professional with a rare combination of technical depth, strategic thinking, and strong leadership skills. Victor has a deep knowledge of AI and understands very well how to apply it to real business problems, turning complex ideas into practical and impactful solutions. Beyond his technical expertise, he also stands out for his excellent ability to manage people, priorities, and activities with clarity and organization. He is the kind of professional who brings direction to the team, supports people around him, and ensures that projects move forward with quality and purpose. His communication, ownership, and ability to connect technical decisions with business impact make him a valuable asset to any company. I truly enjoyed working with Victor and would be happy to work with him again. Any team would be fortunate to have him.”`
  },
  {
    name: 'Robério Filho',
    relation: 'Studied together · RAG project',
    text: `“I studied alongside Victor and worked with him on several university projects, and he's one of the people I learn the most from. He's my go-to whenever I have a question about AI — he has a deep, genuinely current understanding of the field and an unusual talent for explaining complex concepts simply. We built a RAG project together for one of our courses, and his grasp of how to design and reason about AI systems stood out the whole way through. Beyond the technical side, he's a reliable, thoughtful collaborator who raises the quality of any project he joins. Any team working with AI would be lucky to have him.”`
  },
  {
    name: 'Mateus Ataide',
    relation: 'University & Amigo Tech',
    text: `“I had the pleasure of working with Victor, both at the university and at Amigo Tech, and he is an exceptional professional, extremely methodical and always well-prepared in every situation. He has a deep understanding of LLMs, always teaching me a great deal about the subject and demonstrating his talent for mentoring those around him. I would love to work with him again in the future, he's a wonderful person to work with.”`
  },
  {
    name: 'Marina Lima de Oliveira',
    relation: 'Colleague · Analytics',
    translated: true,
    text: `“Victor is a brilliant and highly intelligent professional. His mind is geared toward processes and automation, always improving how everyone performs their work. As a person, Victor is incredible — always willing to help, to teach and to learn new things. It was a pleasure working with him 💖”`
  },
  {
    name: 'Danielle Rodrigues',
    relation: "Victor's direct manager",
    translated: true,
    text: `“Victor is always very studious, shares his opinion, and looks to help everyone on the team. He always tries to understand the workflow in order to suggest improvements that boost productivity.”`
  },
  {
    name: 'Lays Giselle',
    relation: 'Colleague · Automation & Data',
    translated: true,
    text: `“Victor is deeply engaged, and his energy when talking about automation is contagious to everyone who hears him. Nothing is impossible for him. Super proactive and full of great ideas. Keep it up! 🚀”`
  }
];

(function () {
  const stack = document.getElementById('tstack');
  const dotsWrap = document.getElementById('tDots');
  if (!stack || !TESTIMONIALS.length) return;

  const AV_GRADS = [
    'linear-gradient(135deg,#2DD4BF,#14B8A6)',
    'linear-gradient(135deg,#14B8A6,#0D9488)',
    'linear-gradient(135deg,#5EEAD4,#2DD4BF)',
    'linear-gradient(135deg,#0D9488,#0F766E)'
  ];
  const initials = n => n.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();

  const cards = TESTIMONIALS.map((t, i) => {
    const el = document.createElement('article');
    el.className = 'tcard';
    const trans = t.translated
      ? '<span class="tcard-trans"><i data-lucide="languages"></i>Translated from Portuguese</span>'
      : '';
    el.innerHTML =
      '<div class="tcard-inner">' +
        '<div class="tcard-grid"></div>' + trans +
        '<div class="tcard-quote-mark">&ldquo;</div>' +
        '<p class="tcard-text">' + t.text + '</p>' +
        '<div class="tcard-author">' +
          '<div class="tcard-avatar" style="background:' + AV_GRADS[i % AV_GRADS.length] + '">' + initials(t.name) + '</div>' +
          '<div><div class="tcard-name">' + t.name + '</div><div class="tcard-relation">' + t.relation + '</div></div>' +
        '</div>' +
      '</div>';
    stack.appendChild(el);
    return el;
  });

  TESTIMONIALS.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'tdot';
    d.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    d.addEventListener('click', () => { active = i; layout(); restart(); });
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  let active = 0;
  const n = TESTIMONIALS.length;
  function layout() {
    cards.forEach((c, i) => {
      const rel = (i - active + n) % n;
      let cls = 'tcard ';
      if (rel === 0) cls += 'is-front';
      else if (rel === 1) cls += 'is-right';
      else if (rel === n - 1) cls += 'is-left';
      else cls += 'is-hidden';
      c.className = cls;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }
  function next() { active = (active + 1) % n; layout(); }
  function prev() { active = (active - 1 + n) % n; layout(); }

  document.getElementById('tNext').addEventListener('click', () => { next(); restart(); });
  document.getElementById('tPrev').addEventListener('click', () => { prev(); restart(); });

  let timer = setInterval(next, 5500);
  function restart() { clearInterval(timer); timer = setInterval(next, 5500); }

  layout();
})();

/* ─────────────────────────────────────────────────────────
   6. WAVE — animated dot grid behind consensus (Three.js)
   ───────────────────────────────────────────────────────── */
(function () {
  const container = document.getElementById('wave-bg');
  if (!container) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    if (typeof THREE === 'undefined') return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 1, 10000);
    camera.position.set(0, 300, 1000);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const SEP = 70, AX = 80, AY = 60, num = AX * AY;
    const positions = new Float32Array(num * 3);
    const scales = new Float32Array(num);
    let p = 0, s = 0;
    for (let ix = 0; ix < AX; ix++) {
      for (let iy = 0; iy < AY; iy++) {
        positions[p] = ix * SEP - (AX * SEP) / 2;
        positions[p + 1] = 0;
        positions[p + 2] = iy * SEP - (AY * SEP) / 2;
        scales[s] = 1; p += 3; s++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color(0x2DD4BF) } },
      vertexShader: 'attribute float scale;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=scale*(200.0/-mv.z);gl_Position=projectionMatrix*mv;}',
      fragmentShader: 'uniform vec3 color;void main(){if(length(gl_PointCoord-vec2(0.5))>0.475)discard;gl_FragColor=vec4(color,0.55);}',
      transparent: true
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let count = 0;
    (function render() {
      requestAnimationFrame(render);
      const pos = points.geometry.attributes.position.array;
      const sc = points.geometry.attributes.scale.array;
      let p = 0, s = 0;
      for (let ix = 0; ix < AX; ix++) {
        for (let iy = 0; iy < AY; iy++) {
          pos[p + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
          sc[s] = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
          p += 3; s++;
        }
      }
      points.geometry.attributes.position.needsUpdate = true;
      points.geometry.attributes.scale.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.04;
    })();

    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  if (typeof THREE === 'undefined') {
    const sc = document.createElement('script');
    sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    sc.onload = init;
    document.head.appendChild(sc);
  } else {
    init();
  }
})();

/* ─────────────────────────────────────────────────────────
   7. Dynamic year + Lucide icons
   ───────────────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (window.lucide) lucide.createIcons();
