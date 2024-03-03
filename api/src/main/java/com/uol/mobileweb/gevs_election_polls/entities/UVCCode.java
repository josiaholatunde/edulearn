package com.uol.mobileweb.gevs_election_polls.entities;

import jakarta.persistence.*;

@Entity(name = "uvc_code")
public class UVCCode {

    @Id
    private String UVC;

    private boolean used;


    public String getUVC() {
        return UVC;
    }

    public void setUVC(String UVC) {
        this.UVC = UVC;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }

    public UVCCode() {
    }

    public UVCCode(String UVC, boolean used) {
        this.UVC = UVC;
        this.used = used;
    }
}
