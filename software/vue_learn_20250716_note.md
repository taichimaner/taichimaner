## 使用 vue-cli 的開發環境

### webpack方式
- ```
  vue create lab12_webpack
  cd lab12_webpack
  npm run serve
  ctrl+c
  code .
  ```
- 調整 jsconfig.js
  ```
  "include":["./src/**/*"]
  ```
- 重新改寫 App.vue，可使用 vbase 快速建立vue template
- 幾種CSS套件
  - tailwind
  - shadcn
  - material
  - vuetify
  - 
### vite方式
- ```
  npm init vue
  npm install
  npm run dev
  ```

### 介紹版控
- https://git-scm.com/book/zh-tw/v2/%E9%96%8B%E5%A7%8B-%E5%88%9D%E6%AC%A1%E8%A8%AD%E5%AE%9A-Git
- 在github上新增一個repo
- 將本機的專案push
- ```
  git config --global user.name "YOUR_NAME"
  git config --global user.email YOUR_EMAIL
  more c:\Users\Admin\.gitconfig
  https://github.com/login
  git remote add origin https://github.com/<account>/<project>.git
  git push -u origin master

  git status
  git log
  ```

