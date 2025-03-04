package io.github.aglgit.backend.services.domain

import java.time.ZonedDateTime

data class Event(
    val id: Long,
    val userId: String,
    val activity: Activity,
    val startTime: ZonedDateTime,
    val endTime: ZonedDateTime,
)
