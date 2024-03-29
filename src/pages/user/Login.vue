<template>
  <div class="main">
    <v-sheet class="user pa-12" rounded>
      <v-card class="mx-auto px-6 py-5" max-width="344" title="User Login">
        <v-form
            v-model="form"
            @submit.prevent="login"
        >
          <v-text-field
              v-model="email"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              label="Email"
              clearable
          ></v-text-field>

          <v-text-field
              v-model="password"
              :readonly="loading"
              :rules="[required]"
              label="Password"
              placeholder="Enter your password"
              clearable
          ></v-text-field>

          <br>

          <v-btn
              :disabled="!form"
              :loading="loading"
              color="grey"
              size="large"
              type="submit"
              variant="elevated"
              block
          >
            Sign In
          </v-btn>
          <div v-if="error" class="pt-5 text-red-darken-3 font-weight-bold text-h5">{{ this.error }}</div>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
    error: null
  }),

  methods: {
    login() {
      if (!this.form) return

      axios.post('http://79.174.91.91:81/api/login', {
        email: this.email,
        password: this.password
      })
          .then(res => {
            localStorage.setItem('access_token', res.data.access_token)

            window.dispatchEvent(new CustomEvent('localstorage-changed', {
              detail: {
                storage: localStorage.getItem('access_token')
              }
            }));

            this.$router.push({name: 'home.page'})
            // window.location.reload()
          })
          .catch(error => {
            this.error = error.response.data.error
          })

    },
    required(v) {
      return !!v || 'Field is required'
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin-left: 200px;
  background: #dadada;
  height: 100vh;
}

.user {
  background: #dadada;
}

</style>