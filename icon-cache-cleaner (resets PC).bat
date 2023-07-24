@echo off
ie4uinit.exe -ClearIconCache
taskkill /IM explorer.exe /F
del /f "%localappdata%\IconCache_old.db" >nul 2>&1
move /y "%localappdata%\IconCache.db" "%localappdata%\IconCache_old.db"
cd "%localappdata%\Microsoft\Windows\Explorer\"
rmdir /q /s temp
mkdir temp
move /y "%localappdata%\Microsoft\Windows\Explorer\iconcache*" temp
echo "The system will now reboot. SAVE ALL WORK if you have not done so, then press Enter to continue."
pause
shutdown /r /t 0
echo L