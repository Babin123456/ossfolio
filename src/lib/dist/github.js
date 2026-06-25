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
exports.fetchContributionCalendar = exports.contributorToScoreInputs = exports.fetchContributorProfile = exports.CONTRIBUTOR_QUERY = void 0;
var GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
function githubGraphQL(query, variables, token) {
    return __awaiter(this, void 0, Promise, function () {
        var res, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(GITHUB_GRAPHQL_URL, {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ query: query, variables: variables }),
                        next: { revalidate: 3600 }
                    })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("GitHub API error: " + res.status);
                    return [4 /*yield*/, res.json()];
                case 2:
                    json = _a.sent();
                    if (json.errors)
                        throw new Error(json.errors[0].message);
                    return [2 /*return*/, json.data];
            }
        });
    });
}
exports.CONTRIBUTOR_QUERY = "\n  query ContributorProfile($login: String!) {\n    user(login: $login) {\n      login\n      name\n      bio\n      avatarUrl\n      url\n      websiteUrl\n      twitterUsername\n      location\n      followers { totalCount }\n      following { totalCount }\n      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: { field: STARGAZERS, direction: DESC }) {\n        totalCount\n        nodes {\n          name\n          description\n          stargazerCount\n          forkCount\n          primaryLanguage { name color }\n          url\n        }\n      }\n      contributionsCollection {\n        totalCommitContributions\n        totalPullRequestContributions\n        totalIssueContributions\n        totalPullRequestReviewContributions\n        contributionCalendar {\n          totalContributions\n          weeks {\n            contributionDays {\n              contributionCount\n              date\n              color\n            }\n          }\n        }\n      }\n      organizations(first: 20) {\n        nodes {\n          login\n          name\n          avatarUrl\n          url\n        }\n      }\n    }\n  }\n";
/** Fetch a contributor's full GitHub profile and contributions via the GraphQL API using a bearer token. */
function fetchContributorProfile(login, token) {
    return __awaiter(this, void 0, Promise, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, githubGraphQL(exports.CONTRIBUTOR_QUERY, { login: login }, token)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.user];
            }
        });
    });
}
exports.fetchContributorProfile = fetchContributorProfile;
/**
 * Convert a GraphQL `GitHubContributor` into the `{ stats, repos }` inputs that
 * `calculateScore` expects. Unlike the unauthenticated REST pipeline, the
 * authenticated GraphQL `contributionsCollection` exposes review counts, so the
 * resulting score reflects every signal in the formula (commits, PRs, issues,
 * reviews, stars). Pure and side-effect free so it can be unit-tested directly.
 */
