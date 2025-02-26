package io.github.aglgit.backend.repositories

import io.github.aglgit.backend.services.domain.Activity
import io.github.aglgit.backend.services.domain.Event
import org.springframework.stereotype.Repository
import java.time.ZoneId
import java.time.ZonedDateTime

@Repository
class MockEventRepository {
    fun getAllEvents(): List<Event> {
        val now = ZonedDateTime.now()
        val events = arrayListOf(
            Event(
                1,
                "alef@example.com",
                Activity.Walking,
                startTime = ZonedDateTime.of(
                    now.year,
                    now.monthValue,
                    now.dayOfMonth,
                    9,
                    0,
                    0,
                    0,
                    ZoneId.systemDefault()
                ),
                endTime = ZonedDateTime.of(
                    now.year,
                    now.monthValue,
                    now.dayOfMonth,
                    10,
                    0,
                    0,
                    0,
                    ZoneId.systemDefault()
                ),
            ),
            Event(
                2,
                "blef@example.com",
                Activity.Walking,
                startTime = ZonedDateTime.of(
                    now.year,
                    now.monthValue,
                    now.dayOfMonth + 1,
                    11,
                    0,
                    0,
                    0,
                    ZoneId.systemDefault()
                ),
                endTime = ZonedDateTime.of(
                    now.year,
                    now.monthValue,
                    now.dayOfMonth + 1,
                    11,
                    20,
                    0,
                    0,
                    ZoneId.systemDefault()
                ),
            )
        )
        return events
    }

    fun getEventsByUser(userId: String): List<Event> {
        return getAllEvents().filter { it.userId == userId }
    }
}