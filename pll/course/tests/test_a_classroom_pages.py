from html.parser import HTMLParser
from pathlib import Path
import unittest


COURSE = Path(__file__).resolve().parents[1]
PAGES = {
    "a1-1.html": "a11",
    "a1-2.html": "a12",
    "a1-3.html": "a13",
    "a2-1.html": "a21",
    "a2-2.html": "a22",
    "a2-3.html": "a23",
}
PARAMS = {
    "a1-1.html": {"fRefMHz", "refDividerR", "feedbackDividerN", "outputDividerD"},
    "a1-2.html": {"deltaF0KHz", "cursorUs"},
    "a1-3.html": set(),
    "a2-1.html": {"frequencyMHz", "deltaTimePs", "phaseTargetDeg"},
    "a2-2.html": {"deltaFrequencyKHz", "initialPhaseCycles", "durationUs", "cursorUs"},
    "a2-3.html": {"fbEdgePs", "refFrequencyMHz", "fbFrequencyMHz", "cycleCount", "cycleIndex", "resetDelayPs"},
}
FLOW = {"Learn", "Predict", "Explore", "Observe", "Explain", "Check"}


class PageInventory(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.scripts = []
        self.stylesheets = []
        self.images = []
        self.links = []
        self.pager_links = []
        self.actions = []
        self.shell_classes = []
        self.active_nav = []
        self.nav_links = []
        self._in_course_nav = False
        self._nav_anchor = None
        self._in_nav_code = False
        self.labs = []
        self.params = []
        self.answer_forms = 0
        self.flow_labels = set()
        self._flow_depth = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag == "nav" and attrs.get("aria-label") == "PLL 目录":
            self._in_course_nav = True
        if tag == "a" and self._in_course_nav:
            self._nav_anchor = {"href": attrs.get("href", ""), "current": attrs.get("aria-current"), "code": ""}
        if tag == "span" and self._nav_anchor is not None and "nav-code" in attrs.get("class", "").split():
            self._in_nav_code = True
        if tag == "script" and attrs.get("src"):
            self.scripts.append(attrs["src"])
        if tag == "div" and "shell" in attrs.get("class", "").split():
            self.shell_classes = attrs.get("class", "").split()
        if attrs.get("data-action"):
            self.actions.append(attrs["data-action"])
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.stylesheets.append(attrs.get("href", ""))
        if tag == "img" and attrs.get("src"):
            self.images.append(attrs["src"])
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
            if "course-page-link" in attrs.get("class", "").split():
                self.pager_links.append(attrs["href"])
        if attrs.get("data-classroom-lab"):
            self.labs.append(attrs["data-classroom-lab"])
        if attrs.get("data-param"):
            self.params.append(attrs["data-param"])
        if "data-answer-form" in attrs:
            self.answer_forms += 1
        if tag == "div" and attrs.get("class") == "lesson-flow":
            self._flow_depth += 1

    def handle_endtag(self, tag):
        if tag == "div" and self._flow_depth:
            self._flow_depth -= 1
        if tag == "span" and self._in_nav_code:
            self._in_nav_code = False
        if tag == "a" and self._nav_anchor is not None:
            self.nav_links.append(self._nav_anchor)
            if self._nav_anchor["current"] == "page":
                self.active_nav.append(self._nav_anchor)
            self._nav_anchor = None
        if tag == "nav":
            self._in_course_nav = False

    def handle_data(self, data):
        if self._nav_anchor is not None and self._in_nav_code:
            self._nav_anchor["code"] += data.strip()
        value = data.strip()
        if self._flow_depth and value in FLOW:
            self.flow_labels.add(value)


class ClassroomPageTests(unittest.TestCase):
    def inventory(self, filename):
        parser = PageInventory()
        parser.feed((COURSE / filename).read_text(encoding="utf-8"))
        return parser

    def test_all_six_pages_load_the_shared_local_runtime(self):
        expected_scripts = {
            "a-classroom-models.js",
            "a-classroom-data.js",
            "a-classroom.js",
        }
        for filename, lab_id in PAGES.items():
            with self.subTest(page=filename):
                page = self.inventory(filename)
                self.assertEqual(page.labs, [lab_id])
                self.assertEqual({src.split("?", 1)[0] for src in page.scripts}, expected_scripts)
                self.assertEqual({src.split("?", 1)[0] for src in page.stylesheets}, {"course.css", "a-classroom.css"})
                for src in page.scripts + page.stylesheets:
                    if src.split("?", 1)[0] != "course.css":
                        self.assertIn("?v=20261119-6", src)
                self.assertIn("a-classroom-shell", page.shell_classes)
                reset_action = "restart" if filename in {"a1-2.html", "a2-2.html"} else "reset"
                self.assertIn(reset_action, page.actions)
                self.assertTrue(FLOW.issubset(page.flow_labels))
                self.assertGreaterEqual(page.answer_forms, 2)
                self.assertEqual(len(page.ids), len(set(page.ids)), "page IDs must be unique")
                self.assertTrue(PARAMS[filename].issubset(page.params))
                self.assertEqual(len(page.active_nav), 1)
                self.assertEqual(page.active_nav[0]["href"], filename)
                self.assertEqual(page.active_nav[0]["code"], filename[:-5].upper().replace("-", "."))

    def test_inline_math_typography_and_diagram_hierarchy(self):
        runtime = (COURSE / "a-classroom.js").read_text(encoding="utf-8")
        styles = (COURSE / "a-classroom.css").read_text(encoding="utf-8")
        a11 = (COURSE / "a1-1.html").read_text(encoding="utf-8")
        self.assertIn("function query(root, selector)", runtime)
        self.assertIn("function all(root, selector)", runtime)
        self.assertIn("formatInlineMath(root);", runtime)
        self.assertIn('document.createElement("span")', runtime)
        self.assertIn('document.createElement("sub")', runtime)
        self.assertIn("drawCanvasMathLabel", runtime)
        self.assertIn("STIX Two Math", styles)
        self.assertIn(".inline-math .math-variable", styles)
        self.assertIn("sub.math-subscript", styles)
        self.assertIn("min-width: 760px", styles)
        self.assertIn(".lesson-outcome { display: block;", styles)
        self.assertIn('viewBox="0 0 1260 520"', a11)
        self.assertIn('class="diagram-scroll"', a11)
        self.assertIn('class="math-subscript" baseline-shift="sub"', a11)
        self.assertIn('data-path="feedback"', a11)
        self.assertIn('data-path="output"', a11)
        self.assertIn("path-key", a11)
        self.assertNotIn("opacity: .35", styles)

    def test_shared_math_renderer_is_bundled_on_all_six_pages(self):
        runtime = (COURSE / "a-classroom.js").read_text(encoding="utf-8")
        self.assertIn("INLINE_MATH_REGEX", runtime)
        self.assertIn("mathSub(base, index)", runtime)
        self.assertNotIn("MATH_NS", runtime)
        for filename in PAGES:
            with self.subTest(page=filename):
                page = (COURSE / filename).read_text(encoding="utf-8")
                self.assertIn('a-classroom.js?v=20261119-6', page)
                self.assertIn('a-classroom.css?v=20261119-6', page)

    def test_page_navigation_and_local_images_resolve(self):
        local_pages = set(PAGES)
        for filename in PAGES:
            with self.subTest(page=filename):
                page = self.inventory(filename)
                for src in page.scripts + page.stylesheets + page.images:
                    self.assertFalse(src.startswith(("http:", "https:")), src)
                    asset = src.split("?", 1)[0]
                    self.assertTrue((COURSE / asset).is_file(), f"missing local asset {asset} in {filename}")
                pager = [href for href in page.pager_links if href in local_pages]
                self.assertTrue(pager, "the existing A-course pager should remain")
                by_code = {link["code"]: link["href"] for link in page.nav_links}
                self.assertEqual(by_code["A2.1"], "a2-1.html")
                for code, target in (("A1.1", "a1-1.html"), ("A1.2", "a1-2.html"), ("A1.3", "a1-3.html"), ("A2.1", "a2-1.html"), ("A2.2", "a2-2.html"), ("A2.3", "a2-3.html")):
                    self.assertEqual(by_code[code], target)

    def test_a21_runtime_wires_reset_to_the_default_edge_experiment(self):
        runtime = (COURSE / "a-classroom.js").read_text(encoding="utf-8")
        a21 = runtime.split("function initA21", 1)[1].split("function initA22", 1)[0]
        self.assertIn("[data-action='reset']", a21)
        self.assertIn('modeSelect.value = "fixed-time"', a21)
        self.assertIn('setParam(root, "deltaTimePs", 40)', a21)

    def test_every_data_chart_has_a_labeled_legend_and_axis_units(self):
        runtime = (COURSE / "a-classroom.js").read_text(encoding="utf-8")
        self.assertIn("legendSeries", runtime)
        self.assertIn("spec.xLabel", runtime)
        self.assertIn("spec.yLabel", runtime)
        labels = [
            "Unwrapped phase", "Wrapped phase", "FB edge", "tFB − tREF",
            "UP pulse width", "DN pulse width", "Frequency error",
            "Control voltage deviation", "Phase error", "TI measured markers",
        ]
        for label in labels:
            with self.subTest(label=label):
                self.assertTrue(f'label:"{label}"' in runtime or f'label: "{label}"' in runtime)

    def test_measured_and_original_figure_assets_are_present(self):
        required = [
            "../assets/originals/ti/lmx2594-fig5-1.png",
            "../assets/originals/adi/mt008-fig1.png",
            "../assets/originals/adi/adf4351-fig1.png",
            "../assets/originals/jku/fig_074.png",
            "../assets/originals/jku/fig_078.png",
            "../assets/originals/jku/fig_079.png",
        ]
        referenced = set()
        for filename in PAGES:
            referenced.update(self.inventory(filename).images)
        for src in required:
            with self.subTest(asset=src):
                self.assertIn(src, referenced)
                self.assertTrue((COURSE / src).is_file())

    def test_no_a_page_depends_on_remote_scripts(self):
        for filename in PAGES:
            with self.subTest(page=filename):
                parser = self.inventory(filename)
                self.assertTrue(all(not src.startswith(("http:", "https:")) for src in parser.scripts))


if __name__ == "__main__":
    unittest.main()
