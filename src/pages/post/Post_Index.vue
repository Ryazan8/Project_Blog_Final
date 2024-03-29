<template>
  <div class="main">
    <div class="header">
      <div class="name">Alexandr Ryazanov</div>
      <div class="subtitle">Personal Blog Template</div>
      <router-link class="text-h4 mb-5" to="/post_create"><span class="mdi mdi-plus-box text-grey-darken-3"></span>
      </router-link>
    </div>

    <div class="container">
      <div class="posts">
        <div class="post" v-for="post in posts">
          <div v-if="post.image_url">
            <img
                :src="post.image_url"
                :title="post.title"
                :alt="post.title"
                class="img"
                cover
            >
          </div>
          <div class="post_title">
            {{ post.title }}
          </div>
          <div class="post_content">
            {{ post.content }}
          </div>

          <div class="d-flex justify-space-between mt-5 pr-10">

            <div style="max-width: 100px" class="pl-10"><span
                class="font-weight-bold">Category: </span>{{ post.category.title }}
            </div>

            <div style="max-width: 100px" v-for="tag in post.tags">

              #{{ tag.title }}

            </div>
          </div>

          <div class="d-flex text-h5 mt-5 btn_tools">
            <router-link class="mr-3" :to="{name: 'post_edit.page', params: {id: post.id}}">
              <span class="mdi mdi-pencil text-blue-darken-3"></span>
            </router-link>
            <router-link class="mr-3" :to="{name: 'post_show.page', params: {id: post.id}}">
              <span class="mdi mdi-eye-outline text-green-darken-3"></span>
            </router-link>
            <button @click.prevent="removePost(post.id)"><span class="mdi mdi-delete mr-2 text-red-darken-3"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../api.js";

export default {

  data() {
    return {
      categories: [],
      posts: [],
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      API.get('http://79.174.91.91:81/api/posts')
          .then(res => {
            this.posts = res.data
          })
    },
    removePost(id) {
      axios.delete(`http://79.174.91.91:81/api/posts/${id}`)
          .then(res => {
            this.posts = this.posts.filter(post => {
              return parseInt(post.id) !== parseInt(id)
            })
          })
    },

  }
}
</script>

<style scoped>
.main {
  margin-left: 200px;
  background: #dadada;
}

.header {
  width: 500px;
  margin-left: 350px;
  text-align: center;
  margin-bottom: 20px;
  padding-top: 50px;

}

.name {
  font-size: 48px;
  font-weight: 500;
  color: #3d3d3d;
}

.subtitle {
  font-size: 14px;
  font-weight: 300;
  color: #828282;
  padding-bottom: 10px;
}

.btn_tools {
  padding-left: 40px;
  padding-bottom: 30px;
}

.container {
  max-width: 800px;
  text-align: center;
  margin-left: 250px;
  align-items: center;
}

.post {
  background: #fff;
  padding-top: 40px;
  color: #262626;
  margin-bottom: 25px;
}

.img {
  width: 700px;
  height: 450px;
}

.post_title {
  padding-top: 20px;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.1;
}

.post_content {
  padding: 20px 0;
  line-height: 28px;
  font-size: 16px;
  color: #3f3f3f;
}
</style>