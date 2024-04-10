package com.uol.finalproject.edulearn.entities;

import com.uol.finalproject.edulearn.apimodel.request.RegisterStudentUserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student_users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentUser extends BaseAuditableModel {

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;

    @Builder.Default
    private int level = 10;

    private String biography;
    private String location;
    private String skills;
    private String university;
    private String imageUrl;

    @Column(name = "is_logged_in")
    @Builder.Default
    private boolean userLoginStatus = false;

    @Column(name = "last_logged_in_at")
    private Timestamp lastLoggedInAt;

    @Builder.Default
    private long points = Long.valueOf(100);

    @OneToOne(mappedBy = "studentUser")
    private User user;

    @OneToOne(mappedBy = "studentUser", cascade = CascadeType.ALL)
    private UserSocialProfile socialProfile;

    @OneToMany
    @Builder.Default
    private List<Challenge> challenges = new ArrayList<>();

    @OneToMany(mappedBy = "studentUser", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UserCertification> certifications = new ArrayList<>();

    public static StudentUser fromRegisterStudent(RegisterStudentUserDTO registerStudentUserDTO) {
        StudentUser studentUser = StudentUser.builder().build();
        BeanUtils.copyProperties(registerStudentUserDTO, studentUser);
        return studentUser;
    }

    public String getFullName() {
        return String.format("%s %s", firstName, lastName);
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isUserLoginStatus() {
        return userLoginStatus;
    }

    public void setUserLoginStatus(boolean userLoginStatus) {
        this.userLoginStatus = userLoginStatus;
    }

    public Timestamp getLastLoggedInAt() {
        return lastLoggedInAt;
    }

    public void setLastLoggedInAt(Timestamp lastLoggedInAt) {
        this.lastLoggedInAt = lastLoggedInAt;
    }

    public long getPoints() {
        return points;
    }

    public void setPoints(long points) {
        this.points = points;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserSocialProfile getSocialProfile() {
        return socialProfile;
    }

    public void setSocialProfile(UserSocialProfile socialProfile) {
        this.socialProfile = socialProfile;
    }

    public List<Challenge> getChallenges() {
        return challenges;
    }

    public void setChallenges(List<Challenge> challenges) {
        this.challenges = challenges;
    }

    public List<UserCertification> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<UserCertification> certifications) {
        this.certifications = certifications;
    }
}
