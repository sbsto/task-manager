import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        tasks: [],
        activeFilter: null,
        loading: false
    }),
    getters: {
        incompletedTasksLength(state) {
            return state.tasks.filter(task => !task.completed).length;
        },
        completedTasksLength(state) {
            return state.tasks.filter(task => task.completed).length;
        },
        filteredTasks(state) {
            if (state.activeFilter === null) {
                return state.tasks;
            }
            return state.tasks.filter(
                task => task.completed === state.activeFilter
            );
        },
        taskNumberString(state, getters) {
            const incompletedTasksLength = getters.incompletedTasksLength;
            const completedTasksLength = getters.completedTasksLength;
            const activeFilter = state.activeFilter;

            if (activeFilter === null || activeFilter === false) {
                if (incompletedTasksLength === 0) {
                    return "no tasks left";
                }
                if (incompletedTasksLength === 1) {
                    return "1 task left";
                }
                if (incompletedTasksLength > 1) {
                    return incompletedTasksLength + " tasks left";
                } else {
                    return null;
                }
            } else {
                if (completedTasksLength === 0) {
                    return "no finished tasks";
                }
                if (completedTasksLength === 1) {
                    return "1 finished task";
                }
                if (completedTasksLength > 1) {
                    return completedTasksLength + " finished tasks";
                } else {
                    return null;
                }
            }
        },
        controlButtonShown(state, getters) {
            const activeFilter = state.activeFilter;
            if ((activeFilter === null || activeFilter === false) && getters.incompletedTasksLength > 0) {
                return "allDone";
            } else if (activeFilter === true && getters.completedTasksLength > 0) {
                return "clear";
            } else {
                return null
            }
        }
    },
    mutations: {
        addTask(state, res) {
            let task = res.data
            task.id = task._id
            delete task.owner
            delete task.createdAt
            delete task.updatedAt
            delete task.__v
            delete task._id
            return state.tasks.push(task)
        },
        completeAll(state) {
            return state.tasks.forEach(task => {
                task.completed = true;
            });
        },
        removeCompleted(state) {
            return state.tasks = state.tasks.filter(task => task.completed !== true);
        },
        setActiveFilter(state, criteria) {
            return state.activeFilter = criteria.filter;
        },
        editTask(state, id) {
            state.tasks.forEach(task => {
                if (task.id === id) {
                    this.beforeEditCache = task.description;
                    task.editing = true;
                }
            });
        },
        doneEdit(state, id) {
            state.tasks.forEach(task => {
                if (task.id === id) {
                    if (task.description) {
                        task.editing = false;
                    } else {
                        this.removeTask(id);
                    }
                }
            });
        },
        cancelEdit(state, id) {
            state.tasks.forEach(task => {
                if (task.id === id) {
                    task.description = this.beforeEditCache;
                    task.editing = false;
                }
            });
        },
        removeTask(state, id) {
            state.tasks = state.tasks.filter(
                task => task.id !== id
            );
        },
        toggleCompleted(state, id) {
            state.tasks.forEach(task => {
                if (task.id === id) {
                    console.log('working...')
                    task.completed = !task.completed;
                }
            });
        },
        tasks_requested(state) {
            state.loading = true
        },
        getTasks(state, res) {
            let tasks = res.data
            tasks.map(task => {
                task.id = task._id
                delete task._id
                delete task.owner
                delete task.createdAt
                delete task.updatedAt
                delete task.__v
                task.editing = false
            })
            state.loading = false
            state.tasks = tasks
        }
    },
    actions: {
        async addTask({
            commit
        }, task) {
            commit('addTask', await axios.post('/api/tasks/create', {
                description: task.description
            }))
        },
        completeAll({
            commit,
            dispatch,
            state
        }) {
            state.tasks.forEach(task => {
                if (!task.completed) {
                    dispatch('toggleCompleted', task.id)
                        .then()
                        .catch(e => console.log(e))
                }
            })
            commit("completeAll")
        },
        removeCompleted({
            commit,
            dispatch,
            state
        }) {
            state.tasks.forEach(task => {
                if (task.completed) {
                    dispatch('removeTask', task.id)
                        .then()
                        .catch(e => console.log(e))
                }
            })
            commit("removeCompleted")
        },
        setActiveFilter({
            commit
        }, criteria) {
            commit("setActiveFilter", criteria)
        },
        editTask({
            commit
        }, id) {
            commit("editTask", id)
        },
        async doneEdit({
            commit,
            state
        }, id) {
            commit("doneEdit", id)
            let task = state.tasks.find(task => task.id === id)
            await axios.patch('/api/tasks/' + id, {
                description: task.description
            })
        },
        cancelEdit({
            commit
        }, id) {
            commit("cancelEdit", id)
        },
        async removeTask({
            commit
        }, id) {
            await axios.delete('/api/tasks/' + id)
            commit("removeTask", id)
        },
        async toggleCompleted({
            state
        }, id) {
            let task = state.tasks.find(task => task.id === id)
            await axios.patch('/api/tasks/' + id, {
                completed: !task.completed
            })
        },
        async fetchTasks({
            commit
        }) {
            commit('tasks_requested')
            commit('getTasks', await axios.get('/api/tasks/list'))
        }
    }
}