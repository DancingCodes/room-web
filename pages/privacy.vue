<script setup lang="ts">
useSeoMeta({ title: '隐私政策 - 星闪', description: '星闪 隐私政策。' })
</script>

<template>
  <main class="policy-page">
    <header class="site-header"><NuxtLink class="brand" to="/"><img src="/images/logo.png" alt="星闪" /><span>星闪</span></NuxtLink><NuxtLink class="text-action" to="/">返回首页 <span>→</span></NuxtLink></header>
    <article><p class="eyebrow"><span></span> PRIVACY</p><h1>隐私政策</h1><p>星闪 重视你的隐私。本页面将随产品服务完善持续更新。</p><h2>我们处理的信息</h2><p>为提供登录、房间和消息服务，星闪 会处理你提供的邮箱、昵称、头像以及服务运行所需的房间和消息数据。</p><h2>信息使用</h2><p>这些信息仅用于账号验证、提供房间服务、维护服务安全与改善产品体验。</p><h2>联系我们</h2><p>如有隐私相关问题，请发送邮件至 hello@moonc.love。</p></article>
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
