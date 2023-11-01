import UsePhpClientComponent from "./components/UsePhpClientComponent";

export default function Home() {

    return (
        <main className="min-h-screen p-24 bg-white">
            <UsePhpClientComponent></UsePhpClientComponent>
            <form>
                <button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    formAction={async () => {
                        'use php'
                        $pdo = new PDO('mysql:host=localhost:33066;dbname=public', 'root', 'root');

                        $statement = $pdo->prepare("INSERT INTO Bookmarks (slug) VALUES (?)");
                        $statement->execute(array('new'));
                    }}>
                    Insert Bookmark
                </button>
            </form>

        </main>
    )
}
