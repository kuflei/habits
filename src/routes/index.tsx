import { Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = React.lazy(() => import('../pages/Dashboard'))
const HabitList = React.lazy(() => import('../pages/HabitList'))
/*
const HabitItem = React.lazy(() => import('../pages/HabitItem'))
*/
const Home = React.lazy(() => import('../pages/Home'))
const Profile = React.lazy(() => import('../pages/Profile'))
const Settings = React.lazy(() => import('../pages/Settings'))

export default function AppRoutes() {
    return (
        <Suspense fallback={<CircularProgress />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/habits" element={<HabitList />} />
                {/*<Route path="/habits:id" element={<HabitItem />} />*/}
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Suspense>
    )
}