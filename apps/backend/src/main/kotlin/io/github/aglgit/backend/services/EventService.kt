package io.github.aglgit.backend.services

import io.github.aglgit.backend.repositories.EventRepository
import io.github.aglgit.backend.repositories.domain.Event
import org.springframework.stereotype.Service

@Service
class EventService(private val eventRepository: EventRepository) {
    fun getEvents(): List<Event> {
        return eventRepository.getAllEvents()
    }

    fun getEventsByUser(userId: Long): List<Event> {
        return eventRepository.getEventsByUser(userId)
    }
}