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
exports.HeatmapWithYearNav = void 0;
var react_1 = require("react");
var mock_1 = require("@/lib/mock");
var currentYear = new Date().getFullYear();
var years = Array.from({ length: 5 }, function (_, i) { return currentYear - i; });
function HeatmapWithYearNav(_a) {
    var _this = this;
    var username = _a.username, initialWeeks = _a.initialWeeks, initialCurrentStreak = _a.initialCurrentStreak, initialLongestStreak = _a.initialLongestStreak;
    var _b = react_1.useState(currentYear), selectedYear = _b[0], setSelectedYear = _b[1];
    var _c = react_1.useState(initialWeeks), weeks = _c[0], setWeeks = _c[1];
    var _d = react_1.useState(initialCurrentStreak), currentStreak = _d[0], setCurrentStreak = _d[1];
    var _e = react_1.useState(initialLongestStreak), longestStreak = _e[0], setLongestStreak = _e[1];
    var _f = react_1.useState(false), loading = _f[0], setLoading = _f[1];
    var fetchYear = react_1.useCallback(function (year) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, streaks, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (year === selectedYear)
                        return [2 /*return*/];
                    if (year === currentYear && initialWeeks.length > 0) {
                        setWeeks(initialWeeks);
                        setCurrentStreak(initialCurrentStreak);
                        setLongestStreak(initialLongestStreak);
                        setSelectedYear(year);
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setSelectedYear(year);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/" + encodeURIComponent(username) + "/contributions?year=" + year)];
                case 2:
                    res = _b.sent();
                    if (!res.ok)
                        throw new Error("fetch failed");
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    setWeeks(data.weeks);
                    streaks = mock_1.computeStreaks(data.weeks);
                    setCurrentStreak(streaks.current);
                    setLongestStreak(streaks.longest);
                    return [3 /*break*/, 6];
                case 4:
                    _a = _b.sent();
                    setWeeks([]);
                    setCurrentStreak(0);
                    setLongestStreak(0);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [username, selectedYear, initialWeeks, initialCurrentStreak, initialLongestStreak]);
    if (initialWeeks.length === 0 && weeks.length === 0)
        return null;
    return (React.createElement("div", { style: { marginTop: "44px" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 0 16px 0" } },
            React.createElement("h2", { style: { fontSize: "16px", fontWeight: 600, color: "var(--color-ink)", margin: 0, letterSpacing: "-0.2px" } }, "Contribution activity"),
            React.createElement("div", { style: { display: "flex", gap: "6px" } }, years.map(function (year) { return (React.createElement("button", { key: year, type: "button", onClick: function () { return fetchYear(year); }, disabled: loading, style: {
                    padding: "4px 10px",
                    fontSize: "12px",
                    fontWeight: selectedYear === year ? 600 : 400,
                    color: selectedYear === year ? "#171717" : "var(--color-ink-mute)",
                    backgroundColor: selectedYear === year ? "#3ecf8e" : "var(--color-canvas-soft)",
                    border: selectedYear === year ? "none" : "1px solid var(--color-hairline)",
                    borderRadius: "9999px",
                    cursor: loading ? "wait" : "pointer",
                    transition: "background-color 0.15s, color 0.15s"
                } }, year)); }))),
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
                backgroundColor: "var(--color-canvas-soft)",
                opacity: loading ? 0.5 : 1,
                transition: "opacity 0.2s"
            } },
            weeks.map(function (week, wi) { return (React.createElement("div", { key: wi, style: { display: "flex", flexDirection: "column", gap: "3px" } }, week.days.map(function (day, di) { return (React.createElement("div", { key: di, title: day.count + " contributions on " + day.date, style: { width: "11px", height: "11px", borderRadius: "2px", backgroundColor: day.color, flexShrink: 0 } })); }))); }),
            weeks.length === 0 && !loading && (React.createElement("p", { style: { fontSize: "13px", color: "var(--color-ink-mute)", margin: "12px auto" } },
                "No contribution data available for ",
                selectedYear,
                "."))),
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px", margin: "10px 0 0 0" } },
            React.createElement("span", { style: { fontSize: "12px", color: "var(--color-ink-mute)", marginRight: "2px" } }, "Less"),
            ["var(--color-hairline)", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map(function (shade) { return (React.createElement("span", { key: shade, "aria-hidden": "true", style: { width: "11px", height: "11px", borderRadius: "2px", backgroundColor: shade.startsWith("var") ? "rgba(128, 128, 128, 0.1)" : shade, flexShrink: 0 } })); }),
            React.createElement("span", { style: { fontSize: "12px", color: "var(--color-ink-mute)", marginLeft: "2px" } }, "More")),
        React.createElement("p", { style: { fontSize: "12px", color: "var(--color-ink-mute)", margin: "10px 0 0 0" } }, "This chart shows an estimate of contribution activity. Exact daily counts are not available for public profiles.")));
}
exports.HeatmapWithYearNav = HeatmapWithYearNav;
