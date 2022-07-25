/* eslint-disable no-fallthrough */
import { v4 as uuid } from "uuid";
import { ACTION_TYPES } from "./actionTypes";

const refreshState = (prevState, freshData) => ({...prevState, ...freshData});

export const reducer = (prevState, {type, payload}) => {
    switch (type) {
        case ACTION_TYPES.CREATE_IT_SCHOOL:{
            return refreshState(prevState, {
                schools: [...prevState.schools, {
                    id: uuid(),
                    name: payload.name,
                    description: payload.description,
                    maxAmountOfGroups: payload.maxAmountOfGroups,
                    maxAmountOfStudentsInGroup: payload.maxAmountOfStudentsInGroup,
                    }   
                ],
                history: [...prevState.history, `IT School ${payload.name} was created` ]

            })
        }

        case ACTION_TYPES.UPDATE_IT_SCHOOL: {
            return refreshState(prevState, {
                 schools: prevState.schools.map((school) => school.id === payload.id && {
                    ...school, [payload.field]: payload.value
                }),
                history: [...prevState.history, `Field ${payload.field} was updated to ${payload.value}` ],

                selectedSchool: {id: 1, name: "Changed", description: "test desc"}
            });
        }
      
        case "SELECT_SCHOOL": {
            return refreshState(prevState, {selectedSchool: prevState.schools.find(({id}) => id === payload.id)});
        }

        case ACTION_TYPES.PASS_LESSON: {
            return refreshState(prevState, {passedLessons: [...prevState.passedLessons, {id: payload.id, status: "passed"}],
            history: [...prevState.history, `Lesson #${payload.id} was passed` ]
        })
        }

        case ACTION_TYPES.REGISTER_COURSE:{
            if(prevState.selectedSchool){
                let updatedInfo = prevState.schools.find(({school}) => school.id === payload.id);
                let currentCourse =  updatedInfo.courses.find(course => course.courseName === payload.courseName);
                if (currentCourse === undefined) {
                    let newSchool = {...updatedInfo, courses: [...updatedInfo.courses, {courseName: payload.courseName, totalLessons: payload.totalLessons, availableTeachersAmount: payload.availableTeachersAmount}]}
                    return {...prevState, schools: prevState.schools.map(school => school.id === payload.id ? newSchool : school),
                        history: [...prevState.history, `Course ${payload.courseName} was registered` ]
                    }
                }
            }
        }

        case ACTION_TYPES.START_LEARNING_GROUP:{
            if (prevState.selectedSchool){
                let updatedInfo = prevState.schools.find(({school}) => school.id === payload.id);
                let currentGroup =  updatedInfo.learningGroup.find(group => group.courseName === payload.courseName);
                if (currentGroup === undefined){
                    let newSchool = {...updatedInfo, learningGroup: [...updatedInfo.learningGroup, 
                        {courseName: payload.courseName, teacherName: payload.teacherName, amountOfStudents: payload.amountOfStudents,}]};
                        return {...prevState, schools: prevState.schools.map(school => school.id === payload.id ? newSchool : school),
                            history: [...prevState.history, `Group ${payload.courseName} has been started` ]
                        }
                }
            }
        }

        case ACTION_TYPES.END_LEARNING_GROUP: {
            if (prevState.selectedSchool){
                let updatedInfo = prevState.schools.find(({school}) => school.id === payload.id);
                let currentEndGroup =  updatedInfo.learningGroup.find(group => group.courseName === payload.courseName);
                let updatedLearningGroup = updatedInfo.learningGroup.filter(group=> group !== payload.courseName)
                if (currentEndGroup !== undefined){
                    let newSchool = {...updatedInfo, 
                        learningGroup: updatedLearningGroup,
                        endLearningGroup:[ ...updatedInfo.endLearningGroup,
                    {courseName: payload.courseName, teacherName: payload.teacherName}]};
                    return {...prevState, schools: prevState.schools.map(school => school.id === payload.id ? newSchool : school),
                        history: [...prevState.history, `Group ${payload.courseName} has been finished`]
                    }
                }
            }
        }
    
        default: {
            return prevState;
        }
    }
};