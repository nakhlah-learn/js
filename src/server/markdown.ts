import type { Course, CourseGroup } from "./types";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

async function readCourseData(filePath: string): Promise<Course | undefined> {
  try {
    const text = await fs.readFile(filePath, "utf-8");
    const { data: attrs, content: body } = matter(text);
    const slug = path.basename(filePath, ".md");
    const course: Course = {
      slug,
      title: attrs.title as string,
      content: body,
      snippet: attrs.snippet as string,
      order: attrs.order as number,
    };
    return course;
  } catch (error) {
    console.error("Error reading course data:", error);
    return undefined;
  }
}

async function readGroupData(
  groupPath: string,
): Promise<CourseGroup | undefined> {
  try {
    const dataJsonPath = path.join(groupPath, "_data.json");
    const jsonData = await fs.readFile(dataJsonPath, "utf-8");

    const { label, lableSlug, order } = JSON.parse(jsonData) as CourseGroup;
    const courses: Course[] = [];

    const files = await fs.readdir(groupPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && file.name.endsWith(".md")) {
        const filePath = path.join(groupPath, file.name);
        const course = await readCourseData(filePath);
        if (course) {
          courses.push(course);
        }
      }
    }

    return { order, label, lableSlug, courses };
  } catch (error) {
    console.error("Error reading group data:", error);
    return undefined;
  }
}

async function getCourses(
  groupLabel?: string,
): Promise<(Course | CourseGroup)[] | CourseGroup> {
  const coursesDir = "./courses";
  const groups: CourseGroup[] = [];
  const courses: Course[] = [];

  try {
    const files = await fs.readdir(coursesDir, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        const groupPath = path.join(coursesDir, file.name);
        const groupData = await readGroupData(groupPath);
        if (groupData) {
          groups.push(groupData);
        }
      } else if (file.isFile() && file.name.endsWith(".md")) {
        const filePath = path.join(coursesDir, file.name);
        const course = await readCourseData(filePath);
        if (course) {
          courses.push(course);
        }
      }
    }

    // Sort courses within each group by order
    groups.forEach((group) => group.courses.sort((a, b) => a.order - b.order));

    // Filter courses by groupLabel if provided
    if (groupLabel) {
      const filteredGroup = groups.find(
        (group) => group.lableSlug === groupLabel,
      );
      if (filteredGroup) {
        return filteredGroup;
      } else {
        return [];
      }
    }

    // Merge groups and individual courses
    const allCourses: (Course | CourseGroup)[] = [...groups, ...courses];

    return allCourses;
  } catch (error) {
    console.error("Error getting courses:", error);
    return [];
  }
}

export { getCourses };
