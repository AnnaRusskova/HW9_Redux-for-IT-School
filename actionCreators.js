import { ACTION_TYPES } from "./actionTypes";

export function createSchoolActionCreator(name, description, maxGroupsCount, maxStudentsCountPerGroup) {
    return {type: ACTION_TYPES.CREATE_IT_SCHOOL, payload: {name, description, maxGroupsCount, maxStudentsCountPerGroup}};
}

export function updateSchoolActionCreator(id, field, value) {
    return {type: ACTION_TYPES.UPDATE_IT_SCHOOL, payload: {id, field, value}};
}

export function registerCourseActionCreator(courseName, totalLessons, availableTeachersAmount) {
    return {type: ACTION_TYPES.REGISTER_COURSE, payload: {courseName, totalLessons, availableTeachersAmount}};
}

export function startLearningGroupActionCreator(courseName, teacherName, amountOfStudents) {
    return {type: ACTION_TYPES.START_LEARNING_GROUP, payload: {courseName, teacherName, amountOfStudents}};
}

export function passLessonActionCreator(courseName, lessonId) {
    return {type: ACTION_TYPES.PASS_LESSON, payload: {courseName, lessonId}};
}

export function endLearningGroupActionCreator(courseName, teacherName) {
    return {type: ACTION_TYPES.END_LEARNING_GROUP, payload: {courseName, teacherName}};
}
