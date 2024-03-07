package com.uol.finalproject.edulearn.util;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

    public static Timestamp calculateExpirationDate(int expirationDuration) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR, expirationDuration);
        return new Timestamp(calendar.getTimeInMillis());
    }

    public static Timestamp getCurrentDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        return new Timestamp(calendar.getTimeInMillis());
    }
}
