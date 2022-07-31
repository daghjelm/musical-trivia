<template>
  <div class="container">
    <br>
    <br>
    <b-link to="/"> 
        <img src="../assets/logo.png" height="86">
      </b-link>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <br>
          <h3>Register</h3>
          <br>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form ref="form" action="#" @submit.prevent='registerUser(form)'>
              <div class="form-group-row">
                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    required
                    :value = "form.name"
                    @input="event => form.name = event.target.value"
                    placeholder="name">
                </div>
              </div>
              <br>
              <div class="form-group-row">
                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    required
                    :value = "form.email"
                    @input="event => form.email = event.target.value"
                    placeholder="Email">
                </div>
              </div>
              <br>
              <div class="form-group-row">
                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    :value = "form.password"
                    @input="event => form.password = event.target.value"
                    placeholder="password">
                </div>
              </div>
              <br>
              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-2">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  props: ['registerUser'],
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
};
</script>

<style>
  .form-group-row{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>