package io.github.aglgit.backend.configuration

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsUtils


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Profile("local")
class SecurityConfigurationLocal(private val successHandler: CustomAuthenticationSuccessHandler) {

    @Value("\${frontend.page.main}")
    private lateinit var frontendPage: String

    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { csrf -> csrf.disable() }
            .formLogin { formLogin -> formLogin.disable() }
            .httpBasic { basic -> basic.disable() }
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                    .requestMatchers("/", "/login", "/error").permitAll()
                    .anyRequest().authenticated()
            }
            .oauth2Login { oauthl -> oauthl.successHandler(successHandler) }
            .logout { lo -> lo.logoutUrl("/logout").logoutSuccessUrl(frontendPage) }
            .sessionManagement { session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) }

        return http.build()
    }

}
