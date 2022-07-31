<template>
    <div class = 'AuthenticationModal'>
      <b-button v-b-modal.modal-1>Login</b-button>
        <form ref="form">
            <b-modal
              id="modal-1" 
              title="Log in"
              @ok="$emit('login', form)">
                <input 
                  id="user"
                  class="form-control"
                  name="email"
                  :value = "form.email"
                  @input="event => form.email = event.target.value"
                  required
                  placeholder="email"/>
                <br>
                <input
                  id="password"
                  type="password"
                  class="form-control"
                  name="password"
                  :value = "form.password"
                  @input="event => form.password = event.target.value"
                  required
                  placeholder="password"/>
            </b-modal>
        </form>
     </div>
</template>

<script>
  export default{
    data() {
      return {
        form: {
          email: "",
          password: ""
        },
        error: null
      };
    },
  };
</script>
