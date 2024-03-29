<template>
  <div class="main">

    <div class="container">
      <div class="container_header">
        <h2 class="container_header_h2">
          This Is My Blog !
        </h2>
        <p class="container_header_p">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <button class="container_header_btn">
          Click here!
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main{
  margin-left: 200px;
  background: #dadada;
  height: 100vh;
}

.container{
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  &_header{
    padding-top: 100px;
    max-width: 600px;
    margin: 0 auto;
    &_h2{
      font-size: 48px;
      font-weight: 700;
      color: #373737;
    }
    &_p{
      font-size: 15px;
      color: #898989;
      padding: 25px 0;
    }
    &_btn{
      background: #fff;
      color: #373737;
      padding: 10px 30px;
      border-radius: 7px;
      margin-top: 5px;
      font-weight: 600;
      transition: all .3s ease-in-out;
      &:hover{
        background: #373737;
        color: #fff;
      }
    }
  }
}


</style>