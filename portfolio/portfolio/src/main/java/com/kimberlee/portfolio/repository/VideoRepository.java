package com.kimberlee.portfolio.repository;

import com.kimberlee.portfolio.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
}