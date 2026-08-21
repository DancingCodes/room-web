<script setup lang="ts">
import { ArrowDownToLine, Check, ChevronRight, Download, MessageCircleMore, ShieldCheck, Smartphone, UsersRound } from 'lucide-vue-next'

type AppVersion = {
  version_code: number
  apk_url: string
  release_notes: string
}

type ApiResponse<T> = {
  code: number
  message: string
  data: T | null
}

const config = useRuntimeConfig()
const version = ref<AppVersion | null>(null)
const loading = ref(true)
const error = ref(false)
const isIOS = ref(false)

const versionLabel = computed(() => version.value ? `Android · v${version.value.version_code}` : 'Android 版')
const releaseItems = computed(() => version.value?.release_notes.split(/\r?\n|；|。/).map(item => item.trim()).filter(Boolean) ?? [])
const canDownload = computed(() => Boolean(version.value) && !isIOS.value)
const downloadLabel = computed(() => {
  if (isIOS.value) return 'iOS 版暂未提供'
  if (loading.value) return '正在获取版本'
  return version.value ? '下载 Android 版' : '暂未发布'
})

useSeoMeta({
  title: '星闪 - 一起聊天的语音房间',
  description: '星闪 是一个轻松进入、实时聊天的语音房间应用。下载 Android 版，和朋友随时开聊。',
  ogTitle: '星闪 - 一起聊天的语音房间',
  ogDescription: '轻松进入语音房间，和朋友实时聊天。',
  ogImage: 'https://roomweb.moonc.love/images/logo.png',
  twitterCard: 'summary',
})

useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: '星闪',
      applicationCategory: 'SocialNetworkingApplication',
      operatingSystem: 'Android',
      downloadUrl: 'https://roomweb.moonc.love',
    }),
  }],
})

