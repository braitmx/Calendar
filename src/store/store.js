import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase';

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
        },
        activeTasksTime: []
    },

    getters: {
        fullTime: state => {
            let startTime = state.taskTime.startTime + ':00',
                endTime = state.taskTime.startTime + ':30';

            function addZero(time) {
                if (time.length === 4) {
                    time = '0' + time;
                }
                return time;
            }    
            
            startTime = addZero(startTime);
            endTime = addZero(endTime);

            return {
                sTime: startTime,
                eTime: endTime
            }
        }
    },

    mutations: {
        getMunthInfo(state, info) {
            state.curMonthInfo = info;
        },

        getTimeInterval(state, int) {
            state.curInterval = int;
        },

        generateSlots(state) {
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

        getTaskTime(state, time) {
            state.taskTime.startTime = time.startTime;
            state.taskTime.endTime = time.endTime;
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
            let week = 0;

            let addTask = function () {
                state.slots[+data.i + week].forEach(function (el) {
                     
                    // period not set (week === 0) - add task once  
                    // if period set (week != 0) - add task for every week: 7 days * 6 timeslots  
                    if (el.id === +data.id + week * 6) {
                        el.tasks.push(data.task);
                    }
                });
            };

            // add task once, period not set
            addTask();
            
            // period set 
            if (data.task.period !== '') {
                week = 7;     

                while (+data.i + week < state.curMonthInfo.daysNumber) {
                    addTask();
    
                    week += 7;
                }
            }
        },

        addActiveTasksTime(state, time) {

            // add new task start time
            state.activeTasksTime.push(time);

            function compareNumbers(a, b) {
                if (a > b) return 1;
                if (a < b) return -1;
            }

            // sort tasks time
            state.activeTasksTime.sort(compareNumbers);   
        },

        checkNearestTask(state) {
            let curTime;

            function ifTasks(func) {
                if (state.activeTasksTime.length != 0) {
                    func();   
                }
            }

            function deleteOldTasks() {
                
                // 300k ms = 5 min
                if (state.activeTasksTime[0] - curTime < 300000) {
                    state.activeTasksTime.shift();
                    ifTasks(deleteOldTasks);
                }
            }

            function getTaskAlert() {
                
                curTime = new Date().getTime();
                
                if (state.activeTasksTime[0] - curTime > 300000) {
                    var timerId = setTimeout(() => ifTasks(getTaskAlert), 1000); 
                } else {
                    alert('5 minutes to the beginning of your task!');
                    clearTimeout(timerId);

                    //delete 1-st task
                    state.activeTasksTime.shift();
                    
                    ifTasks(getTaskAlert);
                }
            }

            deleteOldTasks();
            ifTasks(getTaskAlert);
        },

        setUserSlots(state, data) {
            state.slots = data;
        }
    },

    actions: {
        getDataFromFB({ commit }) {
                console.log('Get data');

                const getSlots = Firebase.database().ref(this.uid + '/' + this.state.curMonthInfo.id + '/slots');

                getSlots.on('value', (snapshot) => {

                    if (snapshot.val()) {
                        commit('setUserSlots', snapshot.val());
                    } else {
                        console.log('data is empty');
                    }
                });

                console.log('get data: ',  snapshot.val());
        },

        sendDataToFB(state, uid) {
            Firebase.database().ref(uid + '/' + this.state.curMonthInfo.id).set({
                slots: this.state.slots
            });

        }
    }

});
