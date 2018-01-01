<template>
    <div class="calendar">
        <div class="calendar__body">
            <div class="calendar__body-row">
                <div class="calendar__time-col">
                    <div class="calendar__time" v-for="item in timeSlots">{{item}} - {{item + 4}}</div>
                </div>
                <div class="calendar__day-col" v-for="slot in slots">
                    <div class="calendar__day" v-for="item in slot" v-bind:id="item.id">{{item.startTime}}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        computed: {
            timeSlots() {
                return this.$store.state.timeSlots;
            },
            slots() {
                return this.$store.getters.slots;
            }
        },
    }
</script>

<style scoped>
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
.calendar__day-col {
    width: 13.5%;
    height: 360px;
    box-sizing: border-box;
}
.calendar__day {
    width: 100%;
    height: 60px;
    padding: 5px; 
    background: lightblue;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
}

.calendar__time-col {
    width: 5.5%;
    height: 360px;
    background: lightblue;
    box-sizing: border-box;
}

.calendar__time {
    color: #8d8d8d;
    height: 60px;
    padding: 5px; 
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
}
</style>