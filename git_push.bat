@echo off
chcp 65001 >nul
echo WebStack导航网站 - GitHub提交脚本
echo ===================================
echo.

REM 检查Git是否已安装
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo 错误: 未找到Git，请确保Git已安装并添加到系统PATH中。
    pause
    exit /b 1
)

REM 设置默认分支名
set BRANCH_NAME=main

REM 让用户选择认证方式
echo 请选择GitHub认证方式:
echo 1. HTTPS方式 (需要用户名和令牌/密码)
echo 2. SSH方式 (使用SSH密钥，无需密码)
echo.
set /p AUTH_METHOD=请输入选择 (1 或 2，默认为 1): 
if "%AUTH_METHOD%"=="" set AUTH_METHOD=1

REM 根据用户选择设置提示信息
if "%AUTH_METHOD%"=="1" (
    set URL_FORMAT=https://github.com/haosao12345/gotosea.git
    set METHOD_NAME=HTTPS
) else (
    set URL_FORMAT=git@github.com:haosao12345/gotosea.git
    set METHOD_NAME=SSH
    
    REM 检查SSH密钥是否存在
    if not exist "%USERPROFILE%\.ssh\id_rsa.pub" (
        echo.
        echo 警告: 未检测到SSH公钥。
        echo 如果尚未设置SSH密钥，推送可能会失败。
        echo 想要生成SSH密钥吗?
        set /p GEN_SSH=是否生成SSH密钥 (y/n，默认为 y): 
        if not "%GEN_SSH%"=="n" (
            echo.
            echo 正在生成SSH密钥...
            set /p SSH_EMAIL=请输入您的邮箱地址: 
            ssh-keygen -t rsa -b 4096 -C "%SSH_EMAIL%"
            
            echo.
            echo SSH密钥已生成。请将以下公钥添加到您的GitHub账户:
            echo.
            type "%USERPROFILE%\.ssh\id_rsa.pub"
            echo.
            echo 将上面的密钥复制到GitHub (Settings -^> SSH and GPG keys -^> New SSH key)
            echo 完成后按任意键继续...
            pause >nul
        )
    )
)

REM 提示用户输入仓库信息
echo.
echo 请输入GitHub仓库信息 (%METHOD_NAME%方式):
set /p REPO_URL=请输入GitHub仓库URL (例如: %URL_FORMAT%): 
if "%REPO_URL%"=="" (
    echo 错误: 未提供GitHub仓库URL。
    pause
    exit /b 1
)

set /p COMMIT_MSG=请输入提交信息 (默认: "初始提交 - 导航网站"): 
if "%COMMIT_MSG%"=="" set COMMIT_MSG=初始提交 - 导航网站

echo.
set /p BRANCH_CHOICE=请选择分支名 (1=main [默认], 2=master): 
if "%BRANCH_CHOICE%"=="2" set BRANCH_NAME=master

echo.
echo 1. 初始化Git仓库...
if exist .git (
    echo Git仓库已存在，跳过初始化步骤。
) else (
    git init
    if %ERRORLEVEL% neq 0 (
        echo 错误: Git初始化失败。
        pause
        exit /b 1
    )
)

echo.
echo 2. 添加所有文件到暂存区...
git add .
if %ERRORLEVEL% neq 0 (
    echo 错误: 添加文件失败。
    pause
    exit /b 1
)

echo.
echo 3. 提交更改...
git commit -m "%COMMIT_MSG%"
if %ERRORLEVEL% neq 0 (
    echo 错误: 提交更改失败。
    echo 提示: 如果这是第一次使用Git，请确保已配置用户名和邮箱：
    echo git config --global user.name "haosao12345"
    echo git config --global user.email "644238567@qq.com"
    pause
    exit /b 1
)

echo.
echo 4. 检查远程仓库...
git remote -v | findstr "origin" >nul
if %ERRORLEVEL% equ 0 (
    echo 远程仓库已存在，更新URL...
    git remote set-url origin %REPO_URL%
) else (
    echo 添加远程仓库...
    git remote add origin %REPO_URL%
)
if %ERRORLEVEL% neq 0 (
    echo 错误: 设置远程仓库失败。
    pause
    exit /b 1
)

echo.
echo 5. 推送到GitHub...
git push -u origin %BRANCH_NAME%
if %ERRORLEVEL% neq 0 (
    echo.
    echo 推送失败。可能的原因:
    if "%AUTH_METHOD%"=="1" (
        echo - HTTPS认证: 请确保输入了正确的GitHub用户名和个人访问令牌(PAT)
        echo - 如果您使用的是密码，请注意GitHub已不再支持密码认证
        echo - 创建个人访问令牌: https://github.com/settings/tokens
    ) else (
        echo - SSH认证: 请确保SSH密钥已配置并添加到GitHub账户
        echo - 测试SSH连接: ssh -T git@github.com
    )
    
    echo.
    echo 是否尝试其他解决方案?
    echo 1. 强制推送 (警告: 这将覆盖远程仓库中的内容)
    echo 2. 取消操作
    set /p PUSH_CHOICE=请选择 (1 或 2，默认为 2): 
    
    if "%PUSH_CHOICE%"=="1" (
        echo 尝试强制推送...
        git push -f -u origin %BRANCH_NAME%
    ) else (
        echo 推送操作已取消。
        pause
        exit /b 1
    )
)

echo.
echo 完成！项目已成功推送到GitHub。
echo 认证方式: %METHOD_NAME%
echo 仓库URL: %REPO_URL%
echo 分支: %BRANCH_NAME%

pause 