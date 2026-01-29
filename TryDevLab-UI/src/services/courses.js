import api from './api';

export async function getCourses() {
  const { data } = await api.get('/courses');
  return data;
}

export async function getCourseById(courseId) {
  const { data } = await api.get(`/courses/${courseId}`);
  return data;
}
