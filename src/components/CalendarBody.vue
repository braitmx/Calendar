<template>
    <div class="calendar">
        <div class="calendar__body">
            <div class="calendar__body-row">
                <div class="calendar__time-col">
                    <div class="calendar__time" v-for="item in timeSlots">{{item}} - {{item + 4}}</div>
                </div>
                <div class="calendar__day-col" v-for="(slot, i) in slots" v-bind:data-index="i">
                    <div class="calendar__day" v-for="item in slot" v-bind:id="item.id" @click.prevent="addTaskToSlot">
                        {{item.startTime}}
                        <div class="calendar__event" v-for="task in item.tasks" v-if="item.tasks">
                            {{task.desc}}<br /> {{task.startTime}} - {{task.endTime}}
                        </div>
                    </div>
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
        methods: {
            addTaskToSlot: function (e) {
                let data = {
                    id: e.target.id,
                    i: e.target.parentElement.dataset.index,
                    task: {}
                };

                this.$store.dispatch('newTaskCreated').then((newTask) => {

                    if (Object.keys(newTask).length != 0) {

                        data.task = newTask;
                        this.$store.commit('renderTask', data);
                    }
                });
            }
        }
    }
</script>

<style scoped>

.calendar__body {
    width: 100%;
    height: 720px;
}

.calendar__body-row {
    width: 100%;
    height: 120px;
    display: flex;
    flex-wrap: wrap;
}
.calendar__day-col {
    width: 13.5%;
    height: 720px;
    box-sizing: border-box;
}
.calendar__day {
    width: 100%;
    height: 120px;
    padding: 5px; 
    background: lightblue;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
}

.calendar__time-col {
    width: 5.5%;
    height: 720px;
    background: lightblue;
    box-sizing: border-box;
}

.calendar__time {
    color: #8d8d8d;
    height: 120px;
    padding: 5px; 
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
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