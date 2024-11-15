import React from 'react';
import { Course } from '../types';
import { Users } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
  enrolled?: boolean;
}

export default function CourseCard({ course, onEnroll, enrolled }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {course.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            {course.enrolledCount} enrolled
          </div>
          <p className="text-sm text-gray-500">
            By {course.instructor}
          </p>
        </div>
        {onEnroll && (
          <button
            onClick={onEnroll}
            className={`mt-4 w-full rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
              enrolled
                ? 'bg-gray-100 text-gray-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
            disabled={enrolled}
          >
            {enrolled ? 'Enrolled' : 'Enroll Now'}
          </button>
        )}
      </div>
    </div>
  );
}