const { v4: uuidv4 } = require("uuid");
const ModelService = require("../services/model.service");

exports.generateModel = async (req, res) => {
  try {
    // Validate request body
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid request format" });
    }

    const generationId = uuidv4();

    // Immediate response
    res.status(202).json({
      generationId: generationId,
      status: "processing",
      shirt_size: req.body.shirt_size || "XL",
      estimated_completion: new Date(Date.now() + 3000).toISOString(),
    });

    // Simulate background processing
    setTimeout(async () => {
      try {
        const result = await ModelService.generateModel(req.body);
        console.log(`Generated mock shirt model: ${generationId}`);
      } catch (error) {
        console.error(`Generation failed for ${generationId}: ${error}`);
      }
    }, 2500);
  } catch (error) {
    res.status(500).json({
      error: "Shirt model generation failed",
      details: error.message,
      suggested_fix: "Verify measurement units are in centimeters",
    });
  }
};

exports.getModel = async (req, res) => {
  try {
    // Return mock shirt-specific response
    res.json({
      generation_id: req.params.id,
      status: "completed",
      shirt_size: "XL",
      measurements: {
        shoulders: 40.51,
        waist: 88.26,
        length: 57.24,
        arm: 48.57,
        chest: 104.25,
        wrist: 20.61,
      },
      download_url: `/api/models/${req.params.id}/download`,
      fitting_notes: [
        "Mock collar stand: 3.5cm",
        "Mock placket width: 2.8cm",
        "Simulated sleeve cap height: 14.2cm",
      ],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve shirt model" });
  }
};
