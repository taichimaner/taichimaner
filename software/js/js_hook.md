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