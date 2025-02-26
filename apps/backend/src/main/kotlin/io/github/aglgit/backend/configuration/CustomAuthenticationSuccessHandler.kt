package io.github.aglgit.backend.configuration

import io.github.aglgit.backend.repositories.UserRepository
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
class CustomAuthenticationSuccessHandler(private val userRepository: UserRepository) : AuthenticationSuccessHandler {

    @Value("\${frontend.page.user}")
    private lateinit var frontendPageUser: String

    @Transactional
    override fun onAuthenticationSuccess(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication
    ) {
        val user = authentication.principal as OAuth2User
        val email = user.attributes["email"] as String

        if (!userRepository.existsById(email)) {
            userRepository.createUser(email)
        }

        response.sendRedirect(frontendPageUser)
    }
}