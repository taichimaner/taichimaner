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
 
- worker練習(woker call worker)
```
// @require     file://D:\myworker11.js
console.info('=====start====');
console.info('code1',code1);
console.info('code11',code11);
const worker = new Worker(createBlobObjectURL(code1));
console.info('worker',worker);
worker.postMessage({'wname':'WORKA','act':'Y','bcode11':createBlobObjectURL(code11)});
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
- myworker11.js
```
const code1 = `(function () {
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
      const {bcode11} = event.data;
      console.info('=bcode11',bcode11);
      if('Y' != act){
        console.info('[關閉WORKER]',event.data);
        self.close();
      }
      const worker2 = new Worker(bcode11);
      console.info('worker2',worker2);
      worker2.postMessage({'wname':'WORKA','act':'Y'});
      //throw new Error('====this is errorrrrrr=====');
      //delayf(5000,event.data);
      //printlog(event.data);
      self.postMessage('===[worker][postMessage]');
  }
  self.onerror = function(event){
    console.info('[worker][onerror]',event);
    console.info('#關閉WORKER#[因為ERROR]',event);
    self.close();
  }
})();`;

const code11 = `(function () {
  function printlog(msg){
    console.info('printlog',msg);
  };
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
  self.onmessage = function (event){
      console.log('[worker2][onmessage]',event.data);
      delayf(5000,event.data);
      self.postMessage('===[worker2][postMessage]');
      self.close();
  }
  self.onerror = function(event){
    console.info('[worker][onerror]',event);
    console.info('#關閉WORKER2#[因為ERROR]',event);
    self.close();
  }
})();`;

const createBlobObjectURL = (item) => {
  const blob = new Blob([`${item}`], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  return url;
};
```
