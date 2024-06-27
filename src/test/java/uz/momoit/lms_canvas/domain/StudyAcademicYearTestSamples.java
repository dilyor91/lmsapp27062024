package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class StudyAcademicYearTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static StudyAcademicYear getStudyAcademicYearSample1() {
        return new StudyAcademicYear().id(1L);
    }

    public static StudyAcademicYear getStudyAcademicYearSample2() {
        return new StudyAcademicYear().id(2L);
    }

    public static StudyAcademicYear getStudyAcademicYearRandomSampleGenerator() {
        return new StudyAcademicYear().id(longCount.incrementAndGet());
    }
}
