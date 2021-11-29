[Astro](https://astro.build) renderer for Rahti: https://github.com/vuoro/rahti

1. `npm install @vuoro/astro-renderer-rahti @vuoro/rahti`
2. Add the renderer to your Astro project configuration. At the time of writing you need to add a file named `astro.config.mjs` to the root of your project, with the contents: `export default { renderers: ['@vuoro/astro-renderer-rahti'] };`. For details about configuring Astro, see <https://docs.astro.build>.
3. Now you should be able to mount any Effect in Astro as a Component. `<YourEffect someProp={"someValue"}>blah</YourEffect>` should call your Effect like this: `YourEffect(root, {someProp: "someValue"}, children)`.
4. Your effect should use the provided `root` for any DOM Effects, and also pass the provided `children` to it: `const YourEffect = effect((root, props, children) => { root(p("Hello world"), children) })`.
