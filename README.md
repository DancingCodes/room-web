# Room Web

Room 官网与 Android 下载页，使用 Nuxt 3 静态预渲染。

## 开发

```sh
npm install
npm run dev
```

## 静态构建

```sh
npm run generate
```

静态产物输出到 `.output/public/`，由 Nginx 托管根路径；同域 `/api/` 由 Nginx 转发至 `room-api`。

页面运行时请求 `/api/v1/app-version/latest` 获取当前 Android APK 地址和发布说明。