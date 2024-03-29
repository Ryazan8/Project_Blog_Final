<template>
  <div class="main">
    <v-sheet class="user pa-12" rounded>
      <v-card
          class="mx-auto"
          max-width="344"
          title="User Registration"
      >
        <v-container>
          <v-text-field
              v-model="name"
              color="grey"
              label="First name"
              variant="underlined"
          ></v-text-field>

          <v-text-field
              v-model="email"
              color="grey"
              label="Email"
              variant="underlined"
          ></v-text-field>

          <v-text-field
              v-model="password"
              color="grey"
              label="Password"
              placeholder="Enter your password"
              variant="underlined"
          ></v-text-field>

          <v-text-field
              v-model="password_confirmation"
              color="grey"
              label="Confirm Password"
              placeholder="Enter your password"
              variant="underlined"
          ></v-text-field>

          <v-checkbox
              v-model="terms"
              color="grey"
              label="I agree to site terms and conditions"
          ></v-checkbox>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="black" @click.prevent="store">
            Complete Registration

            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
          <div v-if="error" class="pt-5 text-red-darken-3 font-weight-bold text-h5">{{ this.error }}</div>

        </v-card-actions>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>

export default {
  data: () => ({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    terms: false,
    error: null
  }),
  methods: {
    store() {
      axios.post('http://79.174.91.91:81/api/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
          .then(res => {
            localStorage.setItem('access_token', res.data.token)
            this.$router.push({name: 'home.page'})
          })
          .catch(error => {
            this.error = error.response.data.error
          })
    }
  }
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