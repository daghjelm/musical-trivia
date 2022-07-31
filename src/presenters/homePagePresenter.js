import HomePage from "../views/HomePage";
import { getAuth, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

const homePagePresenter = {
    data() {
        return {
            name: '',
            id: null,
        }
    },
    computed:{
        ...mapState(["user"])
    },
    methods: {
        ...mapActions([
            "setLoggedOut"
        ]),
        signOutUser(){
            const auth = getAuth();
            signOut(auth)
            .catch(err => {
              this.error = err.message;
            });
            this.setLoggedOut()
          },
          signInUser(form){
            const auth = getAuth();
            signInWithEmailAndPassword(auth, form.email, form.password)
            .catch(err => {
                this.error = err.message;
            })
          }
    },
    render() {
        return <div>
            <HomePage
            name = {this.user.data.name}
            signOutUser = {this.signOutUser}
            signInUser = {this.signInUser}
            loggedIn = {this.user.loggedIn}
            />
        </div>
    }
};

export default homePagePresenter;