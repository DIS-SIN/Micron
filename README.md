# This is Your Project Title

This is some text you can fill out .

**Acknowledgements**

Thank who you need to
This README.md was created using [dillinger.io]

# General Development Information

* Important content

Description details

# Getting it Running
Here's an example of what this section can look like, borrowed from [Cory Dignard's](https://github.com/corydignard) README from his projects.

* Download the following installations files
  * Anaconda 5.3.1 Python 3.7 version - https://www.anaconda.com/download/
  * R 3.5.1 - https://cran.rstudio.com/bin/windows/base/
  * RStudio Desktop 1.1.463 - https://www.rstudio.com/products/rstudio/download/#download\
  * Power BI Desktop - (Microsoft Store) https://powerbi.microsoft.com/en-us/get-started/
  * SQLite 3.26.0, Documentation and Tools - https://www.sqlite.org/index.html
  * SQLite Studio (installer) 3.2.1 - https://sqlitestudio.pl/index.rvt?act=download
  * Chrome - https://www.google.com/chrome/
  * Slack Desktop - https://slack.com/downloads/windows
  * Github Desktop - https://desktop.github.com/
* Download and copy files to C:\DigitalAcademy\InstallFiles
* Open Powershell prompt as administrator
* Set Powershell execution policy to Unrestricted


```sh
Set-ExecutionPolicy Unrestricted
select [A] Yes to All 
```
* Install PSLogging
```sh
Install-Module PSLogging
select [A] Yes to All
```
* Launch installation script
```sh
C:\DigitalAcademy\InstallFiles\DigitalAcademy-Installation.ps1 -InstallFiles "c:\DigitalAcademy\InstallFiles"
```
* Restart workstation once complete
* Open Powershell prompt as administrator
* Configure Anaconda
```sh
C:\DigitalAcademy\InstallFiles\DigitalAcademy-ConfigAnaconda.ps1 -InstallFiles"c:\DigitalAcademy\InstallFiles"
```
* Restart workstation once complete
* DONE!

[dillinger.io]: <https://dillinger.io/>
[9to5IT/PS_Script_Template_V2_Logs.ps1]: <https://gist.github.com/9to5IT/d81802b28cfd10ab5d89>
