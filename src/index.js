import "dotenv/config";
import { activity } from "./config.js";
import { fetchActivities } from "./updaters/fetchActivities.js";
import { writeFileSync, readFileSync } from "fs";

const start = new Date().getTime();
const readme = readFileSync("./README.md", "utf8");

const [activityList] = await Promise.all([fetchActivities(activity.gitUsername)]);

const readmeActivity = `${readme.substring(0, readme.indexOf(activity.open) + activity.open.length)}\n${activityList.join("<br>")}\n${readme.substring(readme.indexOf(activity.close))}`;

writeFileSync("./README.md", readmeActivity.trim());

console.log(`::debug:: README updated in ${((new Date().getTime() - start) / 1000).toFixed(2)}s`);