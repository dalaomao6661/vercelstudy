<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="bigimg"></div>
    <div class="newest">
      <div class="leftnew">1</div>
      <div class="rightnew">
        <div v-for="item in 6" class="new"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.container{
  width: 1437px;
  background-color: aliceblue;
}
.bigimg{
  height: 760px;
  width: 100%;
  background-color: aqua;
}
.newest{
  min-height: calc( 640px - 160px);
  width: calc(100% - 160px);
  background-color: blueviolet;
  padding: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.leftnew{
  flex: 1;
  border-radius: 10px;
  background-color: aqua;
}
.rightnew{
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.new{
  background-color: azure;
  height: 149.33px;
  width: 308px;
  border-radius: 10px;
}
</style>
