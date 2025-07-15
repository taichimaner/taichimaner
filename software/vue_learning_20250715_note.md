
## Reactivity and Render Cycle

```mermaid
graph LR;
Vue((Vue<br>reactive<br>X<br>Y))<-->HTML[HTML<br>elementX<br>elementY];
HTML<--DOM-->vdom["vdom(virtual dom)"];
```
