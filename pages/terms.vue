<script setup lang="ts">
useSeoMeta({ title: '用户协议 - 星闪', description: '星闪 用户协议。' })
</script>

<template>
  <main class="policy-page">
    <header class="site-header"><NuxtLink class="brand" to="/"><img src="/images/logo.png" alt="星闪" /><span>星闪</span></NuxtLink><NuxtLink class="text-action" to="/">返回首页 <span>→</span></NuxtLink></header>
    <article><p class="eyebrow"><span></span> TERMS</p><h1>用户协议</h1><p>欢迎使用 星闪。使用服务即表示你同意遵守本协议及适用法律法规。</p><h2>服务使用</h2><p>请以友善、合法的方式使用 星闪，不发布侵害他人权益、违法或不当的内容。</p><h2>账号安全</h2><p>请妥善保管登录验证码和设备访问权限；如发现异常使用，请及时联系我们。</p><h2>服务调整</h2><p>星闪 可能根据产品发展调整服务内容，并在必要时更新本协议。</p></article>
  </main>
</template>

<style lang="scss">
.policy-page {
  .site-header {
    height: 78px;
    max-width: 1200px;
    margin: auto;
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--line);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: 800;

    img { width: 32px; height: 32px; border-radius: 9px; object-fit: contain; }
  }

  .text-action { display: inline-flex; align-items: center; gap: 3px; color: #465251; font-size: 14px; font-weight: 600; }

  article {
    max-width: 760px;
    margin: 74px auto 110px;
    padding: 0 28px;

    h1 { margin-bottom: 20px; font-size: 45px; }
    h2 { margin: 38px 0 12px; font-size: 21px; }
    > p:not(.eyebrow) { color: #4f5e5b; font-size: 15px; line-height: 1.9; }
  }

  .eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 17px;
    color: #59736b;
    font-size: 11px;
    font-weight: 500;

    span { width: 22px; height: 2px; background: var(--coral); }
  }
}

@media (max-width: 800px) {
  .policy-page .site-header { height: 67px; padding: 0 20px; }
}
</style>
