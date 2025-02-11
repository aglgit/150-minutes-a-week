package io.github.aglgit.backend.controllers

import io.github.aglgit.backend.controllers.dtos.EventDto
import io.github.aglgit.backend.controllers.dtos.toDto
import io.github.aglgit.backend.services.EventService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/events")
class EventController(private val eventService: EventService) {

    @GetMapping
    fun getEvents(): List<EventDto> {
        return eventService.getEvents().map { it.toDto() }
    }

    @GetMapping("/{userId}")
    fun getEventsByUser(@PathVariable("userId") userId: Long): List<EventDto> {
        return eventService.getEventsByUser(userId).map { it.toDto() }
    }

}