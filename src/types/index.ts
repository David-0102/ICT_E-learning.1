export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  enrolledCount: number;
  materials: Material[];
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video';
  url: string;
}

export interface Enrollment {
  userId: string;
  courseId: string;
  enrolledAt: string;
}