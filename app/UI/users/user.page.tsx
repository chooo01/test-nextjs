'use client';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { User } from '@/types/user';
import ConfirmModal from '@/components/confirm-modal.component';
import UserForm from '@/components/user-form.component';
import ChartsSection from '../analytics/charts.page';

export default function UsersPage({ onUserChanged }: { onUserChanged?: () => void }) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchUsers = async (pageNum = page) => {
    const res = await fetch(`/api/users?page=${pageNum}&pageSize=${pageSize}`);
    console.log('Fetched users for page', res);
    const data: { users: User[]; total: number } = await res.json();
    setUsers(data.users);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleUserCreated = (success: boolean, message?: string) => {
    fetchUsers(page);
    if (onUserChanged) onUserChanged();
    if (success) {
      toast.success('Usuario creado correctamente');
    } else if (message) {
      toast.error(message);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId == null) return;
    const res = await fetch(`/api/users?id=${editingId}`, {
      method: 'PUT',
      body: JSON.stringify({ name: editName, email: editEmail }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      toast.success('Usuario actualizado');
      setEditingId(null);
      setEditName('');
      setEditEmail('');
      fetchUsers(page);
      if (onUserChanged) onUserChanged();
    } else {
      const data = await res.json();
      toast.error(data.error || 'Error actualizando usuario');
    }
  };

  const handleDelete = async (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId == null) return;
    const res = await fetch(`/api/users?id=${deleteId}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Usuario eliminado');
      if (users.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchUsers(page);
      }
      if (onUserChanged) onUserChanged();
    } else {
      const data = await res.json();
      toast.error(data.error || 'Error eliminando usuario');
    }
    setDeleteId(null);
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Toaster richColors closeButton position="top-right" />

      <ConfirmModal
        open={deleteId !== null}
        title="Confirmar eliminación"
        description="¿Estás seguro que deseas eliminar este usuario?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      <div className="bg-white rounded-2xl shadow-sm p-4 max-w-2xl mx-auto mb-6">
        <UserForm onCreated={handleUserCreated} />
        {users.map((user) => (
          <div key={user.id} className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-xl">
              👤
            </div>
            <div className="flex-1">
              {editingId === user.id ? (
                <form onSubmit={handleUpdate} className="flex gap-2">
                  <input
                    className="border px-2 py-1 rounded flex-1 text-black"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                  <input
                    className="border px-2 py-1 rounded flex-1 text-black"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                  />
                  <button className="bg-green-600 text-white px-3 py-1 rounded">
                    Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                    type="button"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </>
              )}
            </div>
            {editingId !== user.id && (
              <div className="flex gap-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded text-white"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-400 px-2 py-1 rounded text-white"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="p-4 text-center">
          <p className="text-sm text-gray-500 mb-3">
            Page {page} of {totalPages}
          </p>
          <div className="flex justify-center gap-2">
            <button
              className="px-3 py-1 rounded border text-gray-500 bg-transparent"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ←
            </button>
            <span className="px-3 py-1  bg-blue-600 text-white rounded-lg">
              {page}
            </span>
            <button
              className="px-3 py-1 text-gray-500 rounded border bg-transparent"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}