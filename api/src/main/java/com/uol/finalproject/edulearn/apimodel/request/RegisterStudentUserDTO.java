package com.uol.finalproject.edulearn.apimodel.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterStudentUserDTO {
    private String password;

    private String confirmPassword;

    private String firstName;

    private String lastName;

    private String email;

    public boolean doPasswordsMatch() {
        return password.equals(confirmPassword);
    }
}
