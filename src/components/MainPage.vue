<template>
    <div>
        <h1>Calendar</h1>

        <!--Set Dates -->
        <form class="setDates">
            <label class="setDates__month-l" for="month">Month:</label>
            <select class="setDates__month" name="month" v-model="curMonth">
                <option v-for="month in mData" :value="month.id" :key="month.id">{{month.name}}</option>
            </select>
            <label class="setDates__int-l" for="dateInterval">Date interval:</label>
            <select class="setDates__int" name="dateInterval" v-model="dateInterval">
                <option class="setDates__int-val" value="1" selected>1-7</option>
                <option class="setDates__int-val" value="8">8-14</option>
                <option class="setDates__int-val" value="15">15-21</option>
                <option class="setDates__int-val" value="22">22-28</option>
                <option class="setDates__int-val" value="29">29+</option>
            </select>
            <button class="setDates__submit" @click.prevent="dateChange">Ok</button>
        </form>
        <!--Set Dates -->

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
    </div>
</template>

<script>

    import Firebase from 'firebase';
    import { monthsData } from '../helpers/date';
    import { daysData } from '../helpers/date';
    import CalendarBody from './CalendarBody.vue';
    import AddTask from './AddTask.vue';

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

                newTask: true
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
                
                // show calendar
                if (!this.visible) {
                    this.visible = true;
                }

                // if the task-form isn't hide -> hide it
                if (this.taskFormShow) {
                    this.$store.commit("changeVisibility");
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

                if (this.previousMonthId !== null && this.previousMonthId !== this.curMonthInfo.id) {

                    // send slots to FB
                    this.$store.dispatch('sendDataToFB', {uid: this.uid, monthId: this.previousMonthId});

                    this.$store.commit('emptySlots');
                    this.$store.commit('emptyActiveTasks');
                }

                if (this.previousMonthId === null || this.previousMonthId !== this.curMonthInfo.id) {
                    
                    // get task slots from FB or generate it
                    this.$store.dispatch('getDataFromFB', this.uid);    
                } else {

                    // push current slot to state & re-render it
                    this.$store.commit('getCurSlot');
                }
            }
        },

        created() {

            // redirect to sign-in if not logged    
            if (!this.uid) {
                this.$router.push('/sign-in');
            }
        },          

        beforeDestroy() {

            // send slots to FB
            this.$store.dispatch('sendDataToFB', this.uid);
        }
    }
</script>

<style scoped>

.setDates {
    background: #ebebeb;
    margin-bottom: 20px;
}

.setDates__month, .setDates__int {
    margin-right: 15px;
    height: 27px;
    border-radius: 3px;
    font-size: 15px;
} 

.calendar {
  width: 100%;
  height: 820px;
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