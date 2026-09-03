package com.kimberlee.portfolio.service;

import com.kimberlee.portfolio.dto.ContactRequest;
import com.kimberlee.portfolio.entity.ContactMessage;
import com.kimberlee.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public ContactMessage saveMessage(ContactRequest request) {
        ContactMessage message = new ContactMessage(
                request.name().trim(),
                request.email().trim(),
                request.message().trim()
        );
        return contactMessageRepository.save(message);
    }

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }
}
