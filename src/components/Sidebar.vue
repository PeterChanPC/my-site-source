<!-- previous sidebar design -->

<!-- <template>
  <aside ref="menu" class="menu" :class="{ 'show' : showMenu }">
    <div class="menu-upper">
      <div class="toggle-menu" @click="toggleMenu">
        <i class="fi fi-rr-angle-double-right" :class="{ 'close' : showMenu }"></i>
        <span v-if="showMenu">Menu</span>
      </div>

      <router-link :to="{ name: 'home' }">
        <i class="fi fi-rr-home"></i>
        <span v-if="showMenu">Home</span>
      </router-link>

      <router-link :to="{ name: 'my practices' }">
        <i class="fi fi-rr-list"></i>
        <span v-if="showMenu">My Practices</span>
      </router-link>
    </div>

    <div class="menu-lower">
      <div class="lang-setting">
        <span v-if="locale === 'zh-TW'" @click="locale = 'en-US'">中</span>
        <span v-else @click="locale = 'zh-TW'">Eng</span>
      </div>

      <div class="logout" @click="logout">
        <i class="fi fi-rr-sign-out-alt"></i>
        <span v-if="showMenu">Logout</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.store'
import router from '@/router'

const props = defineProps({
  showMenu: Boolean
})

const { locale } = useI18n({ useScope: 'global' })
const userStore = useUserStore()
const logout = () => {
  // not the best approach to remove token only, 
  // but dummyJSON doesn't have remove active token function
  userStore.$reset()
  router.go()
}

const emit = defineEmits(['toggleMenu'])
const toggleMenu = () => {
  emit('toggleMenu', !props.showMenu)
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
  transition: all 200ms ease;
  z-index: 98;
}

.menu:hover {
  border-right-color: #ccc;
}

.show {
  width: 200px;
}

.menu-upper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

a,
.toggle-menu,
.logout {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 3em;
  margin-top: 1em;
  transition: background-color 200ms ease;
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  background-color: #ddd;
}

a span {
  margin-left: 50px;
  white-space: nowrap;
}

a i {
  position: absolute;
  left: 1em;
}

a.router-link-exact-active {
  background-color: #ccc;
}

a.router-link-exact-active:hover {
  background-color: #ddd;
}


.toggle-menu i {
  position: absolute;
  right: 1em;
  transition: transform 200ms ease;
}

.close {
  transform: rotate(180deg);
}

.toggle-menu span {
  margin-left: 1rem;
  font-size: 2em;
  
}

.menu-lower {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lang-setting {
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 3em;
  margin-top: 1em;
}

.lang-setting span {
  position: absolute;
  left: .7em;
  cursor: pointer;
}

.lang-setting span:hover {
  color: blue;
  text-decoration: underline;
}

.logout {
  cursor: pointer;
  transition: background-color 200ms ease;
}

.logout:hover {
  background-color: #ddd;
}

.logout i {
  position: absolute;
  left: 1em;
}

.logout span {
  margin-left: 50px;
}

@media (max-width: 780px) {
  .menu {
    position: fixed;
    left: -51px;
  }

  .show {
    left: 0;
    width: 200px;
  }
}
</style> -->