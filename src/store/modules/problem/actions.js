export function problemCancel(id, data) {
  return {
    type: '@problem/PROBLEM_CANCEL',
    payload: { id, data },
  };
}

export function problemCancelSuccess() {
  return {
    type: '@problem/PROBLEM_CANCEL_SUCCESS',
  };
}

export function problemCancelFailure() {
  return {
    type: '@problem/PROBLEM_CANCEL_FAILURE',
  };
}
