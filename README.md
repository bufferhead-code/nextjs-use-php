## Next.js `use php`

Use PHP right inside of your Next.js project. 
Just like `use server` (not really).

```javascript
    async function phpHelloWorld(): Promise<string> {
        "use php";
        print "Hello from PHP";
    }
```

Yes this actually works. Trust me I wish it wouln't too. 

## Build 

You can build the implementation by

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Roadmap (Things that should be fixed but realistically it will never happen)

* There is a probably a way to fix that nasty preprocess step with [SWC Plugins]( https://swc.rs/docs/plugin/ecmascript/getting-started) which are still in Beta with Nuxt.js and also I think they will switch builder anyways soon so what's the point really?

Check out the original implementations by elnardu for C and Rust:

* https://github.com/elnardu/react-use-c
* https://github.com/elnardu/react-use-rust