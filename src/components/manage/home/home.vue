<template>
  <div class="home">
    <p class="home__title">欢迎进入设备点检系统</p>
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in 11" :key="item">
        <img v-bind:src="'./assets/img/img'+item+'.jpg'" alt="" class="home__img">
        <h3 class="home_info">公告 {{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style>
  .home__title{
    width: 20%;
    text-align: center;
    font-size: 20px;
    margin: 10px auto 40px;
    padding: 20px;
    border-bottom: 4px double #cccccc;
  }

  .home__img {
    width: 100%;
    height: 100%;
  }

  .el-carousel__container {
    position: relative;
    margin-bottom: 20px;
  }

  .home_info {
    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    margin-right: 10px;
    padding: 10px;
    text-align: center;
    border-bottom: 4px double #ccc;
    color: #878D99;
    font-size: 16px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
