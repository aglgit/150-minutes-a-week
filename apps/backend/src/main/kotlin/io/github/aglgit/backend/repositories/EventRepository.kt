package io.github.aglgit.backend.repositories

import io.github.aglgit.backend.repositories.domain.Activity
import io.github.aglgit.backend.repositories.domain.Event
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository
import java.time.OffsetDateTime

@Repository
class EventRepository(private val jdbcTemplate: JdbcTemplate) {
    private val rowMapper = RowMapper { rs, _ ->
        Event(
            id = rs.getLong("id"),
            userId = rs.getLong("user_id"),
            activity = Activity.valueOf(rs.getString("activity")),
            startTime = rs.getObject("start_time", OffsetDateTime::class.java).toZonedDateTime(),
            endTime = rs.getObject("end_time", OffsetDateTime::class.java).toZonedDateTime(),
        )
    }

    fun getAllEvents(): List<Event> {
        return jdbcTemplate.query("SELECT * FROM events", rowMapper)
    }

    fun getEventsByUser(userId: Long): List<Event> {
        return jdbcTemplate.query("SELECT * FROM events WHERE user_id = ?", rowMapper, userId)
    }
}
