<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor03">
                <ul class="navbar-nav mr-auto">
                    <router-link to="/" class="nav-link" activeClass="active" tag="li"><a>Home</a></router-link>
                    <router-link to="/dashboard" class="nav-link" activeClass="active" tag="li"><a>Dashboard</a></router-link>
                    <router-link to="/new-user" class="nav-link" activeClass="active" tag="li"><a>New User</a></router-link>
                </ul>
                <a @click.prevent="saveAll" href="#" class="clear-btn btn blue lighten-3">Save</a>
            </div>
        </nav>
    </div>
</template>


<script>
export default {
  name: 'Header',
  data () {
    return {
     
    }
  },
  methods:{
      saveAll(){
          this.$store.dispatch('saveData');
      }
  }
}
</script>