function contributorToScoreInputs(c) {
    var cc = c.contributionsCollection;
    var stats = {
        totalCommits: cc.totalCommitContributions,
        totalPRs: cc.totalPullRequestContributions,
        totalIssues: cc.totalIssueContributions,
        totalReviews: cc.totalPullRequestReviewContributions,
        totalContributions: cc.contributionCalendar.totalContributions
    };
    var repos = c.repositories.nodes.map(function (n) {
        var _a, _b, _c, _d;
        return ({
            name: n.name,
            description: n.description,
            stars: n.stargazerCount,
            forks: n.forkCount,
            language: (_b = (_a = n.primaryLanguage) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : null,
            languageColor: (_d = (_c = n.primaryLanguage) === null || _c === void 0 ? void 0 : _c.color) !== null && _d !== void 0 ? _d : null,
            url: n.url,
            topics: []
        });
    });
    return { stats: stats, repos: repos };
}
exports.contributorToScoreInputs = contributorToScoreInputs;
/* -------------------------------------------------------------------------- */
/* Public contribution calendar (no token required)                           */
/* -------------------------------------------------------------------------- */
/**
 * The GraphQL `contributionsCollection` above is the richest source of
 * contribution data, but it requires an authenticated bearer token — which the
 * public profile pages do not have. GitHub also serves the same calendar as an
 * HTML fragment at `https://github.com/users/<login>/contributions`, with no
 * authentication. Each day is a `<td class="ContributionCalendar-day">` carrying
 * `data-date` and an `id` of the form `contribution-day-component-<row>-<col>`
 * (row = day of week 0–6, col = week index), and the exact count lives in a
 * matching `<tool-tip for="…">N contributions on <date>.</tool-tip>`.
 *
 * This module parses that fragment into the same `HeatmapWeek[]` shape the
 * `generateMockHeatmap` placeholder produced, so the profile page can drop in
 * real data without any component changes.
 */
// GitHub's five contribution intensity buckets (matches the mock generator).
var HEATMAP_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
/** Map a raw contribution count to GitHub's five-step heatmap colour scale. */
function colorForCount(count) {
    if (count === 0)
        return HEATMAP_COLORS[0];
    if (count < 3)
        return HEATMAP_COLORS[1];
    if (count < 6)
        return HEATMAP_COLORS[2];
    if (count < 9)
        return HEATMAP_COLORS[3];
    return HEATMAP_COLORS[4];
}
/**
 * Fetch and parse a user's real contribution calendar from GitHub's public
 * (unauthenticated) HTML endpoint. Returns weeks ordered oldest → newest, each
 * with seven days ordered Sunday → Saturday, plus the year's total. Returns
 * `null` if the request fails or the markup cannot be parsed, so callers can
 * fall back gracefully without crashing the page.
 */
function fetchContributionCalendar(username) {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        var res, html, countById, tipRe, tip, id, label, numMatch, count, weekMap_1, cellRe, cell, tag, dateMatch, idMatch, row, col, id, count, weeks, totalContributions, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://github.com/users/" + encodeURIComponent(username) + "/contributions", {
                            headers: {
                                // GitHub returns the calendar fragment for a normal browser Accept.
                                Accept: "text/html",
                                "User-Agent": "ossfolio (+https://ossfolio.qzz.io)"
                            },
                            next: { revalidate: 3600 }
                        })];
                case 1:
                    res = _c.sent();
                    if (!res.ok)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, res.text()];
                case 2:
                    html = _c.sent();
                    countById = new Map();
                    tipRe = /<tool-tip[^>]*\bfor="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)<\/tool-tip>/g;
                    tip = void 0;
                    while ((tip = tipRe.exec(html)) !== null) {
                        id = tip[1];
                        label = tip[2].trim();
                        numMatch = label.match(/^([\d,]+)\s+contribution/);
                        count = numMatch ? parseInt(numMatch[1].replace(/,/g, ""), 10) : 0;
                        countById.set(id, count);
                    }
                    weekMap_1 = new Map();
                    cellRe = /<td\b[^>]*class="ContributionCalendar-day"[^>]*>/g;
                    cell = void 0;
                    while ((cell = cellRe.exec(html)) !== null) {
                        tag = cell[0];
                        dateMatch = tag.match(/data-date="([0-9-]+)"/);
                        idMatch = tag.match(/id="contribution-day-component-(\d+)-(\d+)"/);
                        if (!dateMatch || !idMatch)
                            continue;
                        row = parseInt(idMatch[1], 10);
                        col = parseInt(idMatch[2], 10);
                        id = "contribution-day-component-" + row + "-" + col;
                        count = (_a = countById.get(id)) !== null && _a !== void 0 ? _a : 0;
                        if (!weekMap_1.has(col))
                            weekMap_1.set(col, []);
                        weekMap_1.get(col).push({
                            row: row,
                            day: { date: dateMatch[1], count: count, color: colorForCount(count) }
                        });
                    }
                    if (weekMap_1.size === 0)
                        return [2 /*return*/, null];
                    weeks = __spreadArrays(weekMap_1.keys()).sort(function (a, b) { return a - b; })
                        .map(function (col) { return ({
                        days: weekMap_1
                            .get(col)
                            .sort(function (a, b) { return a.row - b.row; })
                            .map(function (entry) { return entry.day; })
                    }); });
                    totalContributions = weeks.reduce(function (sum, week) { return sum + week.days.reduce(function (s, d) { return s + d.count; }, 0); }, 0);
                    return [2 /*return*/, { weeks: weeks, totalContributions: totalContributions }];
                case 3:
                    _b = _c.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.fetchContributionCalendar = fetchContributionCalendar;
