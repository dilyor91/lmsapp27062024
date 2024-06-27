package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TeacherTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Teacher getTeacherSample1() {
        return new Teacher()
            .id(1L)
            .firstName("firstName1")
            .lastName("lastName1")
            .middleName("middleName1")
            .birthdate("birthdate1")
            .phoneNumber("phoneNumber1")
            .email("email1")
            .passportNumber("passportNumber1")
            .jshshir("jshshir1")
            .nationality("nationality1")
            .country("country1")
            .city("city1")
            .region("region1")
            .addressLine("addressLine1");
    }

    public static Teacher getTeacherSample2() {
        return new Teacher()
            .id(2L)
            .firstName("firstName2")
            .lastName("lastName2")
            .middleName("middleName2")
            .birthdate("birthdate2")
            .phoneNumber("phoneNumber2")
            .email("email2")
            .passportNumber("passportNumber2")
            .jshshir("jshshir2")
            .nationality("nationality2")
            .country("country2")
            .city("city2")
            .region("region2")
            .addressLine("addressLine2");
    }

    public static Teacher getTeacherRandomSampleGenerator() {
        return new Teacher()
            .id(longCount.incrementAndGet())
            .firstName(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .middleName(UUID.randomUUID().toString())
            .birthdate(UUID.randomUUID().toString())
            .phoneNumber(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .passportNumber(UUID.randomUUID().toString())
            .jshshir(UUID.randomUUID().toString())
            .nationality(UUID.randomUUID().toString())
            .country(UUID.randomUUID().toString())
            .city(UUID.randomUUID().toString())
            .region(UUID.randomUUID().toString())
            .addressLine(UUID.randomUUID().toString());
    }
}
