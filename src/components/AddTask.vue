<template>
    <form class="addTask">
        <h3 class="addTask__title">Add new task</h3>    
        <label class="addTask__desc-label" for="desc">Description:</label>
        <input class="addTask__desc" type="text" v-model="task.desc" maxlength="17" required>

        <label class="addTask__start-label" for="startTime">StartTime:</label>
        <input class="addTask__start" type="text" :placeholder="fullTime.sTime" v-model="task.startTime" maxlength="5" required>

        <label class="addTask__end-label" for="endTime">EndTime:</label>
        <input class="addTask__end" type="text" :placeholder="fullTime.eTime" v-model="task.endTime" maxlength="5" required>
        
        <label class="addTask__period-label" for="period">Period:</label>
        <select class="addTask__period" name="period" v-model="task.period">
            <option class="addTask__period-val" value="" selected="selected">-</option>
            <option class="addTask__period-val" value="current">Current day</option>
        </select>

        <label class="addTask__category-label" for="category">Category:</label>
        <select class="addTask__category" name="category" v-model="task.category" required>
            <option class="addTask__category-val" value="Home">Home</option>
            <option class="addTask__category-val" value="Job">Job</option>
            <option class="addTask__category-val" value="Rest">Rest</option>
        </select>

        <button class="addTask__submit" @click.prevent="addTask">Add</button>
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
                fullTime: ""
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
                    } else if (this.taskTime.startTime + 4 === this.task.startTime.getHours() &&
                               this.task.startTime.getMinutes() > 0
                    ) {
                        alert("Error: Start-time can't be higher than End-time default value");
                    } else if ("24:00" < endTime) {
                        alert("Error: End-time can't be higher than 24");
                    } else if (this.task.endTime.getTime() - this.task.startTime.getTime() <= 0) {
                        alert("incorrect time interval!");
                    } else {
                        let cloneTask = {};

                        // set task time for render
                        this.task.fullTime = startTime + ' - ' + endTime;

                        for (let key in this.task) {
                            cloneTask[key] = this.task[key];
                        }

                        this.$store.commit("addActiveTasksTime", this.task.startTime.getTime());
                        this.$store.commit("checkNearestTask");

                        this.$store.commit("addTaskToEl", cloneTask);
                        this.$store.commit("renderTask", this.taskEl);

                        if (this.taskFormShow) {
                            this.$store.commit("changeVisibility");
                        }
                    }
                }

                for (let key in this.task) {
                        this.task[key] = "";
                }

            } else {
                alert("incorrect form validation");
            }
        }
    }
};
</script>

<style scoped>

.addTask {
    height: 130px;
}

.addTask__title {
    text-align: center;
}

.addTask__desc, .addTask__start, .addTask__end {
    height: 20px;
    border-radius: 5px;
    margin-right: 15px;
    font-size: 15px;
}

.addTask__period, .addTask__category {
    height: 25px;
    border-radius: 5px;
    margin-right: 15px;
    font-size: 15px;
}

</style>