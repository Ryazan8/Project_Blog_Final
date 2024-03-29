import {createRouter, createWebHistory} from "vue-router";
import Main from "../pages/Main.vue";
import Category_Index from "../pages/category/Category_Index.vue";
import Category_Edit from "../pages/category/Category_Edit.vue";
import Category_Create from "../pages/category/Category_Create.vue";
import Tag_Index from "../pages/tag/Tag_Index.vue";
import Tag_Edit from "../pages/tag/Tag_Edit.vue";
import Tag_Create from "../pages/tag/Tag_Create.vue";
import Post_Index from "../pages/post/Post_Index.vue";
import Post_Edit from "../pages/post/Post_Edit.vue";
import Post_Show from "../pages/post/Post_Show.vue";
import Post_Create from "../pages/post/Post_Create.vue";
import Login from "../pages/user/Login.vue";
import Registration from "../pages/user/Registration.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Main,
            name: 'home.page'
        },
        {
            path: '/category_index',
            component: Category_Index,
            name: 'category_index.page'
        },
        {
            path: '/category_index/category_edit/:id',
            component: Category_Edit,
            name: 'category_edit.page'
        },
        {
            path: '/category_create',
            component: Category_Create,
            name: 'category_create.page'
        },
        {
            path: '/tag_index',
            component: Tag_Index,
            name: 'tag_index.page'
        },
        {
            path: '/tag_index/tag_edit/:id',
            component: Tag_Edit,
            name: 'tag_edit.page'
        },
        {
            path: '/tag_create',
            component: Tag_Create,
            name: 'tag_create.page'
        },
        {
            path: '/post_index',
            component: Post_Index,
            name: 'post_index.page'
        },
        {
            path: '/post_index/post_edit/:id',
            component: Post_Edit,
            name: 'post_edit.page'
        },
        {
            path: '/post_index/post_show/:id',
            component: Post_Show,
            name: 'post_show.page'
        },
        {
            path: '/post_create',
            component: Post_Create,
            name: 'post_create.page'
        },
        {
            path: '/user/login',
            component: Login,
            name: 'user.login'
        },
        {
            path: '/user/registration',
            component: Registration,
            name: 'user.registration'
        },

        {
            path: '/*',
            component: Main,
            name: '404'
        }
    ]
})

router.beforeEach((to, from, next) => {

    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
        if (to.name === 'user.login' || to.name === 'user.registration') {
            return next()
        } else {
            return next({
                name: 'user.login'
            })
        }
    }

    if (to.name === 'user.login' || to.name === 'user.registration' && accessToken) {
        return next({
            name: 'home.page'
        })
    }
    next()
})

export default router