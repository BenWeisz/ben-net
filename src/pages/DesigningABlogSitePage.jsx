import React from "react";

import _ from "lodash";

import "../style/contents.css";

import SectionBlock from "../components/SectionBlock";
import TextBlock from "../components/TextBlock";

const DesigningABlogSitePage = () => {
	const sections = [
	];

	return (
		<div class="vert-contents">
			<SectionBlock title="Designing a blog site" upper>
				<p style={{ paddingBottom: "0.5rem" }}>
					{"2024-01-30"}
				</p>
			</SectionBlock>
			<TextBlock
				block={{
					content: "I've always wanted to create a blog page to share my programming and other tech exploits. Well ... maybe not just to share them but also because I feel when I  write a blog post about a project I'm working on, I'm more likely to actually complete that project. Honestly I think it would be quite egotisticaly for me to  think that anyone would really want to read this. But here we are :) I needed a blog site and I started looking around for some templates.   ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "In the past I had seen ***Austin Morlan's website*** and was captivated by its simplicity for what it was. At first I was trying to figure out what kind of  template system he was using to make his blog but I just couldnt figure it out. Maybe [Hugo](https://gohugo.io/)? I wasn't really sure. Even then, I found that a lot of the block templates on Hugo were cluttered with random junk. Someone once said, simple is best. I'm not sure who said that, but I quite like it. I'm sure I could have probably figured out how to remove a bunch of that junk but I'm a programmer and not a system administrator. I much enjoy going on a long long journey than taking a few minutes to learn how to configure a page in a frame work I honestly don't really care for.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "That brings us to the classic programmer's problem which is that we want to build everything. So that's pretty much how I ended up on a journey to make my own blog website. As you peruse this blog site your going to see that most of the designs were shamelessly stolen from [Austin Morlan's website](https://austinmorlan.com), so shout-out to that guy for making his site.  I took some liberties to improve my site were I could but there's still a lot of features that I'm lacking. For one you can't post images yet. You also can't write inline code.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "I'll try to post a good readme on my github for how to use the post manager python scripts, so If you want to make a blog site feel free to clone the blog site's repo.  ",
					id: _.uniqueId(),
				}}
			/>
			<p style={{ textAlign: "center", padding: "2rem"}}>
				Last Updated {"2024-01-31"}
			</p>
		</div>
	);
};

export default DesigningABlogSitePage;