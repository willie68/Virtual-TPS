call npm run build
del /s /q \\192.168.178.14\Docker\php_base\hosting\vtps\*
xcopy /s /q .\dist\* \\192.168.178.14\Docker\php_base\hosting\vtps