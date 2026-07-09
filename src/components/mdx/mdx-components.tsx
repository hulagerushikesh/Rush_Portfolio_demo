import type { MDXComponents } from 'mdx/types';
import CodeBlock from './CodeBlock';
import MDXImage from './MDXImage';

/** Shared component overrides for all MDXRemote renders (blog + projects). */
export const mdxComponents: MDXComponents = {
  pre: CodeBlock,
  img: MDXImage,
};
