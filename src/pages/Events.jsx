import React, { useState } from 'react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';
import Modal from 'react-modal';

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });
  const [editingEvent, setEditingEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: '', date: '', venue: '' });
    setIsModalOpen(false);
  };

  const handleUpdateEvent = () => {
    updateEvent.mutate(editingEvent);
    setEditingEvent(null);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  const openModal = (event = null) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingEvent(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <button onClick={() => openModal()} className="btn btn-primary mb-4">Add Event</button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.venue}</td>
              <td>
                <button onClick={() => openModal(event)} className="btn btn-secondary mr-2">Edit</button>
                <button onClick={() => handleDeleteEvent(event.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Event Modal">
        <h2>{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={editingEvent ? editingEvent.name : newEvent.name}
          onChange={(e) => editingEvent ? setEditingEvent({ ...editingEvent, name: e.target.value }) : setNewEvent({ ...newEvent, name: e.target.value })}
          className="input input-bordered mr-2"
        />
        <input
          type="date"
          value={editingEvent ? editingEvent.date : newEvent.date}
          onChange={(e) => editingEvent ? setEditingEvent({ ...editingEvent, date: e.target.value }) : setNewEvent({ ...newEvent, date: e.target.value })}
          className="input input-bordered mr-2"
        />
        <input
          type="text"
          placeholder="Venue"
          value={editingEvent ? editingEvent.venue : newEvent.venue}
          onChange={(e) => editingEvent ? setEditingEvent({ ...editingEvent, venue: e.target.value }) : setNewEvent({ ...newEvent, venue: e.target.value })}
          className="input input-bordered mr-2"
        />
        <button onClick={editingEvent ? handleUpdateEvent : handleAddEvent} className="btn btn-primary">{editingEvent ? 'Update' : 'Add'}</button>
        <button onClick={closeModal} className="btn btn-secondary ml-2">Cancel</button>
      </Modal>
    </div>
  );
};

export default Events;