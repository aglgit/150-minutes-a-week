package io.github.aglgit.backend.repositories

import io.github.aglgit.backend.services.domain.User
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository
import java.sql.PreparedStatement

@Repository
class UserRepository(private val jdbcTemplate: JdbcTemplate) {
    private val rowMapper = RowMapper { rs, _ ->
        User(
            id = rs.getString("id"),
        )
    }

    fun getAllUsers(): List<User> {
        return jdbcTemplate.query("SELECT * FROM users", rowMapper)
    }

    fun getUserById(id: Long): User? {
        return jdbcTemplate.queryForObject(
            """
            SELECT * FROM users 
            WHERE id = ?
            """.trimIndent(), rowMapper, id
        )
    }

    fun existsById(id: String): Boolean {
        val sql =
            """
            SELECT COUNT(*) FROM users
            WHERE id = ?
            """.trimIndent()
        return jdbcTemplate.queryForObject(
            sql,
            Int::class.java,
            id,
        )!! > 0
    }

    fun createUser(id: String) {
        val sql =
            """
            INSERT INTO users (id) 
            VALUES (?)
            """.trimIndent()

        jdbcTemplate.update { connection ->
            val ps: PreparedStatement = connection.prepareStatement(sql)
            ps.setString(1, id)
            ps
        }
    }
}
