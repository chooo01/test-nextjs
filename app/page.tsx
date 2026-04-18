"use client";
import { useState } from "react";
import UsersPage from "./UI/users/user.page";
import ChartsSection from "./UI/analytics/charts.page";

export default function Home() {
  const [refreshCharts, setRefreshCharts] = useState(0);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-4">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-700">User Management</h2>
          <UsersPage onUserChanged={() => setRefreshCharts((r) => r + 1)} />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <ChartsSection refresh={refreshCharts} />
        </div>
      </div>
    </div>
  );
}
