const express = require("express");
const connectDB = require("./config/db");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const auth = require("./middleware/auth");
const UserRole = require("./models/userRole");
const SiteLocation = require("./models/location");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

connectDB();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    let now = new Date().toISOString().replaceAll(":", "-");
    cb(null, now + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-auth-token"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ extended: false }));
app.use(auth);

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.put("/fruit-images", (req, res, next) => {
  try {
    if (!req.isAuth) {
      throw new Error("Not authenticated");
    }
    if (!req.file) {
      return res.status(200).json({ message: "No file provided" });
    }
    if (req.body.oldPath) {
      clearImage(req.body.oldPath);
    }
    return res
      .status(201)
      .json({ message: "File stored", filePath: req.file.path });
  } catch (error) {
    return res.json({ message: "Not authorized" });
  }
});

RoleExist("Admin");
RoleExist("Vendor");
RoleExist("Customer");
IslamabadLocation('Islamabad');
RawalpendiLocation('Rawalpindi')

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    customFormatErrorFn(error) {
      if (!error.originalError) {
        return error;
      }
      const message = error.message || "An Error Occured";
      const data = error.originalError.data;
      const code = error.originalError.code || 500;
      return { message: message, status: code, data: data };
    },
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

async function IslamabadLocation(cityName) {
  const cityLocations = await SiteLocation.findOne({ cityName: cityName });
  if (!cityLocations) {
    const newCityLocations = new SiteLocation({
      cityName: cityName,
      sites: `A-17,A-18,B-17,B-18,C-13,C-14,C-15,C-16,C-17,C-18,D-10,D-11,D-12,D-13,D-14,D-15,D-16,D-17,D-18, E-7,E-8,E-9,E-10,E-11,E-12,E-13,E-14,E-15,E-16,E-17,E-18,F-5,F-6,F-7,F-8,F-9,F-10,F-11,F-12,F-13,F-14,F-15,F-16,F-17,F-18,G-5,G-6,G-7,G-8,G-9,G-10,G-11,G-12,G-13,G-14,G-15,G-16,G-17,G-18,H-8,H-9,H-10,H-11,H-12,H-13, 
      H-14,H-15,H-16,H-17,H-18,I-8,I-9,I-10,I-11,I-12,I-13,I-14,I-15,I-16,I-17,I-18,Margalla Hills,Banigala,Barakahu,Pakistan Monument,Rawal Lake,Faizabad,Islamabad Medical and Dental College (IMDC),NIH,NARC,Athal,Malot,Maira Begwal,Zunair Town,Bahria Enclave,Chak Shehzad,Gulberg Greens,Pind Begwal,Chatta Bakhtawar,Burma Town,Taramri,Ali Pur,Punjgran,Thandapani,Al Nafees Medical College and Hospital,Jagiot,Jandala,Bain Nala,Kazani resorts,Mohara,Tumair,Nilore,DHA Islamabad,Bahria Town Islamabad,Rawat,Sihala,CUST,Naval Anchourage,Soan Gardens,Sohara,Mohra Daroga,PAEC Employees Housing Society,Bhangril,Miana Thub,Chak Kamdar,Aari Syedan,Pindori Hathyal,Fort Pharwala`,
    });

    await newCityLocations.save();
  }
}

async function RawalpendiLocation(cityName) {
  const cityLocations = await SiteLocation.findOne({ cityName: cityName });
  if (!cityLocations) {
    const newCityLocations = new SiteLocation({
      cityName: cityName,
      sites: `Gujjar Khan,Kahuta,Kallar Syedan,Kotli Sattian,Murree,Rawalpindi,Taxila,Saddar,Liaqat Bagh,Satellite Town,Shamsabad,Gulistan-e-Jinnah Colony,Sadiqabad,Zia Masjid,Chaklala Cantt,Benazir Bhutto International Airport,Jinnah Park,Ayub National Park,Rehmanabad,Westridge,Dhok Kala Khan,Farooq-e-Azam Colony,Bilal Colony,Model Colony,Wajid Colony,Kuri Road area,Dhok Paracha,Ali Abad,ARID,Magistrate Colony,Committee Chowk,Waris Khan,Gawal Mandi,Raja Bazar,PAF Base Nur Khan,GHQ Rawalpindi,Lalazar,Gulzar-e-Quaid,Gulistan Colony,Morgah,Eastridge Housing Scheme,Gulrez Housing Scheme,Lal Kurti,Civil Lines,Marir Hasan,Dhok Hassu,Dhok Mangtal,Dhok Babu Irfan,Pir Wadhai,Fauji Colony,Dhok Ratta,Chungi,Railway Colony,Railway Station Rawalpindi,PIA Colony,Mohalla Zamindara,Officers Colony,Madina Colony ,Shalley Valley,Allama Iqbal Colony `,
    });

    await newCityLocations.save();
  }
}

async function RoleExist(roleName) {
  const role = await UserRole.findOne({ name: roleName });
  if (!role) {
    const newRole = new UserRole({
      name: roleName,
      description: "This is a role",
    });

    await newRole.save();
  }
}

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
