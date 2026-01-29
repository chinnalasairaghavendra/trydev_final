import api from './api';

export async function getProblems() {
  const { data } = await api.get('/problems');
  return data;
}

export async function getProblemById(problemId) {
  const { data } = await api.get(`/problems/${problemId}`);
  return data;
}
