package io.github.aglgit.backend.controllers

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/users")
@Tag(name = "User Controller", description = "APIs for users")
class UserController {

    @GetMapping
    @Operation(summary = "Get user info", description = "Retrieves user info")
    fun getUserInfo(@AuthenticationPrincipal user: OAuth2User): Map<String, Nothing?> {
        return mapOf(
            "name" to user.getAttribute("name"),
            "email" to user.getAttribute("email")
        )
    }

}