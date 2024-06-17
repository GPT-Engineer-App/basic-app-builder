import React, { useState } from 'react';
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from '../integrations/supabase/index.js';

const Venues = () => {
  const { data: venues, isLoading, isError } = useVenues();
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();

  const [newVenue, setNewVenue] = useState({ name: '', capacity: '', type: '' });
  const [editingVenue, setEditingVenue] = useState(null);

  const handleAddVenue = () => {
    addVenue.mutate(newVenue);
    setNewVenue({ name: '', capacity: '', type: '' });
  };

  const handleUpdateVenue = () => {
    updateVenue.mutate(editingVenue);
    setEditingVenue(null);
  };

  const handleDeleteVenue = (id) => {
    deleteVenue.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading venues</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Venues</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Venue Name"
          value={newVenue.name}
          onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
          className="input input-bordered mr-2"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newVenue.capacity}
          onChange={(e) => setNewVenue({ ...newVenue, capacity: e.target.value })}
          className="input input-bordered mr-2"
        />
        <input
          type="text"
          placeholder="Type"
          value={newVenue.type}
          onChange={(e) => setNewVenue({ ...newVenue, type: e.target.value })}
          className="input input-bordered mr-2"
        />
        <button onClick={handleAddVenue} className="btn btn-primary">Add Venue</button>
      </div>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id} className="mb-2">
            {editingVenue && editingVenue.id === venue.id ? (
              <>
                <input
                  type="text"
                  value={editingVenue.name}
                  onChange={(e) => setEditingVenue({ ...editingVenue, name: e.target.value })}
                  className="input input-bordered mr-2"
                />
                <input
                  type="number"
                  value={editingVenue.capacity}
                  onChange={(e) => setEditingVenue({ ...editingVenue, capacity: e.target.value })}
                  className="input input-bordered mr-2"
                />
                <input
                  type="text"
                  value={editingVenue.type}
                  onChange={(e) => setEditingVenue({ ...editingVenue, type: e.target.value })}
                  className="input input-bordered mr-2"
                />
                <button onClick={handleUpdateVenue} className="btn btn-primary mr-2">Update</button>
                <button onClick={() => setEditingVenue(null)} className="btn btn-secondary">Cancel</button>
              </>
            ) : (
              <>
                <span>{venue.name} - {venue.capacity} - {venue.type}</span>
                <button onClick={() => setEditingVenue(venue)} className="btn btn-secondary ml-2">Edit</button>
                <button onClick={() => handleDeleteVenue(venue.id)} className="btn btn-danger ml-2">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Venues;