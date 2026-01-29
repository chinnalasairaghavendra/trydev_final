import api from './api';

export async function runCode(payload) {
  const { data } = await api.post('/submissions/run', payload);
  return data;
}

export async function submitCode(payload) {
  const { data } = await api.post('/submissions/submit', payload);
  return data;
}
