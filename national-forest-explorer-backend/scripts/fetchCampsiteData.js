require('dotenv').config();
const axios = require('axios');
const { sequelize, Campsite } = require('../models');

const fetchCampsiteData = async () => {
    try {
        console.log("Fetching campsite data...");
        const response = await axios.get('https://ridb.recreation.gov/api/v1/campsites', {
            headers: { 'apikey': process.env.RIDB_API_KEY },
            params: { limit: 500 }
        });
        console.log("Campsite data response:", response.data);
        const campsites = response.data.RECDATA;

        if (!Array.isArray(campsites)) {
            throw new Error("Campsites data is not an array");
        }

        for (const site of campsites) {
            await Campsite.upsert({
                facility_id: site.FacilityID,
                name: site.FacilityName,
                type: site.FacilityTypeDescription,
                latitude: site.FacilityLatitude,
                longitude: site.FacilityLongitude,
                map_url: site.FacilityMapURL,
                phone: site.FacilityPhone,
                email: site.FacilityEmail,
                description: site.FacilityDescription,
                use_fee_description: site.FacilityUseFeeDescription,
                reservable: site.Reservable,
                ada_access: site.ADAAccess,
                created_at: new Date(),
                updated_at: new Date()
            });
        }
        console.log('Campsite data fetched and inserted successfully');
    } catch (error) {
        console.error('Error fetching or inserting campsite data:', error);
    } finally {
        await sequelize.close();
    }
};

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await fetchCampsiteData();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

main();