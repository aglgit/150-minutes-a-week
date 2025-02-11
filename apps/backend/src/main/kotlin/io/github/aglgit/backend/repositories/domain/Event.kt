package io.github.aglgit.backend.repositories.domain

import java.time.ZonedDateTime

data class Event(
    val id: Long,
    val userId: Long,
    val activity: Activity,
    val startTime: ZonedDateTime,
    val endTime: ZonedDateTime,
)
