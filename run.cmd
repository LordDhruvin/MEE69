@echo OFF
title Mage Bot Admin Panel
cls
color 0B
prompt Admin$S$B$SMage$SBot$S$G
IF "%1"=="--no-compile" (
    tsc
    cd Mage
    node index
) ELSE (
IF EXIST Mage\NUL (
    cd Mage
    node index
) ELSE (
    tsc
    cd Mage
    node index
)
)