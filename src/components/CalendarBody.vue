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
                return this.$store.state.slots;
            }
        },
    }
</script>

<style scoped>

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