"use client";

import { useEffect, useRef } from "react";
import { isLight, onThemeChange, prefersReducedMotion } from "@/lib/theme";

/* ─────────────────────────────────────────────────────────
   WAVE — animated dot-grid backdrop (Three.js) behind the
   Contact section, the page's closing showcase. Reading
   sections stay on plain pearl, per the design system.
   Three is code-split and only fetched once this mounts; it
   renders only while onscreen and the tab is visible, and is
   skipped entirely when the visitor prefers reduced motion.
   ───────────────────────────────────────────────────────── */

const DOT = { dark: 0x7db4ff, light: 0x3488ff };
// dots need more presence against a light page than a black one
const ALPHA = { dark: 0.55, light: 0.5 };

export default function SiteWave() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let teardown = () => {};

    import("three").then((THREE) => {
      if (cancelled) return;
      // the shaders write raw sRGB hex values; keep three from linearising them
      THREE.ColorManagement.enabled = false;

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
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
      const theme = isLight() ? "light" : "dark";
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(DOT[theme]) },
          alpha: { value: ALPHA[theme] },
        },
        vertexShader: "attribute float scale;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=scale*(200.0/-mv.z);gl_Position=projectionMatrix*mv;}",
        fragmentShader: "uniform vec3 color;uniform float alpha;void main(){if(length(gl_PointCoord-vec2(0.5))>0.475)discard;gl_FragColor=vec4(color,alpha);}",
        transparent: true,
      });
      const unsubscribe = onThemeChange((light) => {
        mat.uniforms.color.value.setHex(light ? DOT.light : DOT.dark);
        mat.uniforms.alpha.value = light ? ALPHA.light : ALPHA.dark;
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      let count = 0;
      let raf = 0;
      let running = false;
      const render = () => {
        if (running) raf = requestAnimationFrame(render);
        const pos = geo.attributes.position.array as Float32Array;
        const sc = geo.attributes.scale.array as Float32Array;
        let p = 0, s = 0;
        for (let ix = 0; ix < AX; ix++) {
          for (let iy = 0; iy < AY; iy++) {
            pos[p + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
            sc[s] = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
            p += 3; s++;
          }
        }
        geo.attributes.position.needsUpdate = true;
        geo.attributes.scale.needsUpdate = true;
        renderer.render(scene, camera);
        count += 0.04;
      };

      // animate only while it can be seen
      let onscreen = false;
      const sync = () => {
        const should = onscreen && !document.hidden;
        if (should && !running) { running = true; render(); }
        else if (!should && running) { running = false; cancelAnimationFrame(raf); }
      };
      const io = new IntersectionObserver(([entry]) => { onscreen = entry.isIntersecting; sync(); });
      io.observe(container);
      document.addEventListener("visibilitychange", sync);

      const onResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", onResize);

      teardown = () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        document.removeEventListener("visibilitychange", sync);
        window.removeEventListener("resize", onResize);
        unsubscribe();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  return <div ref={ref} id="site-wave" aria-hidden="true"></div>;
}
