import React, { useState } from 'react';
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from '../integrations/supabase/index.js';
import Modal from 'react-modal';

const Venues = () => {
  const { data: venues, isLoading, isError } = useVenues();
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();

  const [newVenue, setNewVenue] = useState({ name: '', capacity: '', type: '' });
  const [editingVenue, setEditingVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddVenue = () => {
    addVenue.mutate(newVenue);
    setNewVenue({ name: '', capacity: '', type: '' });
    setIsModalOpen(false);
  };

  const handleUpdateVenue = () => {
    updateVenue.mutate(editingVenue);
    setEditingVenue(null);
    setIsModalOpen(false);
  };

  const handleDeleteVenue = (id) => {
    deleteVenue.mutate(id);
  };

  const openModal = (venue = null) => {
    setEditingVenue(venue);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingVenue(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading venues</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Venues</h1>
      <button onClick={() => openModal()} className="btn btn-primary mb-4">Add Venue</button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td>{venue.name}</td>
              <td>{venue.capacity}</td>
              <td>{venue.type}</td>
              <td>
                <button onClick={() => openModal(venue)} className="btn btn-secondary mr-2">Edit</button>
                <button onClick={() => handleDeleteVenue(venue.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Venue Modal">
        <h2>{editingVenue ? 'Edit Venue' : 'Add Venue'}</h2>
        <input
          type="text"
          placeholder="Venue Name"
          value={editingVenue ? editingVenue.name : newVenue.name}
          onChange={(e) => editingVenue ? setEditingVenue({ ...editingVenue, name: e.target.value }) : setNewVenue({ ...newVenue, name: e.target.value })}
          className="input input-bordered mr-2"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={editingVenue ? editingVenue.capacity : newVenue.capacity}
          onChange={(e) => editingVenue ? setEditingVenue({ ...editingVenue, capacity: e.target.value }) : setNewVenue({ ...newVenue, capacity: e.target.value })}
          className="input input-bordered mr-2"
        />
        <input
          type="text"
          placeholder="Type"
          value={editingVenue ? editingVenue.type : newVenue.type}
          onChange={(e) => editingVenue ? setEditingVenue({ ...editingVenue, type: e.target.value }) : setNewVenue({ ...newVenue, type: e.target.value })}
          className="input input-bordered mr-2"
        />
        <button onClick={editingVenue ? handleUpdateVenue : handleAddVenue} className="btn btn-primary">{editingVenue ? 'Update' : 'Add'}</button>
        <button onClick={closeModal} className="btn btn-secondary ml-2">Cancel</button>
      </Modal>
    </div>
  );
};

export default Venues;