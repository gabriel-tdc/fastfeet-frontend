import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  recipientPostSuccess,
  recipientPostFailure,
  recipientUpdateSuccess,
  recipientUpdateFailure,
  recipientDeleteSuccess,
  recipientDeleteFailure,
} from './actions';

export function* recipientPost({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, '/recipients', data);

    toast.success('Encomenda cadastrada com sucesso!');

    yield put(recipientPostSuccess());

    history.push('/destinatarios');
  } catch (err) {
    toast.error('Erro ao cadastrar destinatário ');
    yield put(recipientPostFailure());
  }
}

export function* recipientUpdate({ payload }) {
  try {
    const { data, id } = payload;

    yield call(api.put, `recipients/${id}`, data);

    toast.success('Encomenda atualizado com sucesso!');

    yield put(recipientUpdateSuccess());

    history.push('/destinatarios');
  } catch (err) {
    toast.error('Erro ao alterar destinatário');
    yield put(recipientUpdateFailure());
  }
}

export function* recipientDelete({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `recipients/${id}`);

    const data = yield call(api.get, 'recipients');

    toast.success('Encomenda removida com sucesso!');

    yield put(recipientDeleteSuccess(data));

    history.push('/destinatarios');
  } catch (err) {
    toast.error('Erro ao remover destinatário!');
    yield put(recipientDeleteFailure());
  }
}

export default all([
  takeLatest('@recipient/RECIPIENT_POST', recipientPost),
  takeLatest('@recipient/RECIPIENT_UPDATE', recipientUpdate),
  takeLatest('@recipient/RECIPIENT_DELETE', recipientDelete),
]);
