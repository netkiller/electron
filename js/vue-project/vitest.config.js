"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_url_1 = require("node:url");
const vite_1 = require("vite");
const config_1 = require("vitest/config");
const vite_config_1 = __importDefault(require("./vite.config"));
exports.default = (0, vite_1.mergeConfig)(vite_config_1.default, (0, config_1.defineConfig)({
    test: {
        environment: 'jsdom',
        exclude: [...config_1.configDefaults.exclude, 'e2e/*'],
        root: (0, node_url_1.fileURLToPath)(new URL('./', import.meta.url))
    }
}));
