package io.github.aglgit.backend.controllers.dtos

import io.github.aglgit.backend.services.domain.Activity
import io.github.aglgit.backend.services.domain.Event
import java.time.ZonedDateTime

data class EventDto(
    val id: Long,
    val userId: String,
    val activity: Activity,
    val startTime: ZonedDateTime,
    val endTime: ZonedDateTime,
)

fun Event.toDto(): EventDto {
    return EventDto(
        id = this.id,
        userId = this.userId,
        activity = this.activity,
        startTime = this.startTime,
        endTime = this.endTime
    )
}

fun EventDto.toEvent(): Event {
    return Event(
        id = this.id,
        userId = this.userId,
        activity = this.activity,
        startTime = this.startTime,
        endTime = this.endTime,
    )
}
