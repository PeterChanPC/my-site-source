<template>
  <aside class="menu">
    <div class="menu-upper">
      <router-link :to="{ name: 'home' }">
        <i class="fi fi-rr-home"></i>
      </router-link>

      <router-link :to="{ name: 'projects' }">
        <i class="fi fi-rr-list"></i>
      </router-link>

      <router-link :to="{ name: 'settings'}">
        <i class="fi fi-rr-settings"></i>
      </router-link>
    </div>

    <div class="menu-lower">
      <div class="lang-setting">
        <span v-if="locale === 'zh-TW'" @click="locale = 'en-US'">中</span>
        <span v-else @click="locale = 'zh-TW'">Eng</span>
      </div>

      <div class="logout" @click="logout">
        <i class="fi fi-rr-sign-out-alt"></i>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import auth from '@/stores/auth.store'
import router from '@/router'

const { locale } = useI18n({ useScope: 'global' })
const logout = () => {
  // not the best approach to remove token only, 
  // but dummyJSON doesn't have remove active token function
  auth.RemoveAccessToken()
  auth.RemoveUser()
  router.go()
}
</script>

<style scoped>
.menu {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50px;
  height: 100%;
  border-right: 1px solid #ddd;
  background: #eee;
}

.menu:hover {
  border-right: 1px solid #ccc;
}

.menu .menu-upper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.menu .menu-upper a {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-top: 10px;
  color: #2c3e50;
  text-decoration: none;
  -webkit-transition: background 100ms ease;
  transition: background 100ms ease;
}

.menu .menu-upper a:hover {
  background: #ddd;
}

.menu .menu-upper a.router-link-exact-active {
  border-right: 2px solid #777;
  background: #ccc;
}

.menu .menu-upper a.router-link-exact-active:hover {
  background: #ddd;
}

.menu .menu-lower {
  position: relative;
  display: flex;
  flex-direction: column;
}

.menu .menu-lower .lang-setting {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-bottom: 10px;
  font-size: 14px;
  -webkit-user-select: none;
  user-select: none;
}

.menu .menu-lower .lang-setting span {
  cursor: pointer;
}

.menu .menu-lower .lang-setting span:hover {
  text-decoration: underline;
}

.menu .menu-lower .logout {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-bottom: 10px;
  cursor: pointer;
  color: #2c3e50;
  text-decoration: none;
  -webkit-transition: background 100ms ease;
  transition: background 100ms ease;
}

.menu .menu-lower .logout:hover {
  background: #ddd;
}

@media (max-width: 870px) {
  .menu {
    position: fixed;
    z-index: 99;
  }
}
</style>