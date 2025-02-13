package io.github.aglgit.backend.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsUtils


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfigurationLocal {

    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { csrf -> csrf.disable() }
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                    .anyRequest().authenticated()
            }.httpBasic(Customizer.withDefaults())
        return http.build()
    }

}
