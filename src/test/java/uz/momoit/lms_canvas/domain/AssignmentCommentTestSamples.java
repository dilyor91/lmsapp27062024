package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class AssignmentCommentTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AssignmentComment getAssignmentCommentSample1() {
        return new AssignmentComment().id(1L).comment("comment1");
    }

    public static AssignmentComment getAssignmentCommentSample2() {
        return new AssignmentComment().id(2L).comment("comment2");
    }

    public static AssignmentComment getAssignmentCommentRandomSampleGenerator() {
        return new AssignmentComment().id(longCount.incrementAndGet()).comment(UUID.randomUUID().toString());
    }
}
