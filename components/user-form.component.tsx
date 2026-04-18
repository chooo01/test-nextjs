'use client';

import { console } from 'inspector';
import { useState } from 'react';
import { toast } from 'sonner';

export default function UserForm({ onCreated }: { onCreated: (success: boolean, message?: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      let errorMsg = 'Error desconocido';
      try {
        const data = await res.json();
        errorMsg = data.error || errorMsg;
      } catch { }
      toast.error(errorMsg);
      onCreated(false, errorMsg);
      return;
    }

    setName('');
    setEmail('');
    toast.success('Usuario creado correctamente');
    onCreated(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-6">
      <input
        className="border px-2 py-1 text-black rounded flex-1"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      required
      />
      <input
        className="border px-2 py-1 text-black rounded flex-1"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        type="email"
      />
      <button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">
        Add
      </button>
    </form>
  );
}
