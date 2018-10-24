<template>
    <div class="home-container">
    <div class="home-container__inner mr-auto">
        <h1 class="test">Welcome to Skills Matrix</h1>
        <p>Skills Matrix is a social network for digital team members to share their technical skills matrix so that we can support and encourage learning, development and professional advancement as an organisation.</p>
    </div>
  </div>
</template>



<style scoped lang="scss">

    .home-container{
        height: calc(100vh - 56px);
        display: flex;
        &__inner{
            margin-top: 30vh;
        }
        h1{
            //color: $red;
        }
    }

    p{
        color: #ffffff;
    }
</style>
