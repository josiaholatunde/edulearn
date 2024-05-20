package com.uol.finalproject.edulearn.services.impl;

import com.uol.finalproject.edulearn.entities.ApplicationSetting;
import com.uol.finalproject.edulearn.exceptions.BadRequestException;
import com.uol.finalproject.edulearn.repositories.ApplicationSettingRepository;
import com.uol.finalproject.edulearn.services.ApplicationSettingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationSettingServiceImpl implements ApplicationSettingService {

    private final ApplicationSettingRepository applicationSettingRepository;

    @Override
    public ApplicationSetting getApplicationSettings() {
        List<ApplicationSetting> applicationSettings = applicationSettingRepository.findAll();
        if (applicationSettings.isEmpty()) {
            return null;
        }
        return applicationSettings.get(0);
    }

    @Override
    public ApplicationSetting saveApplicationSettings(ApplicationSetting applicationSetting) {
        validateRequest(applicationSetting);
        return applicationSettingRepository.save(applicationSetting);
    }

    private void validateRequest(ApplicationSetting applicationSetting) {
        if (Strings.isBlank(applicationSetting.getDefaultChallengeDuration())) {
            throw new BadRequestException("Default challenge duration is required");
        }
        if (Strings.isBlank(applicationSetting.getChallengeRules())) {
            throw new BadRequestException("Default challenge rules is required");
        }
    }
}
