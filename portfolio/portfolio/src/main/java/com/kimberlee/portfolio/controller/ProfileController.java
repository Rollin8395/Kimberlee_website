package com.kimberlee.portfolio.controller;

import com.kimberlee.portfolio.entity.Profile;
import com.kimberlee.portfolio.repository.ProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileRepository repository;

    public ProfileController(ProfileRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Profile> getAllProfiles() {
        return repository.findAll();
    }

    @PostMapping
    public Profile createProfile(@RequestBody Profile profile) {
        return repository.save(profile);
    }
}