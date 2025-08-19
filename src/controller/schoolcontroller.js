import School from "../model/schoolmodel.js";
import { addSchoolSchema, listSchoolsSchema } from "../utils/validator.js";
import { literal } from "sequelize";
export  const getSchoolList=  async (req, res) => {
  try {
    const { error, value } = listSchoolsSchema.validate(req.query);
    if (error) return res.status(400).json({ error: error.details });

    const { lat, lng } = value;

    // Haversine formula inside Sequelize query
    const distance = `(6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) 
                    * cos(radians(longitude) - radians(${lng})) 
                    + sin(radians(${lat})) * sin(radians(latitude))))`;

    const schools = await School.findAll({
      attributes: {
        include: [[literal(distance), "distance_km"]],
      },
      order: [[literal("distance_km"), "ASC"]],
    });

    res.json({ status: "success", data: schools });
  } catch (err) {
    console.error("listSchools error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
export const postSchool = async (req, res) => {
  try {
    const { error, value } = addSchoolSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details });

    // Check if a school already exists with same name + address
    const existing = await School.findOne({
      where: {
        name: value.name,
        address: value.address,
      },
    });

    if (existing) {
      return res.status(400).json({ 
        error: "School with same name and address already exists" 
      });
    }

    const school = await School.create(value);
    res.status(201).json({ status: "success", data: school });

  } catch (err) {
    console.error("addSchool error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
