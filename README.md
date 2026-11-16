# dsh-sidebar-direct-settings

Replace the sidebar account "More" menu with a direct **Settings** button.

把侧边栏账号的「更多」弹出菜单换成直接的「设置」按钮：点击即打开设置面板，不再弹菜单。

## 行为 / Behavior

- 注册到 `settings.launcher` 插槽，`priority: -1`，覆盖自带的账号「More」启动器
- 侧边栏展开时显示图标 + 文本，收起时只显示图标（36×36）
- 通过 `ctx.locale` 注册中/英/日/德/西/法/葡/俄 八种语言标签；locale 服务不可用时回退到「设置」
- 点击调用宿主注入的 `openSettings()`，没有该回调时按钮不触发任何操作

## 文件 / Files

| 文件 | 作用 |
|---|---|
| `index.js` | 宿主侧入口，空实现；真正的改动在 client 侧 |
| `client.js` | 客户端模块，向 `settings.launcher` 插槽注入按钮 |
| `cordis.patch.yml` | bundle 补丁，声明插件 id 与包名 |
| `locale/*.json` | 插件元信息（标题、描述）的多语言文案 |

## 依赖 / Requirements

运行时由宿主提供，不随本包安装：

- `react`
- `@deepseek-ai/dsh-client-ui-primitives`（用到 `IconSettingsOutlineMedium`）

## 作为 bundle 使用 / Use as a bundle

`package.json` 中的 `dsh` 字段声明了补丁与客户端平台：

```json
"dsh": {
  "bundle": { "patch": "./cordis.patch.yml" },
  "client": { "platform": "web", "immediately": true }
}
```

`cordis.patch.yml` 把插件名映射到本包：

```yaml
- insert:
    - id: dsh-sidebar-direct-settings
      name: 'dsh-sidebar-direct-settings'
```

## 目录结构 / Layout

```
dsh-sidebar-direct-settings/
├── client.js
├── cordis.patch.yml
├── index.js
├── locale/
│   ├── en.json
│   └── zh.json
├── package.json
└── README.md
```

## License

MIT
