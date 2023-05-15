### Vue
---
#### 安裝

- npm create vite@latest



#### vue tips

- https://mokkapps.de/vue-tips/force-enable-vue-devtools-in-production-build/
   - const app = Array.from(document.querySelectorAll('*')).find((e) => e.__vue_app__).__vue_app__
   - window.__VUE_DEVTOOLS_GLOBAL_HOOK__
- https://www.damianmullins.com/inspecting-a-vue-application-in-production/
   - document.querySelector('[data-v-763db97b]').__vue__