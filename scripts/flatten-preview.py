"""Turn the Next static export into flat, relative-path pages for hosting under any sub-path.
out/<route>/index.html -> <route-with-dashes>.html (home -> home.html); /_next/ -> next/; site links -> flat names.
Usage: npm run build && python3 scripts/flatten-preview.py out preview"""
import json, os, re, shutil, sys

src, dst = sys.argv[1], sys.argv[2]
shutil.rmtree(dst, ignore_errors=True)
# The artifact host reserves top-level names starting with "_", so assets move to next/.
shutil.copytree(os.path.join(src, "_next"), os.path.join(dst, "next"))

pages = {}
for root, _, files in os.walk(src):
    rel = os.path.relpath(root, src)
    if "index.html" not in files or rel.startswith(("_next", "404", "_not-found")):
        continue
    path = "/" if rel == "." else f"/{rel}/"
    pages[path] = "home.html" if rel == "." else rel.replace(os.sep, "-") + ".html"

# Links rendered in the browser (menus, option 2 paths) keep site paths; this maps them to the flat files on click.
router = ("<script>(function(){var m=%s;document.addEventListener('click',function(e){"
          "var a=e.target.closest&&e.target.closest('a[href^=\"/\"]');if(!a)return;"
          "var f=m[a.getAttribute('href')];if(f){e.preventDefault();location.href=f;}},true);})();</script>") % json.dumps(pages)

def links(s, escaped_too=True):
    # Longest paths first so /option-2/services/ is not caught by /services/.
    for path, flat in sorted(pages.items(), key=lambda kv: -len(kv[0])):
        s = s.replace(f'href="{path}"', f'href="{flat}"').replace(f'\\"href\\":\\"{path}\\"', f'\\"href\\":\\"{flat}\\"')
        if path != "/" and escaped_too:
            s = s.replace(f'\\"{path}\\"', f'\\"{flat}\\"')
    return s

for path, flat in pages.items():
    html = open(os.path.join(src, path.strip("/"), "index.html")).read()
    html = html.replace('"/_next/', '"next/').replace('\\"/_next/', '\\"next/').replace('href="/favicon.ico"', 'href="favicon.ico"').replace('\\"/favicon.ico', '\\"favicon.ico')
    html = links(html).replace("<head>", "<head>" + router, 1)
    open(os.path.join(dst, flat), "w").write(html)
shutil.copy(os.path.join(src, "favicon.ico"), dst)

for root, _, files in os.walk(os.path.join(dst, "next")):
    for f in files:
        p = os.path.join(root, f)
        if f.endswith(".css"):
            t = open(p).read().replace("url(/_next/static/media/", "url(../media/")
            open(p, "w").write(t)
        elif f.endswith(".js"):
            # Literal U+FFFD in string literals (polyfills) becomes the equivalent escape; the host rejects the raw char.
            # Site links inside the JS stay as they are: option 2 prefixes them at runtime, and the click handler maps them.
            t = open(p).read().replace('"/_next/"', '"next/"').replace("\ufffd", "\\uFFFD")
            open(p, "w").write(t)

# Entry page: sends the viewer to home.html (relative to wherever this is hosted).
open(os.path.join(dst, "index.html"), "w").write(
    '<title>Halia &amp; Co. Preview</title>\n<style>:root{--bg:#fbfaf6;--fg:#10261f}@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#10261f;--fg:#f3f1ea;color-scheme:dark}}'
    ':root[data-theme="dark"]{--bg:#10261f;--fg:#f3f1ea;color-scheme:dark}body{background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,sans-serif;padding-block:48px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}a{color:inherit}</style>\n'
    '<meta name="claude:viewport-fit-sides" content="cover">\n<p>Opening the Halia &amp; Co. demo site. <a href="home.html">Design option 1</a> or <a href="option-2.html">design option 2</a>.</p>\n'
    '<script>location.replace("home.html")</script>\n')

leftover = [f for f in os.listdir(dst) if f.endswith(".html") and re.search(r'(src|href)="/(?!/)', open(os.path.join(dst, f)).read())]
print("pages:", ", ".join(sorted(pages.values())))
print("pages with absolute paths left:", leftover)
