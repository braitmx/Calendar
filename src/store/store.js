import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        timeSlots: [0, 4, 8, 12, 16, 20],
        slots: [],
        taskFormShow: false,
        taskEl: {}
    },

    getters: {
    },

    mutations: {

        genegateSlots(state) {
            // add slots to state

            let sTime = 0, index = 0, slot = [], slotsStor = [];

            for (let i = 0; i <= 6; i++) {

                for (let j = index; j < index + 6; j++) {
                    slot.push({ id: j, startTime: sTime, endTime: sTime + 4, tasks: [] });

                    sTime += 4;
                    sTime === 24 ? sTime = 0 : sTime;
                }

                index += 6;

                slotsStor.push(slot);

                slot = [];
            }

            state.slots = slotsStor;
        },

        changeVisibility(state) {
            state.taskFormShow = !state.taskFormShow;
        },

        addTaskElToStore(state, el) {
            state.taskEl = el;
        },

        addTaskToEl(state, task) {
            state.taskEl.task = task;
        },

        renderTask(state, data) {
            
            state.slots[data.i].forEach(function (el) {
                if (el.id === +data.id) el.tasks.push(data.task);
            });
        }
    },

    actions: {
    }

});
