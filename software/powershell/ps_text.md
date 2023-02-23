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