onMounted(async () => {
  const userAgent = navigator.userAgent
  isIOS.value = /iPhone|iPad|iPod/i.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  try {
    const response = await $fetch<ApiResponse<AppVersion>>(`${config.public.apiBase}/version/latest`)
    if (response.code === 200) version.value = response.data
    else error.value = true
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

function downloadApp() {
  if (!isIOS.value && version.value?.apk_url) window.location.assign(version.value.apk_url)
}
</script>

<template>
  <main>
    <header class="site-header">
      <NuxtLink class="brand" to="/" aria-label="星闪 首页">
        <img src="/images/logo.png" alt="星闪" />
        <span>星闪</span>
      </NuxtLink>

      <button class="header-download" type="button" :disabled="!canDownload" @click="downloadApp">
        {{ isIOS ? 'iOS 版暂未提供' : '下载 App' }}
        <Download :size="16" :stroke-width="2.2" />
      </button>
    </header>

    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> REAL-TIME VOICE ROOM</p>
        <h1 id="hero-title">说你想说的，<br><em>随时在场。</em></h1>
        <p class="hero-description">星闪 为每一次轻松的相聚留出空间。创建房间、加入朋友、打开麦克风，聊天自然开始。</p>
        <div class="hero-actions" id="download">
          <button class="primary-action" type="button" :disabled="!canDownload" @click="downloadApp">
            <Download :size="20" :stroke-width="2.2" />
            <span>{{ downloadLabel }}</span>
          </button>
          <a class="text-action" href="#features">了解 星闪 <ChevronRight :size="17" /></a>
        </div>
        <p v-if="version" class="version-note"><Check :size="15" /> {{ versionLabel }} · 官方安装包</p>
        <p v-else-if="error" class="version-note muted">暂时无法获取版本信息，请稍后刷新页面。</p>
      </div>

      <div class="device-stage" aria-label="星闪 应用界面示意">
        <div class="phone-frame">
          <div class="phone-speaker"></div>
          <div class="phone-screen">
            <div class="screen-bar"><strong>星闪</strong><span>20:26</span></div>
            <div class="room-status"><span class="status-dot"></span> 正在聊天</div>
            <h2>午后闲聊室</h2>
            <p>4 人正在房间里</p>
            <div class="message-list">
              <div class="message"><span class="avatar coral">L</span><div><b>Lin</b><p>刚刚听到一首很喜欢的歌</p></div></div>
              <div class="message self"><div><b>你</b><p>发来听听！</p></div><span class="avatar blue">R</span></div>
              <div class="message"><span class="avatar mint">M</span><div><b>Mia</b><p>我也在，晚点一起聊</p></div></div>
            </div>
            <div class="members"><span class="avatar coral">L</span><span class="avatar mint">M</span><span class="avatar gold">K</span><span class="empty-member">+</span></div>
            <div class="mic-control"><MessageCircleMore :size="19" /><span>输入消息</span><span class="mic-button"><UsersRound :size="18" /></span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="feature-section" aria-labelledby="feature-title">
      <div class="section-heading">
        <p class="eyebrow"><span></span> ROOM IN MOTION</p>
        <h2 id="feature-title">简单一点，聊天多一点。</h2>
      </div>
      <div class="feature-grid">
        <article>
          <span class="feature-icon coral-bg"><UsersRound :size="24" /></span>
          <h3>随时进入</h3>
          <p>看看正在进行的房间，加入熟悉的声音，也认识新的朋友。</p>
        </article>
        <article>
          <span class="feature-icon mint-bg"><MessageCircleMore :size="24" /></span>
          <h3>语音和文字</h3>
          <p>打开麦克风即时交流，想慢一点时也可以用文字留下消息。</p>
        </article>
        <article>
          <span class="feature-icon gold-bg"><ShieldCheck :size="24" /></span>
          <h3>账号更轻松</h3>
          <p>邮箱验证码即可登录，资料与头像都由你自己决定。</p>
        </article>
      </div>
    </section>

    <section class="release-section" aria-labelledby="release-title">
      <div>
        <p class="eyebrow"><span></span> LATEST RELEASE</p>
        <h2 id="release-title">现在就加入 星闪。</h2>
        <p>适用于 Android 设备。下载后根据系统提示完成安装。</p>
      </div>
      <div class="release-card">
        <div class="release-top"><Smartphone :size="23" /><span>{{ versionLabel }}</span><span class="release-state">{{ isIOS ? 'iOS 暂未提供' : loading ? '同步中' : version ? '可下载' : '未发布' }}</span></div>
        <ul v-if="releaseItems.length"><li v-for="item in releaseItems" :key="item"><Check :size="16" />{{ item }}</li></ul>
        <p v-else>开始使用 星闪，与朋友随时开聊。</p>
        <button type="button" :disabled="!canDownload" @click="downloadApp">{{ isIOS ? 'iOS 版暂未提供' : version ? '下载最新版' : '暂未提供下载' }} <ArrowDownToLine :size="18" /></button>
      </div>
    </section>

    <footer>
      <NuxtLink class="brand" to="/"><img src="/images/logo.png" alt="" /><span>星闪</span></NuxtLink>
      <p>和朋友保持连接。</p>
      <div><NuxtLink to="/privacy">隐私政策</NuxtLink><NuxtLink to="/terms">用户协议</NuxtLink></div>
    </footer>
  </main>
</template>

<style lang="scss">
.site-header {
  height: 78px;
  max-width: 1200px;
  margin: auto;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);

  nav {
    display: flex;
    gap: 28px;
    color: #4b5958;
    font-size: 14px;

    a:hover { color: #c66b59; }
  }
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0;

  img {
    width: 32px;
    height: 32px;
    border-radius: 9px;
    object-fit: contain;
  }
}

.header-download,
.primary-action,
.release-card button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 0;
  color: white;
  background: var(--ink);
  font-weight: 700;
}

.header-download {
  min-height: 38px;
  padding: 0 14px;
  border-radius: 5px;
  font-size: 13px;
}

.hero {
  max-width: 1200px;
  min-height: 610px;
  margin: auto;
  padding: 78px 48px 62px;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 78px;
  align-items: center;

  h1 {
    margin-bottom: 24px;
    font-size: 56px;
    font-weight: 800;
    line-height: 1.16;

    em { color: #df725e; font-style: normal; }
  }
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 17px;
  color: #59736b;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0;

  span { width: 22px; height: 2px; background: var(--coral); }
}

.hero-description {
  max-width: 510px;
  margin-bottom: 31px;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.85;
}

.hero-actions { display: flex; align-items: center; gap: 24px; }
.primary-action { padding: 15px 20px; border-radius: 5px; font-size: 15px; }
.text-action { display: inline-flex; align-items: center; gap: 3px; color: #465251; font-size: 14px; font-weight: 600; }
.version-note { display: flex; align-items: center; gap: 6px; margin: 17px 0 0; color: #55806f; font-size: 12px; }
.version-note.muted { color: #858b86; }

.device-stage {
  min-height: 470px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-frame {
  position: relative;
  z-index: 1;
  width: 247px;
  height: 480px;
  padding: 10px;
  border-radius: 32px;
  background: #172121;
  box-shadow: 6px 8px 0 #b9cfc0;

  .phone-speaker {
    position: absolute;
    z-index: 2;
    top: 17px;
    left: calc(50% - 28px);
    width: 56px;
    height: 5px;
    border-radius: 5px;
    background: #172121;
  }

  .phone-screen {
    height: 100%;
    padding: 28px 15px 14px;
    overflow: hidden;
    border-radius: 24px;
    background: #fbfaf5;

    h2 { margin: 8px 0 2px; font-size: 19px; }
    > p { color: #7a8480; font-size: 10px; }
  }
}

.screen-bar { display: flex; justify-content: space-between; font-size: 10px; }
.screen-bar strong { font-size: 13px; }
.room-status { margin-top: 18px; color: #6b9582; font-size: 10px; }
.status-dot { display: inline-block; width: 6px; height: 6px; margin-right: 3px; border-radius: 50%; background: #5cab83; }
.message-list { display: grid; gap: 12px; margin-top: 23px; }

.message {
  display: flex;
  align-items: flex-start;
  gap: 7px;

  &.self { justify-content: flex-end; text-align: right; }
  b { display: block; font-size: 10px; }
  p { margin: 3px 0 0; padding: 7px 8px; border-radius: 8px; background: #eff0eb; font-size: 9px; line-height: 1.35; }
  &.self p { background: #d8eee3; }
}

.avatar {
  flex: none;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #31403b;
  font-size: 9px;
  font-weight: 800;
}

.coral { background: #f5b8aa; }
.mint { background: #bce2d1; }
.gold { background: #f7dc96; }
.blue { background: #b3d9e5; }
.members { display: flex; align-items: center; gap: 5px; margin-top: 24px; }
.members .avatar, .empty-member { width: 26px; height: 26px; }
.empty-member { display: grid; place-items: center; border: 1px dashed #a8b5af; border-radius: 50%; color: #80908a; font-size: 15px; }
.mic-control { display: flex; align-items: center; gap: 7px; margin-top: 17px; padding: 8px; border-radius: 10px; color: #95a09a; background: #f0f0eb; font-size: 9px; }
.mic-button { width: 25px; height: 25px; margin-left: auto; display: grid; place-items: center; border-radius: 8px; color: #fff; background: #1e302c; }

.feature-section {
  padding: 83px max(28px, calc((100% - 1104px) / 2));
  background: #fff;

  .section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 42px;

    h2 { margin: 0; font-size: 34px; line-height: 1.35; }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line);

  article {
    min-height: 225px;
    padding: 29px 28px 0 0;
    border-right: 1px solid var(--line);

    &:not(:first-child) { padding-left: 28px; }
    &:last-child { border: 0; }
  }

  h3 { margin: 22px 0 9px; font-size: 18px; }
  p { max-width: 260px; color: var(--muted); font-size: 14px; line-height: 1.75; }
}

.feature-icon { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 7px; }
.coral-bg { color: #b85d4e; background: #fde7e1; }
.mint-bg { color: #427d68; background: #e0f1e8; }
.gold-bg { color: #a67319; background: #fbf0d2; }

.release-section {
  max-width: 1104px;
  margin: auto;
  padding: 100px 0;
  display: grid;
  grid-template-columns: 1fr 430px;
  gap: 90px;
  align-items: center;

  h2 { margin: 0; font-size: 34px; line-height: 1.35; }
  > div > p:not(.eyebrow) { margin: 17px 0 0; color: var(--muted); line-height: 1.75; }
}

.release-card {
  padding: 26px;
  border-radius: 8px;
  color: #f9faf7;
  background: #1b2927;

  ul { display: grid; gap: 12px; margin: 25px 0 18px; padding: 0; color: #dce4df; font-size: 13px; list-style: none; }
  li { display: flex; align-items: center; gap: 8px; }
  p { margin: 24px 0; color: #b4c2bb; font-size: 13px; line-height: 1.6; }
  button {
    width: 100%;
    min-height: 47px;
    border-radius: 4px;
    color: #2a2421;
    background: #e99a84;

    &:hover { filter: brightness(.96); }
  }
}

.release-top { display: flex; align-items: center; gap: 9px; font-size: 16px; font-weight: 700; }
.release-state { margin-left: auto; padding: 4px 7px; border-radius: 3px; color: #d6f1df; background: #325f50; font-size: 10px; font-weight: 500; }
.primary-action:hover { filter: brightness(.96); }

footer {
  max-width: 1200px;
  min-height: 130px;
  margin: auto;
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 24px;
  border-top: 1px solid var(--line);
  color: #65716d;
  font-size: 13px;

  > p { margin: 0 auto 0 0; }
  > div { display: flex; gap: 18px; }
  a { display: inline-flex; align-items: center; gap: 3px; }
  a:hover { color: #c66b59; }
}

@media (max-width: 800px) {
  .site-header {
    height: 67px;
    padding: 0 20px;

    nav { display: none; }
  }

  .header-download { display: none; }
  .hero { grid-template-columns: 1fr; gap: 45px; padding: 55px 20px 52px; }
  .hero-copy { max-width: 570px; }
  .hero h1 { font-size: 41px; }
  .hero-description { font-size: 15px; }
  .device-stage { min-height: 435px; }
  .phone-frame { transform: scale(.88); }
  .feature-section { padding: 60px 20px; }
  .feature-section .section-heading { display: block; }
  .feature-section .section-heading h2, .release-section h2 { font-size: 28px; }
  .feature-grid {
    grid-template-columns: 1fr;

    article, article:not(:first-child) { padding: 25px 0; border-right: 0; border-bottom: 1px solid var(--line); }
  }
  .release-section { grid-template-columns: 1fr; gap: 33px; padding: 65px 20px; }
  .release-card { padding: 22px; }
  footer { padding: 25px 20px; align-items: flex-start; flex-direction: column; gap: 14px; }
  footer > p { margin: 0; }
}

@media (max-width: 380px) {
  .hero h1 { font-size: 35px; }
  .hero-actions { align-items: flex-start; flex-direction: column; gap: 16px; }
  .device-stage { margin: 0 -20px; }
  .release-top { font-size: 14px; }
}
</style>
