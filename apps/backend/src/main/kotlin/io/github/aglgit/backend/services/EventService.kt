package io.github.aglgit.backend.services

import io.github.aglgit.backend.repositories.EventRepository
import io.github.aglgit.backend.services.domain.CreateEvent
import io.github.aglgit.backend.services.domain.Event
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class EventService(private val eventRepository: EventRepository) {
    fun getEvents(): List<Event> {
        return eventRepository.getAllEvents()
    }

    fun getEvent(id: Long): Event? {
        return eventRepository.getEventById(id)
    }

    fun getEventsByUser(userId: Long): List<Event> {
        return eventRepository.getEventsByUser(userId)
    }

    @Transactional
    fun createEvent(event: CreateEvent): Event? {
        if (eventRepository.isEventOverlapping(event)) {
            throw IllegalArgumentException("Event(s) already exists at time ${event.startTime} - ${event.endTime}")
        }
        val id = eventRepository.createEvent(event)
        return id?.let { getEvent(it) }
    }

    fun updateEvent(event: Event): Event? {
        eventRepository.updateEvent(event)
        return getEvent(event.id)
    }

    fun deleteEvent(id: Long) {
        eventRepository.deleteEvent(id)
    }
}