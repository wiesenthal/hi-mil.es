import { fetchUserRepositories } from "~/utils/github/githubApi";
import { ProjectSchema } from "./Project";

export async function listProjects() {
  try {
    const repos = await fetchUserRepositories("wiesenthal");
    
    // Parse and validate each repository with our schema
    const projects = repos
      .map(repo => {
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

        return {
          slug: repo.name,
          content: repo.description || "",
          ...parsed.data,
        };
      })
      .filter((project): project is NonNullable<typeof project> => project !== null);

    return projects;
  } catch (error) {
    console.error("Error listing projects:", error);
    return [];
  }
}