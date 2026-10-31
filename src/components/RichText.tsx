import { Fragment, ReactNode } from 'react';

// **bold**, <b>bold</b> or <strong>bold</strong>
const TOKEN =
  /\*\*([\s\S]+?)\*\*|<b>([\s\S]+?)<\/b>|<strong>([\s\S]+?)<\/strong>/g;

export const parseRichText = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  Array.from(text.matchAll(TOKEN)).forEach((match) => {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    nodes.push(
      <strong key={index} className="font-bold">
        {match[1] ?? match[2] ?? match[3]}
      </strong>,
    );
    index += 1;
    last = start + match[0].length;
  });
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

/** Plain text version (markup removed), e.g. for <title> or aria-labels. */
export const stripRichText = (text: string): string =>
  text.replace(TOKEN, (_m, a, b, c) => a ?? b ?? c);

/**
 * Renders a translation string with light inline styling.
 * Supports **bold** and <b>bold</b>; everything else is rendered as plain
 * text (no HTML is injected).
 */
const RichText = ({ text }: { text: string }) => (
  <Fragment>{parseRichText(text)}</Fragment>
);

export default RichText;
