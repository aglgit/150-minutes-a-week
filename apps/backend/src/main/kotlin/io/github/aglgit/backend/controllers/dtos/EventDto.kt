package io.github.aglgit.backend.controllers.dtos

import io.github.aglgit.backend.repositories.domain.Activity
import io.github.aglgit.backend.repositories.domain.Event
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

data class EventDto(
    val id: Long,
    val userId: Long,
    val activity: Activity,
    val date: String,
    val startTime: String,
    val endTime: String,
)

fun Event.toDto(): EventDto {
    val dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
    val timeFormatter = DateTimeFormatter.ofPattern("HH:mm")

    return EventDto(
        id = this.id,
        userId = this.userId,
        activity = this.activity,
        date = this.startTime.format(dateFormatter),
        startTime = this.startTime.format(timeFormatter),
        endTime = this.endTime.format(timeFormatter)
    )
}

fun EventDto.toEvent(): Event {
    val date = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
    val startTime = LocalTime.parse(startTime, DateTimeFormatter.ofPattern("HH:mm"))
    val endTime = LocalTime.parse(endTime, DateTimeFormatter.ofPattern("HH:mm"))
    return Event(
        id = this.id,
        userId = this.userId,
        activity = this.activity,
        startTime = ZonedDateTime.of(date, startTime, ZoneId.of("UTC")),
        endTime = ZonedDateTime.of(date, endTime, ZoneId.of("UTC"))
    )
}
