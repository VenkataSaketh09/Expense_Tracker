import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
const sql = neon('postgresql://account:2Ms6eIUNmHnK@ep-calm-river-a5i08u84.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require');
export const db = drizzle(sql,{schema});
