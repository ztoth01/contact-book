<template>
  <div id="signup ">
    <div class="signup-form mx-auto col-md-8">
      <form @submit.prevent="onSubmit">
        <!-- <span>{{ $v }}</span> -->

        <div class="input">
          <label for="email">Name</label>
          <input
                  type="text"
                  id="name"
                  @blur="$v.name.$touch()"
                  v-model="name">
          <!-- <p v-if="!$v.name.name">Please enter your name.</p>
          <p v-if="!$v.name.required">Required.</p> -->
        </div>
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  @blur="$v.email.$touch()"
                  v-model="email">
          <p v-if="!$v.email.email">Please provide a valid email address.</p>
          <p v-if="!$v.email.required">Required.</p>
        </div>
        <!-- <div class="input">
          <label for="age">Your Age</label>
          <input
                  type="number"
                  id="age"
                  v-model.number="age">
        </div> -->
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  @blur="$v.password.$touch()"
                  v-model="password">
          <p v-if="!$v.password.minLen">Please use a password at least 6 characters long</p>
          <p v-if="!$v.password.required">Required.</p>
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  @blur="$v.confirmPassword .$touch()"
                  v-model="confirmPassword">
          <p v-if="!$v.confirmPassword.sameAs">Please doesn't match</p>
          <p v-if="!$v.confirmPassword.required">Required.</p>
        </div>
        <!-- <div class="hobbies">
          <h3>Add some Hobbies</h3>
          <button @click="onAddHobby" type="button">Add Hobby</button>
          <div class="hobby-list">
            <div
                    class="input"
                    v-for="(hobbyInput, index) in hobbyInputs"
                    :key="hobbyInput.id">
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                      type="text"
                      :id="hobbyInput.id"
                      v-model="hobbyInput.value">
              <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
            </div>
          </div>
        </div> -->
        <div class="input">
          <img v-if="imageUrl !== ''" :src="imageUrl" title="profile image"/>
          <button @click.prevent="uploadImage" class="btn btn-info">Upload Profile Image</button>
          <input @change="onFileSelected" style="display: none;" type="file" ref="fileInput" accept="image/*">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        name:'',
        email: '',
        password: '',
        confirmPassword: '',
        //hobbyInputs: [],
        profilePicture: null,
        imageUrl:'',
        skillsMatrix:0
      }
    },
    validations: {
      email: {
        required,
        email
      },
      name: {
        required,
        name
      },
      password:{
          required,
          minLen: minLength(6)
      },
      confirmPassword:{
         sameAs: sameAs(vm =>{
           return vm.password
         })
      }
    },
    methods: {
      onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.hobbyInputs.push(newHobby)
      },
      onFileSelected(event){
        const files = event.target.files
        const fileName = files[0].name
        if(fileName.lastIndexOf('.') <= 0){
          return alert('Please make sure you use a valid file type')
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load',()=>{
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.profilePicture = files[0]
        //this.profilePicture = event.target.files[0]
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },
      uploadImage(){
        this.$refs.fileInput .click()
      },
      onSubmit () {
        const formData = {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          //hobbies: this.hobbyInputs.map(hobby => hobby.value),
          profilePicture: this.profilePicture,
          skillsMatrix:0
        }
        this.$store.dispatch('singUp', formData);
      }
    }
  }
</script>

<style scoped>
  .signup-form {
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
    color: red !important;
  }
  .signup-form label{
      color: white;
  }
  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    /* color: #4e4e4e; */
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input.invalid label {
    color: red;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>



