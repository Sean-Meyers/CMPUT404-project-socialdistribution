"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/auth";
exports.ids = ["pages/auth"];
exports.modules = {

/***/ "./src/pages/auth.tsx":
/*!****************************!*\
  !*** ./src/pages/auth.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps),\n/* harmony export */   \"revalidate\": () => (/* binding */ revalidate)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _supabase_auth_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @supabase/auth-ui-react */ \"@supabase/auth-ui-react\");\n/* harmony import */ var _supabase_auth_ui_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @supabase/auth-ui-shared */ \"@supabase/auth-ui-shared\");\n/* harmony import */ var _supabase_auth_ui_shared__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_supabase_auth_ui_shared__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @supabase/auth-helpers-react */ \"@supabase/auth-helpers-react\");\n/* harmony import */ var _supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @supabase/auth-helpers-nextjs */ \"@supabase/auth-helpers-nextjs\");\n/* harmony import */ var _supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_supabase_auth_ui_react__WEBPACK_IMPORTED_MODULE_2__]);\n_supabase_auth_ui_react__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\nconst AuthPage = ({})=>{\n    const supabaseClient = (0,_supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_4__.useSupabaseClient)();\n    const user = (0,_supabase_auth_helpers_react__WEBPACK_IMPORTED_MODULE_4__.useUser)();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (user) {\n            router.push(\"/\");\n        }\n    }, [\n        user\n    ]);\n    if (!user) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto mt-12 max-w-3xl px-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"text-3xl text-gray-700 font-semibold mb-4 text-center\",\n                children: \"Welcome to Your Doom\"\n            }, void 0, false, {\n                fileName: \"/home/tosin/Desktop/cmput404/CMPUT404-project-socialdistribution/src/pages/auth.tsx\",\n                lineNumber: 26,\n                columnNumber: 11\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_supabase_auth_ui_react__WEBPACK_IMPORTED_MODULE_2__.Auth, {\n                redirectTo: \"https://ryfotblenvmtqnedsulf.supabase.co/\" || 0,\n                appearance: {\n                    theme: _supabase_auth_ui_shared__WEBPACK_IMPORTED_MODULE_3__.ThemeSupa\n                },\n                supabaseClient: supabaseClient,\n                socialLayout: \"horizontal\",\n                providers: []\n            }, void 0, false, {\n                fileName: \"/home/tosin/Desktop/cmput404/CMPUT404-project-socialdistribution/src/pages/auth.tsx\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/tosin/Desktop/cmput404/CMPUT404-project-socialdistribution/src/pages/auth.tsx\",\n        lineNumber: 25,\n        columnNumber: 9\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n        fileName: \"/home/tosin/Desktop/cmput404/CMPUT404-project-socialdistribution/src/pages/auth.tsx\",\n        lineNumber: 39,\n        columnNumber: 12\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthPage);\nconst revalidate = 60;\nconst getServerSideProps = async (context)=>{\n    const supabaseServerClient = (0,_supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_5__.createServerSupabaseClient)(context);\n    const { data: { user  }  } = await supabaseServerClient.auth.getUser();\n    if (!user) {\n        return {\n            props: {}\n        };\n    }\n    return {\n        redirect: {\n            destination: \"/\",\n            permanent: false\n        }\n    };\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvYXV0aC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDUTtBQUNJO0FBQ3VCO0FBQ0M7QUFFbkM7QUFLdkMsTUFBTVEsV0FBaUMsQ0FBQyxFQUFFLEdBQUs7SUFDM0MsTUFBTUMsaUJBQWlCSiwrRUFBaUJBO0lBQ3hDLE1BQU1LLE9BQU9OLHFFQUFPQTtJQUNwQixNQUFNTyxTQUFTSixzREFBU0E7SUFFeEJOLGdEQUFTQSxDQUFDLElBQU07UUFDWixJQUFJUyxNQUFNO1lBQ05DLE9BQU9DLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsR0FBRztRQUFDRjtLQUFLO0lBRVQsSUFBSSxDQUFDQSxNQUNMLHFCQUNJLDhEQUFDRztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQXdEOzs7Ozs7MEJBRzNFLDhEQUFDWix5REFBSUE7Z0JBQ0hhLFlBQVlDLDJDQUFvQyxJQUFJO2dCQUNwREcsWUFBWTtvQkFBRUMsT0FBT2pCLCtEQUFTQTtnQkFBQztnQkFDL0JNLGdCQUFnQkE7Z0JBQ2hCWSxjQUFhO2dCQUNiQyxXQUFXLEVBQUU7Ozs7Ozs7Ozs7OztJQUtqQixxQkFBTyw4REFBQ1Q7Ozs7O0FBQ1o7QUFDQSxpRUFBZUwsUUFBUUEsRUFBQztBQUdqQixNQUFNZSxhQUFhLEdBQUU7QUFDckIsTUFBTUMscUJBQXdDLE9BQU9DLFVBQVk7SUFFbEUsTUFBTUMsdUJBQXVCcEIseUZBQTBCQSxDQUFDbUI7SUFDdEQsTUFBTSxFQUNKRSxNQUFNLEVBQUVqQixLQUFJLEVBQUUsR0FDZixHQUFHLE1BQU1nQixxQkFBcUJFLElBQUksQ0FBQ0MsT0FBTztJQUUzQyxJQUFJLENBQUNuQixNQUFNO1FBQ1QsT0FBTztZQUNMb0IsT0FBTyxDQUFDO1FBQ1Y7SUFDRixDQUFDO0lBRUQsT0FBTztRQUNMQyxVQUFVO1lBQ1JDLGFBQWE7WUFDYkMsV0FBVyxLQUFLO1FBQ2xCO0lBQ0Y7QUFDUixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvcGFnZXMvYXV0aC50c3g/NTNkNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VFZmZlY3R9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQXV0aCB9IGZyb20gJ0BzdXBhYmFzZS9hdXRoLXVpLXJlYWN0J1xuaW1wb3J0IHtUaGVtZVN1cGF9IGZyb20gJ0BzdXBhYmFzZS9hdXRoLXVpLXNoYXJlZCdcbmltcG9ydCB7IHVzZVVzZXIsIHVzZVN1cGFiYXNlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL2F1dGgtaGVscGVycy1yZWFjdCdcbmltcG9ydCB7IGNyZWF0ZVNlcnZlclN1cGFiYXNlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL2F1dGgtaGVscGVycy1uZXh0anMnXG5pbXBvcnQgeyBHZXRTZXJ2ZXJTaWRlUHJvcHMgfSBmcm9tICduZXh0J1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInXG5pbnRlcmZhY2UgbG9naW5Qcm9wcyB7XG5cbn1cblxuY29uc3QgQXV0aFBhZ2U6IFJlYWN0LkZDPGxvZ2luUHJvcHM+ID0gKHt9KSA9PiB7XG4gICAgY29uc3Qgc3VwYWJhc2VDbGllbnQgPSB1c2VTdXBhYmFzZUNsaWVudCgpXG4gICAgY29uc3QgdXNlciA9IHVzZVVzZXIoKVxuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgcm91dGVyLnB1c2goJy8nKVxuICAgICAgICB9XG4gICAgfSwgW3VzZXJdKVxuXG4gICAgaWYgKCF1c2VyKVxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXIgbXgtYXV0byBtdC0xMiBtYXgtdy0zeGwgcHgtOCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RleHQtM3hsIHRleHQtZ3JheS03MDAgZm9udC1zZW1pYm9sZCBtYi00IHRleHQtY2VudGVyJz5cbiAgICAgICAgICAgIFdlbGNvbWUgdG8gWW91ciBEb29tXG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8QXV0aFxuICAgICAgICByZWRpcmVjdFRvPXtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8nfVxuICAgICAgICBhcHBlYXJhbmNlPXt7IHRoZW1lOiBUaGVtZVN1cGEgfX1cbiAgICAgICAgc3VwYWJhc2VDbGllbnQ9e3N1cGFiYXNlQ2xpZW50fVxuICAgICAgICBzb2NpYWxMYXlvdXQ9XCJob3Jpem9udGFsXCJcbiAgICAgICAgcHJvdmlkZXJzPXtbXX1cbiAgICAgICAgXG4gICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICAgIHJldHVybiA8ZGl2PjwvZGl2PlxufVxuZXhwb3J0IGRlZmF1bHQgQXV0aFBhZ2U7XG5cblxuZXhwb3J0IGNvbnN0IHJldmFsaWRhdGUgPSA2MFxuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wczpHZXRTZXJ2ZXJTaWRlUHJvcHMgPSBhc3luYyAoY29udGV4dCkgPT4ge1xuICBcbiAgICAgIGNvbnN0IHN1cGFiYXNlU2VydmVyQ2xpZW50ID0gY3JlYXRlU2VydmVyU3VwYWJhc2VDbGllbnQoY29udGV4dClcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGRhdGE6IHsgdXNlciB9LFxuICAgICAgICB9ID0gYXdhaXQgc3VwYWJhc2VTZXJ2ZXJDbGllbnQuYXV0aC5nZXRVc2VyKCk7XG4gIFxuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvcHM6IHt9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVkaXJlY3Q6IHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uOiAnLycsXG4gICAgICAgICAgICBwZXJtYW5lbnQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG59Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwiQXV0aCIsIlRoZW1lU3VwYSIsInVzZVVzZXIiLCJ1c2VTdXBhYmFzZUNsaWVudCIsImNyZWF0ZVNlcnZlclN1cGFiYXNlQ2xpZW50IiwidXNlUm91dGVyIiwiQXV0aFBhZ2UiLCJzdXBhYmFzZUNsaWVudCIsInVzZXIiLCJyb3V0ZXIiLCJwdXNoIiwiZGl2IiwiY2xhc3NOYW1lIiwicmVkaXJlY3RUbyIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJhcHBlYXJhbmNlIiwidGhlbWUiLCJzb2NpYWxMYXlvdXQiLCJwcm92aWRlcnMiLCJyZXZhbGlkYXRlIiwiZ2V0U2VydmVyU2lkZVByb3BzIiwiY29udGV4dCIsInN1cGFiYXNlU2VydmVyQ2xpZW50IiwiZGF0YSIsImF1dGgiLCJnZXRVc2VyIiwicHJvcHMiLCJyZWRpcmVjdCIsImRlc3RpbmF0aW9uIiwicGVybWFuZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/auth.tsx\n");

/***/ }),

/***/ "@supabase/auth-helpers-nextjs":
/*!************************************************!*\
  !*** external "@supabase/auth-helpers-nextjs" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@supabase/auth-helpers-nextjs");

/***/ }),

/***/ "@supabase/auth-helpers-react":
/*!***********************************************!*\
  !*** external "@supabase/auth-helpers-react" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@supabase/auth-helpers-react");

/***/ }),

/***/ "@supabase/auth-ui-shared":
/*!*******************************************!*\
  !*** external "@supabase/auth-ui-shared" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@supabase/auth-ui-shared");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@supabase/auth-ui-react":
/*!******************************************!*\
  !*** external "@supabase/auth-ui-react" ***!
  \******************************************/
/***/ ((module) => {

module.exports = import("@supabase/auth-ui-react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/auth.tsx"));
module.exports = __webpack_exports__;

})();