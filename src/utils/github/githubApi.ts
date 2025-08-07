import { z } from "zod";

const GitHubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  clone_url: z.string(),
  ssh_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
  topics: z.array(z.string()),
  archived: z.boolean(),
  disabled: z.boolean(),
  private: z.boolean(),
});

const GitHubReadmeSchema = z.object({
  name: z.string(),
  path: z.string(),
  sha: z.string(),
  size: z.number(),
  url: z.string(),
  html_url: z.string(),
  git_url: z.string(),
  download_url: z.string(),
  type: z.string(),
  content: z.string(),
  encoding: z.string(),
});

type GitHubRepository = z.infer<typeof GitHubRepositorySchema>;

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchUserRepositories(username: string): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'hi-mil.es'
      },
      // Cache for 5 minutes to avoid hitting rate limits too often
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const reposData: unknown = await response.json();
    const repos = z.array(GitHubRepositorySchema).parse(reposData);
    
    // Filter out archived, disabled, and empty repos, and sort by updated date
    return repos
      .filter(repo => !repo.archived && !repo.disabled && repo.description)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

export async function fetchRepositoryReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'hi-mil.es'
      },
      // Cache for 1 hour
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // No README found
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const readmeData: unknown = await response.json();
    const readme = GitHubReadmeSchema.parse(readmeData);
    
    // Decode base64 content
    const content = Buffer.from(readme.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    console.error(`Error fetching README for ${owner}/${repo}:`, error);
    return null;
  }
}

export type { GitHubRepository };