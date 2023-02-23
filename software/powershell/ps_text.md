### Powershell-text
---

#### 練習 讀取檔案內容

```
Get-Content -path D:OfficeGuidedemo.txt
Get-Content -path D:OfficeGuidedemo.txt -Raw
(Get-Content -path D:OfficeGuidedemo.txt -Raw) -replace 'PowerShell','SuperShell'

((Get-Content -path D:OfficeGuidedemo.txt -Raw) -replace 'PowerShell','SuperShell') |
  Set-Content -Path D:OfficeGuidedemo_replace.txt

```

#### 練習 讀取指定目錄所有的檔案內容

```
Get-ChildItem D:OfficeGuide*.txt |
  Foreach-Object {
    Get-Content $_
  }
```

#### 練習 取代所有文字檔中的文字

```
Get-ChildItem D:OfficeGuide*.txt |
  Foreach-Object {
    ((Get-Content -path $_ -Raw) -replace 'PowerShell','SuperShell') |
      Set-Content -Path ($_ -replace '.txt$','_replace.txt')
  }
```

#### 練習  
```
Get-ChildItem -path ./text.txt | ForEach-Object {
    $url = "$($_.name).ok"
    $url
    copy "$($_.name)" $url
    (get-content $_.fullname) -replace '=',' === ' | Set-content $_.fullname
}
```

#### 練習  
```
Get-ChildItem -path .\config -recurse -force | where {$_.fullname -match '_(src|doc)\\\.got\config'} | ForEach-Object {
    $fn = "$($_.fullname)"
    $fnbk = "$($_.fullname).bk"
    $new_str = 'https://XXXXX/scm/'
    $ismatch = (get-content $fn) | where {$_ -match $old_str}
    if($ismatch){
        write-output '[old_str]:${old_str}`r`n[new_str]:${new_str}`r`nmatch:$($fn)'
        copy $fn $fnbk
        write-output "    [1]backup done. ${fnbk}"
        (get-content $fn) -replace $old_str,$new_str | Set-content $fn
        write-output "    [2]update done"
    }else{
        write-output '...no match $($fn)'
    }
}
```

#### 練習  
```
Get-ChildItem -path ./*.txt -recurse -force | where {$_.fullname -match 'txt'} | ForEach-Object {
    $fn = $_.fullname
    $fnbk = "$($fn).bk"
    write-output $fnbk
}
```

#### 練習  
```
PS> $string = 'The last logged on user was CONTOSO\jsmith'
PS> $string -match 'was (?<domain>.+)\\(?<user>.+)'
True

PS> $Matches

Name                           Value
----                           -----
domain                         CONTOSO
user                           jsmith
0                              was CONTOSO\jsmith

PS> $Matches.domain
CONTOSO

PS> $Matches.user
jsmith


$log = (Get-WinEvent -LogName Security -MaxEvents 1).message
$r = '(?s).*Account Name:\s*(?<N>.*).*Account Domain:\s*(?<D>[A-Z,0-9]*)'
$log -match $r


'John D. Smith' -replace '(\w+) (\w+)\. (\w+)', '$1.$2.$3@contoso.com'
'CONTOSO\Administrator' -replace '\w+\\(?<user>\w+)', 'FABRIKAM\${user}'
'Gobble' -replace 'Gobble', '$& $&'
'Hello World' -replace '(\w+) \w+', '$1 Universe'
"Hello World" -replace "(\w+) \w+", "`$1 Universe"
'5.72' -replace '(.+)', '$$$1'
"5.72" -replace "(.+)", "`$`$`$1"




get-childitem -path . -recurse

try {
    # 主要程式邏輯
}
catch {
    Write-Output $Error[0]
    ConvertTo-Json $Error | Out-File -FilePath C:\Users\poychang\Desktop\log.json
}

try {
    # 主要程式邏輯
}
catch [System.NotSupportedException] {
    Write-Output "不支援"
}
catch [System.IO.DirectoryNotFoundException] {
    Write-Output "找不到資料夾"
}
catch {
    Write-Output "通用的例外處理"
}
```