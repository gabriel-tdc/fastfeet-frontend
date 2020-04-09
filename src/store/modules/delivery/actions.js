export function deliveryPost(data) {
  return {
    type: '@delivery/DELIVERY_POST',
    payload: { data },
  };
}

export function deliveryPostSuccess() {
  return {
    type: '@delivery/DELIVERY_POST_SUCCESS',
  };
}

export function deliveryPostFailure() {
  return {
    type: '@delivery/DELIVERY_POST_FAILURE',
  };
}

export function deliveryUpdate(id, data) {
  return {
    type: '@delivery/DELIVERY_UPDATE',
    payload: { id, data },
  };
}

export function deliveryUpdateSuccess() {
  return {
    type: '@delivery/DELIVERY_UPDATE_SUCCESS',
  };
}

export function deliveryUpdateFailure() {
  return {
    type: '@delivery/DELIVERY_UPDATE_FAILURE',
  };
}

export function deliveryDelete(id) {
  return {
    type: '@delivery/DELIVERY_DELETE',
    payload: { id },
  };
}

export function deliveryDeleteSuccess(data) {
  return {
    type: '@delivery/DELIVERY_DELETE_SUCCESS',
    payload: { data },
  };
}

export function deliveryDeleteFailure() {
  return {
    type: '@delivery/DELIVERY_DELETE_FAILURE',
  };
}
