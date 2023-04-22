+++
title = "Syntax highlighting"
+++

This is a page summary, it should show up in the main posts area and provide
readers with a preview.

<!-- more -->

## Some examples

### TOML

```toml
[extra]

[extra.papermod]
title = "PaperMod"
default_theme = "auto"
theme = "light"
language_direction = "auto"
keywords = ["keyword1", "keyword2", "keyword3"]
disable_theme_toggle = false
show_code_copy_buttons = true
show_reading_time = true
show_word_count = false
show_post_nav_links = true
show_post_meta = true
default_toc_open = false
edit_post_url = "https://github.com/cydave/zola-theme-papermod/tree/master"
copyright = ""
date_format = "%Y-%m-%d"
```


### YAML

```yaml
- martin:
    name: Martin D'vloper
    job: Developer
    skills:
      - python
      - perl
      - pascal
- tabitha:
    name: Tabitha Bitumen
    job: Developer
    skills:
      - lisp
      - fortran
      - erlang
```


### With Line Numbers

```python,linenos,linenostart=98
class MockResponse:
    """Wraps a `httplib.HTTPMessage` to mimic a `urllib.addinfourl`.
    ...what? Basically, expose the parsed HTTP headers from the server response
    the way `cookielib` expects to see them.
    """

    def __init__(self, headers):
        """Make a MockResponse for `cookielib` to read.
        :param headers: a httplib.HTTPMessage or analogous carrying the headers
        """
        self._headers = headers

    def info(self):
        return self._headers

    def getheaders(self, name):
        self._headers.getheaders(name)
```
