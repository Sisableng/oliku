if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const m=e=>a(e,i),r={module:{uri:i},exports:t,require:m};s[i]=Promise.all(c.map((e=>r[e]||m(e)))).then((e=>(n(...e),t)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0e5ce63c-e4138e66ca6c3a56.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/138-ecc00d8e6f7bded1.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/173-4bf1ae71101f49cd.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/183-2e5b9e83b85ee4fa.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/190-0e7f51a9e4fb5770.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/219-9516d52eab31d569.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/231-6601c498747a72a1.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/233-9b8f5096408a99ab.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/304-7439b6c07354a70b.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/331-2a33819b60167a73.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/336-d083cb18f9e4dcb0.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/418-de2569ab0610ebc4.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/555-53f9a1567d5e5065.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/568-55fdf370420b223c.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/592-e0af54c497167f26.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/615-02a42dd26c75befd.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/714-3459b8744fca69e1.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/725.512f9e27db2a6b4d.js",revision:"512f9e27db2a6b4d"},{url:"/_next/static/chunks/746-bca9c5a7f83b449e.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/754-58d13e1cf74acf0b.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/874.35cd9eed5e1e5b0f.js",revision:"35cd9eed5e1e5b0f"},{url:"/_next/static/chunks/936-1ec3b6213fc4f3e2.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/958-09719ea263a496de.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(main)/auth/error/page-ed8b434660545d4f.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(main)/auth/signin/page-04896b7ba73d193a.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(main)/auth/signup/page-5c6ab5ebb11b4970.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(main)/layout-2fe92bc03418baf4.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(main)/page-dbe1cb16c65b2e6e.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(me)/layout-07d98f46a008777b.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(me)/me/lists/%5Bid%5D/page-92766b185e1ad55e.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(me)/me/lists/create/page-06923a5a0b9566bc.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(me)/me/lists/update/%5Bid%5D/page-96f31d9351cae707.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(me)/me/page-78dc7eec3747c2eb.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(me)/me/profile/page-af19e3984b3e7225.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(me)/me/profile/security/page-ad06e955165a2f5b.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/(me)/me/who/%5Bid%5D/page-6deba66af1d33d02.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/app/_not-found/page-a5a30a60557a5665.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/fd9d1056-360e5dd5b3902a99.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/main-24fe374244ddebf3.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/main-app-9f6d4c321f69c120.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/pages/_error-b65fa04f376fbce8.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-a849af7bac736df9.js",revision:"pVmmsJ4JDsPvcmHQy1ykI"},{url:"/_next/static/css/7d574a2e261229d1.css",revision:"7d574a2e261229d1"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/pVmmsJ4JDsPvcmHQy1ykI/_buildManifest.js",revision:"d652afdca704baf2011c3538bf2d1835"},{url:"/_next/static/pVmmsJ4JDsPvcmHQy1ykI/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/assets/android-chrome-180x180.png",revision:"f6f79d24ac0261c4f3c546e2f7ff0476"},{url:"/assets/android-chrome-192x192.png",revision:"e700e6b3ab241d163133f08e45edc1e2"},{url:"/assets/android-chrome-512x512.png",revision:"10da7db356cc860740dca732d83ee315"},{url:"/assets/apple-icon.png",revision:"c63a5fd8df7e572f7d519cf4107d8482"},{url:"/assets/bg.svg",revision:"bec9304e380858d32ab33936898bad2b"},{url:"/assets/favicon-16x16.png",revision:"130d0ff855d2fd0bf4e38fc868637ddd"},{url:"/assets/favicon-32x32.png",revision:"1168c5acf514c5af3c55bb4aefb3dfbd"},{url:"/assets/favicon.ico",revision:"d781c874ae9f6c4e49899add7db4d1fa"},{url:"/assets/shortcut-icon.png",revision:"456863c00fc1a07ca85fec8265910680"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
