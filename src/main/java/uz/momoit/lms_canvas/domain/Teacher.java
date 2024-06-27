package uz.momoit.lms_canvas.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import uz.momoit.lms_canvas.domain.enumeration.AcademicDegreeEnum;
import uz.momoit.lms_canvas.domain.enumeration.AcademicTitleEnum;
import uz.momoit.lms_canvas.domain.enumeration.GenderEnum;
import uz.momoit.lms_canvas.domain.enumeration.PositionEnum;

/**
 * A Teacher.
 */
@Entity
@Table(name = "teacher")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "middle_name")
    private String middleName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private GenderEnum gender;

    @NotNull
    @Column(name = "birthdate", nullable = false)
    private String birthdate;

    @Column(name = "phone_number")
    private String phoneNumber;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "passport_number", nullable = false)
    private String passportNumber;

    @NotNull
    @Column(name = "jshshir", nullable = false)
    private String jshshir;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "region")
    private String region;

    @Column(name = "address_line")
    private String addressLine;

    @Enumerated(EnumType.STRING)
    @Column(name = "position")
    private PositionEnum position;

    @Enumerated(EnumType.STRING)
    @Column(name = "academic_degree")
    private AcademicDegreeEnum academicDegree;

    @Enumerated(EnumType.STRING)
    @Column(name = "academic_title")
    private AcademicTitleEnum academicTitle;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Faculty faculty;

    @ManyToOne(fetch = FetchType.LAZY)
    private Department department;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Teacher id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Teacher firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Teacher lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return this.middleName;
    }

    public Teacher middleName(String middleName) {
        this.setMiddleName(middleName);
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public GenderEnum getGender() {
        return this.gender;
    }

    public Teacher gender(GenderEnum gender) {
        this.setGender(gender);
        return this;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public String getBirthdate() {
        return this.birthdate;
    }

    public Teacher birthdate(String birthdate) {
        this.setBirthdate(birthdate);
        return this;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public Teacher phoneNumber(String phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return this.email;
    }

    public Teacher email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassportNumber() {
        return this.passportNumber;
    }

    public Teacher passportNumber(String passportNumber) {
        this.setPassportNumber(passportNumber);
        return this;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getJshshir() {
        return this.jshshir;
    }

    public Teacher jshshir(String jshshir) {
        this.setJshshir(jshshir);
        return this;
    }

    public void setJshshir(String jshshir) {
        this.jshshir = jshshir;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }

    public Teacher isActive(Boolean isActive) {
        this.setIsActive(isActive);
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getNationality() {
        return this.nationality;
    }

    public Teacher nationality(String nationality) {
        this.setNationality(nationality);
        return this;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getCountry() {
        return this.country;
    }

    public Teacher country(String country) {
        this.setCountry(country);
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return this.city;
    }

    public Teacher city(String city) {
        this.setCity(city);
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return this.region;
    }

    public Teacher region(String region) {
        this.setRegion(region);
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getAddressLine() {
        return this.addressLine;
    }

    public Teacher addressLine(String addressLine) {
        this.setAddressLine(addressLine);
        return this;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public PositionEnum getPosition() {
        return this.position;
    }

    public Teacher position(PositionEnum position) {
        this.setPosition(position);
        return this;
    }

    public void setPosition(PositionEnum position) {
        this.position = position;
    }

    public AcademicDegreeEnum getAcademicDegree() {
        return this.academicDegree;
    }

    public Teacher academicDegree(AcademicDegreeEnum academicDegree) {
        this.setAcademicDegree(academicDegree);
        return this;
    }

    public void setAcademicDegree(AcademicDegreeEnum academicDegree) {
        this.academicDegree = academicDegree;
    }

    public AcademicTitleEnum getAcademicTitle() {
        return this.academicTitle;
    }

    public Teacher academicTitle(AcademicTitleEnum academicTitle) {
        this.setAcademicTitle(academicTitle);
        return this;
    }

    public void setAcademicTitle(AcademicTitleEnum academicTitle) {
        this.academicTitle = academicTitle;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Teacher user(User user) {
        this.setUser(user);
        return this;
    }

    public Faculty getFaculty() {
        return this.faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public Teacher faculty(Faculty faculty) {
        this.setFaculty(faculty);
        return this;
    }

    public Department getDepartment() {
        return this.department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Teacher department(Department department) {
        this.setDepartment(department);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Teacher)) {
            return false;
        }
        return getId() != null && getId().equals(((Teacher) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", gender='" + getGender() + "'" +
            ", birthdate='" + getBirthdate() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", passportNumber='" + getPassportNumber() + "'" +
            ", jshshir='" + getJshshir() + "'" +
            ", isActive='" + getIsActive() + "'" +
            ", nationality='" + getNationality() + "'" +
            ", country='" + getCountry() + "'" +
            ", city='" + getCity() + "'" +
            ", region='" + getRegion() + "'" +
            ", addressLine='" + getAddressLine() + "'" +
            ", position='" + getPosition() + "'" +
            ", academicDegree='" + getAcademicDegree() + "'" +
            ", academicTitle='" + getAcademicTitle() + "'" +
            "}";
    }
}
