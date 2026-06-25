"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProfileView = void 0;
var react_1 = require("react");
var image_1 = require("next/image");
var link_1 = require("next/link");
var html_to_image_1 = require("html-to-image");
var LANG_COLORS = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Go: "#00ADD8",
    Rust: "#dea584",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Ruby: "#701516",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    Shell: "#89e051",
    Vue: "#41b883",
    Svelte: "#ff3e00",
    PHP: "#4F5D95"
};
/** Format an ISO timestamp as a human-readable relative string for the profile header. */
function formatUpdatedAt(iso) {
    var diffMs = Date.now() - new Date(iso).getTime();
    var diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 0)
        return "today";
    if (diffDays === 1)
        return "1 day ago";
    if (diffDays < 30)
        return diffDays + " days ago";
    var months = Math.floor(diffDays / 30);
    if (months === 1)
        return "1 month ago";
    if (months < 12)
        return months + " months ago";
    var years = Math.floor(diffDays / 365);
    return years === 1 ? "1 year ago" : years + " years ago";
}
function ProfileView(_a) {
    var _this = this;
    var user = _a.user, repos = _a.repos, stats = _a.stats, techStack = _a.techStack, orgs = _a.orgs, heatmap = _a.heatmap, currentStreak = _a.currentStreak, longestStreak = _a.longestStreak, score = _a.score, updatedAt = _a.updatedAt;
    var displayName = user.name || user.login;
    var website = user.blog
        ? user.blog.startsWith("http")
            ? user.blog
            : "https://" + user.blog
        : null;
    var _b = react_1.useState(false), copied = _b[0], setCopied = _b[1];
    var _c = react_1.useState(false), isDownloading = _c[0], setIsDownloading = _c[1];
    var cardRef = react_1.useRef(null);
    var handleCopyLink = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText(window.location.href)];
                case 1:
                    _a.sent();
                    setCopied(true);
                    setTimeout(function () { return setCopied(false); }, 2000);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Copy to clipboard failed:", err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDownloadCard = function () { return __awaiter(_this, void 0, void 0, function () {
        var dataUrl, link, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!cardRef.current)
                        return [2 /*return*/];
                    setIsDownloading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    // Small delay to ensure images have finished rendering
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    // Small delay to ensure images have finished rendering
                    _a.sent();
                    return [4 /*yield*/, html_to_image_1.toPng(cardRef.current, {
                            cacheBust: true,
                            pixelRatio: 2,
                            style: {
                                transform: "scale(1)",
                                transformOrigin: "top left"
                            }
                        })];
                case 3:
                    dataUrl = _a.sent();
                    link = document.createElement("a");
                    link.download = user.login + "-ossfolio-card.png";
                    link.href = dataUrl;
                    link.click();
                    return [3 /*break*/, 6];
                case 4:
                    err_2 = _a.sent();
                    console.error("Failed to download profile card:", err_2);
                    return [3 /*break*/, 6];
                case 5:
                    setIsDownloading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Show a "Back to top" button once the visitor scrolls past 400px.
    var _d = react_1.useState(false), showBackToTop = _d[0], setShowBackToTop = _d[1];
    react_1.useEffect(function () {
        var onScroll = function () { return setShowBackToTop(window.scrollY > 400); };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return function () { return window.removeEventListener("scroll", onScroll); };
    }, []);
    var scrollToTop = function () {
        return window.scrollTo({ top: 0, behavior: "smooth" });
    };
    // Total stars across the repos shown on this page
    var totalStars = repos.reduce(function (sum, r) { var _a; return sum + ((_a = r.stargazers_count) !== null && _a !== void 0 ? _a : 0); }, 0);
    var totalForks = repos.reduce(function (sum, r) { var _a; return sum + ((_a = r.forks_count) !== null && _a !== void 0 ? _a : 0); }, 0);
    return (React.createElement("div", { style: { maxWidth: "56rem", margin: "0 auto", padding: "48px 20px 80px" } },
        React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap", paddingBottom: "40px", borderBottom: "1px solid var(--color-hairline)" } },
            React.createElement(image_1["default"], { src: user.avatar_url, alt: displayName, width: 88, height: 88, style: { borderRadius: "9999px", border: "1px solid var(--color-hairline)", flexShrink: 0 } }),
            React.createElement("div", { style: { flex: 1, minWidth: "200px" } },
                React.createElement("h1", { style: { fontSize: "24px", fontWeight: 600, color: "var(--color-ink)", letterSpacing: "-0.42px", margin: 0 } }, displayName),
                React.createElement("p", { style: { fontSize: "14px", color: "var(--color-ink-mute)", margin: "4px 0 0 0" } },
                    "@",
                    user.login),
                user.bio && (React.createElement("p", { style: { fontSize: "14px", color: "var(--color-ink)", lineHeight: 1.55, margin: "12px 0 0 0", maxWidth: "480px" } }, user.bio)),
                React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "14px", alignItems: "center" } },
                    user.location && (React.createElement("span", { style: { fontSize: "13px", color: "var(--color-ink-mute)", display: "flex", alignItems: "center", gap: "5px" } },
                        React.createElement("svg", { "aria-hidden": "true", width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                            React.createElement("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }),
                            React.createElement("circle", { cx: "12", cy: "10", r: "3" })),
                        user.location)),
                    website && (React.createElement("a", { href: website, target: "_blank", rel: "noopener noreferrer", "aria-label": "Personal website " + website.replace(/^https?:\/\//, "") + " (opens in a new tab)", style: { fontSize: "13px", color: "var(--color-ink-mute)", display: "flex", alignItems: "center", gap: "5px", textDecoration: "none" }, onMouseEnter: function (e) { return (e.currentTarget.style.color = "var(--color-ink)"); }, onMouseLeave: function (e) { return (e.currentTarget.style.color = "var(--color-ink-mute)"); } },
                        React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                            React.createElement("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
                            React.createElement("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })),
                        website.replace(/^https?:\/\//, ""))),
                    user.twitter_username && (React.createElement("a", { href: "https://twitter.com/" + user.twitter_username, target: "_blank", rel: "noopener noreferrer", "aria-label": "Twitter profile of @" + user.twitter_username + " (opens in a new tab)", style: { fontSize: "13px", color: "var(--color-ink-mute)", display: "flex", alignItems: "center", gap: "5px", textDecoration: "none" }, onMouseEnter: function (e) { return (e.currentTarget.style.color = "var(--color-ink)"); }, onMouseLeave: function (e) { return (e.currentTarget.style.color = "var(--color-ink-mute)"); } },
                        React.createElement("svg", { "aria-hidden": "true", width: "13", height: "13", viewBox: "0 0 24 24", fill: "currentColor" },
                            React.createElement("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })),
                        "@",
                        user.twitter_username)),
                    React.createElement("a", { href: user.html_url, target: "_blank", rel: "noopener noreferrer", "aria-label": "GitHub profile of " + displayName + " (opens in a new tab)", style: { fontSize: "13px", color: "var(--color-ink-mute)", display: "flex", alignItems: "center", gap: "5px", textDecoration: "none" }, onMouseEnter: function (e) { return (e.currentTarget.style.color = "var(--color-ink)"); }, onMouseLeave: function (e) { return (e.currentTarget.style.color = "var(--color-ink-mute)"); } },
                        React.createElement("svg", { "aria-hidden": "true", width: "13", height: "13", viewBox: "0 0 24 24", fill: "currentColor" },
                            React.createElement("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" })),
                        "GitHub")),
                React.createElement("div", { style: { marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" } },
                    React.createElement("button", { type: "button", onClick: function () {
                            var profileUrl = "https://ossfolio.qzz.io/" + user.login;
                            var text = "My open source contributor score is " + score + " on OSSfolio: " + profileUrl + " #opensource";
                            window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
                        }, style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "7px 14px",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "var(--color-ink)",
                            backgroundColor: "var(--color-canvas-soft)",
                            border: "1px solid var(--color-hairline-strong)",
                            borderRadius: "6px",
                            cursor: "pointer",
                            lineHeight: 1
                        }, onMouseEnter: function (e) {
                            e.currentTarget.style.borderColor = "var(--color-ink)";
                            e.currentTarget.style.backgroundColor = "var(--color-hairline)";
                        }, onMouseLeave: function (e) {
                            e.currentTarget.style.borderColor = "var(--color-hairline-strong)";
                            e.currentTarget.style.backgroundColor = "var(--color-canvas-soft)";
                        }, "aria-label": "Share profile on X (Twitter)" },
                        React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true" },
                            React.createElement("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })),
                        "Share on X"),
                    React.createElement("button", { type: "button", onClick: function () {
                            var profileUrl = "https://ossfolio.qzz.io/" + user.login;
                            var fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(profileUrl);
                            window.open(fbUrl, "_blank", "noopener,noreferrer");
                        }, style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "7px 14px",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "var(--color-ink)",
                            backgroundColor: "var(--color-canvas-soft)",
                            border: "1px solid var(--color-hairline-strong)",
                            borderRadius: "6px",
                            cursor: "pointer",
                            lineHeight: 1
                        }, onMouseEnter: function (e) {
                            e.currentTarget.style.borderColor = "var(--color-ink)";
                            e.currentTarget.style.backgroundColor = "var(--color-hairline)";
                        }, onMouseLeave: function (e) {
                            e.currentTarget.style.borderColor = "var(--color-hairline-strong)";
                            e.currentTarget.style.backgroundColor = "var(--color-canvas-soft)";
                        }, "aria-label": "Share profile on Facebook" },
                        React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true" },
                            React.createElement("path", { d: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99h-2.54V12h2.54V9.69c0-2.5 1.5-3.89 3.8-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z" })),
                        "Share on Facebook"),
                    React.createElement("button", { type: "button", onClick: function () {
                            var profileUrl = "https://ossfolio.qzz.io/" + user.login;
                            var title = "My open source score on OSSfolio";
                            var redditUrl = "https://www.reddit.com/submit?url=" + encodeURIComponent(profileUrl) + "&title=" + encodeURIComponent(title);
                            window.open(redditUrl, "_blank", "noopener,noreferrer");
                        }, style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "7px 14px",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "var(--color-ink)",
                            backgroundColor: "var(--color-canvas-soft)",
                            border: "1px solid var(--color-hairline-strong)",
                            borderRadius: "6px",
                            cursor: "pointer",
                            lineHeight: 1
                        }, onMouseEnter: function (e) {
                            e.currentTarget.style.borderColor = "var(--color-ink)";
                            e.currentTarget.style.backgroundColor = "var(--color-hairline)";
                        }, onMouseLeave: function (e) {
                            e.currentTarget.style.borderColor = "var(--color-hairline-strong)";
                            e.currentTarget.style.backgroundColor = "var(--color-canvas-soft)";
                        }, "aria-label": "Share profile on Reddit" },
                        React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true" },
                            React.createElement("path", { d: "M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z" })),
                        "Share on Reddit"),
                    React.createElement("button", { type: "button", onClick: handleCopyLink, style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "7px 14px",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: copied ? "#3ecf8e" : "var(--color-ink)",
                            backgroundColor: "var(--color-canvas-soft)",
                            border: "1px solid " + (copied ? "#3ecf8e" : "var(--color-hairline-strong)"),
                            borderRadius: "6px",
                            cursor: "pointer",
                            lineHeight: 1,
                            transition: "border-color 0.15s, color 0.15s"
                        }, onMouseEnter: function (e) {
                            if (!copied) {
                                e.currentTarget.style.borderColor = "var(--color-ink)";
                                e.currentTarget.style.backgroundColor = "var(--color-hairline)";
                            }
                        }, onMouseLeave: function (e) {
                            if (!copied) {
                                e.currentTarget.style.borderColor = "var(--color-hairline-strong)";
                                e.currentTarget.style.backgroundColor = "var(--color-canvas-soft)";
                            }
                        }, "aria-label": "Copy profile link to clipboard" }, copied ? (React.createElement(React.Fragment, null,
                        React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", "aria-hidden": "true" },
                            React.createElement("polyline", { points: "20 6 9 17 4 12" })),
                        "Copied!")) : (React.createElement(React.Fragment, null,
                        React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true" },
                            React.createElement("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
                            React.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })),
                        "Copy link"))),
                    React.createElement("button", { type: "button", onClick: handleDownloadCard, disabled: isDownloading, style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "7px 14px",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: isDownloading ? "var(--color-ink-mute)" : "var(--color-ink)",
                            backgroundColor: "var(--color-canvas-soft)",
                            border: "1px solid var(--color-hairline-strong)",
                            borderRadius: "6px",
                            cursor: isDownloading ? "not-allowed" : "pointer",
                            lineHeight: 1
                        }, onMouseEnter: function (e) {
                            if (!isDownloading) {
                                e.currentTarget.style.borderColor = "var(--color-ink)";
                                e.currentTarget.style.backgroundColor = "var(--color-hairline)";
                            }
                        }, onMouseLeave: function (e) {
                            if (!isDownloading) {
                                e.currentTarget.style.borderColor = "var(--color-hairline-strong)";
                                e.currentTarget.style.backgroundColor = "var(--color-canvas-soft)";
                            }
                        }, "aria-label": "Download profile card as PNG" }, isDownloading ? (React.createElement(React.Fragment, null,
                        React.createElement("svg", { className: "animate-spin", width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true" },
                            React.createElement("circle", { cx: "12", cy: "12", r: "10", stroke: "var(--color-hairline-strong)", strokeWidth: "4", style: { opacity: 0.25 } }),
                            React.createElement("path", { fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })),
                        "Generating...")) : (React.createElement(React.Fragment, null,
                        React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true" },
                            React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                            React.createElement("polyline", { points: "7 10 12 15 17 10" }),
                            React.createElement("line", { x1: "12", y1: "15", x2: "12", y2: "3" })),
                        "Download card")))),
                React.createElement("div", { style: { display: "flex", gap: "20px", marginTop: "14px" } },
                    React.createElement("span", { style: { fontSize: "13px", color: "var(--color-ink-mute)" } },
                        React.createElement("strong", { style: { color: "var(--color-ink)", fontWeight: 600 } }, user.followers.toLocaleString("en-US")),
                        " followers"),
                    React.createElement("span", { style: { fontSize: "13px", color: "var(--color-ink-mute)" } },
                        React.createElement("strong", { style: { color: "var(--color-ink)", fontWeight: 600 } }, user.following.toLocaleString("en-US")),
                        " following"),
                    React.createElement("span", { style: { fontSize: "13px", color: "var(--color-ink-mute)" } },
                        React.createElement("strong", { style: { color: "var(--color-ink)", fontWeight: 600 } }, user.public_repos),
                        " repos")),
                updatedAt && (React.createElement("p", { style: { fontSize: "12px", color: "var(--color-ink-mute)", margin: "10px 0 0 0", lineHeight: 1.45 } },
                    "Last updated ",
                    formatUpdatedAt(updatedAt))))),
        React.createElement("div", { style: { marginTop: "40px" } },
            React.createElement("h2", { style: { fontSize: "16px", fontWeight: 600, color: "var(--color-ink)", margin: "0 0 20px 0", letterSpacing: "-0.2px" } }, "Popular repositories"),
            repos.length === 0 ? (React.createElement("p", { style: { fontSize: "13px", color: "var(--color-ink-mute)", margin: 0 } }, "No public repositories yet.")) : (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" } }, repos.map(function (repo) {
                    var _a;
                    return (React.createElement("a", { key: repo.id, href: repo.html_url, target: "_blank", rel: "noopener noreferrer", style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            padding: "20px",
                            border: "1px solid var(--color-hairline)",
                            borderRadius: "12px",
                            textDecoration: "none",
                            backgroundColor: "var(--color-canvas-soft)"
                        }, onMouseEnter: function (e) {
                            e.currentTarget.style.borderColor = "var(--color-hairline-strong)";
                            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.12)";
                        }, onMouseLeave: function (e) {
                            e.currentTarget.style.borderColor = "var(--color-hairline)";
                            e.currentTarget.style.boxShadow = "none";
                        } },
                        React.createElement("p", { style: { fontSize: "14px", fontWeight: 600, color: "var(--color-ink)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, repo.name),
                        React.createElement("p", { style: { fontSize: "13px", color: "var(--color-ink-mute)", margin: 0, lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "38px" } }, repo.description || "No description"),
                        repo.topics && repo.topics.length > 0 && (React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" } },
                            repo.topics.slice(0, 3).map(function (topic) { return (React.createElement("span", { key: topic, style: {
                                    fontSize: "11px",
                                    padding: "2px 8px",
                                    borderRadius: "9999px",
                                    backgroundColor: "var(--color-canvas-soft)",
                                    color: "var(--color-ink-mute)",
                                    border: "1px solid var(--color-hairline)"
                                } }, topic)); }),
                            repo.topics.length > 3 && (React.createElement("span", { style: { fontSize: "11px", padding: "2px 6px", color: "var(--color-ink-mute)" } },
                                "+",
                                repo.topics.length - 3,
                                " more")))),
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "16px", marginTop: "auto", paddingTop: "8px" } },
                            repo.language && (React.createElement("span", { style: { display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--color-ink-mute)" } },
                                React.createElement("span", { style: { width: "10px", height: "10px", borderRadius: "9999px", backgroundColor: (_a = LANG_COLORS[repo.language]) !== null && _a !== void 0 ? _a : "#9a9a9a", flexShrink: 0 } }),
                                repo.language)),
                            React.createElement("span", { style: { display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--color-ink-mute)" } },
                                React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                                    React.createElement("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })),
                                repo.stargazers_count.toLocaleString("en-US")),
                            React.createElement("span", { style: { display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--color-ink-mute)" } },
                                React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                                    React.createElement("circle", { cx: "12", cy: "18", r: "3" }),
                                    React.createElement("circle", { cx: "6", cy: "6", r: "3" }),
                                    React.createElement("circle", { cx: "18", cy: "6", r: "3" }),
                                    React.createElement("path", { d: "M18 9a9 9 0 0 1-9 9M6 9a9 9 0 0 0 9 9" })),
                                repo.forks_count.toLocaleString("en-US")))));
                })),
                React.createElement("div", { style: { marginTop: "20px" } },
                    React.createElement("a", { href: "https://github.com/" + user.login + "?tab=repositories", target: "_blank", rel: "noopener noreferrer", "aria-label": "View all repositories on GitHub (opens in a new tab)", style: { fontSize: "13px", color: "var(--color-ink-mute)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }, onMouseEnter: function (e) { return (e.currentTarget.style.color = "var(--color-ink)"); }, onMouseLeave: function (e) { return (e.currentTarget.style.color = "var(--color-ink-mute)"); } },
                        "View all repositories on GitHub",
                        React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                            React.createElement("path", { d: "M5 12h14M12 5l7 7-7 7" }))))))),
        React.createElement("div", { style: { marginTop: "44px" } },
            React.createElement("h2", { style: { fontSize: "16px", fontWeight: 600, color: "var(--color-ink)", margin: "0 0 16px 0", letterSpacing: "-0.2px" } }, "Contribution stats"),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" } }, [
                { label: "Contributions", value: stats.totalContributions },
                { label: "Commits", value: stats.totalCommits },
                { label: "Pull Requests", value: stats.totalPRs },
                { label: "Issues", value: stats.totalIssues },
                { label: "Reviews", value: stats.totalReviews },
                { label: "Stars", value: totalStars },
                { label: "Forks", value: totalForks },
                { label: "Contributor score", value: score },
            ].map(function (item) { return (React.createElement("div", { key: item.label, style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 12px",
                    border: "1px solid var(--color-hairline)",
                    borderRadius: "12px",
                    backgroundColor: "var(--color-canvas-soft)",
                    textAlign: "center"
                } },
                React.createElement("span", { style: { fontSize: "24px", fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.5px" } }, item.value.toLocaleString("en-US")),
                React.createElement("span", { style: { fontSize: "12px", color: "var(--color-ink-mute)", marginTop: "4px" } }, item.label),
                item.label === "Contributor score" && (React.createElement(link_1["default"], { href: "/score-explained", style: { fontSize: "11px", color: "var(--color-ink-mute-2)", marginTop: "4px", textDecoration: "none" } }, "Score explained \u2192")))); }))),
        techStack.length > 0 && (React.createElement("div", { style: { marginTop: "44px" } },
            React.createElement("h2", { style: { fontSize: "16px", fontWeight: 600, color: "var(--color-ink)", margin: "0 0 16px 0", letterSpacing: "-0.2px" } }, "Tech stack"),
            (function () {
                var totalRepoCount = techStack.reduce(function (sum, t) { return sum + t.repoCount; }, 0);
                if (totalRepoCount === 0)
                    return null;
                var summary = techStack
                    .map(function (t) { return t.language + " " + Math.round((t.repoCount / totalRepoCount) * 100) + "%"; })
                    .join(", ");
                return (React.createElement("div", { role: "img", "aria-label": "Language breakdown: " + summary, style: {
                        display: "flex",
                        width: "100%",
                        height: "8px",
                        borderRadius: "9999px",
                        overflow: "hidden",
                        marginBottom: "16px",
                        backgroundColor: "var(--color-canvas-soft)"
                    } }, techStack.map(function (_a, i) {
                    var _b;
                    var language = _a.language, repoCount = _a.repoCount;
                    return (React.createElement("div", { key: language, style: {
                            width: (repoCount / totalRepoCount) * 100 + "%",
                            backgroundColor: (_b = LANG_COLORS[language]) !== null && _b !== void 0 ? _b : "#9a9a9a",
                            borderTopLeftRadius: i === 0 ? "9999px" : 0,
                            borderBottomLeftRadius: i === 0 ? "9999px" : 0,
                            borderTopRightRadius: i === techStack.length - 1 ? "9999px" : 0,
                            borderBottomRightRadius: i === techStack.length - 1 ? "9999px" : 0
                        } }));
                })));
            })(),
            React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } }, techStack.map(function (_a) {
                var language = _a.language, repoCount = _a.repoCount;
                return (React.createElement("span", { key: language, style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        border: "1px solid var(--color-hairline)",
                        borderRadius: "9999px",
                        fontSize: "13px",
                        color: "var(--color-ink)",
                        backgroundColor: "var(--color-canvas-soft)"
                    } },
                    language,
                    React.createElement("span", { style: { color: "var(--color-ink-mute)", fontSize: "12px" } },
                        "\u00D7",
                        repoCount)));
            })))),
        orgs.length > 0 && (React.createElement("div", { style: { marginTop: "44px" } },
            React.createElement("h2", { style: { fontSize: "16px", fontWeight: 600, color: "var(--color-ink)", margin: "0 0 16px 0", letterSpacing: "-0.2px" } }, "Organizations"),
            React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "12px" } }, orgs.map(function (org) {
                var _a, _b;
                return (React.createElement("a", { key: org.login, href: org.url, target: "_blank", rel: "noopener noreferrer", title: (_a = org.name) !== null && _a !== void 0 ? _a : org.login, "aria-label": "Organization " + ((_b = org.name) !== null && _b !== void 0 ? _b : org.login) + " (opens in a new tab)", style: { display: "inline-flex", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--color-hairline)", transition: "border-color 0.15s" }, onMouseEnter: function (e) { return (e.currentTarget.style.borderColor = "#3ecf8e"); }, onMouseLeave: function (e) { return (e.currentTarget.style.borderColor = "var(--color-hairline)"); } },
                    React.createElement(image_1["default"], { src: org.avatarUrl, alt: org.login, width: 36, height: 36, style: { display: "block" } })));
            })))),
        heatmap.length > 0 && (React.createElement("div", { style: { marginTop: "44px" } },
            React.createElement("h2", { style: { fontSize: "16px", fontWeight: 600, color: "var(--color-ink)", margin: "0 0 16px 0", letterSpacing: "-0.2px" } }, "Contribution activity"),
            React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px", margin: "0 0 12px 0" } }, [
                { label: "Current streak", value: currentStreak },
                { label: "Longest streak", value: longestStreak },
            ].map(function (_a) {
                var label = _a.label, value = _a.value;
                return (React.createElement("span", { key: label, style: {
                        display: "inline-flex",
                        alignItems: "baseline",
                        gap: "6px",
                        padding: "6px 12px",
                        border: "1px solid var(--color-hairline)",
                        borderRadius: "9999px",
                        fontSize: "13px",
                        color: "var(--color-ink-mute)",
                        backgroundColor: "var(--color-canvas-soft)"
                    } },
                    React.createElement("strong", { style: { color: "var(--color-ink)", fontWeight: 600 } },
                        value,
                        " ",
                        value === 1 ? "day" : "days"),
                    label));
            })),
            React.createElement("div", { style: {
                    display: "flex",
                    gap: "3px",
                    overflowX: "auto",
                    padding: "16px",
                    border: "1px solid var(--color-hairline)",
                    borderRadius: "12px",
                    backgroundColor: "var(--color-canvas-soft)"
                } }, heatmap.map(function (week, wi) { return (React.createElement("div", { key: wi, style: { display: "flex", flexDirection: "column", gap: "3px" } }, week.days.map(function (day, di) { return (React.createElement("div", { key: di, title: day.count + " contributions on " + day.date, style: { width: "11px", height: "11px", borderRadius: "2px", backgroundColor: day.color, flexShrink: 0 } })); }))); })),
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px", margin: "10px 0 0 0" } },
                React.createElement("span", { style: { fontSize: "12px", color: "var(--color-ink-mute)", marginRight: "2px" } }, "Less"),
                ["var(--color-hairline)", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map(function (shade) { return (React.createElement("span", { key: shade, "aria-hidden": "true", style: { width: "11px", height: "11px", borderRadius: "2px", backgroundColor: shade.startsWith("var") ? "rgba(128, 128, 128, 0.1)" : shade, flexShrink: 0 } })); }),
                React.createElement("span", { style: { fontSize: "12px", color: "var(--color-ink-mute)", marginLeft: "2px" } }, "More")),
            React.createElement("p", { style: { fontSize: "12px", color: "var(--color-ink-mute)", margin: "10px 0 0 0" } }, "This chart shows an estimate of contribution activity. Exact daily counts are not available for public profiles."))),
        showBackToTop && (React.createElement("button", { type: "button", onClick: scrollToTop, "aria-label": "Back to top", style: {
                position: "fixed",
                bottom: "24px",
                right: "24px",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#3ecf8e",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.15s, background-color 0.15s",
                zIndex: 50
            }, onMouseEnter: function (e) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.backgroundColor = "#36b97e";
            }, onMouseLeave: function (e) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.backgroundColor = "#3ecf8e";
            } },
            React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
                React.createElement("polyline", { points: "18 15 12 9 6 15" })))),
        React.createElement("div", { style: { position: "fixed", left: "-9999px", top: "-9999px", overflow: "hidden", pointerEvents: "none" } },
            React.createElement("div", { ref: cardRef, style: {
                    width: "600px",
                    height: "300px",
                    padding: "32px",
                    backgroundColor: "#1c1c1c",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" } },
                    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px" } },
                        React.createElement("div", { style: { display: "flex", gap: "16px", alignItems: "center" } },
                            React.createElement("img", { src: user.avatar_url, alt: displayName, style: { width: "64px", height: "64px", borderRadius: "9999px", border: "1px solid rgba(255, 255, 255, 0.15)", objectFit: "cover" }, crossOrigin: "anonymous" }),
                            React.createElement("div", null,
                                React.createElement("div", { style: { fontSize: "18px", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.3px", lineHeight: 1.2 } }, displayName),
                                React.createElement("div", { style: { fontSize: "13px", color: "#9a9a9a", marginTop: "2px" } },
                                    "@",
                                    user.login))),
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: "#9a9a9a", fontWeight: 600 } }, "Contributor Score"),
                            React.createElement("div", { style: { fontSize: "44px", fontWeight: 700, color: "#3ecf8e", marginTop: "4px", lineHeight: 1 } }, score))),
                    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "260px" } }, [
                        { label: "Commits", value: stats.totalCommits },
                        { label: "PRs", value: stats.totalPRs },
                        { label: "Issues", value: stats.totalIssues },
                        { label: "Reviews", value: stats.totalReviews },
                    ].map(function (stat) { return (React.createElement("div", { key: stat.label, style: {
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "8px",
                            padding: "12px 14px",
                            backgroundColor: "#202020",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        } },
                        React.createElement("div", { style: { fontSize: "20px", fontWeight: 600, color: "#ffffff", lineHeight: 1.1 } }, stat.value.toLocaleString("en-US")),
                        React.createElement("div", { style: { fontSize: "11px", color: "#9a9a9a", marginTop: "4px", fontWeight: 500 } }, stat.label))); }))),
                React.createElement("div", { style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        paddingTop: "16px",
                        marginTop: "16px"
                    } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } },
                        React.createElement("span", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3ecf8e" } }),
                        React.createElement("span", { style: { fontSize: "14px", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.2px" } }, "OSSfolio")),
                    React.createElement("span", { style: { fontSize: "11px", fontFamily: "ui-monospace, Menlo, Monaco, Consolas, monospace", color: "#707070" } }, "ossfolio.qzz.io"))))));
}
exports.ProfileView = ProfileView;
