import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        curMonthInfo: {},
        curInterval: null,
        timeSlots: [0, 4, 8, 12, 16, 20],
        slots: [],
        curSlot: [],
        taskFormShow: false,
        taskEl: {},

        taskTime: {
            startTime: '',
            endTime: ''
        }
    },

    getters: {
    },

    mutations: {
        getMunthInfo(state, info) {
            state.curMonthInfo = info;
        },

        getTimeInterval(state, int) {
            state.curInterval = int;
        },

        genegateSlots(state) {
            // add slots to state

            let sTime = 0, index = 0, slot = [], slotsStor = [], daysNumber = state.curMonthInfo.daysNumber;

            for (let i = 1; i <= 35; i++) {

                for (let j = index; j < index + 6; j++) {

                    if (i <= daysNumber) {
                        slot.push({ id: j, startTime: sTime, endTime: sTime + 4, tasks: [] });

                        sTime += 4;
                        sTime === 24 ? sTime = 0 : sTime;
                    }
                    else slot.push({ id: j, disable: true });

                }

                index += 6;

                slotsStor.push(slot);

                slot = [];
            }

            state.slots = slotsStor;
        },

        getCurSlot(state) {
            let int = +state.curInterval,
                slots = state.slots;

            state.curSlot = [];

            for (let i = int; i <= int + 6; i++) {
                
                state.curSlot.push(slots[i - 1]);
            }
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
