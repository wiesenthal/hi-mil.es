import {
  fetchRepositoryReadme,
  fetchUserRepositories,
} from "~/utils/github/githubApi";
import { ProjectSchema } from "./Project";

export async function readProject(slug: string) {
  try {
    const repos = await fetchUserRepositories("wiesenthal");
    const repo = repos.find((r) => r.name === slug);

    if (!repo) {
      return null;
    }

    // Parse and validate the repository with our schema
    const parsed = ProjectSchema.safeParse({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      topics: repo.topics,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      private: repo.private,
    });

    if (!parsed.success) {
      console.error(`Error parsing repository ${repo.name}:`, parsed.error);
      return null;
    }

    // Fetch the README content
    const readmeContent = await fetchRepositoryReadme("wiesenthal", repo.name);

    return {
      slug: repo.name,
      content:
        readmeContent ??
        repo.description ??
        `# ${repo.name}\n\nNo README available for this project.`,
      ...parsed.data,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}
