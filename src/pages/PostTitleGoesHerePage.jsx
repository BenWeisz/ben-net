import React, { useRef } from "react";

import _ from "lodash";

import "../style/contents.css";

import SectionBlock from "../components/SectionBlock";
import SectionBox from "../components/SectionBox";
import TextBlock from "../components/TextBlock";
import LatexBlock from "../components/LatexBlock";
import BulletsBlock from "../components/BulletsBlock";
import CodeBlock from "../components/CodeBlock";

const PostTitleGoesHerePage = () => {
	const sections = [
		{ id: _.uniqueId(), content: "This is a section"},
		{ id: _.uniqueId(), content: "This is yet another section"},
		{ id: _.uniqueId(), content: "Bullet Element Section"},
		{ id: _.uniqueId(), content: "Text inline elements"},
	];

	const sectionRefs = useRef([null, null, null, null]);

	return (
		<div class="vert-contents">
			<SectionBlock title="Post Title Goes Here" upper>
				<p style={{ paddingBottom: "0.5rem" }}>
					{"2024-01-30"}
				</p>
			</SectionBlock>
			<SectionBox sections={sections} sectionRefs={sectionRefs} />

			<SectionBlock
				ref={(el) => {
					sectionRefs.current[0] = el;
				}}
				key={sections[0].id}
				title={sections[0].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "If you add any -Section- tags a section box will appear for the user to provide click navigation  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "Paragrahs can be written on multiple lines and will appear as one paragraph on the post page.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "If you want to use latex, use the following notation:  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$e=mc^2$" }} />
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[1] = el;
				}}
				key={sections[1].id}
				title={sections[1].content}
				upper={null}
			/>
			<CodeBlock
				block={{
					language: "C",
					content: "int main() {\n    int foo = 1000;\n    int bar = 2000;\n    // This is how you can write code blocks, it works with most languages\n    return 0;\n}",
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[2] = el;
				}}
				key={sections[2].id}
				title={sections[2].content}
				upper={null}
			/>
			<BulletsBlock
				block={{
					content: [
						{ item: "This is a bullet element", id: _.uniqueId() },
						{ item: "And another", id: _.uniqueId() },
						{ item: "And yet another", id: _.uniqueId() },
					],
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[3] = el;
				}}
				key={sections[3].id}
				title={sections[3].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "This is how you can ***bold*** a piece of text inline. This is an inline [Link](https://www.google.com/)  ",
					id: _.uniqueId(),
				}}
			/>
			<p style={{ textAlign: "center", padding: "2rem"}}>
				Last Updated {"2024-01-30"}
			</p>
		</div>
	);
};

export default PostTitleGoesHerePage;