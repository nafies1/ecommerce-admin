import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginPage: true,
    isLogin: false,
    loadingForm: false,
    currentUser: {},
    products: []
  },
  mutations: {
    changeSignForm (state, status) {
      console.log('mutation kepencet')
      state.isLoginPage = status
    },
    runLoading (state, status) {
      state.loadingForm = status
    },
    addCurrentUser (state, data) {
      state.currentUser = data
    },
    setIsLogin (state, status) {
      state.isLogin = status
    },
    storeProducts (state, data) {
      state.products = data
    }
  },
  actions: {
    login ({ commit, state }, { email, password }) {
      return axios({
        method: 'post',
        url: '/auth/login',
        data: {
          email,
          password
        }
      })
    },
    register ({ commit, state }, { name, email, password }) {
      return axios({
        method: 'post',
        url: '/auth/register',
        headers: {
          admin_secret: 'adminMantapJiwa'
        },
        data: {
          name,
          email,
          password
        }
      })
    },
    addProduct (context, data) {
      return axios({
        method: 'post',
        url: '/product',
        headers: {
          token: localStorage.token
        },
        data
      })
    },
    fetchProducts (context) {
      return axios({
        method: 'get',
        url: '/product',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit('storeProducts', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    deleteProduct (context, id) {
      return axios({
        method: 'delete',
        url: `/product/${id}`,
        headers: {
          token: localStorage.token
        }
      })
    },
    updateProduct (context, payload) {
      const { data, id } = payload
      return axios({
        method: 'put',
        url: `/product/${id}`,
        headers: {
          token: localStorage.token
        },
        data
      })
    },
    uploadImage (context, payload) {
      const photoFormData = new FormData()
      photoFormData.append('file', payload)
      return axios({
        method: 'post',
        url: '/product/upload',
        headers: {
          'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
        },
        data: photoFormData
      })
    }
  },
  modules: {
  }
})
