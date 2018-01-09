<template>
    <div class="calendar">
        <div class="calendar__body">
            <div class="calendar__body-row">
                <div class="calendar__time-col">
                    <div class="calendar__time" v-for="(item, i) in timeSlots" :key="i">{{item}} - {{item + 4}}</div>
                </div>
                <div class="calendar__day-col" v-for="(slot, i) in curSlot" :data-index="curInterval + i - 1" :key="i">
                    <template v-for="item in slot">    
                        <div class="calendar__day" v-if="!item.disable" :id="item.id" @click.prevent="addTaskToSlot($event, item.startTime)" :key="item.id">
                            {{item.startTime}}
                            <div class="calendar__event" v-for="(task, i) in item.tasks" v-if="item.tasks" :key="i">
                                {{task.desc}}<br /> {{task.startTime}} - {{task.endTime}}
                            </div>
                        </div>

                        <div class="calendar__day--disabled" v-else :id="item.id" :key="item.id">
                        
                        </div>
                    </template>  
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  computed: {
    curInterval() {
      return this.$store.state.curInterval;
    },
    curSlot() {
      return this.$store.state.curSlot;
    },
    taskFormShow() {
      return this.$store.state.taskFormShow;
    },
    timeSlots() {
      return this.$store.state.timeSlots;
    },
    slots() {
      return this.$store.state.slots;
    },
    newTask() {
      return this.$store.state.newTask;
    }
  },
  methods: {
    addTaskToSlot: function(e, sTime) {
      let data = {
        id: e.target.id,
        i: e.target.parentElement.dataset.index,
        task: {}
      };

      this.$store.commit("getTaskTime", {startTime: sTime, endTime: ''});  
      this.$store.commit("addTaskElToStore", data);

      if (!this.taskFormShow) this.$store.commit("changeVisibility");
    }
  }
};
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

.calendar__day--disabled {
  width: 100%;
  height: 120px;
  padding: 5px;
  background: rgb(192, 224, 236);
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