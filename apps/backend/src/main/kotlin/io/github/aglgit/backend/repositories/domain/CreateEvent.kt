package io.github.aglgit.backend.repositories.domain

import java.time.ZonedDateTime

data class CreateEvent(
    val userId: Long,
    val activity: Activity,
    val startTime: ZonedDateTime,
    val endTime: ZonedDateTime,
)
