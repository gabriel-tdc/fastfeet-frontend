import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function delivery(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@delivery/DELIVERY_POST': {
        draft.loading = true;
        break;
      }
      case '@delivery/DELIVERY_POST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@delivery/DELIVERY_POST_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@delivery/DELIVERY_UPDATE': {
        draft.loading = true;
        break;
      }
      case '@delivery/DELIVERY_UPDATE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@delivery/DELIVERY_UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@delivery/DELIVERY_DELETE': {
        draft.loading = true;
        break;
      }
      case '@delivery/DELIVERY_DELETE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@delivery/DELIVERY_DELETE_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
