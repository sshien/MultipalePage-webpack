


<style lang='scss'>
@import url('./index.scss');
@import url('../commom.scss');


$themeColor: #fff;
$themeBgc: green;

body {
  font: Helvetica, sans-serif;
  color: $themeColor;
  background-color: $themeBgc;
  .logo {
    width: 400px;
    height: 400px;
    background-color: green;
  }
  .show{
    width: 200px;
    height: 200px;
    background-color: red;
    -vendor-animation-duration: 3s;
    -vendor-animation-delay: 2s;
    -vendor-animation-iteration-count: infinite;
  }

}

</style>

<template>
  <div>
    <h1 class="font-color">{{msg}}</h1>
    <div class="logo">点击</div>
    <div class="test"></div>
    <div class="show">我爱你</div>
    <Beader></Beader>
  </div>
</template>

<script>
import Beader from '../components/header/header'
export default {
  data () {
    return {
      msg: 'Hello from another module!'
    }
  },
  methods:{
    testCick()=>{
      var animateNode = document.querySelector('.show');
      animateNode.addClass('animated bounceOutLeft')
    }
  },
  components: {
    Beader
  }
}
</script>