import React, { useRef } from "react";

import _ from "lodash";

import "../style/contents.css";

import SectionBlock from "../components/SectionBlock";
import SectionBox from "../components/SectionBox";
import TextBlock from "../components/TextBlock";

const BenSBooksPage = () => {
	const sections = [
		{ id: _.uniqueId(), content: "Programming"},
		{ id: _.uniqueId(), content: "Simulation & Physics"},
		{ id: _.uniqueId(), content: "Other"},
	];

	const sectionRefs = useRef([null, null, null]);

	return (
		<div class="vert-contents">
			<SectionBlock title="Ben's Books" upper>
				<p style={{ paddingBottom: "0.5rem" }}>
					{"2024-03-23"}
				</p>
			</SectionBlock>
			<SectionBox sections={sections} sectionRefs={sectionRefs} />

			<TextBlock
				block={{
					content: "I'm not much of a reader but I've recently started to think about how it would be better for me to be reading than watching youtube videos and such. I bet it's going to be a slog sometimes but I know it'll be worth it. I thought I'd make a list of books, textbooks, articles that I'm reading or have read. Some of these are are tech and programming related, but some might be math. There might be a couple other's in there as well. I'll try to keep this up to date!  ",
					id: _.uniqueId(),
				}}
			/>
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
					content: "[Beej's Networking Guide in C](https://beej.us/guide/bgnet0/html/split/): This one's a classic on socket programming in C. I've used it for a programming course  before. Beej is quite funny!  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "[Beej's C Programming Guide](https://beej.us/guide/bgc/html/split/): While I certainly don't consider myself a C newbie, there's always a ton that I'm learning. I feel as though I've already learned a lot in my job at Visual Concepts. Whether you're new to C or are getting rusty on some features that you have used in a While this ones a really good read. This is one that I read while waiting for code to compile at work.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "[Hash Table Implementation](https://craftinginterpreters.com/hash-tables.html): This ones part of Robert Nystrom's \"Crafting Interpreters\" book. While I haven't had the chance to read much of this book, I've read the hash tables section which was really good. It's got me thinking in depth on hash table implementation, so look out for a data structures github repo. It's also got me rethinking of how I should be writing initialization code for my arrays in C.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "[Program Optimization / Low Level Design](https://en.algorithmica.org/): This one goes deep into programming for specific architectures. It tries to get you to start thinking about how you should optimize your programs by targeting them for specific architectures. While I haven't read the full doc, I've read through some of the case studies at the  end and they show you how you can take your algorithms from a naive approach to ones that are 4x or 8x faster.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "[Posix Thread Programming](https://hpc-tutorials.llnl.gov/posix/): This ones a great ones for getting started with multiprocessing on a CPU using the POSIX pthreads API. While my M series Mac has these headers, unfortunately it seems that it doesn't really work with Apple's efficiency core setup. Maybe I'm just doing something wrong. Nonetheless on other platforms you can certainly increase execution time of programs that are parallelizable.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "[Learn OpenGL](https://learnopengl.com/): I've used this to learn OpenGL in the past although I haven't gotten through all the material. If I remember correctly, one of the things it shows you how to do is implement shadow buffers. Unfortunately, this is only for directional lights so if you want to render shawdows caused by point lights you'll have to look for another tutorial that shows you how to implement them via cub map shadow buffers.  ",
					id: _.uniqueId(),
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[1] = el;
				}}
				key={sections[1].id}
				title={sections[1].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "[David Levin's Physics Sim Videos](https://youtu.be/5j37DOD8q4U?si=TYpyqgJ3y66fi1AD): I know, I know this isn't a book, but its quite literally the best resource for people to get into physcis simulation. David Levin is one of my favourite prof's from my time at UofT!  ",
					id: _.uniqueId(),
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
			<TextBlock
				block={{
					content: "[My Bible](https://www.bible.com/bible/37/JHN.3.16): This one's my favourite :) A constant reminder of God's love for us!  ",
					id: _.uniqueId(),
				}}
			/>
			<p style={{ textAlign: "center", padding: "2rem"}}>
				Last Updated {"2024-03-23"}
			</p>
		</div>
	);
};

export default BenSBooksPage;