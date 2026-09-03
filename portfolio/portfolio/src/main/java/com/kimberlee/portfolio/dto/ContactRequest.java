package com.kimberlee.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Incoming payload for POST /api/contact.
 *
 * Deliberately separate from the {@code ContactMessage} entity so a caller
 * cannot supply an {@code id} and overwrite an existing enquiry.
 */
public record ContactRequest(

        @NotBlank(message = "Name is required")
        @Size(max = 120, message = "Name must be 120 characters or fewer")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be a valid address")
        @Size(max = 254, message = "Email must be 254 characters or fewer")
        String email,

        @NotBlank(message = "Message is required")
        @Size(max = 3000, message = "Message must be 3000 characters or fewer")
        String message
) {
}
