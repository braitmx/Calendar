<template>
    <form class="add-task">
        <label for="desc">Description:</label>
        <br />
        <input type="text" v-model="task.desc" required>
        <br /><br />
        <label for="startTime">StartTime:</label>
        <input type="text" placeholder="example: 12:30" v-model="fullTime.sTime" required>
        <br />
        <label for="endTime">EndTime:</label>
        <input type="text" placeholder="example: 13:30" v-model="fullTime.eTime" required>
        <br />
        <label for="period">Period:</label>
        <br />
        <select name="period" v-model="task.period">
                <option value="" selected="selected">-</option>
                <option value="Mon">Monday</option>
                <option value="Tue">Tuesday</option>
                <option value="Wed">Wednesday</option>
                <option value="Thu">Thursday</option>
                <option value="Fri">Friday</option>
                <option value="Sat">Saturday</option>
                <option value="Sun">Sunday</option>
            </select>
        <br /><br />
        <label for="category">Category:</label>
        <select name="category" v-model="task.category" required>
                <option value="Home">Home</option>
                <option value="Job">Job</option>
                <option value="Rest">Rest</option>
            </select>
        <br /><br />

        <button @click.prevent="addTask">add</button>
    </form>
</template>

<script>
    import Firebase from 'firebase'

    export default {
        data() {
            return {
                task: {
                    desc: '',
                    startTime: '',
                    endTime: '',
                    period: [],
                    category: ''
                }
            }
        },
        computed: {
            taskFormShow() {
                return this.$store.state.taskFormShow;
            },
            taskEl() {
                return this.$store.state.taskEl;
            },
            taskTime() {
                return this.$store.state.taskTime;
            },
            fullTime() {
                return this.$store.getters.fullTime;
            }
        },

        props: ['uid'],

        methods: {
            addTask: function () {

                if (this.task.desc && this.task.startTime && this.task.endTime && this.task.period && this.task.category) {

                    let cloneTask = {};

                    for (let key in this.task) {
                        cloneTask[key] = this.task[key];
                    }

                    this.$store.commit('addTaskToEl', cloneTask);

                    //first > last

                    for (let key in this.task) {

                        if (key === 'period') this.task[key] = [];
                        else this.task[key] = '';
                    }

                    this.$store.commit('renderTask', this.taskEl);

                    if (this.taskFormShow) this.$store.commit('changeVisibility');
                }
            }
        }

        /*methods: {
             addTask: function () {

                if (this.task.desc && this.task.startTime && this.task.endTime && this.task.period && this.task.category) {

                    let cloneTask = {};

                    for (let key in this.task) {
                        cloneTask[key] = this.task[key];
                    }

                    this.data.tasks.push(cloneTask);

                    //first > last
                }

                Firebase.database().ref('tasks/' + this.uid).set({
                    data: this.data.tasks
                });

                for (let key in this.task) {

                    if (key === 'period') this.task[key] = [];
                    else this.task[key] = '';
                }

                this.$store.commit('changeVisibility');
            } 
        },*/
        /*created() {

            const getTasks = Firebase.database().ref('tasks/' + this.uid + '/data');

            getTasks.on('value', (snapshot) => {

                if (snapshot.val()) {
                    this.data.tasks = snapshot.val();
                }
                else {
                    this.data.tasks = [];
                }

            });
        } */
    }
</script>

<style scoped>

</style>