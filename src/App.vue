<template>
  <div>
    <v-card>
      <v-layout>
        <v-navigation-drawer :width="200">
          <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/28.jpg"
              title="Alexandr Ryazanov"
              nav
          >
          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <router-link v-if="accessToken" class="text-decoration-none text-grey-darken-4" to="/">
              <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
            </router-link>
            <router-link v-if="accessToken" class="text-decoration-none text-grey-darken-4" to="/post_index">
              <v-list-item prepend-icon="mdi-post" title="Posts" value="post"></v-list-item>
            </router-link>
            <router-link v-if="accessToken" class="text-decoration-none text-grey-darken-4" to="/category_index">
              <v-list-item prepend-icon="mdi-shape " title="Categories" value="category"></v-list-item>
            </router-link>
            <router-link v-if="accessToken" class="text-decoration-none text-grey-darken-4" to="/tag_index">
              <v-list-item prepend-icon="mdi-tag" title="Tags" value="tag"></v-list-item>
            </router-link>
            <router-link v-if="!accessToken" class="text-decoration-none text-grey-darken-4" to="/user/login">
              <v-list-item prepend-icon="mdi-login" title="Login" value="login"></v-list-item>
            </router-link>
            <router-link v-if="!accessToken" class="text-decoration-none text-grey-darken-4" to="/user/registration">
              <v-list-item prepend-icon="mdi-account-plus" title="Registration" value="registration"></v-list-item>
            </router-link>
            <a @click.prevent="logout" href="#" v-if="accessToken" class="text-decoration-none text-grey-darken-4">
              <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
            </a>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import API from "./api.js";

export default {
  data() {
    return {
      accessToken: null
    }
  },
  mounted() {
    // this.getAccessToken()
    window.addEventListener('localstorage-changed', (event) => {
      this.accessToken = event.detail.storage;
    });
  },
  updated() {
    this.getAccessToken()
  },
  methods: {
    getAccessToken() {
      this.accessToken = localStorage.getItem('access_token')
    },

    logout() {
      API.post('http://79.174.91.91:81/api/logout')
          .then(res => {
            localStorage.removeItem('access_token')

            window.dispatchEvent(new CustomEvent('localstorage-changed', {
              detail: {
                storage: localStorage.getItem('access_token')
              }
            }));

            this.$router.push({name: 'user.login'})

          })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>