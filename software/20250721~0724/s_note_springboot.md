### Day1(0721)
#### 安裝
- 下載JDK
  - https://learn.microsoft.com/zh-tw/java/openjdk/download
- 下載Intellj
  - IntelliJ IDEA Community Edition
  - 調整VM大小，%AppData%
    - ```
     -Xms8192m
     -Xmx8192m
      ```
- 下載 Visual VM 2.22
  - 安裝plugin Visual GC

#### demo1
- 到 https://start.spring.io/ 進行設定
  - Project = Maven
  - Language = Java
  - Spring Boot = 3.5.3
  - Project Metadata，JAVA = 17
  - Dependencies = web、thymeleaf、validation、lombok、actuator、devtools
  - 專案設定為 demo1
  - GENERATE 會產生demo1.zip，下載後解壓縮到 桌面\labs\demo1
    
