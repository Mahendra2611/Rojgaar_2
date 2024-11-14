import React from 'react';

const DeleteConfirmation = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
        <h2 className="text-lg font-bold">Are you sure?</h2>
        <p>Do you really want to delete this job? This process cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            No
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
