import { Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
const HabitList = React.lazy(() => import('../pages/HabitList'))
/*
const HabitItem = React.lazy(() => import('../pages/HabitItem'))
*/
const Home = React.lazy(() => import('../pages/Home'))


export default function AppRoutes() {
    return (
        <Suspense fallback={<CircularProgress />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/habits" element={<HabitList />} />
                {/*<Route path="/habits:id" element={<HabitItem />} />*/}
            </Routes>
        </Suspense>
    )
}