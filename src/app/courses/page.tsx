export const dynamic = "force-static";

import type { Course, CourseGroup } from "@/server/types";

import { getCourses } from "@/server/markdown";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CourseBox from "@/components/course-box";

export default async function HomePage() {
  const courses = (await getCourses()) as (Course | CourseGroup)[];

  return (
    <main className="container mx-auto px-4 py-8">
      <Accordion type="single" collapsible className="flex flex-col gap-2">
        {courses.map((course) => {
          if ("courses" in course) {
            return (
              <AccordionItem
                value={course.lableSlug}
                key={course.lableSlug}
                style={{ order: course.order }}
              >
                <AccordionTrigger className="rounded border p-2 font-bold">
                  {course.label}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1 rounded border p-2">
                  {course.courses.map((childCourse) => (
                    <CourseBox
                      key={childCourse.slug}
                      course={childCourse}
                      groupLabel={course.lableSlug}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          } else {
            return (
              <div
                key={course.slug}
                style={{ order: course.order }}
                className="rounded border p-2"
              >
                <CourseBox course={course} />
              </div>
            );
          }
        })}
      </Accordion>
    </main>
  );
}
