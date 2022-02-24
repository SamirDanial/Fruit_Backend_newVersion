const mongoose = require('mongoose');

const SiteLocationSchema = new mongoose.Schema({
    cityName: {
        type: String,
    },
    sites: {
        type: String,
    }
});

module.exports = SiteLocation = mongoose.model("siteLocation", SiteLocationSchema);