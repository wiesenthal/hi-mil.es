import { PrettyLink } from "~/app/components/PrettyLink";
import { listProjects } from "../utils/listProjects";
import { NavLink } from "~/app/components/NavLink";

export default async function ProjectList() {
  const projects = await listProjects();

  return (
    <div className="mx-auto flex h-full flex-col gap-8 p-4">
      <div className="flex animate-fade-in flex-col items-center justify-center">
        <h1 className="text-4xl font-light">Projects</h1>
        <div className="text-center text-xs font-light tracking-tighter">
          From GitHub: wiesenthal
        </div>
        <div className="mt-2 max-w-md text-center text-xs font-light tracking-tighter text-gray-500">
          ⚠️ This site is under construction. For now, this section simply
          clones my GitHub repositories.
        </div>
      </div>
      <ul className="flex max-h-full w-full animate-fade-in-2 flex-col items-center gap-8 overflow-y-auto border-b">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="relative flex w-full max-w-5xl cursor-auto flex-col justify-between gap-2 rounded from-white/10 via-white/30 via-20% to-white/50 p-3 shadow-inner drop-shadow"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="relative flex items-center gap-4">
                <NavLink
                  href={`/project/${project.slug}`}
                  className="w-96 max-w-96 text-lg font-light hover:underline"
                  target="_self"
                >
                  {project.name}
                </NavLink>
                <PrettyLink
                  href={project.html_url}
                  target="_blank"
                  className="absolute -right-20 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-light transition-colors"
                >
                  GitHub →
                </PrettyLink>
              </div>

              {project.description && (
                <p className="max-w-full text-sm font-light text-gray-700">
                  {project.description}
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-2">
                {project.language && (
                  <span className="rounded bg-white/20 px-2 py-1 text-xs font-light">
                    {project.language}
                  </span>
                )}
                {project.stargazers_count > 0 && (
                  <a
                    href={`${project.html_url}/stargazers`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light hover:underline"
                  >
                    ⭐ {project.stargazers_count}
                  </a>
                )}
                {project.forks_count > 0 && (
                  <a
                    href={`${project.html_url}/forks`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light hover:underline"
                  >
                    🍴 {project.forks_count}
                  </a>
                )}
              </div>

              {project.topics.length > 0 && (
                <div className="flex max-w-md flex-wrap justify-center gap-1">
                  {project.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-[#15ffad]/20 px-2 py-1 text-xs font-light"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-1 text-xs font-light text-gray-500">
                Updated:{" "}
                {new Date(project.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex-grow" />
      <div className="flex w-full animate-fade-in flex-row items-center justify-center">
        <NavLink href="/" target="_self">
          Home
        </NavLink>
      </div>
    </div>
  );
}
