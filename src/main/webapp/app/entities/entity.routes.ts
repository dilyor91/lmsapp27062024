import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'lmsapp27062024App.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'course',
    data: { pageTitle: 'lmsapp27062024App.course.home.title' },
    loadChildren: () => import('./course/course.routes'),
  },
  {
    path: 'course-section',
    data: { pageTitle: 'lmsapp27062024App.courseSection.home.title' },
    loadChildren: () => import('./course-section/course-section.routes'),
  },
  {
    path: 'accounts',
    data: { pageTitle: 'lmsapp27062024App.accounts.home.title' },
    loadChildren: () => import('./accounts/accounts.routes'),
  },
  {
    path: 'enrollment',
    data: { pageTitle: 'lmsapp27062024App.enrollment.home.title' },
    loadChildren: () => import('./enrollment/enrollment.routes'),
  },
  {
    path: 'announcement',
    data: { pageTitle: 'lmsapp27062024App.announcement.home.title' },
    loadChildren: () => import('./announcement/announcement.routes'),
  },
  {
    path: 'assignment',
    data: { pageTitle: 'lmsapp27062024App.assignment.home.title' },
    loadChildren: () => import('./assignment/assignment.routes'),
  },
  {
    path: 'calendar-event',
    data: { pageTitle: 'lmsapp27062024App.calendarEvent.home.title' },
    loadChildren: () => import('./calendar-event/calendar-event.routes'),
  },
  {
    path: 'wiki-page',
    data: { pageTitle: 'lmsapp27062024App.wikiPage.home.title' },
    loadChildren: () => import('./wiki-page/wiki-page.routes'),
  },
  {
    path: 'attendance',
    data: { pageTitle: 'lmsapp27062024App.attendance.home.title' },
    loadChildren: () => import('./attendance/attendance.routes'),
  },
  {
    path: 'attendance-detail',
    data: { pageTitle: 'lmsapp27062024App.attendanceDetail.home.title' },
    loadChildren: () => import('./attendance-detail/attendance-detail.routes'),
  },
  {
    path: 'student',
    data: { pageTitle: 'lmsapp27062024App.student.home.title' },
    loadChildren: () => import('./student/student.routes'),
  },
  {
    path: 'teacher',
    data: { pageTitle: 'lmsapp27062024App.teacher.home.title' },
    loadChildren: () => import('./teacher/teacher.routes'),
  },
  {
    path: 'study-academic-year',
    data: { pageTitle: 'lmsapp27062024App.studyAcademicYear.home.title' },
    loadChildren: () => import('./study-academic-year/study-academic-year.routes'),
  },
  {
    path: 'faculty',
    data: { pageTitle: 'lmsapp27062024App.faculty.home.title' },
    loadChildren: () => import('./faculty/faculty.routes'),
  },
  {
    path: 'speciality',
    data: { pageTitle: 'lmsapp27062024App.speciality.home.title' },
    loadChildren: () => import('./speciality/speciality.routes'),
  },
  {
    path: 'group',
    data: { pageTitle: 'lmsapp27062024App.group.home.title' },
    loadChildren: () => import('./group/group.routes'),
  },
  {
    path: 'department',
    data: { pageTitle: 'lmsapp27062024App.department.home.title' },
    loadChildren: () => import('./department/department.routes'),
  },
  {
    path: 'question-group',
    data: { pageTitle: 'lmsapp27062024App.questionGroup.home.title' },
    loadChildren: () => import('./question-group/question-group.routes'),
  },
  {
    path: 'question',
    data: { pageTitle: 'lmsapp27062024App.question.home.title' },
    loadChildren: () => import('./question/question.routes'),
  },
  {
    path: 'option',
    data: { pageTitle: 'lmsapp27062024App.option.home.title' },
    loadChildren: () => import('./option/option.routes'),
  },
  {
    path: 'quiz',
    data: { pageTitle: 'lmsapp27062024App.quiz.home.title' },
    loadChildren: () => import('./quiz/quiz.routes'),
  },
  {
    path: 'quiz-question-group',
    data: { pageTitle: 'lmsapp27062024App.quizQuestionGroup.home.title' },
    loadChildren: () => import('./quiz-question-group/quiz-question-group.routes'),
  },
  {
    path: 'quiz-course-section',
    data: { pageTitle: 'lmsapp27062024App.quizCourseSection.home.title' },
    loadChildren: () => import('./quiz-course-section/quiz-course-section.routes'),
  },
  {
    path: 'quiz-session',
    data: { pageTitle: 'lmsapp27062024App.quizSession.home.title' },
    loadChildren: () => import('./quiz-session/quiz-session.routes'),
  },
  {
    path: 'student-option',
    data: { pageTitle: 'lmsapp27062024App.studentOption.home.title' },
    loadChildren: () => import('./student-option/student-option.routes'),
  },
  {
    path: 'student-question',
    data: { pageTitle: 'lmsapp27062024App.studentQuestion.home.title' },
    loadChildren: () => import('./student-question/student-question.routes'),
  },
  {
    path: 'student-answer-question',
    data: { pageTitle: 'lmsapp27062024App.studentAnswerQuestion.home.title' },
    loadChildren: () => import('./student-answer-question/student-answer-question.routes'),
  },
  {
    path: 'quiz-result',
    data: { pageTitle: 'lmsapp27062024App.quizResult.home.title' },
    loadChildren: () => import('./quiz-result/quiz-result.routes'),
  },
  {
    path: 'lesson',
    data: { pageTitle: 'lmsapp27062024App.lesson.home.title' },
    loadChildren: () => import('./lesson/lesson.routes'),
  },
  {
    path: 'study-term',
    data: { pageTitle: 'lmsapp27062024App.studyTerm.home.title' },
    loadChildren: () => import('./study-term/study-term.routes'),
  },
  {
    path: 'assignment-course-section',
    data: { pageTitle: 'lmsapp27062024App.assignmentCourseSection.home.title' },
    loadChildren: () => import('./assignment-course-section/assignment-course-section.routes'),
  },
  {
    path: 'course-week-info',
    data: { pageTitle: 'lmsapp27062024App.courseWeekInfo.home.title' },
    loadChildren: () => import('./course-week-info/course-week-info.routes'),
  },
  {
    path: 'course-week',
    data: { pageTitle: 'lmsapp27062024App.courseWeek.home.title' },
    loadChildren: () => import('./course-week/course-week.routes'),
  },
  {
    path: 'lesson-material',
    data: { pageTitle: 'lmsapp27062024App.lessonMaterial.home.title' },
    loadChildren: () => import('./lesson-material/lesson-material.routes'),
  },
  {
    path: 'attachment',
    data: { pageTitle: 'lmsapp27062024App.attachment.home.title' },
    loadChildren: () => import('./attachment/attachment.routes'),
  },
  {
    path: 'submission-assignment',
    data: { pageTitle: 'lmsapp27062024App.submissionAssignment.home.title' },
    loadChildren: () => import('./submission-assignment/submission-assignment.routes'),
  },
  {
    path: 'grade',
    data: { pageTitle: 'lmsapp27062024App.grade.home.title' },
    loadChildren: () => import('./grade/grade.routes'),
  },
  {
    path: 'assignment-comment',
    data: { pageTitle: 'lmsapp27062024App.assignmentComment.home.title' },
    loadChildren: () => import('./assignment-comment/assignment-comment.routes'),
  },
  {
    path: 'notification',
    data: { pageTitle: 'lmsapp27062024App.notification.home.title' },
    loadChildren: () => import('./notification/notification.routes'),
  },
  {
    path: 'calendar-todo',
    data: { pageTitle: 'lmsapp27062024App.calendarTodo.home.title' },
    loadChildren: () => import('./calendar-todo/calendar-todo.routes'),
  },
  {
    path: 'announcement-course-section',
    data: { pageTitle: 'lmsapp27062024App.announcementCourseSection.home.title' },
    loadChildren: () => import('./announcement-course-section/announcement-course-section.routes'),
  },
  {
    path: 'building',
    data: { pageTitle: 'lmsapp27062024App.building.home.title' },
    loadChildren: () => import('./building/building.routes'),
  },
  {
    path: 'room',
    data: { pageTitle: 'lmsapp27062024App.room.home.title' },
    loadChildren: () => import('./room/room.routes'),
  },
  {
    path: 'announcement-student-read',
    data: { pageTitle: 'lmsapp27062024App.announcementStudentRead.home.title' },
    loadChildren: () => import('./announcement-student-read/announcement-student-read.routes'),
  },
  {
    path: 'time-table',
    data: { pageTitle: 'lmsapp27062024App.timeTable.home.title' },
    loadChildren: () => import('./time-table/time-table.routes'),
  },
  {
    path: 'message',
    data: { pageTitle: 'lmsapp27062024App.message.home.title' },
    loadChildren: () => import('./message/message.routes'),
  },
  {
    path: 'message-to-user',
    data: { pageTitle: 'lmsapp27062024App.messageToUser.home.title' },
    loadChildren: () => import('./message-to-user/message-to-user.routes'),
  },
  {
    path: 'message-attachment',
    data: { pageTitle: 'lmsapp27062024App.messageAttachment.home.title' },
    loadChildren: () => import('./message-attachment/message-attachment.routes'),
  },
  {
    path: 'community',
    data: { pageTitle: 'lmsapp27062024App.community.home.title' },
    loadChildren: () => import('./community/community.routes'),
  },
  {
    path: 'tag',
    data: { pageTitle: 'lmsapp27062024App.tag.home.title' },
    loadChildren: () => import('./tag/tag.routes'),
  },
  {
    path: 'community-attachment',
    data: { pageTitle: 'lmsapp27062024App.communityAttachment.home.title' },
    loadChildren: () => import('./community-attachment/community-attachment.routes'),
  },
  {
    path: 'community-course',
    data: { pageTitle: 'lmsapp27062024App.communityCourse.home.title' },
    loadChildren: () => import('./community-course/community-course.routes'),
  },
  {
    path: 'community-tag',
    data: { pageTitle: 'lmsapp27062024App.communityTag.home.title' },
    loadChildren: () => import('./community-tag/community-tag.routes'),
  },
  {
    path: 'community-message',
    data: { pageTitle: 'lmsapp27062024App.communityMessage.home.title' },
    loadChildren: () => import('./community-message/community-message.routes'),
  },
  {
    path: 'exam',
    data: { pageTitle: 'lmsapp27062024App.exam.home.title' },
    loadChildren: () => import('./exam/exam.routes'),
  },
  {
    path: 'exam-result',
    data: { pageTitle: 'lmsapp27062024App.examResult.home.title' },
    loadChildren: () => import('./exam-result/exam-result.routes'),
  },
  {
    path: 'activity',
    data: { pageTitle: 'lmsapp27062024App.activity.home.title' },
    loadChildren: () => import('./activity/activity.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
