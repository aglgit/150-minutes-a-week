package io.github.aglgit.backend.repositories

import io.github.aglgit.backend.services.domain.Activity
import io.github.aglgit.backend.services.domain.CreateEvent
import io.github.aglgit.backend.services.domain.Event
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.stereotype.Repository
import java.sql.PreparedStatement
import java.sql.Timestamp
import java.time.OffsetDateTime

@Repository
class EventRepository(private val jdbcTemplate: JdbcTemplate) {
    private val rowMapper = RowMapper { rs, _ ->
        Event(
            id = rs.getLong("id"),
            userId = rs.getString("user_id"),
            activity = Activity.valueOf(rs.getString("activity")),
            startTime = rs.getObject("start_time", OffsetDateTime::class.java).toZonedDateTime(),
            endTime = rs.getObject("end_time", OffsetDateTime::class.java).toZonedDateTime(),
        )
    }

    fun getAllEvents(): List<Event> {
        return jdbcTemplate.query("SELECT * FROM events", rowMapper)
    }

    fun getEventById(id: Long): Event? {
        return jdbcTemplate.queryForObject(
            """
            SELECT * FROM events 
            WHERE id = ?
            """.trimIndent(), rowMapper, id
        )
    }

    fun getEventsByUser(userId: String): List<Event> {
        return jdbcTemplate.query(
            """
            SELECT * FROM events 
            WHERE user_id = ?
            """.trimIndent(), rowMapper, userId
        )
    }

    fun createEvent(event: CreateEvent): Long? {
        val sql =
            """
            INSERT INTO events (user_id, activity, start_time, end_time) 
            VALUES (?, ?, ?, ?)
            """.trimIndent()

        val keyHolder = GeneratedKeyHolder()

        jdbcTemplate.update({ connection ->
            val ps: PreparedStatement = connection.prepareStatement(sql, arrayOf("id"))
            ps.setString(1, event.userId)
            ps.setString(2, event.activity.toString())
            ps.setTimestamp(3, Timestamp.from(event.startTime.toInstant()))
            ps.setTimestamp(4, Timestamp.from(event.endTime.toInstant()))
            ps
        }, keyHolder)

        return keyHolder.key?.toLong()
    }

    fun updateEvent(event: Event): Int {
        val sql =
            """
            UPDATE events SET activity = ?, start_time = ?, end_time = ?
            WHERE id = ?
            """.trimIndent()

        return jdbcTemplate.update { connection ->
            val ps: PreparedStatement = connection.prepareStatement(sql)
            ps.setString(1, event.activity.toString())
            ps.setTimestamp(2, Timestamp.from(event.startTime.toInstant()))
            ps.setTimestamp(3, Timestamp.from(event.endTime.toInstant()))
            ps.setLong(4, event.id)
            ps
        }
    }

    fun deleteEvent(id: Long): Int {
        return jdbcTemplate.update(
            """
            DELETE FROM events 
            WHERE id = ?
            """.trimIndent(), id
        )
    }

    fun isEventOverlapping(event: CreateEvent): Boolean {
        val sql =
            """
            SELECT COUNT(*) FROM events
            WHERE user_id = ?
            AND start_time <= ?
            AND end_time >= ?
            """.trimIndent()
        return jdbcTemplate.queryForObject(
            sql,
            Int::class.java,
            event.userId,
            Timestamp.from(event.endTime.toInstant()),
            Timestamp.from(event.startTime.toInstant())
        )!! > 0
    }
}
