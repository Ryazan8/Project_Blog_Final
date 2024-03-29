<template>
  <div class="main">
    <div class="container">
      <div v-if="post" class="post">


        <div class="mb-5">
          <v-text-field
              v-model="post.title"
              :counter="20"
              :rules="nameRules"
              label="Title"
              hide-details
              required
          ></v-text-field>
        </div>
        <div class="mb-5">
          <v-text-field
              v-model="post.content"
              :counter="10"
              :rules="nameRules"
              label="Content"
              hide-details
              required
          ></v-text-field>
        </div>

        <div>
          <v-file-input @change="setImage" label="File input"></v-file-input>
        </div>

        <div class="d-flex justify-space-between mt-5">

            <div class="column-6 form-select">
              <select class="border-solid px-7 py-2" v-model="post.category_id">
                <option value="" disabled>Category</option>
                <option v-for="category in categories" :value="category.id">{{ category.title }}</option>
              </select>
            </div>


          <div>
            <select multiple v-model="curren_tags">
              <option value="" disabled>Tag</option>
              <option v-for="tag in tags" :value="tag.id">{{ tag.title }}</option>
            </select>
          </div>
        </div>


        <div class="mt-5" @click.prevent="editPost"><span
            class="mdi mdi-content-save-outline text-grey-darken-3 text-h4 "></span></div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      sum_tags: [],
      curren_tags: [],
      title: '',
      content: '',
      image: null,
      category_id: '',
      categories: [],
      tags: [],
      tag_id: '',
      category: '',
      post: null
    }
  },
  mounted() {
    this.getTags()
    this.getCategories()
    this.getPostShow(this.$route.params.id)
  },

  methods: {
    editPost() {
      let formData = new FormData()
      formData.append('title', this.post.title)
      formData.append('content', this.post.content)
      formData.append('category_id', this.post.category.id)

      this.curren_tags.forEach(tag => {
        formData.append('tags[]', tag)
      })
      formData.append('image', this.image)
      formData.append('_method', 'patch')
      axios.post(`http://79.174.91.91:81/api/posts/${this.post.id}`, formData)
          .then(res => {
            this.posts = res.data
          })
      console.log(this.post)

    },
    getPostShow(id) {
      axios.get(`http://79.174.91.91:81/api/posts/${id}`)
          .then(res => {
            this.post = res.data
            this.curren_tags = this.post.tags.map(tag => tag.id)
          })
    },

    getCategories() {
      axios.get(`http://79.174.91.91:81/api/categories`)
          .then(res => {
            this.categories = res.data
          })
    },
    getTags() {
      axios.get('http://79.174.91.91:81/api/tags')
          .then(res => {
            this.tags = res.data
          })
    },
    setImage(e) {
      this.image = e.target.files[0]
      console.log(e.target.files[0])
    }
  }
}
</script>

<style scoped>

.main {
  margin-left: 200px;
  background: #dadada;
  height: 100vh;
  padding-top: 50px;
}

.container {
  max-width: 800px;
  text-align: center;
  margin-left: 250px;
  align-items: center;
}

.post {
  background: #ededed;
  padding: 20px 40px;
  margin-bottom: 20px;
  color: #262626;
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