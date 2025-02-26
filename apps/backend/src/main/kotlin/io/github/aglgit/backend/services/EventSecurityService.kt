package io.github.aglgit.backend.services

import io.github.aglgit.backend.repositories.EventRepository
import org.springframework.stereotype.Service

@Service
class EventSecurityService(private val eventRepository: EventRepository) {
    fun isOwner(eventId: Long, userId: String): Boolean {
        val event = eventRepository.getEventById(eventId)
        return event?.userId == userId
    }
}