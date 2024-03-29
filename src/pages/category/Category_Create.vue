<template>
  <div class="main">

  <div class="ml-15 pt-15" style="width: 300px">
    <div class="mb-5 text-h5 font-weight-bold">Создание категорий:</div>
    <v-combobox
        clearable
        v-model="title"
        label="Категория"
        :items="['Business', 'Home', 'Work', 'Chill']"
        variant="solo-filled"
    ></v-combobox>
    <button @click.prevent="createCategory" class="container_header_btn" style="border-radius: 5px">Create</button>
  </div>

  </div>

</template>

<script>
export default {
  data(){
    return{
      title: ''
    }
  },
  methods: {
    createCategory(){
      if (!this.title) return
      axios.post('http://79.174.91.91:81/api/categories', {
        title: this.title
      })
          .then(res => {
            this.title = ''
            this.$router.push({name: 'category_index.page'})
          })
    }
  }
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