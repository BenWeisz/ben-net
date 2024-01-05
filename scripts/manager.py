import os
from typing import Dict, List
from datetime import datetime

data_folder = "../data/"

def get_db_data() -> List[Dict]:
    posts = []
    with open("../data/db.txt", "r") as in_file:
        posts = [{ "name": post_line[0], "path": post_line[1] } for post_line in [line.strip().split(": ") for line in in_file.readlines()]]
    return posts

def get_postable_data() -> List[Dict]:
    postables_paths = [f for f in os.listdir(data_folder) if os.path.isfile(os.path.join(data_folder, f)) and f != "db.txt"]
    
    postables = []
    for postable_path in postables_paths:
        with open(os.path.join(data_folder, postable_path), "r") as in_file:
            postables.append({
                "name": in_file.readline().strip().split(": ")[1],
                "path": postable_path
            })

    return postables

def generate_homepage_entry_path(name: str) -> str:
    return "/" + "-".join(name.lower().split(" "))

def generate_page_component(post_input_path: str, post_output_path: str) -> None:
    post_input_lines = ""
    with open(os.path.join(data_folder, post_input_path), "r") as in_file:
        post_input_lines = [line.strip() for line in in_file.readlines()]
    
    print(post_input_lines)

def generate_homepage_entries(db_data: List[Dict]) -> None:
    lines = None
    with open("../src/pages/HomePage.jsx", "r") as in_file:
        lines = [line.strip() + "\n" for line in in_file.readlines()]
    
    new_lines = []
    added_db_data = False
    for line in lines:
        if not line.startswith("<hr className=\"bar\" style={{ marginBottom: \"0.5rem\" }} />") and not line.startswith("<HomePageEntry"):
            new_lines.append(line)
        elif not added_db_data:
            new_lines.append("<hr className=\"bar\" style={{ marginBottom: \"0.5rem\" }} />\n")
            added_db_data = True
            for db_data_entry in db_data:
                entry_name = db_data_entry["name"]
                entry_date = datetime.today().strftime('%Y-%m-%d')
                entry_path = generate_homepage_entry_path(entry_name)
                new_lines.append("<HomePageEntry name=\"" + entry_name + "\" date=\"" + entry_date + "\" path=\"" + entry_path + "\" />\n")

    print(new_lines)
    with open("../src/pages/HomePage.jsx", "w") as out_file:
        out_file.writelines(new_lines)
            

def new_post() -> None:
    # Selecting a new post
    db_data = get_db_data()
    postable_data = get_postable_data()

    db_data_names = list(map(lambda x: x["name"], db_data))
    new_posts = list(filter(lambda x: x["name"] not in db_data_names, postable_data))
    
    if len(new_posts) == 0:
        print("No new posts!")
        return

    for i in range(len(new_posts)):
        new_post_name = new_posts[i]["name"]
        new_post_path = new_posts[i]["path"]
        print(f"({i}) {new_post_name}: {new_post_path}")

    selection = int(input("Choose a post number to post:"))
    new_post = new_posts[selection]

    with open("../data/db.txt", "a") as append_file:
        new_post_name = new_post["name"]
        new_post_path = new_post["path"]
        append_file.write(f"{new_post_name}: {new_post_path}\n")

    db_data.append(new_post)

    generate_homepage_entries(db_data)

    # Generating the page component
    # generate_page_component(new_post["path"], "./asdf.jsx")

def delete_post() -> None:
    db_data = get_db_data()

    if len(db_data) == 0:
        print("No existing posts!")
        return
    
    for i in range(len(db_data)):
        post_name = db_data[i]["name"]
        post_path = db_data[i]["path"]
        print(f"({i}) {post_name}: {post_path}")

    selection = int(input("Choose a post number to delete:"))
    db_data = db_data[:selection] + db_data[selection + 1:]

    with open("../data/db.txt", "w") as out_file:
        for post in db_data:
            post_name = post["name"]
            post_path = post["path"]
            out_file.write(f"{post_name}: {post_path}\n")

    generate_homepage_entries(db_data)    

if __name__ == "__main__":
    print("Enter one of the following commands:")
    print("(N)ew Post")
    print("(U)pdate Post")
    print("(D)elete Post")
    command = input("Enter a key:").lower()
    
    if command == "d":
        delete_post()
    elif command == "n":
        new_post()
    elif command == "u":
        pass
    else:
        print("Invalid command, run script again")