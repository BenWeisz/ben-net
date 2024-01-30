def generate_link_path(title: str) -> str:
    """ Generate a link path from a title string. """
    title_lowercase = title.lower()
    title_filtered = ""
    
    # Remove non-alphanumeric characters except space
    for c in title_lowercase:
        if ord(c) < ord('a') or ord(c) > ord('z'):
            if ord(c) < ord('0') or ord(c) > ord('9'):
                if c != ' ':
                    continue
        # a-z characters
        title_filtered += c

    # Split by spaces and stitch together with dashes
    link_path = "/" + "-".join([token.strip() for token in title_filtered.split(" ")])
    return link_path

def generate_component_name(title: str) -> str:
    """ Generate the component name given the title string. """
    component_name = ""
    alphabet_char = False
    for c in title:
        if (ord(c) >= ord('a') and ord(c) <= ord('z')) or (ord(c) >= ord('A') and ord(c) <= ord('Z')):
            if not alphabet_char:
                component_name += str(c).upper()
            else:
                component_name += c
            alphabet_char = True
        else:
            alphabet_char = False

    return component_name + "Page"

def escape_characters(text: str) -> str:
    """ Escape character which would otherwise cause issues as part of a string. """
    return text.translate(str.maketrans({"\\": r"\\", "\"": r"\"", "\n": r"\n"}))