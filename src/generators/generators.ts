import { IMarkdownNode, PrismicNode, IRichTextSpan, IRichTextBlock } from '../types';
import { generate as code } from './code';
import { generate as heading } from './heading';
import { generate as text } from './text';
import { generate as link } from './link';
import { generate as image } from './image';
import { generate as list } from './list';
import { generate as noop } from './noop';
import { block } from './block';
import { inline } from './inline';

export type GeneratorFn<T extends PrismicNode> = (node: IMarkdownNode, offset: number) => GenerationResult<T>;

export type GenerationResult<T extends PrismicNode> = [T[], string, [number, number]];

export interface IGeneratorCollection<T extends PrismicNode> {
  [key: string]: GeneratorFn<T>;
}

export const blocks: IGeneratorCollection<IRichTextBlock> = {
  heading,
  paragraph: block('paragraph'),
  definition: noop,
  code,
  list,
  html: noop,
  thematicBreak: noop,
};

export const spans: IGeneratorCollection<IRichTextSpan> = {
  text,
  image,
  html: noop,
  break: noop,
  listItem: inline('text'),
  inlineCode: noop,
  strong: inline('strong'),
  emphasis: inline('em'),
  link,
  linkReference: inline('strong'),
};

export function runGenerator<T extends PrismicNode>(
  node: IMarkdownNode,
  generators: { [key: string]: GeneratorFn<T> },
  defaultGenerator: GeneratorFn<T>,
  offset: number,
): GenerationResult<T> {
  if (!generators[node.type]) {
    /* tslint:disable-next-line */
    console.warn(`No direct translation of type "${node.type}" to prismic richtext found! Using a default generator.`);
    return defaultGenerator(node, offset);
  }

  return generators[node.type](node, offset);
}
