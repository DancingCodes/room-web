# 星闪 Web

星闪官网与 Android 下载页，使用 Nuxt 3 静态预渲染。

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

页面运行时请求 `/api/v1/app/version/latest` 获取当前 Android APK 地址和发布说明。
## API 地址

开发和生产模式默认直连 `https://room.moonc.love/api/v1/app`。下载页部署在 `https://roomweb.moonc.love`，因此不能使用相对 `/api/v1/app` 路径。需要覆盖地址时设置 `NUXT_PUBLIC_API_BASE`。
