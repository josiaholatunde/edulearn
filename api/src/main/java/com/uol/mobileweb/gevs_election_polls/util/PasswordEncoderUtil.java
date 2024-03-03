package com.uol.mobileweb.gevs_election_polls.util;

import java.security.MessageDigest;

public class PasswordEncoderUtil {

    public static String getSHA256(String data) throws Exception {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes("UTF-8"));
            return bytesToHex(hash);
        }catch(Exception ex) {
            ex.printStackTrace();
            throw new Exception("An error occurred while hashing password");
        }
    }
    private static String bytesToHex(byte[] hash) {
        final StringBuilder builder=new StringBuilder();
        for(byte b:hash) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();

    }
}
