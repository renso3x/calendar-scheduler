import initialState from "./initialState";

export const FETCH_SCHEDULE_START = "FETCH_SCHEDULE_START";
export const FETCH_SCHEDULE = "FETCH_SCHEDULE";
export const DELETE_INIT = "DELETE_INIT";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const CREATE_INIT = "CREATE_INIT";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const UPDATE_INIT = "UPDATE_INIT";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";

export const createSchedule = data => ({
  type: CREATE_INIT,
  payload: { data }
});

export const updateSchedule = data => ({
  type: UPDATE_INIT,
  payload: { data }
});

export const deleteSchedule = data => ({
  type: DELETE_INIT,
  payload: { data }
});

export default function scheduleReducer(state = initialState.schedule, action) {
  switch (action.type) {
    case CREATE_SUCCESS:
      return { ...state, records: [...state.records, action.payload] };

    case UPDATE_SUCCESS:
      return {
        ...state,
        records: state.records.map(record => {
          if (record.id === action.payload.id) {
            return action.payload;
          }
          return record;
        })
      };

    case FETCH_SCHEDULE:
      return { ...state, records: action.payload };

    case DELETE_SUCCESS:
      return {
        ...state,
        records: state.records.filter(type => type.id !== action.payload.id)
      };
    default:
      return state;
  }
}
