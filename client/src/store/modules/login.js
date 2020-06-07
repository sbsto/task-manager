import axios from 'axios'

export default {
    namespaced: true,
    state: () => ({
        name: null,
        email: null,
        password: null,
        token: localStorage.getItem('token') || '',
        user: {},
        status: null,
        response: null
    }),
    getters: {
        buttonStyleSignup(state) {
            if (state.name && state.email && state.password) {
                return 'btn-active'
            } else {
                return 'btn-inactive'
            }
        },
        buttonStyleLogin(state) {
            if (state.email && state.password) {
                return 'btn-active'
            } else {
                return 'btn-inactive'
            }
        },
        isLoggedIn(state) {
            return !!state.token
        },
        authStatus(state) {
            return state.status
        }
    },
    mutations: {
        updateName(state, name) {
            return state.name = name
        },
        updateEmail(state, email) {
            return state.email = email
        },
        updatePassword(state, password) {
            return state.password = password
        },
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('/api/users/login', {
                    email: state.email,
                    password: state.password
                }).then(res => {
                    const token = res.data.token
                    const user = res.data.user
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    commit('auth_success', token, user)
                    resolve(res)
                }).catch(e => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(e)
                })
            })
        },
        signup({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('/api/users/create', {
                    name: state.name,
                    email: state.email,
                    password: state.password
                }).then(res => {
                    const token = res.data.token
                    const user = res.data.user
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    commit('auth_success', token, user)
                    resolve(res)
                }).catch(e => {
                    commit('auth_error', e)
                    localStorage.removeItem('token')
                    reject(e)
                })
            })
        },
        logout({
            commit
        }) {
            return new Promise((resolve) => {
                commit('logout')
                axios.post('/api/users/logout').then().catch(e => console.log(e))
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    }
}