package com.kimberlee.portfolio.controller;

import com.kimberlee.portfolio.dto.ContactRequest;
import com.kimberlee.portfolio.dto.ContactResponse;
import com.kimberlee.portfolio.entity.ContactMessage;
import com.kimberlee.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactResponse submit(@Valid @RequestBody ContactRequest request) {
        ContactMessage saved = contactService.saveMessage(request);
        return new ContactResponse(saved.getId(), "Message received.");
    }
}
