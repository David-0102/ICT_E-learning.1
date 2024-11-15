import React from 'react';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';

const MOCK_COURSES = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    instructor: 'John Doe',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
    enrolledCount: 156,
    materials: []
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts and patterns used in modern web applications.',
    instructor: 'Jane Smith',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000',
    enrolledCount: 89,
    materials: []
  },
  {
    id: '3',
    title: 'Data Structures & Algorithms',
    description: 'Comprehensive guide to fundamental data structures and algorithms in programming.',
    instructor: 'Mike Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1000',
    enrolledCount: 234,
    materials: []
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = React.useState<string[]>([]);

  const handleEnroll = (courseId: string) => {
    setEnrolledCourses((prev) => [...prev, courseId]);
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {user?.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
          </h2>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">
          {user?.role === 'admin' ? 'Manage Courses' : 'Available Courses'}
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_COURSES.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={user?.role === 'student' ? () => handleEnroll(course.id) : undefined}
              enrolled={enrolledCourses.includes(course.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}