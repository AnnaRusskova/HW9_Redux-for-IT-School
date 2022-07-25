import { createStore } from 'redux';
import { reducer } from './reducer';

const initState = {
    schools: [{
        name: "Name of the school",
        description: "Descr of the school",
        maxAmountOfGroups: 5,
        maxAmountOfStudentsInGroup: 10,
        courses: [{
            courseName: 'smth', 
            totalLessons: 2, 
            availableTeachersAmount: 1
        }],
        learningGroup: [],
        endLearningGroup: [],
    }],
    selectedSchool: {name: "test", id: 1},
    history: [],
    passedLessons: [], 
}

export const store = createStore(reducer, initState);