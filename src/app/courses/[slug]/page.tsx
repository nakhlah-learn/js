import type { CourseGroup } from "@/server/types";

import { getCourses } from "@/server/markdown";

import { Accordion } from "@/components/ui/accordion";
import CourseBox from "@/components/course-box";

interface Props {
  params: { slug: string };
}

export default async function HomePage({ params }: Props) {
  const courses = (await getCourses(params.slug)) as CourseGroup;

  return (
    <main className="container mx-auto px-4 py-8">
      <Accordion type="single" collapsible className="flex flex-col gap-2">
        {courses.courses.map((course) => {
          return (
            <div
              key={course.slug}
              style={{ order: course.order }}
              className="rounded border p-2"
            >
              <CourseBox course={course} groupLabel={courses.lableSlug} />
            </div>
          );
        })}
      </Accordion>
    </main>
  );
}
