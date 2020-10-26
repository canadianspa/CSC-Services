export const API_BASE_URL =
	process.env.NODE_ENV === "production"
		? "/api"
		: "http://localhost:5000/api";

export const UPDATE_VENDORS = [
	{ name: "bandq", title: "B&Q" },
	{ name: "homebase", title: "Homebase" },
	{ name: "jtf", title: "JTF" },
	{ name: "wayfair", title: "Wayfair" },
	{ name: "range", title: "The Range" },
	{ name: "travisperkins", title: "Travis Perkins" },
	{ name: "robert_dyas", title: "Robert Dyas" },
	{ name: "hornbach", title: "Hornbach" },
	{ name: "shop_direct", title: "Shop Direct" },
];

export const IMPORT_VENDORS = [
	{
		name: "bandq",
		title: "B&Q CSV",
		requires_file: true,
		file_type: ".csv",
	},
	{
		name: "argos",
		title: "Argos CSV",
		requires_file: true,
		file_type: ".csv",
	},
	{
		name: "range",
		title: "The Range",
		requires_file: false,
		file_type: null,
	},
	{
		name: "homebase",
		title: "Homebase XML",
		requires_file: true,
		file_type: ".xml",
	},
	{
		name: "wayfair",
		title: "Wayfair CSV",
		requires_file: true,
		file_type: ".csv",
	},
	{
		name: "robert_dyas",
		title: "Robert Dyas CSV",
		requires_file: true,
		file_type: ".csv",
	},
	{
		name: "shop_direct",
		title: "Shop Direct TXT",
		requires_file: true,
		file_type: ".txt",
	},
];
