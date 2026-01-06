import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CRtFl3E6.mjs';
import { manifest } from './manifest_p-mBzq8E.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/contact.astro.mjs');
const _page2 = () => import('./pages/ar/process.astro.mjs');
const _page3 = () => import('./pages/ar/projects/materials/_id_.astro.mjs');
const _page4 = () => import('./pages/ar/projects/materials.astro.mjs');
const _page5 = () => import('./pages/ar/projects/_slug_.astro.mjs');
const _page6 = () => import('./pages/ar/projects.astro.mjs');
const _page7 = () => import('./pages/ar.astro.mjs');
const _page8 = () => import('./pages/process.astro.mjs');
const _page9 = () => import('./pages/projects/materials/_id_.astro.mjs');
const _page10 = () => import('./pages/projects/materials.astro.mjs');
const _page11 = () => import('./pages/projects/_slug_.astro.mjs');
const _page12 = () => import('./pages/projects.astro.mjs');
const _page13 = () => import('./pages/th/process.astro.mjs');
const _page14 = () => import('./pages/th/projects/materials/_id_.astro.mjs');
const _page15 = () => import('./pages/th/projects/materials.astro.mjs');
const _page16 = () => import('./pages/th/projects/_slug_.astro.mjs');
const _page17 = () => import('./pages/th/projects.astro.mjs');
const _page18 = () => import('./pages/th.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/contact.ts", _page1],
    ["src/pages/ar/process.astro", _page2],
    ["src/pages/ar/projects/materials/[id].astro", _page3],
    ["src/pages/ar/projects/materials.astro", _page4],
    ["src/pages/ar/projects/[slug].astro", _page5],
    ["src/pages/ar/projects/index.astro", _page6],
    ["src/pages/ar/index.astro", _page7],
    ["src/pages/process.astro", _page8],
    ["src/pages/projects/materials/[id].astro", _page9],
    ["src/pages/projects/materials.astro", _page10],
    ["src/pages/projects/[slug].astro", _page11],
    ["src/pages/projects/index.astro", _page12],
    ["src/pages/th/process.astro", _page13],
    ["src/pages/th/projects/materials/[id].astro", _page14],
    ["src/pages/th/projects/materials.astro", _page15],
    ["src/pages/th/projects/[slug].astro", _page16],
    ["src/pages/th/projects/index.astro", _page17],
    ["src/pages/th/index.astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "46dd508f-6889-40c8-9755-2f2414492109",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
