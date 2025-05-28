import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const { PORT = 3000 } = process.env;

const app = jsonServer.create();
const router = jsonServer.router("db.json");

setupApp();

async function setupApp() {
	const rules = auth.rewriter({
		users: 600,
		messages: 640,
	});

	app.db = router.db;

	app.use(rules);
	app.use(cors());
	app.use(auth);
	app.use(router);

	app.get("*", (req, res) => {
		res.status(404).send("Not Found");
	});

	app.listen(PORT, () => {
		console.log(`http://localhost:${PORT}`);
	});
}
