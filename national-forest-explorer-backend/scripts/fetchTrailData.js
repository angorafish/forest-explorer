const axios = require('axios');
const { Trail, sequelize } = require('../models');

const fetchTrailData = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const response = await axios.get('https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_TrailNFSPublish_01/MapServer/0/query', {
      params: {
        where: '1=1',
        outFields: '*',
        f: 'json'
      }
    });

    const trailData = response.data.features;
    if (!Array.isArray(trailData)) {
      throw new Error('Expected trail data to be an array.');
    }

    for (const trail of trailData) {
      try {
        const existingTrail = await Trail.findOne({ where: { trailId: trail.attributes.TRAIL_NO } });

        if (existingTrail) {
          console.log(`Trail with ID ${trail.attributes.TRAIL_NO} already exists. Skipping.`);
          continue;
        }

        console.log('Inserting trail data:', trail.attributes.TRAIL_NO);
        await Trail.create({
          trailId: trail.attributes.TRAIL_NO,
          name: trail.attributes.TRAIL_NAME,
          type: trail.attributes.TRAIL_TYPE,
          segmentLength: trail.attributes.SEGMENT_LENGTH,
          managingOrg: trail.attributes.MANAGING_ORG,
          accessibilityStatus: trail.attributes.ACCESSIBILITY_STATUS,
          trailSurface: trail.attributes.TRAIL_SURFACE,
          allowedTerraUse: trail.attributes.ALLOWED_TERRA_USE,
          allowedSnowUse: trail.attributes.ALLOWED_SNOW_USE,
          allowedWaterUse: trail.attributes.ALLOWED_WATER_USE,
          typicalTrailGrade: trail.attributes.TYPICAL_TRAIL_GRADE,
          typicalTreadWidth: trail.attributes.TYPICAL_TREAD_WIDTH,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } catch (error) {
        console.error('Error inserting trail data:', error);
      }
    }
    console.log('Trail data has been successfully inserted.');
  } catch (error) {
    console.error('Error fetching or inserting trail data:', error);
  } finally {
    await sequelize.close();
  }
};

fetchTrailData();