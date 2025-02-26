package io.github.aglgit.backend.controllers

import io.github.aglgit.backend.controllers.dtos.*
import io.github.aglgit.backend.services.EventService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/events")
@Tag(name = "Event Controller", description = "APIs for managing events")
@PreAuthorize("isAuthenticated()")
class EventController(private val eventService: EventService) {

    @GetMapping
    @Operation(summary = "Get all events", description = "Retrieves all events")
    fun getEvents(@AuthenticationPrincipal user: OAuth2User): List<EventDto>? {
        val userId = user.attributes["email"] as String?
        return userId?.let { id -> eventService.getEventsByUser(id).map { it.toDto() } }
    }

    @PostMapping
    @Operation(summary = "Create event", description = "Creates a new event")
    fun createEvent(@RequestBody event: CreateEventDto): EventDto? {
        return eventService.createEvent(event.toCreateEvent())?.toDto()
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update event by id", description = "Updates an event with the given id")
    @PreAuthorize("@eventSecurityService.isOwner(#id, authentication.principal.email)")
    fun updateEvent(@PathVariable("id") id: String, @RequestBody event: EventDto): EventDto? {
        return eventService.updateEvent(event.toEvent())?.toDto()
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete event by id", description = "Deletes an event with the given id")
    @PreAuthorize("@eventSecurityService.isOwner(#id, authentication.principal.email)")
    fun deleteEvent(@PathVariable("id") id: Long) {
        return eventService.deleteEvent(id)
    }

}