# Adding articles

Add a `lowercase-slug.mdx` (or `.md`) file here. Original articles render at `/blog/lowercase-slug`. Only commit trusted author content: MDX executes as server code.

Required frontmatter:

```yaml
---
title: Your article title
description: A short introduction or your commentary on a curated link.
date: "2026-11-06"
category: Networking
---

Your original article in Markdown.
```

For a curated article, add `source: https://publisher.example/article` to the frontmatter. Its card links to the publisher, using the description as your commentary. Do not copy the publisher's article text.
