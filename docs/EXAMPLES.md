# Command Dock - 使用示例

本文档提供了 Command Dock 扩展的实用配置示例，帮助您快速上手。

## 前端开发工作流

### React/Vue 项目

```json
{
  "customButton.buttons": [
    {
      "id": "dev-server",
      "name": "🚀 Dev Server",
      "command": "npm run dev",
      "icon": "play",
      "color": "#00ff00"
    },
    {
      "id": "build-project",
      "name": "🔨 Build",
      "command": "npm run build",
      "icon": "gear",
      "color": "#0000ff"
    },
    {
      "id": "run-tests",
      "name": "🧪 Test",
      "command": "npm test",
      "icon": "beaker",
      "color": "#ffff00"
    },
    {
      "id": "lint-code",
      "name": "🔍 Lint",
      "command": "npm run lint",
      "icon": "search",
      "color": "#ff00ff"
    },
    {
      "id": "install-deps",
      "name": "📦 Install",
      "command": "npm install",
      "icon": "package",
      "color": "#ffa500"
    }
  ]
}
```

### Next.js 项目

```json
{
  "customButton.buttons": [
    {
      "id": "nextjs-dev",
      "name": "⚡ Next Dev",
      "command": "npm run dev",
      "icon": "zap"
    },
    {
      "id": "nextjs-build",
      "name": "🏗️ Next Build",
      "command": "npm run build",
      "icon": "tools"
    },
    {
      "id": "nextjs-start",
      "name": "🚀 Next Start",
      "command": "npm start",
      "icon": "rocket"
    },
    {
      "id": "type-check",
      "name": "📝 Type Check",
      "command": "npm run type-check",
      "icon": "check"
    }
  ]
}
```

## 后端开发工作流

### Node.js/Express 项目

```json
{
  "customButton.buttons": [
    {
      "id": "node-dev",
      "name": "🔥 Nodemon",
      "command": "npm run dev",
      "icon": "flame"
    },
    {
      "id": "node-start",
      "name": "🚀 Start",
      "command": "npm start",
      "icon": "play"
    },
    {
      "id": "run-migrations",
      "name": "🗄️ Migrate",
      "command": "npm run migrate",
      "icon": "database"
    },
    {
      "id": "seed-db",
      "name": "🌱 Seed",
      "command": "npm run seed",
      "icon": "symbol-property"
    }
  ]
}
```

### Python/Django 项目

```json
{
  "customButton.buttons": [
    {
      "id": "django-runserver",
      "name": "🐍 Django Server",
      "command": "python manage.py runserver",
      "icon": "server-process"
    },
    {
      "id": "django-migrate",
      "name": "🗄️ Migrate",
      "command": "python manage.py migrate",
      "icon": "database"
    },
    {
      "id": "django-shell",
      "name": "🐚 Django Shell",
      "command": "python manage.py shell",
      "icon": "terminal"
    },
    {
      "id": "run-tests",
      "name": "🧪 Test",
      "command": "python manage.py test",
      "icon": "beaker"
    }
  ]
}
```

## Git 工作流

### 基础 Git 操作

```json
{
  "customButton.buttons": [
    {
      "id": "git-status",
      "name": "📊 Status",
      "command": "git status",
      "icon": "git-branch",
      "color": "#00ff00"
    },
    {
      "id": "git-pull",
      "name": "⬇️ Pull",
      "command": "git pull",
      "icon": "arrow-down",
      "color": "#0000ff"
    },
    {
      "id": "git-push",
      "name": "⬆️ Push",
      "command": "git push",
      "icon": "arrow-up",
      "color": "#ff0000"
    },
    {
      "id": "git-log",
      "name": "📜 Log",
      "command": "git log --oneline -10",
      "icon": "history"
    }
  ]
}
```

### Git Flow 工作流

```json
{
  "customButton.buttons": [
    {
      "id": "git-feature-start",
      "name": "🌟 New Feature",
      "command": "git flow feature start",
      "icon": "git-branch"
    },
    {
      "id": "git-feature-finish",
      "name": "✅ Finish Feature",
      "command": "git flow feature finish",
      "icon": "check"
    },
    {
      "id": "git-release-start",
      "name": "🚀 Start Release",
      "command": "git flow release start",
      "icon": "tag"
    },
    {
      "id": "git-hotfix-start",
      "name": "🔥 Hotfix",
      "command": "git flow hotfix start",
      "icon": "flame"
    }
  ]
}
```

## Docker 容器管理

### Docker Compose 项目

```json
{
  "customButton.buttons": [
    {
      "id": "docker-up",
      "name": "🐳 Up",
      "command": "docker-compose up -d",
      "icon": "triangle-up",
      "color": "#0000ff"
    },
    {
      "id": "docker-down",
      "name": "🛑 Down",
      "command": "docker-compose down",
      "icon": "triangle-down",
      "color": "#ff0000"
    },
    {
      "id": "docker-logs",
      "name": "📋 Logs",
      "command": "docker-compose logs -f",
      "icon": "output"
    },
    {
      "id": "docker-ps",
      "name": "📦 Containers",
      "command": "docker ps",
      "icon": "package"
    },
    {
      "id": "docker-build",
      "name": "🔨 Build",
      "command": "docker-compose build",
      "icon": "tools"
    }
  ]
}
```

### Kubernetes 管理

```json
{
  "customButton.buttons": [
    {
      "id": "k8s-pods",
      "name": "🚀 Pods",
      "command": "kubectl get pods",
      "icon": "rocket"
    },
    {
      "id": "k8s-services",
      "name": "🔗 Services",
      "command": "kubectl get services",
      "icon": "link"
    },
    {
      "id": "k8s-apply",
      "name": "✅ Apply",
      "command": "kubectl apply -f .",
      "icon": "check"
    },
    {
      "id": "k8s-logs",
      "name": "📋 Logs",
      "command": "kubectl logs -f",
      "icon": "output"
    }
  ]
}
```

