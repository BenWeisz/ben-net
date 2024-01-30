from typing import List, Dict
import json
import os
from datetime import datetime

from helpers import generate_link_path, generate_component_name, escape_characters
from state_machine import PostRawDataStateMachine

class Post:
    title: str
    db_path: str
    post_path: str
    post_date: str
    update_date: str
    is_published: bool
    
    def __init__(self) -> None:
        self.title = ""
        self.db_path = ""
        self.post_path = ""
        self.post_date = ""
        self.update_date = ""
        self.is_published = False

    def get_entry_str(self) -> str:
        """ Generate the string representing this post as a HomePageEntry. """
        link_path = generate_link_path(self.title)

        entry_str = "<HomePageEntry name=\"" + self.title + "\" date=\"" + self.post_date + "\" path=\"" + link_path + "\" />"
        return entry_str
    
    def get_route_dict(self) -> Dict:
        """ Generate the Dict representing this post as an import statement and route on the PostPage. """
        route = {}
        component_name = generate_component_name(self.title)
        link_path = generate_link_path(self.title)

        route["import"] = "import " + component_name + " from \"./" + component_name + "\";"
        route["route"] = "\"" + link_path + "\": <" + component_name + "/>,"

        return route

    def get_page_str(self) -> str:
        """ Generate the string representing this post as a react component. """

        post_raw_data_lines = []
        with open(os.path.join(self.db_path, self.post_path, "post.txt"), "r") as in_file:
            post_raw_data_lines = [line.replace("\n", "") for line in in_file.readlines()]
    
        import_dict = {
            "section_block": 'import SectionBlock from "../components/SectionBlock";\n',
            "section_box": 'import SectionBox from "../components/SectionBox";\n',
            "text_block": 'import TextBlock from "../components/TextBlock";\n',
            "latex_block": 'import LatexBlock from "../components/LatexBlock";\n',
            "code_block": 'import CodeBlock from "../components/CodeBlock";\n',
            "bullets_block": 'import BulletsBlock from "../components/BulletsBlock";\n',
            "lodash": 'import _ from "lodash";\n',
            "react": 'import React from "react";\n',
            "react_useref": 'import React, { useRef } from "react";\n',
            "style": 'import "../style/contents.css";\n'
        }

        # Remove title line and add blank line to ensure the state machine processes CODE_END blocks
        post_raw_data_lines = post_raw_data_lines[1:] + ['']

        # Set up the state machine and parse the lines into their respective blocks
        state_machine = PostRawDataStateMachine()
        for line in post_raw_data_lines:
            state_machine.progress_state(line)
        print(state_machine.data_store)

        # Grab all of the post blocks
        post_blocks = state_machine.get_data_store()

        # Compute some metrics to help with imports
        section_blocks = list(filter(lambda block: block["type"] == "section", post_blocks))
        
        num_section_blocks = len(section_blocks)
        num_text_blocks = len(list(filter(lambda block: block["type"] == "text", post_blocks)))
        num_latex_blocks = len(list(filter(lambda block: block["type"] == "latex", post_blocks)))
        num_bullets_blocks = len(list(filter(lambda block: block["type"] == "bullets", post_blocks)))
        num_code_blocks = len(list(filter(lambda block: block["type"] == "code", post_blocks)))

        page_str = ""

        # Choose component imports
        # React imports
        if num_section_blocks > 0:
            page_str += import_dict["react_useref"] + "\n"
        else:
            page_str += import_dict["react"] + "\n"
        
        # Lodash import
        should_import_lodash = num_section_blocks + num_text_blocks + num_bullets_blocks
        if should_import_lodash:
            page_str += import_dict["lodash"] + "\n"

        # Style import
        page_str += import_dict["style"] + "\n"

        # Component imports
        page_str += import_dict["section_block"]
        if num_section_blocks > 0:
            page_str += import_dict["section_box"]
        if num_text_blocks > 0:
            page_str += import_dict["text_block"]
        if num_latex_blocks > 0:
            page_str += import_dict["latex_block"]
        if num_bullets_blocks > 0:
            page_str += import_dict["bullets_block"]
        if num_code_blocks > 0:
            page_str += import_dict["code_block"]

        # Defining the page component
        component_name = generate_component_name(self.title)
        page_str += "\n" + f"const {component_name} = () => " + "{\n"
        page_str += "\tconst sections = [\n"
        
        # Build sections array
        if num_section_blocks > 0:
            for section_block in section_blocks:
                page_str += "\t\t{ id: _.uniqueId(), content: \"" + escape_characters(section_block["content"]) + "\"},\n"

        page_str += "\t];\n\n"

        # If sections exist define the useRefs for auto scrolling
        if num_section_blocks > 0:
            page_str += "\tconst sectionRefs = useRef([" + ", ".join(["null" for _ in range(num_section_blocks)]) + "]);\n\n"
        
        # Set up the component body
        page_str += "\treturn (\n"
        page_str += "\t\t<div class=\"vert-contents\">\n"

        # Set up the title block
        page_str += "\t\t\t<SectionBlock title=\"" + escape_characters(self.title) + "\" upper>\n"
        page_str += "\t\t\t\t<p style={{ paddingBottom: \"0.5rem\" }}>\n"
        page_str += "\t\t\t\t\t{\"" + self.post_date + "\"}\n"
        page_str += "\t\t\t\t</p>\n"
        page_str += "\t\t\t</SectionBlock>\n"

        # Set up the section box block
        if num_section_blocks > 0:
            page_str += "\t\t\t<SectionBox sections={sections} sectionRefs={sectionRefs} />\n\n"

        # Set up the rest of the blocks
        section_block_i = 0
        for block in post_blocks:
            block_type = block["type"]
            if block_type == "section":
                page_str += "\t\t\t<SectionBlock\n"
                page_str += "\t\t\t\tref={(el) => {\n"
                page_str += f"\t\t\t\t\tsectionRefs.current[{section_block_i}] = el;\n"
                page_str += "\t\t\t\t}}\n"
                page_str += "\t\t\t\tkey={" + f"sections[{section_block_i}].id" + "}\n"
                page_str += "\t\t\t\ttitle={" + f"sections[{section_block_i}].content" + "}\n"
                page_str += "\t\t\t\tupper={null}\n"
                page_str += "\t\t\t/>\n"
                section_block_i += 1
            elif block_type == "text":
                page_str += "\t\t\t<TextBlock\n"
                page_str += "\t\t\t\tblock={{\n"
                page_str += "\t\t\t\t\tcontent: \"" + escape_characters(block["content"]) + "\",\n"
                page_str += "\t\t\t\t\tid: _.uniqueId(),\n"
                page_str += "\t\t\t\t}}\n"
                page_str += "\t\t\t/>\n"
            elif block_type == "latex":
                page_str += "\t\t\t<LatexBlock block={{ content: \"" + escape_characters(block["content"]) + "\" }} />\n"
            elif block_type == "code":
                content_lines = block["content"].split("\n")
                language = content_lines[0]
                code_lines = "\n".join(content_lines[1:])
                page_str += "\t\t\t<CodeBlock\n"
                page_str += "\t\t\t\tblock={{\n"
                page_str += "\t\t\t\t\tlanguage: \"" + language + "\",\n"
                page_str += "\t\t\t\t\tcontent: \"" + escape_characters(code_lines)[:-2] + "\",\n"
                page_str += "\t\t\t\t}}\n"
                page_str += "\t\t\t/>\n"
            elif block_type == "bullets":
                page_str += "\t\t\t<BulletsBlock\n"
                page_str += "\t\t\t\tblock={{\n"
                page_str += "\t\t\t\t\tcontent: [\n"
                for bullet in block["content"].split("\n")[:-2]:
                    page_str += "\t\t\t\t\t\t{ item: \"" + escape_characters(bullet) + "\", id: _.uniqueId() },\n"
                page_str += "\t\t\t\t\t],\n"
                page_str += "\t\t\t\t}}\n"
                page_str += "\t\t\t/>\n"

        # Add footer and close component
        page_str += "\t\t\t<p style={{ textAlign: \"center\", padding: \"2rem\"}}>\n"
        page_str += "\t\t\t\tLast Updated {\"" + self.update_date + "\"}\n"
        page_str += "\t\t\t</p>\n"
        page_str += "\t\t</div>\n"
        page_str += "\t);\n"
        page_str += "};\n\n"

        # Export component
        page_str += "export default " + component_name + ";"

        return page_str

    def get_as_dict(self) -> Dict:
        return {
            "title": self.title,
            "post_path": self.post_path,
            "post_date": self.post_date,
            "update_date": self.update_date
        }

