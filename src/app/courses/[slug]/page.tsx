import type { CourseGroup } from "@/server/types";

import { getCourses } from "@/server/markdown";

import { Accordion } from "@/components/ui/accordion";
import CourseBox from "@/components/course-box";

interface Props {
  params: { slug: string };
}

export default async function HomePage({ params }: Props) {
  const course = (await getCourses(params.slug)) as CourseGroup;

  if (!course.courses) {
    // TODO: return 404
    return;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Accordion type="single" collapsible className="flex flex-col gap-2">
        {course.courses.map((c) => {
          return (
            <div
              key={c.slug}
              style={{ order: course.order }}
              className="rounded border p-2"
            >
              <CourseBox course={c} groupLabel={course.lableSlug} />
            </div>
          );
        })}
      </Accordion>
    </main>
  );
}
