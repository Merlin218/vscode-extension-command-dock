# 开发指南

## 环境要求

- Node.js 16+
- pnpm 包管理器
- VS Code / Cursor

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 编译项目

```bash
# 一次性编译
pnpm run compile

# 监听模式编译
pnpm run watch
```

### 3. 调试插件

在 VS Code/Cursor 中：

1. 按 `F5` 或使用 "Run Extension" 调试配置
2. 这会启动一个新的扩展宿主窗口
3. 在新窗口中测试插件功能

### 4. 代码检查

```bash
# 检查代码规范
pnpm run lint

# 自动修复代码问题
pnpm run lint:fix
```

## 项目架构

### 核心模块

1. **types.ts** - 类型定义
   - `CustomButton` 接口
   - `ButtonConfig` 接口

2. **configManager.ts** - 配置管理
   - 按钮配置的增删改查
   - 与 VS Code 配置系统集成

3. **commandExecutor.ts** - 命令执行器
   - 终端命令执行
   - 工作区目录管理
   - 终端生命周期管理

4. **buttonManager.ts** - 状态栏按钮管理器
   - 状态栏按钮创建和管理
   - 按钮样式和交互处理

5. **panelProvider.ts** - 面板数据提供者
   - 实现 TreeDataProvider 接口
   - 管理树状视图数据
   - 支持工作区分组显示
   - 监听配置变化自动刷新

6. **panelCommands.ts** - 面板命令处理器
   - 处理面板相关的用户操作
   - 按钮的增删改查操作
   - 与 UI 组件的交互逻辑

7. **uiHandler.ts** - 用户界面处理
   - 添加/编辑/删除按钮的交互界面
   - 用户输入验证
   - 传统命令面板操作

8. **extension.ts** - 主入口
   - 插件激活和停用
   - 命令注册
   - 事件监听
   - 面板和树视图注册

### 设计原则

遵循 SOLID 原则：

- **单一职责原则 (SRP)**: 每个模块专注于单一功能
- **开闭原则 (OCP)**: 对扩展开放，对修改关闭
- **里氏替换原则 (LSP)**: 子类可以替换基类
- **接口隔离原则 (ISP)**: 依赖于抽象而不是具体实现
- **依赖倒置原则 (DIP)**: 高层模块不依赖低层模块

## 开发流程

### 添加新功能

1. 在 `types.ts` 中定义相关类型
2. 在对应模块中实现功能
3. 在 `extension.ts` 中注册命令
4. 更新 `package.json` 的 `contributes` 部分
5. 编写测试（如需要）
6. 更新文档

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 函数和类使用 JSDoc 注释
- 变量和函数使用驼峰命名

### 测试

```bash
# 运行测试
pnpm test

# 在调试模式下运行测试
# 使用 "Extension Tests" 调试配置
```

## 构建和发布

### 打包插件

```bash
# 安装 vsce（如果还没有）
pnpm add -g vsce

# 打包插件
pnpm run package
```

### 发布到扩展市场

1. 获取 Personal Access Token
2. 登录 vsce：`vsce login <publisher>`
3. 发布：`vsce publish`

## 常见问题

### Q: 编译失败
A: 确保安装了所有依赖：`pnpm install`

### Q: 调试时找不到模块
A: 先运行编译：`pnpm run compile`

### Q: 按钮不显示
A: 检查配置是否正确保存在工作区设置中

### Q: 命令执行失败
A: 确保工作区已打开且有写入权限

## 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 创建 Pull Request

## 许可证

MIT License 