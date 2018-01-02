import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        timeSlots: [0, 4, 8, 12, 16, 20],
        slots: [],
        taskFormShow: false
    },

    getters: {
    },

    mutations: {

        genegateSlots(state) {
            let sTime = 0, index = 0, slot = [], slotsStor = [];
            console.log('mutation done!');
            for (let i = 0; i <= 6; i++) {

                for (let j = index; j < index + 6; j++) {
                    slot.push({ id: j, startTime: sTime, endTime: sTime + 4, tasks: []});

                    sTime += 4;
                    sTime === 24 ? sTime = 0 : sTime;
                }

                index += 6;

                slotsStor.push(slot);

                slot = [];
            }

            state.slots = slotsStor; // add slots to state
        },

        changeVisibility(state) {
            state.taskFormShow = !state.taskFormShow;
        }
    },

    actions: {
    }

});
