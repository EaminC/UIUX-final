# Vercel 部署指南

## 快速部署到 Vercel

### 方法 1：通过 Vercel 网站部署（推荐）

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 从 GitHub 导入 `EaminC/UIUX-final` 仓库
5. Vercel 会自动检测到这是一个 Vite 项目
6. 保持默认配置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
7. 点击 "Deploy"
8. 等待部署完成（通常 1-2 分钟）

### 方法 2：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

## 环境变量（可选）

如果需要配置环境变量，在 Vercel 项目设置中添加：

- `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `VITE_APPLE_CLIENT_ID` - Apple Sign In Client ID
- `VITE_WECHAT_APPID` - WeChat App ID

## 自动部署

配置完成后，每次推送到 `main` 分支，Vercel 会自动重新部署：

```bash
git add .
git commit -m "update: your changes"
git push origin main
```

## 自定义域名

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加您的自定义域名
3. 按照提示配置 DNS 记录

## 性能优化建议

Vercel 已自动配置：
- ✅ CDN 加速
- ✅ 自动 HTTPS
- ✅ 图片优化
- ✅ Gzip/Brotli 压缩
- ✅ 边缘网络缓存

## 预览部署

每个 Pull Request 都会自动创建预览部署，方便测试新功能。

## 故障排查

如果部署失败，检查：
1. `package.json` 中的依赖是否完整
2. 构建命令是否正确
3. Node.js 版本是否兼容（建议 18+）
4. 查看 Vercel 部署日志获取详细错误信息

## 项目链接

- **GitHub**: https://github.com/EaminC/UIUX-final
- **Vercel**: 部署后会生成类似 `https://uiux-final-xxx.vercel.app` 的链接

