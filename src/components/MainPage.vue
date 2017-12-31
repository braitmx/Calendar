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
        <div class="calendar">
            <div class="calendar__head">
                <div class="calendar__head-row">
                    <div class="calendar__head-col"></div>

                    <div class="calendar__head-col" v-for="(date, i) in renderHead.date">
                        <div class="calendar__head-day">{{renderHead.day[i]}}</div>
                        <div class="calendar__head-date">{{date}}</div>
                    </div>

                </div>
            </div>
            <div class="calendar__body">
                <div class="calendar__body-row">
                    <div class="calendar__body-col">
                        <div class="calendar__body-time">00:00</div>
                    </div>
                    <div class="calendar__body-col">
                        <div class="calendar__event calendar__event--green">Two birthdays</div>
                        <div class="calendar__event calendar__event--green">Meet friends</div>
                    </div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col">
                        <div class="calendar__event">Trip to LA</div>
                    </div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                </div>

                <div class="calendar__body-row">
                    <div class="calendar__body-col">
                        <div class="calendar__body-time">04:00</div>
                    </div>
                    <div class="calendar__body-col">
                        <div class="calendar__event calendar__event--orange">Sam birthday</div>
                    </div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col">
                        <div class="calendar__event">Book Too Good at Goodbyes</div>
                    </div>
                    <div class="calendar__body-col"></div>
                </div>

                <div class="calendar__body-row">
                    <div class="calendar__body-col">
                        <div class="calendar__body-time">08:00</div>
                    </div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                    <div class="calendar__body-col"></div>
                </div>

            </div>
        </div>

        <router-link to="/add-task">
            <button type="button">Add new task</button>
        </router-link>

        <div class="showTasks">
            <div v-for="task in data.tasks">{{task}}</div>
        </div>

        <!--Calendar -->
    </div>
</template>

<script>
    import Firebase from 'firebase'
    import { monthsData } from '../helpers/date'
    import { daysData } from '../helpers/date'


    export default {
        data() {
            return {
                mData: monthsData,
                dData: daysData,
                firstDay: '',
                curMonth: null,
                dateInterval: null,
                daysNumber: 0,

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

        props: ['uid'],

        methods: {
           
            dateChange: function () {

                function empty(el) {
                    if (el) el = [];

                    return el;
                }

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

.calendar__body {
    width: 100%;
    height: 600px;
}

.calendar__body-row {
    width: 100%;
    height: 60px;
    display: flex;
    flex-wrap: wrap;
}

.calendar__body-col {
    width: 13.5%;
    height: inherit;
    padding: 5px; 
    background: lightblue;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
}

.calendar__body-row div:first-child:not(.calendar__event) {
    width: 5.5%;
    box-sizing: border-box;
}

.calendar__body-time {
    color: #8d8d8d;
}

</style>