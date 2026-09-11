import fs from "fs";
import path from "path";

// Load environment variables from .env manually if MONGODB_URI is not present
if (!process.env.MONGODB_URI) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      envContent.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const firstEqual = trimmed.indexOf("=");
          if (firstEqual !== -1) {
            const key = trimmed.slice(0, firstEqual).trim();
            let val = trimmed.slice(firstEqual + 1).trim();
            // Strip outer quotes if present
            if (
              (val.startsWith('"') && val.endsWith('"')) ||
              (val.startsWith("'") && val.endsWith("'"))
            ) {
              val = val.slice(1, -1);
            }
            process.env[key] = val;
          }
        }
      });
    }
  } catch (err) {
    console.warn("Could not load .env file manually in seed script:", err);
  }
}

import { seedBlogPosts, seedProfile, seedProjects, seedSettings } from "@/data/seed-data";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { Profile } from "@/models/Profile";
import { Project } from "@/models/Project";
import { SiteSettings } from "@/models/SiteSettings";

async function seed(): Promise<void> {
  await connectDB();

  await Promise.all([
    Profile.deleteMany({}),
    SiteSettings.deleteMany({}),
    Project.deleteMany({}),
    BlogPost.deleteMany({}),
  ]);

  await Promise.all([
    Profile.create(seedProfile),
    SiteSettings.create(seedSettings),
    Project.insertMany(seedProjects),
    BlogPost.insertMany(seedBlogPosts),
  ]);

  console.log("Seed complete: profile, settings, projects, and blog posts inserted.");
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
