<template>
  <div class="main">
  <div class="container">

    <div class="post" v-if="post">
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

      <div class="d-flex justify-space-evenly">
        <div><span class="font-weight-bold">Category: </span>{{ post.category.title }}</div>
        <div v-for="tag in post.tags">
          <div class="d-flex">
            #{{ tag.title }}
          </div>
        </div>
      </div>


    </div>
  </div>
  </div>

</template>

<script>
export default {

  data() {
    return {
      categories: [],
      posts: [],
      post: null
    }
  },
  mounted() {
    this.getPostShow(this.$route.params.id)
  },
  methods: {
    getPostShow(id) {
      axios.get(`http://79.174.91.91:81/api/posts/${id}`)
          .then(res => {
            this.post = res.data
            this.curren_tags = this.post.tags.map(tag => tag.id)
          })
    },
  }
}
</script>

<style scoped>

.main{
  margin-left: 200px;
  background: #dadada;
  height: 100vh;
}

.container{
  display: flex;
  padding-top: 30px;
  margin: 0 auto;
  max-width: 800px;
  text-align: center;
  align-items: center;
}

.post{
  background: #ededed;
  padding: 40px 20px;
  margin-bottom: 20px;
  color: #262626;
}

.img{
  width: 700px;
  height: 450px;
}

.post_title{
  padding-top: 20px;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.1;
}
.post_content{
  padding: 20px 0;
  line-height: 28px;
  font-size: 16px;
  color: #3f3f3f;
}
</style>