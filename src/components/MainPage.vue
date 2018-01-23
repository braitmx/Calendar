<template>
    <div>
        <h1>Calendar</h1>

        <!--Select Dates -->
        <form class="selectDates">
            <label for="month">Month:</label>
            <br />
            <select name="month" v-model="curMonth">
                <option v-for="month in mData" :value="month.id" :key="month.id">{{month.name}}</option>
            </select>
            <br /><br />
            <label for="dateInterval">Date interval:</label>
            <br />
            <select name="dateInterval" v-model="dateInterval">
                <option value="1" selected>1-7</option>
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

                    <div class="calendar__head-col" v-for="(date, i) in renderHead.date" :key="i">
                        <div class="calendar__head-day">{{renderHead.day[i]}}</div>
                        <div class="calendar__head-date">{{date}}</div>
                    </div>

                </div>
            </div>

            <CalendarBody></CalendarBody>

        </div>
        <!--Calendar -->

        <AddTask v-show="taskFormShow"></AddTask>

        <div class="showTasks">
            <div v-for="(task, i) in data.tasks" :key="i">{{task}}</div>
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
            curMonthInfo() {
                return this.$store.state.curMonthInfo;
            },
            previousMonthId() {
                return this.$store.state.previousMonthId;
            },
            slots() {
                return this.$store.state.slots;
            },
            curSlot() {
                return this.$store.state.curSlot;
            },
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
                    if (el) {
                        el = [];
                    }

                    return el;
                }

                if (!this.visible) {
                    this.visible = true;
                }

                this.renderHead.day = empty(this.renderHead.day);

                if (this.curMonth && this.dateInterval) {

                    for (let i = 0; i < this.mData.length; i++) {

                        if (this.mData[i].id === +this.curMonth) {
                            this.firstDay = this.mData[i].firstDay;
                            this.daysNumber = this.mData[i].days;
                            
                            // set prev Month Id
                            if (this.curMonthInfo.id) {
                                this.$store.commit('getPreviousMonthId', this.curMonthInfo.id);
                            }

                            this.$store.commit('getMunthInfo', {
                                id: this.mData[i].id,
                                month: this.mData[i].name,
                                daysNumber: this.daysNumber
                            });
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
                                if (i <= this.daysNumber) {
                                    this.renderHead.date.push(i);
                                } else { 
                                    this.renderHead.date.push(i - this.daysNumber);
                                }
                            }
                        }
                    }
                }
                
                this.$store.commit('getTimeInterval', +this.dateInterval);

                // get task slots from FB
                //this.$store.dispatch('getDataFromFB');
                
                if (this.previousMonthId !== null && this.previousMonthId !== this.curMonthInfo.id) {
                    this.$store.commit('emptySlots');
                }
                
                if (this.slots.length === 0) {
                    this.$store.commit('generateSlots');
                } else {

                    // send slots to FB
                    // this.$store.dispatch('sendDataToFB', this.uid);
                }

                this.$store.commit('getCurSlot');
            }
        },

        created() {
        }
    }
</script>

<style scoped>
input {
  margin-bottom: 20px;
}

.calendar {
  width: 100%;
  height: 900px;
}

.calendar__head {
  width: 100%;
  height: 100px;
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
</style>