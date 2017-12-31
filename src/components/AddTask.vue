<template>
    <form class="add-task">
        <label for="desc">Description:</label>
        <br />
        <textarea name="desc" id="desc" cols="30" rows="10" v-model="task.desc"></textarea>
        <br /><br />
        <label for="startTime">StartTime:</label>
        <input type="text" placeholder="example: 02.09 12:40" required v-model="task.startTime">
        <br />
        <label for="endTime">EndTime:</label>
        <input type="text" placeholder="example: 02.09 13:20" required v-model="task.endTime">
        <br />
        <label for="period">Periodicity:</label>
        <br />
        <select name="period" multiple v-model="task.period">
                <option value="">-</option>
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
        <select name="category" v-model="task.category">
                <option value="Home">Home</option>
                <option value="Job">Job</option>
                <option value="Rest">Rest</option>
                <option value="Learning">Learning</option>
            </select>
        <br /><br />
        <router-link to="/calendar">
            <button @click.prevent="addTask">add</button>
        </router-link>
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
                },

                data: {
                    tasks: []
                }
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
            }
        },
        created() {

            const getTasks = Firebase.database().ref('tasks/' + this.uid + '/data');

            getTasks.on('value', (snapshot) => {

                if (snapshot.val()) {
                    this.data.tasks = snapshot.val();
                }
                else {
                    this.data.tasks = [];
                }

            });
        }
    }
</script>

<style scoped>

</style>