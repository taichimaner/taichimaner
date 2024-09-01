### Worker
---

#### Tips

- worker練習
```
console.info('=====start====');
const code = `(function () {
  function delayf(ms,src){
    const currentTime = new Date().getTime();
    let i = 0;
    while(currentTime + ms >= new Date().getTime()){
      i++;
      if(i%10000000 == 0){
        console.info('           rows processed:' + i,src);
      }
    }
  };
  function printlog(msg){
    console.info('printlog',msg);
  };
  self.onmessage = function (event){
      console.log('[worker][onmessage]',event.data);
      const {wname} = event.data;
      const {act} = event.data;
      if('Y' != act){
        console.info('[關閉WORKER]',event.data);
        self.close();
      }
      //throw new Error('====this is errorrrrrr=====');
      delayf(5000,event.data);
      //printlog(event.data);
      self.postMessage('===[worker][postMessage]');
  }
  self.onerror = function(event){
    console.info('[worker][onerror]',event);
    console.info('#關閉WORKER#[因為ERROR]',event);
    self.close();
  }
})();`;

const createBlobObjectURL = (code) => {
  const blob = new Blob([`${code}`], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  return url;
};

const worker = new Worker(createBlobObjectURL(code));
worker.postMessage({'wname':'WORKA','act':'Y'});
worker.postMessage({'wname':'WORKB','act':'Y'});
worker.postMessage({'wname':'WORKC','act':'Y'});
worker.postMessage({'wname':'WORKZ','act':'N'});
worker.onmessage = function (event) {
    console.log('===[main][onmessage]',event.data)
};
worker.onerror = function (event){
    console.info('===[main][onerror]',event.message);
};
worker.onmessageerror = function (event){
    console.info('===[main][onmessageerror]',event.message);
};
console.info('=====end====');
// worker.terminate();
```
 