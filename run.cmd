@echo OFF
title MEE69 Bot Admin Panel
cls
color 0B
prompt Admin$S$B$SMEE69$SBot$S$G
IF "%1"=="--no-compile" (
    tsc
    cd dist
    node index
) ELSE (
IF EXIST dist\NUL (
    cd dist
    node index
) ELSE (
    tsc
    cd dist
    node index
)
)