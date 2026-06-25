"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var primaryButton = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "130px",
    padding: "10px 28px",
    borderRadius: "8px",
    backgroundColor: "#3ecf8e",
    color: "#171717",
    fontSize: "16px",
    fontWeight: 600,
    border: "none",
    cursor: "pointer"
};
function GlobalError(_a) {
    var error = _a.error, reset = _a.reset;
    return (React.createElement("main", { style: {
            backgroundColor: "#ffffff",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px"
        } },
        React.createElement("div", { style: { textAlign: "center", maxWidth: "28rem" } },
            React.createElement("p", { style: {
                    fontSize: "72px",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#3ecf8e"
                } }, "500"),
            React.createElement("h1", { style: {
                    marginTop: "16px",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#171717"
                } }, "Something went wrong"),
            React.createElement("p", { style: { marginTop: "12px", fontSize: "16px", color: "#707070" } }, "An unexpected error occurred. You can try again or head back to the home page."),
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "center",
                    gap: "12px",
                    marginTop: "28px"
                } },
                React.createElement("button", { onClick: reset, style: primaryButton }, "Try again"),
                React.createElement("a", { href: "/", style: __assign(__assign({}, primaryButton), { backgroundColor: "transparent", border: "1px solid #e2e2e2", color: "#171717", textDecoration: "none" }) }, "Back to home")))));
}
exports["default"] = GlobalError;
