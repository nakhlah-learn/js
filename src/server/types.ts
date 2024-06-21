export interface Course {
  slug: string;
  title: string;
  content: string;
  snippet: string;
  order: number;
}

export interface CourseGroup {
  order: number;
  label: string;
  lableSlug: string;
  courses: Course[];
}

export interface GroubLabel {
  label: string;
  lableSlug: string;
}

export interface CourseHeader {
  title: string;
  snippet: string;
  order: number;
}
