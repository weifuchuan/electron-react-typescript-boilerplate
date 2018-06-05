"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Node = (function () {
    function Node() {
    }
    return Node;
}());
exports.Node = Node;
var DirNode = (function (_super) {
    __extends(DirNode, _super);
    function DirNode() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DirNode.prototype, "size", {
        get: function () {
            var s = 0;
            for (var _i = 0, _a = this.files; _i < _a.length; _i++) {
                var fn = _a[_i];
                s += fn.size;
            }
            for (var _b = 0, _c = this.dirs; _b < _c.length; _b++) {
                var dir = _c[_b];
                s += dir.size;
            }
            return s;
        },
        enumerable: true,
        configurable: true
    });
    return DirNode;
}(Node));
exports.DirNode = DirNode;
var FileNode = (function (_super) {
    __extends(FileNode, _super);
    function FileNode() {
        _super.apply(this, arguments);
    }
    return FileNode;
}(Node));
exports.FileNode = FileNode;
var FileTree = (function () {
    function FileTree() {
    }
    return FileTree;
}());
exports.FileTree = FileTree;
