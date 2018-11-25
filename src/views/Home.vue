<template>
    <div class="home-container">
    <div class="home-container__inner mr-auto">
        <h1 class="test">Welcome to Skills Matrix</h1>
        <p>Skills Matrix is a social network for digital team members to share their technical skills matrix so that we can support and encourage learning, development and professional advancement as an organisation.</p>
    </div>
    <!-- <div class="container">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <hr>
            <button class="btn btn-primary" @click=" toShow = !toShow">Show Alert</button>
            <br><br>
            <transition>
                <div v-if="toShow" :class="['alert', 'alert-info','animated','element',{ red:toShow, fadeOutUp: differentClass, jello: ! differentClass }]" >This is an info box!</div>
            </transition>
            <transition name="slide">
                <div v-if="toShow" :class="['alert', 'alert-info']" >This is an info box!</div>
            </transition>

            <br><br><br><br><br><br>
            <transition name="slide" appear>
                <div v-if="toShow" :class="['alert', 'alert-info']" >This is an info box!</div>
            </transition>
            <button class="btn btn-primary" @click=" differentClass = !differentClass">Chaneg Class</button>
        </div>
    </div> -->
  </div>
</template>


<script>
    export default {
        //props:['title'],
        data(){
            return{
                toShow: true,
                differentClass: false
            }
        }

    }
</script>

<style scoped lang="scss">
    .home-container{
        height: calc(100vh - 56px);
        display: flex;
        &__inner{
            margin-top: 30vh;
        }
        h1{
            color: red;
        }
    }

    p{
        color: #ffffff;
    }
.wide{
    width: 50% !important;
}
.element{
    transition: all 2s ease-in-out;
    background: green !important;
     width: 100%;
}

.red{
    background: red;
}

.fade-enter{
    opacity: 0;
}

.fade-enter-active{
    transition: opacity 1s ease-in-out;
}

.fade-leave{
    /* opacity: 1; */
}

.fade-leave-active{
    transition: opacity 1s ease-in-out;
    opacity: 0;
}

.slide-enter{
    /* animation: slide-in 1s ease-out forwards; */
    opacity: 0;
}


.slide-enter-active{
    animation: slide-in 1s ease-out forwards;
    transition: opacity .5s;
}


.slide-leave{

}

.slide-leave-active{
    animation: slide-out 1s ease-out forwards;
    transition: opacity 1s;
     opacity: 0;
}

@keyframes slide-in {
    from{
        transform: translateY(20px);
    }
    to{
        transform: translateY(0);
    }

}

@keyframes slide-out {
    from{
        transform: translateY(0);
    }
    to{
        transform: translateY(20px);
    }

}

</style>
