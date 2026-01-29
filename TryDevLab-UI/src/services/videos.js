import api from './api';

export async function getVideos() {
  const { data } = await api.get('/videos');
  return data;
}
