package com.uol.finalproject.edulearn.services;

import com.uol.finalproject.edulearn.entities.ApplicationSetting;
import com.uol.finalproject.edulearn.entities.Category;


public interface ApplicationSettingService {
    ApplicationSetting getApplicationSettings();

    ApplicationSetting saveApplicationSettings(ApplicationSetting applicationSetting);
}
