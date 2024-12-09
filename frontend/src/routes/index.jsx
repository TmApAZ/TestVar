import React from 'react';
import { Routes, Route } from 'react-router-dom';

// LandingPage
import LandingPage from '../view/Landing/index';

// Authenticaton
import RegisterForm from '../view/Authentication/Register';
import Login from '../view/Authentication/Login';

// System routes
import CreateCard from '../view/MyFlashcardSet/CreateCardPack';
import CardSet from '../view/MyFlashcardSet/CardPacks';
import CardDetails from '../view/MyFlashcardSet/CardPackDetails';

// Dashboard Nav bar
import DashboardNav from '../NavBar/dashboardNav';

//Dashboard
import Dashboard from '../view/Dashboard/index'

import Profilenw from '../view/Authentication/ProfilePage'

import Updaaeprofile from '../view/Authentication/UpdateProfile'

import UpdateFlashcard from '../view/MyFlashcardSet/UpdateCardPack';

import AllCards from '../view/MyFlashcardSet/AllFlashcards'
import AllCardsdetails from '../view/MyFlashcardSet/FlashcardSetDetails'

import SeeAllNotes from '../view/Dashboard/seeNotes'

// Admin routes
import AdminDashbaord from '../view/AdminDashbaord/index';
import AddUsers from '../view/Authentication/AdminaddUser/addUser';

// Comming soon
import Comming_page from '../view/Commingsoon/index'

// Protected Layout Component
const ProtectedLayout = ({ children }) => {
  return (
    <>
      <DashboardNav />
      <div style={{ marginTop: '64px' }}>
        {children}
      </div>
    </>
  );
};

function AppRoutes() {
  return (
    <Routes>
      {/* Landing */}
      <Route
        path="/"
        element={
          <LandingPage />
        }
      />

      {/* Authentication routes */}
      <Route
        path="/login"
        element={
          <Login />
        }
      />

      <Route
        path="/register"
        element={
          <RegisterForm />
        }
      />

      <Route
        path="/profilenw"
        element={
          <Profilenw />
        }
      />
      <Route
        path="/upprofilenw"
        element={
          <Updaaeprofile />
        }
      />

      {/* Profile routes */}
      <Route
        path="/profile"
        element={
          <DashboardNav />
        }
      />

      {/* System roues */}
      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/createcard"
        element={
          <ProtectedLayout>
            <CreateCard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/cards/update/:id"
        element={
          <ProtectedLayout>
            <UpdateFlashcard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/cards"
        element={
          <ProtectedLayout>
            <CardSet />
          </ProtectedLayout>
        }
      />

      <Route
        path="/all-cardsnw"
        element={
          <ProtectedLayout>
            <AllCards />
          </ProtectedLayout>
        }
      />

      <Route
        path="/cards/:id"
        element={
          <ProtectedLayout>
            <CardDetails />
          </ProtectedLayout>
        }
      />
      <Route
        path="/allcards/:id"
        element={
          <ProtectedLayout>
            <AllCardsdetails />
          </ProtectedLayout>
        }
      />

      <Route
        path="/seenotes"
        element={
          <ProtectedLayout>
            <SeeAllNotes />
          </ProtectedLayout>
        }
      />

      {/* Admin Routes */}


      <Route
        path="/admin"
        element={
          <AdminDashbaord />
        }
      />

      <Route
        path="/adduser"
        element={
          <AddUsers />
        }
      />

      {/* Comming soon page */}
      <Route
        path="/commingsoon"
        element={
          <Comming_page />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
