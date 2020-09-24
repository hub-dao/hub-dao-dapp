<template>
  <div class="loading_screen flex">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.loading_screen {
    position: relative;
    overflow: hidden;
    width: 340px;
    height: 360px;
    margin: auto;
}
.loading_screen:before {
    content: " ";
}
</style>
