<template>
    <div>
        <h1>Calendar</h1>

        <!--Select Dates -->

        <form class="selectDates">
            <label for="month">Month:</label>
            <br />
            <select name="month" v-model="curMonth">
                <option v-for="month in mData" v-bind:value="month.id">{{month.name}}</option>
            </select>
            <br /><br />
            <label for="dateInterval">Select date interval:</label>
            <br />
            <select name="dateInterval" v-model="dateInterval">
                <option value="1">1-7</option>
                <option value="8">8-14</option>
                <option value="15">15-21</option>
                <option value="22">22-28</option>
                <option value="29">29+</option>
            </select>
            <button @click.prevent="dateChange">Ok</button>
        </form>
        <!--Select Dates -->

        <!--Calendar -->
        <div class="calendar" v-show="visible">
            <div class="calendar__head">
                <div class="calendar__head-row">
                    <div class="calendar__head-col"></div>

                    <div class="calendar__head-col" v-for="(date, i) in renderHead.date">
                        <div class="calendar__head-day">{{renderHead.day[i]}}</div>
                        <div class="calendar__head-date">{{date}}</div>
                    </div>

                </div>
            </div>

            <CalendarBody></CalendarBody>

        </div>
        <!--Calendar -->

        <button type="button" @click.prevent="showAddTaskForm">Add new task</button>

        <AddTask v-show="taskFormShow"></AddTask>

        <div class="showTasks">
            <div v-for="task in data.tasks">{{task}}</div>
        </div>

    </div>
</template>

<script>

    import Firebase from 'firebase'
    import { monthsData } from '../helpers/date'
    import { daysData } from '../helpers/date'
    import CalendarBody from './CalendarBody.vue'
    import AddTask from './AddTask.vue'


    export default {
        data() {
            return {
                mData: monthsData,
                dData: daysData,
                firstDay: '',
                curMonth: null,
                dateInterval: null,
                daysNumber: 0,
                visible: false,

                renderHead: {
                    date: [],
                    day: []
                },

                newTask: true,

                data: {
                    tasks: []
                }
            }
        },
        computed: {
            taskFormShow() {
                return this.$store.state.taskFormShow;
            }
        },
        components: {
            CalendarBody,
            AddTask
        },

        props: ['uid'],

        methods: {

            dateChange: function () {

                function empty(el) {
                    if (el) el = [];

                    return el;
                }

                if (!this.visible) this.visible = true;

                this.renderHead.day = empty(this.renderHead.day);

                if (this.curMonth && this.dateInterval) {

                    for (let i = 0; i < this.mData.length; i++) {

                        if (this.mData[i].id === +this.curMonth) {
                            this.firstDay = this.mData[i].firstDay;
                            this.daysNumber = this.mData[i].days;
                        }
                    }

                    let firstIndex = this.dData.indexOf(this.firstDay);

                    //pick up 2 parts
                    this.renderHead.day = (this.dData.slice(firstIndex, this.dData.length)).concat(this.dData.slice(0, firstIndex));

                    this.renderHead.date = empty(this.renderHead.date);

                    let endInterval = +this.dateInterval + 6;

                    if (this.dateInterval != 29) {

                        for (let i = +this.dateInterval; i <= endInterval; i++) {
                            this.renderHead.date.push(i);
                        }

                    } else {
                        if (this.daysNumber) {

                            for (let i = +this.dateInterval; i <= endInterval; i++) {
                                if (i <= this.daysNumber) this.renderHead.date.push(i);
                                else this.renderHead.date.push(i - this.daysNumber);
                            }
                        }
                    }
                }
            },

            showAddTaskForm: function () {
                if (!this.taskFormShow) this.$store.commit('changeVisibility');
            }
        },

        created() {

            this.$store.commit('genegateSlots'); 

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

input {
    margin-bottom: 20px;
}

.calendar {
    width: 100%;
    height: 700px;
}

.calendar__head {
    width: 100%;
    height: 150px;
}

.calendar__head-row {
    width: 100%;
    height: inherit;
    display: flex;
    flex-wrap: wrap;
}

.calendar__head-col {
    width: 13.5%;
    height: inherit;
    padding: 5px; 
    background: lightblue;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
}

.calendar__head-row div:first-child:not(.calendar__head-day) {
    width: 5.5%;
    box-sizing: border-box;
}

.calendar__head-day {
    font-weight: bold;
}

.calendar__head-date {
    font-size: 55px;
}

.calendar__event {
    width: 95%;
    display: inline-block;
    background-color: #029ae4;
    border-radius: 5px;
    padding: 4px;
    margin-bottom: 5px;
    color: #fff;
    box-sizing: border-box;
}

.calendar__event--green {
    background-color: #33b679;
}

.calendar__event--orange {
    background-color: #f05722;
}

</style>