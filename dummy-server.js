const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + "/bin"));
app.use(express.static(__dirname  + "/images"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let levels = [
	{
		id: Math.random().toString(),
		task: "<b>Упражнение 1:</b> Построить чертёж точки по координатам С(15; 20; 30) M(20; 0; 25) F(35; 10; 15) D(0; 30; 10)",
		help: "<h2>Проекция точек на плоскость</h2>",
		img: "",
		enable: true,
	},
	{
		id: Math.random().toString(),
		task: "<b>Упражнение 2:</b> Построить чертёж точки по координатам E(10; 15; 30) M(30; 25; 0) F(0; 20; 15) D(0; 10; 0)",
		help: "<h2>Проекция точек на плоскость</h2>",
		img: "1.png",
		enable: false,
	},
	{
		id: Math.random().toString(),
		task: "<b>Упражнение 3:</b> Построить проекции недостающих точек, если известно, что они принадлежат горизонтальной плоскости уровня, отстоящей от плоскости П<sub>1</sub> на 15",
		help: "<h2>Проекция точек на плоскость</h2>",
		img: "2.png",
		enable: false,
	},
	{
		id: Math.random().toString(),
		task: "<b>Упражнение 4:</b> Построить недостающие проекции точек, принадлежащих поверхности пирамиды",
		help: "<h2>Проекция точек на плоскость</h2>",
		img: "3.png",
		enable: false,
	},
	{
		id: Math.random().toString(),
		task: "<b>Упражнение 5:</b> Построить недостающие проекции точек, принадлежащих поверхности призмы",
		help: "<h2>Проекция точек на плоскость</h2>",
		img: "4.png",
		enable: false,
	},
	{
		id: Math.random().toString(),
		task: "<b>Упражнение 6:</b> построить недостающую проекцию линии сечения многогранника плоскостью",
		help: "<h2>Проекция точек на плоскость</h2>",
		img: "5.png",
		enable: false,
	},
	{
		id: Math.random().toString(),
		task: "<b>Упражнение 7:</b> построить недостающую проекцию выреза",
		help: "<h2>Проекция точек на плоскость</h2>",
		img: "6.png",
		enable: false,
	},
];

app.post("/get_levels_ajax", function (req, res) {
	res.json("")//levels);
});

app.post("/add_answer_to_level_ajax", function (req, res) {
	const levelId = req.body.taskId;
	console.log(req.body.answer);
	const level = levels.find((level) => level.id == levelId);
	level.score = 1000;
	const levelIndex = levels.indexOf(level);
	levels[levelIndex + 1].enable = true;

	res.json({status: 200});
});

app.listen(3000, function () {
	console.log("Example app listening on port 3000!");
});
