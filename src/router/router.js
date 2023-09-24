import MainPage from '@/pages/MainPage.vue';
import SettingsPage from '@/pages/SettingsPage';
import PetsPage from '@/pages/PetsPage';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/settings',
        component: SettingsPage,
    },
    {
        path: '/pets',
        component: PetsPage,
    },
    {
        path: '/signUp',
        component: SignUp,
    },
    {
        path: '/signIn',
        component: SignIn,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;