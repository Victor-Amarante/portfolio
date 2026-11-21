// Files in /public are served under the basePath (see next.config.ts), so
// plain <a>/<img> URLs need the prefix that next/link and next/image add for you.
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${path}`;
