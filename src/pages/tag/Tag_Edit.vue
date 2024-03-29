<template>
  <div class="main">

    <div class="ml-15 pt-10" style="width: 300px" >
      <div class="mb-5 text-h5 font-weight-bold">Edit Tag:</div>
      <div v-if="tag">
        <v-combobox
            clearable
            v-model="tag.title"
            label="Категория"
            :items="['job', 'relax', 'training', 'home']"
            variant="solo-filled"
        ></v-combobox>
        <button @click.prevent="updateTag" class="container_header_btn" style="border-radius: 5px">Update</button>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      tag: null,
    }
  },
  mounted() {
    this.getTag(this.$route.params.id)
  },
  methods: {
    getTag(id){
      axios.get(`http://79.174.91.91:81/api/tags/${id}`)
          .then(res => {
            this.tag = res.data
          })
    },

    updateTag(){
      axios.patch(`http://79.174.91.91:81/api/tags/${this.tag.id}`, {
        title: this.tag.title
      })
          .then(res => {
            this.tag = res.data
            this.$router.push({name: 'tag_index.page'})
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