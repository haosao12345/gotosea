# GitHub 提交指南

本文档提供了如何使用 `git_push.bat` 脚本将 WebStack 导航网站项目提交到 GitHub 的详细说明。

## 前提条件

1. 已安装 Git 并添加到系统 PATH 中
2. 已在 GitHub 上创建一个空仓库
3. 已配置 Git 用户名和邮箱（如果是首次使用）

## 认证方式选择

脚本支持两种 GitHub 认证方式：

### HTTPS 方式
- 使用用户名和个人访问令牌(PAT)认证
- 仓库URL格式：`https://github.com/用户名/仓库名.git`
- 优势：设置简单，防火墙友好
- 缺点：每次推送都需要输入认证信息

### SSH 方式
- 使用SSH密钥认证，推送无需密码
- 仓库URL格式：`git@github.com:用户名/仓库名.git`
- 优势：无需重复输入密码，更安全便捷
- 缺点：需要额外设置SSH密钥

## 使用方法

### 步骤 1: 配置 Git（如果是首次使用）

如果你是首次使用 Git，需要先配置用户名和邮箱。打开命令提示符或 PowerShell，运行：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱地址"
```

### 步骤 2: 运行脚本

1. 在项目根目录下找到 `git_push.bat` 文件
2. 双击运行该脚本
3. 选择认证方式（HTTPS或SSH）
4. 按照提示输入相关信息

### 如果选择SSH方式

如果你选择SSH方式且尚未设置SSH密钥，脚本将：

1. 提示你生成SSH密钥
2. 显示生成的公钥，你需要将其添加到GitHub账户：
   - 登录GitHub
   - 进入Settings -> SSH and GPG keys -> New SSH key
   - 粘贴公钥并保存

### 脚本会要求你输入：

- **认证方式**：选择HTTPS或SSH
- **GitHub 仓库 URL**：根据选择的认证方式提供正确格式的URL
- **提交信息**：描述此次提交的内容，默认为 "初始提交 - WebStack导航网站"
- **分支选择**：选择 `main` 或 `master` 分支（GitHub 现在默认使用 `main`）

### 步骤 3: 处理可能的错误

如果脚本执行过程中遇到问题，会显示相关错误信息并提供解决建议。常见问题包括：

- **Git 未安装**：确保已正确安装 Git 并添加到系统 PATH
- **未配置 Git 用户信息**：按照提示配置用户名和邮箱
- **认证失败**：
  - HTTPS：确保使用正确的用户名和个人访问令牌(PAT)
  - SSH：确保SSH密钥已正确添加到GitHub账户
- **推送冲突**：如果远程仓库已有内容，脚本会询问是否强制推送

## HTTPS与SSH方式对比

| 特性 | HTTPS | SSH |
|------|-------|-----|
| 认证方式 | 用户名 + PAT | SSH密钥 |
| 每次推送认证 | 需要 | 不需要 |
| 设置复杂度 | 简单 | 中等 |
| 防火墙友好度 | 高 | 中等 |
| 安全性 | 中等 | 高 |
| 便捷性 | 中等 | 高 |

## 注意事项

- **个人访问令牌(PAT)**：如果使用HTTPS方式，请在GitHub创建PAT替代密码
  - GitHub不再支持使用密码认证
  - 创建PAT：GitHub Settings -> Developer settings -> Personal access tokens
  
- **SSH密钥**：使用SSH方式时，确保已将公钥添加到GitHub账户
  - 测试SSH连接：`ssh -T git@github.com`

- **强制推送**：使用强制推送 (`-f`) 会覆盖远程仓库中的内容，请谨慎使用

## 手动提交步骤（如脚本失败）

### HTTPS方式

```bash
git init
git add .
git commit -m "初始提交 - WebStack导航网站"
git remote add origin https://github.com/用户名/仓库名.git
git push -u origin main
```

### SSH方式

```bash
git init
git add .
git commit -m "初始提交 - WebStack导航网站"
git remote add origin git@github.com:用户名/仓库名.git
git push -u origin main
```

## 问题排查

- **权限问题**：确保你有权限访问目标仓库
- **网络问题**：检查网络连接，确保可以访问 GitHub
- **身份验证失败**：使用正确的凭据，或考虑使用个人访问令牌 (PAT) 