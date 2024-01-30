from post import PostDatabase
from helpers import generate_link_path

def unpublish_post(post_db: PostDatabase) -> None:
    published_posts = post_db.get_published_post_titles()
    if len(published_posts) == 0:
        print("No posts available for unpublishing...")
        return

    # Print the posts that can be unpublished
    for post_title_i, post in enumerate(published_posts):
        print(f"({post_title_i}): \"{post}\"")

    # Get user input on the post to unpublish
    post_to_unpublish_i = int(input("Enter a post number: "))
    if post_to_unpublish_i >= len(published_posts) or post_to_unpublish_i < 0:
        print("ERROR: The post number you entered is invalid")
        return
    
    post_db.unpublish_post(published_posts[post_to_unpublish_i])

def publish_post(post_db: PostDatabase) -> None:
    unpublished_posts = post_db.get_unpublished_post_titles()
    if len(unpublished_posts) == 0:
        print("No posts available for publishing...")
        return

    for post_title_i, post in enumerate(unpublished_posts):
        print(f"({post_title_i}): \"{post}\"")

    # Get user input on the post to publish
    post_to_publish_i = int(input("Enter a post number: "))
    if post_to_publish_i >= len(unpublished_posts) or post_to_publish_i < 0:
        print("ERROR: The post number you entered is invalid")
        return
    
    post_db.publish_post(unpublished_posts[post_to_publish_i])

def update_post(post_db: PostDatabase) -> None:
    published_posts = post_db.get_published_post_titles()
    if len(published_posts) == 0:
        print("No posts available for updating...")
        return

    # Print the posts that can be updated
    for post_title_i, post in enumerate(published_posts):
        print(f"({post_title_i}): \"{post}\"")

    # Get user input on the post to unpublish
    post_to_update_i = int(input("Enter a post number: "))
    if post_to_update_i >= len(published_posts) or post_to_update_i < 0:
        print("ERROR: The post number you entered is invalid")
        return

    post_db.update_post(published_posts[post_to_update_i])


if __name__ == "__main__":
    post_db = PostDatabase("../data/")

    print("Enter one of the following commands:")
    print("(N)ew Post")
    print("(U)pdate Post")
    print("(D)elete Post")
    command = input("Enter a key: ").lower()
    
    if command == "d":
        unpublish_post(post_db)
    elif command == "n":
        publish_post(post_db)
    elif command == "u":
        update_post(post_db)
    else:
        print("Invalid command, run script again")