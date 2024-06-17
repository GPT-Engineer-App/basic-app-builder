import React, { useState } from 'react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: '', date: '', venue: '' });
  };

  const handleUpdateEvent = () => {
    updateEvent.mutate(editingEvent);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          className="input input-bordered mr-2"
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="input input-bordered mr-2"
        />
        <input
          type="text"
          placeholder="Venue"
          value={newEvent.venue}
          onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
          className="input input-bordered mr-2"
        />
        <button onClick={handleAddEvent} className="btn btn-primary">Add Event</button>
      </div>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2">
            {editingEvent && editingEvent.id === event.id ? (
              <>
                <input
                  type="text"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                  className="input input-bordered mr-2"
                />
                <input
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  className="input input-bordered mr-2"
                />
                <input
                  type="text"
                  value={editingEvent.venue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="input input-bordered mr-2"
                />
                <button onClick={handleUpdateEvent} className="btn btn-primary mr-2">Update</button>
                <button onClick={() => setEditingEvent(null)} className="btn btn-secondary">Cancel</button>
              </>
            ) : (
              <>
                <span>{event.name} - {event.date} - {event.venue}</span>
                <button onClick={() => setEditingEvent(event)} className="btn btn-secondary ml-2">Edit</button>
                <button onClick={() => handleDeleteEvent(event.id)} className="btn btn-danger ml-2">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;