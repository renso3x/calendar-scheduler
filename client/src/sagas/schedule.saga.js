import http from '../services/http';
import { takeEvery, put, fork, call } from 'redux-saga/effects';
import {
  FETCH_SCHEDULE,
  DELETE_INIT,
  DELETE_SUCCESS,
  CREATE_INIT,
  CREATE_SUCCESS,
  UPDATE_INIT,
  UPDATE_SUCCESS
} from '../reducers/schedules';
import { getCurrentUser } from '../services/auth';

export function* watchfetchSchedules() {
  yield fork(fetchSchedules);
  yield takeEvery(DELETE_INIT, removeSchedule);
  yield takeEvery(CREATE_INIT, createSchedule);
  yield takeEvery(UPDATE_INIT, updateSchedule);
}

function putSchedule(record) {
  return http.put(`/api/schedule/${record.id}`, record);
}

function* updateSchedule(action) {
  try {
    const result = yield call(putSchedule, action.payload.data);
    yield put({
      type: UPDATE_SUCCESS,
      payload: result.data[0]
    });
  } catch (e) {
    console.log(e);
  }
}

function addSchedule(data) {
  return http.post(`/api/schedule/`, data);
}

function* createSchedule(action) {
  try {
    const result = yield call(addSchedule, action.payload.data);
    yield put({
      type: CREATE_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.log(e);
  }
}

function* fetchSchedules() {
  try {
    if (!getCurrentUser()) {
      return null;
    }
    const apiUrl = `/api/schedule`;
    const schedules = yield http.get(apiUrl);

    yield put({ type: FETCH_SCHEDULE, payload: schedules.data });
  } catch (e) {
    console.log(e);
  }
}

function deleteSchedule(record) {
  return http.delete(`/api/schedule/${record.id}`);
}

function* removeSchedule(action) {
  try {
    yield call(deleteSchedule, action.payload.data);
    yield put({
      type: DELETE_SUCCESS,
      payload: { id: action.payload.data.id }
    });
  } catch (e) {
    console.log(e);
  }
}
