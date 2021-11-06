import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from '@rollup/plugin-typescript';

const pkgname = `${pkg.name.replace(/\.[^/.]+$/, "")}`;
const name = `${pkgname}`.split("-").reduce((pre, cur) => {
	pre = pre.charAt(0).toUpperCase() + pre.slice(1)
	cur = cur.charAt(0).toUpperCase() + cur.slice(1)
	return pre + cur;
});
const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
	input: "src/index.ts",

	// Bundled output files
	output: [{
		name: `${pkgname}`,
		file: `dist/${pkgname}.esm.min.js`,
		format: "esm",
		sourcemap: false,
		plugins: [
			terser()
		]
	}, {
		name: `${pkgname}`,
		file: `dist/${pkgname}.esm.js`,
		sourcemap: false,
		format: "esm",
	}, {
		name,
		file: `dist/${pkgname}.umd.min.js`,
		sourcemap: false,
		format: "umd",
		plugins: [
			terser(),
		]
	}, {
		name,
		file: `dist/${pkgname}.umd.js`,
		sourcemap: false,
		format: "umd"
	}],

	// Specify external modules which you don't want to include in your bundle
	external: [],

	plugins: [
		// Allows node_modules resolution
		resolve({
			extensions
		}),

		typescript({
			tsconfig: "./tsconfig.json"
		})
	],
};
