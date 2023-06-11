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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./Store/auth.js":
/*!***********************!*\
  !*** ./Store/auth.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authActions\": () => (/* binding */ authActions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n\nconst initialAuthState = {\n    isAuthenticated: \"\",\n    id: \"\"\n};\nconst authSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"authentication\",\n    initialState: initialAuthState,\n    reducers: {\n        loginAsDonor (state) {\n            state.isAuthenticated = \"Donor\";\n        },\n        loginAsHos (state) {\n            state.isAuthenticated = \"Hos\";\n        },\n        logout (state) {\n            state.isAuthenticated = \"No\";\n        },\n        setUserId (state, action) {\n            state.id = action.payload;\n        }\n    }\n});\nconst authActions = authSlice.actions;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authSlice.reducer);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9TdG9yZS9hdXRoLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBK0M7QUFFL0MsTUFBTUMsbUJBQW1CO0lBQ3ZCQyxpQkFBaUI7SUFDakJDLElBQUk7QUFDTjtBQUVBLE1BQU1DLFlBQVlKLDZEQUFXQSxDQUFDO0lBQzVCSyxNQUFNO0lBQ05DLGNBQWNMO0lBQ2RNLFVBQVU7UUFDUkMsY0FBYUMsS0FBSyxFQUFFO1lBQ2xCQSxNQUFNUCxlQUFlLEdBQUc7UUFDMUI7UUFDQVEsWUFBV0QsS0FBSyxFQUFFO1lBQ2hCQSxNQUFNUCxlQUFlLEdBQUc7UUFDMUI7UUFDQVMsUUFBT0YsS0FBSyxFQUFFO1lBQ1pBLE1BQU1QLGVBQWUsR0FBRztRQUMxQjtRQUNBVSxXQUFVSCxLQUFLLEVBQUVJLE1BQU0sRUFBRTtZQUN2QkosTUFBTU4sRUFBRSxHQUFHVSxPQUFPQyxPQUFPO1FBQzNCO0lBQ0Y7QUFDRjtBQUVPLE1BQU1DLGNBQWNYLFVBQVVZLE9BQU8sQ0FBQztBQUU3QyxpRUFBZVosVUFBVWEsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3JhZHVhdGlvbl9wcm9qZWN0Ly4vU3RvcmUvYXV0aC5qcz82YmVjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNsaWNlIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5cbmNvbnN0IGluaXRpYWxBdXRoU3RhdGUgPSB7XG4gIGlzQXV0aGVudGljYXRlZDogJycsXG4gIGlkOiAnJyxcbn07XG5cbmNvbnN0IGF1dGhTbGljZSA9IGNyZWF0ZVNsaWNlKHtcbiAgbmFtZTogJ2F1dGhlbnRpY2F0aW9uJyxcbiAgaW5pdGlhbFN0YXRlOiBpbml0aWFsQXV0aFN0YXRlLFxuICByZWR1Y2Vyczoge1xuICAgIGxvZ2luQXNEb25vcihzdGF0ZSkge1xuICAgICAgc3RhdGUuaXNBdXRoZW50aWNhdGVkID0gJ0Rvbm9yJztcbiAgICB9LFxuICAgIGxvZ2luQXNIb3Moc3RhdGUpIHtcbiAgICAgIHN0YXRlLmlzQXV0aGVudGljYXRlZCA9ICdIb3MnO1xuICAgIH0sXG4gICAgbG9nb3V0KHN0YXRlKSB7XG4gICAgICBzdGF0ZS5pc0F1dGhlbnRpY2F0ZWQgPSAnTm8nO1xuICAgIH0sXG4gICAgc2V0VXNlcklkKHN0YXRlLCBhY3Rpb24pIHtcbiAgICAgIHN0YXRlLmlkID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5leHBvcnQgY29uc3QgYXV0aEFjdGlvbnMgPSBhdXRoU2xpY2UuYWN0aW9ucztcblxuZXhwb3J0IGRlZmF1bHQgYXV0aFNsaWNlLnJlZHVjZXI7XG4iXSwibmFtZXMiOlsiY3JlYXRlU2xpY2UiLCJpbml0aWFsQXV0aFN0YXRlIiwiaXNBdXRoZW50aWNhdGVkIiwiaWQiLCJhdXRoU2xpY2UiLCJuYW1lIiwiaW5pdGlhbFN0YXRlIiwicmVkdWNlcnMiLCJsb2dpbkFzRG9ub3IiLCJzdGF0ZSIsImxvZ2luQXNIb3MiLCJsb2dvdXQiLCJzZXRVc2VySWQiLCJhY3Rpb24iLCJwYXlsb2FkIiwiYXV0aEFjdGlvbnMiLCJhY3Rpb25zIiwicmVkdWNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Store/auth.js\n");

/***/ }),

/***/ "./Store/index.js":
/*!************************!*\
  !*** ./Store/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth */ \"./Store/auth.js\");\n\n\nconst store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({\n    reducer: {\n        auth: _auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9TdG9yZS9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWtEO0FBRWpCO0FBR2pDLE1BQU1FLFFBQVFGLGdFQUFjQSxDQUFDO0lBQzNCRyxTQUFTO1FBQUVDLE1BQU1ILDZDQUFXQTtJQUFDO0FBQy9CO0FBRUEsaUVBQWVDLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ncmFkdWF0aW9uX3Byb2plY3QvLi9TdG9yZS9pbmRleC5qcz9mMDdmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZ3VyZVN0b3JlIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5cbmltcG9ydCBhdXRoUmVkdWNlciBmcm9tICcuL2F1dGgnO1xuXG5cbmNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoe1xuICByZWR1Y2VyOiB7IGF1dGg6IGF1dGhSZWR1Y2VyIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgc3RvcmU7Il0sIm5hbWVzIjpbImNvbmZpZ3VyZVN0b3JlIiwiYXV0aFJlZHVjZXIiLCJzdG9yZSIsInJlZHVjZXIiLCJhdXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Store/index.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Store_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Store/index */ \"./Store/index.js\");\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_redux__WEBPACK_IMPORTED_MODULE_2__.Provider, {\n        store: _Store_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\user\\\\Desktop\\\\مواد الفصل\\\\GP\\\\ahmad-natour\\\\pages\\\\_app.js\",\n            lineNumber: 7,\n            columnNumber: 34\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\user\\\\Desktop\\\\مواد الفصل\\\\GP\\\\ahmad-natour\\\\pages\\\\_app.js\",\n        lineNumber: 7,\n        columnNumber: 10\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUE4QjtBQUNTO0FBQ0o7QUFFbkMsU0FBU0UsTUFBTSxFQUFFQyxVQUFTLEVBQUVDLFVBQVMsRUFBRSxFQUFFO0lBRXZDLHFCQUFPLDhEQUFDSixpREFBUUE7UUFBQ0MsT0FBT0Esb0RBQUtBO2tCQUFFLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBQ3pEO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ncmFkdWF0aW9uX3Byb2plY3QvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBzdG9yZSBmcm9tICcuLi9TdG9yZS9pbmRleCc7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICBcbiAgcmV0dXJuIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PjxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz48L1Byb3ZpZGVyPlxufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcFxuIl0sIm5hbWVzIjpbIlByb3ZpZGVyIiwic3RvcmUiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();