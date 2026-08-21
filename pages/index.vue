<script setup lang="ts">
import { ArrowDownToLine, Check, ChevronRight, Download, ExternalLink, MessageCircleMore, ShieldCheck, Smartphone, UsersRound } from 'lucide-vue-next'

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

const versionLabel = computed(() => version.value ? `Android · v${version.value.version_code}` : 'Android 版')
const releaseItems = computed(() => version.value?.release_notes.split(/\r?\n|；|。/).map(item => item.trim()).filter(Boolean) ?? [])

useSeoMeta({
  title: 'Room - 一起聊天的语音房间',
  description: 'Room 是一个轻松进入、实时聊天的语音房间应用。下载 Android 版，和朋友随时开聊。',
  ogTitle: 'Room - 一起聊天的语音房间',
  ogDescription: '轻松进入语音房间，和朋友实时聊天。',
  ogImage: 'https://room.moonc.love/images/logo.png',
  twitterCard: 'summary',
})

useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Room',
      applicationCategory: 'SocialNetworkingApplication',
      operatingSystem: 'Android',
      downloadUrl: 'https://room.moonc.love',
    }),
  }],
})

onMounted(async () => {
  try {
    const response = await $fetch<ApiResponse<AppVersion>>(`${config.public.apiBase}/app-version/latest`)
    if (response.code === 200) version.value = response.data
    else error.value = true
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

function downloadApp() {
  if (version.value?.apk_url) window.location.assign(version.value.apk_url)
}
</script>

<template>
  <main>
    <header class="site-header">
      <NuxtLink class="brand" to="/" aria-label="Room 首页">
        <img src="/images/logo.png" alt="Room" />
        <span>Room</span>
      </NuxtLink>

      <button class="header-download" type="button" :disabled="!version" @click="downloadApp">
        下载 App
        <Download :size="16" :stroke-width="2.2" />
      </button>
    </header>

    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> REAL-TIME VOICE ROOM</p>
        <h1 id="hero-title">说你想说的，<br><em>随时在场。</em></h1>
        <p class="hero-description">Room 为每一次轻松的相聚留出空间。创建房间、加入朋友、打开麦克风，聊天自然开始。</p>
        <div class="hero-actions" id="download">
          <button class="primary-action" type="button" :disabled="!version" @click="downloadApp">
            <Download :size="20" :stroke-width="2.2" />
            <span>{{ loading ? '正在获取版本' : version ? '下载 Android 版' : '暂未发布' }}</span>
          </button>
          <a class="text-action" href="#features">了解 Room <ChevronRight :size="17" /></a>
        </div>
        <p v-if="version" class="version-note"><Check :size="15" /> {{ versionLabel }} · 官方安装包</p>
        <p v-else-if="error" class="version-note muted">暂时无法获取版本信息，请稍后刷新页面。</p>
      </div>

      <div class="device-stage" aria-label="Room 应用界面示意">
        <div class="phone-frame">
          <div class="phone-speaker"></div>
          <div class="phone-screen">
            <div class="screen-bar"><strong>Room</strong><span>20:26</span></div>
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
        <h2 id="release-title">现在就加入 Room。</h2>
        <p>适用于 Android 设备。下载后根据系统提示完成安装。</p>
      </div>
      <div class="release-card">
        <div class="release-top"><Smartphone :size="23" /><span>{{ versionLabel }}</span><span class="release-state">{{ loading ? '同步中' : version ? '可下载' : '未发布' }}</span></div>
        <ul v-if="releaseItems.length"><li v-for="item in releaseItems" :key="item"><Check :size="16" />{{ item }}</li></ul>
        <p v-else>开始使用 Room，与朋友随时开聊。</p>
        <button type="button" :disabled="!version" @click="downloadApp">{{ version ? '下载最新版' : '暂未提供下载' }} <ArrowDownToLine :size="18" /></button>
      </div>
    </section>

    <footer>
      <NuxtLink class="brand" to="/"><img src="/images/logo.png" alt="" /><span>Room</span></NuxtLink>
      <p>和朋友保持连接。</p>
      <div><NuxtLink to="/privacy">隐私政策</NuxtLink><NuxtLink to="/terms">用户协议</NuxtLink><a href="mailto:hello@moonc.love">联系邮箱 <ExternalLink :size="13" /></a></div>
    </footer>
  </main>
</template>