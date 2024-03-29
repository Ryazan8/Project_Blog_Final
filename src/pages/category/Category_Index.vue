<template>
  <div class="main">

  <section>
    <div>
      <h1>Table Category:</h1>
      <router-link class="text-h4 mb-5" to="/category_create"><span class="mdi mdi-plus-box text-grey-darken-3"></span></router-link>
    </div>
    <div class="tbl-header">
      <table  cellpadding="0" cellspacing="0" border="0">
        <thead>
        <tr>
          <th>ID</th>
          <th>Category</th>
          <th>Tools</th>
        </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content">
      <table class="table" cellpadding="0" cellspacing="0" border="0">
        <tbody>
        <tr
            v-for="category in categories"
            :key="category.id"
        >
          <td>{{ category.id }}</td>
          <td>{{ category.title }}</td>
          <td class="d-flex"><button class="mr-3" @click.prevent="removeCategory(category.id)"><span class="mdi mdi-delete text-h5 text-red-darken-4"></span></button>
            <router-link :to="{name: 'category_edit.page', params: {id: category.id}}"><button><span class="mdi mdi-pencil text-h5 text-blue-accent-2"></span></button></router-link></td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
  </div>


</template>

<script>
import API from "../../api.js";

export default {
  data () {
    return {
      categories: []
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      API.get(' http://79.174.91.91:81/api/categories')
          .then(res => {
            this.categories = res.data
          })
    },
    removeCategory(id) {
      axios.delete(`http://79.174.91.91:81/api/categories/${id}`)
          .then(res => {
            this.categories = this.categories.filter(category => {
              return parseInt(category.id) !== parseInt(id)
            })
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

h1{
  font-size: 30px;
  color: #000;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
  margin-bottom: 15px;
}
table{
  width:100%;
  table-layout: fixed;
}
.tbl-header{
  background-color:#fff;
}
.tbl-content{
  height:300px;
  overflow-x:auto;
  margin-top: 0;
  border: 2px solid rgba(134, 134, 134, 0.3);
}
th{
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 20px;
  color: #000;
  text-transform: uppercase;
}
td{
  padding: 15px;
  text-align: left;
  vertical-align:middle;
  font-weight: 300;
  font-size: 16px;
  color: #000;
  border-bottom: solid 1px rgba(255,255,255,0.1);
}

.table tbody tr:nth-child(even) {
  background: #c7c7c7;
}

/* demo styles */

@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);
section{
  font-family: 'Roboto', sans-serif;
  padding: 50px;
}

/* for custom scrollbar for webkit browser*/

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
</style>