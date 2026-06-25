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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.fetchOrganizations = exports.fetchLiveStats = exports.deriveTechStack = exports.mapRepos = exports.languageColor = void 0;
/**
 * Live profile "extras" derived from the public (unauthenticated) GitHub REST
 * API, keyed by username. The base profile page already fetches the user object
 * and repo list; this module turns those plus a few extra REST calls into the
 * shapes the profile section components expect.
 *
 * What is genuinely live here:
 *   - stats.totalPRs / totalIssues / totalCommits  -> GitHub Search API
 *   - organizations                                -> /users/{login}/orgs
 *   - techStack                                    -> aggregated from repo languages
 *
 * What is NOT available from unauthenticated REST (and is handled elsewhere as a
 * fallback): the contribution heatmap and review counts. Reviews require the
 * authenticated GraphQL contributionsCollection, so totalReviews is reported as
 * 0 rather than guessed.
 */
var LANG_COLORS = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Go: "#00ADD8",
    Rust: "#dea584",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Ruby: "#701516",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    Shell: "#89e051",
    Vue: "#41b883",
    Svelte: "#ff3e00",
    PHP: "#4F5D95",
    "Jupyter Notebook": "#DA5B0B",
    Dockerfile: "#384d54"
};
/** Return the hex colour for a programming language name, or null if the language is not in the built-in map. */
function languageColor(language) {
    var _a;
    if (!language)
        return null;
    return (_a = LANG_COLORS[language]) !== null && _a !== void 0 ? _a : "#9a9a9a";
}
exports.languageColor = languageColor;
/** Map raw REST repos into the `Repo` type the TopRepos component consumes. */
function mapRepos(repos) {
    return repos.map(function (r) {
        var _a;
        return ({
            name: r.name,
            description: r.description,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            languageColor: languageColor(r.language),
            url: r.html_url,
            topics: (_a = r.topics) !== null && _a !== void 0 ? _a : []
        });
    });
}
exports.mapRepos = mapRepos;
/** Aggregate repo primary languages into a sorted TechEntry[] (most repos first). */
function deriveTechStack(repos) {
    var _a;
    var counts = new Map();
    for (var _i = 0, repos_1 = repos; _i < repos_1.length; _i++) {
        var repo = repos_1[_i];
        if (!repo.language)
            continue;
        counts.set(repo.language, ((_a = counts.get(repo.language)) !== null && _a !== void 0 ? _a : 0) + 1);
    }
    return __spreadArrays(counts.entries()).map(function (_a) {
        var language = _a[0], repoCount = _a[1];
        return ({ language: language, repoCount: repoCount });
    })
        .sort(function (a, b) { return b.repoCount - a.repoCount; });
}
exports.deriveTechStack = deriveTechStack;
/** A single Search API count call. Returns 0 on any failure (rate limit, etc.). */
function searchCount(query, accept) {
    return __awaiter(this, void 0, Promise, function () {
        var res, json, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.github.com/search/" + query + "&per_page=1", {
                            headers: {
                                Accept: accept !== null && accept !== void 0 ? accept : "application/vnd.github.v3+json"
                            },
                            next: { revalidate: 3600 }
                        })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, 0];
                    return [4 /*yield*/, res.json()];
                case 2:
                    json = _b.sent();
                    return [2 /*return*/, typeof json.total_count === "number" ? json.total_count : 0];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, 0];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Live contribution stats for a username via the Search API.
 *
 * totalReviews is intentionally 0: review counts are only available through the
 * authenticated GraphQL contributionsCollection, not unauthenticated REST.
 * totalContributions is left for the caller to fill from the (mock) heatmap.
 */
function fetchLiveStats(username) {
    return __awaiter(this, void 0, Promise, function () {
        var u, _a, totalPRs, totalIssues, totalCommits;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    u = encodeURIComponent(username);
                    return [4 /*yield*/, Promise.all([
                            searchCount("issues?q=author:" + u + "+type:pr"),
                            searchCount("issues?q=author:" + u + "+type:issue"),
                            searchCount("commits?q=author:" + u, "application/vnd.github.cloak-preview+json"),
                        ])];
                case 1:
                    _a = _b.sent(), totalPRs = _a[0], totalIssues = _a[1], totalCommits = _a[2];
                    return [2 /*return*/, {
                            totalCommits: totalCommits,
                            totalPRs: totalPRs,
                            totalIssues: totalIssues,
                            totalReviews: 0,
                            totalContributions: 0
                        }];
            }
        });
    });
}
exports.fetchLiveStats = fetchLiveStats;
/** Fetch the user's public organizations and map to the `Org` type. */
function fetchOrganizations(username) {
    return __awaiter(this, void 0, Promise, function () {
        var res, orgs, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.github.com/users/" + encodeURIComponent(username) + "/orgs", {
                            headers: { Accept: "application/vnd.github.v3+json" },
                            next: { revalidate: 3600 }
                        })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, []];
                    return [4 /*yield*/, res.json()];
                case 2:
                    orgs = (_b.sent());
                    if (!Array.isArray(orgs))
                        return [2 /*return*/, []];
                    return [2 /*return*/, orgs.map(function (o) { return ({
                            login: o.login,
                            name: o.description,
                            avatarUrl: o.avatar_url,
                            url: "https://github.com/" + o.login
                        }); })];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.fetchOrganizations = fetchOrganizations;
