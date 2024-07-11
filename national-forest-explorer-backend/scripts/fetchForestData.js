require('dotenv').config();
const axios = require('axios');
const { sequelize, Forest } = require('../models');

const fetchForestData = async () => {
    try {
        console.log("Fetching forest data...");
        const response = await axios.get('https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_ForestSystemBoundaries_01/MapServer/0/query', {
            params: {
                where: '1=1',
                outFields: '*',
                f: 'json'
            }
        });
        console.log("Forest data response:", response.data);
        const forests = response.data.features;

        if (!Array.isArray(forests)) {
            throw new Error("Forests data is not an array");
        }

        for (const forest of forests) {
            await Forest.create({
                admin_forest_id: forest.attributes.ADMINFORESTID,
                region: forest.attributes.REGION,
                forest_number: forest.attributes.FORESTNUMBER,
                forest_org_code: forest.attributes.FORESTORGCODE,
                name: forest.attributes.FORESTNAME,
                gis_acres: forest.attributes.GIS_ACRES,
                shape_length: forest.attributes.SHAPE_Length,
                shape_area: forest.attributes.SHAPE_Area,
                created_at: new Date(),
                updated_at: new Date()
            });
        }
        console.log('Forest data fetched and inserted successfully');
    } catch (error) {
        console.error('Error fetching or inserting forest data:', error);
    } finally {
        await sequelize.close();
    }
};

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await fetchForestData();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

main();
