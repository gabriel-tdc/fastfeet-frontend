import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { problemCancelSuccess, problemCancelFailure } from './actions';

export function* problemCancel({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/problem/${id}/cancel-delivery/`);

    toast.success('Encomenda cancelada com sucesso!');

    yield put(problemCancelSuccess());

    history.push('/problemas');
  } catch (err) {
    toast.error('Erro ao cancelar encomenda!');
    yield put(problemCancelFailure());
  }
}

export default all([takeLatest('@problem/PROBLEM_CANCEL', problemCancel)]);
