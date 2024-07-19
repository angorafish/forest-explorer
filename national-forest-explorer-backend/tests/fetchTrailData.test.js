const axios = require('axios');
const { Trail, sequelize } = require('../models');
const fetchTrailData = require('../scripts/fetchTrailData');

jest.mock('axios');
jest.mock('../models', () => ({
    sequelize: {
        authenticate: jest.fn(),
        close: jest.fn()
    },
    Trail: {
        create: jest.fn(),
        findOne: jest.fn()
    }
}));

describe('fetchTrailData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch trail data and insert new trails', async () => {
        const mockTrails = {
            features: [
                {
                    attributes: {
                        TRAIL_NO: 1,
                        TRAIL_NAME: 'Trail 1',
                        TRAIL_TYPE: 'Hiking',
                        SEGMENT_LENGTH: 10.5,
                        MANAGING_ORG: 'Org 1',
                        ACCESSIBILITY_STATUS: 'Open',
                        TRAIL_SURFACE: 'Gravel',
                        ALLOWED_TERRA_USE: 'Hiking',
                        ALLOWED_SNOW_USE: 'Snowshoeing',
                        ALLOWED_WATER_USE: 'Kayaking',
                        TYPICAL_TRAIL_GRADE: '5%',
                        TYPICAL_TREAD_WIDTH: '3ft'
                    }
                }
            ]
        };

        axios.get.mockResolvedValue({ data: mockTrails });
        Trail.findOne.mockResolvedValue(null);

        await fetchTrailData();

        expect(axios.get).toHaveBeenCalledWith('https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_TrailNFSPublish_01/MapServer/0/query', {
            params: {
                where: '1=1',
                outFields: '*',
                f: 'json'
            }
        });
        expect(Trail.create).toHaveBeenCalledWith(expect.objectContaining({
            trailId: 1,
            name: 'Trail 1',
            type: 'Hiking',
            segmentLength: 10.5,
            managingOrg: 'Org 1',
            accessibilityStatus: 'Open',
            trailSurface: 'Gravel',
            allowedTerraUse: 'Hiking',
            allowedSnowUse: 'Snowshoeing',
            allowedWaterUse: 'Kayaking',
            typicalTrailGrade: '5%',
            typicalTreadWidth: '3ft',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }));
        expect(sequelize.close).toHaveBeenCalled();
    });

    it('should skip existing trails', async () => {
        const mockTrails = {
            features: [
                {
                    attributes: {
                        TRAIL_NO: 1,
                        TRAIL_NAME: 'Trail 1',
                        TRAIL_TYPE: 'Hiking',
                        SEGMENT_LENGTH: 10.5,
                        MANAGING_ORG: 'Org 1',
                        ACCESSIBILITY_STATUS: 'Open',
                        TRAIL_SURFACE: 'Gravel',
                        ALLOWED_TERRA_USE: 'Hiking',
                        ALLOWED_SNOW_USE: 'Snowshoeing',
                        ALLOWED_WATER_USE: 'Kayaking',
                        TYPICAL_TRAIL_GRADE: '5%',
                        TYPICAL_TREAD_WIDTH: '3ft'
                    }
                }
            ]
        };

        axios.get.mockResolvedValue({ data: mockTrails });
        Trail.findOne.mockResolvedValue({ trailId: 1 });

        await fetchTrailData();

        expect(axios.get).toHaveBeenCalledWith('https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_TrailNFSPublish_01/MapServer/0/query', {
            params: {
                where: '1=1',
                outFields: '*',
                f: 'json'
            }
        });
        expect(Trail.create).not.toHaveBeenCalled();
        expect(sequelize.close).toHaveBeenCalled();
    });

    it('should handle errors and close the sequelize connection', async () => {
        axios.get.mockRejectedValue(new Error('Failed to fetch trails'));

        await fetchTrailData();

        expect(axios.get).toHaveBeenCalled();
        expect(Trail.create).not.toHaveBeenCalled();
        expect(sequelize.close).toHaveBeenCalled();
    });
});