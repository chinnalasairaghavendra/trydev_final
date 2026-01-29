import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import AnimatedPage from './routes/AnimatedPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import PracticePage from './pages/PracticePage';
import PracticeWorkspacePage from './pages/PracticeWorkspacePage';
import PlaceholderPage from './pages/PlaceholderPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <MainLayout>
              <AnimatedPage>
                <LandingPage />
              </AnimatedPage>
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <AnimatedPage>
                <LoginPage />
              </AnimatedPage>
            </MainLayout>
          }
        />

        <Route
          path="/register"
          element={
            <MainLayout>
              <AnimatedPage>
                <RegisterPage />
              </AnimatedPage>
            </MainLayout>
          }
        />

        <Route
          path="/courses"
          element={
            <MainLayout>
              <AnimatedPage>
                <CoursesPage />
              </AnimatedPage>
            </MainLayout>
          }
        />

        <Route element={<ProtectedRoute />}> 
          <Route
            path="/courses/:courseId"
            element={
              <MainLayout>
                <AnimatedPage>
                  <CourseDetailPage />
                </AnimatedPage>
              </MainLayout>
            }
          />
          <Route
            path="/practice"
            element={
              <MainLayout>
                <AnimatedPage>
                  <PracticePage />
                </AnimatedPage>
              </MainLayout>
            }
          />
          <Route
            path="/practice/:problemId"
            element={
              <MainLayout showFooter={false}>
                <AnimatedPage>
                  <PracticeWorkspacePage />
                </AnimatedPage>
              </MainLayout>
            }
          />
        </Route>

        <Route
          path="/mentorship"
          element={
            <MainLayout>
              <AnimatedPage>
                <PlaceholderPage title="Mentorship" />
              </AnimatedPage>
            </MainLayout>
          }
        />

        <Route
          path="/pricing"
          element={
            <MainLayout>
              <AnimatedPage>
                <PlaceholderPage title="Pricing" />
              </AnimatedPage>
            </MainLayout>
          }
        />

        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route
          path="*"
          element={
            <MainLayout>
              <AnimatedPage>
                <NotFoundPage />
              </AnimatedPage>
            </MainLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