## 数据库管理

### MySQL/PostgreSQL

```json
{
  "customButton.buttons": [
    {
      "id": "db-connect",
      "name": "🗄️ Connect DB",
      "command": "mysql -u root -p",
      "icon": "database"
    },
    {
      "id": "db-backup",
      "name": "💾 Backup",
      "command": "mysqldump -u root -p mydb > backup.sql",
      "icon": "save"
    },
    {
      "id": "db-restore",
      "name": "🔄 Restore",
      "command": "mysql -u root -p mydb < backup.sql",
      "icon": "refresh"
    }
  ]
}
```

## 部署和 CI/CD

### 部署脚本

```json
{
  "customButton.buttons": [
    {
      "id": "deploy-staging",
      "name": "🚧 Deploy Staging",
      "command": "npm run deploy:staging",
      "icon": "cloud-upload",
      "color": "#ffff00"
    },
    {
      "id": "deploy-production",
      "name": "🚀 Deploy Prod",
      "command": "npm run deploy:prod",
      "icon": "rocket",
      "color": "#ff0000"
    },
    {
      "id": "rollback",
      "name": "⏪ Rollback",
      "command": "npm run rollback",
      "icon": "arrow-left",
      "color": "#ff6600"
    }
  ]
}
```

### GitHub Actions

```json
{
  "customButton.buttons": [
    {
      "id": "gh-actions-status",
      "name": "⚡ Actions Status",
      "command": "gh run list",
      "icon": "github-action"
    },
    {
      "id": "gh-create-pr",
      "name": "🔀 Create PR",
      "command": "gh pr create",
      "icon": "git-pull-request"
    },
    {
      "id": "gh-view-pr",
      "name": "👀 View PRs",
      "command": "gh pr list",
      "icon": "eye"
    }
  ]
}
```

## 实用工具

### 文件和目录操作

```json
{
  "customButton.buttons": [
    {
      "id": "clean-node-modules",
      "name": "🧹 Clean Modules",
      "command": "rm -rf node_modules && npm install",
      "icon": "trash"
    },
    {
      "id": "clean-cache",
      "name": "🗑️ Clear Cache",
      "command": "npm cache clean --force",
      "icon": "clear-all"
    },
    {
      "id": "disk-usage",
      "name": "💾 Disk Usage",
      "command": "du -sh *",
      "icon": "pie-chart"
    },
    {
      "id": "find-large-files",
      "name": "🔍 Large Files",
      "command": "find . -size +100M -type f",
      "icon": "search"
    }
  ]
}
```

### 系统监控

```json
{
  "customButton.buttons": [
    {
      "id": "system-info",
      "name": "💻 System Info",
      "command": "uname -a",
      "icon": "device-desktop"
    },
    {
      "id": "memory-usage",
      "name": "🧠 Memory",
      "command": "free -h",
      "icon": "pulse"
    },
    {
      "id": "cpu-usage",
      "name": "⚡ CPU",
      "command": "top -n 1",
      "icon": "dashboard"
    },
    {
      "id": "network-status",
      "name": "🌐 Network",
      "command": "netstat -tuln",
      "icon": "globe"
    }
  ]
}
```

## 常用图标参考

| 图标名称 | 显示效果 | 适用场景 |
|---------|---------|---------|
| `play` | ▶️ | 启动服务、运行脚本 |
| `gear` | ⚙️ | 构建、配置 |
| `terminal` | 💻 | 终端命令 |
| `package` | 📦 | 包管理、安装 |
| `git-branch` | 🌿 | Git 操作 |
| `beaker` | 🧪 | 测试 |
| `rocket` | 🚀 | 部署、启动 |
| `tools` | 🔧 | 工具、修复 |
| `database` | 🗄️ | 数据库操作 |
| `cloud-upload` | ☁️ | 上传、部署 |
| `refresh` | 🔄 | 刷新、重启 |
| `trash` | 🗑️ | 清理、删除 |
| `search` | 🔍 | 搜索、查找 |
| `check` | ✅ | 验证、完成 |
| `flame` | 🔥 | 热重载、紧急 |

更多图标请参考：[VSCode Icons](https://code.visualstudio.com/api/references/icons-in-labels)

## 配置技巧

### 1. 使用有意义的颜色

- 🟢 绿色：启动、成功操作
- 🔵 蓝色：构建、信息操作
- 🟡 黄色：测试、警告操作
- 🔴 红色：停止、危险操作
- 🟣 紫色：部署、特殊操作

### 2. 按功能分组

将相关的按钮放在一起，使用相似的图标和颜色主题。

### 3. 使用表情符号

在按钮名称中使用表情符号可以让界面更加直观和友好。

### 4. 简洁的命令

尽量使用简短但清晰的命令，避免过于复杂的一行命令。

## 故障排除

### 常见问题

1. **命令执行失败**
   - 检查命令是否正确
   - 确保有必要的权限
   - 验证工作目录是否正确

2. **按钮不显示**
   - 确保已打开工作区
   - 检查配置格式是否正确
   - 重新加载 VSCode 窗口

3. **图标不显示**
   - 使用正确的图标名称
   - 参考 VSCode 图标文档

## 更多示例

如果您有其他实用的配置示例，欢迎：

1. 提交 Issue 分享您的配置
2. 创建 Pull Request 添加到本文档
3. 在讨论区分享经验

---

希望这些示例能帮助您更好地使用 Command Dock！ 