<template>
    <div class="jumbotron registry-form mr-auto">
        <h1>This is the registry form page wrapper.</h1>
        <RegistryFormPage />
        <RegistryFormPage />
        <RegistryFormPage />
    </div>
</template>


<script>

import { mapGetters } from 'vuex';
import RegistryFormPage from './RegistryFormPage';

export default {
    name: 'SkillRegistryForm',
    components:{
        RegistryFormPage
    },
    ...mapGetters({

            }),
}
</script>


<style scoped lang="scss">
    .registry-form{
        color: #ffffff;
        z-index: 100;
        position: absolute;
        width: 80%;
    }

</style>