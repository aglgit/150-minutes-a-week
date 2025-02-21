package io.github.aglgit.backend.controllers.dtos

import io.github.aglgit.backend.services.domain.Activity
import io.github.aglgit.backend.services.domain.CreateEvent
import java.time.ZonedDateTime

data class CreateEventDto(
    val userId: Long,
    val activity: Activity,
    val startTime: ZonedDateTime,
    val endTime: ZonedDateTime,
)

fun CreateEventDto.toCreateEvent(): CreateEvent {
    return CreateEvent(
        userId = this.userId,
        activity = this.activity,
        startTime = this.startTime,
        endTime = this.endTime,
    )
}
