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
- 使用 Intellj 的 open file 開啟路徑 demo1 (POM.XML所在的路徑)
  - plugin，安裝 lombok
    - anno tation 會在原本 .java 經過compiler 變成 .class時，加上 anno tation 的部分，最後產出 .jar(或war、ear)
  - settings:找 annotation processors，enabled
- 到 project 按F4，設定JDK = 17
- 確認 Build Tools > MVN　的JDK=17
- Build 專案 (ctrl+F9)
- 就可以看到 src > main > java > Demo Apllication > RUN
- 到 localhost:8080
- 到 http://localhost:8080/actuator
- File > Invalid Caches ---當資料很亂的時候，按這個清除Cache
- src/main/java :這是Program
- src/test/java :這是Junit，上到PROD就不會有這個
- ```
  Intellj 的teminal中，setting 新增 c:\windows\system32\cmd
  mvnw dependency:tree
  mvnw spring-boot:run
  mvnw package ---產生JAR到 target資料夾
  java -jar demo1-0.0.1-SNAPSHOT.jar ---可以run程式
  mvnw clean ---清除target資料夾內，避免移轉時太肥
  若用ps執行也可以， .\mvnw package
  ```
- https://maven.apache.org/surefire/maven-surefire-plugin/
- https://docs.junit.org/current/user-guide/
