package io.github.aglgit.backend.controllers.dtos

import io.github.aglgit.backend.repositories.domain.Activity
import io.github.aglgit.backend.repositories.domain.CreateEvent
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

data class CreateEventDto(
    val userId: Long,
    val activity: Activity,
    val date: String,
    val startTime: String,
    val endTime: String,
)

fun CreateEventDto.toCreateEvent(): CreateEvent {
    val date = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
    val startTime = LocalTime.parse(startTime, DateTimeFormatter.ofPattern("HH:mm"))
    val endTime = LocalTime.parse(endTime, DateTimeFormatter.ofPattern("HH:mm"))
    return CreateEvent(
        userId = this.userId,
        activity = this.activity,
        startTime = ZonedDateTime.of(date, startTime, ZoneId.of("UTC")),
        endTime = ZonedDateTime.of(date, endTime, ZoneId.of("UTC"))
    )
}
