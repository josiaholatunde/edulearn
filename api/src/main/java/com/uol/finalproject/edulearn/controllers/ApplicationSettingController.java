package com.uol.finalproject.edulearn.controllers;

import com.uol.finalproject.edulearn.annotations.WrapResponse;
import com.uol.finalproject.edulearn.entities.ApplicationSetting;
import com.uol.finalproject.edulearn.entities.Category;
import com.uol.finalproject.edulearn.services.ApplicationSettingService;
import com.uol.finalproject.edulearn.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/application-settings")
@WrapResponse
public class ApplicationSettingController {

    private final ApplicationSettingService applicationSettingService;

    @GetMapping
    public ApplicationSetting getApplicationSettings() {
        return applicationSettingService.getApplicationSettings();
    }

    @PostMapping
    public ApplicationSetting saveApplicationSettings(@RequestBody ApplicationSetting applicationSetting) throws Exception {

        return applicationSettingService.saveApplicationSettings(applicationSetting);
    }
}
