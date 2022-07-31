import RegisterPage from "../views/RegisterPage";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const registerPagePresenter = {
    methods:{
        registerUser(form){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, form.email, form.password)
            .then(data => {
                const user = data.user
                updateProfile(user, {
                displayName: form.name
                })
                window.location.replace("/")  
            })
            .catch(err => {
                this.error = err.message;
            });
        }
    },
    render() {
        return <div>
            <RegisterPage
            registerUser = {this.registerUser}
            />
            </div>
    }
}

export default registerPagePresenter