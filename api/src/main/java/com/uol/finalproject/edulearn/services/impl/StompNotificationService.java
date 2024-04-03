package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.apimodel.NotificationMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StompNotificationService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void sendNotificationToDestination(String destination, NotificationMessage message) {
        simpMessagingTemplate.convertAndSend(destination, message);
    }
}
