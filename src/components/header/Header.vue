<template>
  <header id="header" class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="logo">
            <router-link to="/">Contact Book</router-link>
        </div>
        <ul>
            <li v-if="auth">
                <router-link to="/dashboard" class="nav-link" activeClass="active">Dashboard</router-link>
            </li>
            <li v-if="!auth">
                <router-link to="/signup" class="nav-link" activeClass="active">Sign Up</router-link>
            </li>
            <li v-if="!auth">
                <router-link to="/signin" class="nav-link" activeClass="active">Sign In</router-link>
            </li>
            <li v-if="auth">
                <button @click="logout" class="logout nav-link">Logout</button>  
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
        
        }
    },
    methods:{
        saveAll(){
            this.$store.dispatch('saveData');
        },
        logout(){
            this.$store.dispatch('logOut')
        }
    },
    computed:{
      auth(){
        return this.$store.getters.isAuthenticated
      }
    }
}
</script>


<style scoped>
  #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
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
  li a.router-link-active {
    color: #fa923f;
  }
</style>