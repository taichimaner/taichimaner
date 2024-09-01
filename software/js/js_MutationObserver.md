### MutationObserver
---

#### Tips

- 基本
```
const observer = new MutationObserver(function (mutations) {
  console.log(mutations);
});

const div = document.querySelector("div");
observer.observe(div, {
  childList: true,
  attributes: true,
  characterData: true,
});

observer.disconnect();
```

