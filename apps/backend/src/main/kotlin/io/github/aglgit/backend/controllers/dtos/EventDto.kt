package io.github.aglgit.backend.controllers.dtos

import io.github.aglgit.backend.repositories.domain.Activity
import io.github.aglgit.backend.repositories.domain.Event
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
