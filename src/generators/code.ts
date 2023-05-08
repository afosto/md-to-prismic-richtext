import {IMarkdownNode, IRichTextBlock} from "../types";
import {GenerationResult} from "./generators";

export const generate = (node: IMarkdownNode, offset: number): GenerationResult<IRichTextBlock> => {
    return [
        [
            {
                type: 'preformatted',
                content: {
                    text: node.value || '',
                    spans: [],
                },
            },
        ],
        node.value || '',
        [offset, offset],
    ];
};