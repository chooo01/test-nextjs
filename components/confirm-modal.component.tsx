import React from 'react';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ open, title = 'Confirmar acción', description = '¿Estás seguro que deseas continuar?', onConfirm, onCancel }: ConfirmModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-xs">
        <h2 className="text-lg font-bold mb-2 text-black">{title}</h2>
        <p className="mb-4 text-black">{description}</p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-1 rounded bg-black text-white" onClick={onCancel}>Cancelar</button>
          <button className="px-4 py-1 rounded bg-red-600 text-white" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
