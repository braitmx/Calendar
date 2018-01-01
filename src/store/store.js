import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        timeSlots: [0, 4, 8, 12, 16, 20]
    },

    getters: {
        slots: () => {

            let sTime = 0, index = 0, slot = [], slotsStor = [];

            for (let i = 0; i <= 6; i++) {

                for (let j = index; j < index + 6; j++) {
                    slot.push({ id: j, startTime: sTime, endTime: sTime + 4 });

                    sTime += 4;
                    sTime === 24 ? sTime = 0 : sTime;
                }



                index += 6;

                slotsStor.push(slot);

                slot = [];
            }

            return slotsStor;
        },
    },

    mutations: {
    },

    actions: {
    }

});
