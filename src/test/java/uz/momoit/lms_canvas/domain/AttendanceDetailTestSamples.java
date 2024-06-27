package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class AttendanceDetailTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AttendanceDetail getAttendanceDetailSample1() {
        return new AttendanceDetail().id(1L);
    }

    public static AttendanceDetail getAttendanceDetailSample2() {
        return new AttendanceDetail().id(2L);
    }

    public static AttendanceDetail getAttendanceDetailRandomSampleGenerator() {
        return new AttendanceDetail().id(longCount.incrementAndGet());
    }
}
