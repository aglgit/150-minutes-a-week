package io.github.aglgit.backend.controllers

import io.github.aglgit.backend.controllers.dtos.*
import io.github.aglgit.backend.services.EventService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/events")
@Tag(name = "Event Controller", description = "APIs for managing events")
class EventController(private val eventService: EventService) {

    @GetMapping
    @Operation(summary = "Get all events", description = "Retrieves all events")
    fun getEvents(@RequestParam(required = false) userId: Long?): List<EventDto> {
        return userId?.let { id -> eventService.getEventsByUser(id).map { it.toDto() } }
            ?: eventService.getEvents().map { it.toDto() }
    }

    @PostMapping
    @Operation(summary = "Create event", description = "Creates a new event")
    fun createEvent(@RequestBody event: CreateEventDto): EventDto? {
        return eventService.createEvent(event.toCreateEvent())?.toDto()
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update event by id", description = "Updates an event with the given id")
    fun updateEvent(@PathVariable("id") userId: Long, @RequestBody event: EventDto): EventDto? {
        return eventService.updateEvent(event.toEvent())?.toDto()
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete event by id", description = "Deletes an event with the given id")
    fun deleteEvent(@PathVariable("id") id: Long) {
        return eventService.deleteEvent(id)
    }

}