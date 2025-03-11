<template>
  <aside>
    <div class="menu">
      <router-link :to="{ name: 'home' }">
        <i class="fi fi-rr-home"></i>
      </router-link>

      <router-link :to="{ name: 'todos' }">
        <i class="fi fi-rr-list"></i>
      </router-link>

      <router-link :to="{ name: 'settings'}">
        <i class="fi fi-rr-settings"></i>
      </router-link>

      <div class="lang-setting">
        <span v-if="locale === 'zh-TW'" @click="locale = 'en-US'">中</span>
        <span v-else @click="locale = 'zh-TW'">Eng</span>
      </div>

    </div>
  </aside>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale, availableLocales } = useI18n({ useScope: 'global' })
</script>

<style scoped>
  aside {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 50px;
    height: 100%;
    border-right: 1px solid #ddd;
    background: #eee;

    a {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      margin-top: 10px;
      color: #2c3e50;
      text-decoration: none;

      &:hover {
        background: #ddd;
        transition: .05s;
      }
    }

    .lang-setting {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      margin-top: 10px;
      font-size: 14px;
      user-select: none;

      span {
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    a.router-link-exact-active {
      border-right: 2px solid #777;
      background: #ccc;

      &:hover {
        background: #ddd;
        transition: .05s;
      }
    }

    &:hover {
      border-right: 1px solid #ccc;
    }
    
    @media (max-width: 768px) {
      position: fixed;
      z-index: 99;
    }
    
  }
</style>