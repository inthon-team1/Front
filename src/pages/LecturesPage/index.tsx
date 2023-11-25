import React from 'react';
import { Box, Card, CardContent, Typography, Link, Button } from '@mui/material';

// 강의 정보를 위한 TypeScript 인터페이스 정의
interface Course {
  id: string;
  year: string;    // 연도
  code: string;    // 학수번호
  title: string;   // 수업 이름
  section: string; // 분반
  professor: string; // 담당 교수 이름
  link: string;    // 강의 상세 정보로의 링크
}

// 강의 아이템 컴포넌트
const CourseItem: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Card sx={{ width: 800, /*backgroundColor: 'white',*/ marginY: 1, boxShadow: 1, border: '1px solid black', marginX: 'auto' }}>
      <CardContent>
        {/* 연도와 학수번호를 나타내는 링크 */}
        <Link href={course.link} color="text.primary" underline="none">
          <Typography variant="subtitle1" component="h2">
            {course.year} {course.code}
          </Typography>
        </Link>
        {/* 수업 이름과 분반 정보 */}
        <Link href={course.link} color="text.primary" underline="none">
          <Typography variant="subtitle2" sx={{ fontSize: 18 }}>
            {course.title} - {course.section}
          </Typography>
        </Link>
        {/* 담당 교수 이름 */}
        <Typography variant="body2" color="purple">
          담당 교수: {course.professor}
        </Typography>
      </CardContent>
    </Card>
  );
};


// 강의 목록 컴포넌트
const CourseList: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 4 }}>
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </Box>
  );
};

const goToRegistrationPage = () => {
  // 여기에 강의 등록 페이지 URL을 넣습니다.
  const registrationUrl = '/Register-CoursePage';
  window.location.href = registrationUrl;
};

const goToCreatePage = () => {
  // 여기에 강의 개설 페이지 URL을 넣습니다.
  const createUrl = '/create-courses';
  window.location.href = createUrl;
};

// LecturesPage 컴포넌트
const LecturesPage: React.FC = () => {
  const courses: Course[] = [
    {
      id: '1',
      year: '2023-2',
      code: 'COSE221',
      title: '데이터베이스',
      section: '01분반',
      professor: '정순영',
      link: '/courses/1'
    },
    {
      id: '34',
      year: '2023-2',
      code: 'COSE101',
      title: '알고리즘',
      section: '02분반',
      professor: '박성빈',
      link: '/courses/34'
    },
    // ...기타 강의 데이터
  ];
  

  return (
    <Box sx={{ width: '100%', bgcolor: 'primary', padding: 2 }}>
      <CourseList courses={courses} />
      <Box sx={{ display: 'flex', justifyContent: 'center',  marginTop: 4 }}>
        <Button variant="contained" color="primary" onClick={goToRegistrationPage}>
          강의 등록
        </Button>
      </Box>
    </Box>
  );
};

export default LecturesPage;
