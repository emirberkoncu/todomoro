import React from 'react';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold">Onayla</h2>
        <p>Bu görevi silmek istediğinizden emin misiniz?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2"
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
