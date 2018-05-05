<template>
  <section>
    <div class="cover"></div>
    <div class="container-fluid">
      <h1>
        <img src="../../static/logotype-withtext.png" alt="SUBACO main logotype">
      </h1>
      <p>Smart USB BAttery Charging Organizer</p>
    </div>
  </section>
</template>

<style scoped>
  section {
    position : relative;
  }
  .cover {
    background-image    : url("../../static/cover.jpg");
    background-size     : cover;
    background-position : center center;
    padding             : 0;
    width               : 100vw;
    height              : 100vh;
  }
  .container-fluid {
    color    : #9f3;
    position : absolute;
    top      : 0px;
    left     : 20px;
  }
  img {
    left      : 5%;
    max-width : 500px;
    top       : 10%;
    width     : 100%;
  }
  p {
    font-size : 25px;
  }
</style>
