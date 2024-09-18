package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.TeacherAsserts.*;
import static uz.momoit.lms_canvas.web.rest.TestUtil.createUpdateProxyForBean;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.IntegrationTest;
import uz.momoit.lms_canvas.domain.Teacher;
import uz.momoit.lms_canvas.domain.enumeration.AcademicDegreeEnum;
import uz.momoit.lms_canvas.domain.enumeration.AcademicTitleEnum;
import uz.momoit.lms_canvas.domain.enumeration.GenderEnum;
import uz.momoit.lms_canvas.domain.enumeration.PositionEnum;
import uz.momoit.lms_canvas.repository.TeacherRepository;
import uz.momoit.lms_canvas.repository.UserRepository;
import uz.momoit.lms_canvas.service.dto.TeacherDTO;
import uz.momoit.lms_canvas.service.mapper.TeacherMapper;

/**
 * Integration tests for the {@link TeacherResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TeacherResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final GenderEnum DEFAULT_GENDER = GenderEnum.MALE;
    private static final GenderEnum UPDATED_GENDER = GenderEnum.FEMALE;

    private static final String DEFAULT_BIRTHDATE = "AAAAAAAAAA";
    private static final String UPDATED_BIRTHDATE = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PASSPORT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PASSPORT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_JSHSHIR = "AAAAAAAAAA";
    private static final String UPDATED_JSHSHIR = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final String DEFAULT_NATIONALITY = "AAAAAAAAAA";
    private static final String UPDATED_NATIONALITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_REGION = "AAAAAAAAAA";
    private static final String UPDATED_REGION = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE = "BBBBBBBBBB";

    private static final PositionEnum DEFAULT_POSITION = PositionEnum.ASSISTENT;
    private static final PositionEnum UPDATED_POSITION = PositionEnum.KATTA_OQITUVCHI;

    private static final AcademicDegreeEnum DEFAULT_ACADEMIC_DEGREE = AcademicDegreeEnum.ILMIY_DARAJASIZ;
    private static final AcademicDegreeEnum UPDATED_ACADEMIC_DEGREE = AcademicDegreeEnum.PHD;

    private static final AcademicTitleEnum DEFAULT_ACADEMIC_TITLE = AcademicTitleEnum.ILMIY_UNVONSIZ;
    private static final AcademicTitleEnum UPDATED_ACADEMIC_TITLE = AcademicTitleEnum.DOTSENT;

    private static final String ENTITY_API_URL = "/api/teachers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeacherMapper teacherMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTeacherMockMvc;

    private Teacher teacher;

    private Teacher insertedTeacher;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Teacher createEntity() {
        return new Teacher()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .gender(DEFAULT_GENDER)
            .birthdate(DEFAULT_BIRTHDATE)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .email(DEFAULT_EMAIL)
            .passportNumber(DEFAULT_PASSPORT_NUMBER)
            .jshshir(DEFAULT_JSHSHIR)
            .isActive(DEFAULT_IS_ACTIVE)
            .nationality(DEFAULT_NATIONALITY)
            .country(DEFAULT_COUNTRY)
            .city(DEFAULT_CITY)
            .region(DEFAULT_REGION)
            .addressLine(DEFAULT_ADDRESS_LINE)
            .position(DEFAULT_POSITION)
            .academicDegree(DEFAULT_ACADEMIC_DEGREE)
            .academicTitle(DEFAULT_ACADEMIC_TITLE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Teacher createUpdatedEntity() {
        return new Teacher()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .gender(UPDATED_GENDER)
            .birthdate(UPDATED_BIRTHDATE)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .email(UPDATED_EMAIL)
            .passportNumber(UPDATED_PASSPORT_NUMBER)
            .jshshir(UPDATED_JSHSHIR)
            .isActive(UPDATED_IS_ACTIVE)
            .nationality(UPDATED_NATIONALITY)
            .country(UPDATED_COUNTRY)
            .city(UPDATED_CITY)
            .region(UPDATED_REGION)
            .addressLine(UPDATED_ADDRESS_LINE)
            .position(UPDATED_POSITION)
            .academicDegree(UPDATED_ACADEMIC_DEGREE)
            .academicTitle(UPDATED_ACADEMIC_TITLE);
    }

    @BeforeEach
    public void initTest() {
        teacher = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedTeacher != null) {
            teacherRepository.delete(insertedTeacher);
            insertedTeacher = null;
        }
    }

    @Test
    @Transactional
    void createTeacher() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);
        var returnedTeacherDTO = om.readValue(
            restTeacherMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TeacherDTO.class
        );

        // Validate the Teacher in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTeacher = teacherMapper.toEntity(returnedTeacherDTO);
        assertTeacherUpdatableFieldsEquals(returnedTeacher, getPersistedTeacher(returnedTeacher));

        insertedTeacher = returnedTeacher;
    }

    @Test
    @Transactional
    void createTeacherWithExistingId() throws Exception {
        // Create the Teacher with an existing ID
        teacher.setId(1L);
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeacherMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Teacher in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFirstNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        teacher.setFirstName(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLastNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        teacher.setLastName(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkGenderIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        teacher.setGender(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBirthdateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        teacher.setBirthdate(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        teacher.setEmail(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPassportNumberIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        teacher.setPassportNumber(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkJshshirIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        teacher.setJshshir(null);

        // Create the Teacher, which fails.
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        restTeacherMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTeachers() throws Exception {
        // Initialize the database
        insertedTeacher = teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList
        restTeacherMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teacher.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].birthdate").value(hasItem(DEFAULT_BIRTHDATE)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].passportNumber").value(hasItem(DEFAULT_PASSPORT_NUMBER)))
            .andExpect(jsonPath("$.[*].jshshir").value(hasItem(DEFAULT_JSHSHIR)))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].nationality").value(hasItem(DEFAULT_NATIONALITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION)))
            .andExpect(jsonPath("$.[*].addressLine").value(hasItem(DEFAULT_ADDRESS_LINE)))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION.toString())))
            .andExpect(jsonPath("$.[*].academicDegree").value(hasItem(DEFAULT_ACADEMIC_DEGREE.toString())))
            .andExpect(jsonPath("$.[*].academicTitle").value(hasItem(DEFAULT_ACADEMIC_TITLE.toString())));
    }

    @Test
    @Transactional
    void getTeacher() throws Exception {
        // Initialize the database
        insertedTeacher = teacherRepository.saveAndFlush(teacher);

        // Get the teacher
        restTeacherMockMvc
            .perform(get(ENTITY_API_URL_ID, teacher.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(teacher.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.birthdate").value(DEFAULT_BIRTHDATE))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.passportNumber").value(DEFAULT_PASSPORT_NUMBER))
            .andExpect(jsonPath("$.jshshir").value(DEFAULT_JSHSHIR))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.nationality").value(DEFAULT_NATIONALITY))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.region").value(DEFAULT_REGION))
            .andExpect(jsonPath("$.addressLine").value(DEFAULT_ADDRESS_LINE))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION.toString()))
            .andExpect(jsonPath("$.academicDegree").value(DEFAULT_ACADEMIC_DEGREE.toString()))
            .andExpect(jsonPath("$.academicTitle").value(DEFAULT_ACADEMIC_TITLE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTeacher() throws Exception {
        // Get the teacher
        restTeacherMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTeacher() throws Exception {
        // Initialize the database
        insertedTeacher = teacherRepository.saveAndFlush(teacher);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the teacher
        Teacher updatedTeacher = teacherRepository.findById(teacher.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTeacher are not directly saved in db
        em.detach(updatedTeacher);
        updatedTeacher
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .gender(UPDATED_GENDER)
            .birthdate(UPDATED_BIRTHDATE)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .email(UPDATED_EMAIL)
            .passportNumber(UPDATED_PASSPORT_NUMBER)
            .jshshir(UPDATED_JSHSHIR)
            .isActive(UPDATED_IS_ACTIVE)
            .nationality(UPDATED_NATIONALITY)
            .country(UPDATED_COUNTRY)
            .city(UPDATED_CITY)
            .region(UPDATED_REGION)
            .addressLine(UPDATED_ADDRESS_LINE)
            .position(UPDATED_POSITION)
            .academicDegree(UPDATED_ACADEMIC_DEGREE)
            .academicTitle(UPDATED_ACADEMIC_TITLE);
        TeacherDTO teacherDTO = teacherMapper.toDto(updatedTeacher);

        restTeacherMockMvc
            .perform(
                put(ENTITY_API_URL_ID, teacherDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO))
            )
            .andExpect(status().isOk());

        // Validate the Teacher in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTeacherToMatchAllProperties(updatedTeacher);
    }

    @Test
    @Transactional
    void putNonExistingTeacher() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        teacher.setId(longCount.incrementAndGet());

        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTeacherMockMvc
            .perform(
                put(ENTITY_API_URL_ID, teacherDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Teacher in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTeacher() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        teacher.setId(longCount.incrementAndGet());

        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTeacherMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(teacherDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Teacher in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTeacher() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        teacher.setId(longCount.incrementAndGet());

        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTeacherMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(teacherDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Teacher in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTeacherWithPatch() throws Exception {
        // Initialize the database
        insertedTeacher = teacherRepository.saveAndFlush(teacher);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the teacher using partial update
        Teacher partialUpdatedTeacher = new Teacher();
        partialUpdatedTeacher.setId(teacher.getId());

        partialUpdatedTeacher
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .birthdate(UPDATED_BIRTHDATE)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .email(UPDATED_EMAIL)
            .passportNumber(UPDATED_PASSPORT_NUMBER)
            .region(UPDATED_REGION);

        restTeacherMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTeacher.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTeacher))
            )
            .andExpect(status().isOk());

        // Validate the Teacher in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTeacherUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedTeacher, teacher), getPersistedTeacher(teacher));
    }

    @Test
    @Transactional
    void fullUpdateTeacherWithPatch() throws Exception {
        // Initialize the database
        insertedTeacher = teacherRepository.saveAndFlush(teacher);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the teacher using partial update
        Teacher partialUpdatedTeacher = new Teacher();
        partialUpdatedTeacher.setId(teacher.getId());

        partialUpdatedTeacher
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .gender(UPDATED_GENDER)
            .birthdate(UPDATED_BIRTHDATE)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .email(UPDATED_EMAIL)
            .passportNumber(UPDATED_PASSPORT_NUMBER)
            .jshshir(UPDATED_JSHSHIR)
            .isActive(UPDATED_IS_ACTIVE)
            .nationality(UPDATED_NATIONALITY)
            .country(UPDATED_COUNTRY)
            .city(UPDATED_CITY)
            .region(UPDATED_REGION)
            .addressLine(UPDATED_ADDRESS_LINE)
            .position(UPDATED_POSITION)
            .academicDegree(UPDATED_ACADEMIC_DEGREE)
            .academicTitle(UPDATED_ACADEMIC_TITLE);

        restTeacherMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTeacher.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTeacher))
            )
            .andExpect(status().isOk());

        // Validate the Teacher in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTeacherUpdatableFieldsEquals(partialUpdatedTeacher, getPersistedTeacher(partialUpdatedTeacher));
    }

    @Test
    @Transactional
    void patchNonExistingTeacher() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        teacher.setId(longCount.incrementAndGet());

        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTeacherMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, teacherDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(teacherDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Teacher in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTeacher() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        teacher.setId(longCount.incrementAndGet());

        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTeacherMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(teacherDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Teacher in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTeacher() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        teacher.setId(longCount.incrementAndGet());

        // Create the Teacher
        TeacherDTO teacherDTO = teacherMapper.toDto(teacher);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTeacherMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(teacherDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Teacher in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTeacher() throws Exception {
        // Initialize the database
        insertedTeacher = teacherRepository.saveAndFlush(teacher);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the teacher
        restTeacherMockMvc
            .perform(delete(ENTITY_API_URL_ID, teacher.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return teacherRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Teacher getPersistedTeacher(Teacher teacher) {
        return teacherRepository.findById(teacher.getId()).orElseThrow();
    }

    protected void assertPersistedTeacherToMatchAllProperties(Teacher expectedTeacher) {
        assertTeacherAllPropertiesEquals(expectedTeacher, getPersistedTeacher(expectedTeacher));
    }

    protected void assertPersistedTeacherToMatchUpdatableProperties(Teacher expectedTeacher) {
        assertTeacherAllUpdatablePropertiesEquals(expectedTeacher, getPersistedTeacher(expectedTeacher));
    }
}
