
import { User } from "@/app/generated/prisma/client";
import { useEffect, useState } from "react";
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

export default function ChartsSection({ refresh }: { refresh?: number }) {
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [usersByMinute, setUsersByMinute] = useState<{ minute: string; count: number }[]>([]);

    const fetchUsers = async () => {
        const res = await fetch(`/api/users`);
        const data: { users: User[]; total: number } = await res.json();
        setUsers(data.users);
        setTotal(data.total);
    };

    const fetchUsersByMinute = async () => {
        const res = await fetch(`/api/users/by-minute`);
        const data = await res.json();
        setUsersByMinute(data.data || []);
    };

    useEffect(() => {
        fetchUsers();
        fetchUsersByMinute();
    }, [refresh]);

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-sm p-4">
                <h3 className="text-sm text-gray-500">Total Users</h3>
                <p className="text-2xl font-bold text-gray-800">{total}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="text-sm text-gray-500 mb-4">
                    Users Created Per Minute
                </h3>
                <SimpleAreaChart data={usersByMinute.map(row => ({ name: row.minute, users: row.count }))} />
            </div>
        </div>
    );
}


const SimpleAreaChart = ( { data }: { data: any[] } ) => {
    return (
        <AreaChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 0,
            }}
            onContextMenu={(_, e) => e.preventDefault()}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" niceTicks="snap125" />
            <YAxis width="auto" niceTicks="snap125" />
            <Tooltip />
            <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    );
}