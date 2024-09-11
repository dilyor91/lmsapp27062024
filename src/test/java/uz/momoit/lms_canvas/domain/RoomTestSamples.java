package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class RoomTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Room getRoomSample1() {
        return new Room().id(1L).name("name1").description("description1").capacity(1);
    }

    public static Room getRoomSample2() {
        return new Room().id(2L).name("name2").description("description2").capacity(2);
    }

    public static Room getRoomRandomSampleGenerator() {
        return new Room()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .capacity(intCount.incrementAndGet());
    }
}
