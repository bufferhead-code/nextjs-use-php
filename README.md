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


Check out the original implementations by elnardu for C and Rust:

* https://github.com/elnardu/react-use-c
* https://github.com/elnardu/react-use-rust