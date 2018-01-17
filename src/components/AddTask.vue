<template>
    <form class="add-task">
        <label for="desc">Description:</label>
        <br />
        <input type="text" v-model="task.desc" maxlength="17" required>
        <br /><br />
        <label for="startTime">StartTime:</label>
        <input type="text" :placeholder="fullTime.sTime" v-model="task.startTime" maxlength="5" required>
        <br />
        <label for="endTime">EndTime:</label>
        <input type="text" :placeholder="fullTime.eTime" v-model="task.endTime" maxlength="5" required>
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
import Firebase from "firebase";

export default {
    data() {
        return {
            task: {
                desc: "",
                startTime: "",
                endTime: "",
                period: "",
                category: "",

                showTime: function() {

                    // add zero to time    
                    let startTimeH = this.startTime.getHours(),
                        startTimeM = this.startTime.getMinutes(),
                        endTimeH = this.endTime.getHours(),
                        endTimeM = this.endTime.getMinutes();

                    function addZero(time) {
                        if (time < 10) {
                            time = '0' + time;
                        }
                        return time;
                    }    
            
                    startTimeH = addZero(startTimeH);
                    startTimeM = addZero(startTimeM);
                    endTimeH = addZero(endTimeH);
                    endTimeM = addZero(endTimeM);
                    
                    return (
                        startTimeH + ":" +
                        startTimeM + " - " +
                        endTimeH + ":" +
                        endTimeM
                    );
                }
            }
        };
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
        curMonthInfo() {
            return this.$store.state.curMonthInfo;
        },
    
        //getter
        fullTime() {
            return this.$store.getters.fullTime;
        }
    },

    props: ["uid"],

    methods: {
        addTask: function() {
            let startTime = this.task.startTime,
                endTime = this.task.endTime;

            if (this.task.desc && startTime && endTime && this.task.category) {

                function convertToDate(time, context) {
                    let year = new Date().getFullYear(),
                        month = context.curMonthInfo.id - 1, // month id from 1
                        day = +context.taskEl.i + 1,         // index from zero
                        h = time.slice(0, -3),
                        min = time.slice(3);

                    let dateTime = new Date(year, month, day, h, min);

                    return dateTime;
                }

                // base validation
                let reg = /[0-9]{2}:[0-9]{2}/;

                if (!reg.test(startTime) || !reg.test(endTime)) {
                    alert("Error: incorrect time");
                } else {
                    this.task.startTime = convertToDate(this.task.startTime, this);
                    this.task.endTime = convertToDate(this.task.endTime, this);

                    if (this.taskTime.startTime > this.task.startTime.getHours()) {
                        alert("Error: Start-time can't be lower than default value");
                    } else if ("24:00" < endTime) {
                        alert("Error: End-time can't be higher than 24");
                    } else if (this.task.endTime.getTime() - this.task.startTime.getTime() <= 0) {
                        alert("incorrect time interval!");
                    } else {
                        let cloneTask = {};

                        for (let key in this.task) {
                            cloneTask[key] = this.task[key];
                        }

                        this.$store.commit("addTaskToEl", cloneTask);
                        this.$store.commit("renderTask", this.taskEl);

                        if (this.taskFormShow) {
                            this.$store.commit("changeVisibility");
                        }
                    }
                }

                for (let key in this.task) {
                    if (key != "showTime") {
                        this.task[key] = "";
                    }
                }

            } else {
                alert("incorrect form validation");
            }
        }
    }

  /*methods: {
             addTask: function () {

                Firebase.database().ref('tasks/' + this.uid).set({
                    data: this.data.tasks
                });

                for (let key in this.task) {

                    if (key === 'period') this.task[key] = [];
                    else this.task[key] = '';
                }

                this.$store.commit('changeVisibility');
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
};
</script>

<style scoped>

</style>