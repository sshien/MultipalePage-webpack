<style lang='scss'>
@import url('../commom.scss');
body {
  font: Helvetica, sans-serif;
  color: #999;
}
.logo {
  width: 40px;
  height: 40px;
}
</style>

<template>
  <div>
    <h1>{{msg}}</h1>
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
  components: {
    Beader
  }
}
</script>