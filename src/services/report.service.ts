import { eq } from "drizzle-orm";
import { reports } from "../db/schema/report.schema";
import { Report } from "../dtos/report.dto";
import { db } from "../utils/db";

/**
 * Creates a new report
 * @param report - Report data to create
 * @returns Created report object or null if creation failed
 */
const create = async (report: Report): Promise<Report> => {
  const response = await db.insert(reports).values(report).returning();
  return response.length > 0 ? response[0] : null;
};

/**
 * Retrieves a single report by ID
 * @param id - Report ID
 * @returns Report object or null if not found
 */
const getOne = async (id: string) => {
  const report = await db.select().from(reports).where(eq(reports.id, id));
  return report.length > 0 ? report[0] : null;
};

/**
 * Retrieves all reports
 * @returns List of all reports
 */
const getAll = async () => {
  return await db.select().from(reports);
};

/**
 * Deletes a report by ID
 * @param id - Report ID
 */
const deleteReport = async (id: string): Promise<void> => {
  await db.delete(reports).where(eq(reports.id, id));
};

/**
 * Updates an existing report and returns the updated report
 * @param id - Report ID
 * @param report - Report data to update
 * @returns Updated report object or null if not found
 */
const updateReport = async (
  id: string,
  report: Report
): Promise<Report | null> => {
  const response = await db
    .update(reports)
    .set(report)
    .where(eq(reports.id, id))
    .returning();
  return response.length > 0 ? response[0] : null;
};

export default { create, getOne, getAll, deleteReport, updateReport };
