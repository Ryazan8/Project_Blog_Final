<template>
  <div class="main">
    <div style="padding-top: 50px;">
      <div class="form">

        <div class="mb-5">
          <v-text-field
              v-model="title"
              :counter="20"
              :rules="nameRules"
              label="Title"
              hide-details
              required
          ></v-text-field>
        </div>
        <div class="mb-5">
          <v-text-field
              v-model="content"
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
        <div class="column-6 form-select">
          <select class="border-solid px-7 py-2" v-model="category_id">
            <option disabled>Category</option>
            <option v-for="category in categories" :value="category.id">{{ category.title }}</option>
          </select>
          <v-select
              clearable
              label="Select"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          ></v-select>
        </div>

        <div>
          <select multiple v-model="curren_tags">
            <option value="" disabled>Tag</option>
            <option v-for="tag in tags" :value="tag.id">{{ tag.title }}</option>
          </select>
          <v-select
              v-model="favorites"
              :items="states"
              hint="Pick your favorite states"
              label="Select"
              multiple
              persistent-hint
          ></v-select>
        </div>

        <button @click.prevent="addPost" class="container_header_btn mt-5" style="border-radius: 5px">Create</button>
      </div>
    </div>
  </div>


</template>

<script>

import API from "../../api.js";

export default {

  data() {
    return {
      title: '',
      content: '',
      category_id: '',
      tag_id: [],
      posts: [],
      categories: [],
      tags: [],
      curren_tags: [],
      nameRules: [
        value => {
          if (value) return true

          return 'Title is required.'
        },
        value => {
          if (value?.length <= 20) return true

          return 'Title must be less than 20 characters.'
        },
      ],
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      ],
      favorites: [],
    }

  },
  mounted() {
    this.getTags()
    this.getCategories()
  },
  methods: {
    addPost() {
      let formData = new FormData()
      this.curren_tags.forEach(tag => {
        formData.append('tags[]', tag)
      })
      formData.append('title', this.title)
      formData.append('content', this.content)
      formData.append('category_id', this.category_id)
      formData.append('image', this.image)
      axios.post('http://79.174.91.91:81/api/posts', formData)
          .then(res => {
            this.posts = res.data
          })

      this.title = ''
      this.content = ''
      this.category_id = null
      this.tag_id = null
      this.image = null
    },
    getCategories() {
      API.get('http://79.174.91.91:81/api/categories')
          .then(res => {
            this.categories = res.data
          })
    },
    getTags() {
      API.get('http://79.174.91.91:81/api/tags')
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
}

.form {
  max-width: 450px;
  padding: 40px 30px;
  border: 3px solid #262626;
  border-radius: 12px;
  margin: 0 auto;
}

input::placeholder {
  color: black;
}

.container_header_btn {
  background: #373737;
  color: #fff;
  padding: 10px 30px;
  border-radius: 7px;
  margin-top: 5px;
  font-weight: 600;
  transition: all .3s ease-in-out;

  &:hover {
    color: #373737;
    background: #fff;

  }
}
</style>