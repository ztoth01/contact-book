<template>
  <header id="header" class="">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="logo">
            <router-link to="/">Skills Matrix</router-link>
        </div>
        <ul>
            <li>
                <router-link to="/skills-matrix" class="nav-link" activeClass="active">Skills Matrix</router-link>
            </li>
            <li>
                <router-link to="/developers" class="nav-link" activeClass="active">Developers</router-link>
            </li>
            <li :class="{'is--hidden': auth }">
                <router-link v-if="!auth" to="/signup" class="nav-link" activeClass="active">Sign Up</router-link>
            </li>
            <li :class="{'is--hidden': auth }">
                <router-link v-if="!auth" to="/signin" class="nav-link" activeClass="active">Sign In</router-link>
            </li>
            <li :class="{'is--hidden': !auth }">
                <router-link v-if="auth" to="/profile" class="nav-link" activeClass="active">My profile</router-link>
            </li>
            <li :class="{'is--hidden': !auth }">
                <button v-if="auth" @click="logout" class="logout nav-link">Logout</button>
            </li>
        </ul>
    </nav>
  </header>
</template>


<script>
export default {
    name: 'Header',
    data () {
        return {
            red: true
        }
    },
    methods:{
        saveAll(){
            this.$store.dispatch('saveData');
        },
        logout(){
            //this.$store.dispatch('userHasLoggedOut');
            this.$store.dispatch('logOut');
        }
    },
    computed:{
        auth(){
            return this.$store.getters.isAuthenticated;
        }
    },
}
</script>


<style scoped>
  #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  .is--hidden{
      display: none;
  }

  .logo {
    font-weight: bold;
    color: white;
  }
  .logout{
    background-color: transparent;
    border: none;
    font: inherit;
    color: #ffffff;
    cursor: pointer;
  }
  .logo a {
    text-decoration: none;
    color: white;
  }

  nav {
    height: 100%;
    width: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

    li a:hover,
    li a:active,
    li a.active,
    li a.router-link-active {
    color: #fa923f;
  }
</style>