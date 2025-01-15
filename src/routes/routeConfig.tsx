import { Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Wishlist from "@/pages/Wishlist.tsx";
const HabitList = React.lazy(() => import('@/pages/HabitList'))
const Home = React.lazy(() => import('@/pages/Home'))

export default function AppRoutes() {
    return (
        <Suspense fallback={<CircularProgress />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/habits" element={<HabitList />} />
                <Route path="/wishlist" element={<Wishlist />}></Route>
            </Routes>
        </Suspense>
    )
}