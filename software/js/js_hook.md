### SJ_Hook
---

#### Tips

- Hook
```
(function () {
  "use strict";
  function hook(object, attr) {
    var func = object[attr];
    object[attr] = function () {
      console.log("hooked", object, attr);
      var ret = func.apply(object, arguments);
      debugger;
      return ret;
    };
  }
  hook(window, "btoa");
})();
```


https://blog.csdn.net/danmoo1/article/details/77651358


- hool1
```
function myadd(x,y){
  console.info(`[myadd][x=${x}][y=${y}][x+y=${x+y}]`);
  return x+y;
}
function hook_1(f){
  func = f;
  console.info('[hook]',arguments.length);
  var ret = func.bind(this,[...arguments]);
  return ret;
}

function g(a,b,...args){
  console.info('a',a);
  console.info('b',b);
  console.info('args',args);
}
function h(a,b,...[x,y,z]){
  console.info('a',a);
  console.info('b',b);
  console.info('x',x);
  console.info('y',y);
  console.info('z',z);
}
myadd(1,2);
g=hook_1(myadd);
g(1,2);
```