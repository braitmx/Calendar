import MainPage from '../components/MainPage.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import AddTask from '../components/AddTask.vue'

export default [
    { path: '/sign-in', component: SignIn },
    { path: '/sign-up', component: SignUp },
    { path: '/calendar', component: MainPage },
    { path: '/add-task', component: AddTask },
]