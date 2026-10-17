"""Turn the Next static export into flat, relative-path pages for hosting under any sub-path.
out/<slug>/index.html -> <slug>.html, home -> home.html; /_next/ -> next/; site links -> <slug>.html.
Usage: npm run build && python3 scripts/flatten-preview.py out preview"""
import os, re, shutil, sys
src, dst = sys.argv[1], sys.argv[2]
shutil.rmtree(dst, ignore_errors=True)
# The artifact host reserves top-level names starting with "_", so assets move to next/.
shutil.copytree(os.path.join(src, "_next"), os.path.join(dst, "next"))
pages = {"/": "home.html", "/services/": "services.html", "/about/": "about.html", "/how-we-work/": "how-we-work.html", "/contact/": "contact.html", "/privacy/": "privacy.html"}
def links(s):
    for path, flat in pages.items():
        s = s.replace(f'href="{path}"', f'href="{flat}"').replace(f'\\"href\\":\\"{path}\\"', f'\\"href\\":\\"{flat}\\"')
        if path != "/":
            s = s.replace(f'\\"{path}\\"', f'\\"{flat}\\"')
    return s
for path, flat in pages.items():
    html = open(os.path.join(src, path.strip("/"), "index.html")).read()
    html = html.replace('"/_next/', '"next/').replace('\\"/_next/', '\\"next/').replace('href="/favicon.ico"', 'href="favicon.ico"').replace('\\"/favicon.ico', '\\"favicon.ico')
    open(os.path.join(dst, flat), "w").write(links(html))
shutil.copy(os.path.join(src, "favicon.ico"), dst)
for root, _, files in os.walk(os.path.join(dst, "next")):
    for f in files:
        p = os.path.join(root, f)
        if f.endswith(".css"):
            t = open(p).read().replace("url(/_next/static/media/", "url(../media/")
            open(p, "w").write(t)
        elif f.endswith(".js"):
            # Literal U+FFFD in string literals (polyfills) becomes the equivalent escape; the host rejects the raw char.
            t = open(p).read().replace('"/_next/"', '"next/"').replace("\ufffd", "\\uFFFD")
            # Site links bundled into client components (header, footer, form) live in the app chunks.
            if os.sep + "app" + os.sep in p:
                for path, flat in pages.items():
                    t = t.replace(f'href:"{path}"', f'href:"{flat}"')
                    if path != "/":
                        t = t.replace(f'"{path}"', f'"{flat}"')
            open(p, "w").write(t)
# Entry page: sends the viewer to home.html (relative to wherever this is hosted).
open(os.path.join(dst, "index.html"), "w").write(
    '<title>Halia &amp; Co. site preview</title>\n<style>:root{--bg:#fbfaf6;--fg:#10261f}@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#10261f;--fg:#f3f1ea;color-scheme:dark}}'
    ':root[data-theme="dark"]{--bg:#10261f;--fg:#f3f1ea;color-scheme:dark}body{background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,sans-serif;padding-block:48px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}a{color:inherit}</style>\n'
    '<meta name="claude:viewport-fit-sides" content="cover">\n<p>Opening the Halia &amp; Co. demo site. <a href="home.html">Open it</a> if nothing happens.</p>\n'
    '<script>location.replace("home.html")</script>\n')
leftover = [f for f in os.listdir(dst) if f.endswith(".html") and re.search(r'(src|href)="/(?!/)', open(os.path.join(dst, f)).read())]
print("pages with absolute paths left:", leftover)