class PostDatabase:
    published_posts: List[Post]
    unpublished_posts: List[Post]
    db_path: str
    
    def __init__(self, db_path: str) -> None:
        self.published_posts = []
        self.unpublished_posts = []
        self.db_path = db_path

        # Load the DB file
        db_data = {}
        with open(db_path + "db.json") as in_file:
            db_data = json.load(in_file)
            
            # Generate the published posts list
            for post_json in db_data["posts"]:
                post = Post()
                post.title = post_json["title"]
                post.db_path = db_path
                post.post_path = post_json["post_path"]
                post.post_date = post_json["post_date"]
                post.update_date = post_json["update_date"]
                post.is_published = True
                self.published_posts.append(post)
        
        # Load the unpublished posts
        post_folders = [item for item in os.listdir(db_path) if os.path.isdir(os.path.join(db_path, item))]
        post_folders = [item for item in post_folders if "post.txt" in os.listdir(os.path.join(db_path, item))]
        for post_folder in post_folders:
            post = Post()
            post.db_path = db_path
            post.post_path = os.path.join(post_folder)
            with open(db_path + post.post_path + "/post.txt", "r") as in_file:
                post.title = in_file.readline().strip().split("title:")[1].strip()

            # Check if this post is already published
            post.is_published = len(list(filter(lambda published_post: published_post.title == post.title, self.published_posts))) > 0

            if not post.is_published:
                post.post_date = ""
                post.update_date = ""
                self.unpublished_posts.append(post)


    def get_published_post_titles(self) -> List[str]:
        """ Get the titles of the posts that are posted. """
        return list(map(lambda post: post.title, self.published_posts))
    
    def get_unpublished_post_titles(self) -> List[str]:
        """ Get the titles of the posts that aren't yet posted. """
        return list(map(lambda post: post.title, self.unpublished_posts))

    def get_post(self, title: str) -> Post:
        """ Get the post with the given title.
            This is just a data struct representing post,
            not the actual post stored in 
        """
        post = None
        for published_post in self.published_posts:
            if published_post.title == title:
                post = published_post
                break

        if post is not None:
            return post
        
        for unpublished_post in self.unpublished_posts:
            if unpublished_post.title == title:
                post = unpublished_post
                break

        return post
    
    def publish_post(self, title: str) -> None:
        """ Publish a given post, ensuring that it is not currently published. """
        post = None
        post_i = -1
        for i, unpublished_post in enumerate(self.unpublished_posts):
            if unpublished_post.title == title:
                post = unpublished_post
                post_i = i
                break

        if post is None:
            print(f"ERROR: Failed to find unpublished post with name: {title}")
            return
        
        post.post_date = datetime.today().strftime('%Y-%m-%d')
        post.update_date = post.post_date
        post.is_published = True

        self.published_posts.append(post)
        self.unpublished_posts = self.unpublished_posts[:post_i] + self.unpublished_posts[post_i+1:]

        # Write the new set of published posts to the database
        self._update_db()

        self._generate_entries_file()
        self._generate_routing_file()
        self._generate_page_file(post.title)

    def unpublish_post(self, title: str) -> None:
        """ Unpublish a given post, ensuring that it is currently published. """
        post = None
        post_i = -1
        for i, published_post in enumerate(self.published_posts):
            if published_post.title == title:
                post = published_post
                post_i = i
                break
                
        if post is None:
            print(f"ERROR: Failed to find published post with name: {title}")
            return
        
        post.post_date = ""
        post.update_date = ""
        post.is_published = False

        self.published_posts = self.published_posts[:post_i] + self.published_posts[post_i+1:]
        self.unpublished_posts.append(post)

        # Write the new set of published posts to the database
        self._update_db()

        self._generate_entries_file()
        self._generate_routing_file()

        # Remove the page component
        os.remove("../src/pages/" + generate_component_name(post.title) + ".jsx")
        
    def update_post(self, title: str) -> None:
        """ Update a post that was previously published. """
        post = self.get_post(title)
        post.update_date = datetime.today().strftime('%Y-%m-%d')
        
        # This is redundant right now but won't be when we introduce post renaming
        self._generate_entries_file()
        self._generate_routing_file()
        self._generate_page_file(post.title)

    def _update_db(self) -> None:
        """ Update the database file based on the PostDatabase instance's current state. """
        published_posts_json = {
            "posts": []
        }
        
        for post in self.published_posts:
            published_posts_json["posts"].append(post.get_as_dict())

        with open(self.db_path + "db.json", "w") as out_file:
            json.dump(published_posts_json, out_file, indent=2)

    def _generate_entries_file(self) -> None:
        """ Generate the HomePage.jsx file. """
        home_page_str = """
import React from "react";

import "../index.css";
import "../style/page.css";
import "../style/contents.css";
import "../style/section.css";
import Header from "../components/Header";
import HomePageEntry from "../components/HomePageEntry";

const HomePage = () => {
  return (
    <div className="primary-color">
      <Header />
      <div className="vert-container">
        <div className="vert-contents">
          <div style={{ padding: "1rem" }}>
            <h1 className="title-lg tert-color-text">Posts</h1>
            <hr className="bar" style={{ marginBottom: "0.5rem" }} />
        """.strip()
        home_page_str += "\n            "

        for post in self.published_posts:
            home_page_str += post.get_entry_str() + "\n"
        
        home_page_str += """
            <hr className="bar" style={{ marginTop: "0.5rem" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
        """.strip("\n")
        
        with open("../src/pages/HomePage.jsx", "w") as out_file:
            out_file.write(home_page_str)
    
    def _generate_routing_file(self) -> None:
        """ Generate the PostPage.jsx file. """
        post_page_str = "import React from \"react\"\n"
        
        # Set up page component imports
        for post in self.published_posts:
            post_page_str += post.get_route_dict()["import"] + "\n"
        
        # Write mid section
        post_page_str += """
import { useLocation } from "react-router-dom";

import "../index.css";
import "../style/page.css";

import Header from "../components/Header";

const PostPage = () => {
  const path = useLocation().pathname;
  const pages = {
""".strip("\n") + "\n"

        # Write page component routes
        for post in self.published_posts:
            post_page_str += "    " + post.get_route_dict()["route"] + "\n"

        post_page_str += """
  };

  const choosePage = () => {
    if (path in pages) {
      const page = pages[path];
      return (
        <div>
          <Header />
          <div className="vert-container">{page}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="primary-color" style={{ color: "white" }}>
      {choosePage()}
    </div>
  );
};

export default PostPage;
""".strip("\n")
        
        with open("../src/pages/PostPage.jsx", "w") as out_file:
            out_file.write(post_page_str)

    def _generate_page_file(self, title: str) -> None:
        """ Generate the page file for the given page title. """
        
        post = self.get_post(title)
        post_component_str = post.get_page_str()
    
        with open("../src/pages/" + generate_component_name(title) + ".jsx", "w") as out_file:
            out_file.write(post_component_str)