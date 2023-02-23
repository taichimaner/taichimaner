### AutoHotkey
---
#### 前置作業

- [DOCS_v2](https://www.autohotkey.com/docs/v2/)
- [ZIP_V2](https://www.autohotkey.com/download/2.0/)

- 指定ahk的檔案關聯

---
#### 基本語法

- Values
  - Strings
  - Numbers
  - Boolean
  - Nothing
  - Objects
  - Object Protocol
- Variables
- Functions
  - Methods
- Control Flow

---
#### 環境變數
```
path := EnvGet("PATH")
```

#### reload 腳本
```
!x::reload
```

#### 執行程式
```
!z::
{
  ;run "notepad d:\aaa.txt"
  ;run "notepad `"d:\aa bb\aaa.txt`""
  ;run 'notepad "d:\aa bb\aaa.txt"'
  run A_ComSpec ;cmd.exe
  run A_MyDocuments 
  run Format('notepad.exe "{1}\tmp.xls"',A_MyDocuments)
  run "cmd","c:\"
}
```

#### 執行程式取得pid
```
!z::
{
  Run "notepad",,, &pid
  WinWaitActive "ahk_pid " pid
  SendText "Hello, world!"
}
```

#### 找程式
```
if (not WinExist("ahk_class Notepad"))
{
    Run "Notepad"
    WinWait "ahk_class Notepad"
}
else
    WinActivate "ahk_class Notepad"
Send "Hello, world{!}"
```
#### 練習 Format
```
!z::
{
  msg := "a=" A_ScreenWidth
  msg := Format("{1}{2}",msg,"b=" A_AhkVersion)
  msgbox msg
}
```


#### 練習 Send
```
!z::
{
  send "Hello{!}{Left}^+{Left}"
  sendtext "Hello~211"
   a :="
   (Join`s
       aa
       bb
       cc
   )"
   Send a
}

}
```

#### 練習 Loop
```
!z::
{
   data := "A11`tA12`nB11`tB12`nC11`tC12"
   Loop Parse data, "`n"
   {
       row_data := A_LoopField
       row_i := A_Index  ;
       Loop Parse row_data, "`t"
       {
           MsgBox row_i ":" A_Index " = " A_LoopField
       }
   }
}
```


#### 練習 Func
```
alert(x) ;函數名稱與(不可有空白
{
    msgbox "Hello," x
}
!z::
{
    alert("xxx")
    alert2() => Msgbox("yyy")
    alert2
}
```

#### 練習 fat arrow expression
```
!z::
{
    msgbox "start"
    SetTimer ()=> Msgbox("Hello"),-1000
}
```

#### 練習 Dynamic Variables
```
!z::
{
    a1 := 100
    a2 := "a1"
    msgbox "a1=" a1 ",a2=" a2 "`n%a2%=" %a2%
    color := {}
    for n,item in ["RED","GREEN","BLUE"]
    {
        color.%item% := Random(0,255)
    }
    msgbox color.RED "," color.GREEN "," COLOR.BLUE
}
```

#### 練習 Pseudo-arrays
```
!z::
{
    a1 := "AAA"
    a2 := "BBB"
    a3 := "CCC"
    loop 3
        msgbox a%A_Index%
}
```


#### Hotif
```
#HotIf WinActive("ahk_class Notepad")
^a::MsgBox "in notepad"

#HotIf
^a::MsgBox "not in notepad"

#HotIf GetKeyState("Ctrl")
Space & CapsLock::
CapsLock & Space::MsgBox "Success!"
```

#### 問題
```
- 差別 ahk_class ahk_exe ahk_pid
- 差別 WinActive WinExist
```

#### 整理中
```
其他的修饰符是:

*(通配符) 允许热键激活, 即使你按住的修饰键不在热键符号中.
~(非抑制) 防止热键阻塞该键的原生功能.
$(使用钩子) 防止在发送按键时出现无意义的循环, 并且在某些情况下使热键更可靠.
要使热键只在释放键时触发, 而不是在按下键时触发, 请使用 UP 后缀.

#HotIf 指令可以用来指定激活热键必须满足的条件, 如:

当您按下热键时, 某个特定应用程序的窗口处于活动状态.
如果按下热键时, CapsLock 是打开的.
可以用代码检测的任何其他条件.
```

#### 內建變數

```
A_ScreenWidth
A_AhkVersion
A_PtrSize
A_ScriptFullPath
```