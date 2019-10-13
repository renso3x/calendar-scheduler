import { all } from "redux-saga/effects";
import * as scheduleSaga from "./schedule.saga";

export default function* rootSaga() {
  yield all([scheduleSaga.watchfetchSchedules()]);
}
