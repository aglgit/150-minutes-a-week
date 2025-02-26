package io.github.aglgit.backend.services.domain

import java.time.ZonedDateTime

data class CreateEvent(
    val userId: String,
    val activity: Activity,
    val startTime: ZonedDateTime,
    val endTime: ZonedDateTime,
)
