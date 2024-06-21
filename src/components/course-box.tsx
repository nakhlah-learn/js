import type { Course } from "@/server/types";

import Link from "next/link";
export default function CourseBox({
  course,
  groupLabel,
}: {
  course: Course;
  groupLabel?: string;
}) {
  const href = groupLabel
    ? `/course/${groupLabel}/${course.slug}`
    : `/course/${course.slug}`;
  return (
    <Link
      href={href}
      className="hover:underline"
      key={course.slug}
      style={{ order: course.order }}
    >
      <p>{course.title}</p>
    </Link>
  );
}
