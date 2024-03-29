<template>
  <div class="main">

  <div class="ml-15 pt-10" style="width: 300px" >
    <div class="mb-5 text-h5 font-weight-bold">Edit Category:</div>
    <div v-if="category">
      <v-combobox
          clearable
          v-model="category.title"
          label="Категория"
          :items="['Business', 'Home', 'Work', 'Chill']"
          variant="solo-filled"
      ></v-combobox>
      <button @click.prevent="updateCategory" class="container_header_btn" style="border-radius: 5px">Update</button>
    </div>

  </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      category: null,
    }
  },
  mounted() {
    this.getCategory(this.$route.params.id)
  },
  methods: {
    getCategory(id){
      axios.get(`http://79.174.91.91:81/api/categories/${id}`)
          .then(res => {
            this.category = res.data
          })
    },

    updateCategory(){
      axios.patch(`http://79.174.91.91:81/api/categories/${this.category.id}`, {
        title: this.category.title
      })
          .then(res => {
            this.category = res.data
            this.$router.push({name: 'category_index.page'})
          })
    }
  },

}
</script>

<style lang="scss" scoped>

.main{
  margin-left: 200px;
  background: #dadada;
  height: 100vh;
}

.container_header_btn{
  background: #373737;
  color: #fff;
  padding: 10px 30px;
  border-radius: 7px;
  margin-top: 5px;
  font-weight: 600;
  transition: all .3s ease-in-out;
  &:hover{
    color: #373737;
    background: #fff;

  }
}
</style>